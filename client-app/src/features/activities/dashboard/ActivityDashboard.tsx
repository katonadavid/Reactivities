import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

const ActivityDashboard = () => {
    
    const {activityStore} = useStore();
    const {selectedActivity, saveActivity, loading: submitting, editMode, closeForm} = activityStore

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode && 
                <ActivityDetails/>}
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} saveActivity={saveActivity} submitting={submitting} />}
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);