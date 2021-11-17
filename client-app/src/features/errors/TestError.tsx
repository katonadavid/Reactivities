
import React, { useState } from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import axios, { AxiosError } from 'axios';
import ValidationErrors from './ValidationErrors';
import { useNavigate } from 'react-router';

export default function TestErrors() {
    const baseUrl = 'http://localhost:5000/api/';
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => navigate('/server-error'));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch((err: AxiosError) => {
            const errorData: object = (err.response?.data as any).errors;
            if(err.config.method === "get" && errorData.hasOwnProperty('id')) {
                navigate('/not-found');
            }
        });
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header as='h1' content='Test Error component' />
            <Segment>
                <Button.Group widths='7'>
                    <Button onClick={handleNotFound} content='Not Found' basic primary />
                    <Button onClick={handleBadRequest} content='Bad Request' basic primary />
                    <Button onClick={handleValidationError} content='Validation Error' basic primary />
                    <Button onClick={handleServerError} content='Server Error' basic primary />
                    <Button onClick={handleUnauthorised} content='Unauthorised' basic primary />
                    <Button onClick={handleBadGuid} content='Bad Guid' basic primary />
                </Button.Group>
            </Segment>
            {errors && 
                <ValidationErrors errors={errors} />}
        </>
    )
}


