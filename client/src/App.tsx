import {useEffect, useState} from 'react';
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import axios from 'axios';

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    void axios.get<Activity[]>(`https://localhost:5001/api/activities`)
      .then(response => setActivities(response.data));
  }, []);

  return (
    <>
      <Typography variant="h1">Reactivities</Typography>
      <List>
        {activities.map(activity => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default App;
