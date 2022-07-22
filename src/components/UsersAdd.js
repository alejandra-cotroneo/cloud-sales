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
	
	const crearUsuario = async (evento) => {
		evento.preventDefault();
		
		cambiarEstadoBotón(false);
		
		let {nombre, apodo, contraseña, perfil} = document.forms[0];
		
		const opcionesSolicitud = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ name: nombre.value, nickname: apodo.value, password: contraseña.value, level: perfil.value, operatorId: config.operatorId })
		};
		
		fetch(config.apiURL + 'users', opcionesSolicitud).then((respuesta) => {
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
						<form onSubmit={crearUsuario}>
							<div className="row mt-5">
								<div className="col-4 offset-4">
									<h3 className="text-center">Creación de Usuario</h3>
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
									<strong>Apodo:</strong>
									<br />
									<input name="apodo" type="text" placeholder="Ingrese un apodo" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Contraseña:</strong>
									<br />
									<input name="contraseña" type="password" placeholder="Ingrese una contraseña" className="form-control" required="required" autoComplete="off" />
								</div>
							</div>
							
							<div className="row mt-3">
								<div className="col-4 offset-4">
									<strong>Perfil:</strong>
									<br />
									<select name="perfil" className="form-control">
										<option value="admin">Administrador</option>
										<option value="seller">Vendedor</option>
									</select>
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