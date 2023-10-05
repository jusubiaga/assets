import axios from "axios";
import ProjectForm from "./components/project-form";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  let project = null;
  try {
    const res = await axios.get(
      `http://localhost:3000/api/projects/${params.projectId}`
    );

    project = await res.data;
    console.log(project);
  } catch (error) {}

  return (
    <div className="h-full p-4 space-y-2">
      <ProjectForm initialData={project} />
    </div>
  );
};

export default ProjectIdPage;
