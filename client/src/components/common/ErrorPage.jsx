import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import errorIcon from "../../assets/errorIcon.png";

const Image = styled.img`
  width: 400px;
  margin-top: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--brand);
`;

const ErrorPage = () => {
  return (
    <Fragment>
      <Image src={errorIcon} alt="error" />
      <h2>
        Error Page:
        <StyledLink to="/">Return to Home</StyledLink>
      </h2>
    </Fragment>
  );
};

export default ErrorPage;
