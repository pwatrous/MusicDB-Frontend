import React, { PureComponent } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';
import './Home.css'

let spotifyApi = new SpotifyWebApi();

class Home extends PureComponent {
  constructor(props) {
    super(props);
    spotifyApi.setAccessToken(this.props.code);
    this.state = {
      loading: true,
      songs: [],
    }
  }

  componentDidMount() {
    spotifyApi
        .getMySavedTracks({
            limit: 50,
            offset: 1,
        })
        .then(data => {
                this.setState({ songs: data.body.items, loading: false });
            },
            err => {
                console.log('Something went wrong!', err);
            }
        );
  }

  render() {
    return (
      <div className="home">
        {!this.state.loading && this.state.songs.map(song => <h4>{song.track.name}</h4>)}
      </div>
    );
  }
}

export default Home;