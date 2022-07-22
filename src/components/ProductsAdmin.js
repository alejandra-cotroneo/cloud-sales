import React from 'react';
import { Link } from 'react-router-dom';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import config from './../helpers/config.json';

class ProductsAdmin extends React.Component {
	state = {
		productos: []
	}
	
	componentDidMount() {
		const opcionesSolicitud = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		
		fetch(config.apiURL + 'products/' + config.operatorId, opcionesSolicitud).then((respuesta) => {			
			return respuesta.json();
		}).then((json) => {
			this.setState({productos: json.data});
		});
	}
	
	render() {
		const {productos} = this.state;
		
		const deshabilitar = (evento, id) => {
			evento.preventDefault();
			
			const opcionesSolicitud = {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			
			fetch(config.apiURL + 'products/' + config.operatorId + '/' + id, opcionesSolicitud).then((respuesta) => {			
				return respuesta.json();
			}).then((json) => {
				json.data[0].active = false;
				json.data[0].operatorId = config.operatorId;
				
				const opcionesSolicitud = {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(json.data[0])
				};
				
				fetch(config.apiURL + 'products/' + id, opcionesSolicitud).then((respuesta) => {					
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
			
			fetch(config.apiURL + 'products/' + config.operatorId + '/' + id, opcionesSolicitud).then((respuesta) => {			
				return respuesta.json();
			}).then((json) => {
				json.data[0].active = true;
				json.data[0].operatorId = config.operatorId;
				
				const opcionesSolicitud = {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(json.data[0])
				};
				
				fetch(config.apiURL + 'products/' + id, opcionesSolicitud).then((respuesta) => {					
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
										<h3 className="text-center">Panel de Productos</h3>
									</div>
								</div>
								
								<div className="row mt-3">
									<div className="col-12">
										<Link to="/products/add" className="btn btn-success">
											Agregar
										</Link>
									</div>
								</div>
								
								<div className="row mt-3">
									<div className="col-12">
										<table className="table">
											<thead>
												<tr>
													<th>Nombre</th>
													<th colSpan="2">Acciones</th>
												</tr>
											</thead>
											
											<tbody>
											{
												productos.map(producto => (
													<tr key={producto.id}>
														<td>{producto.name}</td>
														<td>
															{producto.active ? <button onClick={evento => deshabilitar(evento, producto.id)} className="btn btn-dark" type="button">Deshabilitar</button> : <button onClick={evento => habilitar(evento, producto.id)} className="btn btn-success" type="button">Habilitar</button>}
														</td>
														<td>
															<Link to="/products/edit" state={{id: producto.id}} className="btn btn-warning">
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

export default ProductsAdmin;