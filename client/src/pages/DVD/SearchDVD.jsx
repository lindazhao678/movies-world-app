import React, { useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";

import { Container, Form, Row, Col } from "react-bootstrap";
import MWButton from "../../components/common/MWButton";
import styled from "styled-components";
// Import components
import dvdService from "../../services/dvdService";
import DVDTable from "../../components/features/DVDMenu/DVDTable";
import ErrorPage from "../../components/common/ErrorPage";
import Loader from "../../components/common/Loader";

const StyledSearch = styled.div`
  min-height: 60vw;
  background-color: #cbd5e1;
  display: flex;
  justify-content: center;
`;

const SearchDVD = () => {
  //   HOOK: CONTEXT FOR AUTH
  const { user } = useAuth();

  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const inputElement = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    searchDVDs(inputElement.current.value);
  };

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);

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
      <Container className="py-5">
        <h1 className="py-5">Search DVDs</h1>
        <Form onSubmit={handleSearch}>
          <Form.Group className="m-5" >
            <Row>
              <Col>
              <Form.Label>Search Our DVDs by Title</Form.Label>
              </Col>
              </Row>
              <Row><Col>
                <Form.Control
                  type="text"
                  placeholder="search..."
                  name="title"
                  ref={inputElement}
                /></Col><Col>
                  <MWButton loadingState={loading}>
                  {loading ? "..." : "Search"}
                </MWButton></Col>
                </Row>
          </Form.Group>
        </Form>
        {data.length > 0 && (
          <div>
            <h1 >Search Results</h1>
            <DVDTable data={data} disableSort={true} />
          </div>
        )}
      </Container>
    </StyledSearch>
  );
};

export default SearchDVD;
