import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import '../styles/table.css';

const OnlineTable = ({setFirstData}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    { field: 'student', headerName: 'Student', headerClassName: 'super-app-theme--header',},
    { field: 'register_number', headerName: 'Register Number', headerClassName: 'super-app-theme--header',},
    { field: 'year', headerName: 'Year Of Study', headerClassName: 'super-app-theme--header',},
    { field: 'course_type', headerName: 'Course Type', headerClassName: 'super-app-theme--header',},
    { field: 'name_of_course', headerName: 'Course Name', headerClassName: 'super-app-theme--header',},
    { field: 'semester', headerName: 'Semester', headerClassName: 'super-app-theme--header',},
    { field: 'start_date', headerName: 'Start Date', headerClassName: 'super-app-theme--header',},
    { field: 'end_date', headerName: 'End Date', headerClassName: 'super-app-theme--header',},
    { field: 'certificate_url', headerName: 'Certificate URL', headerClassName: 'super-app-theme--header',},
  ];

  const customLocaleText = {
    noRowsLabel: 'You have Not yet Applied any Courses', // Change this to your desired text
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/rpStudents');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData); // Update state with fetched data
        setFirstData(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); 


  return (
    <div className="tableMain">
      <div className="datagrid">
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          localeText={customLocaleText}
          sx={{
            width: "80%", // Set width to 80%
            overflowX: "auto", // Enable horizontal scrolling
            "& .super-app-theme--header": {
              color: "var(--heading-crsExp)",
            },
            "& .MuiDataGrid-columnsContainer": {
              overflow: "visible", // Allow column headers to overflow for scrolling
            },
            "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
              whiteSpace: "nowrap", // Prevent wrapping of cell content
            },
          }}
        />
      </div>
    </div>
  );
};

export default OnlineTable;
