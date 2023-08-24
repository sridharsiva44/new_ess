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
import moment from 'moment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';



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
export default function ShortfallTable() {
    const [fromdate, setFromdate] = useState(null);
    const [todate, setTodate] = useState(null);
    const [labelflag, setLabelflag] = useState(false);
    const [fromdateError, setFromdateError] = useState('');
    const [todateError, setTodateError] = useState('');
    const [searchbtn, setSearchbtn] = useState(true);
    const [datatable, setDatatable] = useState([]);
    //const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    //const [totalwork, setTotalwork] = useState([])
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
    // useEffect(() => {
    //     setDatatable(data);
    // }, [])
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };
    const totalHours = (timeIn_, timeOut_) => {
        const CurrentDate = new Date(timeIn_);
        const timeIn = moment(CurrentDate).unix();
        const CurrentTimeout = new Date(timeOut_);
        const timeOut = moment(CurrentTimeout).unix();
        const total = timeOut - timeIn
       
        let minutes = parseInt(total / 60);
        const hours = parseInt(minutes / 60);
        minutes = parseInt(minutes % 60);
        const hoursvalue = hours < 10 ? '0' + hours : hours
        const minutesvalue = minutes < 10 ? '0' + minutes : minutes
        const timeVal = hoursvalue + "h" + " " + minutesvalue + "m";
        
        return timeVal
    }
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

    tableMainData = datatable.map(v => ({ Dayin: v.timeIn, Timein: v.timeIn1, Dayout: v.timeOut, Timeout: v.timeOut1, Hours: v.hours, AddonShortfall: v.Addonshortfall, Category: v.category, status: v.status, authorisedBy: v.authorisedBy, Notes: v.notes, TransId: v.transId }));
    const columns = useMemo(() => [
        {
            field: 'Dayin',
            headerName: 'From Date',
            width: 150,
            filterable: false,
            valueGetter: (params) => {
                const CurrentDate = new Date(params.value);
                const date = moment(CurrentDate).format("DD/MM/YYYY");
                return date

            },
            getApplyQuickFilterFn: undefined
        },        
        {
            field: 'Dayout',
            headerName: 'To Date',
            width: 150,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
            valueGetter: (params) => {
                const CurrentDate = new Date(params.value);
                const dateout = moment(CurrentDate).format("DD/MM/YYYY");
                return dateout
            },
        },        
        {
            field: 'Noofdays',
            headerName: '#Days',
            width: 150,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
        },
        {
            field: 'Category',
            headerName: 'Category',
            width: 150,
            sortable: false
        },

        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            sortable: false,
            cellClassName: (params) => {
                if (params.value === "Declined") {
                    return 'declined'
                }

            }
        }, 
        {
            field: 'Notes',
            headerName: 'Reason',
            sortable: false,
            width: 150,
        }, {
            field: "Action",
            headerName: "Action",
            filterable: false,
            sortable: false,
            renderCell: ({ row }) =>
            <HighlightOffIcon style={{ color: 'red' }} />
        }
    ], [])
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
                        <Filter dataFilter={""} func={fun}
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
                
            </Box>
            <Paper sx={{
                height:280,
                datagridsx, '& .addon': {
                    color: 'green'
                }, '& .shortfall': {
                    color: 'red'
                }, '& .zero': {
                    color: 'black'
                },
                '& .declined': {
                    color: 'red'
                }
            }}>
                <DataGrid

                    rows={""}
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
                    //pageSizeOptions={[5, 10, 25]}
                    hideScrollbar={true}
                    getRowId={(row) => row.TransId}
                    //className='reportsGrid'
                />
            </Paper>
        </>

    );
}