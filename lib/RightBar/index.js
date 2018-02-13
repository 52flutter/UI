'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RightBar = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _reactDock = require('react-dock');

var _reactDock2 = _interopRequireDefault(_reactDock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yin on 2018/1/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RightBar = exports.RightBar = function (_React$Component) {
  _inherits(RightBar, _React$Component);

  function RightBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RightBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RightBar.__proto__ || Object.getPrototypeOf(RightBar)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var that = _this;
      return _react2.default.createElement(
        'div',
        null,
        _this.props.children.map(function (itm, ind) {
          if (itm.key === 'left') {
            return _react2.default.createElement(
              _reactDock2.default,
              { key: ind, dockStyle: { float: 'left' }, dimMode: 'none', position: 'left', size: _this.props.leftSize, isVisible: _this.props.leftIsVisible },
              itm
            );
          } else if (itm.key === 'right') {
            return that.props.rightIsVisible ? _react2.default.createElement(
              _reactDock2.default,
              { key: ind, dimMode: 'none', position: 'right',
                dockStyle: { float: 'right' }, size: _this.props.rightSize, isVisible: _this.props.rightIsVisible, onSizeChange: _this.props.rightOnSizeChange },
              itm
            ) : '';
          }
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return RightBar;
}(_react2.default.Component);

RightBar.defaultProps = {
  leftIsVisible: true,
  leftSize: 1
};
RightBar.propTypes = {
  /**
   * 可选
   *
   * 左侧区域是否显示
   */
  leftIsVisible: _react.PropTypes.bool,
  /**
   * 可选
   *
   * 左侧区域占屏幕的百分比
   */
  leftSize: _react.PropTypes.number,
  /**
   * 可选
   *
   * 右侧区域是否显示
   */
  rightIsVisible: _react.PropTypes.bool,
  /**
   * 可选
   *
   * 右侧区域占屏幕的百分比
   */
  rightSize: _react.PropTypes.number,
  /**
   * 可选
   *
   * 右侧区域拖动改变左右两侧的大小占比
   */
  rightOnSizeChange: _react.PropTypes.func
};

exports.default = (0, _dva.connect)()(RightBar);
//# sourceMappingURL=index.js.map