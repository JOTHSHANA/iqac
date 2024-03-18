import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import '../styles/oneCreditTable.css'

const OneCreditTable = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

      const columns = [
        { field: 'course_name', headerName: 'Course Name' ,headerClassName: 'super-app-theme--header',width:150},
        { field: 'course_code', headerName: 'Course Code' , headerClassName: 'super-app-theme--header',width:150 },
        { field: 'semester', headerName: 'Semester', headerClassName: 'super-app-theme--header',width:150},
        { field: 'year_of_passing', headerName: 'Year Of Passing' , headerClassName: 'super-app-theme--header',width:150},
      ];

      const customLocaleText = {
        noRowsLabel: 'You have Not yet Applied any Courses', // Change this to your desired text
      };
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/oneCredit');
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
          {console.log(data)}
        </div>
      );
    };

export default OneCreditTable