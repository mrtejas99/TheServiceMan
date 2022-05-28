/**
 * Admin panel Backend routes
 */

import React from 'react';

import { Admin, Resource } from 'react-admin';
import { AdminResources } from './Admin/AdminResource';
import { dataProvider, authProvider } from './Admin/AdminProvider';

function AdminPanel() {
	return (
		<Admin basename="/admin" dataProvider={dataProvider} authProvider={authProvider}>
			<AdminResources />
		</Admin>
	);
}

export default AdminPanel;