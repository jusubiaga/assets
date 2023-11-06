"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Project } from "@prisma/client";
import axios from "axios";
import { GanttChartSquare, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type ProjectsCardProps = {
  data: Project[];
  search: string;
};

export default function ProjectsCard({ data, search = "" }: ProjectsCardProps) {
  const router = useRouter();

  const handlerEdit = (id: string) => {
    try {
      router.push(`/projects/${id}`);
    } catch (e) {
      console.log("ERROR: edit");
    }
  };

  const handlerDelete = async (id: string) => {
    try {
      await axios.delete(`/api/projects/${id}`);
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

  const handlerViewAssets = (id: string) => {
    try {
      router.push(`/projects/${id}/assets`);
    } catch (e) {
      console.log("ERROR: viewAssets");
    }
  };

  const projectItems = data
    .filter(
      (item) =>
        search === "" || item.name.toUpperCase().includes(search.toUpperCase())
    )
    .map((item: Project) => (
      <Card
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handlerEdit(item.id);
        }}
        key={item.id}
        className="bg-primary/10 rounded-sm cursor-pointer hover:opacity-75 transition border-0"
      >
        <div className="flex justify-end">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handlerDelete(item.id);
            }}
            variant="outline"
            size="icon"
          >
            <XCircle className="w-4 h-4" />
          </Button>
        </div>

        <CardHeader className="flex justify-between text-muted-foreground pt-0">
          <CardTitle className="text-ellipsis overflow-hidden whitespace-nowrap">
            {item.name}
          </CardTitle>
          <CardDescription className="text-ellipsis overflow-hidden whitespace-nowrap">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <p className="text-sm font-medium leading-none">Output</p>
            <p className="text-sm text-muted-foreground">
              {item.outputFormatFK.name}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Channel</p>
            <p className="text-sm text-muted-foreground">
              {item.channelFK.name}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-muted-foreground">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handlerViewAssets(item.id);
            }}
          >
            <GanttChartSquare className="mr-2 h-4 w-4" />
            Assest
          </Button>
        </CardFooter>
      </Card>
    ));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
      {projectItems}
    </div>
  );
}
