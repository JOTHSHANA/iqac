import React, { useEffect, useState } from 'react'
import './styles/home.css'
import { useNavigate } from 'react-router-dom'
import {apiBaseUrl} from '../../api/api'
import HomeCard from '../../components/homecard/HomeCard';
import axios from 'axios';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

Chart.register(
  ArcElement,
  Tooltip,
  Legend
)

const data = {
  lebels: ['completed','Not Completed'],
  datasets: [{
    label:'Nptel',
    data:[1,1],
    backgroundColor:['#003459','#b5e2fa'],
    borderColor: ['#003459','#b5e2fa']
  }]
}

const options = {
  responsive: true, // Ensure the chart adjusts to container size
  maintainAspectRatio: false, // Allow the chart to have a fixed size
  width: -1, // Set the width of the chart in pixels
}

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

  return (
    <div className='homeMainDiv' >
    <div className="content-cards">
      {courseData.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/${course.name}`)}
                style={{ cursor: "pointer" }}
              >
                <HomeCard
                  title={course.name}
                  image={`${apiBaseUrl}/${course.image_path}`}
                />
              </div>
            ))}
    </div>
    <div className='douhnutMainDiv' >
      <div className='doughnut' >
        <div style={{width:'220px',height:'190px'}}>
        <div>Online Course Target</div>
        <Doughnut
          data={data}
          options={options}
        >
        </Doughnut>
        </div>
      </div>
      <div className='doughnut' >
        <div style={{width:'220px',height:'190px'}}>
        <div>One Credit Target</div>
        <Doughnut
          data={data}
          options={options}
        >
        </Doughnut>
        </div>
      </div>
      <div className='doughnut' >
        <div style={{width:'220px',height:'190px'}}>
        <div>Internship Target</div>
        <Doughnut
          data={data}
          options={options}
        >
        </Doughnut>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Home