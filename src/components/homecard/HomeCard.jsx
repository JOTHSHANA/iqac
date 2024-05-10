import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import img from '../../allPages/CourseException/stuffs/img.png'
import './homeCard.css'

const HomeCard = (props) => {
  return (
    <div>
        <Card className='homeCard' >
          <CardActionArea>
            <CardMedia component="img" height="180" image={props.image}/>
            <CardContent>
              <Typography variant="h6" component="div">
              {props.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    </div>
  )
}

export default HomeCard