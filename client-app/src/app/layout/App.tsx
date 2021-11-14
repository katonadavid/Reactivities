import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router';
import Homepage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
    <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/*' element={
          <>
            <NavBar />
            <Container style={{marginTop : '7em'}}>
            <Routes>
              <Route path='activities' element={<ActivityDashboard />}/>
              <Route path='activities/:id' element={<ActivityDetails />}/>
              <Route path='create-activity' element={<ActivityForm />}/>
              <Route path='manage/:id' element={<ActivityForm />}/>
              <Route path='/errors' element={<TestErrors />}/>
            </Routes>
            </Container>
          </>
        }/>
    </Routes>
    </>
  ); 
}

export default observer(App);
