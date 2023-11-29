import React from 'react';
import { TextField, Button } from '@mui/material';

const NameComponent = ({ firstName, setFirstName, lastName, setLastName, registerUser }) => {
    return (
        <>
            <TextField
                label="First Name"
                type="text"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                    margin: '1em 0',
                    background: '#F1F1F1',
                    borderRadius: '8px',
                    boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
                    transition: 'box-shadow 0.3s ease-in-out',
                }}
            />

            <TextField
                label="Last Name"
                type="text"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                onClick={registerUser}
                style={{
                    marginBottom: '1em',
                    borderRadius: '8px',
                    background: '#F1F1F1',
                    boxShadow: '8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff, inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
                    padding: '10px 20px',
                    transition: 'box-shadow 0.3s ease-in-out',
                }}
            >
                Register
            </Button>
        </>
    );
};

export default NameComponent;
