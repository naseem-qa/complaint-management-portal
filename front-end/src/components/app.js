import React from 'react';
import LoginProvider from './auth/context';
import { Route } from 'react-router-dom';
import Header from './header/';
import LoginContext from './auth/context.js';
import Login from './auth/login.js';
import Signup from './auth/signup.js';
import Home from './home/';
import ComplaintProvider from './complaint/context';
import Complaints from './complaint/complaint';
import MyComplaints from './complaint/mycomplaint';
import AdminTool from './admin/admin';
export default function App() {
  return(
    <>
          <LoginProvider>
            <ComplaintProvider>
            <Header />
            <Route exact path='/' render={() => <Home />}></Route>
            <Route exact path='/new' render={()=> <Complaints />} ></Route>
            <Route exact path='/complaint' render={()=> <MyComplaints />} ></Route>
            <Route exact path='/admin' render={()=> <AdminTool />} ></Route>
            <Route exact path='/login' render={() => <Login />}></Route>
            <Route exact path='/signup' render={() => <Signup />}></Route>
            </ComplaintProvider>
          </LoginProvider>
    
    </>
  );
}