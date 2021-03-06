import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutIconLink from './components/AboutIconLink'
import AboutPage from './Pages/AboutPage'
import { FeedbackProvider } from './context/FeedbackContext'

function App() {
  /*This function looks like it's returning HTML, but it's actually returning JSX, which is JS that allows me to treat it like HTML via "syntactic sugar".*/
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/React_Feedback_App.html"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>

            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  )
}

export default App
