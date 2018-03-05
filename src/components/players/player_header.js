import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class PlayerHeader extends Component {
  constructor (props) {
    super(props);

    this.state = {
      imageStatus: 'loading',
    }
  }

  handleImageLoaded () {
    this.setState({ imageStatus: 'loaded' });
  }

  render () {
    const player = this.props.player;
    const team = this.props.team;
    const position = this.props.position;
    const playerImgSrc = 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p'
    const backgroundImg =  require("../../images/football-background.jpg");

    return (
      <div className="row">
        <div className="col offset-sm-3 col-sm-6">
          <div className="card">
            <img className="card-img-top" src={ backgroundImg } alt="Football field" />
            <div className={ `row profile-photo text-center ${this.state.imageStatus}` }>
              <div className="col col-sm-12">
                <img
                  className='img-thumbnail rounded-circle player-img'
                  src={ `${playerImgSrc}${player.code}.png` }
                  onLoad={ this.handleImageLoaded.bind(this) }
                />
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">{ player.first_name} { player.last_name }</h4>
              <Link to={`/teams/${team.id}` }><h6 className="card-text">{ team.name }</h6></Link>
              <h6 className="card-text">{ position.singular_name }</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
