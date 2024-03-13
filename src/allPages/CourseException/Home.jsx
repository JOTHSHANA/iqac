import React, { useEffect, useState } from 'react'
// import online from '../../assets/images/nptel.png'
// import one from '../../assets/images/oneCredit.png'
// import intern from '../../assets/images/Internship.png'
import Card from './stuffs/Card'
import axios from 'axios';
import './styles/home.css'
import { useNavigate } from 'react-router-dom'
import {apiBaseUrl} from '../../api/api'

const Home = () => {
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/ce/available`)
      .then(response => {
        setCourseData(response.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, []);

  return (
    <div>
        <div style={{display:'flex',flexDirection:"row"}}>
            <div className='home' >
            <div className= 'titleHome' >Seeking for course exemptions and rewards? </div>
            <div className='homeCard' >
            {courseData.map(course => (
              <div key={course.id} onClick={() => navigate('/OnlineHome')} style={{ cursor: 'pointer' }} >
                <Card
                  title={course.name}
                  image={`${apiBaseUrl}/${course.image_path}`}
                />
              </div>
            ))}
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
                <div className='titrule' >Rewards Obtained</div>
                <div></div>
              </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home