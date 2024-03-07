import React from 'react'
import OnlineTable from './stuffs/OnlineTable'
import './styles/onlineHome.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom'

const OnlineHome = () => {
  const navigate = useNavigate()

  return (
    <div>
        <div className="titlehm">
            <h4>Online Course</h4>
        </div>
        <div className='hometable' >
            <OnlineTable/>
        </div>
        <div className='upldBTN' >
            <div>
                <h4>Upload Online Course Here</h4>
            </div>
            <div>
                <div className='card-add-icon' onClick={()=>{navigate('/onlineCourse')}} style={{cursor:'pointer'}}>
                        <AddBoxIcon className='add-icon' sx={{ fontSize: 32 }}/>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default OnlineHome