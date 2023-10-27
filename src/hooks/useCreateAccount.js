import { useMutation } from "react-query";
import { signUp } from "../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateAccount() {
  const navigate = useNavigate();
  const {
    mutate: signUpUser,
    isLoading: isSigningUp,
    error,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/home");
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  return { signUpUser, isSigningUp, error };
}
