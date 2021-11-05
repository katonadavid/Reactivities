import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';
import Activitylist from './ActivityList';

interface Props {
    activities: Activity[];
}

const ActivityDashboard = ({activities}: Props) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <Activitylist activities={activities}/>
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;