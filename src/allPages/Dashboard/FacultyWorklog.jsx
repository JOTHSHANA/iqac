import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FacultyWorklog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faCircleChevronUp, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const FacultyWorklogForm = () => {
  const [formData, setFormData] = useState({
    facultyName: '',
    selectedSkill: '',
    selectedDate: null,
    workLogs: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, selectedDate: date });
  };

  const handleWorkChange = (e, index) => {
    const { name, value } = e.target;
    const newWorkLogs = [...formData.workLogs];
    newWorkLogs[index][name] = value;
    setFormData({ ...formData, workLogs: newWorkLogs });
  };

  const handleCreateLog = () => {
    if (formData.workLogs.length < 3) {
      setFormData({ ...formData, workLogs: [...formData.workLogs, { work: '', session: '', hours: '' }] });
    } else {
      console.error('Maximum worklogs reached for the day.');
    }
  };

  const handleRemoveLog = (index) => {
    const newWorkLogs = [...formData.workLogs];
    newWorkLogs.splice(index, 1);
    setFormData({ ...formData, workLogs: newWorkLogs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Faculty WorkLog</h1>
      <div style={{ marginLeft: "100px" }}>
        <div className="input-container">
          <label className="input-label">Faculty Name:</label>
          <input
            className="input"
            type="text"
            name="facultyName"
            value={formData.facultyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label">Log for:</label>
          <select className="input" name="selectedSkill" value={formData.selectedSkill} onChange={handleInputChange} required>
            <option value="">Select a Skill</option>
            {['Dayskill', 'NightSkill', 'academics', 'T&P'].map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label className="input-label">Date:</label>
          <DatePicker
            className="input"
            selected={formData.selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            placeholderText="Select Date"
            required
          />
        </div>
        <div><button className='addlog' onClick={handleCreateLog} >Add log</button></div>
        {/* Multiple Work Log Forms */}
        {formData.workLogs.map((log, index) => (
          <div key={index} className="workLogForm">
            <div className='h2div'>
              <h2>WorkLog {index + 1} <FontAwesomeIcon icon={faSquarePlus} className='faSquarePlus' onClick={handleCreateLog} /> <FontAwesomeIcon icon={faTrashCan} className='faTrashCan' onClick={() => handleRemoveLog(index)} /> <FontAwesomeIcon icon={faCircleChevronUp} className='faCircleChevronUp' /> <FontAwesomeIcon icon={faCircleChevronDown} className='faCircleChevronDown' /></h2>
            </div>
            <div style={{ padding: "20px 20px 20px 20px" }}>
              <div className="input-container">
                <label className="input-label">Work</label>
                <select className="input" name="work" value={log.work} onChange={(e) => handleWorkChange(e, index)} required>
                  <option value="">Select Work</option>
                  {['Teaching', 'Research', 'Administrative', 'Other Work'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-container">
                <label className="input-label">Session</label>
                <select className="input" name="session" value={log.session} onChange={(e) => handleWorkChange(e, index)} required>
                  <option value="">Select Session</option>
                  {['Morning', 'Afternoon'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-container">
                <label className="input-label">No of Hours</label>
                <select className="input" name="hours" value={log.hours} onChange={(e) => handleWorkChange(e, index)} required>
                  <option value="">Select No of Hours</option>
                  {['1 hour', '2 hours', '3 hours', '4 hours', '5 hours'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
        
        {formData.workLogs.length > 0 && (
          <button className='submitworklog' type="submit" >Create worklog</button>
        )}
      </div>
    </form>
  );
};

export default FacultyWorklogForm;
