import { useLocation, Link } from 'react-router-dom';

export default function RoommateResults() {
  const location = useLocation();
  const { results } = location.state; 
  const { recommendation } = results;

  return (
    <div className="page">
      <h1>Roommates Results</h1>
      
      <div className="result-card">
        <h2>Best Match: {recommendation.name}</h2>
        <h3>Match Score: {recommendation.match_score}/100</h3>
        
        <p><strong>Why matches:</strong> {recommendation.why_we_match}</p>
        
        <div className="interests-section">
          <strong>Common Interests:</strong>
          <ul>
            {recommendation.common_interests.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="buttonbox">
        <Link to="/roommate" className="button">Search Again</Link>
      </div>

    </div>
  )
}