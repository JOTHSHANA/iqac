import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import '../styles/table.css'

const OnlineTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const rows  = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
      ];
      
      const columns = [
        { field: 'student', headerName: 'Student', headerClassName: 'super-app-theme--header',
        headerAlign: 'center' },
        { field: 'registerNumber', headerName: 'Register Number',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'yearOfStudy', headerName: 'Year Of Study',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'specialLab', headerName: 'Special Lab',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'courseType', headerName: 'Course Type',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'courseName', headerName: 'Course Name',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'weeks', headerName: 'Duration Of Weeks',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'credits', headerName: 'No of Credits',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'semester', headerName: 'Semester',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'credits', headerName: 'No of Credits',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
      ];

      const customLocaleText = {
        noRowsLabel: 'You have Not yet Applied any Courses', // Change this to your desired text
    };
    

return (
  <div className='tableMain' >
  <div className="datagrid">
    <DataGrid
      autoHeight
      rows={data}
      columns={columns}
      localeText={customLocaleText} 
      sx={{
        "--DataGrid-overlayHeight": "100px",
        "& .super-app-theme--header": {
          color: "var(--heading-crsExp)",
        },
      }}
    />
  </div>
  </div>
);
}

export default OnlineTable