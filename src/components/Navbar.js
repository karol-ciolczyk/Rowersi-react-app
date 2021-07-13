import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, InputBase, fade, makeStyles, Grid } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

import SignUpModal from './SignUpModal/SignUpModal';
import LoginModal from './LoginModal/LoginModal';

import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        borderRight: '1px solid #ccc',
        paddingRight: '25px',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Navbar(props) {
    const classes = useStyles();

    const loggedInDataHandler = (uid) =>{
      props.onLoggedInData(uid);
    };

    return (
      <div className={classes.root}>
        <AppBar color="default">
          <Toolbar>
            <Typography
              component={Link}
              to={"/"}
              color="secondary"
              className={classes.title}
              variant="h4"
              noWrap
              style={{ textDecoration: 'none' }}
              >
              
            
              Rowersi
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Flexbox>
              <div>
                <LoginModal onLoggedInData={loggedInDataHandler}/>
                <SignUpModal />
                <Link to="/profile">
                  <IconButton aria-label="account">
                    <AccountCircle />
                  </IconButton>
                </Link>
              </div>
            </Flexbox>
          </Toolbar>
        </AppBar>
      </div>
    );
}


const Flexbox = styled.div`
margin-left: auto;
`
const LoginButton = styled(Button)`
background-color: tomato;
margin: 0 5px;
`