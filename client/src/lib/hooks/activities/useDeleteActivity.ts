import {useMutation, useQueryClient} from "@tanstack/react-query";
import agent from "../../api/agent.ts";

const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
      return id;
    },
    onSuccess: (id: string) => {
      queryClient.setQueryData<Activity[]>(['activities'], (old) =>
        old?.filter((activity) => activity.id !== id)
      );
    },
  });
};

export default useDeleteActivity;
