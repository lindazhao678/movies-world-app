import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Form } from "react-bootstrap";

import authService from "../../services/authService";
import AuthCard from "../../components/common/AuthCard";
import useAuth from "../../hooks/useAuth";
import MWButton from "../../components/common/MWButton";

const Login = () => {
  const { loginSaveUser } = useAuth();
  const navigate = useNavigate();

  // Hook: state init
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  //Destructure
  const { email, password } = user;

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

    // API call to write user data
    try {
      const response = await authService.login(user);
      loginSaveUser(response.data);
      navigate("/dashboard");
    } catch (e) {
      console.log(e?.response);
    }
  };

  return (
    <AuthCard title="Login">
      <Form onSubmit={handleSubmit}>
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
        <div className="text-center my-3">
          <MWButton
            variant="primary"
            type={"submit"}
            disabled={loading}
            className={loading ? "button-gradient-loading" : ""}
          >
            {loading ? "..." : "Submit"}
          </MWButton>
        </div>
      </Form>
      <p>
        If you havn't have an account, click <Link to="/register">here</Link> to
        sign up!
      </p>
    </AuthCard>
  );
};

export default Login;
