'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style8 = require('antd/lib/modal/style');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _style9 = require('antd/lib/row/style');

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _style10 = require('antd/lib/col/style');

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _style11 = require('antd/lib/checkbox/style');

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _style12 = require('antd/lib/button/style');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _style13 = require('antd/lib/icon/style');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _style14 = require('antd/lib/input/style');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yin on 2017/10/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Search = _input2.default.Search;

var ItemSelectModal = function (_React$Component) {
  _inherits(ItemSelectModal, _React$Component);

  function ItemSelectModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ItemSelectModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ItemSelectModal.__proto__ || Object.getPrototypeOf(ItemSelectModal)).call.apply(_ref, [this].concat(args))), _this), _this.showModal = function () {
      _this.setState({
        newKey: new Date(),
        searchValue: ""
      });
    }, _this.emptySearchValue = function () {
      var unSelectedItems = _this.state.unSelectedItemsNoSearch;
      _this.setState({
        unSelectedItems: unSelectedItems,
        searchValue: ""
      });
    }, _this.hideModal = function () {
      var unSelectedItems = _this.getUnSelectedItems(_this.props.selectedItems, _this.props.allItems);
      _this.setState({
        newKey: new Date(), selectedItems: _this.props.selectedItems, unSelectedItems: unSelectedItems,
        allItems: _this.props.allItems, unSelectedItemsNoSearch: unSelectedItems,
        selectedCheckedItems: [], unSelectedCheckedItems: []
      });
      _this.props.hideModal();
    }, _this.onSave = function () {
      if (_this.state.selectedItems.length !== 0) {
        _this.props.onSave(_this.state.selectedItems);
        _this.setState({
          newKey: new Date()
        });
      }
    }, _this.getUnSelectedItems = function (selectedItems, allItems) {
      var unSelectedItems = allItems.filter(function (itm, ind) {
        var flage = true;
        for (var i = 0; i < selectedItems.length; i++) {
          if (selectedItems[i].key === itm.key) {
            flage = false;
            break;
          }
        }
        return flage;
      });
      return unSelectedItems;
    }, _this.componentWillMount = function () {
      var unSelectedItems = _this.getUnSelectedItems(_this.props.selectedItems, _this.props.allItems);
      _this.setState({
        selectedOriginal: _this.props.selectedItems,
        selectedItems: _this.props.selectedItems, unSelectedItems: unSelectedItems,
        allItems: _this.props.allItems, newKey: new Date(), unSelectedItemsNoSearch: unSelectedItems,
        selectedCheckedItems: [], unSelectedCheckedItems: []
      });
    }, _this.unSelectedOnChange = function (e, item) {
      var unSelectedCheckedItems = _this.state.unSelectedCheckedItems;
      if (e.target.checked) {
        unSelectedCheckedItems.push(item);
      } else {
        unSelectedCheckedItems = _this.state.unSelectedCheckedItems.filter(function (Item) {
          return Item.key !== item.key;
        });
      }
      _this.setState({
        unSelectedCheckedItems: unSelectedCheckedItems
      });
    }, _this.selectedOnChange = function (e, item) {
      var selectedCheckedItems = _this.state.selectedCheckedItems;
      if (e.target.checked) {
        selectedCheckedItems.push(item);
      } else {
        selectedCheckedItems = _this.state.selectedCheckedItems.filter(function (Item) {
          return Item.key !== item.key;
        });
      }
      _this.setState({
        selectedCheckedItems: selectedCheckedItems
      });
    }, _this.addAllItems = function () {
      if (_this.state.unSelectedItems.length === 0) {
        return;
      }
      var unSelectedItems = [];
      var selectedItems = _this.state.selectedItems.concat(_this.state.unSelectedItems);
      var that = _this;
      var unSelectedItemsNoSearch = _this.state.unSelectedItemsNoSearch.filter(function (item) {
        var flag = true;
        for (var i = 0; i < that.state.unSelectedItems.length; i++) {
          if (that.state.unSelectedItems[i].key === item.key) {
            flag = false;
            break;
          }
        }
        return flag;
      });
      _this.setState({
        selectedItems: selectedItems, unSelectedItems: unSelectedItems, unSelectedCheckedItems: [], unSelectedItemsNoSearch: unSelectedItemsNoSearch
      });
    }, _this.addItems = function () {
      if (_this.state.unSelectedCheckedItems.length === 0) {
        return;
      } else {
        var that = _this;
        var selectedItems = _this.state.selectedItems.concat(_this.state.unSelectedCheckedItems);
        var unSelectedItems = _this.state.unSelectedItems.filter(function (item) {
          var flag = true;
          for (var i = 0; i < that.state.unSelectedCheckedItems.length; i++) {
            if (that.state.unSelectedCheckedItems[i].key === item.key) {
              flag = false;
              break;
            }
          }
          return flag;
        });

        var unSelectedItemsNoSearch = _this.state.unSelectedItemsNoSearch.filter(function (item) {
          var flag = true;
          for (var i = 0; i < that.state.unSelectedCheckedItems.length; i++) {
            if (that.state.unSelectedCheckedItems[i].key === item.key) {
              flag = false;
              break;
            }
          }
          return flag;
        });

        _this.setState({
          selectedItems: selectedItems, unSelectedItems: unSelectedItems, unSelectedCheckedItems: [], unSelectedItemsNoSearch: unSelectedItemsNoSearch
        });
      }
    }, _this.addItem = function (itm) {
      var unSelectedItemsNoSearch = _this.state.unSelectedItemsNoSearch.filter(function (item) {
        return item.key !== itm.key;
      });
      var unSelectedItems = _this.state.unSelectedItems.filter(function (item) {
        return item.key !== itm.key;
      });
      var selectedItems = _this.state.selectedItems.filter(function (item) {
        return true;
      });
      selectedItems.push(itm);
      _this.setState({
        selectedItems: selectedItems, unSelectedItems: unSelectedItems, allItems: [], unSelectedItemsNoSearch: unSelectedItemsNoSearch
      });
    }, _this.removeItems = function () {
      if (_this.state.selectedCheckedItems.length === 0) {
        return;
      } else {
        var that = _this;
        var unSelectedItems = _this.state.unSelectedItems.concat(_this.state.selectedCheckedItems);
        var unSelectedItemsNoSearch = _this.state.unSelectedItemsNoSearch.concat(_this.state.selectedCheckedItems);
        var selectedItems = _this.state.selectedItems.filter(function (item) {
          var flag = true;
          for (var i = 0; i < that.state.selectedCheckedItems.length; i++) {
            if (that.state.selectedCheckedItems[i].key === item.key) {
              flag = false;
              break;
            }
          }
          return flag;
        });
        _this.setState({
          selectedItems: selectedItems, unSelectedItems: unSelectedItems, selectedCheckedItems: [], unSelectedItemsNoSearch: unSelectedItemsNoSearch
        });
      }
    }, _this.removeItem = function (itm) {
      var selectedItems = _this.state.selectedItems.filter(function (item) {
        return item.key !== itm.key;
      });
      //this.state.unSelectedItems.push(itm)
      var unSelectedItems = _this.state.unSelectedItems.concat();
      unSelectedItems.push(itm);
      var unSelectedItemsNoSearch = _this.state.unSelectedItemsNoSearch;
      unSelectedItemsNoSearch.push(itm);
      _this.setState({
        selectedItems: selectedItems, unSelectedItems: unSelectedItems, allItems: [], unSelectedItemsNoSearch: unSelectedItemsNoSearch
      });
    }, _this.judgeRemoveAll = function (arr) {
      var flag = false;
      for (var i = 0; i < arr.length; i++) {
        if (!arr[i].static) {
          flag = true;
          break;
        }
      }
      return flag;
    }, _this.removeAllItems = function () {
      var removeAllItemFlag = _this.judgeRemoveAll(_this.state.selectedItems);
      if (_this.state.selectedItems.length === 0 && !removeAllItemFlag) {
        return;
      }
      var oldSelectItems = _this.state.selectedItems.concat();
      var selectedItems = [];
      var unSelectedItems = _this.state.unSelectedItems.concat();
      var unSelectedItemsNoSearch = _this.state.unSelectedItemsNoSearch.concat();
      // 这里需要考虑有些列不能让其移动
      for (var i = 0; i < oldSelectItems.length; i++) {
        if (oldSelectItems[i].static) {
          selectedItems.push(oldSelectItems[i]);
        } else {
          unSelectedItems.push(oldSelectItems[i]);
          unSelectedItemsNoSearch.push(oldSelectItems[i]);
        }
      }
      _this.setState({
        selectedItems: selectedItems, unSelectedItems: unSelectedItems, selectedCheckedItems: [], unSelectedItemsNoSearch: unSelectedItemsNoSearch
      });
    }, _this.onSearch = function (e) {
      var searchText = e.target.value.replace(/(^\s*)|(\s*$)/g, "");
      var unSelectedItems = void 0;
      if (searchText !== '') {
        unSelectedItems = _this.state.unSelectedItemsNoSearch.filter(function (item) {
          if (item.title.indexOf(searchText) > -1 || item.title.indexOf(searchText.toUpperCase()) > -1 || item.title.indexOf(searchText.toLocaleLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        unSelectedItems = _this.state.unSelectedItemsNoSearch;
      }
      _this.setState({
        unSelectedItems: unSelectedItems,
        searchValue: searchText
      });
    }, _this.checkCheckBox = function (items, item) {
      var flag = false;
      for (var i = 0; i < items.length; i++) {
        if (items[i].key === item.key) {
          flag = true;
          break;
        }
      }
      return flag;
    }, _this.render = function () {
      var searchSuffix = _this.state.searchValue ? _react2.default.createElement(_icon2.default, { type: 'close-circle', onClick: _this.emptySearchValue }) : null;
      return _react2.default.createElement(
        _modal2.default,
        { width: '80%', className: 'table-setting', key: _this.state.newKey,
          maskClosable: false,
          title: _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(_icon2.default, { type: 'setting' }),
            _this.props.title
          ),
          visible: _this.props.visible,
          onOk: _this.onSave,
          onCancel: _this.hideModal,
          okText: _this.props.okText,
          cancelText: _this.props.cancelText,
          footer: [_react2.default.createElement(
            _button2.default,
            { key: 'back', onClick: _this.hideModal },
            _this.props.cancelText
          ), _react2.default.createElement(
            _button2.default,
            { key: 'submit', type: 'primary', disabled: _this.state.selectedItems.length === 0, title: _this.state.selectedItems.length === 0 ? _this.props.savePrompt : '', onClick: _this.onSave },
            _this.props.okText
          )]
        },
        _react2.default.createElement(
          _row2.default,
          { className: 'table-setting-content' },
          _react2.default.createElement(
            _col2.default,
            { span: 12 },
            _react2.default.createElement(
              'div',
              { className: 'table-setting-selected-header' },
              _react2.default.createElement(_input2.default, { onChange: _this.onSearch, placeholder: _this.props.placeholder, suffix: searchSuffix, value: _this.state.searchValue }),
              _react2.default.createElement(
                _button2.default.Group,
                null,
                _react2.default.createElement(_button2.default, { type: 'default', icon: 'double-right', disabled: !_this.state.unSelectedItems.length > 0,
                  onClick: _this.addAllItems, title: _this.props.addAllItemTitle }),
                _react2.default.createElement(_button2.default, { type: 'default', icon: 'right', disabled: !_this.state.unSelectedCheckedItems.length > 0,
                  onClick: _this.addItems, title: _this.props.addSelectedItemTitle })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'table-setting-selected-body' },
              _this.state.unSelectedItems.map(function (itm, ind) {
                return _react2.default.createElement(
                  'div',
                  { key: ind, className: itm.static ? "table-setting-selected-item disable" : "table-setting-selected-item" },
                  !itm.static ? _react2.default.createElement(_checkbox2.default, { onChange: function onChange(e) {
                      return _this.unSelectedOnChange(e, itm);
                    }, checked: _this.checkCheckBox(_this.state.unSelectedCheckedItems, itm) }) : _react2.default.createElement(_checkbox2.default, { onChange: function onChange(e) {
                      return _this.unSelectedOnChange(e, itm);
                    }, checked: _this.checkCheckBox(_this.state.unSelectedCheckedItems, itm), disabled: true }),
                  _react2.default.createElement(
                    'div',
                    { className: 'table-setting-selected-title' },
                    itm.title
                  ),
                  !itm.static ? _react2.default.createElement(
                    'div',
                    { className: 'table-setting-icon  table-setting-icon-default', onClick: function onClick() {
                        return _this.addItem(itm);
                      } },
                    _react2.default.createElement(_icon2.default, { type: 'plus' })
                  ) : _react2.default.createElement(
                    'div',
                    { className: 'table-setting-icon  table-setting-icon-default' },
                    _react2.default.createElement(_icon2.default, { type: 'plus' })
                  )
                );
              })
            )
          ),
          _react2.default.createElement(
            _col2.default,
            { span: 12 },
            _react2.default.createElement(
              'div',
              { className: 'table-setting-selected-header' },
              _react2.default.createElement(
                'p',
                null,
                _this.state.selectedItems.length,
                ' ',
                _this.props.itemSelectedContent
              ),
              _react2.default.createElement(
                _button2.default.Group,
                null,
                _react2.default.createElement(_button2.default, { type: 'default', icon: 'left', onClick: _this.removeItems,
                  disabled: !_this.state.selectedCheckedItems.length > 0, title: _this.props.removeSelectedItemTitle }),
                _react2.default.createElement(_button2.default, { type: 'default', icon: 'double-left', onClick: _this.removeAllItems,
                  disabled: !_this.state.selectedItems.length > 0 || !_this.judgeRemoveAll(_this.state.selectedItems), title: _this.props.removeAllItemTitle })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'table-setting-selected-body' },
              _this.state.selectedItems.length !== 0 ? _this.state.selectedItems.map(function (itm, ind) {
                return _react2.default.createElement(
                  'div',
                  { key: ind, className: itm.static ? "table-setting-selected-item disable" : "table-setting-selected-item" },
                  !itm.static ? _react2.default.createElement(_checkbox2.default, { onChange: function onChange(e) {
                      return _this.selectedOnChange(e, itm);
                    }, checked: _this.checkCheckBox(_this.state.selectedCheckedItems, itm) }) : _react2.default.createElement(_checkbox2.default, { onChange: function onChange(e) {
                      return _this.selectedOnChange(e, itm);
                    }, checked: _this.checkCheckBox(_this.state.selectedCheckedItems, itm), disabled: true }),
                  _react2.default.createElement(
                    'div',
                    { className: 'table-setting-selected-title' },
                    itm.title
                  ),
                  !itm.static ? _react2.default.createElement(
                    'div',
                    { className: 'table-setting-icon table-setting-icon-danger', onClick: function onClick() {
                        return _this.removeItem(itm);
                      } },
                    _react2.default.createElement(_icon2.default, { type: 'close' })
                  ) : _react2.default.createElement(
                    'div',
                    { className: 'table-setting-icon table-setting-icon-danger disable' },
                    _react2.default.createElement(_icon2.default, { type: 'close' })
                  )
                );
              }) : _react2.default.createElement(
                'span',
                { className: 'prompt' },
                _this.props.savePrompt
              )
            )
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // 将未选择的列全部添加

  // 添加选中列

  // 添加单个列

  // 移除所选列

  // 移除单个列

  // 该方法是用于判断已选的items是否包含可以移动的,以便判断全部移动按钮是否可用

  // 将以选中的列全部移除


  return ItemSelectModal;
}(_react2.default.Component);

ItemSelectModal.defaultProps = {
  okText: 'Save',
  cancelText: 'Cancel',
  title: "Select Columns to Show",
  placeholder: "search",
  itemSelectedContent: "item selected",
  addAllItemTitle: "add all items",
  addSelectedItemTitle: "add Selected items",
  removeAllItemTitle: "remove all items",
  removeSelectedItemTitle: "remove Selected items",
  savePrompt: 'Please select one of the least'
};

ItemSelectModal.propTypes = {
  /**
   * 必选
   *
   * 选中的Items,结构对象：{key: ',title: '}
   */
  selectedItems: _propTypes2.default.arrayOf(function (propValue, key, componentName, location, propFullName) {
    if (!('key' in propValue[key] && 'title' in propValue[key])) {
      return new Error('Invalid prop `' + 'selectedItems' + '` supplied to' + ' `' + componentName + '`. Validation failed.');
    }
  }).isRequired,
  /**
   * 可选
   *
   * 确认按钮文本内容
   */
  okText: _propTypes2.default.string,
  /**
   * 可选
   *
   * 确认按钮被禁用后给予的提示信息
   */
  savePrompt: _propTypes2.default.string,
  /**
   * 可选
   *
   * 取消按钮文本内容
   */
  cancelText: _propTypes2.default.string,
  /**
   * 必选
   *
   * 所有的Items,结构对象：{key: ',title: '}
   */
  allItems: _propTypes2.default.arrayOf(function (propValue, key, componentName, location, propFullName) {
    if (!('key' in propValue[key] && 'title' in propValue[key])) {
      return new Error('Invalid prop `' + 'allItems' + '` supplied to' + ' `' + componentName + '`. Validation failed.');
    }
  }).isRequired,
  /**
   * 必选
   *
   * 点击保存按钮，回调函数
   */
  onSave: _propTypes2.default.func,
  /**
   * 必选
   *
   * 是否弹出模态框
   */
  visible: _propTypes2.default.bool.isRequired,
  /**
   * 必选
   *
   * 点击取消按钮，回调函数
   */
  hideModal: _propTypes2.default.func.isRequired,
  title: _propTypes2.default.string.isRequired,
  placeholder: _propTypes2.default.string.isRequired,
  itemSelectedContent: _propTypes2.default.string.isRequired,
  addAllItemTitle: _propTypes2.default.string,
  addSelectedItemTitle: _propTypes2.default.string,
  removeAllItemTitle: _propTypes2.default.string,
  removeSelectedItemTitle: _propTypes2.default.string
};
exports.default = ItemSelectModal;
//# sourceMappingURL=index.js.map