import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CountrySelectForm() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const navigate= useNavigate()

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/fetch_country'); 
        const data = await response.json();
        setCountries(data); 
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i); 


  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here (e.g., send data to server)
    console.log('Selected Country:', selectedCountry);
    console.log('Selected Year:', selectedYear);
    navigate(`/view/${selectedCountry}/${selectedYear}`)

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6">Select Country and Year</h2>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country:
          </label>
          <select
            id="country"
            name="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.country_code} value={country.country_code}>
                {country.country_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year:
          </label>
          <select
            id="year"
            name="year"
            value={selectedYear}
            onChange={handleYearChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CountrySelectForm;