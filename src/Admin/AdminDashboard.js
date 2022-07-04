
import React from "react";
import { Card, CardContent, CardHeader, Grid } from '@mui/material';

import KPIChart from './KPIChart';

//import { authProvider } from './AdminProvider';

function AdminDashboard() {
    //console.log(authProvider.getAuthUser);

    const cards = [
        {
            title: 'ORDERS',
            query: { measures: ['Orders.count'] },
            difference: 'Orders',
            duration: 1.25,
        },
        {
            title: 'TOTAL USERS',
            query: { measures: ['Users.count'] },
            difference: 'Users',
            duration: 1.5,
        },
        {
            title: 'COMPLETED ORDERS',
            query: { measures: ['Orders.percentOfCompletedOrders'] },
            progress: true,
            duration: 1.75,
        },
        {
            title: 'TOTAL PROFIT',
            query: { measures: ['LineItems.price'] },
            duration: 2.25,
        },
    ];

    return (
        <Card>
            <CardHeader title={<span>Welcome to the <b>TheServiceMan</b> Admin page</span>} />
            <CardContent>
                <Grid
                    container
                    spacing={4} >
                    {cards.map((item, index) => {
                        return (
                            <Grid
                                key={item.title + index}
                                item
                                lg={3}
                                sm={6}
                                xl={3}
                                xs={12}
                            >
                                <KPIChart {...item} />
                            </Grid>
                        )
                    })}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default AdminDashboard;
