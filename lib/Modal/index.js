'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalComponent = undefined;

var _style2 = require('antd/lib/modal/style');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _index = require('../Button/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalComponent = exports.ModalComponent = function (_React$Component) {
  _inherits(ModalComponent, _React$Component);

  function ModalComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ModalComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModalComponent.__proto__ || Object.getPrototypeOf(ModalComponent)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var test = _extends({}, _this.props);
      delete test.disabled;
      delete test.content;
      delete test.dispatch;
      delete test.size;
      return _react2.default.createElement(
        _modal2.default,
        _extends({}, test, { title: _this.props.title, width: _this.props.size === 'large' ? '1200px' : _this.props.size === 'middle' ? '860px' : '520px', maskClosable: false,
          footer: _this.props.footer !== void 0 ? _this.props.footer : _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_index2.default, { key: '_modal_cancel', onClick: _this.props.onCancel, size: 'large', content: _this.props.cancelText || '取消' }),
            _react2.default.createElement(_index2.default, { key: '_modal_ok', disabled: _this.props.disabled, onClick: _this.props.onOk, type: 'primary', size: 'large', loading: _this.props.confirmLoading, content: _this.props.okText || '保存' })
          ) }),
        _this.props.content
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ModalComponent;
}(_react2.default.Component);

ModalComponent.defaultProps = {
  size: 'small'
};
ModalComponent.propTypes = {
  /**
   * 必选
   *
   * 标题
   */
  title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]).isRequired,
  /**
   * 可选
   *
   * 设置模态框宽度，可选值为 large middle 或者不设
   */
  size: _react.PropTypes.string,
  /**
   * 可选
   *
   * 确定按钮 disabled
   */
  disabled: _react.PropTypes.bool,
  /**
   * 必选
   *
   * 对话框的内容
   */
  content: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]).isRequired
};
exports.default = (0, _dva.connect)()(ModalComponent);
//# sourceMappingURL=index.js.map