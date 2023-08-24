
import { Box, Button, FormControl, FormHelperText } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import dayjs from 'dayjs';
function Filter(props) {
    var data = props.dataFilter
    var resultProductData;
    const submitFilter = () => {
        resultProductData = data.filter(
            (a) => {
                let fromdateData = moment(a.fromDate).format("DD MMM YYYY");
                let todateData = moment(a.toDate).format("DD MMM YYYY");
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
        <Box sx={{ m: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <FormControl>
                        <DatePicker sx={{ width: 200 }} label="Fromdate"
                            emptyLabel="custom label"
                            slotProps={{
                                textField: { size: 'small' },
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
                        <DatePicker sx={{ width: 200 }} label="Todate"
                            slotProps={{
                                textField: { size: 'small' },
                                actionBar: {
                                    actions: ['clear'],
                                },
                            }}
                            value={props.todate ? dayjs(props.todate) : props.todate}
                            onChange={(newValue) => {
                                props.setLabelflag(false)
                                props.todateHandler('todate', newValue)
                            }} />
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