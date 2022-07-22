import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import config from './../helpers/config.json';

function ClientsEdit() {	
	const location = useLocation();
	const {id} = location.state;
	
	const navigate = useNavigate();
	
	React.useEffect(() => {
		const opcionesSolicitud = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		
		fetch(config.apiURL + 'clients/' + config.operatorId + '/' + id, opcionesSolicitud).then((respuesta) => {			
			return respuesta.json();
		}).then((json) => {
			document.getElementById('id').value = json.data[0].id;
			document.getElementById('rol').value = json.data[0].rol;
			document.getElementById('nombre').value = json.data[0].name;
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
	
	const editarCliente = async (evento) => {
		evento.preventDefault();
		
		cambiarEstadoBotón(false);
		
		let {id, rol, nombre, activo} = document.forms[0];
		
		const opcionesSolicitud = {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ rol: rol.value, name: nombre.value, active: activo.checked, operatorId: config.operatorId })
		};
		
		fetch(config.apiURL + 'clients/' + id.value, opcionesSolicitud).then((respuesta) => {
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
						<form onSubmit={editarCliente}>
							<input id="id" name="id" type="hidden" />
						
							<div className="row mt-5">
								<div className="col-4 offset-4">
									<h3 className="text-center">Edición de Cliente</h3>
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Rol:</strong>
									<br />
									<input id="rol" name="rol" type="text" placeholder="Ingrese un rol (ejemplo: 08313576K)" className="form-control" required="required" autoComplete="off" pattern="^[0-9]{8}[0-9K]$" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Nombre:</strong>
									<br />
									<input id="nombre" name="nombre" type="text" placeholder="Ingrese un nombre" className="form-control" required="required" autoComplete="off" />
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

export default ClientsEdit;