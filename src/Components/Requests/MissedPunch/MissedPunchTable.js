import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, Menu, MenuItem, Paper, alpha } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { GridToolbarExport } from '@mui/x-data-grid';
import Filter from './Filter';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { CanActive } from '../../Redux/Action';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 1 }}>
            <GridToolbarQuickFilter className='gridSearch' />
            <GridToolbarExport id='exportButton' />
        </GridToolbarContainer>
    );
}
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
export default function MissedPunchTable() {
    const [fromdate, setFromdate] = useState(null);
    const [todate, setTodate] = useState(null);
    const [timeIn, setTimeIn] = useState(null);
    const [timeOut, setTimeOut] = useState(null)
    const [labelflag, setLabelflag] = useState(false);
    const [fromdateError, setFromdateError] = useState('');
    const [todateError, setTodateError] = useState('');
    const [searchbtn, setSearchbtn] = useState(true);
    const [datatable, setDatatable] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [editingRowId, setEditingRowId] = useState(null);

    const dispatch = useDispatch()
    const { ans, logoutpayload } = useSelector((state) => state.validate)

    const open_ = Boolean(anchorEl)
    useEffect(() => {
        if (fromdate && todate) {
            if (new Date(fromdate) > new Date(todate)) {
                console.log(typeof fromdate)
                console.log(typeof todate)
                setFromdateError('from should be smaller than todate')
                setTodateError('todate should be larger than from date')
            } else {
                setFromdateError('')
                setTodateError('')
            }
            if (fromdateError || todateError) {
                setSearchbtn(true)
            } else {
                setSearchbtn(false)
            }
        } else {
            setSearchbtn(true)
        }
    }, [fromdate, todate, fromdateError, todateError, searchbtn]);
    const handleClick_ = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose_ = () => {
        setAnchorEl(null);
    };

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    var tableMainData;
    const fun = (data_) => {
        setDatatable(data_);
    }
    const fromdateHandler = (fieldName, newValue) => {
        if (fieldName === 'fromdate') {
            if (newValue === null) {
                setFromdate(null)
                setFromdateError('field is required')

            }
            else {
                const fdate = moment(newValue.$d).format('MM/DD/YYYY')
                setFromdate(fdate)
                console.log(fdate)
                setFromdateError('')
            }
        }
    }

    const todateHandler = (fieldName, newValue) => {
        if (fieldName === 'todate') {
            if (newValue === null) {
                setTodate(null)
                setTodateError('field is required')
            }
            else {
                const tdate = moment(newValue.$d).format('MM/DD/YYYY')
                setTodate(tdate)
                setTodateError('')
            }
        }
    }
    const handleTimeInChange = (fieldName, val) => {
        if (fieldName === 'timein') {
            if (val === null) {
                setTimeIn(null);
                //resetError(fieldName, 'InTime is required', true);
            } else {
                const hours = new Date(val).getHours();
                const minutes = new Date(val).getMinutes();
                console.log(`${hours}:${minutes}`);
                console.log(val)
                setTimeIn(val);
            }
        }

    };

    const handleTimeOutChange = (fieldName, val) => {
        if (fieldName === 'timeout') {
            if (val === null) {
                setTimeOut(null);
                //resetError(fieldName, 'InTime is required', true);
            } else {
                const hours = new Date(val).getHours();
                const minutes = new Date(val).getMinutes();
                console.log(`${hours}:${minutes}`);
                console.log(val)
                setTimeOut(val);
            }
        }

    };


    const handleEditButtonClick = (rowId) => {
        setEditingRowId(rowId);

    };

    useEffect(() => {

        const token = localStorage.getItem('AccessToken');
        console.log(token);
        axios.request({
            url:"/ESS-Java/api/emplyee/attendanceDetailsByRoleForAuth/",
            method: "get",
            headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            console.log(res.data);
            setDatatable(res.data);
        })
            .catch((error) => {
                dispatch(CanActive())
            });


    }, [ans, logoutpayload, dispatch])

    tableMainData = datatable.map(v => ({
        Dayin: v.timeIn,
        Timein: v.timeIn1,
        Dayout: v.timeOut,
        Timeout: v.timeOut1,
        Hours: v.hoursWithAdd,
        AddonShortfall: v.Addonshortfall,
        Category: v.category,
        status: v.status,
        authorisedBy: v.authorisedBy,
        Reason: v.reason,
        Action: v.action,
        TransId: v.transId
    }));

    const columns = useMemo(() => [
        {
            field: 'Dayin',
            headerName: 'Day in',
            width: 100,
            filterable: false,
            valueGetter: (params) => {
                const CurrentDate = new Date(params.value);
                const date = moment(CurrentDate).format("DD/MM/YYYY");
                return date
            },
            getApplyQuickFilterFn: undefined
        },
        {
            field: 'Timein',
            headerName: 'Time in',
            width: 100,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            valueGetter: (params) => {
                if (params) {
                    const CurrentDate = new Date(params.value);
                    const time = moment(CurrentDate).format("HH:mm");
                    return time
                }
            }
        },
        {
            field: 'TimeIn',
            headerName: 'Time in(New)',
            width: 150,
            filterable: false,
            sortable: false,
            renderCell: ({ row }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <TimePicker
                        sx={{ width: 200 }}
                        slotProps={{
                            textField: { size: 'small' },
                            actionBar: {
                                actions: ['clear'],
                            },
                        }}
                        disabled={editingRowId !== row.TransId ? true : false}
                        ampm={false}
                        openTo="hours"
                        format="HH:mm"
                        value={timeIn}
                        onChange={(val) => handleTimeInChange('timein', val)}

                    />
                </LocalizationProvider>
            ),
        },
        {
            field: 'Dayout',
            headerName: 'Day out',
            width: 100,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            valueGetter: (params) => {
                const currentDate = new Date(params.value);
                return params.value ? moment(currentDate).format("DD/MM/YYYY") : "null";

            },
        },
        {
            field: 'Timeout',
            headerName: 'Time out',
            width: 100,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            valueGetter: (params) => {
                const currentDate = new Date(params.value);
                return params.value ? moment(currentDate).format("DD/MM/YYYY") : "00:00";
            }
        },
        {
            field: 'TimeOut',
            headerName: 'Time out(New)',
            width: 150,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            renderCell: ({ row }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        sx={{ width: 200 }}
                        slotProps={{
                            textField: { size: 'small' },
                            actionBar: {
                                actions: ['clear'],
                            },
                        }}
                        disabled={editingRowId !== row.TransId ? true : false}
                        ampm={false}
                        openTo="hours"
                        format="HH:mm"
                        value={timeOut}
                        onChange={(val) => handleTimeOutChange('timeout', val)}

                    />
                </LocalizationProvider>
            ),
        },
        {
            field: 'Hours',
            headerName: 'Total Hours',
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            width: 100,
            valueGetter: (params) => {
                if (params) {
                    const Time = params.value
                    if (Time === null) {
                        const val = null
                        return val
                    } else {
                        const hours = moment(Time, 'HH:mm').get('hours')
                        const minutes = moment(Time, 'HH:mm').get('minutes')
                        const hoursvalue = hours < 10 ? '0' + hours : hours
                        const minutesvalue = minutes < 10 ? '0' + minutes : minutes
                        const workhours = hoursvalue + "h" + " " + minutesvalue + "m";
                        return workhours
                    }
                }
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            sortable: false,
            cellClassName: (params) => {
                if (params.value === "Declined") {
                    return 'declined'
                }

            }
        },
        {
            field: 'Reason',
            headerName: 'Reason',
            filterable: false,
            sortable: false,
            width: 100,
        }, {
            field: "Action",
            headerName: "Action",
            filterable: false,
            sortable: false,
            renderCell: ({ row }) =>
                <div>
                    {editingRowId === row.TransId ? (
                        <IconButton >
                            <SaveIcon style={{ color: 'blue', marginRight: '10px' }} />
                            <CancelIcon style={{ color: 'red' }} onClick={() => setEditingRowId(null)} />
                        </IconButton>


                    ) : (
                        <IconButton
                            onClick={() => { handleEditButtonClick(row.TransId) }}
                            aria-label="edit"
                        >
                            <EditOutlinedIcon style={{ color: 'blue' }} />
                        </IconButton>
                    )}
                </div>
        }
    ], [editingRowId]);


    const datagridsx = {
        width: '80%'
    }

    return (
        <>

            <Box component="main" sx={{ width: '100%', mb: 2 }}>
                <Button
                    id="filter-button"
                    aria-controls={open_ ? 'filter-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open_ ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    startIcon={<FilterAltOutlinedIcon />}
                    onClick={handleClick_}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{ textTransform: 'none' }}
                >
                    Filter
                </Button>
                <StyledMenu
                    id="filter-menu"
                    MenuListProps={{
                        'aria-labelledby': 'filter-button',
                    }}
                    anchorEl={anchorEl}
                    open={open_}
                    onClose={handleClose_}

                >
                    <MenuItem disableRipple>
                        <Filter dataFilter={datatable} func={fun}
                            fromdateHandler={fromdateHandler}
                            todateHandler={todateHandler}
                            fromdate={fromdate}
                            todate={todate}
                            fromdateError={fromdateError}
                            todateError={todateError}
                            setFromdateError={setFromdateError}
                            setTodateError={setTodateError}
                            labelflag={labelflag}
                            setLabelflag={setLabelflag}
                            searchbtn={searchbtn} />
                    </MenuItem>
                </StyledMenu>
                {/* <Button variant="contained" onClick={handleClickOpen} sx={{ textTransform: 'none', boxShadow: 'none', ml: 2 }}>
                    Apply Leave
                </Button> */}
            </Box>
            <Paper sx={{
                datagridsx, '& .addon': {
                    color: 'green'
                }, '& .shortfall': {
                    color: 'red'
                },
                '& .request': {
                    color: 'gery'
                }, '& .raiserequest': {
                    color: 'blue'
                }
            }}>
                <DataGrid
                    rows={tableMainData}
                    columns={columns}
                    slots={{ toolbar: CustomToolbar }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    hideScrollbar={true}
                    getRowId={(row) => row.TransId}
                    className='reportsGrid'
                />
            </Paper>
        </>

    );
}