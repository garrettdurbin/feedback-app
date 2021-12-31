import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

// This is my FeedbackProvider
export const FeedbackProvider = ({ children }) => {
  // This is my state.

  /*Below, I'm using the hook useState. The name is the first param. The second param is the function to update this piece of state. You normally call the function "set" + "whatever your setting".*/
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This feedback item 1.',
      rating: 10
    },
    {
      id: 2,
      text: 'This feedback item 2.',
      rating: 9
    },
    {
      id: 3,
      text: 'This feedback item 3.',
      rating: 8
    }
  ])
  // This is my second piece of global state. It get's used when I want to edit one feedback item.
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  // Add feedback
  const addFeedback = (newFeedback) => {
    // The uuidv4 function adds a unique id to every new feedback.
    newFeedback.id = uuidv4()
    // This sets feedback to a new array (since I can't change react states, I have to replace them) which will include the feedback from the previous state, but also add newFeedback to it.
    setFeedback([newFeedback, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  // Below, the value "feedback" is how I'm sending the array above into the feedback provider. "FeedbackProvider" is going to be wrapped around all my componendts in app.js
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        // function
        editFeedback,
        // piece of state
        feedbackEdit
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
