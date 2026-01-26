import {Box, Button, Card, CardActions, CardContent, Chip, Typography} from '@mui/material';
import {Link} from "react-router";
import {useDeleteActivity} from "../../../lib/hooks/activities";

type Props = {
  activity: Activity;
}

const ActivityCard = ({activity}: Props) => {
  const deleteActivity = useDeleteActivity();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography color="textSecondary" sx={{mb: 1}}>{activity.date}</Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2}}>
        <Chip label={activity.category} variant="outlined" />
        <Box sx={{display: 'flex', gap: 3}}>
          <Button
            size="medium"
            variant="contained"
            component={Link}
            to={`/activities/${activity.id}`}
          >View</Button>
          <Button
            size="medium"
            variant="contained"
            color="error"
            loading={deleteActivity.isPending}
            onClick={() => deleteActivity.mutate(activity.id)}
          >Delete</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ActivityCard;
