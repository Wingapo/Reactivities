import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import agent from "../api/agent.ts";

const useActivities = () => {
  const queryClient = useQueryClient();

  const {data: activities, isPending} = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>(`/activities`);
      return response.data;
    },
  });

  const createActivity = useMutation({
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

  const updateActivity = useMutation({
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

  const deleteActivity = useMutation({
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

  return {
    activities,
    isPending,
    createActivity,
    updateActivity,
    deleteActivity,
  };
};

export default useActivities;
