import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    else {
      setPassword(e.target.value);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await axios.post('http://localhost:2000/login', {
      email, password
    });
    if (result.status === 200) {
      alert("Login successful, Token: " + result.data);
      const token = result.data;  // get token from response data
      Cookies.set('token', token, { expires: 1, path: '' });  // expires: 1 means token expires in 1 day
      navigate('/');
    }
    else {
      throw new Error("Enter correct email and password");
    }
  }

  return (
    <LoginComponent>
      <div className="overlay"></div>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={(e) => { handleLogin(e) }}>
          <input type="email" name="email" onChange={(e) => { handleChange(e) }} placeholder="Email" />
          <input type="password" name="password" onChange={(e) => { handleChange(e) }} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </LoginComponent>
  );
};

const LoginComponent = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url("./assets/s1000rr.jpg") no-repeat center center/cover;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  .form-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    color: white;
    width: 350px;
    position: relative;
    z-index: 1;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  input {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    outline: none;
  }

  input::placeholder {
    color: #ddd;
  }

  button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    background: #00c6ff;
    color: white;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background: #0072ff;
  }

  p {
    margin-top: 15px;
    font-size: 14px;
  }

  a {
    color: #00c6ff;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .form-container {
      width: 90%;
    }
  }
`;

export default Login;