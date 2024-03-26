import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Modal from '@mui/material/Modal';
import '../styles/Facultymodal.css'
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    p: 4,
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

const FacultyModal = ({rowData, open, handleClose}) => {
    const [remarkModalOpen, setRemarkModalOpen] = useState(false);
    const [remarkResponse,setRemarkResponse] = useState(false)
    const [remark, setRemark] = useState('');
    const [responseModalOpen, setResponseModalOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [remarkResponseMsg,setRemarkResponseMsg] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false);

    const handleApprove = () => {
      axios.post('http://localhost:5000/approveStudent', { id: rowData.id })
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

    const handleReject = () => {
        setRemarkModalOpen(true);
      };
    
    const handleRemarkClose = () => {
        setRemarkModalOpen(false);
      };
    
      const handleResponseModalClose = () => {
        setResponseModalOpen(false);
      };

      const setRemarkResponseClose = () => {
        setRemarkResponse(false)
        setRemarkModalOpen(false);
      }
    
    const handleRemarkChange = (event) => {
        setRemark(event.target.value);
      };

      const handleRemarkSubmit = () => {
        axios.post('http://localhost:5000/submitRemark', { id: rowData.id, remark })
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
    
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Student Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Student: {rowData.student} <br />
            Register Number: {rowData.register_number} <br />
            Year: {rowData.year} <br />
            Course Type: {rowData.course_type} <br />
            Course Name: {rowData.name_of_course} <br />
            Semester: {rowData.semester} <br />
            Start Date: {rowData.start_date} <br />
            End Date: {rowData.end_date} <br />
            Certificate URL: {rowData.certificate_url} <br />
          </Typography> */}
          <div>
          <div className='modal' >
            <div className='field' >
                <div style={{width:"150px"}} >Student</div>
                <div>{rowData.student}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Register Number</div>
                <div>{rowData.register_number}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Year</div>
                <div>{rowData.year}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Course Type</div>
                <div>{rowData.course_type}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Course Name</div>
                <div>{rowData.name_of_course}</div>
            </div>
            <div className='field'>
                <div style={{width:"150px"}}>Semester</div>
                <div>{rowData.semester}</div>
            </div>
            <div className='fieldbtn'>
                <div><button className='btnApprove'  onClick={handleApprove}>Approve </button></div>
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
        aria-labelledby="remark-modal-title"
        aria-describedby="remark-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className='rm' >Remarks</div>
            <textarea
              id="remark-modal-description"
              value={remark}
              className='remarkArea'
              onChange={handleRemarkChange}
              rows={3}
              cols={40}
              placeholder="Enter your remark here..."
            ></textarea>
            <button className='btnApprove' onClick={handleRemarkSubmit}>Submit Remark</button>
          </div>
        </Box>
      </Modal>
      {/* Response Modal */}
      <Modal
        open={responseModalOpen}
        onClose={handleResponseModalClose}
        aria-labelledby="response-modal-title"
        aria-describedby="response-modal-description"
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
    </div>
  )
}

export default FacultyModal