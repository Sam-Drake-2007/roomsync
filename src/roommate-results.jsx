import { useLocation, Link } from 'react-router-dom';

export default function RoommateResults() {
  const location = useLocation();
  const { results } = location.state || {}; // Added safety check
  const recommendation = results?.recommendation;

  if (!recommendation) {
    return (
      <div className="page">
        <h1>No Recommendation Found</h1>
        <Link to="/roommate" className="button">Try Again</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Roommates Results</h1>
      
      <div className="results">
        <h2>Best Match: {recommendation.name}</h2>
        
        {/* New Contact Section */}
        <div className="form-layer">
            <p><strong>Phone:</strong> <a href={`tel:${recommendation.phone_number}`}>{recommendation.phone_number}</a></p>
            <p><strong>Email:</strong> <a href={`mailto:${recommendation.email}`}>{recommendation.email}</a></p>
        </div>

        <h3>Match Score: {recommendation.match_score}/100</h3>
        
        <p><strong>Why matches:</strong> {recommendation.why_we_match}</p>
        
        <div className="form-layer">
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