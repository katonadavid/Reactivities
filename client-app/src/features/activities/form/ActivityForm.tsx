import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';

function ActivityForm() {

    let emptyActivity = useMemo(() => { return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }}, [])
    
    const navigate = useNavigate();
    const {loading: submitting, loadActivity, saveActivity, loadingInitial} = useStore().activityStore;
    const {id} = useParams<'id'>();

    const [activity, setActivity] = useState(emptyActivity);

    useEffect(() => {
        if(id) {
            loadActivity(id).then(activity => setActivity(activity!))
        } else {
            setActivity(emptyActivity)
        }
    }, [emptyActivity, id, loadActivity])

    function handleSubmit() {
        saveActivity(activity).then((activity: Activity | undefined) => {
            if(activity && activity.id) navigate(`/activities/${activity.id}`);
        })
    }

    function onInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = e.target;
        setActivity({...activity, [name]: value});
    }

    if(loadingInitial) return (<LoadingComponent text='Loading activity...'/>)

    return (
        <Segment clearing>
            <Form autoComplete='off'>
                <Form.Input name='title' placeholder='Title' value={activity.title} onChange={onInputChange}/>
                <Form.TextArea name='description' placeholder='Description' value={activity.description} onChange={onInputChange}/>
                <Form.Input name='category' placeholder='Category' value={activity.category} onChange={onInputChange}/>
                <Form.Input type='date' name='date' placeholder='Date' value={activity.date} onChange={onInputChange}/>
                <Form.Input name='city' placeholder='City' value={activity.city} onChange={onInputChange}/>
                <Form.Input name='venue' placeholder='Venue' value={activity.venue} onChange={onInputChange}/>
                <Button loading={submitting} onClick={handleSubmit} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to="/activities" floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)