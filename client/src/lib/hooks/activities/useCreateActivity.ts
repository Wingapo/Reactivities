import {useMutation, useQueryClient} from "@tanstack/react-query";
import agent from "../../api/agent.ts";

const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Activity, 'id'>) => {
      const response = await agent.post<string>(`/activities`, data);
      const activity: Activity = {...data, id: response.data};
      return activity;
    },
    onSuccess: (createdActivity: Activity) => {
      queryClient.setQueryData<Activity[]>(['activities'], (old) =>
        old ? [...old, createdActivity] : [createdActivity]
      );
    },
  });
};

export default useCreateActivity;
