import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RoommatePage() {
  const [count, setCount] = useState(0)

  return (
    <div class="page">
      <h1>Roommate Finder</h1>

      <form id="form">
          <div class="form-layer">
            <label for="question1">Describe your ideal Night in one sentence.</label>
            <textarea name="message" placeholder="Type here..." rows="5"/>
          </div>

          <div class="form-layer">
            <label for="question2">What are 'roommate habits' that annoy you?</label>
            <textarea name="message" placeholder="Type here..." rows="5"/>
          </div>

          <div class="form-layer">
            <label for="question3" >Are you an early bird or a night owl? Be specific about your hours.</label>
            <textarea name="message" placeholder="Type here..." rows="5"/>
          </div>

          <div class="form-layer">
            <label for="question4" >How often do you put aside time to clean up your environnment.</label>
            <textarea name="message" placeholder="Type here..." rows="5"/>
          </div>

          <div class="form-layer">
            <label for="question5" >Do you have any dealbreakers? (Pets, smoking, guests, allergies)</label>
            <textarea name="message" placeholder="Type here..." rows="5"/>
          </div>

          <div class="buttonbox">
            <Link to="/r-results" class="button">Find Best Match</Link>
          </div>
          
        </form>


          
          
    
    
    </div>
  )
}
