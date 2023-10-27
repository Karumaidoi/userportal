import { useQuery } from "react-query";
import { getBids } from "../services/apiProjects";

export function useBids() {
  const { data: bids, isLoading: gettingBids } = useQuery({
    queryKey: ["bids"],
    queryFn: getBids,
  });

  return { bids, gettingBids };
}
