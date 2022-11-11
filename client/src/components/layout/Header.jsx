// Import React modules
import React from "react";
import { Link } from "react-router-dom";

// Import Bootstrap modules
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Import other npm modules
import { BiMoviePlay } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <BiMoviePlay className="mb-1 me-3 fs-1" />
          Movies World DVDs Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* LEFT MAIN NAVS */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/gallery">
              Movies Gallery
            </Nav.Link>
            <Nav.Link as={Link} to="/dvd">
              Our DVDs
            </Nav.Link>
            <Nav.Link as={Link} to="/dvd/search">
              Search DVDs
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
          </Nav>
          {/* RIGHT AUTH NAVS */}
          <Nav>
            {!user && (
              <Nav.Link as={Link} to="/register">
                Sign Up
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={Link} to="/login">
                Log In
              </Nav.Link>
            )}
            {user && user.isAdmin && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
            {user && (
              <Nav.Link
                className="btn btn-info btn-sm"
                role="button"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
