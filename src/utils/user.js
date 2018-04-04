import React from 'react';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

export function showErrorAlert (error) {
  if (!isEmpty(error)) {
    const errorMessage = isString(error) ? error : error.data.errors[0];

    return (
      <div className='alert alert-danger text-center' role="alert">
        { errorMessage }
      </div>
    );
  };
}

export function showBaseErrorAlert (error) {
  if (!isEmpty(error) && !isEmpty(error.data.error.base)) {
    const errorMessage = isString(error) ? error : error.data.error.base[0];

    return (
      <div className='alert alert-danger' role="alert">
        { errorMessage }
      </div>
    );
  };
}

export function showSuccessAlert (success, error) {
  if (!isEmpty(success) && isEmpty(error)) {
    return (
      <div className='alert alert-success alert-dismissible fade show' role="alert">
        { success }
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  };
}
