import { createContext, useState, useEffect } from 'react'
// Only needed this when using the uuidv4 package to assign a unique id to each feedback item on the list.
// import { v4 as uuidv4 } from 'uuid'

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
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await response.json()

    // Below adds new feedback for the UI
    // The uuidv4 function adds a unique id to every new feedback. I removed the line below after adding the JSON database since it adds a new id automatically.
    // newFeedback.id = uuidv4()

    // This sets feedback to a new array (since I can't change react states, I have to replace them) which will include the feedback from the previous state, but also add newFeedback to it.
    // setFeedback([newFeedback, ...feedback])

    // Same as setFeedback above except now I'm setting with "data" from json file rather than "newFeedback" as above
    setFeedback([data, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json()

    // Below, changed "updItem" to "data" to edit feedback to reflect what's in the database
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
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
