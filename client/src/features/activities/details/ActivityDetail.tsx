import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Link, useParams} from "react-router";
import {useActivity} from "../../../lib/hooks/activities";

const ActivityDetail = () => {
  const {id} = useParams();
  const {data: activity, isLoading} = useActivity(id);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (!activity) {
    return <Typography>Activity not found</Typography>;
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
        <Button component={Link} to={`/activities/${activity.id}/edit`} color="primary">Edit</Button>
        <Button component={Link} to="/activities" color="inherit">Close</Button>
      </CardActions>
    </Card>
  );
};

export default ActivityDetail;
