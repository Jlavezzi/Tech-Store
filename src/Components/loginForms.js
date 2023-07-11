import React, { useRef } from 'react';
 import './Styles/loginForm.css'; // Import the CSS files

const LoginForm = ({ onLogin }) => {
  const formRef = useRef(null);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    if (e.target.form !== formRef.current) {
      alert('Input from external source is not allowed');
      return;
    }

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    onLogin(username, password);
  };

  return (
    <div className="login-form">
      <h2>Login Page</h2>
      <form ref={formRef} onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          ref={usernameRef}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
