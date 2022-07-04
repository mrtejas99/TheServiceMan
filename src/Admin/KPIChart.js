import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, LinearProgress, CircularProgress } from '@mui/material';
import CountUp from 'react-countup';

function KPIChart(props) {
    const { title, progress, query, difference, duration, ...rest } = props;
    const fullValue = 40;

    return (
        <Card color="secondary" {...rest}>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography color="textSecondary" gutterBottom variant="body2">
                            {title}
                        </Typography>
                        <Typography variant="h3">
                            <CountUp
                                end={fullValue}
                                duration={duration}
                                separator=","
                                decimals={0}
                            />
                        </Typography>
                    </Grid>
                </Grid>
                {progress ? (
                    <LinearProgress
                        value={fullValue}
                        variant="determinate"
                    />
                ) : null}
            </CardContent>
        </Card>
    );
}

KPIChart.propTypes = {
    title: PropTypes.string,
};

export default KPIChart;