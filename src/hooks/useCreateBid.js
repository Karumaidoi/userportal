import { useMutation, useQueryClient } from "react-query";
import { createBid } from "../services/apiProjects";
import toast from "react-hot-toast";

export function useCreateBid() {
  const queryClient = useQueryClient();
  const {
    mutate: createBidAPI,
    isLoading: isCreatingBid,
    error,
  } = useMutation({
    mutationFn: createBid,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", "bids"],
      });
      toast.success("Bid created");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { createBidAPI, isCreatingBid, error };
}
