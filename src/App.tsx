import React from 'react';

import './App.css';
import UserForm from "./components/UserForm";
import PromiseComponent from './components/PromiseComponent';
import GithubProfile from "./components/github-profile/GithubProfile";

function App() {
  return (
    <div className="App">
      <UserForm/>
        <PromiseComponent />
        <GithubProfile />
    </div>
  );
}

export default App;
