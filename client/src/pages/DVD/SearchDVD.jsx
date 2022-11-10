import React, { useState } from "react";

import { Container, Form } from "react-bootstrap";
import MWButton from "../../components/common/MWButton";

const SearchDVD = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <Container>
      <h1>Search DVDs</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Search Our DVDs by Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="search..."
            name="title"
            value={query}
            onChange={handleTextChange}
          />
        </Form.Group>
        <MWButton loadingState={loading}>{loading ? "..." : "Search"}</MWButton>
      </Form>
    </Container>
  );
};

export default SearchDVD;
