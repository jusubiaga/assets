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
  SlidersHorizontal,
  Eye,
  Plus,
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
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { type } from "os";
import { Project } from "@prisma/client";

type ProjectsTableProps = {
  data: Project[];
  search?: string;
};

export function ProjectsTable({ data, search }: ProjectsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      id: false,
      channelId: false,
      countryId: false,
      outputFormatId: false,
    });
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();

  const columns: ColumnDef<Project>[] = [
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
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "countryId",
      header: "Country",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("countryId")}</div>
      ),
    },
    {
      accessorKey: "countryFK.name",
      header: "Country",
      // cell: ({ row }) => (
      //   <div className="capitalize">{row.getValue("countryId")}</div>
      // ),
    },

    {
      accessorKey: "outputFormatId",
      header: "Output Format",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("outputFormatId")}</div>
      ),
    },
    {
      accessorKey: "outputFormatFK.name",
      header: "Output Format",
      // cell: ({ row }) => (
      //   <div className="capitalize">{row.getValue("outputFormatFK")}</div>
      // ),
    },
    {
      accessorKey: "channelId",
      header: "channel",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("channelId")}</div>
      ),
    },
    {
      accessorKey: "channelFK.name",
      header: "channel",
      // cell: ({ row }) => (
      //   <div className="capitalize">{row.getValue("outputFormatFK")}</div>
      // ),
    },

    {
      accessorKey: "collection",
      header: "Collection",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("collection")}</div>
      ),
    },
    {
      accessorKey: "imagesCollection",
      header: "Images Collection",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("imagesCollection")}</div>
      ),
    },
    {
      accessorKey: "logoCollection",
      header: "Logo Collection",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("logoCollection")}</div>
      ),
    },
    {
      accessorKey: "badgeCollection",
      header: "Badge Collection",

      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("badgeCollection")}</div>
      ),
    },
    {
      accessorKey: "placidTamplate",
      header: "Placid Tamplate",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("placidTamplate")}</div>
      ),
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
              <DropdownMenuItem
                onClick={() => {
                  editProject(row);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  deleteRow(row);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  viewAssets(row);
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                <span>View Assets</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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

  React.useEffect(() => {
    table.getColumn("name")?.setFilterValue(search);
  }, [table, search]);

  const editProject = async (row: any) => {
    console.log("Edit porject ", row.original);
    try {
      router.push(`/projects/${row.original.id}`);
    } catch (e) {
      console.log("ERROR: editProject");
    }
  };

  const viewAssets = async (row: any) => {
    console.log("View Assets: ", row.original);
    try {
      router.push(`/projects/${row.original.id}/assets`);
    } catch (e) {
      console.log("ERROR: viewAssets");
    }
  };

  const deleteRow = async (row: any) => {
    console.log("ID: ", row);

    try {
      await axios.delete(`/api/projects/${row.original.id}`);
      // const copyData = [...data];
      // copyData.splice(row.index, 1);
      // setData(copyData);
      router.refresh();
      toast({
        description: "Success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error",
        duration: 2000,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          className="ml-2"
          onClick={() => {
            router.push(`/projects/new`);
          }}
        >
          <Plus className="w-4 h-4" />
        </Button>

        <Button className="ml-2">
          <Trash2 className="w-4 h-4" />
        </Button> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
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
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel()?.rows.map((row) => (
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
