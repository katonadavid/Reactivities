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
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {

  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent text='Loading app...'/>

  return (
    <>
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
              <Route path='/server-error' element={<ServerError />}/>
              <Route path='not-found' element={<NotFound />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            </Container>
          </>
        }/>
      </Routes>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <ModalContainer />
    </>
  ); 
}

export default observer(App);
