'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style3 = require('antd/lib/card/style');

var _card = require('antd/lib/card');

var _card2 = _interopRequireDefault(_card);

var _style4 = require('antd/lib/icon/style');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yin on 2017/10/9.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * 基于antd基础之上二次封装Card
 */
var CardComponent = function (_React$Component) {
  _inherits(CardComponent, _React$Component);

  function CardComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CardComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CardComponent.__proto__ || Object.getPrototypeOf(CardComponent)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      return _react2.default.createElement(
        _card2.default,
        { style: _extends({}, _this.props.style), title: _this.props.title,
          extra: _this.props.closeButton ? _react2.default.createElement(_icon2.default, { onClick: function onClick() {
              return _this.props.closeFunction(_this.props.id);
            }, type: 'close', className: 'pointer' }) : '' },
        _react2.default.createElement(
          'div',
          null,
          _this.props.children
        ),
        _this.props.detailsButton ? _react2.default.createElement(
          'div',
          { className: 'more-card' },
          _react2.default.createElement(
            'a',
            { onClick: function onClick() {
                return _this.props.detailsFunction(_this.props.id);
              } },
            _this.props.detailsText
          )
        ) : ''
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return CardComponent;
}(_react2.default.Component);

CardComponent.defaultProps = {
  closeButton: true,
  detailsText: _react2.default.createElement(_icon2.default, { type: 'double-right' }),
  detailsButton: true
};
CardComponent.propTypes = {
  /**
   * 必选
   *
   * Card的唯一标识
   */
  id: _propTypes2.default.string.isRequired,
  /**
   * 可选
   *
   * 是否显示关闭按钮
   */
  closeButton: _propTypes2.default.bool,
  /**
   * 可选
   *
   * 点击关闭按钮回调函数
   * 回调函数可接收id
   */
  closeFunction: _propTypes2.default.func,
  /**
   * 可选
   *
   * 点击详情按钮回调函数
   * 回调函数可接收id
   */
  detailsFunction: _propTypes2.default.func,
  /**
   * 可选
   *
   * 标题
   */
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  /**
   * 可选
   *
   * 右下角详情文本
   * （注：如果传了该属性，对应detailsFunction必须也一同传入）
   */
  detailsText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  /**
   * 可选
   *
   * 自定义样式
   */
  style: _propTypes2.default.object
};

exports.default = CardComponent;
//# sourceMappingURL=index.js.map