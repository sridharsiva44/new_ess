import React, { useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Upcomingleave() {
    
    const columns = useMemo(() => [
        {
            field: 'fromdate',
            width: 70,
            disableColumnMenu: true,
            headerName: 'From Date',
            sortable: false,
            filterable: false,
            getApplyQuickFilterFn: undefined
        },
        {
            field: 'todate',
            disableColumnMenu: true,
            headerName: 'To date',
            width: 70,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
        },
        {
            field: 'noofdays',
            disableColumnMenu: true,
            headerName: 'Days',
            width: 70,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined,
        }, {
            field: 'category',
            disableColumnMenu: true,
            headerName: 'Category',
            width: 70,
            filterable: false,
            sortable: false,
            getApplyQuickFilterFn: undefined
        }, {
            field: "reason",
            width: 70,
            disableColumnMenu: true,
            headerName: "Reason For Leave",
            filterable: false,
            getApplyQuickFilterFn: undefined,
            sortable: false,
        }, {
            field: 'status',
            width: 70,
            disableColumnMenu: true,
            headerName: 'Status',
            filterable: false,
            sortable: false,
            cellClassName: (params) => {
                if (params.value === 'Approved') {
                    return 'textGreen'
                }
                if (params.value === 'Declined') {
                    return 'textRed'
                }
            },

        },
        {
            field: "action",
            disableColumnMenu: true,
            width: 70,
            headerName: "Action",
            sortable: false,
            filterable: false,
            cellClassName: (params) => {
                if (params.row === 'Progress') {
                    return 'Delete'
                } else if (params.row.status === 'Approved' || params.row.Status === 'Declined') {
                    return 'unableDelete'
                } else {
                    return 'red'
                }
            },
            renderCell: ({ row }) =>
                <HighlightOffIcon style={{ color: 'red' }} />
        }
    ], [])

    return (
        <Box sx={{
            height: 200,
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
                color: 'rgba(92, 90, 90, 0.466)'
            }
        }}>
            <DataGrid
                rows={""}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                // pageSizeOptions={[5, 10, 25]}
                hideScrollbar={true}
                getRowId={(row) => row.id}
            />
        </Box>
    )
}

export default Upcomingleave