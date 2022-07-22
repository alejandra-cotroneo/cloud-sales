import React from 'react';
import { useNavigate } from 'react-router-dom';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import config from './../helpers/config.json';

function ProductsAdd() {
	let navigate = useNavigate();
	
	const cambiarEstadoBotón = (habilitado) => {
		const botón = document.querySelector('.botón');
		
		if (habilitado) {
			botón.disabled = false;
			botón.innerHTML = 'Agregar';
		} else {
			botón.disabled = true;
			botón.innerHTML = 'Agregando...';
		}
	};
	
	const mostrarMensaje = (visible, mensaje) => {
		const alerta = document.querySelector('.alerta');
		const razón = document.querySelector('.razón');
		
		if (visible) {
			razón.innerHTML = mensaje;
			alerta.classList.remove('d-none');
		} else {
			razón.innerHTML = '';
			alerta.classList.add('d-none');
		}
	};
	
	const crearProducto = async (evento) => {
		evento.preventDefault();
		
		cambiarEstadoBotón(false);
		
		let {nombre, umv, precio, stock, maxDescuentoPrecio, maxDescuentoPorcentaje} = document.forms[0];
		
		const opcionesSolicitud = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ name: nombre.value, MSU: umv.value, price: precio.value, stock: stock.value, MDPrice: maxDescuentoPrecio.value, MDPercentage: maxDescuentoPorcentaje.value, operatorId: config.operatorId })
		};
		
		fetch(config.apiURL + 'products', opcionesSolicitud).then((respuesta) => {
			if (respuesta.status === 400) {
				mostrarMensaje(true, 'Ocurrió un error');
				cambiarEstadoBotón(true);
			}
			
			return respuesta.json();
		}).then((json) => {
			if (json.data === null) {
				return;
			}
			
			navigate('/products');
		});
	};
	
	return (
		<div>
			<Topbar />
			<Sidebar />
			<div className="content-wrapper">
				<section className="content">
					<div className="card">
						<form onSubmit={crearProducto}>
							<div className="row mt-5">
								<div className="col-4 offset-4">
									<h3 className="text-center">Creación de Producto</h3>
								</div>
							</div>
						
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Nombre:</strong>
									<br />
									<input name="nombre" type="text" placeholder="Ingrese un nombre" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>U.M.V.:</strong>
									<br />
									<input name="umv" type="number" placeholder="Ingrese una unidad mínima de venta" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Precio:</strong>
									<br />
									<input name="precio" type="number" placeholder="Ingrese un precio" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Stock:</strong>
									<br />
									<input name="stock" type="number" placeholder="Ingrese unidades en stock" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Máximo descuento (precio):</strong>
									<br />
									<input name="maxDescuentoPrecio" type="number" placeholder="Ingrese descuento máximo (precio)" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Máximo descuento (porcentaje):</strong>
									<br />
									<input name="maxDescuentoPorcentaje" type="number" placeholder="Ingrese descuento máximo (porcentaje)" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4 text-center">
									<button type="submit" className="botón btn btn-success">Agregar</button>
								</div>
							</div>
							
							<div className="alerta row mt-3 d-none">
								<div className="col-4 offset-4 text-center">
									<strong>Error: </strong>
									<span className="razón"></span>
								</div>
							</div>
							
							<br />
						</form>
					</div>
				</section>
			</div>
		</div>
	);
}

export default ProductsAdd;