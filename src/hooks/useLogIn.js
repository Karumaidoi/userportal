import { useMutation } from "react-query";
import { logIn } from "../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogIn() {
  const navigate = useNavigate();
  const {
    mutate: loginAPI,
    isLoading: isLoggingIn,
    error,
  } = useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      navigate("/home");
      toast.success("Log In successfull");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  return { loginAPI, isLoggingIn, error };
}
