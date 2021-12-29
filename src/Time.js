import React from 'react';

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '00:00:00',
      offset: 0
    };
  }

  async getTimezone() {
    const secondsSinceEpoch = Math.round(Date.now()/1000);
    const rawTimezoneData = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${this.props.lat},${this.props.long}&timestamp=${secondsSinceEpoch}&key=${process.env.REACT_APP_TIME_API_KEY}`);
    const timezoneData = await rawTimezoneData.json()
    const offset = 1000 * (timezoneData.dstOffset + timezoneData.rawOffset);
    this.setState({'offset': offset});
  }

  updateTime() {
    let d1 = new Date(new Date().getTime() + this.state.offset);
    let utcDate = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
    this.setState({time: utcDate.toLocaleTimeString()});
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.long != this.props.long && prevProps.lat != this.props.lat) {
      clearInterval(this.intervalID);
      this.getTimezone();
      this.intervalID = setInterval(() => {
        this.updateTime();
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return <p>Local Time: {this.state.time}</p>;
  }
}

export default Time;