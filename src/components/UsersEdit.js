import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import config from './../helpers/config.json';

function UsersEdit() {	
	const location = useLocation();
	const {id} = location.state;
	
	const navigate = useNavigate();
	
	React.useEffect(() => {
		const opcionesSolicitud = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		
		fetch(config.apiURL + 'users/' + config.operatorId + '/' + id, opcionesSolicitud).then((respuesta) => {			
			return respuesta.json();
		}).then((json) => {
			document.getElementById('id').value = json.data[0].id;
			document.getElementById('nombre').value = json.data[0].name;
			document.getElementById('apodo').value = json.data[0].nickname;
			document.getElementById('contraseña').value = json.data[0].password;
			document.getElementById('perfil').value = json.data[0].level;
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
	
	const editarUsuario = async (evento) => {
		evento.preventDefault();
		
		cambiarEstadoBotón(false);
		
		let {id, nombre, apodo, contraseña, perfil, activo} = document.forms[0];
		
		const opcionesSolicitud = {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ id: id.value, name: nombre.value, nickname: apodo.value, password: contraseña.value, level: perfil.value, active: activo.checked, operatorId: config.operatorId })
		};
		
		fetch(config.apiURL + 'users/' + id.value, opcionesSolicitud).then((respuesta) => {
			if (respuesta.status === 400) {
				mostrarMensaje(true, 'Ocurrió un error');
				cambiarEstadoBotón(true);
			}
			
			return respuesta.json();
		}).then((json) => {
			if (json.data === null) {
				return;
			}
			
			navigate('/users');
		});
	};
	
	return (
		<div>
			<Topbar />
			<Sidebar />
			<div className="content-wrapper">
				<section className="content">
					<div className="card">
						<form onSubmit={editarUsuario}>
							<input id="id" name="id" type="hidden" />
						
							<div className="row mt-5">
								<div className="col-4 offset-4">
									<h3 className="text-center">Edición de Usuario</h3>
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
									<strong>Apodo:</strong>
									<br />
									<input id="apodo" name="apodo" type="text" placeholder="Ingrese un apodo" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Contraseña:</strong>
									<br />
									<input id="contraseña" name="contraseña" type="password" placeholder="Ingrese una contraseña" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Perfil:</strong>
									<br />
									<select id="perfil" name="perfil" className="form-control">
										<option value="admin">Administrador</option>
										<option value="seller">Vendedor</option>
									</select>
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

export default UsersEdit;