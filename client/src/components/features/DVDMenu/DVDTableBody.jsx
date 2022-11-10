import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Image = styled.img`
  width: 1.5rem;
  margin: 0 1rem 0 0;
`;

const StyledLink = styled(Link)`
  width: 7rem;
  height: 2rem;
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
            <td>
              <StyledLink className="btn btn-light" to={`/dvd/${item.id}`}>
                Details
              </StyledLink>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default DVDTableBody;
