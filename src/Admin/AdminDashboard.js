
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

import KPIChart from './KPIChart';

import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { nowYMD } from '../datautils';


function AdminDashboard() {
    const statref = collection(db, "statistics");

    const [cards, setCards] = useState({
        ad_count: {title: "ADS", value: 0, valToday: 0, showValToday: true, valHist: {}, duration: 1.25, loading: true},
        user_count: {title: "USERS", value: 0, valToday: 0, showValToday: true, valHist: {}, duration: 1.5, loading: true}
    });

    const updateCards = data => setCards(prev => {
        //Update value and return same object
        return Object.fromEntries(
            Object.entries(prev).map(elem => {
                if (data !== undefined && data[elem[0]] !== undefined) elem[1].value = data[elem[0]];
                elem[1].loading = false;
				console.log("  update", elem);
                return elem;
            })
        );
    });

    //Auto fetch statistics when changed
    useEffect(() => onSnapshot(
        doc(statref, "site"),
        snapshot => { updateCards(snapshot.data()) }
    ), []);

	//Data for today's changes
    useEffect(() => onSnapshot(
        collection(statref, "site", "log"),
        snapshot => {
			const today = nowYMD();
			snapshot.docs.map(doc => ({
				[doc.id]: {
					valHist: doc.data(),
					valToday: doc.data()[today] || 0
				}
				})
			).map(elem => console.log(elem))
		}
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
