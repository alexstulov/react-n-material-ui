import React from 'react';

import './App.css';
import UserForm from "./components/UserForm";
import PromiseComponent from './components/PromiseComponent';

function App() {
  return (
    <div className="App">
        <PromiseComponent />
      <UserForm/>
    </div>
  );
}

export default App;
