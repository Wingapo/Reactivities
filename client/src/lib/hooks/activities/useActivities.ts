import {useQuery} from "@tanstack/react-query";
import agent from "../../api/agent.ts";

const useActivities = () => useQuery({
  queryKey: ['activities'],
  queryFn: async () => {
    const response = await agent.get<Activity[]>(`/activities`);
    return response.data;
  }
});

export default useActivities;
