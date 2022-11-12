// Import react modules
import React, { FC } from "react";

//Import npm packages
import { Container } from "react-bootstrap";
import styled from "styled-components";

interface AuthCardProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

const Styles = styled.div`
  .container {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
  }
  .lead-card {
    margin: 3rem auto;
    padding: 2rem 2rem;
    width: 30vw;
    background: var(--highlight-light);
    border-radius: 20px;
    box-shadow: 0 0 20px 8px var(--highlight);

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
        <h1 className="card-title text-center my-3">{title}</h1>
        <div>{children}</div>
      </div>
    </Container>
  </Styles>
);
export default AuthCard;
