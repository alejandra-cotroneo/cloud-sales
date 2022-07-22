import React from 'react';

import { Link } from 'react-router-dom';

function Sidebar() {
	return (
		<aside className="main-sidebar sidebar-dark-primary elevation-4">
			<div className="sidebar">
				<nav className="mt-2">
					<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
						<li className="nav-header">ACCESOS</li>
						<li className="nav-item">
							<Link to="/sales" className="nav-link">
								<p>Ventas</p>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/clients" className="nav-link">
								<p>Clientes</p>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/products" className="nav-link">
								<p>Productos</p>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/users" className="nav-link">
								<p>Usuarios</p>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;