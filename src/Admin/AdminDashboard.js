
import React from "react";
import { Card, CardContent, CardHeader } from '@mui/material';

import { authProvider } from './AdminProvider';

function AdminDashboard() {
    console.log(authProvider.getAuthUser);
    return (
        <Card>
            <CardHeader title="Welcome to the administration" />
            <CardContent>Lorem ipsum sic dolor amet...</CardContent>
        </Card>
    );
}

export default AdminDashboard;
