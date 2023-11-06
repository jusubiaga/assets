import SearchInput from "@/components/search-input";
import ProjectsContainer from "./projects/components/projects-container";
import { getProjects } from "@/app/services/projects";
interface RootPageProps {
  searchParams: {
    search: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await getProjects();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput search={searchParams.search} />
      <ProjectsContainer data={data} search={searchParams.search} />
    </div>
  );
};

export default RootPage;
