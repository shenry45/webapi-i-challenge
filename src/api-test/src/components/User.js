import React from 'react';

const User = props => {
  return (
    <div className="user">
      <p>Name: {props.user.name}<br />Bio: "{props.user.bio}"</p>
      <button className={`${props.user.id}`} onClick={props.deleteUser}>DELETE</button>
    </div>
  )
}

export default User;