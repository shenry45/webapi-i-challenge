import React from 'react';
import axios from 'axios';

import User from './User';

class UserList extends React.Component {
  state = {
    users: []
  }

  deleteUser = e => {
    e.preventDefault();

    // call API delete user by id
  }

  getUsers = () => {    
    axios
      .get('http://localhost:4000/api/users/')
      .then(res => {
        console.log(res.data.resp);
        this.setState({ users: [ ...res.data.resp ] });
      })
      .catch(err => console.log(err));
  }
  
  componentDidMount() {
    this.getUsers();
  }

  render() {
    console.log(this.state);

    return (
      <div className="user-list">
        {
          this.state.users.length > 0 ?
            this.state.users.map(user => <User key={user.id} user={user} />)
          :
            <p>The users can not be found.</p>
        }
      </div>
    )
  }
}

export default UserList;