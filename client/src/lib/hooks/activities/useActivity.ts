import {useQuery} from "@tanstack/react-query";
import agent from "../../api/agent.ts";
import type {Activity} from "../../types";

const useActivity = (id: string | undefined) => useQuery({
  queryKey: ['activities', id],
  enabled: !!id,
  queryFn: async () => {
    const response = await agent.get<Activity>(`/activities/${id}`);
    return response.data;
  }
});

export default useActivity;
