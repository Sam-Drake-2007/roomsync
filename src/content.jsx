import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ContentPage() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="page">
      <h1>Housing Portal</h1>
      
        <form id="form"> 
          <div className="form-layer">
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange}/>
          </div>

          <div className="form-layer">
            <label htmlFor="email">Contact Email</label>
            <input type="text" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange}/>
          </div>

          <div className="form-layer">
            <label htmlFor="phone" >Contact Phone Number</label>
            <input type="text" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange}/>
          </div>

          <div className="buttonbox">
            <Link 
                to="/roommate" 
                className="button" 
                state={{ currentUser: formData }}
            >
                Find a Roommate
            </Link>

            <Link 
                to="/housing" 
                className="button" 
                state={{ currentUser: formData }}
            >
                Find Housing
            </Link>
          </div>
          
        </form>
    </div>
  )
}