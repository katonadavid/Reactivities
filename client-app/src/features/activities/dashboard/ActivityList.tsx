import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default function ActivityList() {

    const [target, setTarget] = useState('');
    const {activitiesByDate: activities, selectActivity, loading: submitting, deleteActivity} = useStore().activityStore;
    
    function onDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' onClick={() => selectActivity(activity.id)} color='blue' />
                                <Button 
                                    name={activity.id}
                                    loading={submitting && target === activity.id} floated='right' content='Delete' 
                                    onClick={(e) => onDelete(e, activity.id)} color='red'
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
