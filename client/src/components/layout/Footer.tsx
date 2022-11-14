import React, { FC } from 'react'
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: var(--highlight-dark);
`;

const Footer: FC = () => {
  const getCurrentYear = (): number => {
    return new Date().getFullYear()
  }
  return (
    <StyledFooter>
      <div className="text-center my-2">
        Copyright &copy; {getCurrentYear()} Movies World DVDs Shop
        <a
          href="https://lijunzhao.com"
          target="_blank"
          rel="noreferrer"
          className="ms-3"
        >
          Lijun Zhao
        </a>
      </div>
    </StyledFooter>
  )
}

export default Footer
