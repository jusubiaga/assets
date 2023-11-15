import { getAsset } from "@/app/services/projects";
import AssetForm from "../../components/asset-form";
import clsx from "clsx";

interface ProjectIdPageProps {
  params: {
    id: string;
    projectId: string;
  };
}

const NewAssetPage = async ({ params }: ProjectIdPageProps) => {
  const asset = await getAsset(params.id);
  return (
    <>
      <AssetForm initialData={asset} projectId={params.projectId}></AssetForm>;
    </>
  );
};

export default NewAssetPage;
