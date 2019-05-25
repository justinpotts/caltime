import React, { Component } from 'react';
import logo from './logo.svg';
import tracks from './tracks.png';
import './App.css';
import data from './schedule.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureStation: '',
      arrivalStation: '',
      timeStatus: '',
      leaveBy: '',
      bestRoute: null,
    }
    //this.onDepartureStationChange = this.onDepartureStationChange.bind(this);
    this.submitPrefs = this.submitPrefs.bind(this);
  }

  onPrefChange(e, key) {
    this.setState({
      [key]: e.target.value,
      bestRoute: null
    });
  }

  submitPrefs() {
    // 👇 This is how to access json data
    // console.log(data.stations)

    const departureStationIndex = data.stations.indexOf(this.state.departureStation);
    const arrivalStationIndex = data.stations.indexOf(this.state.arrivalStation);

    console.log(departureStationIndex);
    console.log(arrivalStationIndex);

    var direction = '';

    if(arrivalStationIndex > departureStationIndex) {
      direction = "Northbound"
    } else {
      direction = "Southbound"
    }

    console.log(direction);

    const leaveByHr = Number.parseInt(this.state.leaveBy.split(':')[0], 10);
    const leaveByMin = Number.parseInt(this.state.leaveBy.split(':')[1], 10);

    var bestRoute = null;

    Object.keys(data.Northbound).map((route) => {
        // console.log(this.state.departureStation);
        const departure = data[direction][route][this.state.departureStation];
        if(departure != null) {
          const departureTimeHr = Number.parseInt(departure.split(':')[0], 10);
          const departureTimeMin = Number.parseInt(departure.split(':')[1], 10);

          // dep time 2:30         opt time 2:28

          if(leaveByHr >= departureTimeHr) {
            if(leaveByHr === departureTimeHr) {
              if(leaveByMin > departureTimeMin) {
                bestRoute = route;
                bestRoute = {'route': route, 'departureTime': departure, 'direction': direction}
                console.log(typeof bestRoute)
                return;
              }
            } else {
              bestRoute = {'route': route, 'departureTime': departure, 'direction': direction}
              console.log(typeof bestRoute)
              return;
            }
          }
        }
    })

    this.setState({
      bestRoute: bestRoute
    });
  }

  render() {

    const departureStationInput = (
      <input
        className="station"
        placeholder="San Francisco"
        value={this.state.departureStation}
        onChange={(e) => this.onPrefChange(e, 'departureStation')}
      />
    )

    const arrivalStationInput = (
      <input
        className="station"
        placeholder="Mountain View"
        value={this.state.arrivalStation}
        onChange={(e) => this.onPrefChange(e, 'arrivalStation')}
      />
    )

    const timeStatusInput = (
      <input
        className="timeStatus"
        placeholder="arrive"
        value={this.state.timeStatus}
        onChange={(e) => this.onPrefChange(e, 'timeStatus')}
      />
    )

    const leaveByInput = (
      <input
        className="time"
        placeholder="9:00 am"
        value={this.state.leaveBy}
        onChange={(e) => this.onPrefChange(e, 'leaveBy')}
      />
    )

    return (
      <div className="App">
        <div className="navbar">
          <div className="navbar-brand">Cal<span className="highlight">time</span></div>
        </div>
        <div className="container">
          <div className="split-left">
            <p className="prompt">From {departureStationInput} to {arrivalStationInput}, {timeStatusInput} by {leaveByInput}.</p>
            <button className="btn btn-outline" onClick={this.submitPrefs}>All aboard!</button>
          </div>
          <div className="split-right">
            <p className="result">{(this.state.bestRoute) ? `Take the ${this.state.bestRoute["route"]} departing ${this.state.bestRoute["direction"]} from ${this.state.departureStation} at ${this.state.bestRoute["departureTime"]}.` : ''}</p>
          </div>
        </div>
        <div className="container-wide">
          <center>
            <img src={tracks} width="95%"></img>
          </center>
        </div>
        <div className="container">
          <center>
            <p className="prompt">Say <a href="#"><span class="highlight">thanks</span></a>, request a feature, or buy Justin a tea!</p>
            <button className="btn btn-fill" onClick={this.submitPrefs}>Donate</button>
          </center>
        </div>
      </div>
    );
  }
}

export default App;
