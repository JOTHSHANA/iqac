import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const FacultyApprovalTable = () => {
  const [data, setData] = useState([]);

  const columns = [
    // { field: 'student', headerName: 'Student', headerClassName: 'super-app-theme--header' },
    // { field: 'register_number', headerName: 'Register Number', headerClassName: 'super-app-theme--header' },
    // { field: 'year', headerName: 'Year Of Study', headerClassName: 'super-app-theme--header' },
    { field: 'course_type', headerName: 'Course Type', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'name_of_course', headerName: 'Course Name', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'semester', headerName: 'Semester', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'start_date', headerName: 'Start Date', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'end_date', headerName: 'End Date', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'certificate_url', headerName: 'Certificate URL', headerClassName: 'super-app-theme--header' , width:100},
  ]
  const customLocaleText = {
    noRowsLabel: 'You have Not yet Applied any Courses', // Change this to your desired text
  };


  return (
    <div>FacultyApprovalTable</div>
  )
}

export default FacultyApprovalTable