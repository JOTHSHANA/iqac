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
        { field: 'student', headerName: 'Student' },
        { field: 'registerNumber', headerName: 'Register Number' },
        { field: 'yearOfStudy', headerName: 'Year Of Study' },
        { field: 'specialLab', headerName: 'Special Lab' },
        { field: 'courseType', headerName: 'Course Type' },
        { field: 'courseName', headerName: 'Course Name' },
        { field: 'weeks', headerName: 'Duration Of Weeks' },
        { field: 'credits', headerName: 'No of Credits' },
        { field: 'semester', headerName: 'Semester' },
        { field: 'credits', headerName: 'No of Credits' },
      ];

    

return (
    <div className='datagrid'>
      <DataGrid autoHeight  rows={data} columns={columns} sx={{ '--DataGrid-overlayHeight': '100px' }} />
    </div>
  )
}

export default OneCreditTable