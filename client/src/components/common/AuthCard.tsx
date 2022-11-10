// Import react modules
import React, { FC } from "react";

//Import npm packages
import { Container } from "react-bootstrap";
import styled from "styled-components";

interface AuthCardProps {
  title: string;
  children: JSX.Element|JSX.Element[];
}

const Styles = styled.div`
  .container {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
  }
  .lead-card {
    margin: auto;
    padding: 2rem;
    background-color: var(--primary);
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    min-width: "30vw";
    text-align: center;
  }
  .lead-card .card-title {
    padding-bottom: 1rem;
    font-size: 2em;
    font-weight: 600;
  }
`;

const AuthCard: FC<AuthCardProps> = ({ title, children }) => (
  <Styles>
    <Container>
      <div className="lead-card">
        <p className="card-title">{title}</p>
        <div>{children}</div>
      </div>
    </Container>
  </Styles>
);
export default AuthCard;
