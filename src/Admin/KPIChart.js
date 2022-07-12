import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, LinearProgress, Backdrop, CircularProgress } from '@mui/material';
import CountUp from 'react-countup';

function KPIChart(props) {
    const { title, value, valToday, showValToday, valHist, loading, progress, difference, duration, ...rest } = props;

    return (
        <Card {...rest} style={{position: 'relative'}}>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography color="textSecondary" gutterBottom variant="body2">{title}</Typography>
                        <Typography variant="h3">
                            <CountUp
                                end={value}
                                duration={duration}
                                separator=","
                                decimals={0}
                                preserveValue={true}
                            />
                        </Typography>
						<Typography variant="body2">
						{ (showValToday && valToday !== undefined) && (
							<CountUp
								end={valToday}
								duration={duration}
								separator=","
								decimals={0}
								preserveValue={true}
								suffix=" today"
							/>
						)}
                        </Typography>
                    </Grid>
                </Grid>
                {progress ? (
                    <LinearProgress
                        value={value}
                        variant="determinate"
                    />
                ) : null}
                <Backdrop open={loading || false} style={{position: 'absolute'}}>
                    <CircularProgress color="secondary" />
                </Backdrop>
            </CardContent>
        </Card>
    );
}

KPIChart.propTypes = {
    title: PropTypes.string,
};

export default KPIChart;