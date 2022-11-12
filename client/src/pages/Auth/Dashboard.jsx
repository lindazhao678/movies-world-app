import React from "react";
import MWButton from "../../components/common/MWButton";
import styled from "styled-components";

const StyledDashboard = styled.div`
  min-height: 90vh;
  background-color: #cbd5e1;
  display: flex;
  justify-content: center;
`;

const StyledCard = styled.div`
  margin: 10rem auto;
  height: 20rem;
  width: 50rem;
  background: var(--highlight-light);
  border-radius: 20px;
`;

const Dashboard = () => {
  return (
    <StyledDashboard>
      <StyledCard>
        <div className="h-50 d-flex align-items-center justify-content-center">
          <h1>Hello Admin, Nice to see you here!</h1>
        </div>
        <div className="d-flex justify-content-evenly">
          <MWButton type="button" onClick={() => (location.href = "/dvd/add")}>
            Add DVDs
          </MWButton>
          <MWButton type="button" onClick={() => (location.href = "/dvd")}>
            View DVDs
          </MWButton>
          <MWButton
            type="button"
            onClick={() => (location.href = "/dvd/search")}
          >
            Search DVDs
          </MWButton>
        </div>
      </StyledCard>
    </StyledDashboard>
  );
};

export default Dashboard;
