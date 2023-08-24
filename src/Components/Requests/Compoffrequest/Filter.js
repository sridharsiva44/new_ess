
import { Box, Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Menu, MenuItem, Paper, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import moment from 'moment';
//import Datedata from './Datedata.json'
function Filter(props) {
    var data = props.dataFilter
    var resultProductData;
    useEffect(() => {

    }, []);
    const submitFilter = () => {
        resultProductData = data.filter(
            (a) => {
                let fromdateData = moment(a.timeIn).format("DD MMM YYYY");
                let todateData = moment(a.timeOut).format("DD MMM YYYY");
                if ((new Date(props.fromdate) >= new Date(fromdateData) && new Date(props.fromdate) <= new Date(todateData)) ||
                    (new Date(fromdateData) >= new Date(props.fromdate) && new Date(fromdateData) <= new Date(props.todate))) {
                    return true;
                } else {
                    return false;
                }
            });
        props.func(resultProductData);
        props.setLabelflag(true);
    }

    const closeIconHandler = () => {
        props.setLabelflag(false);
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
                            value={props.fromdate ? dayjs(props.fromdate) : props.fromdate}
                            onChange={(newValue) => {
                                props.setLabelflag(false);
                                props.fromdateHandler('fromdate', newValue)
                            }}
                        />
                        <FormHelperText sx={{ color: 'red' }}>{props.fromdateError}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <DatePicker label="To Date"
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
                            value={props.todate ? dayjs(props.todate) : props.todate}
                            onChange={(newValue) => {
                                props.setLabelflag(false)
                                props.todateHandler('todate', newValue)
                            }}
                        />
                        {props.todateError && <FormHelperText sx={{ color: 'red' }}>{props.todateError}</FormHelperText>}
                    </FormControl>
                    <Button variant='contained' size='small' disabled={props.searchbtn} onClick={submitFilter}>Apply</Button>
                    {
                        props.labelflag ? <Button size='small' variant='outlined' endIcon={<CloseIcon onClick={closeIconHandler} />}>({props.fromdate})-({props.todate})</Button> : " "
                    }
                </DemoContainer>
            </LocalizationProvider>
        </Box>
    )
}

export default Filter