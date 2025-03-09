// filepath: /Users/khyatisheth/go/safespace/safesapce/src/components/CheckForFlaggedContent.js
import React, { Component } from 'react'

class CheckForFlaggedContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      content: '',
      toxicityFlagged: false,
      score: 0,
      loading: false,
    }
  }

  fetchFlaggedContent = () => {
    this.setState({ loading: true, clicked: true })
    let headers = new Headers()

    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')

    headers.append('Access-Control-Allow-Origin', '*')
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    headers.append('Access-Control-Allow-Credentials', 'true')
    headers.append('Access-Control-Expose-Headers', 'Content-Type, Authorization')
    headers.append('GET', 'POST', 'OPTIONS')
    fetch('http://localhost:5000/api/check_flagged_content', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ content: 'You are a stupid person' }),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data)
          console.log(data.toxicity)
          console.log(data.content)
          this.setState({
            content: data.content,
            toxicityFlagged: data['Toxicity Flagged'],
            score: data.score,
            loading: false,
          })
        })
      })
      .catch((error) => {
        console.error('Error:', error)
        this.setState({ loading: false })
      })
  }

  render() {
    const { content, toxicityFlagged, score, loading, clicked } = this.state

    return (
      <div className='common-container' align='center'>
        <h2 style={{ color: 'white' }}>Check for Latest Flagged Chat Content</h2>
        <button onClick={this.fetchFlaggedContent} style={{ width: '200PX', height: '50px' }}>
          Fetch Latest
        </button>
        {loading ? (
          <div>
            <p>Loading...</p>
            <progress />
          </div>
        ) : (
          <div>
            <div style={{ display: content ? 'show' : 'none' }}>
              <label>Content that was Flagged: </label>
              <textarea value={content} readOnly style={{ width: '200PX', height: '100px' }} />
            </div>
            <div style={{ display: clicked && toxicityFlagged ? 'show' : 'none' }}>
              <label>Toxicity Flagged: </label>
              <input
                style={{ color: toxicityFlagged != 'None' ? 'red' : 'black' }}
                type='text'
                value={clicked ? (toxicityFlagged == 'None' ? 'No' : 'Yes') : ''}
                readOnly
              />
            </div>
            <div style={{ display: 'none' }}>
              <label>Score: </label>
              <input type='text' value={clicked ? score : ''} readOnly />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default CheckForFlaggedContent
// export default withNavigation(CheckForFlaggedContent)
