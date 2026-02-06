import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function HousingPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="page">
      <h1>Housing Helper</h1>

      <form id="form">

          <div className="form-layer">
            <label for="location">Distance from UOttawa</label>
            <select name="houseType">
                <option value="500-">Less than 500m</option>
                <option value="500-1k">500m to 1km</option>
                <option value="1k-2k">1km to 2km</option>
                <option value="2k-4k">2km to 4km</option>
                <option value="5k+">5km or more</option>
            </select>
          </div>

          <div className="form-layer">
            <label for="typeA">Accomodation Type</label>
            <select name="houseType">
                <option value="appartement">Appartement</option>
                <option value="bedroomApartment">Bedroom(s) in an apartment</option>
                <option value="house">House</option>
                <option value="bedroomHouse">Bedroom(s) in a house</option>
            </select>
          </div>

          <div className="form-layer">
            <label for="typeR">Rental Type</label>
            <select name="rentType">
                <option value="lease">Lease</option>
                <option value="monthly">Monthly</option>
                <option value="sublet">Sublet</option>
            </select>
          </div>

          <div className="form-layer">
            <label for="money">Minimum Prefered Monthly Rent</label>
            <input type="text"  placeholder="Enter your amount in $"/>
          </div>

          <div className="form-layer">
            <label for="money" >Maximum Prefered Monthly Rent</label>
            <input type="text" placeholder="Enter your amount in $"/>
          </div>

          <div class="form-layer">
            <label for="importantFacts" >What is important to you in an accomodation? Ex:(Safety, Grocery Access, Parking)</label>
            <textarea name="message" placeholder="Type here..." rows="5"/>
          </div>

          <div className="buttonbox">
            <Link to="/h-results" className="button">Find Best Match</Link>
          </div>
          
        </form>
    

    </div>
  )
}
