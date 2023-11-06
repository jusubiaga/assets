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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectsList = {
  id: string;
  name: string;
  selected: boolean;
};

type Props = {
  projectsList: ProjectsList[];
  selectedProject: string;
};

export function ProjectSelector({ projectsList = [], selectedProject }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedProject);
  const [project, setProject] = useState(selectedProject);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? projectsList.find((project) => project.id === value)?.name
            : "Select Project ..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {projectsList.map((project) => (
              <CommandItem
                key={project.id}
                value={project.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  console.log(currentValue);
                  router.push(`/projects/${currentValue}/assets`);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === project.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {project.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// function ProjectSelector({ projectsList = [], selectedProject }: Props) {
//   const [project, setProject] = useState(selectedProject);
//   const router = useRouter();

//   const handleSelectProject = (value) => {
//     console.log("handleSelectProject", value);
//     setProject(value);
//     router.push(`/projects/${value}/assets`);
//   };

//   useEffect(() => {}, [project]);

//   return (
//     <>
//       <ComboboxDemo
//         projectsList={projectsList}
//         selectedProject={selectedProject}
//       ></ComboboxDemo>

//       <Select
//         defaultValue={selectedProject}
//         onValueChange={(value) => {
//           handleSelectProject(value);
//         }}
//       >
//         <SelectTrigger className="w-[50%]">
//           <SelectValue placeholder="Select a Project" />
//         </SelectTrigger>
//         <SelectContent className="w-full">
//           <SelectGroup>
//             {projectsList.map((project: any) => (
//               <SelectItem key={project.id} value={project.id}>
//                 {project.name}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//     </>
//   );
// }

export default ProjectSelector;
