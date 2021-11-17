import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, FormField, Label, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';

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

    const validationSchema = Yup.object({
        title: Yup.string().required('The title is required')
    })

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

    // function onInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const {name, value} = e.target;
    //     setActivity({...activity, [name]: value});
    // }

    if(loadingInitial) return (<LoadingComponent text='Loading activity...'/>)

    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}
                validationSchema={validationSchema}>
                {({handleSubmit}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <FormField>
                            <Field name='title' placeholder='Title'/>
                            <ErrorMessage name='title' render={error => <Label basic color='red' content={error} />}/>
                        </FormField>
                        <Field name='description' placeholder='Description'/>
                        <Field name='category' placeholder='Category'/>
                        <Field type='date' name='date' placeholder='Date'/>
                        <Field name='city' placeholder='City'/>
                        <Field name='venue' placeholder='Venue'/>
                        <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to="/activities" floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

export default observer(ActivityForm)