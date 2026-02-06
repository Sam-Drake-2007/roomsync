import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ContentPage() {

  return (
    <div className="page">
      <h1>Housing Portal</h1>
      
        <form id="form">
          <div className="form-layer">
            <label for="name">Full Name</label>
            <input type="text" placeholder="Enter your full name"/>
          </div>

          <div className="form-layer">
            <label for="email">Contact Email</label>
            <input type="text"  placeholder="Enter your email"/>
          </div>

          <div className="form-layer">
            <label for="phone" >Contact Phone Number</label>
            <input type="text" placeholder="Enter your phone number"/>
          </div>

          <div className="buttonbox">
            <Link to="/roommate" className="button">Find a Roommate</Link>
            <Link to="/housing" className="button">Find Housing</Link>
          </div>

          
          
        </form>c
    </div>
  )
}
