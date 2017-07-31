'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @authors ZiQiangWang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @email   814120507@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date    2017-07-30 23:49:21
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ReactProgress = function (_Component) {
  _inherits(ReactProgress, _Component);

  function ReactProgress(props) {
    _classCallCheck(this, ReactProgress);

    var _this = _possibleConstructorReturn(this, (ReactProgress.__proto__ || Object.getPrototypeOf(ReactProgress)).call(this, props));

    _this.handleTransitionEnd = function (e) {

      if (e.propertyName !== 'opacity') {
        return;
      }

      var trigger = _this.props.trigger;
      var style = _this.state.style;


      if (!trigger) {
        var initStyle = _extends({}, style, {
          width: 0,
          opacity: 0,
          transition: 'width 0s, opacity 0s'
        });

        _this.setState(_extends({}, _this.state, {
          style: initStyle
        }));
      }
    };

    _this.state = {
      style: {
        position: props.top ? 'fixed' : 'relative',
        top: 0,
        width: 0,
        opacity: 0,
        height: props.height,
        background: props.color,
        boxShadow: '0 0 10px ' + props.color,
        transition: 'width 0s, opacity 0s'
      },
      starStyle: {
        position: 'absolute',
        right: '-' + parseInt(props.height) / 2 + 'px',
        width: props.height,
        height: props.height,
        borderRadius: '50%',
        background: props.starColor,
        boxShadow: '0 0 10px 2px ' + props.starColor
      }
    };
    return _this;
  }

  _createClass(ReactProgress, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          trigger = _props.trigger,
          disappearTime = _props.disappearTime;
      var style = this.state.style;

      var nextTrigger = nextProps.trigger;

      if (trigger === nextTrigger) {
        return;
      }

      var nextStyle = void 0;

      if (typeof trigger === 'boolean') {
        var _props2 = this.props,
            waitTime = _props2.waitTime,
            finishTime = _props2.finishTime;

        if (nextTrigger) {
          nextStyle = _extends({}, style, {
            opacity: 1,
            width: '80%',
            transition: 'width ' + waitTime + 's ease'
          });
        } else {
          nextStyle = _extends({}, style, {
            opacity: 0,
            width: '100%',
            transition: 'width ' + finishTime + 's ease, opacity ' + disappearTime + 's ease ' + finishTime + 's'
          });
        }
      } else if (typeof trigger === 'number') {
        var percent = parseInt(nextTrigger);
        var stepTime = this.props.stepTime;

        if (percent === 100) {
          nextStyle = _extends({}, style, {
            opacity: 0,
            width: '100%',
            transition: 'opacity ' + disappearTime + 's ease'
          });
        } else if (percent < 100 && percent >= 0) {
          nextStyle = _extends({}, style, {
            opacity: 1,
            width: nextTrigger + '%',
            transition: 'width ' + stepTime + 's ease'
          });
        } else {
          throw new Error('Trigger as percent should not be greater than 100 or less than 0');
        }
      }

      this.setState(_extends({}, this.state, {
        style: nextStyle
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.state.style, onTransitionEnd: this.handleTransitionEnd },
        _react2.default.createElement('div', { style: this.state.starStyle })
      );
    }
  }]);

  return ReactProgress;
}(_react.Component);

ReactProgress.defaultProps = {
  trigger: false,
  height: '2px',
  top: false,
  color: '#77b6ff',
  starColor: 'white',
  waitTime: 10,
  finishTime: 1,
  stepTime: .4,
  disappearTime: .4
};

ReactProgress.propTypes = {
  trigger: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]).isRequired,
  height: _propTypes2.default.string,
  top: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  starColor: _propTypes2.default.string,
  waitTime: _propTypes2.default.number,
  finishTime: _propTypes2.default.number,
  stepTime: _propTypes2.default.number,
  disappearTime: _propTypes2.default.number
};
exports.default = ReactProgress;