import { useMutation } from "react-query";
import { logOut } from "../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const navigate = useNavigate();
  const {
    mutate: logOutAPI,
    isLoading: loggingOut,
    error,
  } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      navigate("/login");
      toast.success("User Logged out successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { logOutAPI, loggingOut, error };
}
