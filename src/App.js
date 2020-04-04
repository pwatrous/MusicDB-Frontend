import React, { PureComponent } from 'react';
import Login from './Screens/Login';
import Home from './Screens/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SpotifyWebApi from 'spotify-web-api-node';
import './App.css';

let clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
let redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'user-library-read',
];
let authorizeURL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&${scopes.join(
    '%20'
)}&redirect_uri=${redirectUri}&show_dialog=true`;

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    let token = hash.access_token;
    if (token) {
      this.setState({
        token
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              {!this.state.token && <Login authorizeURL={authorizeURL}/>}
              {this.state.token && <Home code={this.state.token}/>}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

