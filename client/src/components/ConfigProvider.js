import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class ConfigProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentUser: '',
      userLoggedIn: false,
      loginToken: '',
      loginUser: this.loginUser,
      leagues: [],
      getLeagues: this.getLeagues,
      logoutUser: this.logoutUser,
      registerUser: this.registerUser
    };
  }

  loginUser = async (email, pass) => {
    try {
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/https://football-leagues-info.herokuapp.com/api/auth',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: pass })
        }
      );

      const resJson = await response.json();

      if (resJson.errors) throw resJson.errors;

      this.setState({
        currentUser: email,
        userLoggedIn: true,
        loginToken: resJson.token
      });
      return { status: 'OK', content: resJson };
    } catch (err) {
      return { status: 'ERR', content: err };
    }
  };

  setLoginToken = token => {
    this.setState({
      loginToken: token
    });
  };

  registerUser = async (email, pass, fullname) => {
    try {
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/https://football-leagues-info.herokuapp.com/api/users',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: fullname, email: email, password: pass })
        }
      );

      const resJson = await response.json();

      if (resJson.errors) throw resJson.errors;

      this.setState({
        currentUser: email,
        userLoggedIn: true,
        loginToken: resJson.token
      });
      return { status: 'OK', content: resJson };
    } catch (err) {
      return { status: 'ERR', content: err };
    }
  };

  getLeagues = async () => {
    if (this.state.leagues.length > 0) {
      return this.state.leagues;
    } else {
      try {
        const res = await fetch(
          'https://cors-anywhere.herokuapp.com/https://football-leagues-info.herokuapp.com/api/leagues',
          {
            method: 'GET',
            headers: { 'x-auth-token': this.state.loginToken }
          }
        );
        const resJson = await res.json();
        this.setState({
          leagues: resJson
        });
        return resJson;
      } catch (err) {
        return null;
      }
    }
  };

  logoutUser = () => {
    localStorage.clear();
    this.setState({
      isLoading: false,
      currentUser: '',
      userLoggedIn: false,
      loginToken: '',
      leagues: []
    });
  };

  componentDidMount() {
    if (this.state.userLoggedIn) {
      this.setState({
        isLoading: false
      });
    } else {
      // get login token from localStorage
      const token = localStorage.getItem('user-token');
      // if exists, try to login using this token
      if (token !== 'undefined' && token !== null) {
        this.loginUsingToken(token);
      } else {
        this.setState({
          isLoading: false
        });
      }
    }
  }

  loginUsingToken = async token => {
    try {
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/https://football-leagues-info.herokuapp.com/api/auth',
        {
          method: 'GET',
          headers: { 'x-auth-token': token }
        }
      );

      const resJson = await response.json();
      if (!response.ok) throw new Error(resJson.errors);

      this.setState({
        userLoggedIn: true,
        loginToken: token,
        currentUser: resJson.email,
        isLoading: false
      });
    } catch (err) {
      this.setState({
        userLoggedIn: false,
        loginToken: '',
        currentUser: '',
        isLoading: false
      });
    }
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { ConfigProvider };

export default Consumer;