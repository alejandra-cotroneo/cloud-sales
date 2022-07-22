import React from 'react';
import { useNavigate } from 'react-router-dom';

import config from './../helpers/config.json';

function Login() {
	let navigate = useNavigate();
	
	const cambiarEstadoBotón = (habilitado) => {
		const botón = document.getElementById('botón');
		
		if (habilitado) {
			botón.disabled = false;
			botón.innerHTML = 'Acceder';
		} else {
			botón.disabled = true;
			botón.innerHTML = 'Accediendo...';
		}
	};
	
	const mostrarMensaje = (visible, mensaje) => {
		const alerta = document.getElementById('alerta');
		const razón = document.getElementById('razón');
		
		if (visible) {
			razón.innerHTML = mensaje;
			alerta.classList.remove('d-none');
		} else {
			razón.innerHTML = '';
			alerta.classList.add('d-none');
		}
	};
	
	const logger = async (evento) => {
		evento.preventDefault();
		
		cambiarEstadoBotón(false);
		
		let {usuario, contraseña} = document.forms[0];
		
		if (usuario.value.length === 0 || contraseña.value.length === 0) {
			mostrarMensaje(true, 'Debe completar todos los campos');
			cambiarEstadoBotón(true);
			return;
		}
		
		const opcionesSolicitud = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ nickname: usuario.value, password: contraseña.value, operatorId: config.operatorId })
		};
		
		fetch(config.apiURL + 'login', opcionesSolicitud).then((respuesta) => {
			switch (respuesta.status) {
				case 403:
					mostrarMensaje(true, 'Acceso prohibido');
					cambiarEstadoBotón(true);
					break;
				case 404:
					mostrarMensaje(true, 'Usuario y/o contraseña inválidos');
					cambiarEstadoBotón(true);
					break;
					
				default:
					break;
			}
			
			return respuesta.json();
		}).then((json) => {
			if (json.data === null) {
				return;
			}
			
			if (!json.data[0].active) {
				mostrarMensaje(true, 'El usuario se encuentra inactivo');
				cambiarEstadoBotón(true);
				return;
			}
			
			mostrarMensaje(false, '');
			cambiarEstadoBotón(true);
			
			navigate('/sales');
		});
	};
	
	return (
		<form onSubmit={logger}>
			<div className="row mt-5">
				<div className="col-4 offset-4">
					<h3 className="text-center">Cloud Sales</h3>
				</div>
			</div>
		
			<div className="row mt-3">
				<div className="col-4 offset-4">
					<input name="usuario" type="text" placeholder="Usuario" className="form-control" autoComplete="off" />
				</div>
			</div>
			
			<div className="row mt-3">
				<div className="col-4 offset-4">
					<input name="contraseña" type="password" placeholder="Contraseña" className="form-control" autoComplete="off" />
				</div>
			</div>
			
			<div className="row mt-3">
				<div className="col-4 offset-4 text-center">
					<button id="botón" type="submit" className="btn btn-success">Iniciar sesión</button>
				</div>
			</div>
			
			<div id="alerta" className="row mt-3 d-none">
				<div className="col-4 offset-4 text-center">
					<strong>Error: </strong>
					<span id="razón"></span>
				</div>
			</div>
		</form>
	);
};

export default Login;