import React from 'react';

export function isProjectOwner(owner) {
  if (window.sessionStorage.getItem("user_id") === owner) {
    return (
      true
    )
  }
  return ( false )
}
