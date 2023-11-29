import React, { useState } from 'react';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';


import { Container, Typography, TextField, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon, InputAdornment, IconButton, } from '@mui/material';
import Co2Icon from '@mui/icons-material/Co2';
import moment from "moment"

import { ToastContainer, toast } from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

import { PieChart } from '@mui/x-charts/PieChart';
import Transactions from './transactions.component';
import Orders from './orders.component';

const Lists = () => {

    return (

        <Grid container direction="row" style={{ height: "90vh" }}>
            {/* First Box */}
            <Grid item xs={6} >

                <Orders />
            </Grid>
            {/* Second Box */}
            <Grid item xs={6}>
                <Transactions />
            </Grid>
        </Grid>


    );
};

export default Lists;
