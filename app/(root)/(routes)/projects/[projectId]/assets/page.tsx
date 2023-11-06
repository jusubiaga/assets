import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Project } from "@prisma/client";
import { Value } from "@radix-ui/react-select";
import axios from "axios";
import { ArrowLeftCircle, Plus } from "lucide-react";
import Link from "next/link";
import ProjectSelector from "../components/project-selector";
import { DataTable } from "../components/data-table";
import AssetsTable from "../components/assets-table";
import { getAssets, getProjects } from "@/app/services/projects";

type Props = {
  params: {
    projectId: string;
  };
};

type ProjectsList = {
  id: string;
  name: string;
  selected: boolean;
};

const getProjectsList = async (selectedProject: string) => {
  try {
    const result = await getProjects();
    console.log(selectedProject);
    const projectList = result.map((item: Project) => {
      return {
        id: item.id,
        name: item.name,
        selected: item.id === selectedProject ? true : false,
      } as ProjectsList;
    });
    console.log(projectList);
    return projectList;
  } catch (error) {
    console.log("could not retrive project");
    return [];
  }
};

// const getAssets = async (selectedProject: string) => {
//   try {
//     const result = await axios.get(
//       `http://localhost:3000/api/projects/${selectedProject}/assets`
//     );

//     const projectList = result.data;
//     console.log(projectList);
//     return projectList;
//   } catch (error) {
//     console.log("could not retrive project");
//     return [];
//   }
// };

async function AssetsByProjectPage({ params }: Props) {
  const selectedProject: string = params.projectId;
  const projectsList = await getProjectsList(selectedProject);
  const Assets = await getAssets(selectedProject);

  // const handleGoProjects = (e: any) => {
  //   e.preventDefault();
  //   router.replace("/");
  // };

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

      <ProjectSelector
        projectsList={projectsList}
        selectedProject={selectedProject}
      ></ProjectSelector>
      <Button className="ml-2">
        <Plus className="h-4 w-4 mr-2" />
        <Link href="/assets/new">New Assest</Link>
      </Button>

      <Button className="ml-2">
        <ArrowLeftCircle className="w-4 h-4 mr-2" />
        <Link href="/">See all Projets</Link>
      </Button>

      <div className="pt-4 pb-4">
        <Separator />
      </div>

      <AssetsTable data={Assets} />
    </div>
  );
}

export default AssetsByProjectPage;
