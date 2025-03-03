import React, { Component } from 'react'

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

  handleSubmit = async (e) => {
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
              // Handle successful form submission (e.g., show a success message, clear the form, etc.)
            } else {
              console.error('Form submission failed')
              // Handle form submission failure (e.g., show an error message)
            }
          })
          .catch((error) => {
            console.error('Error:', error)
            // Handle network or other errors
          })
      } catch (error) {
        console.error('Error:', error)
        // Handle network or other errors
      }
    }
    console.log('Form submitted successfully')
  }

  render() {
    const { username, email, password, errors } = this.state

    return (
      <div className='signup-container'>
        <h2 style={{ color: 'white' }}>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type='text' name='username' value={username} onChange={this.handleChange} />
            {errors.username && <span className='error'>{errors.username}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input type='email' name='email' value={email} onChange={this.handleChange} />
            {errors.email && <span className='error'>{errors.email}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input type='password' name='password' value={password} onChange={this.handleChange} />
            {errors.password && <span className='error'>{errors.password}</span>}
          </div>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignUp
