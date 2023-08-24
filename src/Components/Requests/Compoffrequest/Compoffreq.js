import * as React from 'react';
import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Grid, Paper,Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormHelperText from '@mui/material/FormHelperText';
import CardActions from '@mui/material/CardActions';
import moment from 'moment';

function Compoffreq() {

    const [btnenable, setBtnenable] = useState(true)
    const [incrementbtn, setIncrementbtn] = useState(true);
    const [decrementbtn, setDecrementbtn] = useState(true);
    const [resetbtnenable, setResetbtnenable] = useState(true);
    const [data, setData] = useState({
        fromdate: null,
        todate: null,
        category: '',
        reasonbox: ''
    })

    const errorState = {
        fromdate: { flag: false, errorMessage: '' },
        todate: { flag: false, errorMessage: '' },
        category: { flag: false, errorMessage: '' },
        reasonbox: { flag: false, errorMessage: '' },
    }

    const [errorreset, setErrorreset] = useState(errorState);
    const [noofdays, setNumberDays] = useState(0);
    useEffect(() => {
        if (data.fromdate &&
            data.todate &&
            data.reasonbox) {
            if (errorreset.fromdate.flag ||
                errorreset.todate.flag ||
                errorreset.reasonbox.flag) {
                setBtnenable(true);
                setResetbtnenable(true);
            } else {
                setBtnenable(false);
                setResetbtnenable(false);
            }
        } else {
            setBtnenable(true);
            setResetbtnenable(true);
        }
        console.log(data);
        console.log(errorreset);
    }, [data, errorreset, btnenable])

    //Number of days Calculation
    const daysCalculation = (fromdate, todate) => {
        let count = 0;
        if (fromdate && todate) {
            const current = moment(fromdate).startOf('day');
            const last = moment(todate).startOf('day');
            while (current.isSameOrBefore(last)) {
                if (current.day() !== 0 && current.day() !== 6) {
                    count++;
                }
                current.add(1, 'days');
            }
            setNumberDays(count)
            setDecrementbtn(false);
            setIncrementbtn(true);
            return count;
        } else {
            setNumberDays(0)
        }
    }

    //Error reseting
    const resetError = (value, errMsg, flag) => {
        setErrorreset({
            ...errorreset,
            [value]: {
                flag: flag,
                errorMessage: errMsg,
            },
        });
    };

    //From datepicker handler
    const onChangeHandlerFromdate = (fieldName, newValue) => {
        console.log(moment(newValue).day());
        if (fieldName === 'fromdate') {
            if (newValue === null) {
                setData({ ...data, fromdate: null })
                setNumberDays(0)

                resetError(fieldName, 'fromdate is toBeRequired', true)
            } else if (data.todate < moment(newValue.$d).format('MM/DD/YYYY')) {

                resetError(fieldName, 'Date should be smaller than Todate', true)
            }
            else {
                const fdate = moment(newValue.$d).format('MM/DD/YYYY')
                setData({ ...data, fromdate: fdate })
                resetError(fieldName, '', false)
                daysCalculation(fdate, data.todate)
                console.log('fdate', fdate, 'todate', data.todate);
            }
        }
    }

    //Todate picker handler
    const onChangeHandlerTodate = (fieldName, newValue) => {
        console.log(data)
        if (fieldName === 'todate') {
            if (newValue === null) {
                console.log('cleared');
                setData({ ...data, todate: null })
                setNumberDays(0)

                resetError(fieldName, 'Todate is toBeRequired', true)
            } else if (data.fromdate > moment(newValue.$d).format('MM/DD/YYYY')) {

                resetError(fieldName, 'should not be smaller than from date', true)
            }
            else {
                var tdate = moment(newValue.$d).format('MM/DD/YYYY')
                setData({ ...data, todate: tdate })
                resetError(fieldName, '', false)
                daysCalculation(data.fromdate, tdate);
                console.log('fdate', data.fromdate, 'todate', tdate);
            }
        }
    }

    //reset method
    const resetButtonHandler = () => {
        setNumberDays(0)
        setData({ ...data, fromdate: null, todate: null, category: '', reasonbox: '' })
        setDecrementbtn(true);
        setIncrementbtn(true);
    }

    //submit method
    const handleApplyLeave = () => {
        console.log(noofdays);
        console.log(data);
    }

    //no of days manual increase button method
    const increaseLeaveCount = () => {
        const increasecount = noofdays + 0.5;
        setNumberDays(increasecount)
        setDecrementbtn(false);
        setIncrementbtn(true);
    }

    //no of days manual decrease button method
    const decreaseLeaveCount = () => {
        const decreasecount = noofdays - 0.5;
        setNumberDays(decreasecount)
        setDecrementbtn(true);
        setIncrementbtn(false);
    }

    //reason textfield handler function
    const reasonHandleChange = (fieldName, e) => {
        console.log(data);
        if (fieldName === 'reasonbox') {
            const reason = e.target.value;
            setData({ ...data, reasonbox: reason })
            if (reason) {
                resetError(fieldName, '', false)
            } else {
                resetError(fieldName, 'reason should be filled', true)
            }
        }
    }

    function disableWeekends(newValue) {
        return moment(newValue.$d).day() === 0 || moment(newValue.$d).day() === 6;
    }
    return (
        <Paper >            
                    <Typography>Compensatory Request</Typography>
                    <Grid spacing={2} item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} sx={{ my: 2 }}>
                                <Grid xs={12} sm={4} item>
                                    <DatePicker
                                    sx={{ width: 200 }}
                                    slotProps={{
                                        textField: { size: 'small' },
                                        actionBar: {
                                            actions: ['clear'],
                                        },
                                    }}
                                        shouldDisableDate={disableWeekends}
                                        value={data.fromdate}
                                        name='fromdate'
                                        label="From Date"
                                        onChange={(newValue) => onChangeHandlerFromdate('fromdate', newValue)} />
                                    <FormHelperText style={{ color: 'red' }}>{errorreset.fromdate.errorMessage}</FormHelperText>
                                </Grid>
                                <Grid xs={12} sm={4} item>
                                    <DatePicker
                                    sx={{ width: 200 }}
                                    slotProps={{
                                        textField: { size: 'small' },
                                        actionBar: {
                                            actions: ['clear'],
                                        },
                                    }}
                                        value={data.todate}
                                        shouldDisableDate={disableWeekends}
                                        name='todate'
                                        label="To Date"
                                        onChange={(newValue) => onChangeHandlerTodate('todate', newValue)} />
                                    <FormHelperText style={{ color: 'red' }}>{errorreset.todate.errorMessage}</FormHelperText>
                                </Grid>
                                <Grid xs={12} sm={4} item>
                                    <TextField 
                                    sx={{ width: 210 }}
                                    size='small'
                                    id="outlined-basic" 
                                    label="No of Days" 
                                    value={noofdays} 
                                    variant="outlined" />
                                    </Grid>
                                    <Grid>
                                    <ToggleButtonGroup>
                                        <ToggleButton disabled={incrementbtn}>
                                            <AddIcon size='small' onClick={increaseLeaveCount} />
                                        </ToggleButton>
                                        <ToggleButton disabled={decrementbtn}>
                                            <RemoveIcon size='small' onClick={decreaseLeaveCount} />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                                <Grid xs={12} sm={4} item>
                                    <TextField id="outlined-basic"
                                    sx={{ width: 210 }}
                                    size='small'
                                        name='reason'
                                        type={'reason'}
                                        label="Reason/notes"
                                        variant="outlined"
                                        value={data.reasonbox}
                                        onChange={(e) => reasonHandleChange('reasonbox', e)} />
                                </Grid>
                            </DemoContainer>
                        </LocalizationProvider>
                        <CardActions sx={{ marginLeft: '85%' }}>
                            <Button onClick={handleApplyLeave} disabled={btnenable} variant="contained">
                                Apply
                            </Button>
                            <Button onClick={resetButtonHandler} disabled={resetbtnenable} variant="outlined">
                                Reset
                            </Button>
                        </CardActions>               
                        </Grid>
                        
                    
                </Paper>

               
    );
}

export default Compoffreq;
