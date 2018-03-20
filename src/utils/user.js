import React from 'react';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

export function showErrorAlert (error) {
  if (!isEmpty(error)) {
    const errorMessage = isString(error) ? error : error.data.errors[0];

    return (
      <div className='alert alert-danger' role="alert">
        { errorMessage }
      </div>
    )
  };
}

export function showSuccessAlert (success) {
  if (!isEmpty(success)) {
    return (
      <div className='alert alert-success' role="alert">
        { success }
      </div>
    )
  };
}
