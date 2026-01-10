import {useEffect, useState} from 'react';
import {List, ListItem, ListItemText, Typography} from "@mui/material";

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    void fetch(`https://localhost:5001/api/activities`)
      .then(response => response.json())
      .then(json => setActivities(json as Activity[]));
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
