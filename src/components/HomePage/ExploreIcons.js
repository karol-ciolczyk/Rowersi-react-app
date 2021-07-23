import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MapIcon from '@material-ui/icons/Map';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ExploreIcon from '@material-ui/icons/Explore';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '4rem',
        backgroundColor: '#fff',
        paddingTop: '1rem',
        paddingBottom: '2rem',
    },
    iconBox: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    title: {
        fontWeight: 'bold',
        fontSize: '2rem',
        textTransform: 'uppercase',
        color: '#3bb2d0',
        marginTop: '2rem',
    },
    avatar: {
        width: '80px',
        height: '80px',
        marginRight: '1rem',
        border: '4px solid #3bb2d0',
        backgroundColor: 'transparent',
    },
    icon: {
        width: '3rem',
        height: '3rem',
        color: '#3bb2d0',
    },

}));

export default function ExploreIcons() {
    const classes = useStyles();

    return (
        <section className={classes.root}>
            <Container fixed>
                <Typography variant="h2" gutterBottom className={classes.title}>
                    Biking... Feel Good
                </Typography>
                <List className={classes.iconBox}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <MapIcon className={classes.icon} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Discover" secondary="the most beautiful places" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <DirectionsBikeIcon className={classes.icon} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Cycling" secondary="as sustainable tourism" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <ExploreIcon className={classes.icon} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="The adventure" secondary="goes on and on" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <LocalFloristIcon className={classes.icon} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Our Vision" secondary="active and healthy lifestyle" />
                    </ListItem>
                </List>
            </Container>
        </section>
    );
}