import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';


import { Container, Typography, TextField, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon, InputAdornment, IconButton, } from '@mui/material';
import Co2Icon from '@mui/icons-material/Co2';
import moment from "moment"
import { LineChart } from '@mui/x-charts/LineChart';

import { ToastContainer, toast } from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const Center = () => {

    // const monthlyData = {
    //     "2022": {
    //         "October": 12,
    //         "September": 13,
    //         "August": 12,
    //         "July": 13,
    //         "June": 8,
    //         "May": 6,
    //         "April": 6,
    //         "March": 6,
    //         "February": 6,
    //         "January": 6,
    //         "December": 6,
    //         "November": 6
    //     },
    //     "2023": {
    //         "October": 10,
    //         "September": 9,
    //         "August": 8,
    //         "July": 7,
    //         "June": 6,
    //         "May": 5,
    //         "April": 4,
    //         "March": 3,
    //         "February": 2,
    //         "January": 1,
    //         "December": 12
    //     }
    // };
    const [monthlyData, setMonthlyData] = useState({
        "2022": {
            "October": null,
            "September": null,
            "August": null,
            "July": null,
            "June": null,
            "May": null,
            "April": null,
            "March": null,
            "February": null,
            "January": null,
            "December": null,
            "November": null
        },
        "2023": {
            "October": null,
            "September": null,
            "August": null,
            "July": null,
            "June": null,
            "May": null,
            "April": null,
            "March": null,
            "February": null,
            "January": null,
            "December": null,
            "November": null,

        }
    })
    let dataFromStorage = sessionStorage.getItem('yearWiseTransactionData');
    useEffect(() => {
        if (dataFromStorage) {
            dataFromStorage = JSON.parse(dataFromStorage);

            setMonthlyData(dataFromStorage);
        }
    }, [dataFromStorage])
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    let yearWiseData = {
        2022: [],
        2023: []
    }

    for (let month of months) {
        console.log(monthlyData["2022"][month], 'month', month)
        yearWiseData["2022"].push(monthlyData["2022"][month] || 0)
        yearWiseData["2023"].push(monthlyData["2023"][month] || 0)
    }
    console.log('yearWiseData', yearWiseData)


    const [graphData, setGraphData] = useState([
        { label: "Group A", value: 4000 },
        // { label: "Group B", value: 4567 },
        // { label: "Group C", value: 1398 },
        // { label: "Group D", value: 800 },
        // { label: "Group E", value: 398 },
        // { label: "Group F", value: 400 }
    ]);
    const [isGraphDataDefault, setIsGraphDataDefault] = useState(true);
    let categoryWeightedDistribution = sessionStorage.getItem('categoryWeightedDistribution')
    // console.log('categoryWeightedDistribution', categoryWeightedDistribution);
    let categoryWeightedDistributionParsed = [];

    useEffect(() => {
        if (categoryWeightedDistribution && isGraphDataDefault) {
            let jsonParsedCategoryWeightedDistribution = JSON.parse(categoryWeightedDistribution);
            let uniqueKeys = new Set();
            let categoryWeightedDistributionParsed = [];

            for (let [key, value] of Object.entries(jsonParsedCategoryWeightedDistribution)) {
                if (!uniqueKeys.has(key)) {
                    let tempObj = { label: key, value: value };
                    categoryWeightedDistributionParsed.push(tempObj);
                    uniqueKeys.add(key);
                }
            }

            setGraphData(categoryWeightedDistributionParsed);
            setIsGraphDataDefault(false);
        }
    }, [categoryWeightedDistribution, isGraphDataDefault]);


    console.log('graphData', graphData)
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


    const [amountInKg, setAmountInKg] = useState(null);
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


    const handleDownload = () => {
        // Trigger download logic, e.g., using window.location.href
        window.location.href = downloadUrl;
    };


    const renderOrderPlacement = () => (
        <>
            {isOrderPlaced ? (<>
                <Button
                    variant="text"
                    sx={{ color: "black", position: 'absolute', top: '10px', right: '10px' }}
                    onClick={() => setIsOrderPlaced(false)}
                    style={{
                        borderRadius: '50%',
                    }}
                >
                    <CloseIcon />
                </Button>
                <Paper style={{
                    padding: '1em',
                    borderRadius: '16px',
                    background: '#F1F1F1',
                    boxShadow: 'inset 8px 8px 16px #c0c0c0, inset -8px -8px 16px #ffffff, 8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff',
                    transition: 'box-shadow 0.3s ease-in-out',
                    textAlign: 'center',
                }}>

                    <Typography variant="body1" style={{ margin: '0 0 1em 0', color: '#4CAF50', fontWeight: 'bold' }}>
                        Transaction ID: <span style={{ color: '#333' }}>{transactionId}</span>
                    </Typography>
                    <iframe title="Certificate Content" src={certificateUrl} width="100%" height="500px" style={{ border: 'none', marginBottom: '1em' }} />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" onClick={handleDownload} style={{
                            background: '#4CAF50',
                            color: '#fff',
                            padding: '8px 20px',
                            borderRadius: '8px',
                            boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
                            transition: 'box-shadow 0.3s ease-in-out',
                        }}>
                            Download Certificate
                        </Button>
                    </div>
                </Paper>
            </>
            ) : (<Paper style={{
                height: 200,

                margin: 8,
                padding: '1em 1em 0em 1em',
                borderRadius: '16px',
                background: '#F1F1F1',
                boxShadow: 'inset 8px 8px 16px #c0c0c0, inset -8px -8px 16px #ffffff, 8px 8px 16px #c0c0c0, -8px -8px 16px #ffffff',
                transition: 'box-shadow 0.3s ease-in-out',
                textAlign: 'center',
            }}>
                <Typography variant="body2" display="block" style={{ margin: '0 0 1em 0', color: '#4CAF50', fontWeight: 'bold' }}>
                    Place order
                </Typography>
                <TextField
                    label="Amount In KG"
                    type="text"
                    width={24}
                    value={amountInKg}
                    onChange={(e) => setAmountInKg(e.target.value)}
                    style={{
                        margin: '2em 0 1em 0',
                        background: '#F1F1F1',
                        borderRadius: '8px',
                        boxShadow: 'inset 2px 2px 5px #c0c0c0, inset -2px -2px 5px #ffffff',
                        transition: 'box-shadow 0.3s ease-in-out',
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton color="primary" onClick={placeOrder}>
                                    <AddShoppingCartIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

            </Paper >)}

        </>
    );




    return (
        <React.Fragment >
            {/* Central Section Content */}
            <Container style={{ position: "relative", top: 10, height: "90vh", overflow: "hidden", width: "100%", padding: 0, maxWidth: 1300 }}>
                {/* Responsive Grid */}
                <Grid container>
                    <Grid item xs={4}>
                        {/* First Box */}
                        <Paper style={{
                            height: 400,
                            borderRadius: 40,
                            margin: 8,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div style={{ marginLeft: 80 }}>
                                <PieChart
                                    title='Transactions'
                                    series={[
                                        {
                                            // arcLabel: (item) => `${item.label}(${item.value})`,
                                            // arcLabelMinAngle: 45,
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            data: graphData,
                                            innerRadius: 80,
                                            outerRadius: 140,
                                            paddingAngle: 1,
                                            cornerRadius: 5,

                                        }
                                    ]}
                                    // sx={{
                                    //     [`& .${pieArcLabelClasses.root}`]: {
                                    //         fill: 'white',
                                    //         fontSize: 8
                                    //     },
                                    // }}
                                    height={400}
                                    width={600}
                                    slotProps={{
                                        legend: {
                                            hidden: true
                                        },

                                    }}

                                // colorScheme={['#FF7F50', '#6495ED', '#FFD700', '#32CD32', '#9370DB', '#FF4500', '#FF4590']} // Define your custom colors here
                                // sx={{
                                //     [`& .${pieLegendClasses.root}`]: {
                                //         fontSize: 10
                                //     }
                                // }}
                                // slotProps={{
                                //     legend: {
                                //         direction: 'row',
                                //         padding: 0,

                                //         // hidden: true 
                                //         position: {
                                //             vertical: 'top',
                                //             horizontal: 'middle',
                                //         },

                                //         itemMarkWidth: 20,
                                //         itemMarkHeight: 2,
                                //         markGap: 5,
                                //         itemGap: 10,
                                //         offsetX: 20
                                //     }
                                // }}
                                >
                                    Center label


                                </PieChart>


                            </div>

                        </Paper>
                    </Grid>
                    {!isOrderPlaced ? (<>
                        <Grid item xs={4}>
                            <Grid container direction="row" style={{ height: 400 }}>
                                {/* First Box */}
                                <Grid item xs={12} sm={12}>
                                    {renderOrderPlacement()}

                                </Grid>
                                {/* Second Box */}
                                <Grid item xs={12} sm={12}>
                                    <Paper style={{ height: 180, backgroundColor: "#e4f1ee", borderRadius: 40, margin: "0px 8px 8px 8px" }}></Paper>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container direction="row" style={{ height: 400 }}>
                                {/* First Box */}
                                <Grid item xs={12} sm={12}>

                                    <Paper style={{ height: 200, backgroundColor: "#ffadad", borderRadius: 40, margin: 8 }}></Paper>

                                </Grid>
                                {/* Second Box */}
                                <Grid item xs={12} sm={12}>

                                    <Paper style={{ height: 435, backgroundColor: "#dedaf4", borderRadius: 40, margin: "0px 8px 8px 8px" }}></Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Box under the two side by side */}
                            <Paper style={{ height: 220, width: 800, backgroundColor: "#fff", borderRadius: 40, margin: 16, }}>
                                <LineChart
                                    xAxis={[{
                                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                        // scaleType: 'months',
                                        valueFormatter: (data) => {
                                            console.log('hello', data, 'here', months[data - 1].substring(0, 3))
                                            return months[data - 1].substring(0, 3)
                                        }
                                    }]}
                                    series={[
                                        {
                                            data: yearWiseData["2022"],
                                            area: true,
                                            label: "2022"
                                        },
                                        {
                                            data: yearWiseData["2023"],
                                            area: true,
                                            label: "2023"
                                        },
                                    ]}
                                    width={800}
                                    height={200}
                                />

                            </Paper>
                        </Grid>
                    </>) : (<>

                        <Grid item xs={8} >

                            {renderOrderPlacement()}

                        </Grid>


                    </>)}

                </Grid>
            </Container>
        </React.Fragment >
    );
};

export default Center;
