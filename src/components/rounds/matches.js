import React from 'react';
import _ from 'underscore';
import $ from 'jquery';

import MatchDetailsTable from './match_details_table.js';

const moment = require('moment-timezone');

export default class Match extends React.Component {
  componentDidMount () {
    $('.collapsible').collapsible();
  }

  render () {
    const matches = this.props.matches;
    const teams = this.props.teams;
    const tz = this.props.tz;

    return (
      <div>
        <ul className="collapsible popout" data-collapsible="expandible">
          {
            matches.map(function (match, key) {
              const homeTeam = _.find(teams, (team) => { return team.id === match.relationships.team_h.data.id });
              const awayTeam = _.find(teams, (team) => { return team.id === match.relationships.team_a.data.id } );

              const homeTeamImg = require(`../../images/shields/${homeTeam.attributes.short_name.toLowerCase()}.png`);
              const awayTeamImg = require(`../../images/shields/${awayTeam.attributes.short_name.toLowerCase()}.png`);

              const homeTeamName = homeTeam.attributes.name;
              const awayTeamName = awayTeam.attributes.name;


              if (match.attributes.team_h_score != null && match.attributes.team_a_score != null) {
                return (
                  <li key={`match-${match.id}`}>
                    <div key={`match-header-${match.id}`} className="collapsible-header valign-wrapper">
                      <div className="col s2 center-align">
                        { homeTeam.attributes.short_name }
                      </div>
                      <div className="col s2 center-align">
                        <img className='image-crest' src={ homeTeamImg } alt={ homeTeamName } />
                      </div>
                      <div className="col s3 center-align">
                        { match.attributes.team_h_score } - { match.attributes.team_a_score }
                      </div>
                      <div className="col s2 center-align">
                        <img className='image-crest' src={ awayTeamImg } alt={ awayTeamName } />
                      </div>
                      <div className="col s2 center-align">
                        { awayTeam.attributes.short_name }
                      </div>
                    </div>
                    <div key={ `match-details-${match.id}` } className="collapsible-body">
                      <MatchDetailsTable
                        key={ `match-details-table-${match.id}` }
                        match={ match }
                        homeTeam={ homeTeam }
                        awayTeam={ awayTeam }
                      />
                    </div>
                  </li>
                )
              } else {
                const kickoffTime = moment(match.attributes.kickoff_time).tz(tz).format('HH:MM')

                return (
                  <li key={`match-${match.id}`}>
                    <div key={`match-header-${match.id}`} className="collapsible-header valign-wrapper">
                      <div className="col s2 center-align">
                        { homeTeam.attributes.short_name }
                      </div>
                      <div className="col s2 center-align">
                        <img className='image-crest' src={ homeTeamImg } alt={ homeTeamName } />
                      </div>
                      <div className="col s3 center-align">
                        { kickoffTime }
                      </div>
                      <div className="col s2 center-align">
                        <img className='image-crest' src={ awayTeamImg } alt={ awayTeamName } />
                      </div>
                      <div className="col s2 center-align">
                        { awayTeam.attributes.short_name }
                      </div>
                    </div>
                  </li>
                )
              }
            })
          }
        </ul>
      </div>
    )
  }
}
