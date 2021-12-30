import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

/*Below, ReactDOM is a method I got from importing ReactDOM or React (above). This method allows me to render whatever I have in my root App component to my index.html page under the element with the Id of 'root'.*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
