import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./BoxTable.scss";

type DataTableProps = {
  rows?: any;
  columns?: any;
  loading?: boolean;
};
const BoxTable: React.FC<DataTableProps> = (props) => {
  return (
    <TableContainer className="box-table">
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {props.columns.map((col: any, index: number) => {
              return <TableCell key={index}>{col.label}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row: any, index: number) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {props.columns?.map((column: any) => (
                  <TableCell key={column.id}>
                    {column.icon} {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoxTable;
