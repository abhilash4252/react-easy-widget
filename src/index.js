import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FeedbackForm from './components/FeedbackForm'

export const EasyWidget = ({ id }) => {
  const [showFeedbackButton, setShowFeedbackButton] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    axios
      .post('https://easy-widget.vercel.app/api/validateWidget', { id: id })
      .then(function (response) {
        if (response.status === 200) {
          setShowFeedbackButton(true)
        }
      })
      .catch(function (error) {
        setShowFeedbackButton(false)
        console.error(error)
        console.error('Error initializing Easy Widget')
      })
  }, [])

  const expandWidget = () => {
    setShowForm(true)
  }

  return (
    <div>
      {showFeedbackButton && (
        <div id='easyWidget'>
          <center>
            <div id='myWidget' className='my-widget'>
              {showForm ? (
                <FeedbackForm setShowForm={setShowForm} id={id} />
              ) : null}
              <button onClick={expandWidget} className='feedback-btn'>
                Give Feedback
              </button>
            </div>
          </center>
        </div>
      )}
    </div>
  )
}
