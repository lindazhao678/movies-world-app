import React from "react";
import MWButton from "../../components/common/MWButton";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <div className="h-50 d-flex align-items-center justify-content-center">
        <h1>Hello Admin, Nice to see you here!</h1>
      </div>
      <div className="d-flex justify-content-center">
        <MWButton
          type="button"
          className="btn btn-info me-5"
          onClick={() => (location.href = "/dvd/add")}
        >
          Add DVDs
        </MWButton>
        <MWButton
          type="button"
          className="btn btn-info me-5"
          onClick={() => (location.href = "/dvd")}
        >
          View DVDs
        </MWButton>
        <MWButton
          type="button"
          className="btn btn-info"
          onClick={() => (location.href = "/dvd/search")}
        >
          Search DVDs
        </MWButton>
      </div>
    </Container>
  );
};

export default Dashboard;
