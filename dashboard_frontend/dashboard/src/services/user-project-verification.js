import React from 'react';

export function isLoggedIn(props) {
  if window.sessionStorage.getItem("user_id") === props.projectid {
    return (
      true
    )
  }
  return ( false )
}
