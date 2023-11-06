"use client";

import React from "react";
import ProjectsCard from "./projects-card";
import { Project } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProjectsTable } from "./projects-table";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

type ProjectsContainerProps = {
  data: Project[];
  search: string;
};

export default function ProjectsContainer({
  data,
  search,
}: ProjectsContainerProps) {
  const router = useRouter();

  const onAddProject = () => {
    console.log("onAddProject");
    router.push(`/projects/new`);
  };

  return (
    <>
      <Tabs defaultValue="card" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="card" className="relative">
              Card
            </TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          <div className="ml-auto mr-4">
            <Button onClick={onAddProject}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </div>

        <Separator />

        <TabsContent value="card">
          <ProjectsCard data={data} search={search} />
        </TabsContent>
        <TabsContent value="table">
          <ProjectsTable data={data} search={search} />
        </TabsContent>
      </Tabs>
    </>
  );
}
