
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import DisplayRouteElements from '../DisplayRouteElements/DisplayRouteElements';


const useStyle = makeStyles((theme) => ({
    title: {
        fontWeight: 'bold',
        fontSize: '2rem',
        textTransform: 'uppercase',
        color: '#3bb2d0',
        marginTop: '4rem',
    },
    button: {
        color: 'white',
        backgroundColor: 'tomato',
        marginTop: '3rem',
        marginBottom: '3rem',
        '&:hover': {
            backgroundColor: 'tomato',
        },
    },
}));


export default function PopularCycles() {
    const classes = useStyle();

    return (
        <section className={classes.root}>
            <Typography variant="h2" gutterBottom className={classes.title}>
                Popular cycles
            </Typography>
            <Typography variant="body1" gutterBottom>
                Our routes do more than just get you there
            </Typography>
            <DisplayRouteElements />
            <Button size="large" component={Link} to="/" variant="contained" className={classes.button} >
                Explore All Routes
            </Button>
        </section>
    );
}
