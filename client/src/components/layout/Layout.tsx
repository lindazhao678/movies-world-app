import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

// Import npm packages
import styled from 'styled-components'

// Import custom components
import Header from './Header'
import Footer from './Footer'

const AppWrap = styled.div`
  flex: 1;
  margin: 0;
`
const layout: FC = () => {
  return (
    <div className="app">
      <Header />
      <AppWrap>
        <Outlet />
      </AppWrap>
      <Footer />
    </div>
  )
}

export default layout
