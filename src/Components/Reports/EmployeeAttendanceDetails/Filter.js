
import { Box, Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Menu, MenuItem, Paper, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
//import Datedata from './Datedata.json'
function Filter(props) {
    const [fromdate, setFromdate] = useState();
    const [todate, setTodate] = useState();
    const [labelflag, setLabelflag] = useState(false);
    const [fromdateError, setFromdateError] = useState('');
    const [todateError, setTodateError] = useState('');
    var data = props.dataFilter
    var resultProductData;
    useEffect(() => {

    }, []);
    const submitFilter = () => {
        if (fromdate && todate) {
            var fdate = new Date(dayjs(fromdate.$d));
            var tdate = new Date(dayjs(todate.$d));
            resultProductData = data.filter(
                (a) => {
                    let dayin = new Date(a.timeIn);
                    return (dayin) >= fdate && (dayin) <= tdate;
                });
            props.func(resultProductData);
            setLabelflag(true);
        }
        if (!fromdate) {
            setFromdateError('fromdate is required!')
           
        } if (!todate) {
            setTodateError('todate is required!')
        }
        return resultProductData;
    }
    const handleFromDateChange = () => {
        setFromdateError('')
    };
    const handleToDateChange = () => {
        setTodateError('')
    }
    const closeIconHandler = () => {
        setLabelflag(false);
        props.func(data);
    }

    return (
        <Box sx={{ m: 1.8, mt: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <FormControl>
                        <DatePicker label="From Date"
                            emptyLabel="custom label"
                            slotProps={{
                                textField: { size: 'small' },
                                toolbar: {
                                    toolbarFormat: 'YYYY',
                                    toolbarPlaceholder: '??',
                                },
                                actionBar: {
                                    actions: ['clear'],
                                },
                            }}
                            maxDate={todate}
                            value={fromdate} onChange={(newValue) => {
                                setFromdate(newValue)
                                setLabelflag(false);
                                handleFromDateChange()
                            }}
                        />
                        {fromdateError && <FormHelperText sx={{ color: 'red' }}>{fromdateError}</FormHelperText>}

                    </FormControl>
                    <FormControl>
                        <DatePicker label="To Date"
                            disabled={!fromdate ? true : false}
                            slotProps={{
                                textField: { size: 'small' },
                                toolbar: {
                                    toolbarFormat: 'YYYY',
                                    toolbarPlaceholder: '??',
                                },
                                actionBar: {
                                    actions: ['clear'],
                                },
                            }}
                            minDate={fromdate}
                            value={todate} onChange={(newvalue) => {
                                setTodate(newvalue)
                                handleToDateChange()
                                setLabelflag(false)
                            }} />
                        {todateError && <FormHelperText sx={{ color: 'red' }}>{todateError}</FormHelperText>}
                    </FormControl>
                    <Button variant='contained' size='small' onClick={submitFilter} sx={{ textTransform: 'none' }}>Apply</Button>
                    {
                        labelflag ? <Button size='small' variant='outlined' endIcon={<CloseIcon onClick={closeIconHandler} />}>({dayjs(new Date(dayjs(fromdate.$d))).format('DD-MM-YYYY')})-({dayjs(new Date(dayjs(todate.$d))).format('DD-MM-YYYY')})</Button> : " "
                    }
                </DemoContainer>
            </LocalizationProvider>
        </Box>
    )
}

export default Filter