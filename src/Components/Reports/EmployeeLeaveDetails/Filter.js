
import { Box, Button, FormControl, FormHelperText, Menu, alpha } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import React, { useEffect} from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import moment from 'moment';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
function Filter(props) {
    var data = props.dataFilter
    var resultProductData;
    useEffect(() => {

    }, []);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
        <React.Fragment>            
                <Box sx={{ m: 1.8, mt: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <FormControl>
                                <DatePicker label="From Date"
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
                                <DatePicker label="To Date"
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
            {/* </StyledMenu> */}
        </React.Fragment>

    )
}

export default Filter