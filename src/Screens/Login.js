import React, { PureComponent } from 'react';
import { Button } from '@material-ui/core';
import './Login.css';

class Login extends PureComponent {
  render() {
    return (
        <div className="login">
            <Button size="large" variant="contained" color="primary" href={this.props.authorizeURL}>
                Login with Spotify
            </Button>
        </div>
    );
  }
}

export default Login