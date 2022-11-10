import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";

import dvdService from "../../services/dvdService"
import MWButton from "../../components/common/MWButton";

const AddDVD = () => {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState({
    title: "",
    genre: "",
    rate: 0,
    stock: 0,
    image: "",
  });
  const [loading, setLoading] = useState(false);

  // Destructure data state nested object properties & instance of useNavigate class
  const { title, genre, rate, stock, image } = data;
  const navigate = useNavigate();

  // FORM FUNCTIONS
  // [1] handleTextChange will handle change in state value event for TEXT data
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    let pair = {};
    pair[name] = value;
    setData({
      ...data, // Spread/copy the object to prevent it being overwritten by new state
      ...pair, // Overwrite the values of the fields (which match the "name" attribute) to update
    });
  };

  // [2] handleFileChange will handle change in state for the file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData({
      ...data,
      image: file,
    });
  };

  // [3] handleSubmit will control form submission event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API Post (refactored)
      const response = await dvdService.post(data);
      navigate("/dvd");
    } catch (err) {
      console.log(err?.response);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    setLoading(false);
  };

  return (
    <Container>
      <h1 className="text-center my-5">Add DVD</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            name="name"
            value={title}
            onChange={handleTextChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            as="select"
            placeholder="Select a Genre"
            name="genre"
            value={genre}
            onChange={handleTextChange}
          >
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
            </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Form.Label>Rate</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Enter rate"
                  name="rate"
                  value={rate}
                  onChange={handleTextChange}
                />
              </InputGroup>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <Form.Label>Stock</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Enter stock"
                  name="stock"
                  value={stock}
                  onChange={handleTextChange}
                />
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            className="mb-4"
            onChange={handleFileChange}
          />
        </Form.Group>

        <MWButton loadingState={loading}>{loading ? "..." : "Submit"}</MWButton>
      </Form>
    </Container>
  );
};

export default AddDVD;