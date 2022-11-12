import React, { Fragment } from "react";
import styled from "styled-components";
// Import npm packages
import MWNavLink from "../components/common/MWNavLink";
import Showcase from "../components/common/Showcase";
import { getNewArrivalsData, getTopPicksData } from "../services/homePageData";

const Hero = styled.div`
  height: 25vw;
  background-color: var(--highlight);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const getNewArrivalsImgaeURLs = () => {
  return getNewArrivalsData().map((data) => data.image);
};
const TopPicksImageURLs = () => {
  return getTopPicksData().map((data) => data.image);
};

const Home = () => {
  return (
    <Fragment>
      <Hero>
          <h1 className="my-5">Welcome to the Movies World DVDs Shop</h1>
          <MWNavLink to={"/register"} className={'my-5'}>
            Sign Up
          </MWNavLink>
      </Hero>
      <Showcase
        title={"Our New Arrival"}
        imageURLs={getNewArrivalsImgaeURLs()}
      />
      <Showcase title={"Our Top Picks"} imageURLs={TopPicksImageURLs()} />
    </Fragment>
  );
};

export default Home;
