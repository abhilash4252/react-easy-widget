import React, { useState, useEffect } from 'react'
import { Drawer, Button, Form, Input, Alert } from 'antd'
import axios from 'axios'
import styles from './styles.module.css'
import classes from './styles.module.css'

export const EasyWidget = ({ id }) => {
  const [showFeedbackButton, setShowFeedbackButton] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const [feedback, setFeedback] = useState('')
  const [form] = Form.useForm()

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

  const showDrawer = () => {
    setShowForm(true)
  }
  const onClose = () => {
    setShowForm(false)
  }

  const handleSubmit = (values) => {
    console.log(values)
    setSendingEmail(true)
    axios
      .post('https://easy-widget.vercel.app/api/sendEmail', {
        ...values,
        id: id
      })
      .then(function (response) {
        if (response.status === 200) {
          setSendingEmail(false)
          form.resetFields()
          setShowAlert(true)
          setShowForm(false)
          setTimeout(() => {
            setShowAlert(false)
          }, 5000)
        }
      })
      .catch(function (error) {
        console.error(error)
        setSendingEmail(false)
      })
  }

  const handleAlertClose = () => {
    setShowAlert(false)
  }

  return (
    <div>
      {showAlert ? (
        <Alert
          message='Your feedback has submitted successfully!'
          type='success'
          closable
          afterClose={handleAlertClose}
        />
      ) : null}
      {showFeedbackButton && (
        <div>
          <Button
            type='primary'
            onClick={showDrawer}
            className={styles.feedbackButton}
          >
            Feedback
          </Button>
          <Drawer
            title='Provide your Feedback'
            placement='right'
            onClose={onClose}
            visible={showForm}
          >
            <Form onFinish={handleSubmit} form={form}>
              <Form.Item
                name='feedback'
                rules={[
                  { required: true, message: 'Please Enter your Feedback!' }
                ]}
              >
                <Input.TextArea
                  row={4}
                  placeholder='Enter Your Feedback here'
                />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' loading={sendingEmail}>
                  Send Feedback
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
        </div>
      )}
    </div>
  )
}
