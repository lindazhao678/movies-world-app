import React, { useState, useRef } from "react";

import { Container, Form, Row, Col } from "react-bootstrap";
import MWButton from "../../components/common/MWButton";
import styled from "styled-components";
// Import components
import dvdService from "../../services/dvdService";
import DVDTable from "../../components/features/DVDMenu/DVDTable";
import ErrorPage from "../../components/common/ErrorPage";
import Loader from "../../components/common/Loader";

const StyledSearch = styled.div`
  min-height: 90vh;
  background-color: var(--highlight);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledCard = styled.div`
  margin: 0 auto;
  height: 20rem;
  width: 50rem;
  background: var(--highlight-light);
  border-radius: 20px;
`;

const SearchDVD = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const inputElement = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    searchDVDs(inputElement.current.value);
  };

  // COMPONENT FUNCTIONS
  async function searchDVDs(query) {
    try {
      const response = await dvdService.search(query);
      const data = await response.data;
      setData(data);
    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center">
        <ErrorPage />
      </Container>
    );
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <StyledSearch>
      <StyledCard>
        <h1 className="py-5 text-center">Search DVDs</h1>
        <Form onSubmit={handleSearch}>
          <Form.Group className="mx-5">
            <Row>
              <Col>
                <Form.Label className="fs-5">Search Our DVDs by Title:</Form.Label>
              </Col>
              <Col xs={6}>
                <Form.Control
                  type="text"
                  placeholder="search..."
                  name="title"
                  ref={inputElement}
                />
              </Col>
              <Col xs={2}>
                <MWButton loadingState={loading}>
                  {loading ? "..." : "Search"}
                </MWButton>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </StyledCard>
      {data.length > 0 && (
        <div>
          <h1 className="text-center mt-5">Search Results</h1>
          <DVDTable data={data} disableSort={true} />
        </div>
      )}
    </StyledSearch>
  );
};

export default SearchDVD;
