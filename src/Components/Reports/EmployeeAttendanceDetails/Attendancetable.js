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
import { postCommonData } from '../../commonComponent/CommonComponent';
import { CanActive } from '../../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';


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
export default function Attendancetable() {
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
    // useEffect(() => {
    //     setDatatable(data);
    // }, [])

    var tableMainData;
    const fun = (data_) => {
        setDatatable(data_);
    }

    useEffect(() => {
        const data = {
            empId: "",
            timeIn: 1682899200000,
            timeOut: "",
            authorised: "",
            status: "",
            supervisorEmpIds: "",
        }
        postCommonData("/ESS-Java/api/emplyee/empAttendanceReportDetailsSearch/", data)
            .then((res) => {
                setDatatable(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                dispatch(CanActive())
            });

    }, [ans, logoutpayload, dispatch])

    tableMainData = datatable.map(v => ({
        Dayin: v.timeIn,
        Dayout: v.timeOut,
        Timein: v.timeIn1,
        Timeout: v.timeOut1,
        Status: v.status,
        Hours: v.hoursWithAdd,
        Remarks: v.remarks,
        Category: v.category,
        AuthorisedBy: v.authorisedBy,
        TransId: v.transId
    }));
    const columns = useMemo(() => [
        {
            field: 'Dayin',
            headerName: 'Day In',
            width: 100,
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
            field: 'Timein',
            headerName: 'Time In',
            width: 100,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            valueGetter: (params) => {
                if (params) {
                    let parsedDate = new Date(params.value);
                    return parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                }
            }
        },
        {
            field: 'Dayout',
            headerName: 'Day Out',
            width: 100,
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
            field: 'Timeout',
            headerName: 'Time Out',
            width: 100,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            valueGetter: (params) => {
                if (params) {
                    let parsedDate = new Date(params.value);
                    return parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                }
            }
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
            field: 'Category',
            headerName: 'Category',
            width: 120,
            sortable: false
        }, {
            field: 'Status',
            headerName: 'Status',
            width: 100,
            sortable: false
        }, {
            field: 'AuthorisedBy',
            headerName: 'Authorised by',
            filterable: false,
            sortable: false,
            width: 140,
        },
        {
            field: 'Remarks',
            headerName: 'Notes',
            filterable: false,
            sortable: false,
            width: 100,
        },
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
                    <Filter dataFilter={datatable} func={fun} />
                </StyledMenu>
            </Box>

            <Paper sx={{
                width: '100%', height: 'calc(100vh - 190px)', minHeight: '300px', '& .addon': {
                    color: 'green'
                }, '& .shortfall': {
                    color: 'red'
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
        </React.Fragment>

    );
}