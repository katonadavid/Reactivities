import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header as={NavLink} to="/">
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to="activities" name="Activities"/>
                <Menu.Item as={NavLink} to="/errors" name="Errors"/>
                <Menu.Item as={Link} to="create-activity">
                    <Button positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
