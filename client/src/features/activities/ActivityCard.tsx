import {Box, Button, Card, CardActions, CardContent, Chip, Typography} from '@mui/material';

type Props = {
  activity: Activity;
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
}

const ActivityCard = ({
  activity,
  handleSelectActivity,
  handleDeleteActivity,
}: Props) => {
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
            onClick={() => handleSelectActivity(activity.id)}
          >View</Button>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={() => handleDeleteActivity(activity.id)}
          >Delete</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ActivityCard;
