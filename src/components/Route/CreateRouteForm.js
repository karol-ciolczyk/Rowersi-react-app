import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UploadImages from '../ImageUpload/UploadImages';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    container: {
        marginRight: '0px',
    },
    paper: {
        marginTop: '20px',
        paddingBottom: '20px',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: '20px',
        paddingBottom: '10px',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    formFullWidth: {
        margin: theme.spacing(2),
        width: '55ch',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    submit: {
        width: '55ch',
        margin: '10px auto',
        padding: '10px',
    },
}));

export default function CreateRouteForm() {
    const classes = useStyles();
    const [region, setRegion] = React.useState('');

    const handleChange = (event) => {
        setRegion(event.target.value);
    };

    return (
        <Container maxWidth="sm" className={classes.container}>
            <Paper className={classes.paper}>
                <CssBaseline />
                <div>
                    <Typography
                        color="primary"
                        className={classes.title}
                        variant="h5"
                        noWrap>
                        Create New Route
                    </Typography>

                    <form form className={classes.root} noValidate autoComplete="off" >
                        <div>
                            <TextField className={classes.formFullWidth}
                                id="routeTitle"
                                label="Enter a title for your route"
                                variant="outlined"
                            />
                            <TextField className={classes.formFullWidth}
                                id="description"
                                label="Description"
                                multiline
                                rows={3}
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

                            <FormControl variant="outlined" className={classes.formFullWidth}>
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
                        <UploadImages />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}