import React from 'react';
import { LoginContext } from './context.js';
import { Redirect } from 'react-router-dom';
import './signup.scss'


const If = props => {
  return props.condition ? props.children : null;
};

class Signup extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      role: '',
    };
  }

  handleChange = e => {
    console.log('dede', this.state);
    this.setState({ [e.target.name]: e.target.value });
  }

  loginHandleSubmit = e => {
    e.preventDefault();
    // console.log('__STATE__', this.state);
    this.context.login(this.state.username, this.state.password);
    e.target.reset();
  }

  signupHandleSubmit = e => {
    e.preventDefault();
    console.log('__STATE__ tst', this.state)
    this.context.signup(this.state.username,this.state.email, this.state.password, this.state.role);
    e.target.reset();
  }

  // handleGoogleSubmit = () => {
  //   this.context.googleSignup();
  // }

  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <Redirect to='/' />
        </If>

        <section className="upform" >
                <form method="post" onSubmit={this.signupHandleSubmit} className="realform">
                  <label htmlFor="name">Username</label>
                    <input type="text" name='username' required placeholder="Enter your full name" onChange={this.handleChange} />
                  

                  <label >Email</label>
                    <input type="email" name="email" placeholder="Enter your email" onChange={this.handleChange} />
                  

                  <label >Password</label>
                    <input type="password" name="password" required placeholder="Enter your password" onChange={this.handleChange} />
                  
                  <label >Role</label>
                    <select name='role' defaultValue='default' onChange={this.handleChange} >
                      <option value='default' hidden disabled>Select a role</option>
                      <option value='admin'>Admin</option>
                      <option value='customer'>Customer</option>
                    </select>
                  
                    <button type="submit">Register</button>
                  
                </form>
       

        </section>
      </>
    );
  }
}

export default Signup;