import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import config from './../helpers/config.json';

function ProductsEdit() {	
	const location = useLocation();
	const {id} = location.state;
	
	const navigate = useNavigate();
	
	React.useEffect(() => {
		const opcionesSolicitud = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		
		fetch(config.apiURL + 'products/' + config.operatorId + '/' + id, opcionesSolicitud).then((respuesta) => {			
			return respuesta.json();
		}).then((json) => {
			document.getElementById('id').value = json.data[0].id;
			document.getElementById('nombre').value = json.data[0].name;
			document.getElementById('umv').value = json.data[0].MSU;
			document.getElementById('precio').value = json.data[0].price;
			document.getElementById('stock').value = json.data[0].stock;
			document.getElementById('maxDescuentoPrecio').value = json.data[0].MDPrice;
			document.getElementById('maxDescuentoPorcentaje').value = json.data[0].MDPercentage;
			document.getElementById('activo').checked = json.data[0].active;
		});
	});
	
	const cambiarEstadoBotón = (habilitado) => {
		const botón = document.querySelector('.botón');
		
		if (habilitado) {
			botón.disabled = false;
			botón.innerHTML = 'Editar';
		} else {
			botón.disabled = true;
			botón.innerHTML = 'Editando...';
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
	
	const editarProducto = async (evento) => {
		evento.preventDefault();
		
		cambiarEstadoBotón(false);
		
		let {id, nombre, umv, precio, stock, maxDescuentoPrecio, maxDescuentoPorcentaje, activo} = document.forms[0];
		
		const opcionesSolicitud = {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ id: id.value, name: nombre.value, MSU: umv.value, price: precio.value, stock: stock.value, MDPrice: maxDescuentoPrecio.value, MDPercentage: maxDescuentoPorcentaje.value, active: activo.checked, operatorId: config.operatorId })
		};
		
		fetch(config.apiURL + 'products/' + id.value, opcionesSolicitud).then((respuesta) => {
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
						<form onSubmit={editarProducto}>
							<input id="id" name="id" type="hidden" />
						
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Nombre:</strong>
									<br />
									<input id="nombre" name="nombre" type="text" placeholder="Ingrese un nombre" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>U.M.V.:</strong>
									<br />
									<input id="umv" name="umv" type="number" placeholder="Ingrese una unidad mínima de venta" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Precio:</strong>
									<br />
									<input id="precio" name="precio" type="number" placeholder="Ingrese un precio" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Stock:</strong>
									<br />
									<input id="stock" name="stock" type="number" placeholder="Ingrese unidades en stock" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Máximo descuento (precio):</strong>
									<br />
									<input id="maxDescuentoPrecio" name="maxDescuentoPrecio" type="number" placeholder="Ingrese descuento máximo (precio)" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Máximo descuento (porcentaje):</strong>
									<br />
									<input id="maxDescuentoPorcentaje" name="maxDescuentoPorcentaje" type="number" placeholder="Ingrese descuento máximo (porcentaje)" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Activo:</strong>
									<div className="form-check">
										<input id="activo" name="activo" className="form-check-input" type="checkbox" value="true" />
									</div>
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4 text-center">
									<button type="submit" className="botón btn btn-success">Editar</button>
								</div>
							</div>
						</form>
						
						<br />
					</div>
				</section>
			</div>
		</div>
	);
}

export default ProductsEdit;