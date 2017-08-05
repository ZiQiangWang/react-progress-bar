/**
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-30 23:49:21
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReactProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        position: props.top ? 'fixed' : 'relative',
        top: 0,
        width: 0,
        opacity: 0,
        height: props.height,
        background: props.color,
        boxShadow: `0 0 10px ${props.color}`,
        transition: 'none',
      },
      starStyle: {
        position: 'absolute',
        right: `-${parseInt(props.height, 10) / 2}px`,
        width: props.height,
        height: props.height,
        borderRadius: '50%',
        background: props.starColor,
        boxShadow: `0 0 10px 2px ${props.starColor}`,
      },
    };
  }


  componentWillReceiveProps(nextProps) {
    const { trigger, disappearTime } = this.props;
    const { style } = this.state;
    const nextTrigger = nextProps.trigger;

    let nextStyle;
    if (typeof trigger === 'boolean') {
      const { waitTime, finishTime } = this.props;
      if (nextTrigger) {
        const initStyle = {
          ...style,
          width: 0,
          opacity: 0,
          transition: 'none',
        };

        nextStyle = {
          ...style,
          opacity: 1,
          width: '80%',
          transition: `width ${waitTime}s ease`,
        };

        this.setState({ ...this.state, style: initStyle }, () => {
          setTimeout(() => {
            this.setState({ ...this.state, style: nextStyle });
          }, 100);
        });
      } else {
        nextStyle = {
          ...style,
          opacity: 0,
          width: '100%',
          transition: `width ${finishTime}s ease, opacity ${disappearTime}s ease ${finishTime}s`,
        };
        this.setState({ ...this.state, style: nextStyle });
      }
    } else if (typeof trigger === 'number') {
      const percent = parseInt(nextTrigger, 10);
      const { stepTime } = this.props;
      if (percent === 100) {
        nextStyle = {
          ...style,
          opacity: 0,
          width: '100%',
          transition: `opacity ${disappearTime}s ease`,
        };
      } else if (percent < 100 && percent >= 0) {
        nextStyle = {
          ...style,
          opacity: 1,
          width: `${nextTrigger}%`,
          transition: `width ${stepTime}s ease`,
        };
      } else {
        throw new Error('Trigger as percent should not be greater than 100 or less than 0');
      }

      this.setState({
        ...this.state,
        style: nextStyle,
      });
    }
  }

  handleTransitionEnd = (e) => {
    if (e.propertyName !== 'opacity') {
      return;
    }

    const { trigger } = this.props;
    const { style } = this.state;

    if (!trigger) {
      const initStyle = {
        ...style,
        width: 0,
        opacity: 0,
        transition: 'none',
      };

      this.setState({
        ...this.state,
        style: initStyle,
      });
    }
  }

  render() {
    return (
      <div style={this.state.style} onTransitionEnd={this.handleTransitionEnd}>
        <div style={this.state.starStyle}></div>
      </div>
    );
  }
}

ReactProgress.defaultProps = {
  trigger: false,
  height: '2px',
  top: true,
  color: '#77b6ff',
  starColor: 'white',
  waitTime: 10,
  finishTime: 1,
  stepTime: 0.4,
  disappearTime: 0.4,
};

ReactProgress.propTypes = {
  trigger: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  height: PropTypes.string,
  top: PropTypes.bool,
  color: PropTypes.string,
  starColor: PropTypes.string,
  waitTime: PropTypes.number,
  finishTime: PropTypes.number,
  stepTime: PropTypes.number,
  disappearTime: PropTypes.number,
};
export default ReactProgress;
