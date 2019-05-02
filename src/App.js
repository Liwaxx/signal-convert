import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import {
  BarChart, Bar, Cell, XAxis, YAxis
} from 'recharts';
import { LineChart, Line, Tooltip, Legend } from 'recharts';
import './App.css';




export default class Example extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      tampil: '',
      data: [],
      analog: [],
      render: [],
      renderAsk: [],
      ASK: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.timer = setTimeout(
      () => this.setState(prevState => ({ isLoading: !prevState.isLoading })),
      2500,
    );
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleClick = () => {

    const num = this.state.value.split('');

    if (this.state.value.includes(1) || this.state.value.includes(0)) {

      this.state.analog.push({ analog: 0 });
      this.state.ASK.push({ ASK: 0 });

      let data = num.map(e => {
        if (e == 0) {
          for (let i = 0; i <= 3; i++) {
            if (i == 2) { this.state.analog.push({ analog: -1 }) }
            else if (i > 2) { this.state.analog.push({ analog: 0 }) }
          }
          this.state.ASK.push({ ASK: 0 }, { ASK: 0 });
          return (
            {
              Digital: Number(e) - 1,
              Label: 0,
            }

          )

        }
        else {
          for (let i = 0; i <= 3; i++) {
            if (i == 2) { this.state.analog.push({ analog: 1 }) }
            else if (i > 2) { this.state.analog.push({ analog: 0 }) }
          }

          for (let i = 0; i <= 6; i++) {
            if (i == 1) { this.state.ASK.push({ ASK: 1 }) }
            else if (i == 2) { this.state.ASK.push({ ASK: 0 }) }
            else if (i == 3) { this.state.ASK.push({ ASK: -1 }) }
            else if (i == 4) { this.state.ASK.push({ ASK: 0 }) }
            else if (i == 5) { this.state.ASK.push({ ASK: 1 }) }
            else if (i == 6) { this.state.ASK.push({ ASK: 0 }) }
          }
          return (
            {
              Digital: Number(e),
              Label: 1
            }

          )
        }
      })
      this.setState({ data: data })
      this.setState({ tampil: 'Signal Value : ' + this.state.value, value: '' })
      this.setState({ render: this.state.analog, renderAsk: this.state.ASK })
      this.setState({ analog: [], ASK: [] })
    } else {
      alert('Bukan angka 1 atau 0')
      this.setState({ value: '' });
    }

  }


  render() {
    const { render, renderAsk, data, isLoading, tampil } = this.state;

    if (isLoading === true) {
      return (
        <div className="centerLoading">
          <div>
            <img src="ocinator.png" alt="logo" className="splash" />
          </div>
          <div className="kanan">
          <CircularProgress size={50} color='secondary' />

          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="App">
            <Card className="input">
              <div className="NB">
                <img src="ocinator.png" alt="logo" className="logoo" />
                Modulasi Digital
        </div>
              <div className="textField">
                <TextField
                  id="1" value={this.state.value} onChange={(e) => { this.handleChange(e) }} ref={(input) => this.myinput = input}
                />
              </div>
              <div className="button">
                <Button variant="contained" color="primary" onClick={this.handleClick}>
                  Convert
            </Button>
              </div>
            </Card>
            <div>
              {tampil}
            </div>
          </div>
          {
            data.length > 0 ? (
              <Card className="card">
                <BarChart
                  width={1000}
                  height={300}
                  data={this.state.data}
                  margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                  }}
                  barCategoryGap={-1}
                >
                  <XAxis dataKey="Label" />
                  <Legend />
                  <Bar dataKey="Digital" stroke="1" fill="#5495ff" />
                </BarChart>
              </Card>
            ) : (
                <Card className="card">
                  <div className="loading">
                    <CircularProgress size={50} />
                  </div>
                </Card>)
          }
          {
            render.length > 0 ? (<Card className="card">
              <LineChart width={1000} height={300} data={render}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barCategoryGap={-1}
              >
                <XAxis dataKey="Digital" />
                <Legend />
                <Line type="monotone" dataKey="Analog" dot={false} stroke="#5495ff" />
              </LineChart>
            </Card>) : (
                <Card className="card">
                  <div className="loading">
                    <CircularProgress size={50} />
                  </div>
                </Card>)
          }
          {
            renderAsk.length > 0 ? (<Card className="card">
              <LineChart width={1000} height={300} data={renderAsk}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <Legend />
                <XAxis dataKey="Digital" />
                <Line type="monotone" dataKey="Amplitude Shift Keying" dot={false} stroke="#5495ff" />
              </LineChart>
            </Card>) : (
                <Card className="card">
                  <div className="loading">
                    <CircularProgress size={50} />
                  </div>
                </Card>)
          }
          <Card className="card">
            <div className="loading">
              COMING SOON !
              </div>
          </Card>)
      </div>
      );
    }
  }
}
