import { Separator } from "@/components/ui/separator";
import { DataTable } from "./components/data-table";

const Projects = () => {
  return (
    <div className="h-full p-4 space-y-2">
      <div className="space-y-2 w-full col-span-2">
        <div>
          <h3 className="text-lg font-medium">Project List</h3>
          <p className="text-sm text-muted-foreground">
            List about your Projects
          </p>
        </div>
        <Separator className="bg-primary/10"></Separator>
      </div>

      <DataTable />
    </div>
  );
};

export default Projects;
