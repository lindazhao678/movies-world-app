import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import DVDTableHeader from "./DVDTableHeader";
import DVDTableBody from "./DVDTableBody";

const StyledTable = styled(Table)`
  width: 70%;
  margin: 0 auto;
`
const DVDTable = ({ data, sortOrder, onSort, disableSort }) => {
  return (
    <StyledTable striped bordered hover variant="dark" className="mt-5">
      <DVDTableHeader sortOrder={sortOrder} onSort={onSort} disableSort={disableSort} />
      <DVDTableBody data={data} />
    </StyledTable>
  );
};

export default DVDTable;