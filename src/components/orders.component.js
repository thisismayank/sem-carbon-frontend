import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon, InputAdornment, IconButton, } from '@mui/material';
import axios from 'axios';

import SideBar from './sidebar.component';
import NavBar from './navbar.component';
import Center from './center.component';
import Account from './account.component';
import Co2Icon from '@mui/icons-material/Co2';
import moment from "moment"
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';

const Orders = () => {
    const location = useLocation();
    const userId = sessionStorage.getItem('userId')
    const authToken = sessionStorage.getItem('authToken')

    const [message, setMessage] = useState('');

    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [certificateUrl, setCertificateUrl] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');
    const [listOfOrders, setListOfOrders] = useState(null);
    const accountData = {
        accountId: '123456789',
        routingNumber: '987654321',
        accountName: 'John Doe',
        balance: '$1,000.00',
        accountType: 'Savings',
    };

    const getListOfOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/v1/carbon/cn', {
                headers: {
                    'Authorization': `Bearer ${userId},${authToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data.success) {

                setListOfOrders(response.data.results.listOfOrders);
                toast.success('List of orders fetched successfully!', { autoClose: 3000 }); // Use toast for success

            } else {
                setMessage('Failed to register user. Please try again.');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage('Failed to register user. Please try again.');
        }
        // Additional logic for placing an order
    };

    useEffect(() => {
        getListOfOrders()
    }, []);
    return (
        <div style={{ position: "relative", top: 0 }}>


            {listOfOrders && (
                <Container maxWidth="md" style={{ position: "relative" }}>
                    <Paper elevation={3} style={{
                        padding: '0em 2em 2em 2em',
                        marginTop: '2em',
                        textAlign: 'center',
                        borderRadius: '16px',
                        background: '#F1F1F1',
                        boxShadow: '#efefef 20px 20px 60px inset, inset -20px -20px 60px #ffffff, 20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
                        transition: 'box-shadow 0.3s ease-in-out',
                        height: '75vh',  // Set a fixed height for the scrollable area
                        overflowY: 'auto',  // Enable vertical scrolling
                    }}>


                        <Typography variant="h5"
                            style={{
                                marginBottom: '1em',
                                fontWeight: 'bold',
                                color: '#333', // Adjust color as needed
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Add a subtle text shadow
                                position: 'sticky',
                                top: '0',
                                zIndex: '1',
                                borderRadius: '8px',
                                background: '#F1F1F1',
                                boxShadow: '#bebebe 8px 8px 16px, #ffffff -8px -8px 16px,#ffffff -8px -8px 16px,#00 -8px -8px 16px',
                                padding: '1em',  // Add padding for better visibility
                            }}
                        >Orders</Typography>
                        {listOfOrders.length === 0 ? (
                            <Typography variant="body1">No orders available.</Typography>
                        ) : (
                            <>
                                <List>
                                    {listOfOrders.map((order) => (
                                        <Paper style={{
                                            marginBottom: 16,
                                            borderRadius: '8px',
                                            background: '#F1F1F1',
                                            boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
                                        }}>
                                            <ListItem key={order._id}
                                            >
                                                <ListItemIcon>
                                                    <Co2Icon color="primary" />

                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`Transaction ID: ${order.transactionId}`}
                                                    secondary={`Amount: ${order.amountInKg} kg`}
                                                    primaryTypographyProps={{
                                                        variant: 'subtitle1',
                                                        style: {
                                                            fontWeight: 'bold',
                                                            color: '#333', // Adjust color as needed
                                                        },
                                                    }}
                                                    secondaryTypographyProps={{
                                                        variant: 'body2',
                                                        style: {
                                                            fontStyle: 'italic',
                                                            color: '#555', // Adjust color as needed
                                                        },
                                                    }}
                                                />
                                                <Typography variant="caption" style={{ marginLeft: 'auto', marginRight: '8px' }}>
                                                    {moment(order.createdAt).format('YYYY, MMM D ')}
                                                </Typography>
                                                <IconButton onClick={() => { }}
                                                    style={{ marginLeft: 'auto' }}>
                                                    <CloseIcon color="error" />
                                                </IconButton>
                                            </ListItem>
                                        </Paper>
                                    ))}
                                </List>
                            </>
                        )}
                    </Paper>
                </Container>
            )}
        </div>


    );
};



export default Orders;