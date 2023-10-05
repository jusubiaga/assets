"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ProjectsList = {
  id: string;
  name: string;
  selected: boolean;
};

type Props = {
  projectsList: ProjectsList[];
  selectedProject: string;
};

function ProjectSelector({ projectsList = [], selectedProject }: Props) {
  const [project, setProject] = useState(selectedProject);
  const router = useRouter();

  const handleSelectProject = (value) => {
    console.log("handleSelectProject", value);
    setProject(value);
    router.push(`/projects/${value}/assets`);
  };

  useEffect(() => {}, [project]);

  return (
    <>
      <Select
        defaultValue={selectedProject}
        onValueChange={(value) => {
          handleSelectProject(value);
        }}
      >
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
    </>
  );
}

export default ProjectSelector;
