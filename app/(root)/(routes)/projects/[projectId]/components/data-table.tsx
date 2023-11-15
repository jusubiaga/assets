"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  CreditCard,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { type } from "os";
import { Assets, Project } from "@prisma/client";

type DataTableProps = {
  project: Project;
};

// export type Assets = {
//   id: string;
//   projectId: string;
//   status: string;
//   headline: string;
//   subline: string;
//   backgraundColor: string;
//   headlineColor: string;
//   sublineColor: string;
//   image: string;
//   logo: string;
//   badged: string;
//   qr: string;
// };

// const data: Assets[] = [
//   {
//     id: "aa1",
//     projectId: "bb",
//     status: "cc",
//     headline: "dd",
//     subline: "ee",
//     backgraundColor: "hh",
//     headlineColor: "",
//     sublineColor: "",
//     image: "",
//     logo: "",
//     badged: "",
//     qr: "",
//   },
//   {
//     id: "aa2",
//     projectId: "bb",
//     status: "cc",
//     headline: "dd",
//     subline: "ee",
//     backgraundColor: "hh",
//     headlineColor: "",
//     sublineColor: "",
//     image: "",
//     logo: "",
//     badged: "",
//     qr: "",
//   },
//   {
//     id: "aa3",
//     projectId: "bb",
//     status: "cc",
//     headline: "dd",
//     subline: "ee",
//     backgraundColor: "hh",
//     headlineColor: "",
//     sublineColor: "",
//     image: "",
//     logo: "",
//     badged: "",
//     qr: "",
//   },
//   {
//     id: "aa4",
//     projectId: "bb",
//     status: "cc",
//     headline: "dd",
//     subline: "ee",
//     backgraundColor: "hh",
//     headlineColor: "",
//     sublineColor: "",
//     image: "",
//     logo: "",
//     badged: "",
//     qr: "",
//   },
//   {
//     id: "aa5",
//     projectId: "bb",
//     status: "cc",
//     headline: "dd",
//     subline: "ee",
//     backgraundColor: "hh",
//     headlineColor: "",
//     sublineColor: "",
//     image: "",
//     logo: "",
//     badged: "",
//     qr: "",
//   },
// ];

export const columns: ColumnDef<Assets>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "projectId",
    header: "projectId",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("projectId")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "headline",
    header: "Headline",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("headline")}</div>
    ),
  },
  {
    accessorKey: "subline",
    header: "Subline",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subline")}</div>
    ),
  },
  {
    accessorKey: "backgraundColor",
    header: "Backgraund Color",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("backgraundColor")}</div>
    ),
  },
  {
    accessorKey: "headlineColor",
    header: "Headline Color",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("headlineColor")}</div>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("image")}</div>
    ),
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => <div className="capitalize">{row.getValue("logo")}</div>,
  },
  {
    accessorKey: "qr",
    header: "QR",
    cell: ({ row }) => <div className="capitalize">{row.getValue("qr")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable({ project }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectProject, setSelectProject] = React.useState(project);

  React.useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `/api/project/${selectProject.id}/assets`
        );
        console.log(result.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [selectProject]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter status..."
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("status")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
