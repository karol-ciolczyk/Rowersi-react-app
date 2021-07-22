import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import PopularRegions from './PopularRegions';

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
        fontSize: '4rem',
        textTransform: 'uppercase',
        textAlign: 'left',
        marginLeft: '15rem',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '3rem',
            fontSize: '3rem',
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
                <Collapse in={checked} {...(true ? { timeout: 1000 } : {})} collapsedHeight={50}>
                    <div>
                        <h1 className={classes.title}>Biking... <br />Feel Good</h1>
                    </div>
                </Collapse>
            </section>
            <PopularRegions />
        </div>
    )
}