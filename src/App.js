import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackData from './data/FeedbackData'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './Pages/AboutPage'

function App() {
  /*Below, I'm using the hook useState. The name is the first param. The second param is the function to update this piece of state. You normally call the function "set" + "whatever your setting".*/
  const [feedback, setFeedback] = useState(FeedbackData)

  const addFeedback = (newFeedback) => {
    // The uuidv4 function adds a unique id to every new feedback.
    newFeedback.id = uuidv4()
    // This sets feedback to a new array (since I can't change react states, I have to replace them) which will include the feedback from the previous state, but also add newFeedback to it.
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  /*This function looks like it's returning HTML, but it's actually returning JSX, which is JS that allows me to treat it like HTML via "syntactic sugar".*/
  return (
    <Router>
      <Header />
      <div className="container">
        <Route exact path="/">
          <FeedbackForm handleAdd={addFeedback} />
          <FeedbackStats feedback={feedback} />
          <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
        </Route>

        <Route path="/about" component={AboutPage} />
      </div>
    </Router>
  )
}

export default App
