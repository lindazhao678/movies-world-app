import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

//Import npm packages
import { Container } from "react-bootstrap";

// Import components
import dvdService from "../../services/dvdService";
import DVDTable from "../../components/features/DVDMenu/DVDTable";
import ErrorPage from "../../components/common/ErrorPage";
import Loader from "../../components/common/Loader";

const StyledPageWrapper = styled.div`
  min-height: 100vh;
  padding-top: 3rem;
  background-color: var(--highlight);
  justify-content: center;
`;

const AllDVDs = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState("rate_desc");

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);

  // HOOK: ON-LOAD SIDE EFFECTS
  useEffect(() => {
    if (effectRan.current === false) {
      fetchDVDs(null, "rate_desc");
      setLoading(false);
      // CLEAN UP FUNCTION
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  // COMPONENT FUNCTIONS
  async function fetchDVDs(e, initSortOrder) {
    try {
      const newSortOrder = initSortOrder || (sortOrder=== "rate_desc" ? "rate_asc" : "rate_desc");
      setSortOrder(newSortOrder);
      const sortArray = newSortOrder.split('_');
      const response = await dvdService.get(sortArray[0], sortArray[1]);
      const data = await response.data;
      setData(data);
    } catch (err) {
      console.log(err);
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
 
  // DEFAULT LOAD: SUCCESS API CALL
  return (
    <StyledPageWrapper>
      <h1 className="text-center">Our DVDs</h1>
      <DVDTable data={data} sortOrder={sortOrder} 
      onSort={fetchDVDs} />
    </ StyledPageWrapper>
  );
};

export default AllDVDs;
