import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List, ListItem } from 'semantic-ui-react';

function App() {

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    axios.get<any>('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, []);

  return (
    <div>
        <List>
          <Header as="h2" icon="users" content="Reactivities" />
        {activities.map(activity => {
          return <ListItem key={activity.id}><span>{activity.title}</span><p>{activity.description}</p></ListItem>
        })}
        </List>
    </div>
  );
}

export default App;
