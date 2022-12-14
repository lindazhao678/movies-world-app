import React from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const columns = [
  { path: "image", label: "poster" },
  { path: "title", label: "title" },
  { path: "genre", label: "genre" },
  { path: "rate", label: "rate" },
  { path: "stock", label: "stock" },
  { key: "detail-button", label: "" },
];

const DVDTableHeader = ({ onSort, sortOrder, disableSort }) => {
  const renderSortIcon = () => {
    if (sortOrder === "rate_desc") return <FaSortDown />;
    return <FaSortUp />;
  };
  return (
    <thead>
      <tr>
        {columns.map((column) =>
          disableSort ? (
            <th key={column.path || column.key}>{column.label}</th>
          ) : (
            <th
              key={column.path || column.key}
              className={column.path === "rate" && "cursor-pointer"}
              onClick={onSort}
            >
              {column.label} {column.path === "rate" && renderSortIcon()}
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

export default DVDTableHeader;
