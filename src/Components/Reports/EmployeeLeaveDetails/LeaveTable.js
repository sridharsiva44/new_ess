import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, Menu, MenuItem, Paper, alpha } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { GridToolbarExport } from '@mui/x-data-grid';
import Filter from './Filter';
import ApplyLeave from './ApplyLeaveForm';
import moment from 'moment';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { CanActive } from '../../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


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
export default function Gridtable() {
    const [fromdate, setFromdate] = useState(null);
    const [todate, setTodate] = useState(null);
    const [labelflag, setLabelflag] = useState(false);
    const [fromdateError, setFromdateError] = useState('');
    const [todateError, setTodateError] = useState('');
    const [searchbtn, setSearchbtn] = useState(true);
    const [datatable, setDatatable] = useState([]);
    //const [filterdata, setFilterdata] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch()
    const { ans, logoutpayload } = useSelector((state) => state.validate)
    const open_ = Boolean(anchorEl)

    useEffect(() => {
        if (fromdate && todate) {
            if (new Date(fromdate) > new Date(todate)) {
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
    },
        [fromdate, todate, fromdateError, todateError, searchbtn]);

    const handleClick_ = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose_ = () => {
        setAnchorEl(null);
    };
    // useEffect(() => {
    //     setDatatable(data);
    // }, [])
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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

    useEffect(() => {

        const token = localStorage.getItem('AccessToken');
        console.log(token);
        axios.request({
            url:"/ESS-Java/api/emplyee/employeeLeavesForRP/",
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
        Dateofrequest: v.applieddate,
        Fromdate: v.fromDate,
        Todate: v.toDate,
        Noofdays: v.noofDays,
        Reason: v.reason,
        AuthorisedBy: v.authorisedBy,
        Status: v.status,
        TransID: v.transId,
        Category: v.category
    }));

    const columns = useMemo(() => [
        {
            field: 'Dateofrequest',
            headerName: 'Date Of Request',
            width: 130,
            filterable: false,
            valueGetter: (params) => {
                let dayin = new Date(params.value);
                var month = dayin.getMonth() + 1;
                var date = dayin.getDate();
                var year = dayin.getFullYear();
                return (date < 10 ? '0' + date : date) + "/" + (month < 10 ? '0' + month : month) + "/" + year;
            },
            getApplyQuickFilterFn: undefined
        },
        {
            field: 'Fromdate',
            headerName: 'From Date',
            width: 110,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            valueGetter: (params) => {
                let dayin = new Date(params.value);
                var month = dayin.getMonth() + 1;
                var date = dayin.getDate();
                var year = dayin.getFullYear();
                return (date < 10 ? '0' + date : date) + "/" + (month < 10 ? '0' + month : month) + "/" + year;
            },
        },
        {
            field: 'Todate',
            headerName: 'To Date',
            width: 110,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            valueGetter: (params) => {
                let dayin = new Date(params.value);
                var month = dayin.getMonth() + 1;
                var date = dayin.getDate();
                var year = dayin.getFullYear();
                return (date < 10 ? '0' + date : date) + "/" + (month < 10 ? '0' + month : month) + "/" + year;
            },
        }, {
            field: 'Noofdays',
            headerName: 'No.of Day(s)',
            width: 100,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
        },
        {
            field: 'Category',
            headerName: 'Category',
            sortable: false,
            width: 140,
        }, {
            field: 'Reason',
            filterable: false,
            headerName: 'Reason for leave',
            width: 140,
            sortable: false
        },
        {
            field: 'Status',
            headerName: 'Status',
            cellClassName: (params) => {
                if (params.value === 'Approved') {
                    return 'textGreen'
                }
                if (params.value === 'Declined') {
                    return 'textRed'
                }
            },
            sortable: false,
            width: 120,
        }, {
            field: 'AuthorisedBy',
            headerName: 'Authorised By',
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            width: 150,
        }

    ], [])

    return (
        <React.Fragment>
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

                <Button variant="contained" onClick={handleClickOpen} sx={{ textTransform: 'none', boxShadow: 'none', ml: 2 }}>
                    Apply Leave
                </Button>
                <BootstrapDialog onClose={handleClose} aria-labelledby="Leave-Request-Form" open={open}>
                    <BootstrapDialogTitle id="Leave-Request-Form" onClose={handleClose} component="h6" variant="h6">
                        Leave Request Form
                    </BootstrapDialogTitle>
                    <DialogContent>
                        <ApplyLeave handleClose={handleClose} />
                    </DialogContent>
                </BootstrapDialog>
            </Box>

            <Paper sx={{
                width: '100%',
                // height: 'calc(100vh - 190px)',
                minHeight: '300px',
                '& .textGreen': {
                    color: 'green'
                }, '& .textRed': {
                    color: 'red'
                }
            }}>
                <DataGrid
                    rows={tableMainData}
                    columns={columns}
                    slots={{ toolbar: CustomToolbar }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    hideScrollbar={true}
                    getRowId={(row) => row.TransID}
                    className='reportsGrid'
                />
            </Paper>
        </React.Fragment>

    );
}