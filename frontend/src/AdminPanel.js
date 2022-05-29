/**
 * Admin panel Backend routes
 */

import React from 'react';

import { Admin, Resource } from 'react-admin';
import { dataProvider, authProvider } from './Admin/AdminProvider';
import AdminLoginPage from './Admin/AdminLoginPage'

function AdminPanel() {
	return (
		<Admin	basename="/admin"
				dataProvider={dataProvider}
				authProvider={authProvider}
				loginPage={AdminLoginPage} >
			<Resource name="users" />
		</Admin>
	);
}

export default AdminPanel;