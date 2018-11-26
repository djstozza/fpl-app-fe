import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchCurrentRound from '../../actions/round/fetch_current_round';
import Countdown from 'react-countdown-now';

export class RoundCountdown extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
    }
  }

  componentDidMount () {
    this.props.fetchCurrentRound();
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps === this.props) {
      return;
    }

    if (this.props.current_round) {
      this.setState({
        ...this.props,
        status: this.props.current_round_status.replace(/(_)/, ' '),
        loaded: true,
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!this.state.loaded) {
      return true
    } else if (nextProps.current_round_status === nextState.current_round_status) {
      return false
    } else {
      return true
    }
  }

  days (days) {
    if (days === 0) {
      return;
    } else if (days === '1') {
      return `${ days } day`;
    } else {
      return `${ days } days`;
    }
  }

  hours (hours) {
    if (hours === '00') {
      return;
    } else if (hours === '01') {
      return `${ hours.substr(1) } hour`;
    } else {
      return `${ hours } hours`;
    }
  }

  minutes (minutes) {
    if (minutes === '00') {
      return;
    } else if (minutes === '01') {
      return `${ minutes } minute`;
    } else {
      return `${ minutes } minutes`;
    }
  }

  seconds (seconds) {
    if (seconds === '01') {
      return `${ seconds } second`;
    } else {
      return `${ seconds } seconds`;
    }
  }

  completed () {
    if (this.state.current_round_status === 'waiver' || this.state.current_round_status === 'mini-draft') {
      return (
          <div className="alert alert-primary mb-0" role="alert">
          The { this.state.status } window for Round { this.state.current_round.id } has passed.
          </div>
      );
    } else {
      return (
          <div className="alert alert-primary mb-0" role="alert">
          Round { this.state.current_round.id } is now active.
          </div>
      );
    }
  }

  restartCounter () {
    if (new Date () > new Date(this.state.current_round.deadline_time) && !this.state.current_round.data_checked) {
      return;
    }

    this.props.fetchCurrentRound();
  }

  render () {
    if (this.state.loaded) {
      const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          this.restartCounter();
          return this.completed();
        } else {
          return (
              <div className="alert alert-primary mb-0" role="alert">
              Round { this.state.current_round.id } { this.state.status } window closes
                in { this.days(days) } { this.hours(hours) } { this.minutes(minutes) } { this.seconds(seconds) }.
              </div>
          );
        }
      }

      return (
          <Countdown
          date={ new Date(this.state.current_round_deadline_time) }
          renderer={ renderer }
        />
      )
    } else {
      return (
          <div/>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    current_round: state.CurrentRoundReducer.current_round,
    current_round_status: state.CurrentRoundReducer.current_round_status,
    current_round_deadline_time: state.CurrentRoundReducer.current_round_deadline_time,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchCurrentRound: fetchCurrentRound,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoundCountdown);
