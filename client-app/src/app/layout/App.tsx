import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, []);
  
  function onActivitySelect(id: string) {
    setSelectedActivity(activities.find(a => a.id === id));
  }
  
  function onActivityCancel() {
    setSelectedActivity(undefined);
  }

  function onFormOpen(id?: string) {
    id ? onActivitySelect(id) : onActivityCancel();
    setEditMode(true);
  }

  function onFormClose() {
    setEditMode(false);
  }
  
  return (
    <>
      <NavBar openForm={onFormOpen} />
      <Container style={{marginTop : '7em'}}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={onActivitySelect}
          cancelActivity={onActivityCancel}
          editMode={editMode}
          openForm={onFormOpen}
          closeForm={onFormClose}
          />
      </Container>
    </>
  ); 
}

export default App;
