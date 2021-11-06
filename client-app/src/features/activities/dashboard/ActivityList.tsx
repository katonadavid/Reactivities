import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/Activity'

interface Props {
    activities: Activity[];
    onActivitySelected: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({activities, onActivitySelected, deleteActivity}: Props) {

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
                                <Button floated='right' content='View' onClick={() => onActivitySelected(activity.id)} color='blue' />
                                <Button floated='right' content='Delete' onClick={() => deleteActivity(activity.id)} color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
