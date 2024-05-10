import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Modal from '@mui/material/Modal';
import '../styles/Facultymodal.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Margin } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%', // Adjusted width for larger screens
    maxWidth: '390px', // Maximum width for smaller screens
    bgcolor: 'background.paper',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    p: 4,
    borderRadius:'10px',
    
  };

  const style1 = {
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

  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    borderRadius:'10px',
    p: 4,
  }

  const style3 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%', // Adjusted width for larger screens
    maxWidth: '360px', // Maximum width for smaller screens
    bgcolor: 'background.paper',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    borderRadius:'10px',
    p: 4,
  };

const FacultyModal = ({rowData, open, handleClose, fetchData}) => {
    const navigate = useNavigate();
    const [remarkModalOpen, setRemarkModalOpen] = useState(false);
    const [remarkResponse,setRemarkResponse] = useState(false)
    const [remark, setRemark] = useState("");
    const [responseModalOpen, setResponseModalOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [remarkResponseMsg,setRemarkResponseMsg] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false);
    const [certificatePath,setCertificatePath] = useState("");
    const [confirmModal,setConfirmModal] = useState(false);
    const [mentorCode,setmentorCode] = useState("22IT137");
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
      setCertificatePath(rowData.certificate_path)
      setSelectedOption(rowData.type) 
    }, []);

    const handleApprove = () => {
      axios.post('http://localhost:5001/api/ce/oc/toApprove', { id: rowData.id, type: rowData.type ,student: rowData.student_id })
        .then(response => {
          console.log('Student approved successfully');
          setResponseMessage('Student approved successfully');
          setIsSuccess(true);
          setResponseModalOpen(true);
        })
        .catch(error => {
          console.error('Error approving student:', error.message);
          setResponseMessage('Error approving student: ' + error.message);
          setIsSuccess(false);
          setResponseModalOpen(true);
        });
    };

    const handleConfirmation = () => {
      setConfirmModal(true);
    }

    const handleReject = () => {
        setRemarkModalOpen(true);
      };
    
    const handleRemarkClose = () => {
        setRemarkModalOpen(false);
      };
    
      const handleResponseModalClose = () => {
        setResponseModalOpen(false);
        setConfirmModal(false);
        handleClose();
        fetchData(selectedOption,mentorCode); 
      };

      const setRemarkResponseClose = () => {
        setRemarkResponse(false)
        setRemarkModalOpen(false);
        handleClose();
        fetchData(selectedOption,mentorCode);
      }
    
    const handleRemarkChange = (event) => {
        setRemark(event.target.value);
      };

      const handleRemarkSubmit = () => {
        axios.post('http://localhost:5001/api/ce/oc/toReject', {remark, id: rowData.id })
          .then(response => {
            console.log('Remark submitted successfully');
            setRemarkResponseMsg("Remark Submitted SuccessFully")
            setIsSuccess(true);
            setRemarkResponse(true)
          })
          .catch(error => {
            console.error('Error submitting remark:', error.message);
            setRemarkResponseMsg("Failed to Update Remarks")
            setIsSuccess(false);
            setRemarkResponse(true)
          });
      };

      const handleView = () => {
        const pdfURL = `http://localhost:5001/api/ce/oc/onlineApply/pdfs/${certificatePath}`;
        window.open(pdfURL, '_blank');
      };
    
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          {/* <div className='cross'><div className='symbol' >X</div></div> */}
          <div>
          <div className='modal' >
            <div className='field' >
                <div style={{width:"150px"}} >Student</div>
                <div>{rowData.student_name}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Register Number</div>
                <div>{rowData.register_number}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Year</div>
                <div>{rowData.year===1?"1st Year":rowData.year===2?"2nd year":rowData.year===3?"3rd Year":"4th Year "}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Course Type</div>
                <div>{rowData.platform_name}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Course Name</div>
                <div>{rowData.course_name}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Semester</div>
                <div>{rowData.semester}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Start Date</div>
                <div>{rowData.start_date}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>End Date</div>
                <div>{rowData.end_date}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Exam Date</div>
                <div>{rowData.exam_date}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Certificate Url</div>
                <div>{rowData.certificate_url}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Certificate</div>
                <div className='pdficon' onClick={handleView} ><InsertDriveFileIcon/><div>View</div></div>
            </div>
            <div className='fieldbtn'>
                <div><button className='btnApprove'  onClick={handleConfirmation}>Approve</button></div>
                <div><button className='btnRemove' onClick={handleReject}>Reject</button></div>
            </div>
          </div>
          </div>
        </Box>
      </Modal>
      {/* Remark Modal */}
      <Modal
        open={remarkModalOpen}
        onClose={handleRemarkClose}
      >
        <Box sx={style3}>
          <div>
            <div className='rm' >Remarks</div>
            <textarea
              id="remark-modal-description"
              value={remark}
              className='remarkArea'
              onChange={handleRemarkChange}
              rows={3}
              cols={38}
              placeholder="Enter your remark here..."
            ></textarea>
            {remark===""?<button className='CourseBtn' disabled={true} >Submit Remark</button>:<button className='btnApprove' onClick={handleRemarkSubmit}>Submit Remark</button>}
          </div>
        </Box>
      </Modal>
      {/* Response Modal */}
      <Modal
        open={responseModalOpen}
        onClose={handleResponseModalClose}
        style={{ zIndex: 6000 }}
      >
        <Box sx={style1} className='success'>
          <div>
            {responseMessage}
          </div>
          <div className='tick'>
            {isSuccess?<CheckCircleIcon/>:<AnnouncementIcon/>}
          </div>
        </Box>
      </Modal>
      {/* Remark submit modal */}
      <Modal
        open={remarkResponse}
        onClose={setRemarkResponseClose}
        style={{ zIndex: 6000 }}
      >
        <Box sx={style1} className='success'>
        <div>
            {remarkResponseMsg}
        </div>
        <div className='tick'>
            {isSuccess?<CheckCircleIcon/>:<AnnouncementIcon/>}
        </div>
        </Box>
      </Modal>
      {/*Confirmation Modal */}
      <Modal
      open={confirmModal}
      onClose={()=>setConfirmModal(false)}
      >
        <Box sx={style2}>
          <div>
          <div>
            Are you Sure want to approve?
          </div>
          <div style={{display:"flex",gap:"20px",marginTop:"10px"}}>
            <div><button  className='conformBtnApprove'  onClick={handleApprove} >Yes</button></div>
            <div><button className='conformBtnRemove' onClick={()=> setConfirmModal(false)} >No</button></div>
          </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default FacultyModal