import React, { useEffect, useContext } from 'react';
import { Link} from 'react-router-dom';
import { LoginContext } from '../auth/context.js';
import './header.scss';

const If = props => {
  return props.condition ? props.children : null;
};

export default function Header() {
  const context = useContext(LoginContext)
   console.log(context);
  return (

    <header className="header">
      <h1>Complaints Gate</h1>
        <div className="right">
      <ul className="one">
          <li ><Link to="/" >Home</Link></li>
      </ul>
      
        <If condition={!context.loggedIn}>
          <ul >
            <li ><Link to="/login">Signin</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </If>

        <If condition={context.loggedIn}>
              <div className="two">
                <Link onClick={context.logout} to='/'>Logout!</Link>
              </div>
        </If>
     
        </div>
    </header>

  );
}