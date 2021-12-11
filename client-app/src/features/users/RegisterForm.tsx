import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router'
import { Button, Header } from 'semantic-ui-react'
import { TextInput } from '../../app/common/form/TextInput'
import { useStore } from '../../app/stores/store'
import * as yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors'

function RegisterForm() {
    
    const {userStore} = useStore();
    const navigate = useNavigate();

    return (
        <Formik
        initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
        onSubmit={(values, {setErrors, setSubmitting}) => {userStore.register(values).then(() => navigate('/activities'))
            .catch(err => {
                setErrors({error: err});
                setSubmitting(false);
            });
        }}
        validationSchema={yup.object({
            displayName: yup.string().required(),
            username: yup.string().required(),
            email: yup.string().required().email(),
            password: yup.string().required()
        })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
                    <TextInput name='displayName' placeholder='Display Name'/>
                    <TextInput name='username' placeholder='Username'/>
                    <TextInput name='email' placeholder='Email'/>
                    <TextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage name='error' render={() => 
                        <ValidationErrors errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Login' type='submit' fluid/>
                </Form>
            )}
        </Formik>
    )
}

export default observer(RegisterForm)