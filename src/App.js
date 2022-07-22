import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Login from './components/Login';
import Sales from './components/Sales';

import ClientsAdmin from './components/ClientsAdmin';
import ClientsAdd from './components/ClientsAdd';
import ClientsEdit from './components/ClientsEdit';

import ProductsAdmin from './components/ProductsAdmin';
import ProductsAdd from './components/ProductsAdd';
import ProductsEdit from './components/ProductsEdit';

import UsersAdmin from './components/UsersAdmin';
import UsersAdd from './components/UsersAdd';
import UsersEdit from './components/UsersEdit';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Login />}></Route>
				<Route path="/sales" element={<Sales />}></Route>
				<Route path="/clients" element={<ClientsAdmin />}></Route>
				<Route path="/clients/add" element={<ClientsAdd />}></Route>
				<Route path="/clients/edit" element={<ClientsEdit />}></Route>
				<Route path="/products" element={<ProductsAdmin />}></Route>
				<Route path="/products/add" element={<ProductsAdd />}></Route>
				<Route path="/products/edit" element={<ProductsEdit />}></Route>
				<Route path="/users" element={<UsersAdmin />}></Route>
				<Route path="/users/add" element={<UsersAdd />}></Route>
				<Route path="/users/edit" element={<UsersEdit />}></Route>
			</Routes>
		</div>
	);
}

export default App;