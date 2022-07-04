
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

import KPIChart from './KPIChart';

import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function AdminDashboard() {
    const statref = collection(db, "statistics");

    const [cards, setCards] = useState({
        ad_count: {title: "ADS", value: 0, duration: 1.25, loading: true},
        user_count: {title: "USERS", value: 0, duration: 1.5, loading: true}
    });

    const updateCards = data => setCards(prev => {
        //Update value and return same object
        return Object.fromEntries(
            Object.entries(prev).map(elem => {
                if (data !== undefined && data[elem[0]] !== undefined) elem[1].value = data[elem[0]];
                elem[1].loading = false;
                return elem;
            })
        );
    });

    //Auto fetch statistics when changed
    useEffect(() => onSnapshot(
        doc(statref, "site"),
        snapshot => { updateCards(snapshot.data()) }
    ), []);

    return (
        <Card>
            <CardHeader title={<span><b>TheServiceMan</b> Overview</span>} />
            <CardContent>
                <Typography color="textSecondary" gutterBottom variant="body2">Note: Time in the data is in UTC</Typography>
                <Grid
                    container
                    spacing={4} >
                    {Object.values(cards).map((item, index) => {
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
