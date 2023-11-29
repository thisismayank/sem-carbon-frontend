
import React, { useEffect, useState } from 'react';

import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

import { Modal, Container, Typography, TextField, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon, InputAdornment, IconButton, } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const Bank = ({ setOpen }) => {
    const [linkToken, setLinkToken] = useState('')
    const [publicToken, setPublicToken] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [currentBalance, setCurrentBalance] = useState('')
    const [name, setName] = useState('')
    const [officialName, setOfficialName] = useState('')
    const [accountId, setAccountId] = useState('')
    const [routingNumber, setRoutingNumber] = useState('')
    const [type, setType] = useState('')
    const [bankAccountConnected, setBankAccountConnected] = useState(false)



    const getAccountData = async (publicToken) => {
        console.log('publci', publicToken)
        const headers = {
            publicToken
        }
        let accessTokenResponse = null;
        try {

            const response = await axios.get("http://localhost:8000/v1/plaids/public/token", { headers: { ...headers } })
            await setAccessToken(response.data.results.accessToken)
            accessTokenResponse = response.data.results.accessToken
            sessionStorage.setItem('accessToken', response.data.results.accessToken);

            console.log('ACCESS TOKEN', accessToken, 'resp', accessTokenResponse)
        } catch (error) {
            console.log('error access token', error)
        }

        try {
            toast.warn('Getting Account Info ...', { autoClose: 2000 }); // Use toast for success

            const responseD = await axios.get("http://localhost:8000/v1/plaids/account",
                { headers: { accessToken: accessTokenResponse } })
            console.log("response d AUTH", responseD.data.results)
            setAccountId(responseD.data.results.numbers[0].account)
            setRoutingNumber(responseD.data.results.numbers[0].routing)
            setOfficialName(responseD.data.results.accounts[0].official_name)
            setName(responseD.data.results.accounts[0].name)
            setType(responseD.data.results.accounts[0].type)
            setCurrentBalance(responseD.data.results.accounts[0].balances.current)
            sessionStorage.setItem('accountId', responseD.data.results.numbers[0].account);
            sessionStorage.setItem('routingNumber', responseD.data.results.numbers[0].routing);
            sessionStorage.setItem('officialName', responseD.data.results.accounts[0].official_name);
            sessionStorage.setItem('name', responseD.data.results.accounts[0].name);
            sessionStorage.setItem('type', responseD.data.results.accounts[0].type);
            sessionStorage.setItem('subtype', responseD.data.results.accounts[0].subtype);
            sessionStorage.setItem('currentBalance', responseD.data.results.accounts[0].balances.current);


            // setBankAccountConnected(true);
        } catch (error) {
            console.log('error account daata', error)
        }

        try {
            const responseD = await axios.get("http://localhost:8000/v1/plaids/identity",
                { headers: { accessToken: accessTokenResponse } })
            console.log("response d AUTH", responseD.data.results)
            sessionStorage.setItem('ownerName', responseD.data.results.name);
            sessionStorage.setItem('ownerEmail', responseD.data.results.email);
            sessionStorage.setItem('phoneNumber', responseD.data.results.phoneNumber);
            sessionStorage.setItem('address', JSON.stringify(responseD.data.results.address));

            toast.success('Account connected ...', { autoClose: 2000 }); // Use toast for success
            setBankAccountConnected(true);
        } catch (error) {
            console.log('error account daata', error)
        }

    }



    useEffect(() => {
        async function fetchData() {

            const response = await axios.get("http://localhost:8000/v1/plaids/link/token")
            console.log('response', response.data.results)
            if (response.data.success)
                setLinkToken(response.data.results.link_token)
        }
        console.log('sess', sessionStorage.getItem('accountId'));
        if (sessionStorage.getItem('accountId')) {
            setBankAccountConnected(true);
        }

        fetchData();
    }, [])


    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: (public_token, metadata) => {
            // send public_token to server
            console.log('success', public_token, metadata)
            setPublicToken(public_token)

            getAccountData(public_token)
        },
    });

    return bankAccountConnected ? (
        <Button
            component={Link}
            to="/info"
            color="primary"
            fullWidth
            onClick={() => setOpen(false)}
            style={{
                borderRadius: '8px',
                background: 'green',
                boxShadow: '8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff, inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
                padding: '10px 20px',
                transition: 'box-shadow 0.3s ease-in-out',
                color: "white",
                fontWeight: "bold"
            }}
        >
            Go to Account Info

        </Button>) : (
        <Button variant="contained"
            onClick={() => open()} disabled={!ready}
            color="primary"
            fullWidth
            style={{
                borderRadius: '8px',
                background: '#3da8a9',
                boxShadow: '8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff, inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
                padding: '10px 20px',
                transition: 'box-shadow 0.3s ease-in-out',
            }}
        >
            Connect a bank account
        </Button>

        // <button onClick={() => open()} disabled={!ready}>
        //     Connect a bank account
        // </button>
    );
};

export default Bank;
