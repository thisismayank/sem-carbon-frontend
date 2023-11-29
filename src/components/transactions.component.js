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
import LuggageIcon from '@mui/icons-material/Luggage';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
const Transactions = () => {
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
    const [transactions, setTransactions] = useState([]);

    const accountData = {
        accountId: '123456789',
        routingNumber: '987654321',
        accountName: 'John Doe',
        balance: '$1,000.00',
        accountType: 'Savings',
    };
    const iconStyle = {
        height: "0.5em",
        width: "0.5em"

    }
    const categoryIconMapping = {
        'Travel': <LuggageIcon style={{ ...iconStyle }} />,
        'Taxi': <LocalTaxiIcon style={{ ...iconStyle }} />,
        'Airlines and Aviation Services': <ConnectingAirportsIcon style={{ ...iconStyle }} />,
        'Food and Drink': <DinnerDiningIcon style={{ ...iconStyle }} />,
        'Restaurants': <RestaurantIcon style={{ ...iconStyle }} />,
        'Fast Food': <FastfoodIcon style={{ ...iconStyle }} />,
        'Coffee Shop': <CoffeeMakerIcon style={{ ...iconStyle }} />
    }

    const categoryWeight = {
        'Travel': 0,
        'Taxi': 0,
        'Airlines and Aviation Services': 0,
        'Food and Drink': 0,
        'Restaurants': 0,
        'Fast Food': 0,
        'Coffee Shop': 0
    }
    let monthWiseTransactionData = {}
    let yearWiseTransactionData = {}
    useEffect(() => {
        // This effect runs after the initial render
        for (const transaction of transactions) {
            const key = moment(transaction.authorized_date).subtract(1, "month").startOf("month").format('MMMM');
            monthWiseTransactionData[key] = monthWiseTransactionData[key] ? monthWiseTransactionData[key] + 1 : 1;
            let year = moment(transaction.authorized_date).year();
            yearWiseTransactionData[year] = { ...monthWiseTransactionData }
        }
        console.log('monthWiseTransactionData', monthWiseTransactionData, yearWiseTransactionData)
        // Store monthWiseTransactionData in sessionStorage
        sessionStorage.setItem('yearWiseTransactionData', JSON.stringify(yearWiseTransactionData));
    }, [transactions]);
    const getTransactions = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');


            const response = await axios.get('http://localhost:8000/v1/plaids/transactions', {
                headers: {
                    'Authorization': `Bearer ${userId},${authToken}`,
                    "Content-Type": "application/json",
                    accessToken
                }
            });

            if (response.data.success) {

                console.log('response.data.', response.data)
                setTransactions(response.data.results.added);
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
        getTransactions()
    }, []);
    useEffect(() => {
        // This function will be triggered after the rendering is complete
        // yourFunctionToTrigger();
        console.log('categoryWeight', categoryWeight);
        sessionStorage.setItem('categoryWeightedDistribution', JSON.stringify(categoryWeight))

    }, [transactions]);
    return (
        <div style={{ position: "relative", top: 0 }}>


            {transactions && (
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
                        >Transactions</Typography>
                        {transactions.length === 0 ? (
                            <Typography variant="body1">No orders available.</Typography>
                        ) : (
                            <>
                                <List>
                                    {transactions.map((transaction) => {

                                        return (
                                            <Paper style={{
                                                marginBottom: 16,
                                                borderRadius: '8px',
                                                background: '#F1F1F1',
                                                boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
                                            }}>
                                                <ListItem key={transaction.transaction_id}
                                                >
                                                    <ListItemIcon>
                                                        <a href={`https://www.${transaction.website}`} target='_blank'><img
                                                            src={transaction.logo_url}
                                                            alt={transaction.merchant_name}
                                                            style={{
                                                                width: 40,
                                                                height: 40,
                                                                marginBottom: '12px',
                                                                // borderRadius: "50%"
                                                            }}
                                                        />
                                                        </a>

                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={`TxnID: ...${transaction.transaction_id.substring(24)}`}
                                                        secondary={`${transaction.payment_channel.charAt(0).toUpperCase()}${transaction.payment_channel.substring(1)}`}
                                                        primaryTypographyProps={{
                                                            variant: 'subtitle1',
                                                            style: {
                                                                fontWeight: 'bold',
                                                                color: '#333', // Adjust color as needed
                                                                fontSize: 10
                                                            },
                                                        }}
                                                        secondaryTypographyProps={{
                                                            variant: 'body2',
                                                            style: {
                                                                fontStyle: 'italic',
                                                                color: '#555', // Adjust color as needed
                                                                fontSize: 8
                                                            },
                                                        }}
                                                    />
                                                    <Typography variant="caption" style={{ marginLeft: 'auto', marginRight: '8px' }}>
                                                        <ListItemText
                                                            primary={`${transaction.amount} ${transaction.iso_currency_code}`}
                                                            secondary={moment(transaction.authorized_date).format('MMM D, YYYY ')}
                                                            primaryTypographyProps={{
                                                                variant: 'subtitle1',
                                                                style: {
                                                                    fontWeight: 'bold',
                                                                    color: '#333', // Adjust color as needed
                                                                    fontSize: 10
                                                                },
                                                            }}
                                                            secondaryTypographyProps={{
                                                                variant: 'body2',
                                                                style: {
                                                                    fontStyle: 'italic',
                                                                    color: '#555', // Adjust color as needed
                                                                    fontSize: 8
                                                                },
                                                            }}
                                                        />

                                                    </Typography>
                                                    <IconButton onClick={() => { }}
                                                        style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        {transaction.category.map(cat => {
                                                            categoryWeight[cat] = categoryWeight[cat] + 1
                                                            return categoryIconMapping[cat]
                                                        })}
                                                    </IconButton>

                                                    { }
                                                </ListItem>
                                            </Paper>
                                        )
                                    })}
                                </List>
                            </>
                        )}
                    </Paper>
                </Container>
            )}
        </div>


    );
};



export default Transactions;