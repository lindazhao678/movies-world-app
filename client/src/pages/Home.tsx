import React, { FC } from 'react'

// Import npm packages
import Container from 'react-bootstrap/Container'
import MWButton from '../components/common/MWButton'
import Showcase from '../components/common/Showcase'

const Home: FC = () => {
  const arrivalsImageURLs: string[] = ['a']
  const topPicksImageURLs: string[] = []

  return (
    <Container>
      <div>Welcome to the Movies World DVDs Shops</div>
      <MWButton value={'Sign Up'}/>
      <Showcase title={'Our New Arrival'} imageURLs={arrivalsImageURLs} />
      <Showcase title={'Our Top Picks'} imageURLs={topPicksImageURLs} />
    </Container>
  )
}

export default Home
