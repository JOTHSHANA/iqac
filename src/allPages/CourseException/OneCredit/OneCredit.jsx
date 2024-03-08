import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import '../styles/oneCredit.css'
import TextField from '@mui/material/TextField';
import pdf from '../../../assets/courseExceptionPdf/Online.pdf'

const OneCredit = () => {
  const [users, setUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [courseNo,setCourseNo] = useState(1)
  const [selectedSem,setSelectedSem] = useState('')
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(0);

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      // If request is successful, set the users state with the fetched data
      setUsers(response.data);
    } catch (error) {
      // If an error occurs, log the error
      console.error("Error fetching users:", error);
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
  
  const handleSem = (selectedOption) => {
    setSelectedSem(selectedOption.value);
  };

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

  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }
    
  const selectOptions = users.map((user) => ({
    value: user.user_name,
    label: user.user_name,
  }));

  const rollnumber = users.map(user=>({
    value : user.user_id,
    label : user.user_id,
  }))


  return (
    <div className='frm' >
      <div>
        <div>
          <div className="nptelTextFields">
            <div>
              <div className='titdefault' ><h4>Default Details</h4></div>
              <div className='Default' >
              <div className='dfinside' >
              <div className="quesField">
                <div className="inp">Student</div>
                <div>
                  <Select
                    className="textField"
                    options={selectOptions}
                    isSearchable
                    isClearable
                    placeholder=""
                  ></Select>
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Year Of Study</div>
                <div>
                  <Select
                    className="textField"
                    // options={selectOptions}
                    isSearchable
                    isClearable
                    placeholder=""
                  ></Select>
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Register Number</div>
                <div>
                  <Select
                    className="textField"
                    options={rollnumber}
                    isClearable
                    isSearchable
                    placeholder=""
                  ></Select>
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Department</div>
                <div>
                  <Select
                    className="textField"
                    // options={selectOptions}
                    isSearchable
                    isClearable
                    placeholder=""
                  ></Select>
                </div>
              </div>
              </div>
              </div>
              <div className="titdefault"> <h4>Course Number {courseNo}</h4> </div>
              <div className='Default' >
              <div className='dfinside' >
              <div className="quesField">

                <div className="inp">Name Of the Course</div>
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
                <div className="inp">Course Code</div>
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
                  {/* {startDate && endDate && (
                    <p>Number of days between selected dates: {numberOfDays}</p>
                  )} */}
                </div>
              </div>
              <div className="quesDocOneCr">
                <div className="inp">Marksheet Proof</div>
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
                      <TextField
                        disabled
                        size="small"
                        className="textField"
                        id="outlined-disabled"
                        defaultValue="Initiated"
                      />
                    </div>
              </div> */}
              <div className="RPsubmits">
                    <button className="expCancelBtn">Cancel</button>
                    <button className="expCreateBtn">Create</button>
              </div>
              </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneCredit