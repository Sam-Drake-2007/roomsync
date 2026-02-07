import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function RoommatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = location.state?.currentUser || {
    name: "Guest User",
    phone: "NA",
    email: "NA"
  };

  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: ''
  });

  const handleSubmit = async (e) => {

    // prevent reloading
    e.preventDefault();

    // backend api call
    const payload = {
      current_user: currentUser,
      answers: {
        questions: [
          "Describe your ideal Night in one sentence.", 
          "What are 'roommate habits' that annoy you?",
          "Are you an early bird or a night owl? Be specific about your hours.", 
          "How often do you put aside time to clean up your environnment.", 
          "Do you have any dealbreakers? (Pets, smoking, guests, allergies)"
        ],
        answers: Object.values(answers) // shortcut, accesses the answers state
      }
    };

    const response = await fetch('http://localhost:8000/compatibility/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // navigate to results page with data
    navigate('/r-results', { state: { results: data } });
  }

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page">
      <h1>Roommate Finder</h1>

      <form id="form">
          <div className="form-layer">
            <label htmlFor="question1">Describe your ideal Night in one sentence.</label>
            <textarea name="question1" placeholder="Type here..." rows="5" value={answers.question1} onChange={handleChange}/>
          </div>

          <div className="form-layer">
            <label htmlFor="question2">What are 'roommate habits' that annoy you?</label>
            <textarea name="question2" placeholder="Type here..." rows="5" value={answers.question2} onChange={handleChange}/>
          </div>

          <div className="form-layer">
            <label htmlFor="question3" >Are you an early bird or a night owl? Be specific about your hours.</label>
            <textarea name="question3" placeholder="Type here..." rows="5" value={answers.question3} onChange={handleChange}/>
          </div>

          <div className="form-layer">
            <label htmlFor="question4" >How often do you put aside time to clean up your environnment.</label>
            <textarea name="question4" placeholder="Type here..." rows="5" value={answers.question4} onChange={handleChange}/>
          </div>

          <div className="form-layer">
            <label htmlFor="question5" >Do you have any dealbreakers? (Pets, smoking, guests, allergies)</label>
            <textarea name="question5" placeholder="Type here..." rows="5" value={answers.question5} onChange={handleChange}/>
          </div>

          <div className="buttonbox">
            <button to="/r-results" className="button" onClick={handleSubmit}>Find Best Match</button>
          </div>

          <div className="homebox">
            <Link to="/" className="button">Home</Link>
          </div>

        </form>
    </div>
  )
}
