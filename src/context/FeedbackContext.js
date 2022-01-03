import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

// This is my FeedbackProvider
export const FeedbackProvider = ({ children }) => {
  // This is my state.

  const [isLoading, setIsLoading] = useState(true)

  /*Below, I'm using the React hook "useState". The name is the first param. The second param is the function to update this piece of state. You normally call the function "set" + "whatever your setting".*/
  const [feedback, setFeedback] = useState([])
  // This is my second piece of global state. It get's used when I want to edit one feedback item.
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(
      `http://localhost:5000/feedback?_sort=id&_order=desc`
    )
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

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

  // Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
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
        // piece of state
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        // function
        editFeedback,
        updateFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
