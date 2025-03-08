// filepath: /Users/khyatisheth/go/safespace/safesapce/src/components/ParentTeacherRegistration.js
import React, { Component } from 'react'

class ParentTeacherRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parentemail: '',
      teacheremail: '',
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateForm()) {
      const { parentemail, teacheremail } = this.state
      try {
        fetch('http://localhost:5000/api/save_emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ parentemail, teacheremail }),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Form submitted successfully')
              // Navigate to Parent Teacher Registration page
              this.props.navigate('/parent-teacher-registration')
            } else {
              console.error('Form submission failed')
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  render() {
    return (
      <div className='common-container'>
        <h2 style={{ color: 'white' }}>Parent Teacher Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='parentEmail'>Parent Email:</label>
            <input
              type='Email'
              name='parentemail'
              id='parentemail'
              onChange={this.handleChange}
              style={{ width: 260 }}
            />
          </div>
          <div>
            <label htmlFor='teacherEmail'>Teacher Email:</label>
            <input
              type='Email'
              name='teacheremail'
              id='parentemail'
              onChange={this.handleChange}
              style={{ width: 260 }}
            />
          </div>
          <button type='submit' style={{ width: 280 }}>
            Register
          </button>
        </form>
      </div>
    )
  }
}

export default ParentTeacherRegistration
