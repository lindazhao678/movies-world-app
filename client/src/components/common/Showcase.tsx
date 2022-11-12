import React, { FC } from 'react'
import styled from "styled-components";
import { Container, Row, Col } from 'react-bootstrap'

// Custom Styles
const ShowcaseCard = styled.div`
  padding: 2rem 2rem;
  height: 25vw;
  width: 100%;
  background: var(--highlight-light);
  border-radius: 20px;
  box-shadow: 0 0 20px 8px var(--highlight);
`

const StyledImage = styled.img`
  margin-top: 1rem;
  width: 200px;
  padding: 1rem;
  opacity: 0.8;
`

interface ShowcaseProps {
  title: string
  imageURLs: string[]
}

const Showcase: FC<ShowcaseProps> = ({ title, imageURLs }) => {
  return (
    <Container className="my-5">
      <ShowcaseCard>
        <h1>{title}</h1>
        <Row>
          {imageURLs.map(imageURL => {
            return (<Col key={imageURL}>
              <a href={imageURL} target="_blank" rel="noreferrer">
                <StyledImage src={imageURL} alt="poster" />
              </a>
            </Col>)
          })}
        </Row>
      </ShowcaseCard>
    </Container>
  )
}

export default Showcase
