'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGridLayout = require('react-grid-layout');

var _reactGridLayout2 = _interopRequireDefault(_reactGridLayout);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yin on 2017/10/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);

//import reactDocs  from 'react-docgen';
var layoutGrid = {
  lg: 4, md: 3, sm: 2, xs: 2, xxs: 2
};

var DragGridLayout = function (_React$Component) {
  _inherits(DragGridLayout, _React$Component);

  function DragGridLayout() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DragGridLayout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DragGridLayout.__proto__ || Object.getPrototypeOf(DragGridLayout)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillMount = function () {
      var staticItem = [];
      var layoutsCard = _this.props.layoutsCard;
      for (var name in layoutsCard) {
        if (layoutsCard[name].static) {
          staticItem.push(name);
        }
      }
      _this.setState({
        cardArr: _this.props.items,
        layouts: _this.layoutsSort(_this.props.items),
        staticItem: staticItem // 该字段用于标识那些是可以拖动的
      });
    }, _this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.items !== _this.props.items) {
        var layouts = _this.layoutsSort(nextProps.items);
        _this.setState({ cardArr: nextProps.items, layouts: layouts, layout: layouts[_this.state.containerWidth] });
      }
      if (nextProps.layoutsCard !== _this.props.layoutsCard) {
        var staticItem = [];
        var layoutsCard = nextProps.layoutsCard;
        for (var name in layoutsCard) {
          if (layoutsCard[name].static) {
            staticItem.push(name);
          }
        }
        _this.setState({
          staticItem: staticItem // 该字段用于标识那些是可以拖动的
        });
      }
    }, _this.sortFunction = function (obj1, obj2) {
      if (obj1.y < obj2.y) {
        return -1;
      } else if (obj1.y > obj2.y) {
        return 1;
      } else {
        if (obj1.x < obj2.x) {
          return -1;
        } else if (obj1.x > obj2.x) {
          return 1;
        } else {
          return 0;
        }
      }
    }, _this.getSort = function (layout) {
      var arr = [];
      var layoutNew = layout.sort(_this.sortFunction);
      for (var k = 0; k < layoutNew.length; k++) {
        arr.push(layoutNew[k]['i']);
      }
      return arr;
    }, _this.layoutsSortCoreAlgorithm = function (arr, currnetX, currentY, nextWidth, grid) {
      var positionCard = { x: currnetX, y: currentY };
      if (arr.length > 0) {
        // 1.将所有同一行的全部筛选出来
        var widthSum = 0;
        //var gridCurrentX = 0
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].y === currentY) {
            widthSum = widthSum + arr[i].w;
          }
        }
        if (widthSum + nextWidth > grid) {
          // 换行
          positionCard = { x: 0, y: currentY + 1 };
        } else {
          // 不换行
          positionCard = { x: widthSum, y: currentY };
        }
      }
      return positionCard;
    }, _this.layoutGridBreakpoin = function (breakpoin, arr) {
      var arrBreakpoin = [];
      var currnetX = 0;
      var currentY = 0;
      for (var j = 0; j < arr.length; j++) {
        if (_this.props.layoutsCard[arr[j]] !== undefined) {
          var nextWidth = _this.props.layoutsCard[arr[j]][breakpoin];
          var cardPosition = _this.layoutsSortCoreAlgorithm(arrBreakpoin, currnetX, currentY, nextWidth, _this.props.cols[breakpoin]);
          currnetX = cardPosition.x;
          currentY = cardPosition.y;
          arrBreakpoin.push({ i: arr[j], w: nextWidth, h: _this.props.layoutsCard[arr[j]].h || 1, x: cardPosition.x, y: cardPosition.y, static: _this.props.layoutsCard[arr[j]].static || false });
          //arrBreakpoin.push({...this.props.layoutsCard[arr[j]],w: nextWidth,x:cardPosition.x,y:cardPosition.y})
        }
      }
      return arrBreakpoin;
    }, _this.layoutsSort = function (arr) {
      // 这里根据card的排序重新组装layouts
      var lgArr = _this.layoutGridBreakpoin('lg', arr);
      var mdArr = _this.layoutGridBreakpoin('md', arr);
      var smArr = _this.layoutGridBreakpoin('sm', arr);
      var xsArr = _this.layoutGridBreakpoin('xs', arr);
      var xxsArr = _this.layoutGridBreakpoin('xxs', arr);
      var layoutsNew = { lg: lgArr, md: mdArr, sm: smArr, xs: xsArr, xxs: xxsArr };
      return layoutsNew;
    }, _this.onDragStop = function (layout, oldItem, newItem, placeholder, e, element) {
      var cardArr = _this.getSort(layout);
      _this.props.dragCallback(cardArr);
    }, _this.onBreakpointChange = function (newBreakpoint, newCols) {
      _this.setState({ containerWidth: newBreakpoint });
    }, _this.onLayoutChange = function (layout, layouts) {}, _this.render = function () {
      var ems = [];
      _this.props.children.map(function (itm, ind) {
        if (itm !== null && _this.state.cardArr.indexOf(itm.key) > -1) {
          var height = void 0;
          if (itm.props.style && itm.props.style.height) {
            height = itm.props.style.height;
          } else {
            height = _this.props.rowHeight;
          }
          var itmNew = _extends({}, itm, { props: _extends({}, itm.props, { style: _extends({}, itm.props.style, { height: height }) }) });
          ems.push(itmNew);
        }
      });
      return _react2.default.createElement(
        'div',
        { className: 'drag-grid-layout', style: { position: 'relative' } },
        _react2.default.createElement(
          ResponsiveReactGridLayout,
          { layouts: _this.state.layouts,
            cols: _this.props.cols,
            verticalCompact: false,
            onDragStop: _this.onDragStop, layout: _this.state.layout,
            breakpoints: _this.props.breakpoints, onBreakpointChange: _this.onBreakpointChange,
            rowHeight: _this.props.rowHeight, onLayoutChange: _this.onLayoutChange, margin: _this.props.margin },
          ems.map(function (itm, ind) {
            return _react2.default.createElement(
              'div',
              { className: _this.state.staticItem.indexOf(itm.key) === -1 ? 'move' : '', key: itm.key },
              itm
            );
          })
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return DragGridLayout;
}(_react2.default.Component);

DragGridLayout.defaultProps = {
  rowHeight: 320,
  cols: {
    lg: 4,
    md: 3,
    sm: 2,
    xs: 2,
    xxs: 2
  },
  breakpoints: {
    lg: 1600,
    md: 1200,
    sm: 992,
    xs: 768,
    xxs: 0
  },
  margin: [20, 20]
};

DragGridLayout.propTypes = {
  /**
   * 可选
   *
   * 每个可拖曳区域高度
   */
  rowHeight: _propTypes2.default.number,
  /**
   * 可选
   *
   * 设置不同的栅格时，每行被划分为几个
   */
  cols: _propTypes2.default.shape({
    lg: _propTypes2.default.number,
    md: _propTypes2.default.number,
    sm: _propTypes2.default.number,
    xs: _propTypes2.default.number,
    xxs: _propTypes2.default.number
  }),
  /**
   * 可选
   *
   * 响应式栅格的断点(设置不同的栅格对应的像素)
   */
  breakpoints: _propTypes2.default.shape({
    lg: _propTypes2.default.number,
    md: _propTypes2.default.number,
    sm: _propTypes2.default.number,
    xs: _propTypes2.default.number,
    xxs: _propTypes2.default.number
  }),
  /**
   * 可选
   *
   * 每个可拖曳区域元素的margin布局
   */
  margin: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /**
   * 可选
   *
   * 每个可拖曳区域高度
   */
  layoutsCard: _propTypes2.default.object.isRequired,
  /**
   * 可选
   *
   * 每个可拖曳区域高度
   */
  items: _propTypes2.default.array.isRequired,
  /**
   * 可选
   *
   * 拖曳某个元素后的回调函数
   */
  dragCallback: _propTypes2.default.func
};

exports.default = DragGridLayout;
//# sourceMappingURL=index.js.map