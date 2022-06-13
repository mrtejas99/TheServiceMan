/**
 * Admin panel Backend routes
 */

import React from 'react';

import { Admin, Resource } from 'react-admin';
import { dataProvider, authProvider, adminAuthProvider } from './Admin/AdminProvider';
import AdminLoginPage from './Admin/AdminLoginPage';
import AdminDashboard from './Admin/AdminDashboard';

import * as User from './Admin/ResourceUsers';
import * as Ad from './Admin/ResourceAds';
import * as Cat from './Admin/ResourceCategories';
import * as Loc from './Admin/ResourceLocations';

//Some icons for the side-panel (from Material UI)
import {
	Group as UserIcon,
	Category as AdCategoriesIcon,
	MyLocation as LocationIcon
} from '@mui/icons-material';

function AdminPanel() {
	return (
		<Admin	basename="/admin"
				dataProvider={dataProvider}
				authProvider={authProvider}
				loginPage={AdminLoginPage}
				dashboard={AdminDashboard} >
			<Resource name="users" list={User.UserList} show={User.UserShow} edit={User.UserEdit} icon={UserIcon} />
			<Resource name="serviceads" list={Ad.AdList} show={Ad.AdShow} edit={Ad.AdEdit} create={Ad.AdCreate} />
			<Resource name="adcategories" list={Cat.CatList} show={Cat.CatShow} edit={Cat.CatEdit} create={Cat.CatCreate} icon={AdCategoriesIcon} />
			<Resource name="locations" list={Loc.LocList} show={Loc.LocShow} edit={Loc.LocEdit} create={Loc.LocCreate} icon={LocationIcon} />
		</Admin>
	);
}

export default AdminPanel;
