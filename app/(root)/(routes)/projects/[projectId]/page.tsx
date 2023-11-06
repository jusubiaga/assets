import axios from "axios";
import ProjectForm from "./components/project-form";
import { getProject } from "@/app/services/projects";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const project = await getProject(params.projectId);
  return (
    <div className="h-full p-4 space-y-2">
      <ProjectForm initialData={project} />
    </div>
  );
};

export default ProjectIdPage;
