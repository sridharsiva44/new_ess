import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, Button, Paper } from '@mui/material';
import Filter from './Filter';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { GridToolbarExport } from '@mui/x-data-grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import moment from 'moment';
import { CanActive } from '../../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


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
function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 1 }}>
            <GridToolbarQuickFilter className='gridSearch' />
            <GridToolbarExport id='exportButton' />
        </GridToolbarContainer>
    );
}
export default function Odrequesttable() {
    const [fromdate, setFromdate] = useState(null);
    const [todate, setTodate] = useState(null);
    const [labelflag, setLabelflag] = useState(false);
    const [fromdateError, setFromdateError] = useState('');
    const [todateError, setTodateError] = useState('');
    const [searchbtn, setSearchbtn] = useState(true);
    const [datatable, setDatatable] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch()
    const { ans, logoutpayload } = useSelector((state) => state.validate)

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        if (fromdate && todate) {
            if (new Date(fromdate) > new Date(todate)) {
                console.log(typeof fromdate)
                console.log(typeof todate)
                setFromdateError('from should be equal or smaller than todate')
                setTodateError('todate should be equal or larger than fromdate')
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
    // useEffect(() => {
    //     setDatatable(data);
    // }, [])

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

    const fun = (data_) => {
        setDatatable(data_);
        console.log(datatable);
    }

    var tableMainData;

    useEffect(() => {
        const token = localStorage.getItem('AccessToken');
        console.log(token);
        axios.request({
            url:"/ESS-Java/api/emplyee/employeeOdForRP/",
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
        // console.log("hello")
        // CommongetCall("/ESS-Java/api/emplyee/employeeLeavesForRP/")
        //     .then(res => {
        //         setDatatable(res.data);
        //         console.log(res.data);
        //     })
        //     .catch((error) => {
        //         dispatch(CanActive())
        //     });

    }, [ans, logoutpayload, dispatch])

    const pendingData = datatable.filter(item => item.status === "Cancelled");
    console.log(pendingData)
    tableMainData = pendingData.map(v => ({
        Applieddate: v.applieddate,
        Fromdate: v.fromDate,
        Todate: v.toDate,
        Noofdays: v.noofDays,
        Status: v.status,
        Reason: v.reason,
        AuthorisedBy: v.authorisedBy,
        id: v.transId
    }));

    const columns = useMemo(() => [
        {
            field: 'Applieddate',
            headerName: 'Applied Date',
            width: 150,
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
            width: 150,
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
            width: 150,
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
            headerName: '#Days',
            width: 150,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
        }, {
            field: 'Reason',
            headerName: 'Reason',
            width: 150,
            sortable: false
        }, {
            field: 'Status',
            headerName: 'Status',
            cellClassName: (params) => {
                if (params.row.Status === 'Cancelled') {
                    return params.value
                }
            },
            sortable: false,
            width: 150,
        }, {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: ({ row }) =>
                <HighlightOffIcon style={{ color: 'red' }} />
        }
    ], [])

    return (
        <React.Fragment>
            <Box component="main" sx={{ width: '100%', mb: 2 }}>
                <Button
                    id="filter-button"
                    aria-controls={open ? 'filter-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    startIcon={<FilterAltOutlinedIcon />}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{ textTransform: 'none' }}
                >
                    Filters
                </Button>
                <StyledMenu
                    id="filter-menu"
                    MenuListProps={{
                        'aria-labelledby': 'filter-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
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
                </StyledMenu>
            </Box>
            <Paper sx={{
                '& .textGreen': {
                    color: 'green',
                },
                '& .textRed': {
                    color: 'red'
                }, '& .red': {
                    color: 'red',
                    cursor: 'pointer',
                    ":hover": {
                        color: "rgba(255, 0, 0, 0.466)"
                    }
                }, '& .Delete': {
                    color: 'red'
                }, '& .unableDelete': {
                    color: 'rgba(62, 60, 60, 0.466)'
                }
            }} >
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
                    getRowId={(row) => row.id}
                />
            </Paper>
        </React.Fragment>
    );
}