import React, { useState , useEffect } from 'react'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import pdf from '../../../assets/courseExceptionPdf/Online.pdf'
import axios from 'axios';
import InputBox from '../../../components/InputBox/inputbox';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Select from 'react-select'
import "../styles/nptel.css"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Navigate, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 290,
  bgcolor: 'background.paper',
  borderRadius:'10px',
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

const OnlineForm = () => {
    const navigate = useNavigate()
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [course,setCourse] = useState('')
    const [courseStatus,setCourseStatus] = useState(null);
    const [selectedSem,setSelectedSem] = useState('')
    const [student,setStudent] = useState(1);
    const [registerNumber,setRegisterNumber] = useState("");
    const [error,setError] = useState(false)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [examDate,setExamDate] = useState(null);
    const [fmtStartDate,setFmtStartDate] = useState(null);
    const [fmtEndDate,setFmtEndDate] = useState(null);
    const [fmtExamDate,setFmtExamDate] = useState(null);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [opinion,setOpinion] = useState(null);
    const [creditOpen,setCreditOpen] = useState(null);
    const [selectedCredits,setSelectedCredits] = useState(null)
    const [openings,setOpenings] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [users, setUsers] = useState([])
    const [courseType,setCourseType] = useState([])
    const [courseNames, setCourseNames] = useState([]);
    const [weekData,setWeekData] = useState([])
    const [names,setNames] = useState([]);
    const [lab,setLab] = useState(null);
    const [year,setYear] = useState(null);
    const [crname,setCrname] = useState(null);
    const [certificateUrlExp,setCertificateUrlExp] = useState("");
    const [certificateUrlRp,setCertificateUrlRp] = useState("");
    const [validWeek,setValidWeek] = useState(null);
    const [validCredit,setValidCredit] = useState(null);
    const [validSemester,setValidSemester] = useState(null);
    const [excemption,setExcemption] = useState("");
    const [branch,setBranch] = useState(1);
    const [type,setType] = useState(0);
    const [selectedPdfExp,setSelectedPdfExp] = useState(null)
    const [selectedPdfRp,setSelectedPdfRp] = useState(null)
    const [reportPdf,setReportPdf] = useState(null);
    const [weekList,setWeekList] = useState([]);
    const [creditList,setCreditList] = useState([]);
    const [marks,setMarks] = useState(null);
    const [reasonOpen,setReasonOpen] = useState(false);
    const [dataRespModal,setDataRespModal] = useState(false);
    const [isSuccess,setIsSuccess] = useState(null);
    const [responseMessage,setResponseMessage] = useState("");
    const [approvalStatusFromDb,setApprovalStatusFromDb] = useState([]);
    const [approvedStatus,setApprovedStatus] = useState(false);
    const [pendingStatus,setPendingStatus] = useState(false)
    const [restrictModal,setRestrictModal] = useState(false);

    // Function to fetch users from the API
    const fetchUsers = async () => {
      try {
        const type = await axios.get('http://localhost:5001/api/ce/oc/platform');
        const valid = await axios.get('http://localhost:5001/api/ce/oc/courseExpValidation');
        const decision_status = await axios.get(`http://localhost:5001/api/ce/oc/OnlineApprovedStatus?student=${student}`)
        setCourseType(type.data);
        setApprovalStatusFromDb(decision_status.data);
        // setNames(names_api.data);
        const {week,credit,semester} = valid.data[0];
        setValidWeek(week);
        setValidCredit(credit);
        setValidSemester(semester);
      } catch (error) { 
        // If an error occurs, log the error
        console.error('Error fetching users:', error);
      }
    };

    //Loading the PDF from the utils folder
    useEffect(() => {
      const loadPdf = async () => {
        const response = await fetch(pdf);
        const pdfBlob = await response.blob();
        setReportPdf(pdfBlob);
      };
      loadPdf();
      fetchUsers();
    }, []);

    //function to trigger the pdf download
    const modifyPdf = async () => {
      if (!reportPdf) {
        alert('Failed to load PDF');
        return;
      }
      const existingPdfBytes = await reportPdf.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const timesNewRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
  
      firstPage.drawText("B.TECH IT", { x: 190, y: 440, size: 12, font: timesNewRomanFont });
      firstPage.drawText(course, { x: 190, y: 414, size: 12, font: timesNewRomanFont });
      firstPage.drawText("14/02/2024", { x: 720, y: 455, size: 12, font: timesNewRomanFont });
      firstPage.drawText("7376222IT137", { x: 35, y: 280, size: 12, font: timesNewRomanFont });
      firstPage.drawText("Gautham S", { x: 125, y: 280, size: 12, font: timesNewRomanFont });
      firstPage.drawText("Frontend Developer", { x: 300, y: 280, size: 12, font: timesNewRomanFont });
  
      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'modified_pdf.pdf';
      a.click();
      URL.revokeObjectURL(url);
    };

    // Function to handle week selection
    const handleWeek = (selectedOption) => {
      setSelectedWeek(selectedOption.value);
    };
    // Function to handle Course Selection 
    const handleCourse = async (course) => {
      if (course) {
        const selectedCourse = course.value;
        console.log(selectedCourse);
        console.log(approvalStatusFromDb);
        try {
          const response = await axios.get(`http://localhost:5001/api/ce/oc/platform/excemption?id=${selectedCourse}`);
          const resp = await axios.get(`http://localhost:5001/api/ce/oc/courselist?platform=${selectedCourse}&branch=${branch}&student=${student}`)
          const res = response.data[0].excemption;
          setExcemption(res);
          setNames(resp.data)
          if(res === "1"){
            setCreditOpen(true);
            setCourse(course.label);
            setCourseStatus(course.value);
        }
        else {
          setCourse(course.label);
          setCreditOpen(false);
          setCourseStatus(course.value)
        }
        } catch (error) {
          console.error('Error fetching course names:', error);
        }

      } else {
        // Handle case where selectedOption is null (e.g., clearing selection)
        setCourse('');
      }
    };
    

  // function to handle semester Selection
  const handleSem = (selectedOption) => {
    setSelectedSem(selectedOption.value);
  }

  // Function to handle Start Date
  const handleStartDateChange = (date) => {
    if (endDate && date && date > endDate) {
        // If start date is after end date, show error message
        alert("Start date cannot be after the end date. Please select a valid start date.");
        setStartDate(null); // Reset start date
      }
    else{
    setStartDate(date);
    if (endDate && date) {
      const diffTime = Math.abs(endDate - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumberOfDays(diffDays);
    }
    if (date && typeof date === 'object' && date.$isDayjsObject) {
        const nativeDate = date.toDate();
        const formatdate = formatDate(nativeDate);
        console.log(formatdate);
        setFmtStartDate(formatdate)
    }
    }
  }

  // Function to handle End Date
  const handleEndDateChange = (date) => {
    if (startDate && date && date < startDate) {
      // If end date is before start date, show error message
      alert("End date cannot be before the start date. Please select a valid end date.");
      setEndDate(null); // Reset end date
    } else {
      // If end date is valid, update the state and calculate the number of days
      setEndDate(date);
      if (startDate && date) {
        const diffTime = Math.abs(date - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNumberOfDays(diffDays);
      }
      if (date && typeof date === 'object' && date.$isDayjsObject) {
        // Extract the native Date object from the Day.js object
        const nativeDate = date.toDate();
        const formatdate = formatDate(nativeDate);
        console.log(formatdate);
        setFmtEndDate(formatdate)
      }      
    }
  };

  const handleExamDate = (date) => {
    // Check if start date is selected
    if (!startDate) {
        alert("Please select the start date first.");
        return; // Exit the function if start date is not selected
    }

    // Check if exam date is before start date
    if (date && date.isBefore(startDate, 'day')) {
        // If exam date is before start date, show error message
        alert("Exam date cannot be before the start date. Please select a valid exam date.");
        setExamDate(null); // Reset exam date
    } else {
        // Set the exam date
        setExamDate(date);

        // Format the exam date if it's a Day.js object
        if (date && typeof date === 'object' && date.$isDayjsObject) {
            const nativeDate = date.toDate();
            const formatdate = formatDate(nativeDate);
            setFmtExamDate(formatdate);
        }
    }
}


  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  // Function to handle selected opinion for Course Exception
  const handleOpinion = (selectedOption) => {
    setOpinion(selectedOption.value);
    if (selectedOption.value === 1) {
      setOpenings(true);
    } else {
      setOpenings(false);
    }
  };

  // Function to handle Credits
  const handleCredits = (selectedOption) => {
    setSelectedCredits(selectedOption.value);
  };

  // Function for exception validation
  const handleValidation = () => {
    console.log("function called");
    // if((excemption && selectedCredits && selectedSem && selectedWeek)&&(excemption !="1" && ( selectedCredits < validCredit ) && (selectedSem < validSemester) && (selectedWeek < validWeek))){
    //   setGiveAlert(true);
    // }
    if(excemption==="1" && ( selectedCredits >= validCredit ) && (selectedSem >= validSemester) && (selectedWeek >= validWeek) && (!(restrictingUser()))){
      return true;
    }
    else{
      return false;
    }
  }

  const alertingUser = () => {
    if((excemption && selectedCredits && selectedSem && selectedWeek)&&(excemption !="1" || ( selectedCredits < validCredit ) || (selectedSem < validSemester) || (selectedWeek < validWeek))){
      return true;
    }
    else{
      return false;
    }
  }

  const restrictingUser = () => {
    if((excemption && selectedCredits && selectedSem && selectedWeek)){
      const len = approvalStatusFromDb.length;
      // if(len==0){
      //   return false;
      // }
      // else if(len==2){
      //   if((approvalStatusFromDb[0].approval_status==1)&&(approvalStatusFromDb[1].approval_status==1)){
      //     return true;
      //   }
      //   else{
      //     return false;
      //   }
      // }
      // else if(len>2){
      //   return true;
      // }
      if(len<2){
        return false;
      }
      else{
        return true;
      }
    }
  }

  // Function for setting loaded PDF
  const handleFileChangeExp = (event) => {
    setSelectedPdfExp(event.target.files[0]);
  }

  const handleFileChangeRp = (event) => {
    setSelectedPdfRp(event.target.files[0]);
  }

  const handleStudent = (selectedOption) => {
    // Extract the value from the selected option
    const selectedStudent = selectedOption ? selectedOption.value : null;
    // Set the selected student in the state
    setStudent(selectedStudent);
    console.log(validCredit);

  };

  const handleCourseName = (crname) => {
    setCrname(crname.value);
    const selectedCourse = names.find(course => course.id === crname.value);
    const duration_info = [
      { value: selectedCourse.duration,
        label: `${selectedCourse.duration} Weeks` },
    ]
    const credit_info = [
      {
        value: selectedCourse.credit,
        label: `${selectedCourse.credit} Credits`
      }
    ]
    setWeekList(duration_info);
    setCreditList(credit_info);
    setSelectedWeek(duration_info[0].value);
    setSelectedCredits(credit_info[0].value);
    console.log(duration_info[0].value, credit_info[0].value);
  }

  const handleMarksChange = (e) => {
    const input = e.target.value;
    if (!input || /^\d+$/.test(input)) {
      setMarks(input);
    }
    console.log(marks);
  };

  const handleLab = (lab) => {
    setLab(lab.value)
    console.log(certificateUrl);
  }

  const handleCerfUrlExp = (event) =>{
    setCertificateUrlExp(event.target.value)
    console.log(event.target.value);
    console.log(marks);
  }

  const handleCerfUrlRp = (event) =>{
    setCertificateUrlRp(event.target.value)
    console.log(event.target.value);
  }

  const handleYear = (year) => {
    setYear(year.value);
    console.log(registerNumber);
  }

  const handleRegisterNumber = (registerNumber) => {
    setRegisterNumber(registerNumber.value)
    console.log(student);
  }

  const sendDataToBackendRp = async () => {
    try {
      if(!student||!crname||!selectedSem||!fmtStartDate||!fmtEndDate||!fmtExamDate||!marks||!certificateUrlRp||!selectedPdfRp){
        alert("Fill out all the Fields");
      }
      else{
        const formData = new FormData();
        const type = 0;
        const approval_status=0;
        const mentor_code = "22IT137";
        formData.append('course', crname);
        formData.append('student', student);
        formData.append('type', type);
        formData.append('semester', selectedSem);
        formData.append('start_date', fmtStartDate);
        formData.append('end_date', fmtEndDate);
        formData.append('exam_date', fmtExamDate);
        formData.append('mark', marks);
        formData.append('certificate_url', certificateUrlRp);
        formData.append('certificateFile', selectedPdfRp);
        formData.append('approval_status', approval_status);
        formData.append('mentor_code', mentor_code);

        console.log(formData);
  
        const response = await axios.post('http://localhost:5001/api/ce/oc/onlineApply/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
  
        console.log('Response:', response.data);
        if (response.status === 200) {
          console.log('Data successfully sent to the backend');
          setDataRespModal(true);
          setIsSuccess(true);
          setResponseMessage("Online Course Applied Successfully");
        }
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error);
      setDataRespModal(true);
      setIsSuccess(false);
      setResponseMessage("Error While Applying the online course..Retry it!")
    }
  }

  const sendDataToBackendExp = async () => {
    try {
      if(!student||!crname||!selectedSem||!fmtStartDate||!fmtEndDate||!fmtExamDate||!marks||!certificateUrlExp||!selectedPdfExp){
        alert("Fill out all the Fields");
      }
      else{
        const formData = new FormData();
        const type = 1;
        const approval_status=0;
        const mentor_code = "22IT137";
        formData.append('course', crname);
        formData.append('student', student);
        formData.append('type', type);
        formData.append('semester', selectedSem);
        formData.append('start_date', fmtStartDate);
        formData.append('end_date', fmtEndDate);
        formData.append('exam_date', fmtExamDate);
        formData.append('mark', marks);
        formData.append('certificate_url', certificateUrlExp);
        formData.append('certificateFile', selectedPdfExp);
        formData.append('approval_status', approval_status);
        formData.append('mentor_code', mentor_code);

        console.log(formData);
  
        const response = await axios.post('http://localhost:5001/api/ce/oc/onlineApply/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
  
        console.log('Response:', response.data);
        if (response.status === 200) {
          console.log('Data successfully sent to the backend');
          setDataRespModal(true);
          setIsSuccess(true);
          setResponseMessage("Online Course Applied Successfully");
          modifyPdf();
        }
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error);
      setDataRespModal(true);
      setIsSuccess(false);
      setResponseMessage("Error While Applying the online course..Retry it!")
    }

  }

  const handleInputKeyDown = (event) => {
    // Allow only numeric keys and certain special keys
    if (
      !(
        // Allow numeric keys
        (event.keyCode >= 48 && event.keyCode <= 57) || // 0-9 (top row)
        (event.keyCode >= 96 && event.keyCode <= 105) || // 0-9 (numpad)
        // Allow special keys: backspace, delete, arrow keys, tab, home, end
        [8, 46, 37, 39, 9, 36, 35].includes(event.keyCode)
      )
    ) {
      // Prevent the default action for non-numeric keys
      event.preventDefault();
    }
  };

  const handleRespModalClose = () => {
    setDataRespModal(false);
    {isSuccess? navigate('/courseExcp'): navigate('/Online Course')}
  }

  const handleRestrict = () => {
    if((approvalStatusFromDb[0].approval_status==1)&&(approvalStatusFromDb[0].approval_status==1)){
      setApprovedStatus(true);
    }
    else{
      setApprovedStatus(false);
    }
    setRestrictModal(true);
  }



  // useEffect(() => {
  //   console.log(marks);
  // }, [marks]);

  // Functions for mapping the data from api to the select component
  const selectOptions = users.map(user => ({
    value: user.name,
    label: user.name,
  }));

  const rollnumber = names.map(nm=>({
    value : nm.class,
    label : nm.class,
  }))

  const years = names.map(user=>({
    value : user.year + " year",
    label : user.year + " year",
  }))

  const labList = names.map(yr =>({
    value : yr.lab,
    label : yr.lab,
  }))

  const CourseList = courseType.map(types => ({
    value : types.id,
    label : types.name,
  }))

  const CourseNameList = names.map(name =>({
    value : name.id,
    label : name.name,
  }))

  // const weekList = names.map(week => ({
  //   value : week.duration,
  //   label : week.duration,
  // }))

  // const CreditsList = names.map(cr => ({
  //   value : cr.credit,
  //   label : cr.credit,
  // }))

  const nameList = names.map(nm => ({
    value : nm.name,
    label : nm.name,
  }))

  
  return (
    <div className="frm">
      <div>
        <div className="nptelTextFields">
          <div>
            <div className="titdefault">
              <h4>Default Details</h4>
            </div>
            <div className="Default">
              <div className="dfinside">
                <div className="quesField">
                  <div className="inp">Student</div>
                  <div>
                    <Select
                      className="textField"
                      options={[{ value: 1, label: "Gautham" }]}
                      onChange={handleStudent}
                      isSearchable
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: error && !student ? "red" : "#cccdce",
                        }),
                      }}
                      placeholder=""
                    ></Select>
                    {error && !student && (
                      <div className="errorText">Student is mandatory</div>
                    )}
                  </div>
                </div>
                <div className="quesField">
                  <div className="inp">Register Number</div>
                  <div>
                    <Select
                      className="textField"
                      options={rollnumber}
                      onChange={handleRegisterNumber}
                      isSearchable
                      placeholder=""
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor:
                            error && !registerNumber ? "red" : "#cccdce",
                        }),
                      }}
                    ></Select>
                    {error && !registerNumber && (
                      <div className="errorText">
                        Please Enter Your Register Number
                      </div>
                    )}
                  </div>
                </div>
                <div className="quesField">
                  <div className="inp">Year Of Study</div>
                  <div>
                    <Select
                      className="textField"
                      options={years}
                      onChange={handleYear}
                      isSearchable
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: error && !year ? "red" : "#cccdce",
                        }),
                      }}
                      placeholder=""
                    ></Select>
                  </div>
                </div>
                <div className="quesField">
                  <div className="inp">Special Lab</div>
                  <div>
                    <Select
                      className="textField"
                      options={labList}
                      onChange={handleLab}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: error && !lab ? "red" : "#cccdce",
                        }),
                      }}
                      isSearchable
                      placeholder=""
                    ></Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="titdefault">
              <h4>Course Details</h4>
            </div>
            <div className="Default">
              <div className="dfinside">
                <div className="quesField">
                  <div className="inp">Course Platform</div>
                  <div>
                    <Select
                      onChange={handleCourse}
                      placeholder=""
                      isSearchable
                      className="textField"
                      options={CourseList}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: error && !course ? "red" : "#cccdce",
                        }),
                      }}
                    />
                    {error && !course && (
                      <div className="errorText">Select course type</div>
                    )}
                    {/* {course && <div> Course : {course} </div>} */}
                  </div>
                </div>
                <div className="quesField">
                  <div className="inp">Name of the Course</div>
                  <div>
                    <Select
                      onChange={handleCourseName}
                      isSearchable
                      className="textField"
                      options={CourseNameList}
                      placeholder=""
                    />
                  </div>
                </div>
                {creditOpen ? (
                  <>
                    <div className="quesField">
                      <div className="inp">Duration in Weeks</div>
                      <div>
                        <Select
                          onChange={handleWeek}
                          className="textField"
                          options={weekList}
                          placeholder=""
                          isSearchable={false}
                          value={
                            weekList.length > 0
                              ? {
                                  value: weekList[0].value,
                                  label: weekList[0].label,
                                }
                              : null
                          }
                        />
                        {/* {selectedWeek && <div> Weeks : {selectedWeek} </div>} */}
                      </div>
                    </div>
                    <div className="quesField">
                      <div className="inp">No.of.Credits</div>
                      <div>
                        <Select
                          onChange={handleCredits}
                          className="textField"
                          options={creditList}
                          isSearchable={false}
                          placeholder=""
                          value={
                            creditList.length > 0
                              ? {
                                  value: creditList[0].value,
                                  label: creditList[0].label,
                                }
                              : null
                          }
                        />
                        {/* {selectedCredits && <div> Credits : {selectedCredits} </div>} */}
                      </div>
                    </div>{" "}
                  </>
                ) : null}
                <div className="quesField">
                  <div className="inp">Semester</div>
                  <div>
                    <Select
                      value={{
                        value: selectedSem,
                        label: selectedSem ? `Semester ${selectedSem}` : "",
                      }}
                      onChange={handleSem}
                      className="textField"
                      options={[
                        { value: 1, label: "I" },
                        { value: 2, label: "II" },
                        { value: 3, label: "III" },
                        { value: 4, label: "IV" },
                        { value: 5, label: "V" },
                        { value: 6, label: "VI" },
                        { value: 7, label: "VII" },
                        { value: 8, label: "VIII" },
                      ]}
                      isSearchable={false}
                      placeholder=""
                    />
                    {/* {selectedSem && <div> Semester : {selectedSem} </div>} */}
                  </div>
                </div>
                <div className="quesField">
                  <div className="inp">Start Date</div>
                  <div>
                    <DatePicker
                      className="textField"
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                  </div>
                </div>
                <div className="quesField">
                  <div className="inp">End Date</div>
                  <div>
                    <DatePicker
                      className="textField"
                      value={endDate}
                      onChange={handleEndDateChange}
                    />
                    {/* {startDate && endDate && (
                    <p>Number of days between selected dates: {numberOfDays}</p>
                  )} */}
                  </div>
                </div>
                <div className="quesField">
                  <div className="inp">Exam Date</div>
                  <div>
                    <DatePicker
                      className="textField"
                      value={examDate}
                      onChange={handleExamDate}
                    />
                  </div>
                </div>
                <div className="quesField">
                  <div className="inp">Marks in Certificate</div>
                  <div>
                    <InputBox
                      type="number"
                      className="inputField"
                      value={marks}
                      onKeyDown={handleInputKeyDown}
                      onchange={handleMarksChange}
                    />
                  </div>
                </div>
                {handleValidation() ? (
                  <div className="quesField">
                    <div className="inp">Do You Want Course Exception</div>
                    <div>
                      <Select
                        value={{
                          value: opinion,
                          label:
                            opinion === 1 ? "Yes" : opinion === 0 ? "No" : "",
                        }}
                        onChange={handleOpinion}
                        className="textField"
                        options={[
                          { value: "", label: "" },
                          { value: 1, label: "Yes" },
                          { value: 0, label: "No" },
                        ]}
                        placeholder=""
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              {/* {openings && handleValidation() ? ( setType(1) ) : ( setType(0) )} */}
            </div>
            {openings && handleValidation() ? (
              <div>
                <div className="titdefault">
                  <h4>Apply For Course Exception</h4>
                </div>
                <div className="Default">
                  <div className="dfinside">
                    <div className="exp">
                      <div className="quesField">
                        <div className="inp">Certificate URL</div>
                        <InputBox
                          type="text"
                          className="inputField"
                          value={certificateUrlExp}
                          onchange={handleCerfUrlExp}
                        />
                      </div>
                      <div className="quesDoc">
                        <div>Upload Certificate </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label
                            htmlFor="pdf-upload"
                            className="pdf-upload-button"
                          >
                            Upload PDF
                            <input
                              id="pdf-upload"
                              type="file"
                              accept=".pdf"
                              onChange={handleFileChangeExp}
                              style={{ display: "none" }}
                            />
                          </label>
                          <div style={{ margin: "5px" }}>
                            {" "}
                            {selectedFile && (
                              <p>Selected file: {selectedFile.name}</p>
                            )}{" "}
                          </div>
                        </div>
                      </div>
                      {/* <div className="quesField">
                    <div className="inp">IQAC Verification</div>
                    <div>
                    <InputBox/>
                    </div>
                  </div> */}
                      <div className="EXPsubmits">
                        <button className="expCancelBtn" onClick={()=>navigate('/Online Course')} >Cancel</button>
                        <button className="expCreateBtn" onClick={sendDataToBackendExp}>
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="titdefault">
                  <h4>Apply For Rewards</h4>
                  {/* <div> { alertingUser() && <div>You are not eligible for Course Excemption <button className='ReasonBtn' onClick={() => setReasonOpen(true)} >View Reason</button> </div>}</div> */}
                  <div>{restrictingUser() ? <div>You are Restricted to apply Course Exception <button className='ReasonBtn' onClick={handleRestrict} >View Reason</button> </div> : alertingUser() ? <div>You are not eligible for Course Excemption <button className='ReasonBtn' onClick={() => setReasonOpen(true)} >View Reason</button> </div>: null} </div>
                </div>
                <div className="Default">
                  <div className="dfinside">
                    <div className="rp">
                      <div className="quesField">
                        <div className="inp">Certificate URL</div>
                        <div>
                          <InputBox
                            type="text"
                            className="textField"
                            value={certificateUrlRp}
                            onchange={handleCerfUrlRp}
                          />
                        </div>
                      </div>
                      <div
                        className={handleValidation() ? "quesDoc" : "quesDocRp"}
                      >
                        <div>Upload Certificate </div>
                        <div className='Rp-btn-and-selected-file'>
                          <label
                            htmlFor="pdf-upload"
                            className="pdf-upload-button"
                          >
                            Upload PDF
                            <input
                              id="pdf-upload"
                              type="file"
                              accept=".pdf"
                              onChange={handleFileChangeRp}
                              style={{ display: "none" }}
                            />
                          </label>
                          <div style={{ margin: "5px", marginRight: "50px" }}>
                            {" "}
                            {selectedPdfRp && (
                              <p className='selectedFileName'>{selectedPdfRp.name}</p>
                            )}{" "}
                          </div>
                        </div>
                      </div>
                      <div className="RPsubmits">
                        <button className="expCancelBtn">Cancel</button>
                        <button
                          className="expCreateBtn"
                          onClick={sendDataToBackendRp}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal open={reasonOpen} onClose={() => setReasonOpen(false)}>
        <Box sx={style}>
          <div className='reasonModal'>
          <div style={{fontWeight:"bold",marginBottom:"5px"}}>
            Reason :
          </div>
          <div>
          {(selectedCredits < validCredit)&& <div style={{display:"flex",flexDirection:"row",gap:"5px"}}><div style={{marginTop:"8px"}}><AnnouncementIcon/></div><div  style={{marginTop:"5px"}}>You are not Having Sufficient Credits</div></div>}
          {(selectedSem < validSemester)&& <div style={{display:"flex",flexDirection:"row",gap:"5px"}}><div style={{marginTop:"8px"}}><AnnouncementIcon/></div><div  style={{marginTop:"5px"}}>You are not above semester 4</div></div>}
          {(selectedWeek < validWeek)&&<div style={{display:"flex",flexDirection:"row",gap:"5px"}}><div style={{marginTop:"8px"}}><AnnouncementIcon/></div><div  style={{marginTop:"5px"}}>Your Course is not a 12 week course</div></div>}
          </div>
          </div>
        </Box>
      </Modal>
      <Modal open={dataRespModal} onClose={handleRespModalClose}>
      <Box sx={style1} className='success'>
          <div>
            {responseMessage}
          </div>
          <div className='tick'>
            {isSuccess?<CheckCircleIcon/>:<AnnouncementIcon/>}
          </div>
        </Box>
      </Modal>
      <Modal open={restrictModal} onClose={() => setRestrictModal(false)}>
        <Box sx={style}>
          <div>
            {approvedStatus ? <div className='success'><CheckCircleIcon/>You have Already completed the 2 Course Excemption</div>:<div><div className='restrictReason'>until completion of your approval status you cannot able to apply again for excemption...<AnnouncementIcon/></div><div><button className="btnApprove" onClick={()=> navigate("/Online Course")} >View Status</button></div></div>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default OnlineForm