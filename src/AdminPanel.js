/**
 * Admin panel Backend routes
 */

import React from 'react';

import { Admin, Resource } from 'react-admin';
import { dataProvider, authProvider } from './Admin/AdminProvider';
import AdminLoginPage from './Admin/AdminLoginPage';

import * as User from './Admin/ResourceUsers';
import * as Ad from './Admin/ResourceAds';
import * as Cat from './Admin/ResourceCategories';
import * as Loc from './Admin/ResourceLocations';

function AdminPanel() {
	return (
		<Admin	basename="/admin"
				dataProvider={dataProvider}
				authProvider={authProvider}
				loginPage={AdminLoginPage} >
			<Resource name="users" list={User.UserList} show={User.UserShow} edit={User.UserEdit} />
			<Resource name="serviceads" list={Ad.AdList} show={Ad.AdShow} edit={Ad.AdEdit} create={Ad.AdCreate} />
			<Resource name="adcategories" list={Cat.CatList} show={Cat.CatShow} edit={Cat.CatEdit} create={Cat.CatCreate} />
			<Resource name="locations" list={Loc.LocList} show={Loc.LocShow} edit={Loc.LocEdit} create={Loc.LocCreate} />
		</Admin>
	);
}

export default AdminPanel;
