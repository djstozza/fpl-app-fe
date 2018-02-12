import React from 'react';

export default class MatchDetailsTable extends React.Component {
  render () {
    const attributes = this.props.match.attributes;
    const stats = attributes.stats;
    const goalsScored = stats.goals_scored;
    const assists = stats.assists;
    const ownGoals = stats.own_goals;
    const saves = stats.saves;
    const yellowCards = stats.yellow_cards;
    const redCards = stats.red_cards;
    const penaltiesSaved = stats.penalties_saved;
    const penaltiesMissed = stats.penalties_missed;
    const bonus = stats.bonus;

    let matchStatRows = (matchStatHash, key) => {
      return [
        <tr key={`tr-${this.props.match.id}-${matchStatHash.initials}-${key}`}>
          <td>
            <b>{ matchStatHash.initials }</b>
          </td>
          <td>
            {
              matchStatHash.home_team.map((stat, key) => {
                return (
                  <p key={ `home-player-${matchStatHash.initials}-${key}` }>{ stat.player.last_name }</p>
                );
              })
            }
          </td>
          <td>
            {
              matchStatHash.home_team.map((stat, key) => {
                return (
                  <p key={ `home-value-${matchStatHash.initials}-${key}` }>{ stat.value }</p>
                );
              })
            }
          </td>
          <td>
            {
              matchStatHash.away_team.map((stat, key) => {
                return (
                  <p key={ `away-player-${matchStatHash.initials}-${key}` }>{ stat.player.last_name }</p>
                );
              })
            }
          </td>
          <td>
            {
              matchStatHash.away_team.map((stat, key) => {
                return (
                  <p key={ `away-value-${matchStatHash.initials}-${key}` }>{ stat.value }</p>
                );
              })
            }
          </td>
        </tr>
      ]

    }

    return (
      <table className="centered bordered striped">
        <tbody>
          <tr>
            <td/>
            <td>
              <b>{ this.props.homeTeam.attributes.name }</b>
            </td>
            <td>
              <b>{ this.props.match.attributes.team_h_score }</b>
            </td>
            <td>
              <b>{ this.props.awayTeam.attributes.name }</b>
            </td>
            <td>
              <b>{ attributes.team_a_score }</b>
            </td>
          </tr>
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
