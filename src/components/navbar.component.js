

import React, { useState } from 'react';
// import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import { Modal, Container, Typography, TextField, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon, InputAdornment, IconButton, } from '@mui/material';

import { Box, color, style } from '@mui/system';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SideBar from './sidebar.component';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BadgeIcon from '@mui/icons-material/Badge';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Profile from './profile.component';

const NavBar = ({ email, firstName, lastName }) => {
    const [open, setOpen] = useState(false);



    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        < >
            <AppBar style={{ boxShadow: "none", backgroundColor: "transparent", maxWidth: "100%" }}>
                <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <img
                        src={require('/Users/mayanka/client/src/assets/logo_.png')}
                        alt="Business Logo"
                        style={{
                            width: 80,
                            height: 80,
                            marginBottom: '12px',
                            // borderRadius: "50%"
                        }}
                    />
                    <div style={{ alignItems: 'center' }}>

                        <TextField
                            sx={{
                                "& fieldset": { border: 'none' },
                            }}
                            style={{
                                background: '#95e1d385',
                                borderRadius: '8px',
                                boxShadow: 'inset 2px 2px 5px #fff, inset -2px -2px 5px #95e1d3',
                                transition: 'box-shadow 0.3s ease-in-out',
                                marginRight: 16
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Profile emailInput={email} firstNameInput={firstName} lastNameInput={lastName} />
                    </div>
                </Toolbar>
            </AppBar >
        </ >
    );
};

export default NavBar;
