import React, { Component } from 'react';

export default class Spinner extends Component {
  render () {
    return (
        <div className='spinner-container'>
            <i className='fa fa-futbol-o fa-5x fa-spin' aria-hidden="true" />
        </div>
    );
  }
}
