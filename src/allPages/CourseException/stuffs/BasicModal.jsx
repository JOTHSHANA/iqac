import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import '../styles/Facultymodal.css'
import { useEffect, useState } from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%', // Adjusted width for larger screens
  maxWidth: '390px', // Maximum width for smaller screens
  bgcolor: 'background.paper',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  borderRadius:'10px',
  p: 4,
};

const BasicModal = ({ rowData, open, handleClose, faculty }) => {
  const [status,setStatus] = useState("")
  const [appliedFor,setAppliedFor] = useState("")
  const [remOpen,setremOpen] = useState(false)
  const [certificatePath,setCertificatePath] = useState("");

  useEffect(() => {
    if(rowData.approval_status === 1){
      setStatus("Approved")
    }
    else if(rowData.approval_status === -1){
      setStatus("Rejected")
      setremOpen(true)
    }
    else{
      setStatus("Initiated")
    }

    if(rowData.type=="1"){
      setAppliedFor("Excemption");
    }
    else{
      setAppliedFor("Rewards")
    }
    setCertificatePath(rowData.certificate_path)
  }, []);

  const handleView = () => {
    const pdfURL = `http://localhost:5001/api/ce/oc/onlineApply/pdfs/${certificatePath}`;
    window.open(pdfURL, '_blank');
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
            Status: {rowData.status === 0 ? 'Initiated' : rowData.status === 1 ? 'Approved' : 'Rejected'} <br />
          </Typography> */}
          <div className='modal'>
          {faculty && <>
            <div className='field'>
                <div style={{width:"150px"}}>Student</div>
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
          </>}
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
                <div style={{width:"150px"}}>Applied For</div>
                <div>{appliedFor}</div>
          </div>
          <div className='field'>
                <div style={{width:"150px"}}>Certificate Url</div>
                <div>{rowData.certificate_url}</div>
          </div>
          <div className='field'>
                <div style={{width:"150px"}}>Certificate</div>
                <div className='pdficon' onClick={handleView} ><InsertDriveFileIcon/><div>View</div></div>
          </div>
          <div className='field'>
              <div style={{width:"150px"}}>Status</div>
              <div><button className={rowData.approval_status===1?"btnApprove":rowData.approval_status===-1?"btnRemove":"btnInitiated"}>{status}</button></div>
          </div>
          {remOpen &&
            <div className='field'>
              <div style={{width:"150px"}}>Remark</div>
              <div className='remar'>{rowData.remarks}</div>
            </div>
          }
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
