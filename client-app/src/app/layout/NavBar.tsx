import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar() {

    const {openForm} = useStore().activityStore;

    return (
        <Menu inverted fixed="top">
            <Container>
                <NavLink to="/">
                    <Menu.Item header>
                        <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}} />
                        Reactivities
                    </Menu.Item>
                </NavLink>
                <NavLink to="activities" style={{display: 'flex'}}>
                    <Menu.Item name="Activities"/>
                </NavLink>
                <NavLink to="create-activity">
                    <Menu.Item>
                        <Button onClick={() => openForm()} positive content="Create Activity" />
                    </Menu.Item>
                </NavLink>
            </Container>
        </Menu>
    )
}
