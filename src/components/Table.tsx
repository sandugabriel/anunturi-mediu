import React from 'react';
import { useTable } from 'react-table';

const TableComponent = ({ columns, data, winners }) => {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <div className=" relative z-50 -mt-10 flex h-screen w-full justify-center p-2 text-xs md:-mt-52">
      <div className="flex h-2/5 w-full justify-center overflow-y-scroll rounded-2xl bg-gray-200 p-3 md:h-1/3 md:w-3/5 lg:w-1/3">
        <table className="table-auto" {...getTableProps()}>
          <thead></thead>
          <tbody className="" {...getTableBodyProps()}>
            {rows.map((row: any, i: any) => {
              prepareRow(row);
              return (
                <tr
                  key={i}
                  label={i}
                  className={
                    winners.includes(i)
                      ? 'border-b-2 border-solid border-gray-500 bg-redc'
                      : 'border-b-2 border-solid border-gray-500'
                  }
                  id={'human_' + i.toString()}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell: any) => {
                    return (
                      <td key={cell} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
