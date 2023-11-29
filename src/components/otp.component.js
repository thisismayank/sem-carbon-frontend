import React, { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpComponent = ({ otp, setOtp, verifyOtp }) => {
    return (
        <>
            <TextField
                label="Enter OTP"
                type="text"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
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
                                <TokenIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={verifyOtp}
                style={{
                    borderRadius: '8px',
                    background: '#F1F1F1',
                    boxShadow: '8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff, inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
                    padding: '10px 20px',
                    transition: 'box-shadow 0.3s ease-in-out',
                }}
                disabled={otp.length !== 6 ? true : false}
            >
                Verify OTP
            </Button>
        </>
    );
};

export default OtpComponent;
