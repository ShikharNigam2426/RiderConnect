import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const changeValue = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    else {
      setEmail(e.target.value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post('http://localhost:2000/register', {
      username, email, password
    });
    if (result.status === 200) {
      alert("Registration successful! Redirecting to Login Page.");
      navigate('/login');
    }
    else {
      alert("Failed to register. Please try again.");
    }
  }

  return (
    <RegisterComponent>
      <div className="overlay"></div>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input type="text" name="username" onChange={(e) => changeValue(e)} placeholder="Name" />
          <input type="email" name="email" onChange={(e) => changeValue(e)} placeholder="Email" />
          <input type="password" name="password" onChange={(e) => changeValue(e)} placeholder="Password" />
          <button type="submit" onClick={(e) => { handleSubmit(e) }}>Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </RegisterComponent>
  );
};

const RegisterComponent = styled.div`
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

  a{
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

export default Register;
