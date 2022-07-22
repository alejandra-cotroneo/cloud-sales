import React from 'react';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import config from './../helpers/config.json';

class Sales extends React.Component {
	state = {
		clientes: [],
		productos: []
	}
	
	componentDidMount() {
		const opcionesSolicitud = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		
		fetch(config.apiURL + 'clients/' + config.operatorId, opcionesSolicitud).then((respuesta) => {			
			return respuesta.json();
		}).then((json) => {
			let clientes = [];
			
			json.data.forEach((cliente) => {
				if (cliente.active) {
					clientes.push(cliente);
				}
			});
			
			this.setState({clientes: clientes});
		});
		
		fetch(config.apiURL + 'products/' + config.operatorId, opcionesSolicitud).then((respuesta) => {			
			return respuesta.json();
		}).then((json) => {
			let productos = [];
			
			json.data.forEach((producto) => {
				if (producto.active) {
					productos.push(producto);
				}
			});
			
			this.setState({productos: productos});
		});
	}
	
	render() {
		const {clientes, productos} = this.state;
		
		const actualizarDatosProducto = async (evento) => {
			const id = document.getElementById('producto').value;
			
			const opcionesSolicitud = {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			
			fetch(config.apiURL + 'products/' + config.operatorId + '/' + id, opcionesSolicitud).then((respuesta) => {			
				return respuesta.json();
			}).then((json) => {
				document.getElementById('umv').value = json.data[0].MSU;
				document.getElementById('precio').value = json.data[0].price;
				document.getElementById('stock').value = json.data[0].stock;
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
									<h3 className="text-center">Panel de Ventas</h3>
								</div>
							</div>
							
							<form>
								<div className="row mt-3">
									<div className="col-12">
										<strong>Cliente:</strong>
										<br />
										<select id="cliente" className="form-control">
											<option value="0">Seleccione un cliente</option>
											{
												clientes.map(cliente => (
													<option key={cliente.id} value={cliente.id}>
														{cliente.name}
													</option>
												))
											}
										</select>
									</div>
								</div>
								
								<div className="row mt-3">
									<div className="col-12">
										<strong>Producto:</strong>
										<br />
										<select id="producto" defaultValue="0" onChange={actualizarDatosProducto} className="form-control">
											<option value="0" disabled="disabled">Seleccione un producto</option>
											{
												productos.map(producto => (
													<option key={producto.id} value={producto.id}>
														{producto.name}
													</option>
												))
											}
										</select>
									</div>
								</div>
								
								<div className="row mt-3">
									<div className="col-4">
										<strong>U.M.V:</strong>
										<br />
										<input id="umv" type="number" className="form-control" disabled autoComplete="off" />
									</div>
									<div className="col-4">
										<strong>Stock:</strong>
										<br />
										<input id="stock" type="number" className="form-control" disabled autoComplete="off" />
									</div>
								</div>
								
								<div className="row mt-3">
									<div className="col-4">
										<strong>Precio unitario:</strong>
										<br />
										<input id="precio" type="number" className="form-control" autoComplete="off" />
									</div>
								</div>
							</form>

							</div>
						</div>
					</section>
				</div>
			</div>
		);
	}
}

export default Sales;