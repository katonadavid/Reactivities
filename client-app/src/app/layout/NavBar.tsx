import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

function NavBar() {

    const {userStore: {user, logout}} = useStore();
    const navigate = useNavigate();

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
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right'/>
                    <Dropdown pointing='top right' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user'/>
                            <Dropdown.Item onClick={() => {logout(); navigate('/')}} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer (NavBar)