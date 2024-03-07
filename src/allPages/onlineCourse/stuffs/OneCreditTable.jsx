import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import '../styles/table.css'

const OneCreditTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const rows  = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
      ];
      
      const columns = [
        { field: 'student', headerName: 'Student', width: 90 },
        { field: 'registerNumber', headerName: 'Register Number', width: 150 },
        { field: 'yearOfStudy', headerName: 'Year Of Study', width: 150 },
        { field: 'specialLab', headerName: 'Special Lab', width: 150 },
        { field: 'courseType', headerName: 'Course Type', width: 150 },
        { field: 'courseName', headerName: 'Course Name', width: 150 },
        { field: 'weeks', headerName: 'Duration Of Weeks', width: 150 },
        { field: 'credits', headerName: 'No of Credits', width: 150 },
        { field: 'semester', headerName: 'Semester', width: 150 },
        { field: 'credits', headerName: 'No of Credits', width: 150 },
      ];

    

return (
    <div className='datagrid'>
      <DataGrid autoHeight  rows={data} columns={columns} sx={{ '--DataGrid-overlayHeight': '100px' }} />
    </div>
  )
}

export default OneCreditTable