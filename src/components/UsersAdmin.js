import React from 'react';
import { Link } from 'react-router-dom';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import config from './../helpers/config.json';

class UsersAdmin extends React.Component {
	state = {
		usuarios: []
	}
	
	componentDidMount() {
		const opcionesSolicitud = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		
		fetch(config.apiURL + 'users/' + config.operatorId, opcionesSolicitud).then((respuesta) => {			
			return respuesta.json();
		}).then((json) => {
			this.setState({usuarios: json.data});
		});
	}
	
	render() {
		const {usuarios} = this.state;
		
		const deshabilitar = (evento, id) => {
			evento.preventDefault();
			
			const opcionesSolicitud = {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			
			fetch(config.apiURL + 'users/' + config.operatorId + '/' + id, opcionesSolicitud).then((respuesta) => {			
				return respuesta.json();
			}).then((json) => {
				json.data[0].active = false;
				json.data[0].operatorId = config.operatorId;
				
				const opcionesSolicitud = {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(json.data[0])
				};
				
				fetch(config.apiURL + 'users/' + id, opcionesSolicitud).then((respuesta) => {					
					return respuesta.json();
				}).then((json) => {				
					window.location.reload(false);
				});
			});
		};
		
		const habilitar = (evento, id) => {
			evento.preventDefault();
			
			const opcionesSolicitud = {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			
			fetch(config.apiURL + 'users/' + config.operatorId + '/' + id, opcionesSolicitud).then((respuesta) => {			
				return respuesta.json();
			}).then((json) => {
				json.data[0].active = true;
				json.data[0].operatorId = config.operatorId;
				
				const opcionesSolicitud = {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(json.data[0])
				};
				
				fetch(config.apiURL + 'users/' + id, opcionesSolicitud).then((respuesta) => {					
					return respuesta.json();
				}).then((json) => {				
					window.location.reload(false);
				});
			});
		};
		
		return (
			<div>
				<Topbar />
				<Sidebar />
				<div className="content-wrapper">
					<section className="content">
						<div className="card">
							<div className="card-body">
								<div className="row mt-5">
									<div className="col-4 offset-4">
										<h3 className="text-center">Panel de Usuarios</h3>
									</div>
								</div>
								
								<div className="row mt-3">
									<div className="col-12">
										<Link to="/users/add" className="btn btn-success">
											Agregar
										</Link>
									</div>
								</div>
								
								<div className="row mt-3">
									<div className="col-12">
										<table className="table">
											<thead>
												<tr>
													<th>Apodo</th>
													<th>Perfil</th>
													<th colSpan="2">Acciones</th>
												</tr>
											</thead>
											
											<tbody>
											{
												usuarios.map(usuario => (
													<tr key={usuario.id}>
														<td>{usuario.nickname}</td>
														<td>{usuario.level}</td>
														<td>
															{usuario.active ? <button onClick={evento => deshabilitar(evento, usuario.id)} className="btn btn-dark" type="button">Deshabilitar</button> : <button onClick={evento => habilitar(evento, usuario.id)} className="btn btn-success" type="button">Habilitar</button>}
														</td>
														<td>
															<Link to="/users/edit" state={{id: usuario.id}} className="btn btn-warning">
																Editar
															</Link>
														</td>
													</tr>
												))
											}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		);
	}
}

export default UsersAdmin;