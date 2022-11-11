import React from "react";
import { Col, Row} from 'react-bootstrap'
import GalleryCard from "./GalleryCard";

const GalleryCards = ({ movies }) => {
    console.log()
  return (
    <Row>
      {movies.map((movie) => (
        <Col xs={3}>
        <GalleryCard movie={movie} />
       </Col>
      ))}
    </Row>
  );
};

export default GalleryCards;
