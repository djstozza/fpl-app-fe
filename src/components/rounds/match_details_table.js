import React from 'react';
import { Link } from 'react-router-dom';

export default class MatchDetailsTable extends React.Component {
  render () {
    const stats = this.props.match.stats;
    const goalsScored = stats.goals_scored;
    const assists = stats.assists;
    const ownGoals = stats.own_goals;
    const saves = stats.saves;
    const yellowCards = stats.yellow_cards;
    const redCards = stats.red_cards;
    const penaltiesSaved = stats.penalties_saved;
    const penaltiesMissed = stats.penalties_missed;
    const bonus = stats.bonus;

    const matchStatRows = (matchStatHash, key) => {
      return [
          <tr key={ `tr-${ this.props.match.id }-${ matchStatHash.initials }-${ key }` }>
              <td>
                  <b data-toggle="tooltip" data-placement="top" title={ matchStatHash.name }>{ matchStatHash.initials }</b>
              </td>
              <td>
                  {
              matchStatHash.home_team.map((stat, key) => {
                return (
                    <p key={ `home-player-${ matchStatHash.initials }-${ key }` }>
                        <Link to={ `/players/${ stat.player.id }` }>{ stat.player.last_name }</Link>
                    </p>
                );
              })
            }
              </td>
              <td>
                  {
              matchStatHash.home_team.map((stat, key) => {
                return (
                    <p key={ `home-value-${ matchStatHash.initials }-${ key }` }>{ stat.value }</p>
                );
              })
            }
              </td>
              <td>
                  {
              matchStatHash.away_team.map((stat, key) => {
                return (
                    <p key={ `away-player-${ matchStatHash.initials }-${ key }` }>
                        <Link to={ `/players/${ stat.player.id }` }>{ stat.player.last_name }</Link>
                    </p>
                );
              })
            }
              </td>
              <td>
                  {
              matchStatHash.away_team.map((stat, key) => {
                return (
                    <p key={ `away-value-${ matchStatHash.initials }-${ key }` }>{ stat.value }</p>
                );
              })
            }
              </td>
          </tr>
      ]
    }

    return (
        <table className="table table-striped table-bordered table-hover centered-table">
            <thead>
                <tr>
                    <th/>
                    <th>
                        <Link to={ `/teams/${ this.props.homeTeam.id }` } > { this.props.homeTeam.name }</Link>
                    </th>
                    <th>
                        { this.props.match.team_h_score }
                    </th>
                    <th>
                        <Link to={ `/teams/${ this.props.awayTeam.id }` } > { this.props.awayTeam.name }</Link>
                    </th>
                    <th>
                        { this.props.match.team_a_score }
                    </th>
                </tr>
            </thead>
            <tbody>
                { matchStatRows(goalsScored) }
                { matchStatRows(assists) }
                { matchStatRows(ownGoals) }
                { matchStatRows(penaltiesSaved) }
                { matchStatRows(penaltiesMissed) }
                { matchStatRows(yellowCards) }
                { matchStatRows(redCards) }
                { matchStatRows(saves) }
                { matchStatRows(bonus) }
            </tbody>
        </table>
    )
  }
}
