import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import useActivities from "../../lib/hooks/useActivities.ts";

type Props = {
  activity: Activity;
  handleDeselectActivity: () => void;
  handleOpenForm: (id?: string) => void;
}

const ActivityDetail = ({
  activity: selectedActivity,
  handleDeselectActivity,
  handleOpenForm,
}: Props) => {
  const {activities} = useActivities();
  const activity = activities?.find(x => x.id === selectedActivity.id);

  if (!activity) {
    return null;
  }

  return (
    <Card>
      <CardMedia component="img" src={`/images/categories/${activity.category}.jpg`} />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">{activity.date}</Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => handleOpenForm(activity.id)}>Edit</Button>
        <Button color="inherit" onClick={handleDeselectActivity}>Close</Button>
      </CardActions>
    </Card>
  );
};

export default ActivityDetail;
