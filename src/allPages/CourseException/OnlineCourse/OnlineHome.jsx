import React, { useState } from 'react'
import OnlineTable from '../stuffs/OnlineTable'
import '../styles/onlineHome.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom'

const OnlineHome = () => {
  const navigate = useNavigate()
  const [firstData,setFirstData] = useState(true)

  return (
    <div>
        <div className='titleBtn' >
        <div className="titlehm">
            <h4>Online Course</h4>
        </div>
        {!firstData &&
        <div className='createDiv' >
            <button className='CreateBtn' onClick={()=>{navigate('/onlineCourseForm')}} >Create</button>
        </div>}
        </div>
        <div className='hometable' >
            <OnlineTable setFirstData={setFirstData}/>
        </div>
        {firstData && 
        <div className='upldBTN' >
            <div>
                <h4>Upload Online Course Here</h4>
            </div>
            <div>
                <div className='card-add-icon' onClick={()=>{navigate('/onlineCourseForm')}} style={{cursor:'pointer'}}>
                        <AddBoxIcon className='add-icon' sx={{ fontSize: 32 }}/>
                </div>
            </div>
        </div> }
        
    </div>
  )
}

export default OnlineHome