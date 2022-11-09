import React, { FC } from 'react'

import { Container, Row, Col } from 'react-bootstrap'

interface ShowcaseProps {
  title: string
  imageURLs: string[]
}

const Showcase: FC<ShowcaseProps> = ({ title, imageURLs }) => {
  return (
    <Container>
      <h1>{title}</h1>
      <Row>
        {imageURLs.map(imageURL => {
          return (<Col key={imageURL}>
            <a href={imageURL} target="_blank" rel="noreferrer">
              <img src={imageURL} />
            </a>
          </Col>)
        })}
      </Row>
    </Container>
  )
}

export default Showcase
