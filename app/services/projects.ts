import axios from "axios";

export const getProjects = async () => {
  try {
    // const result = await axios.get("http://localhost:3000/api/projects");
    const result = await fetch("http://localhost:3000/api/projects", {
      cache: "no-store",
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log("could not retrive project");
    return [];
  }
};

export const getProject = async (id: string) => {
  let project = null;
  try {
    const res = await axios.get(`http://localhost:3000/api/projects/${id}`);

    project = await res.data;
    return project;
  } catch (error) {}
};

export const getAssets = async (projectId: string) => {
  try {
    const result = await axios.get(
      `http://localhost:3000/api/projects/${projectId}/assets`
    );

    const projectList = result.data;
    return projectList;
  } catch (error) {
    console.log("could not retrive project");
    return [];
  }
};
