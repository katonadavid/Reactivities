import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router';
import Homepage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';

function App() {

  return (
    <>
      <NavBar />
      <Container style={{marginTop : '7em'}}>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/activities' element={<ActivityDashboard />}/>
          <Route path='/create-activity' element={<ActivityForm />}/>
        </Routes>
      </Container>
    </>
  ); 
}

export default observer(App);
