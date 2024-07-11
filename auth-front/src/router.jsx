import {createBrowserRouter} from 'react-router-dom'
import Layout from './components/layouts/Layout';
import Inicio from './components/home/Inicio';
import AuthLayout from './components/layouts/AuthLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children:[
        {
          index: true,
          element:<Inicio/>
        }
      ]
    },
    {
     path: '/auth',
     element: <AuthLayout/>,
     children:[
       {
          path: '/auth/login',
          element:<Login/>
       },
       {
          path: '/auth/register',
          element:<Register/>
       }
     ]
    }
])

export default router;