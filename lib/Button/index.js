'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonComponent = undefined;

var _style2 = require('antd/lib/button/style');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonComponent = exports.ButtonComponent = function (_React$Component) {
  _inherits(ButtonComponent, _React$Component);

  function ButtonComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ButtonComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ButtonComponent.__proto__ || Object.getPrototypeOf(ButtonComponent)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var test = _extends({}, _this.props);
      delete test.type;
      delete test.content;
      delete test.dispatch;
      return _react2.default.createElement(
        _button2.default,
        _extends({}, test, { className: _this.props.type === 'primary' ? 'ant-btn-primary' : _this.props.type === 'danger' ? 'ant-btn-danger' : _this.props.type === 'skip' ? 'ant-btn-skip' : '' }),
        _this.props.content
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ButtonComponent;
}(_react2.default.Component);

ButtonComponent.defaultProps = {};
ButtonComponent.propTypes = {
  /**
   * 可选
   *l
   * 设置按钮样式，可选值为 primary default danger skip 或者不设
   */
  type: _react.PropTypes.string,
  /**
   * 必选
   *
   * 按钮的文字
   */
  content: _react.PropTypes.string
};
exports.default = (0, _dva.connect)()(ButtonComponent);
//# sourceMappingURL=index.js.map