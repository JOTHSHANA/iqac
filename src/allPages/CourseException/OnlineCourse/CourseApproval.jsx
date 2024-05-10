import React, { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FacultyModal from '../stuffs/FacultyModal';
import '../styles/courseApproval.css';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';



const CourseApproval = () => {
  const [selectedOption, setSelectedOption] = useState("1");
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [mentorCode,setmentorCode] = useState("22IT137");

  const handleFilterClick = () => {
    setShowDropdown(!showDropdown); 
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    fetchData(option,mentorCode);
    setShowDropdown(false);
  };

  const columns = [
    { field: 'student_name', headerName: 'Student', headerClassName: 'super-app-theme--header' },
    { field: 'register_number', headerName: 'Register Number', headerClassName: 'super-app-theme--header' },
    { field: 'year', headerName: 'Year Of Study', headerClassName: 'super-app-theme--header' ,
    renderCell: (params) => (
      <Box>
        {
          params.value === 1 ? "1st Year" : params.value === 2 ? "2nd Year" : params.value === 3 ? "3rd Year" : "4th year"
        }
      </Box>
    ),
  },
    { field: 'platform_name', headerName: 'Course Type', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'course_name', headerName: 'Course Name', headerClassName: 'super-app-theme--header', width:100 },
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

  const fetchData = async (selectedOption,mentorCode) => {
    // const option = parseInt(selectedOption);
    try {
      const response = await fetch(`http://localhost:5001/api/ce/oc/facultyApprovals?type=${selectedOption}&approval_status=${0}&mentor_code=${mentorCode}`);
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
    fetchData(selectedOption,mentorCode); 
  }, []);




  return (
    <>
    <div className='pendingTable'>
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
            <div className="op1" onClick={() => handleOptionSelect("0")}>
              <h5>Rewards</h5>
            </div>
            <div className="op2" onClick={() => handleOptionSelect("1")}>
              <h5>Course Exemption</h5>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="titl">
          <div>{selectedOption == "1" ? "Course Exception" : "Rewards"}</div>
        </div>
      </div>
      <div>
        <div className="hometable">
        <div className="tableMain">
          <div className="datagrid">
            <DataGrid
              className='dat'
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
              fetchData={fetchData}
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
