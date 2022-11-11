import React from 'react'
import { Card } from 'react-bootstrap'

const GalleryCard = ({movie}) => {
  return (
    <Card >
      <Card.Img variant="top" src={movie.Poster}  />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Year: {movie.Year}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default GalleryCard