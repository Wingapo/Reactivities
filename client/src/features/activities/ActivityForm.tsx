import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import type {FormEvent} from "react";
import useActivities from "../../lib/hooks/useActivities.ts";

type Props = {
  activity: Activity | null;
  handleCloseForm: () => void;
}

const ActivityForm = ({activity, handleCloseForm}: Props) => {
  const {updateActivity, createActivity} = useActivities();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: {[key: string]: FormDataEntryValue} = {};

    formData.forEach((value, key) => data[key] = value);

    if (activity?.id) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
      handleCloseForm();
    } else {
      await createActivity.mutateAsync(data as unknown as Activity);
      handleCloseForm();
    }
  };

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
      <Typography variant="h5" gutterBottom color="primary">Create Activity</Typography>
      <Box
        component="form"
        display="flex" flexDirection="column"
        gap={3}
        onSubmit={event => void handleSubmit(event)}
      >
        <TextField label="Title" name="title" defaultValue={activity?.title} />
        <TextField label="Description" name="description" defaultValue={activity?.description} multiline rows={3} />
        <TextField label="Category" name="category" defaultValue={activity?.category} />
        <TextField
          label="Date"
          name="date"
          type="date"
          defaultValue={activity?.date
            ? new Date(activity.date).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
          }
        />
        <TextField label="City" name="city" defaultValue={activity?.city} />
        <TextField label="Venue" name="venue" defaultValue={activity?.venue} />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" onClick={handleCloseForm}>Cancel</Button>
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
