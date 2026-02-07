import { useLocation, Link } from 'react-router-dom';

export default function HousingResults() {
  const location = useLocation();
  const results = location.state.results; 
  const recommendation = results.recommendation;
  
  if (!recommendation) {
    return (
      <div className="page">
        <h1>No Recommendation Found</h1>
        <Link to="/housing" className="button">Try Again</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Housing Match Results</h1>
      
      <div className="results">
        <h2>{recommendation.title}</h2>
        <h3>${recommendation.price} / month</h3>
        
        <div className="form-layer">
            <p><strong>Address:</strong> {recommendation.address}</p>
            <p><strong>Contact:</strong> <a href={`mailto:${recommendation.contact_email}`}>{recommendation.contact_email}</a></p>
        </div>

        <div className="form-layer">
             <h3>Match Score: {recommendation.match_score}/100</h3>
        </div>
        
        <hr/>

        <p><strong>Why it's a good fit:</strong> {recommendation.why_its_good}</p>
        
        <div className="form-layer">
             <strong>Scam Risk Assessment:</strong> {recommendation.scam_risk}
        </div>

      </div>

      <div className="buttonbox">
        <Link to="/housing" className="button">Search Again</Link>
      </div>

    </div>
  )
}