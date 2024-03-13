import React, { useState , useEffect } from 'react'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import pdf from '../../../assets/courseExceptionPdf/Online.pdf'
import axios from 'axios';
import InputBox from '../../../components/InputBox/inputbox';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Select from 'react-select'
import "../styles/nptel.css"
import TextField from '@mui/material/TextField';

const OnlineForm = () => {

    const [selectedWeek, setSelectedWeek] = useState("");
    const [course,setCourse] = useState('')
    const [courseStatus,setCourseStatus] = useState("");
    const [selectedSem,setSelectedSem] = useState('')
    const [student,setStudent] = useState(null);
    const [registerNumber,setRegisterNumber] = useState(null);
    const [error,setError] = useState(false)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [examDate,setExamDate] = useState(null);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [opinion,setOpinion] = useState(null);
    const [creditOpen,setCreditOpen] = useState(null);
    const [selectedCredits,setSelectedCredits] = useState(null)
    const [openings,setOpenings] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [users, setUsers] = useState([])
    const [courseType,setCourseType] = useState([])
    const [weekData,setWeekData] = useState([])
    const [names,setNames] = useState([]);
    const [lab,setLab] = useState(null);
    const [year,setYear] = useState(null);
    const [crname,setCrname] = useState(null);
    const [certificateUrl,setCertificateUrl] = useState(null);
    // Function to fetch users from the API
    const fetchUsers = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/users');
        const type = await axios.get('http://localhost:5000/type');
        const week = await axios.get('http://localhost:5000/week');
        const names_api = await axios.get('http://localhost:5000/api/users');

        // If request is successful, set the users state with the fetched data
        // setUsers(response.data);
        setCourseType(type.data);
        setWeekData(week.data);
        setNames(names_api.data);
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
        setSelectedFile(pdfBlob);
      };
      loadPdf();
      fetchUsers();
    }, []);

    //function to trigger the pdf download
    const modifyPdf = async () => {
      if (!selectedFile) {
        alert('Failed to load PDF');
        return;
      }
      const existingPdfBytes = await selectedFile.arrayBuffer();
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
    const handleCourse = (course) => {
      if (course) {
        console.log(course);
        const selectedCourse = course.value;
        if (selectedCourse === "Others") {
          // Show input field for custom course
          const customCourse = window.prompt("Enter custom course:");
          if (customCourse) {
            setCourse(customCourse);  
          }
        }
        else if(selectedCourse===1){
            setCreditOpen(true);
            setCourse(course.label);
            setCourseStatus(course.value);
        }
        else {
          setCourse(course.label);
          setCreditOpen(false);
          setCourseStatus(course.value)
        }
      } else {
        // Handle case where selectedOption is null (e.g., clearing selection)
        setCourse('');
      }
    };
    

  // function to handle semester Selection
  const handleSem = (selectedOption) => {
    setSelectedSem(selectedOption.value);
  };

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
        console.log("Selected Start Date:", formatDate(nativeDate));
    }
    }
  };

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
        console.log("Selected End Date:", formatDate(nativeDate));
      }      
    }
  };

  const handleExamDate = (date) => {
    setExamDate(date)
    if (date && typeof date === 'object' && date.$isDayjsObject) {
      // Extract the native Date object from the Day.js object
      const nativeDate = date.toDate();
      console.log("Selected Exam Date:", formatDate(nativeDate));
    }  
  }

  // Function to format the date as dd/mm/yyyy
  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  // Function to handle selected opinion for Course Exception
  const handleOpinion = (selectedOption) => {
    setOpinion(selectedOption.value);

    if (selectedOption.value === "1") {
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
    if(courseStatus === 1 && selectedCredits >= 3 && selectedSem >= 4 && selectedWeek === "12" ){
      return true;
    }
    else{
      return false;
    }
  }

  // Function for setting loaded PDF
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleStudent = (selectedOption) => {
    // Extract the value from the selected option
    const selectedStudent = selectedOption ? selectedOption.value : null;
    // Set the selected student in the state
    setStudent(selectedStudent);

  };

  const handleCourseName = (crname) => {
    setCrname(crname.value);
    console.log(course);
  }

  const handleLab = (lab) => {
    setLab(lab.value)
    console.log(certificateUrl);
  }

  const handleCerfUrl = (value) =>{
    setCertificateUrl(value)
  }

  const handleYear = (year) => {
    setYear(year.value);
  }

  const handleRegisterNumber = (registerNumber) => {
    setRegisterNumber(registerNumber.value)
    console.log(student);
  }

  const handleSubmit = async () => {
    try {
      const postData = {
        student: student,
        register_number: registerNumber,
        year: year,
        course_type: course,
        name_of_course: crname,
        semester: selectedSem,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        // certificate_url: certificateUrl
      };
      
      // Make a POST request to the backend endpoint
      const response = await axios.post('http://localhost:5000/api/users', postData);

      // Handle the response as needed
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

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
    value : types.status,
    label : types.type,
  }))

  const CourseNameList = names.map(name =>({
    value : name.courses,
    label : name.courses,
  }))

  const weekList = weekData.map(week => ({
    value : week.week,
    label : week.week,
  }))

  const nameList = names.map(nm => ({
    value : nm.name,
    label : nm.name,
  }))

  
  return (
    <div className='frm'>
        <div>
          <div className="nptelTextFields">
            <div>
            <div className='titdefault' ><h4>Default Details</h4></div>
            <div className='Default' >
            <div className='dfinside'>
              <div className="quesField">
                <div className="inp">Student</div>
                <div>
                  <Select
                    className='textField'
                    options={nameList}
                    onChange={handleStudent}
                    isSearchable
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: error && (!student) ? 'red' : '#cccdce',
                      }),
                    }}
                    placeholder=""
                  ></Select>
                  {error && (!student) && <div className="errorText">Student is mandatory</div>}
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Register Number</div>
                <div>
                  <Select
                    className='textField'
                    options={rollnumber}
                    onChange={handleRegisterNumber}
                    isSearchable
                    placeholder=""
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: error && (!registerNumber) ? 'red' : '#cccdce',
                      }),
                    }}
                  ></Select>
                  {error && (!registerNumber) && <div className="errorText">Please Enter Your Register Number</div>}
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
                
                    placeholder=""
                  ></Select>
                </div>
              </div>
              <div className="quesField"  >
                <div className="inp">Special Lab</div>
                <div>
                  <Select
                    value={{value: lab, label: lab}}
                    className="textField"
                    options={labList}
                    onChange={handleLab}
                    isSearchable
                    placeholder=""
                  ></Select>
                </div>
              </div>
              </div>
            </div>
              <div className='titdefault' ><h4>Course Details</h4></div>
              <div className='Default' >
              <div className='dfinside' >
              <div className="quesField">
                <div className="inp">Course Type</div>
                <div>
                  <Select
                    // value={{ value: course, label: course }}
                    onChange={handleCourse}
                    placeholder=""
                    isSearchable
                    className='textField'
                    options={CourseList}
                    // options={[
                    //   { value: "NPTEL", label: "NPTEL" },
                    //   { value: "COURSERA", label: "Coursera" },
                    //   { value: "UDEMY", label: "Udemy" },
                    //   { value: "Others", label: "Others" },
                    // ]}
                  />
                  {error && (!course) && <div className="errorText">Select course type</div>}
                  {/* {course && <div> Course : {course} </div>} */}
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Name of the Course</div>
                <div>
                  <Select
                    // value={{ value: crname, label: crname }}
                    onChange={handleCourseName}
                    isSearchable
                    className='textField'
                    options={CourseNameList}
                    // options={[
                    //   { value: "REACT JS", label: "REACT JS" },
                    //   { value: "ZEN AI", label: "ZEN AI" },
                    //   { value: "META UI", label: "META UI" },
                    //   { value: "CLOUD", label: "CLOUD" },
                    // ]}
                  />
                </div>
              </div>
              {creditOpen ? 
              <>
              <div className="quesField">
                <div className="inp">Duration in Weeks</div>
                <div>
                  <Select
                    value={{
                      value: selectedWeek,
                      label: selectedWeek ? `${selectedWeek} weeks` : "",
                    }}
                    onChange={handleWeek}
                    className="textField"
                    options={weekList}
                    // options={[
                    //   { value: "4", label: "4 Weeks" },
                    //   { value: "8", label: "8 Weeks" },
                    //   { value: "12", label: "12 Weeks" },
                    // ]}
                    isSearchable={false}
                    placeholder="Select weeks..."
                  />
                  {/* {selectedWeek && <div> Weeks : {selectedWeek} </div>} */}
                </div>
              </div>
              <div className="quesField">
                <div className="inp">No.of.Credits</div>
                <div>
                  <Select
                    value={{
                      value: selectedCredits,
                      label: selectedCredits ? `${selectedCredits}` : "",
                    }}
                    onChange={handleCredits}
                    className="textField"
                    options={[
                      { value: "", label: "" },
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                      { value: 4, label: "4" },
                    ]}
                    isSearchable={false}
                    placeholder=""
                  />
                  {/* {selectedCredits && <div> Credits : {selectedCredits} </div>} */}
                </div>
              </div> </> : null }
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
                      { value: "", label: "" },
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
                  {startDate && endDate && (
                    <p>Number of days between selected dates: {numberOfDays}</p>
                  )}
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
                          opinion === "1" ? "Yes" : opinion === "0" ? "No" : "",
                      }}
                      onChange={handleOpinion}
                      className="textField"
                      options={[
                        { value: "", label: "" },
                        { value: "1", label: "Yes" },
                        { value: "0", label: "No" },
                      ]}
                      placeholder=""
                    />
                  </div>
                </div>
              ) : null}
                </div>
                </div>

              {openings && handleValidation() ? (
                <div>
                <div className='titdefault' ><h4>Apply For Course Exception</h4></div>
                <div className='Default' >
                <div className='dfinside' >
                <div className="exp">
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
                      <TextField
                        size="small"
                        className="textField"
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </div>
                  </div>
                  <div className="quesField">
                    <div className="inp">Certificate URL</div>
                    <InputBox/>
                  </div>
                  <div className="quesDoc">
                    <div>Upload Certificate </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <label htmlFor="pdf-upload" className="pdf-upload-button">
                        Upload PDF
                        <input
                          id="pdf-upload"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
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
                    <button className="expCancelBtn">Cancel</button>
                    <button className="expCreateBtn" onClick={modifyPdf}>
                      Create
                    </button>
                  </div>
                </div>
                </div>
                </div>
                </div>
              ) : (
                <div>
                <div className='titdefault' ><h4>Apply For Rewards</h4></div>
                <div className='Default' >
                <div className='dfinside' >
                <div className="rp">
                  <div className="quesField">
                    <div className="inp">Certificate URL</div>
                    <div>
                    <input
                      type='text'
                      className='textField'
                      value={certificateUrl}
                      onChange={handleCerfUrl}
                    ></input>
                    </div>
                  </div>
                  <div className={handleValidation() ? "quesDoc" : "quesDocRp"}>
                    <div>Upload Certificate </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <label htmlFor="pdf-upload" className="pdf-upload-button">
                        Upload PDF
                        <input
                          id="pdf-upload"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </label>
                      <div style={{ margin: "5px" , marginRight:"50px" }}>
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
                  <div className="RPsubmits">
                    <button className="expCancelBtn">Cancel</button>
                    <button className="expCreateBtn" onClick={handleSubmit} >Create</button>
                  </div>
                </div>
                </div>
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}

export default OnlineForm