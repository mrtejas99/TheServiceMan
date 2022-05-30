/**
 * Admin panel Backend routes
 */

import React from 'react';

import { Admin, Resource } from 'react-admin';
import { dataProvider, authProvider } from './Admin/AdminProvider';
import AdminLoginPage from './Admin/AdminLoginPage';

import * as User from './Admin/ResourceUsers';
import * as Ad from './Admin/ResourceAds';

function AdminPanel() {
	return (
		<Admin	basename="/admin"
				dataProvider={dataProvider}
				authProvider={authProvider}
				loginPage={AdminLoginPage} >
			<Resource name="users" list={User.UserList} show={User.UserShow} edit={User.UserEdit} />
			<Resource name="serviceads" list={Ad.AdList} show={Ad.AdShow} edit={Ad.AdEdit} />
		</Admin>
	);
}

export default AdminPanel;