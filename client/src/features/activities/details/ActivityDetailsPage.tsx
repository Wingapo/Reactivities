import {useParams} from "react-router";
import {useActivity} from "../../../lib/hooks/activities";
import {Grid, Typography} from "@mui/material";
import ActivityDetailsHeader from "./ActivityDetailsHeader.tsx";
import ActivityDetailsInfo from "./ActivityDetailsInfo.tsx";
import ActivityDetailsChat from "./ActivityDetailsChat.tsx";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar.tsx";

const ActivityDetailsPage = () => {
  const {id} = useParams();
  const {data: activity, isLoading} = useActivity(id);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (!activity) {
    return <Typography>Activity not found</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid>
      <Grid size={4}>
        <ActivityDetailsSidebar />
      </Grid>
    </Grid>
  );
};

export default ActivityDetailsPage;
