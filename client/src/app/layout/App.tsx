import {useEffect, useState} from 'react';
import {Box, Container, CssBaseline} from "@mui/material";
import axios from 'axios';
import Navbar from "./Navbar.tsx";
import ActivityDashboard from "../../features/activities/ActivityDashboard.tsx";

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    void axios.get<Activity[]>(`https://localhost:5001/api/activities`)
      .then(response => setActivities(response.data));
  }, []);

  const handleSelectActivity = (id: string) => {
    const activity = activities.find(x => x.id === id) ?? null;
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

  const handleFormSubmit = (activity: Activity) => {
    if (activity.id) {
      setActivities(activities.map(current => current.id === activity.id ? activity : current));
      setSelectedActivity(activity);
    } else {
      const newActivity =  {...activity, id: activities.length.toString()};
      setActivities(prev => [...prev, newActivity]);
      setSelectedActivity(newActivity);
    }
    setIsEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(x => x.id !== id));
  }

  return (
    <Box sx={{bgcolor: '#eee'}}>
      <CssBaseline />
      <Navbar handleOpenForm={handleOpenForm} />
      <Container maxWidth={false} sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          handleDeselectActivity={handleDeselectActivity}
          handleSelectActivity={handleSelectActivity}
          isEditMode={isEditMode}
          handleOpenForm={handleOpenForm}
          handleCloseForm={handleCloseForm}
          handleFormSubmit={handleFormSubmit}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </Box>
  );
};

export default App;
