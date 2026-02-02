import {Box, Button, Paper, Typography} from "@mui/material";
import {useActivity, useCreateActivity, useUpdateActivity} from "../../../lib/hooks/activities";
import {useNavigate, useParams} from "react-router";
import {type SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {activitySchema, type ActivitySchema} from "../../../lib/schemas/activitySchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput.tsx";
import SelectInput from "../../../app/shared/components/SelectInput.tsx";
import DateTimeInput from "../../../app/shared/components/DateTimeInput.tsx";
import LocationInput from "../../../app/shared/components/LocationInput.tsx";
import {Category} from "../../../lib/types";

const ActivityForm = () => {
  const { reset, handleSubmit, control } = useForm<ActivitySchema>({
    mode: 'onChange',
    resolver: zodResolver(activitySchema),
  });
  const {id} = useParams();
  const navigate = useNavigate();
  const {data: activity, isLoading} = useActivity(id);
  const updateActivity = useUpdateActivity();
  const createActivity = useCreateActivity();

  useEffect(() => {
    if (!activity) {
      return;
    }
    reset({
      ...activity,
      location: {
        city: activity.city,
        venue: activity.venue,
        latitude: activity.latitude,
        longitude: activity.longitude,
      },
    });
  }, [activity, reset]);


  const onSubmit: SubmitHandler<ActivitySchema> = (data) => {
    const {location, ...rest} = data;
    const flattened = {...rest, ...location};

    try {
      if (activity) {
        updateActivity.mutate({...activity, ...flattened}, {
          onSuccess: () => void navigate(`/activities/${activity.id}`),
        });
      } else {
        createActivity.mutate({...flattened, city: flattened.city || '', isCancelled: false}, {
          onSuccess: (createdActivity) => void navigate(`/activities/${createdActivity.id}`),
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit" : "Create"} Activity
      </Typography>
      {/* eslint-disable @typescript-eslint/no-misused-promises */}
      <Box
        component="form"
        display="flex" flexDirection="column"
        gap={3}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput label="Title" name="title" control={control} />
        <TextInput label="Description" name="description" control={control} multiline rows={3} />
        <Box display="flex" gap={3}>
          <SelectInput
            label="Category"
            name="category"
            control={control}
            options={Object.keys(Category).map((key) => ({
                label: key,
                value: Category[key as keyof typeof Category],
            }))}
          />
          <DateTimeInput label="Date" name="date" control={control} />
        </Box>
        <LocationInput label="Enter the location" name="location" control={control} />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" onClick={() => void navigate(-1)}>Cancel</Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            loading={updateActivity.isPending || createActivity.isPending}
          >Submit</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ActivityForm;
