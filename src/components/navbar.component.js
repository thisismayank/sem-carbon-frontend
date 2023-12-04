

import React, { useState } from 'react';
// import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import axios from "axios"
// import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import { Modal, Container, Typography, TextField, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon, InputAdornment, IconButton, } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

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
    const [searchText, setSearchText] = useState('');
    const [apiResponse, setApiResponse] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSearchText('')
    };

    const handleSearch = async () => {
        try {

            toast.success('Hmm... give me a few seconds to think..!', { autoClose: 2000 });
            const response = await axios.post('http://localhost:8000/v1/chats', {
                prompt: searchText,
            });

            // Assuming the response has a property named 'data'
            toast.success('Response generated successfully!', { autoClose: 1000 });
            const responseData = response.data.results.completion;

            // Set the API response in state
            setApiResponse(responseData);

            // Open the modal
            handleOpen();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
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
                            id="searchBar"
                            value={searchText}
                            onChange={handleInputChange}
                            style={{
                                background: '#95e1d385',
                                borderRadius: '8px',
                                boxShadow: 'inset 2px 2px 5px #fff, inset -2px -2px 5px #95e1d3',
                                transition: 'box-shadow 0.3s ease-in-out',
                                marginRight: 16,
                            }}

                            InputProps={{
                                endAdornment: (
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                        <Profile emailInput={email} firstNameInput={firstName} lastNameInput={lastName} />
                    </div>
                </Toolbar>
            </AppBar >

            <Modal open={open} onClose={handleClose}>
                <Container maxWidth="sm" style={{ marginTop: '20vh', textAlign: 'center', padding: '20px', backgroundColor: 'white', borderRadius: 20, fontFamily: "verdama", padding: 24 }}>
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
                    <Typography variant="h5" style={{ fontFamily: "verdama", padding: "0px 24px 24px 24px" }}>{searchText}</Typography>
                    {/* Display the API response here */}
                    <Typography style={{ fontFamily: "verdama", padding: 24 }}>{apiResponse}</Typography>
                </Container>
            </Modal>
        </ >
    );
};

export default NavBar;
