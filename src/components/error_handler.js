import React, { Component } from 'react';
import { Redirect } from 'react-router'

export default class ErrorHandler extends Component {
  render () {
    let header;
    let text;

    if (this.props.error && this.props.error.status === 401) {
      return <Redirect to='/login' error={ this.props.error }/>
    }

    if (!this.props.error || this.props.error.status === 404) {
      header = (<h2>Page Not Found</h2>);
      text = (
          <div>
              <p>The page you were looking for does not exist.</p>
              <p>You may have mistyped the address or the page may have moved.</p>
          </div>
      )
    }

    return (
        <div className='gif-container'>
            <div className="gif-background" />
            <div className='message-container'>
                { header }
                { text }
            </div>
        </div>
    );
  }
}
