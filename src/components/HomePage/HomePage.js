import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import PopularRegions from './PopularRegions';
import ExploreIcons from './ExploreIcons';
import PopularCycles from './PopularCycles';

const useStyle = makeStyles((theme) => ({
    heroImage: {
        height: '600px',
        width: '100%',
        backgroundImage: `url(/assets/bcg.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        marginTop: '-20px',
        [theme.breakpoints.down('sm')]: {
            height: '300px',
            fontSize: '2.5rem',
        },
    },
    title: {
        color: '#fff',
        fontSize: '3rem',
        textTransform: 'uppercase',
        textAlign: 'left',
        marginLeft: '12rem',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '3rem',
            fontSize: '2rem',
        },
    },
}));

export default function HomePage() {
    const classes = useStyle();
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setChecked(true);
    }, [])
    return (
        <div className={classes.root} >
            <section className={classes.heroImage} id="heroImage">
                <CssBaseline />
                <Collapse in={checked} {...(true ? { timeout: 2000 } : {})} collapsedHeight={50}>
                    <h1 className={classes.title}>Check out the best <br />cycling routes and<br />places in Poland</h1>
                </Collapse>
            </section>
            <ExploreIcons />
            <PopularRegions />
            <PopularCycles />
        </div>
    )
}