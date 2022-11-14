// Import react modules
import React from "react";

//Import npm packages
import { Container } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .container {
    min-height: 80vh;
    display: flex;
    flex-direction: column;  
  }
  .lead-card {
    margin: 3rem auto;
    padding: 2rem 2rem;
    height: 65vw;
    width: 60vw;
    background: var(--highlight-light);
    border-radius: 20px;
    box-shadow: 0 0 20px 8px var(--highlight);
  }
`;

const FormCard = ({ title, children }) => (
  <Styles>
    <Container>
      <div className="lead-card">
        <h1 className="text-center">{title}</h1>
        <div>{children}</div>
      </div>
    </Container>
  </Styles>
);
export default FormCard;
