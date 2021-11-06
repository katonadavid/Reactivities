import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/Activity'

interface Props {
    activity?: Activity;
    closeForm: () => void;
    saveActivity: (activity: Activity) => void;
}

export default function ActivityForm({activity: selectedActivity, closeForm, saveActivity}: Props) {

    const initialState: Activity = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function onInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = e.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={() => saveActivity(activity)} autoComplete='off'>
                <Form.Input name='title' placeholder='Title' value={activity.title} onChange={onInputChange}/>
                <Form.TextArea name='description' placeholder='Description' value={activity.description} onChange={onInputChange}/>
                <Form.Input name='category' placeholder='Category' value={activity.category} onChange={onInputChange}/>
                <Form.Input name='date' placeholder='Date' value={activity.date} onChange={onInputChange}/>
                <Form.Input name='city' placeholder='City' value={activity.city} onChange={onInputChange}/>
                <Form.Input name='venue' placeholder='Venue' value={activity.venue} onChange={onInputChange}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}
