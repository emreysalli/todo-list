import React from 'react';
import "./Datagrid.css";
import Box from "@mui/material/Box";
import { DataGrid} from '@mui/x-data-grid';

function Datagrid(props) {
    function getPriority(params) {
        return `${params.row.taskPriority || 'None'} `;
      }
    const columns = [
        { field: 'id', headerName: 'ID', width: 350 },
        {
          field: 'text',
          headerName: 'Task',
          width: 250,
          editable: true,
        },
        {
          field: 'taskPriority',
          headerName: 'Priority',
          width: 150,
          valueGetter:getPriority,
          editable: true,
        },
        {
          field: 'isComplete',
          headerName: 'Is Completed',
          width: 110,
          editable: true,
        },
      ];
      
  return (
    <Box id="datagridBox" sx={{ height: 100, width: '60%',
      '& .Low': {
        backgroundColor: 'green',
        color: '#1a3e72',
      },
      '& .Medium': {
        backgroundColor: 'yellow',
        color: '#1a3e72',
      }, 
      '& .High': {
        backgroundColor: 'orange',
        color: '#1a3e72',
      },
      '& .Immediately': {
        backgroundColor: 'red',
        color: '#1a3e72',
      },
      '& .None': {
        backgroundColor: '',
        color: '#1a3e72',
      }
    
    }}>
    <DataGrid
    rows={props.taskItems}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    checkboxSelection
    disableSelectionOnClick
    getCellClassName={(params) => {
        if (params.field !== 'taskPriority') {
          return '';
        }
        return params.value;
      }}
  /></Box>
  )
}

export default Datagrid