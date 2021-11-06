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
    setEditMode(false); 
    setSelectedActivity(activities.find(a => a.id === id));
  }
  
  function onActivityCancel() {
    setSelectedActivity(undefined);
  }

  function onFormOpen(id?: string) {
    id ? setSelectedActivity(activities.find(a => a.id === id)) : onActivityCancel();
    setEditMode(true);
  }

  function onFormClose() {
    setEditMode(false);
  }

  function onSaveActivity(activity: Activity) {
    activity.id ? 
    setActivities([...activities.filter(a => a.id !== activity.id), activity]) : 
    setActivities([...activities, activity]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function onDeleteActivity(id: string) {
    setActivities([...activities.filter(a => a.id !== id)]);
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
          saveActivity={onSaveActivity}
          deleteActivity={onDeleteActivity}
          />
      </Container>
    </>
  ); 
}

export default App;
