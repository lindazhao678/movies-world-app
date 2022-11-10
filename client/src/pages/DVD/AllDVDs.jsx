import React, { useEffect, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";

// Import npm packages
import { Container } from "react-bootstrap";

// Import components
import dvdService from "../../services/dvdService";
import DVDTable from "../../components/features/DVDMenu/DVDTable";
import ErrorPage from "../../components/common/ErrorPage";
import Loader from "../../components/common/Loader";

const AllDVDs = () => {
  // HOOK: CONTEXT FOR AUTH
  const { user } = useAuth();

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
      fetchDVDs();
      setLoading(false);
      // CLEAN UP FUNCTION
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  // COMPONENT FUNCTIONS
  async function fetchDVDs() {
    try {
      const response = await dvdService.get();
      const data = await response.data;
      setData(data);
      sort(null, "rate_desc", data);
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
  function sort(e, initSortOrder, initData) {
    const newSortOrder = initSortOrder || (sortOrder=== "rate_desc" ? "rate_asc" : "rate_desc");
    setSortOrder(newSortOrder);
    const newData = initData || data;
    newData.sort(function (a, b) {
      if (newSortOrder === "rate_desc") {
        return b.rate - a.rate;
      } else {
        return a.rate - b.rate;
      }
    });
    setData(newData);
  }
 
  // DEFAULT LOAD: SUCCESS API CALL
  return (
    <Container>
      <h1>Our DVDs</h1>
      <DVDTable data={data} sortOrder={sortOrder} onSort={sort} />
    </Container>
  );
};

export default AllDVDs;
