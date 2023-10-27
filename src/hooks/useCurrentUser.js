import { useQuery } from "react-query";
import { getCurrentUser } from "../services/apiUsers";

export function useCurrentUser() {
  const {
    data: currentUser,
    error,
    isLoading: fetchingUser,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["currentUser"],
  });

  return { currentUser, fetchingUser, error };
}
