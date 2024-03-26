import React, { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FacultyModal from '../stuffs/FacultyModal';
import '../styles/courseApproval.css';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';



const CourseApproval = () => {
  const [selectedOption, setSelectedOption] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [mentorCode,setmentorCode] = useState("22IT156");

  const handleFilterClick = () => {
    setShowDropdown(!showDropdown); 
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    fetchData(mentorCode, option);
    setShowDropdown(false);
  };

  const columns = [
    { field: 'student', headerName: 'Student', headerClassName: 'super-app-theme--header' },
    { field: 'register_number', headerName: 'Register Number', headerClassName: 'super-app-theme--header' },
    { field: 'year', headerName: 'Year Of Study', headerClassName: 'super-app-theme--header' },
    { field: 'course_type', headerName: 'Course Type', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'name_of_course', headerName: 'Course Name', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'semester', headerName: 'Semester', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'start_date', headerName: 'Start Date', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'end_date', headerName: 'End Date', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'certificate_url', headerName: 'Certificate URL', headerClassName: 'super-app-theme--header' , width:100},
    {
      field: 'view',
      headerName: 'View',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box style={{ cursor: 'pointer' }} onClick={() => setSelectedRowData(params.row)} >
          <RemoveRedEyeOutlinedIcon />
        </Box>
      ),
    },
  ]

  const customLocaleText = {
    noRowsLabel: `No Students Have Applied Yet for ${selectedOption == 1 ? "Course Exception" : "Rewards"} `, 
  };

  const fetchData = async (mentorCode, selectedOption) => {
    try {
      const response = await fetch(`http://localhost:5000/rpStudentsByMentor?mentorCode=${mentorCode}&type=${selectedOption}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(mentorCode, selectedOption); 
  }, []);




  return (
    <>
    <div>
      <div className="titFac">
        <div className="ti">
          <h4>Pending Approval</h4>
        </div>
        <div
          style={{ margin: "20px", marginRight: "30px", marginBottom: "5px" }}
        >
          < div style={{ display: "flex", flexDirection: "row" }}>
            <h4 style={{ marginTop: "5px" }}>Filter</h4>
            <div className="icon" onClick={handleFilterClick}>
              <FilterAltIcon className="iconfilter" />
            </div>
          </div>
        </div>
      </div>
      <div className="drop">
        {showDropdown && (
          <div className="dropdown">
            <div className="op1" onClick={() => handleOptionSelect(0)}>
              <h5>Rewards</h5>
            </div>
            <div className="op2" onClick={() => handleOptionSelect(1)}>
              <h5>Course Exemption</h5>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="titl">
          <div>{selectedOption == 1 ? "Course Exception" : "Rewards"}</div>
        </div>
      </div>
      <div>
        <div className='hometable'>
        <div className="tableMain">
          <div className="datagrid">
            <DataGrid
              autoHeight
              rows={data}
              columns={columns}
              localeText={customLocaleText}
              sx={{
                maxWidth: "100%", // Set width to 80%
                overflowX: "auto", // Enable horizontal scrolling
                "& .super-app-theme--header": {
                  color: "var(--heading-crsExp)",
                  justifyContent: "center",
                },
                "& .MuiDataGrid-columnsContainer": {
                  overflow: "visible", // Allow column headers to overflow for scrolling
                },
                "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
                  whiteSpace: "nowrap", // Prevent wrapping of cell content
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </div>
          {selectedRowData && (
            <FacultyModal
              open={true} // Always keep the modal open when there's selectedRowData
              handleClose={() => setSelectedRowData(null)}
              rowData={selectedRowData}
            />
          )}
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default CourseApproval;
