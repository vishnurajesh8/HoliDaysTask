import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const SingleHolidayPage = () => {
    let {id} = useParams()

    let [ holiday,setHoliday] = useState({})
    const [loading,setLoading]= useState(true)

    const fetchHoliday = async ()=>{
        const response = await axios.get(`http://127.0.0.1:8000/api/holiday/${id}`)
        console.log(response.data)
        setHoliday(response.data)
        setLoading(false)

    }
    useEffect(()=>{
        fetchHoliday()
    },[])
    if (loading){
        return (
            <div>
                loading..........
            </div>
        )
    }

  return (
    <div className="container mx-auto px-4 py-6 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Image Placeholder */}
        <div className="flex justify-center items-center bg-gray-200 p-4 rounded-lg">
          <div className="w-80 h-80 bg-gray-300 rounded-lg flex justify-center items-center">
            <span className="text-gray-500">Image Placeholder</span>
          </div>
        </div>

        {/* Right Side: Country and Holiday Details */}
        <div className="space-y-4">
          {/* Country Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Country Information</h2>
            <p className="text-sm text-gray-600">Country Code: {holiday.country.country_code}</p>
            <p className="text-sm text-gray-600">Country Name: {holiday.country.country_name}</p>
          </div>

          {/* Holiday Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Holiday Information</h2>
            <p className="text-sm text-gray-600">Holiday Name: {holiday.name}</p>
            <p className="text-sm text-gray-600">Description: {holiday.description || 'No description available'}</p>
            <p className="text-sm text-gray-600">Date: {holiday.iso_date ? holiday.iso_date : 'Not available'}</p>
            <p className="text-sm text-gray-600">Year: {holiday.year || 'Not specified'}</p>
            <p className="text-sm text-gray-600">Month: {holiday.month || 'Not specified'}</p>
            <p className="text-sm text-gray-600">Day: {holiday.day || 'Not specified'}</p>
            <p className="text-sm text-gray-600">Primary Type: {holiday.primary_type || 'Not available'}</p>

            <p className="text-sm text-gray-600">URL: <a href={holiday.canonical_url} className="text-blue-600">{holiday.canonical_url || 'Not available'}</a></p>
            <p className="text-sm text-gray-600">Locations: {holiday.locations || 'Not specified'}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHolidayPage;
