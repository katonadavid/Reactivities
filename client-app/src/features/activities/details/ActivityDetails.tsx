import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityChat from './ActivityChat';
import ActivityHeader from './ActivityHeader';
import ActivityInfo from './ActivityInfo';
import ActivitySidebar from './ActivitySidebar';

function ActivityDetails() {
    
    const {selectedActivity: activity, loadActivity, loadingInitial} = useStore().activityStore;
    const {id} = useParams<'id'>();
    

    useEffect(() => {
        if(id) loadActivity(id);
    }, [id, loadActivity])
    
    if(!activity || loadingInitial) return (<LoadingComponent />);

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityHeader activity={activity}/>
                <ActivityInfo activity={activity}/>
                <ActivityChat />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivitySidebar/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails)