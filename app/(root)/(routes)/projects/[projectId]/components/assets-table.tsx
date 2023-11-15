"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Assets } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";

// component
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// icons
import { Divide, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// accion definitions
type AccionProps = {
  row: Row<Assets>;
};

const ActionDropDown = ({ row }: AccionProps) => {
  const router = useRouter();

  const handleEditRow = (row: Row<Assets>) => {
    console.log(row);
    console.log("Edit porject ", row.original);
    try {
      router.push(
        `/projects/${row.original.projectId}/assets/${row.original.id}`
      );
    } catch (e) {
      console.log("ERROR: editProject");
    }
  };

  const handleDeleteRow = async (row: Row<Assets>) => {
    try {
      await axios.delete(`/api/assets/${row.original.id}`);
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

    console.log(row);
  };

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
            handleEditRow(row);
          }}
        >
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleDeleteRow(row);
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Column definitions
const columns: ColumnDef<Assets>[] = [
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
    cell: ({ row }) => ActionDropDown({ row }),
    // ({ row }) => {
    //   const payment = row.original;

    //   return (
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="ghost" className="h-8 w-8 p-0">
    //           <span className="sr-only">Open menu</span>
    //           <MoreHorizontal className="h-4 w-4" />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem
    //           onClick={() => {
    //             handleEditRow(row);
    //           }}
    //         >
    //           <Pencil className="mr-2 h-4 w-4" />
    //           <span>Edit</span>
    //         </DropdownMenuItem>
    //         <DropdownMenuItem
    //           onClick={() => {
    //             handleDeleteRow(row);
    //           }}
    //         >
    //           <Trash2 className="mr-2 h-4 w-4" />
    //           <span>Delete</span>
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   );
    // },
  },
];

// table definition
type AssetsTableProps = {
  data: Assets[];
};

function AssetsTable({ data }: AssetsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    projectId: false,
  });
  const [rowSelection, setRowSelection] = useState({});

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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
// function AssetsTable({ data }: AssetsTableProps) {
//   return (
//     <>
//       <div>AssetsTable</div>
//       <div>{JSON.stringify(data)}</div>
//     </>
//   );
// }

export default AssetsTable;
