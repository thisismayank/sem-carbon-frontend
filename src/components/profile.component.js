

import React, { useState } from 'react';
// import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import { Modal, Container, Typography, TextField, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon, InputAdornment, IconButton, } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
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
import Bank from './bank.component';

const Profile = ({ emailInput, firstNameInput, lastNameInput }) => {



    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState(emailInput);
    const [firstName, setFirstName] = useState(firstNameInput);
    const [lastName, setLastName] = useState(lastNameInput);

    const [isValidEmail, setIsValidEmail] = useState(true);
    const logout = () => {
        toast.update('Logging out!', { autoClose: 3000 }); // Use toast for success

        sessionStorage.clear();
        window.location.href = "/login";

    }
    const validateEmail = (input) => {
        // Simple email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(input));
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        < >

            <Button onClick={handleOpen}> <AccountCircleIcon style={{ height: 50, width: 50, color: "black" }} /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    pt: 2,
                    px: 4,
                    pb: 3,
                    width: 400
                }}>
                    <Container component="main" maxWidth="xl">
                        <Paper elevation={3} style={{
                            padding: '2em',
                            marginTop: '2em',
                            textAlign: 'center',
                            borderRadius: '16px',
                            background: '#F1F1F1',
                            boxShadow: 'inset 20px 20px 60px #c0c0c0, inset -20px -20px 60px #ffffff, 20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
                            transition: 'box-shadow 0.3s ease-in-out',

                            margin: "20% auto",
                            // marginTop: "20%"
                        }}>
                            <img src={require('/Users/mayanka/client/src/assets/logo.png')} alt="Business Logo"
                                style={{
                                    width: 100,
                                    height: 100,
                                    marginBottom: '20px',
                                    borderRadius: "50%"
                                }}
                            />
                            <Typography>Welcome!</Typography>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    validateEmail(e.target.value)
                                }}
                                helperText={!isValidEmail && email.length > 2 ? <Typography color="red" variant="caption">Enter a valid email address</Typography> : ''}

                                style={{
                                    margin: '1em 0',
                                    background: '#F1F1F1',
                                    borderRadius: '8px',
                                    boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
                                    transition: 'box-shadow 0.3s ease-in-out',
                                }}

                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton color="primary">
                                                <MailOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="First Name"
                                type="email"
                                fullWidth
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}

                                style={{
                                    margin: '1em 0',
                                    background: '#F1F1F1',
                                    borderRadius: '8px',
                                    boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
                                    transition: 'box-shadow 0.3s ease-in-out',
                                }}

                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton color="primary">
                                                <BadgeOutlinedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Last Name"
                                type="email"
                                fullWidth
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)

                                }}


                                style={{
                                    margin: '1em 0',
                                    background: '#F1F1F1',
                                    borderRadius: '8px',
                                    boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
                                    transition: 'box-shadow 0.3s ease-in-out',
                                }}

                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton color="primary">
                                                <BadgeOutlinedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Divider style={{ margin: 24 }} />
                            <Bank setOpen={setOpen} />
                            <Divider style={{ margin: 12 }} />

                            <IconButton
                                onClick={logout}
                                style={{

                                    borderRadius: '50%',
                                    background: '#F1F1F1',
                                    boxShadow: '4px 4px 8px #c0c0c0, -4px -4px 8px #ffffff',
                                    transition: 'box-shadow 0.3s ease-in-out',
                                }}
                            >
                                <PowerSettingsNewIcon sx={{ color: "#d50000" }} />
                            </IconButton>
                        </Paper>
                    </Container>

                </Box>
            </Modal>

        </ >
    );
};

export default Profile;
