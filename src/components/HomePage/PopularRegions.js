import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ImageCard from './ImageCard';
import regions from './regions';
import useWindowPosition from './useWindowPosition';

const useStyle = makeStyles((theme) => ({
    regionCards: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '4rem',
        gap: '1rem',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    title: {
        fontWeight: 'bold',
        fontSize: '2rem',
        textTransform: 'uppercase',
        color: '#242424',
        marginTop: '4rem',
    }
}));

export default function PopularRegions() {
    const classes = useStyle();
    const checked = useWindowPosition('heroImage');

    return (
        <Container fixed>
            <Typography variant="h2" gutterBottom className={classes.title}>
                Popular regions
            </Typography>
            <Typography variant="body1" gutterBottom>
                Riding Is A Way To Explore... <br />
                A Way To Explore Nature And The World.
            </Typography>
            <div className={classes.regionCards}>
                <ImageCard region={regions[0]} checked={checked} />
                <ImageCard region={regions[1]} checked={checked} />
                <ImageCard region={regions[2]} checked={checked} />
                <ImageCard region={regions[3]} checked={checked} />
                <ImageCard region={regions[4]} checked={checked} />
                <ImageCard region={regions[5]} checked={checked} />
            </div>
        </Container>
    );
}
