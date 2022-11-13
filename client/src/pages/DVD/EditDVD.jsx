import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form, InputGroup, Container } from "react-bootstrap";
import styled from "styled-components";
import FormCard from "../../components/common/FormCard";
import dvdService from "../../services/dvdService";
import MWButton from "../../components/common/MWButton";
import ErrorPage from "../../components/common/ErrorPage";

// Custom Styles
const PreviewImage = styled.img`
  margin-top: 1rem;
  width: 15rem;
  padding: 1rem;
  border: 2px solid var(--brand);
  border-radius: 20px;
  opacity: 0.8;
`;

const EditDVD = () => {
  // REACT-ROUTER DOM HOOKS
  const params = useParams();
  const navigate = useNavigate();

  // HOOK: SETTING COMPONENT STATE (& init values)
  const [data, setData] = useState({
    id: params.id,
    title: "",
    genre: "",
    rate: 0,
    stock: 0,
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Uploaded File from Existing downloadURL
  const [uploadedFile, setUploadedFile] = useState("");
  const [preview, setPreview] = useState(true);

  // Destructure data state nested object properties & instance of useNavigate class
  const { id, title, genre, rate, stock, image } = data;

  // HOOK: Re-mount Request Prevention (React18)
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
  }, [id]);

  // FORM FUNCTIONS
  // [0] FORM PRE-POPULATION CALL
  async function fetchDVDs() {
    try {
      // (i) API FETCH CALL
      const response = await dvdService.getById(id);
      const dvd = await response.data;

      // (ii) UPDATING STATE DATA OBJECT
      setData((data) => ({
        ...data,
        ...dvd,
      }));

      // Save uploaded file glob to state
      if (!dvd.image) {
        console.log("No downloadURL provided by DB");
      } else {
        const fileGlob = dvdService.getFileFromUrl(dvd.image);
        setUploadedFile(fileGlob);
      }

      // (iii) CLEANUP FUNCTIONS
    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

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
    setPreview(false);
  };

  // [3] handleSubmit will control form submission event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API Post (refactored)
      await dvdService.put(id, data, uploadedFile);
      navigate("/dvd");
    } catch (err) {
      console.log(err?.response);
      setError(true);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    setLoading(false);
  };

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center">
        <ErrorPage />
      </Container>
    );
  }

  return (
    <FormCard title={"Add DVD"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleTextChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            as="select"
            name="genre"
            value={genre}
            onChange={handleTextChange}
          >
            <option value="">Please Select</option>
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
                  name="stock"
                  value={stock}
                  onChange={handleTextChange}
                />
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>

        {/* GROUP: CONDITIONAL PREVIEW OF IMAGE (File in DB) */}
        {preview && !loading && (
          <div className="text-center mt-2">
            <h6>Current Image</h6>
            <PreviewImage src={image} alt="preview" />
          </div>
        )}

        {/* GROUP: IMAGE UPLOAD */}
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <div className="text-center">
          <MWButton loadingState={loading}>
            {loading ? "..." : "Submit"}
          </MWButton>
        </div>
      </Form>
    </FormCard>
  );
};

export default EditDVD;
