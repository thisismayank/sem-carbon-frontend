import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon, InputAdornment, IconButton, } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TokenIcon from '@mui/icons-material/Token';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Co2Icon from '@mui/icons-material/Co2';
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/dashboard.component';
import Onboarding from './components/onboarding.component';


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

const App = () => {
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
  const generateOtp = async () => {
    try {
      toast.warn('Sending OTP...', { autoClose: 2000 }); // Use toast for success

      const response = await axios.post('http://localhost:3000/v1/users/email', {
        email,
      });

      if (response.data.success) {
        // console.log('res', response.data)
        const deviceToken = response.data.results.deviceToken;
        const expiry = response.data.results.expiry;
        const isLogin = response.data.results.isLogin;



        setGeneratedOtp(deviceToken);
        toast.success('OTP has been sent to your email.', { autoClose: 3000 }); // Use toast for success

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

      const response = await axios.post('http://localhost:3000/v1/users/email/verify', {
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
        } else {
          toast.success('OTP verified! Please register.', { autoClose: 3000 }); // Use toast for success

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
      const response = await axios.post('http://localhost:3000/v1/users/', {
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
      const response = await axios.post('http://localhost:3000/v1/carbon/cn', {
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
      const response = await axios.get('http://localhost:3000/v1/carbon/cn', {
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


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Onboarding />} />
        <Route path="/*" element={<Dashboard />} />

      </Routes>
    </Router>
  )
  // <Dashboard email={email} firstName={firstName} lastName={lastName} />)

  // return (
  // <ThemeProvider theme={theme}>
  //   <div style={{ background: 'linear-gradient(to right, #004e00b3, #00FF0024)', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>

  //     <Container component="main" maxWidth="xl">
  //       <Paper elevation={3} style={{
  //         padding: '2em',
  //         marginTop: '2em',
  //         textAlign: 'center',
  //         borderRadius: '16px',
  //         background: '#F1F1F1',
  //         boxShadow: 'inset 20px 20px 60px #c0c0c0, inset -20px -20px 60px #ffffff, 20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
  //         transition: 'box-shadow 0.3s ease-in-out',

  //         margin: "20% auto",
  //         // marginTop: "20%"
  //       }}>
  //         <img src={require('/Users/mayanka/client/src/assets/logo.png')} alt="Business Logo"
  //           style={{
  //             width: 100,
  //             height: 100,
  //             marginBottom: '20px',
  //             borderRadius: "50%"
  //           }}
  //         />

  //           {!isRegistered && !isExistingUser ? (
  //             <Container component="main" maxWidth="sm">
  //               <Typography variant="h5" style={{ fontWeight: 900 }}>Welcome!</Typography>
  //               {!isVerified && !generatedOtp && (
  //                 <>
  //                   <TextField
  //                     label="Email"
  //                     type="email"
  //                     fullWidth
  //                     value={email}
  //                     onChange={(e) => {
  //                       setEmail(e.target.value)
  //                       validateEmail(e.target.value)
  //                     }}
  //                     helperText={!isValidEmail && email.length > 2 ? <Typography color="red" variant="caption">Enter a valid email address</Typography> : ''}

  //                     style={{
  //                       margin: '1em 0',
  //                       background: '#F1F1F1',
  //                       borderRadius: '8px',
  //                       boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
  //                       transition: 'box-shadow 0.3s ease-in-out',
  //                     }}

  //                     InputProps={{
  //                       startAdornment: (
  //                         <InputAdornment position="start">
  //                           <IconButton color="primary">
  //                             <MailOutlineIcon />
  //                           </IconButton>
  //                         </InputAdornment>
  //                       ),
  //                     }}
  //                   />
  //                   <Button variant="contained" color="primary" onClick={generateOtp}
  //                     style={{

  //                       borderRadius: '8px',
  //                       background: '#F1F1F1',
  //                       boxShadow: '8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff, inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
  //                       padding: '10px 20px',
  //                       transition: 'box-shadow 0.3s ease-in-out',
  //                     }}
  //                     disabled={!isValidEmail}>
  //                     Send OTP
  //                   </Button>
  //                 </>
  //               )}
  //               {generatedOtp && !isVerified && (
  //                 <>
  //                   <TextField
  //                     label="Enter OTP"
  //                     type="text"
  //                     fullWidth
  //                     value={otp}
  //                     onChange={(e) => setOtp(e.target.value)}
  //                     style={{
  //                       margin: '1em 0',
  //                       background: '#F1F1F1',
  //                       borderRadius: '8px',
  //                       boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
  //                       transition: 'box-shadow 0.3s ease-in-out',
  //                     }}
  //                     InputProps={{
  //                       startAdornment: (
  //                         <InputAdornment position="start">
  //                           <IconButton color="primary">
  //                             <TokenIcon />
  //                           </IconButton>
  //                         </InputAdornment>
  //                       ),
  //                     }}
  //                   />
  //                   <Button variant="contained"
  //                     color="primary" onClick={verifyOtp}
  //                     style={{
  //                       borderRadius: '8px',
  //                       background: '#F1F1F1',
  //                       boxShadow: '8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff, inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
  //                       padding: '10px 20px',
  //                       transition: 'box-shadow 0.3s ease-in-out',
  //                     }}
  //                     disabled={otp.length !== 6 ? true : false}>
  //                     Verify OTP
  //                   </Button>
  //                 </>
  //               )}
  //               {isVerified && !isNameEntered && (
  //                 <>
  //                   <TextField
  //                     label="First Name"
  //                     type="text"
  //                     fullWidth
  //                     value={firstName}
  //                     onChange={(e) => setFirstName(e.target.value)}
  //                     style={{
  //                       margin: '1em 0',
  //                       background: '#F1F1F1',
  //                       borderRadius: '8px',
  //                       boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
  //                       transition: 'box-shadow 0.3s ease-in-out',
  //                     }}
  //                   />

  //                   <TextField
  //                     label="Last Name"
  //                     type="text"
  //                     fullWidth
  //                     value={lastName}
  //                     onChange={(e) => setLastName(e.target.value)}
  //                     style={{
  //                       margin: '1em 0',
  //                       background: '#F1F1F1',
  //                       borderRadius: '8px',
  //                       boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
  //                       transition: 'box-shadow 0.3s ease-in-out',
  //                     }}
  //                   />
  //                   <Button variant="contained" color="primary" onClick={registerUser}
  //                     style={{
  //                       marginBottom: '1em',
  //                       borderRadius: '8px',
  //                       background: '#F1F1F1',
  //                       boxShadow: '8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff, inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
  //                       padding: '10px 20px',
  //                       transition: 'box-shadow 0.3s ease-in-out',
  //                     }}
  //                   >
  //                     Register
  //                   </Button>
  //                 </>
  //               )}
  //               <Typography variant="body1" style={{ margin: '1em 0' }}>{message}</Typography>
  //             </Container>
  //           ) :
  //             (
  //               <Dashboard email={email} firstName={firstName} lastName={lastName} />
  //               // Profile screen
  //               // <Container maxWidth="md">
  //               //   <IconButton
  //               //     onClick={logout}
  //               //     style={{
  //               //       position: 'absolute',
  //               //       top: 60,
  //               //       left: 50,
  //               //       borderRadius: '50%',
  //               //       background: '#F1F1F1',
  //               //       boxShadow: '4px 4px 8px #c0c0c0, -4px -4px 8px #ffffff',
  //               //       transition: 'box-shadow 0.3s ease-in-out',
  //               //     }}
  //               //   >
  //               //     <PowerSettingsNewIcon sx={{ color: "#d50000" }} />
  //               //   </IconButton>
  //               //   <Typography variant="h5" style={{
  //               //     marginBottom: 2,
  //               //     background: '#F1F1F1',
  //               //     borderRadius: '8px',
  //               //     boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
  //               //     padding: '10px 20px',
  //               //     transition: 'box-shadow 0.3s ease-in-out',
  //               //   }}>
  //               //     Welcome, {firstName} {lastName}!</Typography>
  //               //   <Typography variant="body2">
  //               //     {email}
  //               //   </Typography>
  //               //   {isExistingUser ? (<Typography variant="body1"></Typography>) :
  //               //     (<Typography variant="body1">You are now registered.</Typography>)}
  //               //   {isOrderPlaced ? (<>
  //               //     <Typography variant="body1" style={{ margin: '1em 0', color: '#4CAF50' }}>
  //               //       Order Placed Successfully!

  //               //     </Typography>
  //               //     <Paper>
  //               //       <Button
  //               //         variant="text"
  //               //         sx={{ color: "gray" }}
  //               //         onClick={() => setIsOrderPlaced(false)}
  //               //         style={{
  //               //           // position: 'absolute',
  //               //           // top: '10px',
  //               //           // left: '20px',
  //               //           // borderRadius: '50%',
  //               //           // background: '#F1F1F1',
  //               //           // boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',

  //               //         }}
  //               //       >
  //               //         <CloseIcon />
  //               //       </Button>
  //               //       <Typography variant="body1" style={{ margin: '1em 0', color: '#4CAF50' }}>
  //               //         Transaction ID: {transactionId}
  //               //       </Typography>
  //               //       <iframe title="Certificate Content" src={certificateUrl} width="100%" height="400px" style={{ border: 'none' }} />
  //               //       <Button variant="contained" color="primary" onClick={handleDownload}>
  //               //         Download Certificate
  //               //       </Button>
  //               //     </Paper>
  //               //   </>
  //               //   ) : (<>
  //               //     <br />
  //               //     <br />

  //               //     <Typography variant="body2" display="block" style={{ margin: '1em 0 0 0', color: '#4CAF50' }}>
  //               //       Place order
  //               //     </Typography>
  //               //     <TextField
  //               //       label="Amount In KG"
  //               //       type="text"
  //               //       width={24}
  //               //       value={amountInKg}
  //               //       onChange={(e) => setAmountInKg(e.target.value)}
  //               //       style={{
  //               //         margin: '1em 0',
  //               //         background: '#F1F1F1',
  //               //         borderRadius: '8px',
  //               //         boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
  //               //         transition: 'box-shadow 0.3s ease-in-out',
  //               //       }}
  //               //       InputProps={{
  //               //         endAdornment: (
  //               //           <InputAdornment position="end">
  //               //             <IconButton color="primary" onClick={placeOrder}>
  //               //               <AddShoppingCartIcon />
  //               //             </IconButton>
  //               //           </InputAdornment>
  //               //         ),
  //               //       }}
  //               //     />
  //               //     {/* <Button variant="contained" color="primary" onClick={placeOrder} style={{ marginTop: '1em' }}>
  //               //     Place an Order
  //               //   </Button> */}

  //               //     <br />
  //               //     <br />

  //               //     {!listOfOrders &&
  //               //       <Button variant="contained" color="primary" onClick={getListOfOrders}
  //               //         style={{
  //               //           marginBottom: '1em',
  //               //           borderRadius: '8px',
  //               //           background: '#F1F1F1',
  //               //           boxShadow: '8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff, inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
  //               //           padding: '10px 20px',
  //               //           transition: 'box-shadow 0.3s ease-in-out',
  //               //         }}
  //               //       >
  //               //         List of Orders
  //               //       </Button>
  //               //     }

  //               //     {listOfOrders && (
  //               //       <Container maxWidth="md" style={{ position: "relative" }}>
  //               //         <Paper elevation={3} style={{
  //               //           padding: '2em',
  //               //           marginTop: '2em',
  //               //           textAlign: 'center',
  //               //           borderRadius: '16px',
  //               //           background: '#F1F1F1',
  //               //           boxShadow: 'inset 20px 20px 60px #c0c0c0, inset -20px -20px 60px #ffffff, 20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
  //               //           transition: 'box-shadow 0.3s ease-in-out',
  //               //         }}>
  //               //           <Button
  //               //             variant="text"
  //               //             sx={{ color: "gray" }}
  //               //             onClick={() => setListOfOrders(null)}
  //               //             style={{
  //               //               position: 'absolute',
  //               //               top: '10px',
  //               //               left: '20px',
  //               //               // borderRadius: '50%',
  //               //               // background: '#F1F1F1',
  //               //               // boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',

  //               //             }}
  //               //           >
  //               //             <CloseIcon />
  //               //           </Button>

  //               //           <Typography variant="h5"
  //               //             style={{
  //               //               marginBottom: '1em',
  //               //               fontWeight: 'bold',
  //               //               color: '#333', // Adjust color as needed
  //               //               textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Add a subtle text shadow
  //               //             }}
  //               //           >Orders</Typography>
  //               //           {listOfOrders.length === 0 ? (
  //               //             <Typography variant="body1">No orders available.</Typography>
  //               //           ) : (<>                          <List>
  //               //             {listOfOrders.map((order) => (
  //               //               <Paper style={{
  //               //                 marginBottom: 16,
  //               //                 borderRadius: '8px',
  //               //                 background: '#F1F1F1',
  //               //                 boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
  //               //               }}>
  //               //                 <ListItem key={order._id}
  //               //                 >
  //               //                   <ListItemIcon>
  //               //                     <Co2Icon color="primary" />

  //               //                   </ListItemIcon>
  //               //                   <ListItemText
  //               //                     primary={`Transaction ID: ${order.transactionId}`}
  //               //                     secondary={`Amount: ${order.amountInKg} kg`}
  //               //                     primaryTypographyProps={{
  //               //                       variant: 'subtitle1',
  //               //                       style: {
  //               //                         fontWeight: 'bold',
  //               //                         color: '#333', // Adjust color as needed
  //               //                       },
  //               //                     }}
  //               //                     secondaryTypographyProps={{
  //               //                       variant: 'body2',
  //               //                       style: {
  //               //                         fontStyle: 'italic',
  //               //                         color: '#555', // Adjust color as needed
  //               //                       },
  //               //                     }}
  //               //                   />
  //               //                   <Typography variant="caption" style={{ marginLeft: 'auto', marginRight: '8px' }}>
  //               //                     {moment(order.createdAt).format('YYYY, MMM D ')}
  //               //                   </Typography>
  //               //                   <IconButton onClick={() => setListOfOrders(null)}
  //               //                     style={{ marginLeft: 'auto' }}>
  //               //                     <CloseIcon color="error" />
  //               //                   </IconButton>
  //               //                 </ListItem>
  //               //               </Paper>
  //               //             ))}
  //               //           </List>

  //               //           </>
  //               //           )}
  //               //         </Paper>
  //               //       </Container>)
  //               //     }
  //               //   </>
  //               //   )}
  //               // </Container>
  //             )}
  //         </Paper>
  //       </Container >
  //     </div>
  //     <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar />

  //   </ThemeProvider >
  // );
};

export default App;
