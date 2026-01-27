import {Grid} from '@mui/material';
import ActivityList from "./ActivityList.tsx";
import ActivityFilters from "./ActivityFilters.tsx";

const ActivityDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ActivityList />
      </Grid>
      <Grid size={4}>
        <ActivityFilters />
      </Grid>
    </Grid>
  );
};

export default ActivityDashboard;
