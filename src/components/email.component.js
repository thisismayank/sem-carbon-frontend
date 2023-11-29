import React, { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton, Typography, Container } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TokenIcon from '@mui/icons-material/Token';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailComponent = ({ email, setEmail, validateEmail, generateOtp, isValidEmail }) => {
    // const [isValidEmail, setIsValidEmail] = useState(false);

    return (
        <>
            <Container component="main" maxWidth="xs" style={{ width: 400 }}>
                <Typography variant="h5" style={{ fontWeight: 900 }}>Welcome!</Typography>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                    }}
                    helperText={!isValidEmail && email.length > 2 ? <Typography color="red" variant="caption">Enter a valid email address</Typography> : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton color="primary">
                                    <MailOutlineIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    style={{
                        margin: '1em 0',
                        background: '#F1F1F1',
                        borderRadius: '8px',
                        boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
                        transition: 'box-shadow 0.3s ease-in-out',
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={generateOtp}
                    style={{
                        borderRadius: '8px',
                        background: '#F1F1F1',
                        boxShadow: '8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff, inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
                        padding: '10px 20px',
                        transition: 'box-shadow 0.3s ease-in-out',
                    }}
                    disabled={!isValidEmail}
                >
                    Send OTP
                </Button>
            </Container>
        </>
    );
};

export default EmailComponent;
