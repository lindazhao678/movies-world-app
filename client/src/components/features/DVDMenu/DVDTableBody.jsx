import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MWNavLink from "../../common/MWNavLink";

const Image = styled.img`
  width: 1.5rem;
  margin: 0 1rem 0 0;
`;

const StyledLink = styled(MWNavLink)`
  border-radius: 0.5rem;
  border: 1px solid var(--primary);
  color: var(--primary);
  transition: all 0.2s;
  padding: 0.3rem 1rem;
  text-decoration: none;
  margin: 0 0.4rem;
  text-align: center;
`;

const DVDTableBody = ({ data }) => {
  return (
    <tbody>
      {data.length > 0 &&
        data.map((item) => (
          <tr className="align-middle" key={item.id}>
            <td>
              <Image src={item.image} alt={item.name} />
            </td>
            <td>{item.title}</td>
            <td>{item.genre}</td>
            <td>{item.rate}</td>
            <td>{item.stock}</td>
            <td className="text-center">
              <StyledLink to={`/dvd/${item.id}`}>
                Details
              </StyledLink>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default DVDTableBody;
