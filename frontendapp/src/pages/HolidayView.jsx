import React from 'react'
import { useParams } from 'react-router-dom'
import HolidayCardList from '../components/HolidayCardList'
const HolidayView = () => {
    const { country,year } = useParams()
  return (
    <div style={{margin:'60px'}}>

        <HolidayCardList country={country} year={year}/>
    </div>

  )
}

export default HolidayView