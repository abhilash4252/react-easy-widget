import React, { useState } from 'react'
import axios from 'axios'

const FeedbackForm = ({ setShowForm, id }) => {
  const [sendingEmail, setSendingEmail] = useState(false)
  const [feedback, setFeedback] = useState('')
  let submitClasses = 'submit'

  const setDisabledAndAlterClass = () => {
    if (feedback === '') {
      submitClasses = 'submit'
      return true
    } else {
      submitClasses += ' submit-onfocus'
      return false
    }
  }

  const clearInput = () => {
    setShowForm(false)
    setFeedback('')
  }

  const handleChange = (e) => {
    setFeedback(e.target.value)
  }

  const handleSubmit = () => {
    setSendingEmail(true)
    axios
      .post('https://easy-widget.vercel.app/api/sendEmail', {
        feedback,
        id
      })
      .then(function (response) {
        if (response.status === 200) {
          setSendingEmail(false)
          setShowForm(false)
        }
      })
      .catch(function (error) {
        console.error(error)
        setSendingEmail(false)
      })
    // console.log(feedback)
  }

  return (
    <div id='content' className='my-widget-content'>
      <label className='top-label'>
        <h2>Tell us anything!</h2>
      </label>
      <button className='close-btn' onClick={clearInput}>
        <img src='https://img.icons8.com/small/16/000000/multiply.png' />
      </button>
      <textarea
        name='text'
        id='feedback'
        className='input-box'
        placeholder='What do you want us to know?'
        onChange={handleChange}
        value={feedback}
      ></textarea>
      <button
        id='submit-btn'
        disabled={setDisabledAndAlterClass()}
        className={submitClasses}
        onClick={handleSubmit}
      >
        Send Feedback
      </button>
    </div>
  )
}

export default FeedbackForm
