import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface Props {
    inverted?: boolean;
    text?: string;
}

export default function LoadingComponent({inverted = true, text = 'Loading...'}: Props) {

    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={text} />
        </Dimmer>
    )
}
