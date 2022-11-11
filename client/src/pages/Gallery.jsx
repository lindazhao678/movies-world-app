import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Container, Form, Row, Col } from "react-bootstrap";
import ErrorPage from "../components/common/ErrorPage";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";
import MWButton from "../components/common/MWButton";
import GalleryCards from "../components/features/galleryMenu/GalleryCards";

const StyledGallery = styled.div`
  min-height: 90vw;
  background-color: #cbd5e1;
  display: flex;
  justify-content: center;
`;

const Gallery = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const inputElement = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(inputElement.current.value);
  };

  useEffect(()=>{
    searchMovies('avengers')
  },[]);
  // search movies
  const searchMovies = async (query) => {
    try {
      if (!query) {
        return;
      }
      const res = await axios.get(
        `https://www.omdbapi.com/?&apikey=b66985aa&s=${query}&page=${page}`
      );
      if(res.data.Search){
        setMovies(res.data.Search);
        setPage(page);
      }else if(res.data.Error){
        //setError(true);
        toast.error(res.data.Error);
      }

    } catch (err) {
      console.log(err);
      setError(true);
      toast.error("Internal Server Error - Cannot retrieve data");
    }
  };

  //Conditional load: error
  if (error) {
    return (
      <Container className="text-center">
        <ErrorPage />
      </Container>
    );
  }

  return (
    <StyledGallery>
      <Container className="py-5">
        <h1 className="text-center py-1">Search Movies From OMDb</h1>
        <Form onSubmit={handleSearch}>
          <Form.Group className="mb-3">
            <Form.Label>Search Movies by title</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="search..."
                  name="title"
                  ref={inputElement}
                />
              </Col>
              <Col>
                <MWButton loadingState={loading}>
                  {loading ? "..." : "Submit"}
                </MWButton>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <GalleryCards movies={movies} />
      </Container>
    </StyledGallery>
  );
};

export default Gallery;
