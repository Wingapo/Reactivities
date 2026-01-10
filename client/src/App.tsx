import {useEffect, useState} from 'react';

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    void fetch(`https://localhost:5001/api/activities`)
      .then(response => response.json())
      .then(json => setActivities(json as Activity[]));
  }, []);

  return (
    <>
      <h1>Reactivities</h1>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>{activity.title}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
