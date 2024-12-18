
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdDateRange } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
function HolidayCardList({ country, year }) {
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };



    const baseURL = "http://127.0.0.1:8000/api/fetch";

    const fetchHolidays = async () => {
        try {
            const response = await axios.get(baseURL, {
                params: {
                    searchTerm:searchTerm,
                    startDate:startDate,
                    endDate:endDate,
                    country: country,
                    year: year,
                },
            });
            setHolidays(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchHolidays();
        console.log('Search:', searchTerm, selectedOption, startDate, endDate);

    }, [searchTerm, selectedOption, startDate, endDate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
        <div className="relative flex items-center">
      <div className="flex-grow">
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="relative ml-2">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
        >
          <option value="">All</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="ml-2">
        <div className="relative">
          <MdDateRange className="absolute left-2 top-2 text-gray-400" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="ml-2">
        <div className="relative">
          <MdDateRange className="absolute left-2 top-2 text-gray-400" />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        <FiSearch className="mr-2" />
        Search
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {holidays.map((place) => (
                <div key={place.id} className="bg-white shadow-md overflow-hidden">
    <img src={'https://via.placeholder.com/640x360'} alt={place.name} className="w-full h-48 object-cover" />
    <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{place.name}</h3>
        <p className="text-gray-600 text-sm">{place.iso_date}</p>
        <p className="text-gray-500 text-xs mt-2">Type: {place.primary_type}</p>
        <Link to={`/holiday/${place.id}`}
            className="text-blue-500 hover:underline mt-2"
           
        >
            Learn More
        </Link>
    </div>
</div>
            ))}
        </div>
        
        </>
        
    );
}

export default HolidayCardList;