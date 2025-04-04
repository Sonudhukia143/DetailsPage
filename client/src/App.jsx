import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.esm'
import Layout from './components/Layout';
import Loader from './helperComponents/Loader.jsx';
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import UndefinedPath from './routes/UndefinedPath.jsx';
import { lazy, Suspense } from 'react';
import ErrorElement from './routes/ErrorElement.jsx';

const LoginPage = lazy(() => import('./routes/LoginPage.jsx'));
const SignUp = lazy(() => import('./routes/SignUp.jsx'));
const DataPage = lazy(() => import('./routes/DataPage.jsx'));
const Profile = lazy(() => import('./routes/Profile.jsx'));
const ProtectedRoute = lazy(() => import('./routes/ProtectedRoute.jsx'));
const UserDashboard = lazy(() => import('./detailComponents/UserDashboard.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorElement />}>
        <Route index element={
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        } />
        <Route path="login" element={
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        } />
        <Route element={
          <Suspense fallback={<Loader />}>
            <ProtectedRoute />
          </Suspense>
        }>
          <Route path="/details" element={<UserDashboard />}>
            <Route index element={
              <Suspense fallback={<Loader />}>
                <DataPage />
              </Suspense>
            } />
            <Route path="profile" element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            } />
          </Route>
        </Route>
        <Route path="*" element={<UndefinedPath />} />
      </Route>
    </>
  )
)

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}