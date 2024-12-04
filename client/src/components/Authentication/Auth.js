import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = (event) => {
    event.preventDefault();
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      {isLogin ? <Login /> : <Signup />}
      
      <div className="toggle-link">
        <a href="#" onClick={handleToggle}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </a>
      </div>
    </div>
  );
}

export default Auth;
