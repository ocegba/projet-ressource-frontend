import React from "react";
import 'regenerator-runtime/runtime';
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { useFilters, useSortBy, usePagination } from 'react-table';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { Button, PageButton } from './Button'
import { classNames } from "./Utils";

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("active") ? "bg-green-100 text-green-700" : null,
        status.startsWith("inactive") ? "bg-yellow-100 text-yellow-700" : null,
        status.startsWith("offline") ? "bg-red-100 text-red-700" : null
      )}
    >
      {status}
    </span>
  );
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">Tous</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">Rechercher: </span>
      <input
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} enregistrements...`}
      />
    </label>
  )
}

function Table({ columns, data }) {

  const { state, preGlobalFilteredRows, setGlobalFilter, getTableProps, getTableBodyProps, headerGroups, page, prepareRow, canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable({
    columns,
    data,
  },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  // Render the UI for your table
  return (
    <>
      <div className="min-h-full bg-gray-100 text-gray-900">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="mt-4">
            {/* global search and filter */}

            <div className="flex gap-x-2">

              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />

              {headerGroups.map((headerGroup) =>
                headerGroup.headers.map((column) =>
                  column.Filter ? (
                    <div key={column.id}>
                      {column.render("Filter")}
                    </div>
                  ) : null
                )
              )}
            </div>

            {/* table */}
            <div className="mt-2 flex flex-col">
              <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        {headerGroups.map(headerGroup => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                              // Add the sorting props to control sorting. For this example
                              // we can add them into the header props
                              <th
                                scope="col"
                                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                              >
                                <div className="flex items-center justify-between">
                                  {column.render('Header')}
                                  {/* Add a sort direction indicator */}

                                </div>
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody
                        {...getTableBodyProps()}
                        className="bg-white divide-y divide-gray-200"
                      >
                        {page.map((row, i) => {
                          prepareRow(row)
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map(cell => {
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    className="px-6 py-4 whitespace-nowrap"
                                  >
                                    {cell.render('Cell')}
                                  </td>
                                )
                              })}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="py-3 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="flex gap-x-2">
                  <span className="text-sm text-gray-700">
                    Page <span className="font-medium">{state.pageIndex + 1}</span> à <span className="font-medium">{pageOptions.length}</span>
                  </span>
                  <select
                    value={state.pageSize}
                    onChange={e => {
                      setPageSize(Number(e.target.value))
                    }}
                  >
                    {[5, 10, 20].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        Voir {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <PageButton
                      className="rounded-l-md"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      <span className="sr-only">First</span>
                      <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                      onClick={() => nextPage()}
                      disabled={!canNextPage
                      }>
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                    <PageButton
                      className="rounded-r-md"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      <span className="sr-only">Last</span>
                      <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                    </PageButton>
                  </nav>
                </div>
              </div>
            </div>


            {/*  <div>
            <pre>
              <code>{JSON.stringify(state, null, 2)}</code>
            </pre>
          </div> */}

          </div>
        </main>
      </div >
    </>
  );
}

export default Table;