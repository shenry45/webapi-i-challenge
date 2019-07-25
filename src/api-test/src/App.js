import React from 'react';
import './App.css';

import ControlPanel from './components/ControlPanel';
import UserList from './components/UserList';

const App = () => {
  return (
    <div className="App">
      <p>Welcome to the user API testing React App!</p>
      <ControlPanel />
      <UserList />
    </div>
  );
}

export default App;
