import React from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom'
import OneCreditTable from '../stuffs/OneCreditTable';

const CreditHome = () => {
  const navigate = useNavigate()

  return (
    <div>
        <div className="titlehm">
            <h4>One Credit</h4>
        </div>
        <div className='hometable' >
            <OneCreditTable/>
        </div>
        <div className='upldBTN' >
            <div>
                <h4>Upload Your One Credit Here</h4>
            </div>
            <div>
                <div className='card-add-icon' onClick={()=>{navigate('/onecredit')}} style={{cursor:'pointer'}}>
                        <AddBoxIcon className='add-icon' sx={{ fontSize: 32 }}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreditHome