import React from "react";
import styled from "styled-components";

import MWNavLink from "../../common/MWNavLink";

const Image = styled.img`
  width: 1.5rem;
  margin: 0 1rem 0 0;
`;

const StyledLink = styled(MWNavLink)`
  border: 1px solid var(--primary);
  color: var(--primary);
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
              <StyledLink to={`/dvd/${item.id}`}>Details</StyledLink>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default DVDTableBody;
