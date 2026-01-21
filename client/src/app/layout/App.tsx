import {useState} from 'react';
import {Box, Container, CssBaseline, Typography} from "@mui/material";
import Navbar from "./Navbar.tsx";
import ActivityDashboard from "../../features/activities/ActivityDashboard.tsx";
import useActivities from "../../lib/hooks/useActivities.ts";

const App = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const {activities, isPending} = useActivities();

  const handleSelectActivity = (id: string) => {
    const activity = activities?.find(x => x.id === id) ?? null;
    setSelectedActivity(activity);
  };

  const handleDeselectActivity = () => {
    setSelectedActivity(null);
  };

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleDeselectActivity();
    }
    setIsEditMode(true);
  };

  const handleCloseForm = () => {
    setIsEditMode(false);
  };

  return (
    <Box sx={{bgcolor: '#eee', minHeight: '100vh'}}>
      <CssBaseline />
      <Navbar handleOpenForm={handleOpenForm} />
      <Container maxWidth={false} sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            handleDeselectActivity={handleDeselectActivity}
            handleSelectActivity={handleSelectActivity}
            isEditMode={isEditMode}
            handleOpenForm={handleOpenForm}
            handleCloseForm={handleCloseForm}
          />
        )}
      </Container>
    </Box>
  );
};

export default App;
