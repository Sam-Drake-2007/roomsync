import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ContentPage() {

  return (
    <div class="page">
      <h1>Housing Portal</h1>
      
        <form id="form">
          <div class="form-layer">
            <label for="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name"/>
          </div>

          <div class="form-layer">
            <label for="email">Contact Email</label>
            <input type="text" id="name" placeholder="Enter your email"/>
          </div>

          <div class="form-layer">
            <label for="phone" >Contact Phone Number</label>
            <input type="text" id="name" placeholder="Enter your phone number"/>
          </div>

          <div class="buttonbox">
            <Link to="/roommate" class="button">Find a Roommate</Link>
            <Link to="/housing" class="button">Find Housing</Link>
          </div>

          
          
        </form>
    </div>
  )
}
