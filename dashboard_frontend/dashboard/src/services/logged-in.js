import React from 'react';

export function isLoggedIn(props) {
  return (
    window.sessionStorage.getItem("user_id") ? true : false
  )
}
