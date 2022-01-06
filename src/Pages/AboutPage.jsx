import {Link} from 'react-router-dom'
import Card from '../components/shared/Card'

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About This Project</h1>
        <p>This is an example of a Route</p>
        <p>This is a React app to leave feedback for products and services.</p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to="/React_Feedback_App.html">Back to Home</Link>
        </p>
      </div>
    </Card>
  )
}

export default AboutPage
