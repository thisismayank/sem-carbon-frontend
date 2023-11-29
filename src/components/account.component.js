
import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, Button, IconButton, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const neumorphicStyles = {
    padding: '16px',
    marginTop: '16px',
    background: '#ffffff', // Background color
    boxShadow: '5px 5px 10px #b8b8b8, -5px -5px 10px #ffffff', // Neumorphic box shadow
    borderRadius: '8px', // Border radius
};

const marginBottom8px = {
    marginBottom: '8px',
};

const Account = () => {
    const [isRoutingNumberVisible, setRoutingNumberVisible] = useState(false);
    const [isAccountIdVisible, setAccountIdVisible] = useState(false);

    const handleToggleRoutingNumber = () => {
        setRoutingNumberVisible(!isRoutingNumberVisible);
    };

    const handleToggleAccountId = () => {
        setAccountIdVisible(!isAccountIdVisible);
    };
    useEffect(() => {

    }, [])

    const accountId = sessionStorage.getItem('accountId') || '123456789';
    const routingNumber = sessionStorage.getItem('routingNumber') || '987654321';
    const officialName = sessionStorage.getItem('officialName') || 'Plaid Gold Standard 0% Interest Checking';
    const accountName = sessionStorage.getItem('name') || 'Chase Alias';
    const accountType = sessionStorage.getItem('type') || 'Depository';
    const accountSubType = sessionStorage.getItem('subtype') || 'Savings'
    const balance = `$${sessionStorage.getItem('currentBalance')}.00` || '$1,000.00';
    const ownerName = sessionStorage.getItem('ownerName') || 'John Doe'
    const ownerEmail = sessionStorage.getItem('ownerEmail') || 'JohnDoe@gmail.com'
    const phoneNumber = sessionStorage.getItem('phoneNumber') || '1234567890'
    const address = JSON.parse(sessionStorage.getItem('address')) || 'Street x, 123'


    return (

        <Paper elevation={3} style={{ ...neumorphicStyles }}>
            <Typography variant="h5" gutterBottom style={{
                marginBottom: 24, fontWeight: 'bold',
                color: '#333', // Adjust color as needed
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            }}>
                Account Information
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body1" style={{ marginBottom: '8px', display: "inline" }}>
                        <strong>Account ID:</strong>{' '}
                        {isAccountIdVisible ? accountId : '****************'}
                    </Typography>
                    <IconButton onClick={handleToggleAccountId} edge="end">
                        {isAccountIdVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" style={{ marginBottom: '8px', display: "inline" }}>
                        <strong>Routing Number:</strong>{' '}
                        {isRoutingNumberVisible ? routingNumber : '**********'}
                    </Typography>
                    <IconButton onClick={handleToggleRoutingNumber} edge="end">
                        {isRoutingNumberVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" style={{}}>
                        <strong>Name:</strong> {accountName}
                    </Typography>
                    <Typography variant="caption" style={{ ...marginBottom8px, opacity: 0.5 }}>
                        {officialName}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" style={marginBottom8px}>
                        <strong>Balance:</strong> {balance}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" style={{}}>
                        <strong>Account Type:</strong> {`${accountType.toString().charAt(0).toUpperCase()}${accountType.toString().substring(1)}`}
                    </Typography>
                    <Typography variant="caption" style={{ ...marginBottom8px, opacity: 0.5 }}>
                        {`${accountSubType.toString().charAt(0).toUpperCase()}${accountSubType.toString().substring(1)}`}
                    </Typography>
                </Grid>
            </Grid>
            <Divider style={{ margin: 32 }} />
            <Typography variant="h5" gutterBottom style={{
                marginBottom: 24, fontWeight: 'bold',
                color: '#333', // Adjust color as needed
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            }}>
                Personal Information
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body1" style={{}}>
                        <strong>Owner Name:</strong> {ownerName}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" style={{}}>
                        <strong>Email:</strong> {ownerEmail}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" style={{}}>
                        <strong>Phone:</strong> {phoneNumber}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" style={{}}>
                        <strong>Address:</strong> {`${address.street}, ${address.city}`}
                    </Typography>
                    <Typography variant="caption" style={{ ...marginBottom8px, fontSize: 14, fontFamily: 'none', opacity: 0.5 }}>
                        {`${address.region}, ${address.country} ${address.postal_code}`}
                    </Typography>

                </Grid>
            </Grid>

        </Paper>

    );
};

export default Account;
