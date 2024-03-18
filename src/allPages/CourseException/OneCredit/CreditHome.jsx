import React from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom'
import OneCreditTable from '../stuffs/OneCreditTable';
import "../styles/creditHome.css"

const CreditHome = () => {
  const navigate = useNavigate()

  return (
    <div className='creditHomeMain' >
        <div className='titleBtn' >
        <div className="titlehm">
            <h4>One Credit</h4>
        </div>
        <div className='createDiv' >
            <button type='disabled' className='CreateBtn'  >Course Exception</button>
        </div>
        </div>
        <div className='hometable' >
            <OneCreditTable/>
        </div>
    </div>
  )
}

export default CreditHome