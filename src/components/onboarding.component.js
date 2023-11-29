import React, { useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailComponent from './email.component';
import OtpComponent from './otp.component';
import NameComponent from './register.component';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Rest of the code remains the same...
const theme = createTheme({
    palette: {
        primary: {
            main: '#4CAF50', // Green color for eco-friendliness
        },
        background: {
            default: '#F1F1F1', // Light background color
        },
    },
});
const Onboarding = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [generatedOtp, setGeneratedOtp] = useState('');
    const [message, setMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const [isRegistered, setIsRegistered] = useState(false);

    const [isNameEntered, setIsNameEntered] = useState(false);
    const [authToken, setAuthToken] = useState('');
    const [userId, setUserId] = useState('');
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [certificateUrl, setCertificateUrl] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');


    const [listOfOrders, setListOfOrders] = useState(null);


    const [amountInKg, setAmountInKg] = useState(null);
    const [isValidEmail, setIsValidEmail] = useState(false);


    // Profile screen state
    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');

    const navigate = useNavigate();
    const generateOtp = async () => {
        try {
            toast.warn('Sending OTP...', { autoClose: 2000 }); // Use toast for success

            const response = await axios.post('http://localhost:8000/v1/users/email', {
                email,
            });

            if (response.data.success) {
                // console.log('res', response.data)
                const deviceToken = response.data.results.deviceToken;
                const expiry = response.data.results.expiry;
                const isLogin = response.data.results.isLogin;



                setGeneratedOtp(deviceToken);
                toast.success('OTP has been sent to your email.', { autoClose: 3000 }); // Use toast for success
                setActiveStep(1);
                // setIsVerified(true);
            }
        } catch (error) {

            toast.error('Failed to generate OTP. Please try again.', { autoClose: 3000 }); // Use toast for success
        }
    };

    const verifyOtp = async () => {
        try {
            // console.log('otp', otp)
            // console.log('generatedOtp', generatedOtp)

            const response = await axios.post('http://localhost:8000/v1/users/email/verify', {
                email,
                deviceToken: generatedOtp,
                verificationCode: otp,
            });

            if (response.data.success) {
                if (response.data.results.isLogin) {
                    setAuthToken(response.data.results.token)
                    setUserId(response.data.results._id)
                    setFirstName(response.data.results.firstName)
                    setLastName(response.data.results.lastName)
                    setIsExistingUser(true)
                    toast.success('OTP verified!', { autoClose: 3000 }); // Use toast for success
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('firstName', response.data.results.firstName);
                    sessionStorage.setItem('lastName', response.data.results.lastName);
                    sessionStorage.setItem('authToken', response.data.results.token);
                    sessionStorage.setItem('userId', response.data.results._id);


                    navigate('/dashboard');
                } else {
                    toast.success('OTP verified! Please register.', { autoClose: 3000 }); // Use toast for success
                    setActiveStep(2);

                }


                setIsVerified(true);

            } else {
                toast.error('Invalid OTP. Please try again.', { autoClose: 3000 }); // Use toast for success

            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Failed to verify OTP. Please try again.', { autoClose: 3000 }); // Use toast for success

        }
    };
    const enterName = () => {
        setIsNameEntered(true);
    };
    const registerUser = async () => {
        try {
            const response = await axios.post('http://localhost:8000/v1/users/', {
                email,
                deviceToken: generatedOtp,
                firstName,
                lastName
            });

            if (response.data.success) {

                setAuthToken(response.data.results.token)
                setUserId(response.data.results._id)

                toast.success('User registered successfully!', { autoClose: 3000 }); // Use toast for success

                setIsRegistered(true);
            } else {
                toast.error('Failed to register user. Please try again.', { autoClose: 3000 }); // Use toast for success


            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('Failed to register user. Please try again.', { autoClose: 3000 }); // Use toast for success

        }
    };

    const placeOrder = async () => {
        try {
            const response = await axios.post('http://localhost:8000/v1/carbon/cn', {
                amountInKg
            }, {
                headers: {
                    'Authorization': `Bearer ${userId},${authToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data.success) {
                setTransactionId(response.data.results.id)
                setCertificateUrl(response.data.results.certificateUrl)
                setDownloadUrl(response.data.results.downloadCertificateUrl)
                setIsOrderPlaced(true);

                toast.success('Order placed successfully!', { autoClose: 3000 }); // Use toast for success


                setIsRegistered(true);
            } else {
                setMessage('Failed to register user. Please try again.');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage('Failed to register user. Please try again.');
        }
        // Additional logic for placing an order
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

    const handleDownload = () => {
        // Trigger download logic, e.g., using window.location.href
        window.location.href = downloadUrl;
    };
    const logout = () => {
        toast.update('Logging out!', { autoClose: 3000 }); // Use toast for success

        setMessage("")
        setEmail("")
        setOtp("")
        setFirstName("")
        setLastName("")
        setGeneratedOtp(false)
        setIsVerified(false)
        setIsNameEntered(false)
        setIsExistingUser(false)
        setListOfOrders(null)
        setIsRegistered(false)
    }

    const validateEmail = (input) => {
        // Simple email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(input));
    };
    const [activeStep, setActiveStep] = useState(0);


    // ... (Other state variables and functions)

    return (
        <ThemeProvider theme={theme}>
            <div style={{ background: 'linear-gradient(to right, #004e00b3, #00FF0024)', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>

                <Container component="main" maxWidth="sm">
                    <Paper elevation={3} style={{
                        padding: '2em',
                        marginTop: '2em',
                        textAlign: 'center',
                        borderRadius: '16px',
                        background: '#F1F1F1',
                        boxShadow: 'inset 20px 20px 60px #c0c0c0, inset -20px -20px 60px #ffffff, 20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
                        transition: 'box-shadow 0.3s ease-in-out',

                        margin: "20% auto",
                    }}>
                        <img src={require('/Users/mayanka/client/src/assets/logo.png')} alt="Business Logo"
                            style={{
                                width: 100,
                                height: 100,
                                marginBottom: '20px',
                                borderRadius: "50%"
                            }}
                        />


                        {/* Email Component */}
                        {activeStep === 0 && (
                            <EmailComponent
                                email={email}
                                setEmail={setEmail}
                                validateEmail={validateEmail}
                                generateOtp={generateOtp}
                                isValidEmail={isValidEmail}
                            />
                        )}

                        {/* OTP Component */}
                        {activeStep === 1 && (
                            <OtpComponent otp={otp} setOtp={setOtp} verifyOtp={verifyOtp} />
                        )}

                        {/* Name Component */}
                        {activeStep === 2 && (
                            <NameComponent
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                registerUser={registerUser}
                            />
                        )}

                        {/* Toast Container */}
                        <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />


                    </Paper>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default Onboarding;
