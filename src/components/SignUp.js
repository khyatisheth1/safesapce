// filepath: /Users/khyatisheth/go/safespace/safesapce/src/components/SignUp.js
import React, { Component } from 'react'
import withNavigation from './withNavigation'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateForm = () => {
    const { username, email, password } = this.state
    let errors = {}
    let formIsValid = true

    if (!username) {
      formIsValid = false
      errors['username'] = 'Username is required.'
    }

    if (!email) {
      formIsValid = false
      errors['email'] = 'Email is required.'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false
      errors['email'] = 'Email is not valid.'
    }

    if (!password) {
      formIsValid = false
      errors['password'] = 'Password is required.'
    } else if (password.length < 6) {
      formIsValid = false
      errors['password'] = 'Password must be at least 6 characters.'
    }

    this.setState({ errors })
    return formIsValid
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateForm()) {
      const { username, email, password } = this.state
      try {
        fetch('http://localhost:5000/api/save_user_info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
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
    const { username, email, password, errors } = this.state

    return (
      <div className='common-container'>
        <h2 style={{ color: 'white' }}>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='username'>Username:</label>
            <input
              id='username'
              type='text'
              name='username'
              value={username}
              onChange={this.handleChange}
              style={{ width: 260 }}
            />
            {errors.username && <span className='error'>{errors.username}</span>}
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={this.handleChange}
              style={{ width: 260 }}
            />
            {errors.email && <span className='error'>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={this.handleChange}
              style={{ width: 260 }}
            />
            {errors.password && <span className='error'>{errors.password}</span>}
          </div>
          <button type='submit' style={{ width: 280, alignItems: 'center' }}>
            Sign Up
          </button>
        </form>
      </div>
    )
  }
}

export default withNavigation(SignUp)
