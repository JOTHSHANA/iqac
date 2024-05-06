import React, { useEffect, useState } from 'react'
// import online from '../../assets/images/nptel.png'
// import one from '../../assets/images/oneCredit.png'
// import intern from '../../assets/images/Internship.png'
import Card from './stuffs/Card';
import axios from 'axios';
import './styles/home.css';
import { useNavigate } from 'react-router-dom'
import {apiBaseUrl} from '../../api/api'
import {Chart as ChartJs, ArcElement, Tooltip, Legend, Title} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

const Home = () => {
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/ce`)
      .then(response => {
        setCourseData(response.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, []);

//   ChartJs.register(
//     ArcElement,
//     Tooltip,
//     Legend
//    )
   
//    const centerTextPlugin = {
//     id: 'centerText',
//     afterDraw: (chart) => {
//        const ctx = chart.ctx
//        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2
//        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2
//        const backgroundColor = "blue"
//        const radius = chart.innerRadius
   
//        ctx.fillStyle = 'white'
//        ctx.textAlign = 'center'
//        ctx.textBaseline = 'middle'
//        ctx.font = '14px Arial'
//        ctx.backgroundColor = "blue"
   
//        ctx.fillText("Maths", centerX, centerY)
//     }
//    }
   
//    ChartJs.register(centerTextPlugin)

//    const data = {
//     datasets : [{
//       label:'poll',
//       data: [6,3],
//       backgroundColor: ['#FFC700','#369FFF'],
//       borderColor: ['#FFC700','#369FFF'],
//       weight:[0],
//       borderWidth:[7]
//     },
//   ]

//  }
//  const options = {
//     plugins: {
//       centerText: {}
//     }
//  }
   

  return (
    <div className='content-container' >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="home">
          <div className="titleHome"></div>
          <div className="homeCard">
            {courseData.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/${course.name}`)}
                style={{ cursor: "pointer" }}
              >
                <Card
                  title={course.name}
                  image={`${apiBaseUrl}/${course.image_path}`}
                />
              </div>
            ))}
          </div>
          {/* <div className='home_rule_main'>
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
            </div> */}
          {/* <div className='doughnut'>
      <Doughnut
        data={data}
        options={options}
      ></Doughnut>
    </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home