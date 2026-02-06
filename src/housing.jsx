import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function HousingPage() {
  const navigate = useNavigate();

  const dummyUser = {
    name: "Samuel (Demo)",
    phone: "555-0199",
    email: "sam@uottawa.ca"
  };

  const [formData, setFormData] = useState({
    distance: '500-', // Default value matching first option
    accommodationType: 'appartement',
    rentalType: 'lease',
    minRent: '',
    maxRent: '',
    preferences: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // backend api call
    const payload = {
      current_user: dummyUser,
      answers: {
        questions: [
          "Distance from UOttawa",
          "Accommodation Type",
          "Rental Type",
          "Minimum Preferred Monthly Rent",
          "Maximum Preferred Monthly Rent",
          "What is important to you? (Safety, Grocery Access, Parking)"
        ],
        answers: [
          formData.distance,
          formData.accommodationType,
          formData.rentalType,
          formData.minRent,
          formData.maxRent,
          formData.preferences
        ]
      }
    };

    const response = await fetch('http://localhost:8000/compatibility/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // navigate to results page with data
    navigate('/h-results', { state: { results: data } });
  }

  return (
    <div className="page">
      <h1>Housing Helper</h1>

      <form id="form">

          <div className="form-layer">
            <label htmlFor="distance">Distance from UOttawa</label>
            <select name="distance" value={formData.distance} onChange={handleChange}>
                <option value="500-">Less than 500m</option>
                <option value="500-1k">500m to 1km</option>
                <option value="1k-2k">1km to 2km</option>
                <option value="2k-4k">2km to 4km</option>
                <option value="5k+">5km or more</option>
            </select>
          </div>

          <div className="form-layer">
            <label htmlFor="accommodationType">Accommodation Type</label>
            <select name="accommodationType" value={formData.accommodationType} onChange={handleChange}>
                <option value="appartement">Appartement</option>
                <option value="bedroomApartment">Bedroom(s) in an apartment</option>
                <option value="house">House</option>
                <option value="bedroomHouse">Bedroom(s) in a house</option>
            </select>
          </div>

          <div className="form-layer">
            <label htmlFor="rentalType">Rental Type</label>
            <select name="rentalType" value={formData.rentalType} onChange={handleChange}>
                <option value="lease">Lease</option>
                <option value="monthly">Monthly</option>
                <option value="sublet">Sublet</option>
            </select>
          </div>

          <div className="form-layer">
            <label htmlFor="minRent">Minimum Preferred Monthly Rent</label>
            <input 
              name="minRent" 
              type="text" 
              placeholder="Enter your amount in $" 
              value={formData.minRent} 
              onChange={handleChange}
            />
          </div>

          <div className="form-layer">
            <label htmlFor="maxRent">Maximum Preferred Monthly Rent</label>
            <input 
              name="maxRent" 
              type="text" 
              placeholder="Enter your amount in $" 
              value={formData.maxRent} 
              onChange={handleChange}
            />
          </div>

          <div className="form-layer">
            <label htmlFor="preferences">What is important to you in an accommodation? Ex:(Safety, Grocery Access, Parking)</label>
            <textarea 
              name="preferences" 
              placeholder="Type here..." 
              rows="5" 
              value={formData.preferences} 
              onChange={handleChange}
            />
          </div>

          <div className="buttonbox">
            <Link to="/h-results" className="button" onClick={handleSubmit}>Find Best Match</Link>
          </div>
          
        </form>
    </div>
  )
}