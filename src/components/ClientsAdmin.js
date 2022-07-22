import React from 'react';
import { Link } from 'react-router-dom';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import config from './../helpers/config.json';

class ClientsAdmin extends React.Component {
	state = {
		clientes: []
	}
	
	componentDidMount() {
		const opcionesSolicitud = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		
		fetch(config.apiURL + 'clients/' + config.operatorId, opcionesSolicitud).then((respuesta) => {			
			return respuesta.json();
		}).then((json) => {
			this.setState({clientes: json.data});
		});
	}
	
	render() {
		const {clientes} = this.state;
		
		const deshabilitar = (evento, id) => {
			evento.preventDefault();
			
			const opcionesSolicitud = {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			
			fetch(config.apiURL + 'clients/' + config.operatorId + '/' + id, opcionesSolicitud).then((respuesta) => {			
				return respuesta.json();
			}).then((json) => {
				json.data[0].active = false;
				json.data[0].operatorId = config.operatorId;
				
				const opcionesSolicitud = {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(json.data[0])
				};
				
				fetch(config.apiURL + 'clients/' + id, opcionesSolicitud).then((respuesta) => {					
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
			
			fetch(config.apiURL + 'clients/' + config.operatorId + '/' + id, opcionesSolicitud).then((respuesta) => {			
				return respuesta.json();
			}).then((json) => {
				json.data[0].active = true;
				json.data[0].operatorId = config.operatorId;
				
				const opcionesSolicitud = {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(json.data[0])
				};
				
				fetch(config.apiURL + 'clients/' + id, opcionesSolicitud).then((respuesta) => {					
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
										<h3 className="text-center">Panel de Clientes</h3>
									</div>
								</div>
								
								<div className="row mt-3">
									<div className="col-12">
										<Link to="/clients/add" className="btn btn-success">
											Agregar
										</Link>
									</div>
								</div>
								
								<div className="row mt-3">
									<div className="col-12">
										<table className="table">
											<thead>
												<tr>
													<th>Rol</th>
													<th>Nombre</th>
													<th colSpan="2">Acciones</th>
												</tr>
											</thead>
											
											<tbody>
											{
												clientes.map(cliente => (
													<tr key={cliente.id}>
														<td>{cliente.rol}</td>
														<td>{cliente.name}</td>
														<td>
															{cliente.active ? <button onClick={evento => deshabilitar(evento, cliente.id)} className="btn btn-dark" type="button">Deshabilitar</button> : <button onClick={evento => habilitar(evento, cliente.id)} className="btn btn-success" type="button">Habilitar</button>}
														</td>
														<td>
															<Link to="/clients/edit" state={{id: cliente.id}} className="btn btn-warning">
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

export default ClientsAdmin;