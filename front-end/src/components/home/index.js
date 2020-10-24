import React, { useContext } from 'react';
import { Link, Route } from 'react-router-dom';
import { LoginContext } from '../auth/context';
import Complaints from '../complaint/complaint';
import { Else, If, Then } from '../if';
import './home.scss';

const Home = () => {
  const context = useContext(LoginContext)
  return(
  <div className='home'>
     <h1 >A complaint management portal!</h1>

    <div className="links">
      <If condition={context.loggedIn}>
        <Then>
          <If condition={context.user.role === 'admin'}>
            <Then>
              <h2>Admin Interface{context.user.username}</h2>
              <Link className="links2" to = '/admin'>All Complaint</Link>
              {/* <Pending /> */}
            </Then>
            <Else>
              <Link className="links1" to = '/new'>New Complaint</Link>
              <Link className="links1" to = '/complaint'>My Complaints</Link>
            </Else>
          </If>
        </Then>
      </If>
    </div>
  </div>
)}

export default Home;