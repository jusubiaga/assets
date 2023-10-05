import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Payment, columns } from "./table/columns";
import { DataTable } from "./components/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const getProjectsList = async () => {
  try {
    const result = await axios.get("http://localhost:3000/api/projects");
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log("could not retrive project");
    return [];
  }
};

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function AssetsPage({ selectedProject }: { props: any }) {
  const projectsList = await getProjectsList();
  const data = await getData();

  return (
    <div className="h-full p-4 space-y-2">
      <div className="space-y-2 w-full col-span-2">
        <div>
          <h3 className="text-lg font-medium">Assets List</h3>
          <p className="text-sm text-muted-foreground">
            List about your Assets
          </p>
          <p>PROJECT: {selectedProject}</p>
        </div>
        <Separator className="bg-primary/10"></Separator>
      </div>

      <div className="flex align-middle">
        <Select>
          <SelectTrigger className="w-[50%]">
            <SelectValue placeholder="Select a Project" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectGroup>
              {projectsList.map((project: any) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="ml-2">
          <Plus className="h-4 w-4 fill-white text-white mr-2" />
          <Link href="/assets/new">New Assest</Link>
        </Button>
      </div>
      <div className="pt-4 pb-4">
        <Separator />
      </div>

      {/* <DataTable project={"1"} /> */}
    </div>
  );
}
