import {useMutation, useQueryClient} from "@tanstack/react-query";
import agent from "../../api/agent.ts";

const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put(`/activities/${activity.id}`, activity);
      return activity;
    },
    onSuccess: (updatedActivity) => {
      queryClient.setQueryData<Activity[]>(['activities'], (old) =>
        old?.map((activity) =>
          activity.id === updatedActivity.id ? updatedActivity : activity
        )
      );
    },
  });
};

export default useUpdateActivity;
