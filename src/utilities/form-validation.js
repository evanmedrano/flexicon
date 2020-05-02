import React from 'react';
import { isEmail } from 'validator';

export function required(value) {
  if (!value) {
    return (
      <div className="custom-alert custom-alert--danger">
        This field is required!
      </div>
    )
  }
}

export function email(value) {
  if (!isEmail(value)) {
    return (
      <div className="custom-alert custom-alert--danger">
        This is not a valid email.
      </div>
    )
  }
}

export function password(value) {
  if (value.length < 6) {
    return (
      <div className="custom-alert custom-alert--danger">
        The password must be at least 6 characters.
      </div>
    )
  }
}
