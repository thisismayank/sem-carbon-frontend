import React from 'react';
import { Grid, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';

const neumorphicButtonStyle = {
    height: 60,
    width: 60,
    borderRadius: '10px',
    boxShadow: 'rgb(255, 255, 255) -6px -6px 10px inset, rgb(255, 255, 255) -6px -6px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#95e1d352",
    color: "#0000006e"
};

const activeButtonStyle = {
    ...neumorphicButtonStyle,
    backgroundColor: "#4CAF50", // Set the background color for the active button
    color: "#ffffff", // Set the text color for the active button
};

const SideBar = () => {
    const location = useLocation();

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100%' }}
        >
            <Grid item style={{ marginBottom: 25 }}>
                <Button
                    component={Link}
                    to="/dashboard"
                    variant="contained"
                    color="primary"
                    style={location.pathname === '/dashboard' ? activeButtonStyle : neumorphicButtonStyle}
                >
                    <HomeOutlinedIcon />
                </Button>
            </Grid>
            <Grid item style={{ marginBottom: 25 }}>
                <Button
                    component={Link}
                    to="/info"
                    variant="contained"
                    color="primary"
                    style={location.pathname === '/info' ? activeButtonStyle : neumorphicButtonStyle}
                >
                    <ListOutlinedIcon />
                </Button>
            </Grid>
            <Grid item style={{ marginBottom: 25 }}>
                <Button
                    component={Link}
                    to="/settings"
                    variant="contained"
                    color="primary"
                    style={location.pathname === '/settings' ? activeButtonStyle : neumorphicButtonStyle}
                >
                    <SettingsOutlinedIcon />
                </Button>
            </Grid>
            <Grid item style={{ marginBottom: 25 }}>
                <Button
                    component={Link}
                    to="/sports"
                    variant="contained"
                    color="primary"
                    style={location.pathname === '/sports' ? activeButtonStyle : neumorphicButtonStyle}
                >
                    <SportsScoreOutlinedIcon />
                </Button>
            </Grid>
        </Grid>
    );
};

export default SideBar;
