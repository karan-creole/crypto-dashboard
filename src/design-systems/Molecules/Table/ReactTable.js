import React from 'react';
import { styled } from '@mui/material/styles';
import { useTable } from 'react-table';

// import makeData from './makeData';

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `;

function TableComponent(payload) {
  let columns = payload.columns.columns;
  let data = payload.columns.data;
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const Root = styled('div')(({ theme }) => ({
  padding: '1rem',
  table: {
    borderSpacing: 0,
    border: '1px solid black',
    tr: {
      lastChild: {
        td: {
          borderBottom: 0,
        },
      },
    },
    // th,
    td: {
      margin: 0,
      padding: '0.5rem',
      borderBottom: '1px solid black',
      borderRight: ' 1px solid black',

      lastChild: {
        borderRight: 0,
      },
    },
  },
}));

function ReactTable(columns, data) {
  //   const columns = React.useMemo(
  //     () => [
  //       {
  //         Header: 'Name',
  //         columns: [
  //           {
  //             Header: 'First Name',
  //             accessor: 'firstName',
  //           },
  //           {
  //             Header: 'Last Name',
  //             accessor: 'lastName',
  //           },
  //         ],
  //       },
  //       {
  //         Header: 'Info',
  //         columns: [
  //           {
  //             Header: 'Age',
  //             accessor: 'age',
  //           },
  //           {
  //             Header: 'Visits',
  //             accessor: 'visits',
  //           },
  //           {
  //             Header: 'Status',
  //             accessor: 'status',
  //           },
  //           {
  //             Header: 'Profile Progress',
  //             accessor: 'progress',
  //           },
  //         ],
  //       },
  //     ],
  //     []
  //   );

  return (
    <Root>
      <TableComponent columns={columns} data={data} />
    </Root>
  );
}

export default ReactTable;
