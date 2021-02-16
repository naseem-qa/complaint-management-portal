import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

const API = 'http://localhost:3030';

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      login: this.login,
      logout: this.logout,
      signup: this.signup,
      user: {},
    };
  }

  login = (username, password) => {
    console.log('hh', username);
    console.log('aa', password);
    fetch(`${API}/signin`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      }),
    })
      .then(response => response.text())
      .then(token => this.validateToken(token))
      .then(()=> console.log('__STATE__ login', this.state.user))
      .catch(console.error);
  }

  signup = (username, email, password, role) => {
    fetch(`${API}/signup`,{
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({username: username,email: email , password: password, role: role}),
    })
      .then(response => response.text())
      .then(token => this.validateToken(token))
      .then(()=> console.log('__STATE__', this.state.user))
      .catch(e => console.error(e));
  }

  validateToken = token => {
    try {
      let user = jwt.verify(token, 'nasa');
      console.log('user',user);
      this.setLoginState(true, token, user);
    } catch {
      this.setLoginState(false, null, {});
      console.error('invalid token');
    }
  }

  setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    this.setState({ token, loggedIn, user });
  }

  logout = () => {
    this.setLoginState(false, null, {});
  }

  componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    this.validateToken(token);
  }

  render() {
    return(
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;
