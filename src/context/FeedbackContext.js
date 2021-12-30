import { createContext, useState } from 'react'

const FeedbackContext = createContext()

// This is my FeedbackProvider
export const FeedbackProvider = ({ children }) => {
  // This is my state...it just has one item in it for now.
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from Context',
      rating: 10
    }
  ])

  // Below, the value "feedback" is how I'm sending the array above into the feedback provider. "FeedbackProvider" is going to be wrapped around all my componendts in app.js
  return (
    <FeedbackContext.Provider
      value={{
        feedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
