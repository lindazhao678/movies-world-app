import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

import authService from "../../services/authService";
import AuthCard from "../../components/common/AuthCard";
import useAuth from "../../hooks/useAuth";
import MWButton from "../../components/common/MWButton";

const Register = () => {
  const { loginSaveUser } = useAuth();
  const navigate = useNavigate();

  // Hook: state init
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  //Destructure
  const { username, email, password } = user;

  //Hook:useRef
  const passwordConfirmRef = useRef();

  //Form functions
  const handleTextChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Early validation: password confirm
    if (password !== passwordConfirmRef.current.value) {
      toast.error("Password do not match");
      setLoading(false);
      return;
    }

    // API call to write user data
    try {
      const response = await authService.register(user);
      loginSaveUser(response.data);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthCard title="Register">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            ref={passwordConfirmRef}
          />
        </Form.Group>
        <div className="text-center my-3">
          <MWButton
            variant="primary"
            type="submit"
            disabled={loading}
            className={loading ? "button-gradient-loading" : ""}
          >
            {loading ? "..." : "Submit"}
          </MWButton>
        </div>
      </Form>
      <p>
        If you already have an account, click <Link to="/Login">here</Link> to
        login!
      </p>
    </AuthCard>
  );
};

export default Register;
