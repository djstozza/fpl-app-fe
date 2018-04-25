import React from 'react';
import MatchDetailsTable from './match_details_table';
import { popup } from '../../utils/accordion_popup';
import find from 'lodash/find';

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
            const homeTeam = find(teams, (team) => { return team.id === parseInt(match.team_h_id, 10) });
            const awayTeam = find(teams, (team) => { return team.id === parseInt(match.team_a_id, 10) } );

            const homeTeamImg = require(`../../images/shields/${homeTeam.short_name.toLowerCase()}.png`);
            const awayTeamImg = require(`../../images/shields/${awayTeam.short_name.toLowerCase()}.png`);

            const homeTeamName = homeTeam.name;
            const awayTeamName = awayTeam.name;

            if (match.team_h_score != null && match.team_a_score != null) {
              return (
                <div className="card" key={ `match-${match.id}` }>
                  <div
                    className="card-header accordion-header"
                    id={`match-${match.id}`}
                    data-toggle="collapse"
                    data-target={ `#match-${match.id}-result` }
                    aria-expanded="false"
                    onClick={ (e) => popup(e) }
                  >
                    <div className="mb-0">
                      <div className="row">
                        <div className="col col-sm-4 accordion-header-info">
                          { homeTeam.short_name }
                        </div>
                        <div className="col col-sm-1 accordion-header-info">
                          <img className='image-crest' src={ homeTeamImg } alt={ homeTeamName } />
                        </div>
                        <div className="col col-sm-2 accordion-header-info text-nowrap">
                          { match.team_h_score } - { match.team_a_score }
                        </div>
                        <div className="col col-sm-1 accordion-header-info">
                          <img className='image-crest' src={ awayTeamImg } alt={ awayTeamName } />
                        </div>
                        <div className="col col-sm-4 accordion-header-info">
                          { awayTeam.short_name }
                        </div>
                      </div>
                    </div>
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
              const kickoffTime = moment(match.kickoff_time).tz(tz).format('HH:mm')
              return (
                <div className="card" key={`match-${match.id}`}>
                  <div className="card-header" id={`match-${match.id}`}>
                    <div className="mb-0">
                      <div>
                        <div className="row">
                          <div className="col col-sm-4 accordion-header-info">
                            { homeTeam.short_name }
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
                            { awayTeam.short_name }
                          </div>
                        </div>
                      </div>
                    </div>
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
