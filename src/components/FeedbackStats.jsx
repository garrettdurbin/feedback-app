import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
  // Pulling feedback from context...so I'm no longer receiving it above as a prop.
  const { feedback } = useContext(FeedbackContext)
  console.log(feedback)
  console.log('feedback is: ', feedback)
  console.log('is feedback an array? ', Array.isArray(feedback))
  console.log('feedback is type: ', typeof feedback)

  // Calculate ratings avg
  let average = 
    feedback.reduce((acc, cur) => { 
      return acc + cur.rating
    }, 0) / feedback.length

  average = average.toFixed(1).replace(/[.,]0$/, '')
  // /[.,]0$/, '' is a regular expression that get's rid of my dangling zeros on the average rating.
  
  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats
