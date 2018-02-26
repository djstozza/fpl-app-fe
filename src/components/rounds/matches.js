import React from 'react';
import _ from 'underscore';

import MatchDetailsTable from './match_details_table.js';

const moment = require('moment-timezone');

export default class Match extends React.Component {
  render () {
    const matches = this.props.matches;
    const teams = this.props.teams;
    const tz = this.props.tz;

    return (
      <div id="matches-accordion">
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
                <div className="card" key={`match-${match.id}` } >
                  <div
                    className="card-header accordion-header"
                    id={`match-${match.id}`}
                    data-toggle="collapse"
                    data-target={ `#match-${match.id}-result` }
                    aria-expanded="false"
                  >
                    <h6 className="mb-0">
                      <div className="row">
                        <div className="col col-sm-4 accordion-header-info">
                          { homeTeam.attributes.short_name }
                        </div>
                        <div className="col col-sm-1 accordion-header-info">
                          <img className='image-crest' src={ homeTeamImg } alt={ homeTeamName } />
                        </div>
                        <div className="col col-sm-2 accordion-header-info">
                          { match.attributes.team_h_score } - { match.attributes.team_a_score }
                        </div>
                        <div className="col col-sm-1 accordion-header-info">
                          <img className='image-crest' src={ awayTeamImg } alt={ awayTeamName } />
                        </div>
                        <div className="col col-sm-4 accordion-header-info">
                          { awayTeam.attributes.short_name }
                        </div>
                      </div>
                    </h6>
                  </div>
                  <div
                    id={ `match-${match.id}-result` }
                    className="collapse"
                    aria-labelledby={ `match-${match.id}` }
                  >
                    <div className="card-body">
                      <MatchDetailsTable
                        key={ `match-details-table-${match.id}` }
                        match={ match }
                        homeTeam={ homeTeam }
                        awayTeam={ awayTeam }
                      />
                    </div>
                  </div>
                </div>
              )
            } else {
              const kickoffTime = moment(match.attributes.kickoff_time).tz(tz).format('HH:MM')

              return (
                <div className="card" key={`match-${match.id}`}>
                  <div className="card-header" id={`match-${match.id}`}>
                    <h6 className="mb-0">
                      <div>
                        <div className="row">
                          <div className="col col-sm-4 accordion-header-info">
                            { homeTeam.attributes.short_name }
                          </div>
                          <div className="col col-sm-1 accordion-header-info">
                            <img className='image-crest' src={ homeTeamImg } alt={ homeTeamName } />
                          </div>
                          <div className="col col-sm-2 accordion-header-info">
                            { kickoffTime }
                          </div>
                          <div className="col col-sm-1 accordion-header-info">
                            <img className='image-crest' src={ awayTeamImg } alt={ awayTeamName } />
                          </div>
                          <div className="col col-sm-4 accordion-header-info">
                            { awayTeam.attributes.short_name }
                          </div>
                        </div>
                      </div>
                    </h6>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}
