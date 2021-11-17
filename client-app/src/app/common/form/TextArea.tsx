import { useField } from 'formik'
import React from 'react'
import { FormField, Label } from 'semantic-ui-react'

interface Props {
    name: string;
    placeholder: string;
    label?: string;
    rows: number;
}

export function TextArea(props: Props) {

    const [field, meta] = useField(props.name);

    return (
        <FormField error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? ( <Label basic color='red'>{meta.error}</Label> ) : null }
        </FormField>
    )
}
