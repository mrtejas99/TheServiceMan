
import React from "react";
import { Card, CardContent, CardHeader } from '@mui/material';

import { authProvider } from './AdminProvider';

function AdminDashboard() {
    console.log(authProvider.getAuthUser);
    return (
        <Card>
            <CardHeader title={<span>Welcome to the <b>TheServiceMan</b> Admin page</span>} />
            <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        </Card>
    );
}

export default AdminDashboard;
