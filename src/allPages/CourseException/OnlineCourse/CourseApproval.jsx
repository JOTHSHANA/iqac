import React, { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import '../styles/courseApproval.css';
import OnlineTable from '../stuffs/OnlineTable';

const CourseApproval = () => {
  const [selectedOption, setSelectedOption] = useState('Rewards');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFilterClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false); // Close dropdown after selection
  };

  return (
    <div>
      <div className='titFac'>
        <div className="ti">
          <h4>Online Course Approval</h4>
        </div>
        <div style={{ margin: "20px", marginRight: "30px",marginBottom:"5px" }}>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <h4 style={{marginTop:'5px'}}>Filter</h4>
            <div className='icon' onClick={handleFilterClick}>
              <FilterAltIcon className='iconfilter' />
            </div>
          </div>
        </div>
      </div>
      <div className='drop' >
      {showDropdown && (
            <div className="dropdown">
                <div className='op1' onClick={() => handleOptionSelect('Rewards')}> <h5>Rewards</h5> </div>
                <div className='op2' onClick={() => handleOptionSelect('Course Exemption')}><h5>Course Excemption</h5></div>
            </div>
          )}
      </div>
      <div>
        <div className="titlehm">
          <h4>{selectedOption}</h4>
        </div>
      </div>
      <div>
        <div>
            {/* <OnlineTable/> */}
        </div>
      </div>
    </div>
  );
};

export default CourseApproval;
