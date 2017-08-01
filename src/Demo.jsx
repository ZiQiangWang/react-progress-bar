/**
 * 
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-31 21:50:45
 */


import React, { Component } from 'react';
import ReactProgress from './react-progress';

class Progress extends Component {
  constructor() {
    super();

    this.state = {
      percent: 0,
      isLoading: false,
    };

    this.container = {
      position: 'relative',
      width: '100%',
      height: '200px',
    };
  }

  handlePercent = (flag) => {
    if (flag) {
      this.setState({
        ...this.state,
        percent: this.state.percent + 10,
      });
    } else {
      this.setState({
        ...this.state,
        percent: this.state.percent - 10,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      percent: parseInt(e.target.value, 10),
    });
  }

  handleLoading = (isLoading) => {
    this.setState({
      ...this.state,
      isLoading,
    });
  }

  render() {
    return (
      <div>
        <div style={this.container}>
          <ReactProgress trigger={this.state.percent} />
          <button onClick={() => this.handlePercent(false)}>-</button>
          <input value={this.state.percent} onChange={this.handleChange} />
          <button onClick={() => this.handlePercent(true)}>+</button>
        </div>

        <div style={this.container}>
          <ReactProgress trigger={this.state.isLoading} starColor="red" />
          <button onClick={() => this.handleLoading(true)}>开始</button>
          <button onClick={() => this.handleLoading(false)}>结束</button>
        </div>
      </div>
    );
  }
}


export default Progress;

