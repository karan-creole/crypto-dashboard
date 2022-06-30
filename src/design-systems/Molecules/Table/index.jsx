import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import { useTable } from "react-table";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import TablePaginationActions from "./TablePaginationActions";
import { Paper } from "@mui/material";

function DataTable({
  columns,
  data = [],
  loading,
  style,
  className,
  paginate,
  pageActions,
  pageSize = 20,
  pageIndex = 0,
  onPageChange,
  handleChangeRowsPerPage,
  totalRecords,
}) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const spring = React.useMemo(
    () => ({
      type: "spring",
      damping: 50,
      stiffness: 100,
    }),
    []
  );

  const Styles = styled("div")(({ theme }) => ({
    table: {
      borderSpacing: 0,
      border: "1px solid black",

      tr: {
        td: {
          padding: "0.5rem",
          textAlign: "center",
        },
        lastChild: {
          borderBottom: 0,
        },
      },

      th: {
        fontSize: "1.5rem",
        lineHeight: "1.75rem",
        fontWeight: "600",
        whiteSpace: "pre-line",
        td: {
          margin: 0,
          padding: "0.5rem",
          borderBottom: "1px solid black",
          borderRight: "1px solid black",
          background: "white",

          lastChild: {
            borderRight: 0,
          },
        },
      },
    },
  }));

  return (
    <Paper sx={{ width: "100%", overflow: "scroll" }}>
      <Table
        size="small"
        {...getTableProps()}
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead className="font-extrabold">
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps()}
                  align="center"
                  className="!text-md border-2"
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        {data.length > 0 && (
          <TableBody>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps({
                    layoutTransition: spring,
                    exit: { opacity: 0, maxHeight: 0 },
                  })}
                >
                  {/* <TableRow {...row.getRowProps()}> */}
                  {row.cells.map((cell) => {
                    return (
                      <td
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        {...cell.getCellProps({
                          layoutTransition: spring,
                        })}
                        className="!text-xs border-2"
                      >
                        {/* <TableCell {...cell.getCellProps()} align="center"> */}
                        {cell.render("Cell")}
                        {/* </TableCell> */}
                      </td>
                    );
                  })}
                  {/* </TableRow> */}
                </tr>
              );
            })}
          </TableBody>
        )}
      </Table>
      {paginate && pageActions && (
        <TablePagination
          component="div"
          classes={{
            root: "shrink-0 border-t-1",
          }}
          rowsPerPageOptions={[5, 10, 25]}
          colSpan={5}
          count={totalRecords}
          rowsPerPage={pageSize}
          page={pageIndex}
          SelectProps={{
            inputProps: { 'aria-label': 'test' },
            native: false,
          }}
          labelRowsPerPage='test'
          onPageChange={onPageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      )}
      {paginate && !pageActions && (
        <TablePagination
          component="div"
          classes={{
            root: "shrink-0 border-t-1",
          }}
          rowsPerPageOptions={[5, 10, 25]}
          colSpan={5}
          count={totalRecords}
          rowsPerPage={pageSize}
          page={pageIndex}
          SelectProps={{
            inputProps: { 'aria-label': 'test' },
            native: false,
          }}
          labelDisplayedRows={(from,to,count) => `${pageSize*pageIndex} - ${(pageSize*pageIndex)+pageSize}`}
          onPageChange={onPageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {loading ? (
        <div className="text-center py-12">
          <CircularProgress />
        </div>
      ) : (
        !loading &&
        data.length === 0 && (
          <Typography className="py-16 text-center" variant="h6">
            No Records
          </Typography>
        )
      )}
    </Paper>
  );
}

export default DataTable;
