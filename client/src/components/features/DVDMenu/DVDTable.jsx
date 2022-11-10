import React from "react";
import { Table } from "react-bootstrap";

import DVDTableHeader from "./DVDTableHeader";
import DVDTableBody from "./DVDTableBody";

const DVDTable = ({ data, sortOrder, onSort }) => {
  return (
    <Table striped bordered hover variant="dark" className="my-4">
      <DVDTableHeader sortOrder={sortOrder} onSort={onSort} />
      <DVDTableBody data={data} />
    </Table>
  );
};

export default DVDTable;