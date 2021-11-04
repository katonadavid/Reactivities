import React from 'react';
import { Grid, List, ListItem } from 'semantic-ui-react';
import { Activity } from '../../app/models/Activity';

interface Props {
    activities: Activity[];
}

const ActivityDashboard = ({activities}: Props) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    {activities.map(activity => {
                    return <ListItem key={activity.id}><span>{activity.title}</span><p>{activity.description}</p></ListItem>
                    })}
                </List>
            </Grid.Column>
        </Grid>
    );
};

export default ActivityDashboard;