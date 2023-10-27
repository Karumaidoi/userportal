import { useQuery } from "react-query";
import { getProjects } from "../services/apiProjects";

export function useProjects() {
  const {
    data: projects,
    isLoading: fetchingProjects,
    error,
  } = useQuery({
    queryFn: getProjects,
    queryKey: ["projects"],
  });

  return { projects, fetchingProjects, error };
}
