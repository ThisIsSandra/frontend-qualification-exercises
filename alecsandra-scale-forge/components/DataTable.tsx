"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");

  // 🔹 Fallback formatter
  const displayValue = (val: any) => {
    if (val === undefined || val === null) return "--";
    if (typeof val === "string" && val.trim().length === 0) return "--";
    if (Array.isArray(val) && val.length === 0) return "--";
    return val;
  };

  // 🔹 Default column applies to all columns unless overridden
  const defaultColumn: Partial<ColumnDef<TData, any>> = {
    cell: ({ getValue }) => displayValue(getValue()),
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* 🔍 Search */}
      <input
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search members..."
        className="p-2 border rounded w-full bg-[#0B1D26]"
      />

      {/* 📋 Table */}
      <div className="overflow-x-auto shadow border border-[#2E2E2E]">
        <table className="min-w-full bg-[#0B1D26]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-[24px] py-3 text-left font-medium text-[#667085]"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-[#0C1820]">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-5 px-[24px] border-b border-[#2E2E2E] text-[#667085] text-left"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📑 Pagination */}
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
