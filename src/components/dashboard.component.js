import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import SideBar from './sidebar.component';
import NavBar from './navbar.component';
import Center from './center.component';
import Account from './account.component';
import Orders from './orders.component';
import Lists from './lists.component';

const Dashboard = () => {
    const location = useLocation();



    const email = sessionStorage.getItem('email');
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');




    return (
        <>
            <NavBar email={email} firstName={firstName} lastName={lastName} />

            {/* Left Panel */}
            <Grid container style={{ height: "calc(100% - 64px)", marginTop: 64 }}>
                <Grid item xs={1} style={{ position: 'fixed', height: '100%' }}>
                    {/* Left Panel Content */}
                    <SideBar />
                </Grid>

                {/* Central Section */}
                <Grid item xs={11} style={{ position: "relative", marginLeft: '72px', overflow: 'hidden', height: '100%' }}>
                    {/* Use Routes to render only the first matching route */}
                    <Routes>
                        <Route path="/dashboard" element={<Center />} />
                        <Route path="/info" element={<Lists />} />
                        <Route path="/settings" element={<Account />} />

                        {/* Add more routes as needed */}
                    </Routes>
                </Grid>
            </Grid>
        </>
    );
};



export default Dashboard;