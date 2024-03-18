import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ rowData, open, handleClose }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
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
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
