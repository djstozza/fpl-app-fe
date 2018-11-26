import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

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
      );
    } else if (this.props.error.status === 500) {
      header = (<h2>Something went wrong</h2>);
      text = (
        <div>
          <p>Oops... Looks like there's a problem on this page.</p>
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

ErrorHandler.propTypes = {
  error: PropTypes.object,
  'error.status': PropTypes.number
}
