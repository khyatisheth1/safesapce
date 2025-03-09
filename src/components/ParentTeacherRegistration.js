// filepath: /Users/khyatisheth/go/safespace/safesapce/src/components/ParentTeacherRegistration.js
import React, { Component } from 'react'
import withNavigation from './withNavigation'
import PropTypes from 'prop-types'

class ParentTeacherRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parentemail: '',
      teacheremail: '',
      errors: {},
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateForm = () => {
    const { parentemail, teacheremail } = this.state
    let errors = {}
    let formIsValid = true
    if (!parentemail) {
      formIsValid = false
      errors['parentemail'] = 'Email is required.'
    } else if (!/\S+@\S+\.\S+/.test(parentemail)) {
      formIsValid = false
      errors['parentemail'] = 'Email is not valid.'
    }

    if (!teacheremail) {
      formIsValid = false
      errors['teacheremail'] = 'Email is required.'
    } else if (!/\S+@\S+\.\S+/.test(teacheremail)) {
      formIsValid = false
      errors['teacheremail'] = 'Email is not valid.'
    }

    this.setState({ errors })
    return formIsValid
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateForm()) {
      const { parentemail, teacheremail } = this.state
      try {
        let headers = new Headers()

        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')

        headers.append('Access-Control-Allow-Origin', '*')
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        headers.append('Access-Control-Allow-Credentials', 'true')
        headers.append('Access-Control-Expose-Headers', 'Content-Type, Authorization')
        headers.append('GET', 'POST', 'OPTIONS')
        fetch('http://localhost:5000/api/save_emails', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ parentemail, teacheremail }),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Parent Teacher Form submitted successfully')
              // Navigate to Parent Teacher Registration page
              this.props.navigate('/check-for-flagged-content')
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
ParentTeacherRegistration.propTypes = {
  navigate: PropTypes.func.isRequired,
}

export default withNavigation(ParentTeacherRegistration)
