import { Formik, Form } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { TextInput } from '../../../app/common/form/TextInput';
import { TextArea } from '../../../app/common/form/TextArea';
import { SelectInput } from '../../../app/common/form/SelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import { DateInput } from '../../../app/common/form/DateInput';

function ActivityForm() {

    let emptyActivity = useMemo(() => { return {
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    }}, []);
    
    const navigate = useNavigate();
    const {loading: submitting, loadActivity, saveActivity, loadingInitial} = useStore().activityStore;
    const {id} = useParams<'id'>();
    const [activity, setActivity] = useState<Activity>(emptyActivity);
    
    useEffect(() => {
        if(id) {
            loadActivity(id).then(activity => setActivity(activity!))
        } else {
            setActivity(emptyActivity)
        }
    }, [emptyActivity, id, loadActivity]);

    const validationSchema = Yup.object({
        title: Yup.string().required('The title is required'),
        description: Yup.string().required('Please describe the event in a few words').min(10),
        category: Yup.string().required('Please enter a category'),
        date: Yup.string().required().nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    });

    function handleFormSubmit(activity: Activity) {
        saveActivity(activity).then((activity: Activity | undefined) => {
            if(activity && activity.id) navigate(`/activities/${activity.id}`);
        })
    }

    if(loadingInitial) return (<LoadingComponent text='Loading activity...'/>)

    return (
        <Segment clearing>
            <Header content='Activity details' sub color='teal' />
            <Formik enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}
                validationSchema={validationSchema}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <TextInput name='title' placeholder='Title' />
                        <TextArea name='description' placeholder='Description' rows={3}/>
                        <SelectInput options={categoryOptions} name='category' placeholder='Category'/>
                        <DateInput name='date' placeholderText='Date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa'/>
                        <Header content='Location details' sub color='teal' />
                        <TextInput name='city' placeholder='City'/>
                        <TextInput name='venue' placeholder='Venue'/>
                        <Button loading={submitting} disabled={!isValid || isSubmitting || !dirty} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to="/activities" floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

export default observer(ActivityForm)