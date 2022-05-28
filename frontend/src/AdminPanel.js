/**
 * Admin panel Backend routes
 */

import React from 'react';

import { Resource } from 'react-admin';

function AdminResources() {
    return (
		<>
            <Resource name="users" />
        </>
	);
}

export default AdminResources;