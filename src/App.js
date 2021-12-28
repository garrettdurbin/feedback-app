import { useState } from 'react'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackData from './data/FeedbackData'

function App() {
  /*Below, I'm using the hook useState. The name is the first param. The second param is the function to update this piece of state. You normally call the function "set" + "whatever your setting".*/
  const [feedback, setFeedback] = useState(FeedbackData)

  /*This function looks like it's returning HTML, but it's actually returning JSX, which is JS that allows me to treat it like HTML via "syntactic sugar".*/
  return (
    <>
      <Header />
      <div className="container">
        <FeedbackList feedback={feedback} />
      </div>
    </>
  )
}

export default App
