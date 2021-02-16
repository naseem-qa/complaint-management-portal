import React from 'react';
import { Redirect } from 'react-router-dom';
import { LoginContext } from './context.js';
import './login.scss'
const If = props => {
  return props.condition ? props.children : null;
};

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginHandleSubmit = e => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password); 
    e.target.reset();
  }

  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <Redirect to='/' />
        </If>

        <section className="all">
                <form onSubmit={this.loginHandleSubmit} className="form">
                  <label >Username</label>
                    <input type="text" name="username" required placeholder="Enter your email" onChange={this.handleChange} />
                  

                  <label>Password </label>
                    <input type="password" name="password" required placeholder="Enter your password" onChange={this.handleChange} />
    
                    <button type="submit" >log in</button>
                  
                </form>
        </section>
      </>
    );
  }
}

export default Login;
