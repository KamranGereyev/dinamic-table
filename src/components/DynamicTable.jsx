import React from "react";

const DynamicTable = ({ data }) => {
  const rows = data.filter((item) => item.place === "left");
  const columns = data.filter((item) => item.place === "top");

  const renderHeaderCell = (column, depth = 0) => {
    const style = {
      border: "1px solid black",
      padding: "8px",
      fontWeight: column.font_weight,
      fontStyle: column.font_style,
      textAlign: column.text_align,
      fontSize: `${column.font_size}px`,
      writingMode: column.orientation === "vertical" ? "vertical-rl" : "horizontal-tb",
    };

    return (
      <th
        key={column.name}
        style={style}
        colSpan={column.children.length || 1}
        rowSpan={column.children.length ? 1 : rows.length - depth}
      >
        {column.name}
        {column.children.length > 0 && (
          <tr>
            {column.children.map((child) => renderHeaderCell(child, depth + 1))}
          </tr>
        )}
      </th>
    );
  };


  const renderRowCell = (row, depth = 0) => {
    const style = {
      border: "1px solid black",
      padding: "8px",
      textAlign: "left",
      paddingLeft: `${depth * 20}px`,
      fontWeight: row.font_weight,
      fontStyle: row.font_style,
      fontSize: `${row.font_size}px`,
      writingMode: row.orientation === "vertical" ? "vertical-rl" : "horizontal-tb",
    };

    return (
      <React.Fragment key={row.name}>
        <tr>
          <td
            style={style}
            colSpan={row.children.length ? 1 : columns.length - depth}
            rowSpan={row.children.length || 1}
          >
            {row.name}
          </td>
          {row.children.length > 0 && (
            <tr>
              {row.children.map((child) => renderRowCell(child, depth + 1))}
            </tr>
          )}
        </tr>
      </React.Fragment>
    );
  };

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }} rowSpan={rows.length + 1}>Serial #</th>
          {columns.map((column) => renderHeaderCell(column))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            {renderRowCell(row)}
            {columns.map((column, index) => (
              <td key={`${row.name}-${column.name}-${index}`} style={{ border: "1px solid black", padding: "8px" }}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
