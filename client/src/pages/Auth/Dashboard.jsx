import React from "react";
import MWButton from "../../components/common/MWButton";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const StyledDashboard = styled.div`
  min-height: 50vw;
  background-color: #cbd5e1;
  display: flex;
  justify-content: center;
`;

const Dashboard = () => {
  return (
    <StyledDashboard>
    <Container className="py-5">
      <div className="h-50 d-flex align-items-center justify-content-center">
        <h1>Hello Admin, Nice to see you here!</h1>
      </div>
      <div className="d-flex justify-content-evenly">
        <MWButton
          type="button"
          onClick={() => (location.href = "/dvd/add")}
        >
          Add DVDs
        </MWButton>
        <MWButton
          type="button"
          onClick={() => (location.href = "/dvd")}
        >
          View DVDs
        </MWButton>
        <MWButton
          type="button"
          onClick={() => (location.href = "/dvd/search")}
        >
          Search DVDs
        </MWButton>
      </div>
      </Container>
    </StyledDashboard>
  );
};

export default Dashboard;
