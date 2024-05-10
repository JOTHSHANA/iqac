import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import "../styles/creditHome.css"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Modal from '@mui/material/Modal';
import Select from 'react-select'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%', // Adjusted width for larger screens
  maxWidth: '650px', // Maximum width for smaller screens
  bgcolor: 'background.paper',
  borderRadius:'10px',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  p: 4,
};

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%', // Adjusted width for larger screens
  maxWidth: '300px', // Maximum width for smaller screens
  bgcolor: 'background.paper',
  borderRadius:'10px',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  p: 4,
};
const style2 = {
  position: 'absolute',
    top: '5%',
    left: '50%',
    bottom:'90%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    bgcolor: 'background.paper',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    borderRadius:'10px',
    p: 4,
};

const CreditHome = () => {
  const navigate = useNavigate()
  const [student,setStudent] = useState(1);
  const [email,setEmail] = useState("gauthamsrinivasan21@gmail.com");
  const [showModal, setShowModal] = useState(false);
  const [resModal,setResModal] = useState(false);
  const [applied,setApplied] = useState(false);
  const [clearStatus,setClearStatus] = useState(false);
  const [rejection,setRejection] = useState(false);
  const [remark,setRemark] = useState("");
  const [expModal,setExpModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [status,setStatus] = useState("");
  const [c1,setC1] = useState("");
  const [c2,setC2] = useState("");
  const [c3,setC3] = useState("");
  const [cls,setCls] = useState(0);
  const [expData,setExpData] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(0);
  

  const [selectedCourses, setSelectedCourses] = useState([]);

      const columns = [
        { field: 'id', headerName:"Id",headerClassName: 'super-app-theme--header',width:100},
        { field: 'course_name', headerName: 'Course Name' ,headerClassName: 'super-app-theme--header',width:150},
        { field: 'course_code', headerName: 'Course Code' , headerClassName: 'super-app-theme--header',width:150 },
        { field: 'semester', headerName: 'Semester', headerClassName: 'super-app-theme--header',width:150},
      ];

      const customLocaleText = {
        noRowsLabel: 'You have Not yet Applied any Courses', // Change this to your desired text
      };
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5001/api/ce/oc/completedCourses?student_id=${student}`);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData); // Update state with fetched data
            if(jsonData.length>=3){
              sendReminderEmail();
            }
          } catch (error) {
            console.log("Error while fetching data");
          }
        };

        fetchData();

      }, []); 

      useEffect(()=> {
        const fetchExp = async () => {
          try{
            const resp = await fetch(`http://localhost:5001/api/ce/oc/oneCreditExp?student_id=${student}`);
            if(!resp.ok){
              throw new Error('Falied to fetch data');
            }
            const Data = await resp.json();
            setExpData(Data);
            if(Data.length!=0){
              setApplied(true);
            }
            setC1(Data[0].course_id_1_name);
            setC2(Data[0].course_id_2_name);
            setC3(Data[0].course_id_3_name);
            if(Data[0].approval_status===0){
              setStatus("Initiated");
              setCls(0);
            }else if(Data[0].approval_status===1){
              setStatus("Approved");
              setCls(1);
            }
            else{
              setStatus("Rejected");
              setCls(-1);
              setRejection(true)
              setRemark(Data[0].remarks);
            }
          } catch (error){
            console.log("Error");
          }
        }
        fetchExp();
      },[]);



      const sendReminderEmail = async () => {
        try {
          const response = await fetch('http://localhost:5001/api/ce/oc/sendReminderEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ studentEmail: email, studentId: student }) // Send student ID and email
          });
          if (!response.ok) {
            throw new Error('Failed to send reminder email');
          }
          else{
          const responseData = await response.json();
          console.log(responseData.message); // Log the response message
          }
        } catch (error) {
          console.error('Error sending reminder email:', error);
        }
      };

    const handleApply = async () => {
      try {
      const response = await fetch('http://localhost:5001/api/ce/oc/StoringExcemption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: student, selectedCourses: selectedCourses }),
      });
      if (!response.ok) {
        throw new Error('Failed to apply course exception');
        setShowModal(false)
        setResModal(true);
        setError(1)
        setResponseMessage("Failed to apply course exception")
      }
      else{
      setShowModal(false)
      setResModal(true);
      setResponseMessage("Course exception applied successfully")
      console.log('Course exception applied successfully');
      }
    } catch (error) {
      console.error('Error applying course exception:', error);
      setError(1)
      setResponseMessage("Failed to apply course exception")
    }
  };

  const oneCreditClearance = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/ce/oc/clearance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId: student }) // Send student ID and email
      });
      if (!response.ok) {
        throw new Error('Failed to send reminder email');
        setExpModal(false)
        setResModal(true);
        setResponseMessage("Failed to Clear the courses")
      }
      else{
      const responseData = await response.json();
      setExpModal(false)
      setResModal(true);
      setResponseMessage("successfully Cleared the courses")
      }
    } catch (error) {
      console.error('Error sending reminder email:', error);
      setExpModal(false)
    }
  };

    
      const namelist = data.map(name => ({
        value:name.course_code,
        label:name.course_name
      }))

      const handleSelectChange = (selectedOptions) => {
        const selectedLabels = selectedOptions.map(option => option.value);
        setSelectedCourses(selectedLabels);
      };

      const isOptionDisabled = (option) => {
        return selectedCourses.length >= 3 && !selectedCourses.find(course => course.value === option.value);
      };

      const handleResModalClose = () => {
        setResModal(false);
        navigate("/courseExcp")
      }

      const validateButton = () => {
        if(selectedCourses.length==3){
          return true;
        }
        else{
          return false;
        }
      }

  return (
    <div className='creditHomeMain' >
        <div className='titleBtn' >
        <div className="titlehm">
            <h4>Completed Courses</h4>
        </div>
        <div className='createDiv' >
            {applied?<button className='CourseBtnActive' onClick={() => setExpModal(true)}>View Applied Excemption</button>:
            <button className={data.length>=3?"CourseBtnActive":"CourseBtn"} onClick={() => setShowModal(true)} disabled={data.length>=3?false:true} >Course Exception</button>}
        </div>
        </div>
        <div className='hometable' >
        <div className="tableMain">
          <div className="datagrid">
            <DataGrid
              autoHeight
              rows={data}
              columns={columns}
              localeText={customLocaleText}
              sx={{
                width: "80%", // Set width to 80%
                overflowX: "auto",
                display:"flex",
                justifyContent:"space-between",
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
        </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={style}>
          <div>
            <div className="onecreditSelection">
              <div className="inp">Select Courses</div>
              <div>
                <Select
                  className="textField"
                  isMulti
                  options={namelist}
                  isSearchable
                  placeholder=""
                  onChange={handleSelectChange}
                  isOptionDisabled={isOptionDisabled} // Disable options when max selections reached
                />
              </div>
              {console.log(selectedCourses)}
            </div>
            <div className='modalbtns'>
              <div><button className='btncancel' onClick={()=> setShowModal(false)} >Cancel</button></div>
              {validateButton()?
              <div><button className='btnapply' onClick={handleApply} >Apply</button></div> : <div><button  className='CourseBtn' disabled={true}>Apply</button></div>}
            </div>
          </div>
        </Box>
      </Modal>
      <Modal open={expModal} onClose={() => setExpModal(false)}>
        <Box sx={style1}>
              <div>
              <div className='tit'>
                Courses Applied
              </div>
              <div className='expBlock'>
                <div className='courseExp'><div>Course 1 : </div> <div>{c1}</div></div>
                <div className='courseExp'><div>Course 2 : </div> <div>{c2}</div></div>
                <div className='courseExp'><div>Course 3 : </div> <div>{c3}</div></div>
                <div className='btn'><button className={cls===1?"btnApprove":cls===-1?"btnRemove":"btnInitiated"}>{status}</button><div className='remar'>{rejection?<div>{remark}</div>:null}</div></div>
              </div>
              <div>
                {rejection?<button className="btnApprove" onClick={oneCreditClearance} >Clear and Apply Again</button>:null}
              </div>
              </div>
        </Box>
      </Modal>
      <Modal open={resModal} onClose={handleResModalClose}>
      <Box sx={style2} className='success'>
          <div>
            {responseMessage}
          </div>
          <div className='tick'>
            {error?<AnnouncementIcon/>:<CheckCircleIcon/>}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default CreditHome