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
    const backgroundImg = require("../../images/football-background.jpg");

    function playerAvailability (chance) {
      return chance === undefined && player.status === "a" ? '100%' : `${chance}%`
    }

    function newsRow () {
      if (player.news.length > 0) {
        return (
          <tr>
            <td><b>News</b></td>
            <td>{ player.news }</td>
          </tr>
        )
      }
    }

    return (
      <div className="row">
        <div className="col col-md-6 col-sm-12 col-12">
          <div className="card">
            <img className="card-img-top" src={ backgroundImg } alt="Football field" />
            <div className={ `row profile-photo text-center ${this.state.imageStatus}` }>
              <div className="col col-sm-12">
                <img
                  className='img-thumbnail rounded-circle player-img'
                  src={ `${playerImgSrc}${player.code}.png` }
                  onLoad={ this.handleImageLoaded.bind(this) }
                  alt={ player.last_name }
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
        <div className="col col-md-6 col-sm-12 col-12 mt-auto mb-auto">
          <table className="table table-striped table-bordered table-hover centered-table details-table">
            <thead>
              <tr>
                <th colSpan="2"><b>Details</b></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Total Points</b></td>
                <td>{ player.total_points }</td>
              </tr>
              <tr>
                <td><b>Status</b></td>
                <td>{ player.status }</td>
              </tr>
              { newsRow() }
              <tr>
                <td><b>Chance Of Playing This Round</b></td>
                <td>{ playerAvailability(player.chance_of_playing_this_round) }</td>
              </tr>
              <tr>
                <td><b>Chance Of Playing Next Round</b></td>
                <td>{ playerAvailability(player.chance_of_playing_next_round) }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
