import * as React from 'react';
import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormHelperText from '@mui/material/FormHelperText'
import moment from 'moment';
import { postCommonData } from '../../commonComponent/CommonComponent';
import { CanActive } from '../../Redux/Action';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ApplyLeave(props) {
    const [btnenable, setBtnenable] = useState(false)
    const [incrementbtn, setIncrementbtn] = useState(true);
    const [decrementbtn, setDecrementbtn] = useState(true);
    const userId = localStorage.getItem('UserID');
    const dispatch = useDispatch()


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
            data.category &&
            data.reasonbox) {
            if (errorreset.fromdate.flag ||
                errorreset.todate.flag ||
                errorreset.category.flag ||
                errorreset.reasonbox.flag) {
                setBtnenable(true);

            } else {
                setBtnenable(false);
            }
        } else {
            setBtnenable(true);

        }
    }, [data, errorreset, btnenable])

    //Number of days Calculation
    const daysCalculation = (fromdate, todate) => {
        let count = 0;
        if (fromdate && todate) {
            const current = moment(fromdate).startOf('day');
            const last = moment(todate).startOf('day');
            while (current.isSameOrBefore(last)) {
                if (current.day() !== 0 && current.day() !== 6) { // Exclude Sunday (0) and Saturday (6)
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
            }
        }
    }

    const pickFromdate = data.fromdate;
    const timeInValue = moment(new Date(pickFromdate)).unix();
    //console.log(timeInValue)

    //Todate picker handler
    const onChangeHandlerTodate = (fieldName, newValue) => {
        if (fieldName === 'todate') {
            if (newValue === null) {
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
            }
        }
    }

    const pickTodate = data.todate;
    const timeOutValue = moment(new Date(pickTodate)).unix();
    //console.log(timeOutValue)

    //reset method
    const resetButtonHandler = () => {
        setNumberDays(0)
        setData({ ...data, fromdate: null, todate: null, category: '', reasonbox: '' })
        setDecrementbtn(true);
        setIncrementbtn(true);
    }

    //submit method
    const handleApplyLeave = () => {
        const SearchData = {
            empIdIn: userId,
            fromDate: timeInValue,
            toDate: timeOutValue,
            leaveType: data.category,
            noofDays: noofdays,
            reason: data.reasonbox
        }
        props.handleClose()
        postCommonData("/ESS-Java/api/emplyee/applyLeave/", SearchData)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Leave Successfully Applied!', {
                        position: toast.POSITION.TOP_RIGHT
                    });

                }
                else {
                    toast.error('Already Applied', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                console.log(res);
            })
            .catch((error) => {
                dispatch(CanActive())
            });
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

    //category select handler function
    const categoryHandleChange = (fieldName, e) => {
        if (fieldName === 'category') {
            const Category = e.target.value;
            setData({ ...data, category: Category })
            if (Category) {
                resetError(fieldName, '', false)
            } else {
                resetError(fieldName, 'category filed empty', true)
            }
        }
    }
    function disableWeekends(newValue) {
        return moment(newValue.$d).day() === 0 || moment(newValue.$d).day() === 6;
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ my: 2 }} >
                <FormControl>
                    <DatePicker
                        slotProps={{
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
                </FormControl>
                <FormControl>
                    <DatePicker
                        slotProps={{
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
                </FormControl>
            </DemoContainer>
            <DemoContainer components={['DatePicker']} sx={{ my: 2 }}>
                <TextField id="outlined-basic" label="No of Days" value={noofdays} variant="outlined" />
                <ToggleButtonGroup>
                    <ToggleButton disabled={incrementbtn}>
                        <AddIcon onClick={increaseLeaveCount} />
                    </ToggleButton>
                    <ToggleButton disabled={decrementbtn}>
                        <RemoveIcon onClick={decreaseLeaveCount} />
                    </ToggleButton>
                </ToggleButtonGroup>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="demo-select-small-label">Category</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={data.category}
                        type={'category'}
                        label="category"
                        onChange={(e) => categoryHandleChange('category', e)}
                        name='category'
                    >
                        <MenuItem value={'Casual Leave'}>Casual Leave</MenuItem>
                        <MenuItem value={'Sick Leave'}>Sick Leave</MenuItem>
                        <MenuItem value={'Privilege Leave'}>Privilege Leave</MenuItem>
                        <MenuItem value={'Comp. Leave'}>Comp. Leave</MenuItem>
                        <MenuItem value={'Leave Without Pay'}>Leave Without Pay</MenuItem>
                    </Select>
                </FormControl>
            </DemoContainer>
            <DemoContainer components={['DatePicker']} sx={{ my: 2 }}>
                <FormControl sx={{ width: '100%' }}>
                    <TextField id="outlined-basic"
                        name='reason'
                        type={'reason'}
                        label="Reason/notes"
                        variant="outlined"
                        value={data.reasonbox}
                        onChange={(e) => reasonHandleChange('reasonbox', e)} />
                </FormControl>
            </DemoContainer>
            <Button onClick={handleApplyLeave} disabled={btnenable} variant="contained" sx={{ textTransform: 'none', boxShadow: 'none' }}>
                Apply Leave
            </Button>
            <Button onClick={resetButtonHandler} disabled={btnenable} variant="outlined" sx={{ textTransform: 'none', boxShadow: 'none', ml: 2 }}>
                Reset
            </Button>
        </LocalizationProvider>
    );
}