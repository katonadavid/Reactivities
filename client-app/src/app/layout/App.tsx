import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      response.map(activity => {
        activity.date = activity.date.split('T')[0];
        return activity;
      })
      setActivities(response);
      setLoading(false);
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
    setSubmitting(true);
    if(activity.id) {
      agent.Activities.update(activity).then((responseActivity: Activity) => {
        setActivities([...activities.filter(a => a.id !== activity.id), responseActivity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      agent.Activities.create(activity).then((responseActivity: Activity) => {
        setActivities([...activities, responseActivity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function onDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
      setSubmitting(false);
    })
  }

  if( loading ) return <LoadingComponent/>

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
          submitting={submitting}
          />
      </Container>
    </>
  ); 
}

export default App;
