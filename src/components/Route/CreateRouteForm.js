import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '50ch',
        },
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: '40px',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: '50ch',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CreateRouteForm() {
    const classes = useStyles();
    const [region, setRegion] = React.useState('');

    const handleChange = (event) => {
        setRegion(event.target.value);
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography
                    color="primary"
                    className={classes.title}
                    variant="h5"
                    noWrap>
                    Create New Route
                </Typography>

                <form form className={classes.root} noValidate autoComplete="off" >
                    <div>
                        <TextField
                            id="startRoute"
                            label="Start Route"
                            variant="outlined"
                        />
                        <TextField
                            id="endRoute"
                            label="End Route"
                            variant="outlined"
                        />
                        <TextField
                            id="distance"
                            label="Distance in km"
                            variant="outlined"
                        />
                        <TextField
                            id="time"
                            label="Time in hours"
                            variant="outlined"
                        />
                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="select-region">Region</InputLabel>
                            <Select
                                labelId="select-region"
                                id="select-region"
                                value={region}
                                onChange={handleChange}
                                label="Region"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>Greater Poland</MenuItem>
                                <MenuItem value={2}>Kuyavia</MenuItem>
                                <MenuItem value={3}>Mazury</MenuItem>
                                <MenuItem value={4}>Podhale</MenuItem>
                                <MenuItem value={5}>Pomerania</MenuItem>
                                <MenuItem value={6}>Silesia</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </form>
            </div>
        </Container>
    );
}