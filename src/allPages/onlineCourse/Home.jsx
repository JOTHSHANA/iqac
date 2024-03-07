import React from 'react'
import online from '../../assets/images/nptel.png'
import one from '../../assets/images/oneCredit.png'
import intern from '../../assets/images/Internship.png'
import Card from './stuffs/Card'
import './styles/home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
        <div style={{display:'flex',flexDirection:"row"}}>
            <div className='home' >
            <div className= 'titleHome' >Seeking for course exemptions and rewards? </div>
            <div className='homeCard' >
            <div onClick={()=>{navigate('/OnlineHome')}} style={{cursor:'pointer'}} >
              <Card 
              title="Online Course"
              image={online}
              />
            </div>
            <div onClick={()=>{navigate('/CreditHome')}} style={{cursor:'pointer'}} >
            <Card
              title="One Credit"
              image={one}
              />
            </div>
            <div>
            <Card
              title="Internship"
              image={intern}
              />
            </div>
            </div>
            <div className='home_rule_main'>
              <div className='rules' >
                <div className='titrule' >Rules For Applying Course Exception</div>
                <div className='ruleBlock' >
                    <div className='rlOnline' >
                        <div>Online Course</div>
                        <div>Eligible only if Course applied is 12 week NPTEL course with 3 credits</div>
                    </div>
                    <div className='rlOneCredit' >
                        <div>One Credit</div>
                        <div>Eligible only if the student claims 3 credits from applied course</div>
                    </div>
                </div>
              </div>
              <div>
                <div>Rewards Obtained</div>
                <div></div>
              </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home