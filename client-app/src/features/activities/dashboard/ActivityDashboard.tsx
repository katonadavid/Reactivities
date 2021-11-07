import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity?: Activity;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    saveActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

const ActivityDashboard = ({activities, selectedActivity, editMode, selectActivity, cancelActivity, 
    saveActivity, deleteActivity, openForm, closeForm, submitting}: Props) => {
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} onActivitySelected={(id: string) => selectActivity(id)} deleteActivity={deleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode && 
                <ActivityDetails
                    activity={selectedActivity}
                    openForm={openForm}
                    cancelActivity={cancelActivity}
                />}
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} saveActivity={saveActivity} submitting={submitting} />}
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;