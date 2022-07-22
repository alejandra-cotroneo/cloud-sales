import React from 'react';
import { useNavigate } from 'react-router-dom';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import config from './../helpers/config.json';

function ClientsAdd() {
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
	
	const crearCliente = async (evento) => {
		evento.preventDefault();
		
		cambiarEstadoBotón(false);
		
		let {rol, nombre} = document.forms[0];
		
		const opcionesSolicitud = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ rol: rol.value, name: nombre.value, operatorId: config.operatorId })
		};
		
		fetch(config.apiURL + 'clients', opcionesSolicitud).then((respuesta) => {
			if (respuesta.status === 400) {
				mostrarMensaje(true, 'Ocurrió un error');
				cambiarEstadoBotón(true);
			}
			
			return respuesta.json();
		}).then((json) => {
			if (json.data === null) {
				return;
			}
			
			navigate('/clients');
		});
	};
	
	return (
		<div>
			<Topbar />
			<Sidebar />
			<div className="content-wrapper">
				<section className="content">
					<div className="card">
						<form onSubmit={crearCliente}>
							<div className="row mt-5">
								<div className="col-4 offset-4">
									<h3 className="text-center">Creación de Cliente</h3>
								</div>
							</div>
						
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Rol:</strong>
									<br />
									<input name="rol" type="text" placeholder="Ingrese un rol (ejemplo: 08313576K)" className="form-control" required="required" autoComplete="off" pattern="^[0-9]{8}[0-9K]$" />
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

export default ClientsAdd;