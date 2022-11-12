import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  margin: 0 auto;
  height: 30rem;
  padding: 1rem;
  background: var(--highlight-light);
  border-radius: 20px;
`;

const GalleryCard = ({ movie }) => {
  return (
    <StyledCard>
      <Card.Img variant="top" src={movie.Poster} style={{ height: '20rem' }}/>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Year: {movie.Year}</Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default GalleryCard;
