import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router'
import { Button, Label } from 'semantic-ui-react'
import { TextInput } from '../../app/common/form/TextInput'
import { useStore } from '../../app/stores/store'

function LoginForm() {
    
    const {userStore} = useStore();
    const navigate = useNavigate();

    return (
        <Formik
        initialValues={{email: '', password: '', error: null}}
        onSubmit={
            (values, {setErrors, setSubmitting}) => {
            userStore.login(values)
            .then(() => navigate('/activities'))
            .catch(err => {
                setErrors({error: 'Invalid email or password!'});
                setSubmitting(false);
            });
        }}>
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <TextInput name='email' placeholder='Email'/>
                    <TextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />} />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid/>
                </Form>
            )}
        </Formik>
    )
}

export default observer(LoginForm)