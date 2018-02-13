'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapComponent = undefined;

var _style10 = require('antd/lib/icon/style');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _style11 = require('antd/lib/upload/style');

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _style12 = require('antd/lib/col/style');

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _style13 = require('antd/lib/input/style');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _style14 = require('antd/lib/row/style');

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _style15 = require('antd/lib/button/style');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _style16 = require('antd/lib/modal/style');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _style17 = require('antd/lib/form/style');

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _style18 = require('antd/lib/select/style');

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _index = require('../Modal/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _select2.default.Option;
var FormItem = _form2.default.Item;

var MapComponent = exports.MapComponent = function (_React$Component) {
  _inherits(MapComponent, _React$Component);

  function MapComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MapComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MapComponent.__proto__ || Object.getPrototypeOf(MapComponent)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      document.addEventListener('mousedown', _this.getDownXY);
      document.addEventListener('mouseup', _this.mapUp);
      document.addEventListener('mousemove', _this.mapMove);
      _this.setState({
        containerX: document.getElementById('svg_container').offsetLeft,
        containerY: document.getElementById('svg_container').offsetTop,
        propMapWidth: document.getElementById('svg_container').clientWidth,
        propMapHeight: document.getElementById('svg_container').clientHeight
      });
      window.onresize = function () {
        _this.setState({
          containerX: document.getElementById('svg_container').offsetLeft,
          containerY: document.getElementById('svg_container').offsetTop,
          propMapWidth: document.getElementById('svg_container').clientWidth,
          propMapHeight: document.getElementById('svg_container').clientHeight
        });
      };
    }, _this.componentWillUnmount = function () {
      window.onresize = '';
      document.removeEventListener('mousedown', _this.getDownXY);
      document.removeEventListener('mouseup', _this.mapUp);
      document.removeEventListener('mousemove', _this.mapMove);
    }, _this.getDownXY = function (event) {
      _this.setState({
        downX: event.pageX,
        downY: event.pageY,
        containerX: document.getElementById('svg_container').offsetLeft,
        containerY: document.getElementById('svg_container').offsetTop,
        propMapWidth: document.getElementById('svg_container').clientWidth,
        propMapHeight: document.getElementById('svg_container').clientHeight
      });
    }, _this.componentWillMount = function () {
      var sameObstacleArr = [{ obstacleColor: 'red', signalreducevalue: '70', obstacleWidth: '6', obstacleName: 'WallsHeavy' }, { obstacleColor: 'green', signalreducevalue: '50', obstacleWidth: '5', obstacleName: 'Cubicle' }, { obstacleColor: 'blue', signalreducevalue: '30', obstacleWidth: '4', obstacleName: 'DoorHeavy' }, { obstacleColor: 'orange', signalreducevalue: '10', obstacleWidth: '3', obstacleName: 'Glass' }];
      _this.setState({
        addMapModalShow: false, propMapWidth: '1600', propMapHeight: '1000', fileName: '', obstacleData: _this.props.obstacleData,
        imgWidth: _this.props.imgWidth, imgHeight: _this.props.imgHeight, mapUrl: _this.props.mapUrl, mapName: _this.props.mapName, mapScale: _this.props.mapScale,
        apData: _this.props.apData, /*AP坐标*/
        positionX: 0, positionY: 0, /*定位*/
        initialScale: _this.props.initialScale,
        scale: _this.props.initialScale, /*缩放*/
        drawingX1: 0, drawingY1: 0, drawingX2: 0, drawingY2: 0, drawingColor: 'red', drawingWidth: '6', drawingObstacleName: 'WallsHeavy', drawingSignalreducevalue: '70', /*画线初始值*/
        isDraw: false, /*画线*/
        isEdit: false, /*修改画线*/
        showAP: false, /*显示AP*/
        APDetail: false, /*显示AP详情*/
        hotMap: false, /*显示覆盖区域*/
        dragArr: [], /*能拖动的AP*/
        addAPModalShow: false, /*添加AP的模态框*/
        colorPickerShow: false, /*取色器*/
        selectedColor: "", /*取色器*/
        selectedAPGroup: 'all', /*AP分组选择*/
        addMaterialShow: false, /*添加材料模态框*/
        sameObstacleArr: sameObstacleArr,
        obstacleArr: sameObstacleArr.concat(_this.props.obstacleArr), /*线条*/
        editMaterialShow: false /*修改材料模态框*/
      });
      // localStorage.apData=[{apX:100,apY:100,group:'1111111111',MAC:'34:E7:0B:00:EF:70',IP:'192.168.2.118',client:20,Status:'在线',users:'35'},{apX:100,apY:300,group:'2222222222',MAC:'34:E7:0B:02:B5:F0',IP:'192.168.2.112',client:50,Status:'在线',users:'155'},{apX:300,apY:100,group:'3333333333',MAC:'34:E7:0B:02:D0:10',IP:'192.168.2.119',client:150,Status:'在线',users:'999'}];
    }, _this.addMapModal = function () {
      _this.setState({
        addMapModalShow: true
      });
    }, _this.closeMapModal = function () {
      _this.props.form.resetFields();
      _this.setState({
        addMapModalShow: false,
        fileUrl: '', fileName: ''
      });
    }, _this.addMap = function () {
      _this.props.form.validateFields(['mapName', 'mapScale', 'fileName'], function (err, values) {
        if (!err) {
          if (_this.state.iHeight > _this.state.propMapHeight) {
            _this.setState({
              initialScale: Math.floor(_this.state.propMapHeight / _this.state.iHeight * 10) / 10,
              scale: Math.floor(_this.state.propMapHeight / _this.state.iHeight * 10) / 10
            });
            _this.props.setInitialScale(Math.floor(_this.state.propMapHeight / _this.state.iHeight * 10) / 10);
          } else {
            _this.setState({
              initialScale: 1,
              scale: 1
            });
            _this.props.setInitialScale(1);
          }
          _this.props.setMap(_this.state.iWidth, _this.state.iHeight, _this.state.fileUrl, values.mapName, values.mapScale);
          _this.setState({
            mapUrl: _this.state.fileUrl, imgWidth: _this.state.iWidth, imgHeight: _this.state.iHeight, mapName: values.mapName, mapScale: values.mapScale,
            addMapModalShow: false, fileUrl: '', fileName: '', iWidth: undefined, iHeight: undefined,
            obstacleData: [], obstacleArr: _this.state.sameObstacleArr, apData: []
          });
          _this.props.form.resetFields();
        }
      });
    }, _this.handleChange = function (info) {
      if (info.file.status === 'done') {
        _this.setState({ fileName: info.file.name });
        var reader = new FileReader();
        reader.onload = function () {
          _this.setState({ fileUrl: reader.result });
        };
        reader.readAsDataURL(info.file);
      }
    }, _this.beforeUpload = function (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        var image = new Image();
        image.src = reader.result;
        image.onload = function () {
          _this.setState({
            fileUrl: reader.result,
            fileName: file.name,
            iWidth: image.width,
            iHeight: image.height
          });
          // if(image.height>this.state.propMapHeight){
          //   this.setState({
          //     initialScale:Math.floor(this.state.propMapHeight/image.height*10)/10,
          //     scale:Math.floor(this.state.propMapHeight/image.height*10)/10,
          //   })
          // }
          // if(image.width>this.state.propMapWidth||image.height>this.state.propMapHeight){
          //   this.setState({
          //     initialScale:Math.floor(image.width/image.height>this.state.propMapWidth/this.state.propMapHeight?this.state.propMapWidth/image.width*10:this.state.propMapHeight/image.height*10)/10,
          //     scale:Math.floor(image.width/image.height>this.state.propMapWidth/this.state.propMapHeight?this.state.propMapWidth/image.width*10:this.state.propMapHeight/image.height*10)/10,
          //   })
          // }
        };
      };
    }, _this.updateSet = function (file, fileList) {
      return false;
    }, _this.deleteMapModal = function () {
      var that = _this;
      _modal2.default.confirm({
        content: '删除后不可恢复，是否确认删除',
        okText: '确认',
        cancelText: '取消',
        onOk: function onOk() {
          _this.props.deleteMap();
          that.setState({
            obstacleData: [],
            apData: [],
            mapUrl: '', imgWidth: '', imgHeight: '', mapName: '', mapScale: 0, initialScale: 1
          });
        }
      });
    }, _this.mouseWheel = function (event) {
      event.preventDefault();
      var X = event.pageX - event.currentTarget.offsetLeft,
          Y = event.pageY - event.currentTarget.offsetTop; /*,xx=this.state.propMapWidth/2*this.state.scale,yy=this.state.propMapHeight/2*this.state.scale*/
      event.deltaY < 0 ? _this.state.scale < 3 ? _this.setState({ scale: (_this.state.scale * 10 + 1) / 10 }) : '' : _this.state.scale > _this.state.initialScale ? _this.setState({ scale: (_this.state.scale * 10 - 1) / 10 }) : '';
      event.deltaY < 0 && _this.state.scale < 3 ? _this.setState({
        positionX: Math.floor((_this.state.positionX - X) / _this.state.scale * (_this.state.scale * 10 + 1) / 10 + X),
        positionY: Math.floor((_this.state.positionY - Y) / _this.state.scale * (_this.state.scale * 10 + 1) / 10 + Y)
        // positionX:Math.floor(((this.state.positionX-X)/this.state.scale*(this.state.scale+0.1)+X)<=-xx?-xx:((this.state.positionX-X)/this.state.scale*(this.state.scale+0.1)+X)>=this.state.propMapWidth-xx?this.state.propMapWidth-xx:((this.state.positionX-X)/this.state.scale*(this.state.scale+0.1)+X)),
        // positionY:Math.floor(((this.state.positionY-Y)/this.state.scale*(this.state.scale+0.1)+Y)<=-yy?-yy:((this.state.positionY-Y)/this.state.scale*(this.state.scale+0.1)+Y)>=this.state.propMapHeight-yy?this.state.propMapHeight-yy:((this.state.positionY-Y)/this.state.scale*(this.state.scale+0.1)+Y)),
      }) : event.deltaY > 0 && _this.state.scale > _this.state.initialScale ? _this.setState({
        positionX: Math.floor(_this.state.positionX - _this.state.positionX / (_this.state.scale * 10 - _this.state.initialScale * 10)),
        positionY: Math.floor(_this.state.positionY - _this.state.positionY / (_this.state.scale * 10 - _this.state.initialScale * 10))
      }) : '';
      // event.deltaY>0&&this.state.scale>this.state.initialScale?
      // this.setState({
      //   positionX:((this.state.positionX-X)/this.state.scale*(this.state.scale-0.1)+X)<=-xx?-xx:((this.state.positionX-X)/this.state.scale*(this.state.scale-0.1)+X)>=this.state.propMapWidth-xx?this.state.propMapWidth-xx:((this.state.positionX-X)/this.state.scale*(this.state.scale-0.1)+X),
      //   positionY:((this.state.positionY-Y)/this.state.scale*(this.state.scale-0.1)+Y)<=-yy?-yy:((this.state.positionY-Y)/this.state.scale*(this.state.scale-0.1)+Y)>=this.state.propMapHeight-yy?this.state.propMapHeight-yy:((this.state.positionY-Y)/this.state.scale*(this.state.scale-0.1)+Y),
      // }):''
    }, _this.changeDraw = function () {
      _this.setState({
        isDraw: !_this.state.isDraw, cx1: undefined, cy1: undefined, cx2: undefined, cy2: undefined, editColor: undefined, isEdit: false
      });
    }, _this.mapDown = function (event) {
      event.preventDefault();
      /*画线--------------------------------*/
      if (_this.state.isDraw && !_this.state.isEdit) {
        _this.setState({
          edited: true,
          drawingX1: (event.pageX - event.currentTarget.offsetLeft - _this.state.positionX) / _this.state.scale,
          drawingY1: (event.pageY - event.currentTarget.offsetTop - _this.state.positionY) / _this.state.scale,
          drawingX2: (event.pageX - event.currentTarget.offsetLeft - _this.state.positionX) / _this.state.scale,
          drawingY2: (event.pageY - event.currentTarget.offsetTop - _this.state.positionY) / _this.state.scale
        });
      } else
        /*地图拖动----------------------------------*/
        if (_this.state.obstacleInd === undefined && _this.state.APMAC === undefined && _this.state.scale != _this.state.initialScale) {
          _this.setState({
            positionXX: Math.floor(_this.state.positionX),
            positionYY: Math.floor(_this.state.positionY)
          });
        }
    }, _this.mapMove = function (event) {
      var X = event.pageX >= _this.state.containerX + _this.state.propMapWidth ? _this.state.containerX + _this.state.propMapWidth : event.pageX <= _this.state.containerX ? _this.state.containerX : event.pageX,
          Y = event.pageY >= _this.state.containerY + _this.state.propMapHeight ? _this.state.containerY + _this.state.propMapHeight : event.pageY <= _this.state.containerY ? _this.state.containerY : event.pageY;
      /*画线----------------------------------*/
      if (_this.state.edited !== undefined) {
        _this.setState({
          drawingX2: (X - _this.state.containerX - _this.state.positionX) / _this.state.scale,
          drawingY2: (Y - _this.state.containerY - _this.state.positionY) / _this.state.scale
        });
      }
      /*地图拖动-----------------------------*/
      if (_this.state.positionXX !== undefined && _this.state.obstacleInd === undefined && _this.state.APMAC === undefined) {
        var px = _this.state.positionXX + event.pageX - _this.state.downX,
            py = _this.state.positionYY + event.pageY - _this.state.downY,
            xx = 2000 * (_this.state.scale * 10) / 10,
            yy = _this.state.propMapHeight * (_this.state.scale * 10 - _this.state.initialScale * 10) / (_this.state.initialScale * 10);
        _this.setState({
          positionX: px <= -xx ? -xx : px >= 0 ? 0 : px,
          positionY: py <= -yy ? -yy : py >= 0 ? 0 : py
        });
      }
      /*circleMove1---------------------------*/
      if (_this.state.cx11 !== undefined) {
        var cx1 = _this.state.cx11 + (X - _this.state.downX) / _this.state.scale,
            cy1 = _this.state.cy11 + (Y - _this.state.downY) / _this.state.scale;
        _this.state.obstacleData[_this.state.obstacleInd] = { xOne: cx1, yOne: cy1, xTwo: _this.state.cx2, yTwo: _this.state.cy2, color: _this.state.editColor, width: _this.state.editWidth, obstacleName: _this.state.drawingObstacleName, signalreducevalue: _this.state.drawingSignalreducevalue };
        _this.props.setObstacleData(_this.state.obstacleData);
        _this.setState({
          cx1: cx1, cy1: cy1, obstacleData: _this.state.obstacleData
        });
      }
      /*circleMove2--------------------------*/
      if (_this.state.cx22 !== undefined) {
        var cx2 = _this.state.cx22 + (X - _this.state.downX) / _this.state.scale,
            cy2 = _this.state.cy22 + (Y - _this.state.downY) / _this.state.scale;
        _this.state.obstacleData[_this.state.obstacleInd] = { xOne: _this.state.cx1, yOne: _this.state.cy1, xTwo: cx2, yTwo: cy2, color: _this.state.editColor, width: _this.state.editWidth, obstacleName: _this.state.drawingObstacleName, signalreducevalue: _this.state.drawingSignalreducevalue };
        _this.props.setObstacleData(_this.state.obstacleData);
        _this.setState({
          cx2: cx2, cy2: cy2, obstacleData: _this.state.obstacleData
        });
      }
      /*AP拖动*/
      if (_this.state.APMAC !== undefined) {
        var AX = event.pageX >= _this.state.containerX + _this.state.propMapWidth - 50 ? _this.state.containerX + _this.state.propMapWidth - 50 : event.pageX <= _this.state.containerX + 50 ? _this.state.containerX + 50 : event.pageX,
            AY = event.pageY >= _this.state.containerY + _this.state.propMapHeight - 50 ? _this.state.containerY + _this.state.propMapHeight - 50 : event.pageY <= _this.state.containerY + 50 ? _this.state.containerY + 50 : event.pageY;
        _this.state.apData.forEach(function (val, ind) {
          if (val.MAC === _this.state.APMAC) {
            _this.state.apData[ind].apX = (_this.state.APX + AX - _this.state.downX - _this.state.positionX) / _this.state.scale;
            _this.state.apData[ind].apY = (_this.state.APY + AY - _this.state.downY - _this.state.positionY) / _this.state.scale;
          }
        });
        _this.props.setApData(_this.state.apData);
        _this.setState({
          apData: _this.state.apData
        });
      }
    }, _this.mapUp = function () {
      /*画线--------------------------------*/
      if (_this.state.edited !== undefined) {
        if (_this.state.drawingX1 !== _this.state.drawingX2 || _this.state.drawingY1 !== _this.state.drawingY2) {
          _this.props.setObstacleData(_this.state.obstacleData.concat([{ xOne: _this.state.drawingX1, yOne: _this.state.drawingY1, xTwo: _this.state.drawingX2, yTwo: _this.state.drawingY2, color: _this.state.drawingColor, width: _this.state.drawingWidth, obstacleName: _this.state.drawingObstacleName, signalreducevalue: _this.state.drawingSignalreducevalue }]));
          _this.setState({
            obstacleData: _this.state.obstacleData.concat([{ xOne: _this.state.drawingX1, yOne: _this.state.drawingY1, xTwo: _this.state.drawingX2, yTwo: _this.state.drawingY2, color: _this.state.drawingColor, width: _this.state.drawingWidth, obstacleName: _this.state.drawingObstacleName, signalreducevalue: _this.state.drawingSignalreducevalue }])
          });
        }
        _this.setState({
          edited: undefined,
          drawingX1: 0,
          drawingY1: 0,
          drawingX2: 0,
          drawingY2: 0
        });
      }
      /*地图拖动----------------------------------*/
      if (_this.state.positionXX !== undefined) {
        _this.setState({
          positionXX: undefined,
          positionYY: undefined
        });
      }
      /*circleUp---------------------------------*/
      if (_this.state.cx11 !== undefined || _this.state.cx22 !== undefined) {
        _this.setState({
          cx11: undefined, cy11: undefined, cx22: undefined, cy22: undefined, obstacleInd: undefined, cx1: undefined, cy1: undefined, cx2: undefined, cy2: undefined, editColor: undefined, editWidth: undefined, editObstacleName: undefined, editSignalreducevalue: undefined
        });
      }
      /*AP拖动*/
      if (_this.state.APMAC !== undefined) {
        _this.setState({
          APMAC: undefined, APX: undefined, APY: undefined
        });
      }
      _this.setState({
        downX: undefined,
        downY: undefined
      });
    }, _this.editObstacle = function (event) {
      if (_this.state.isDraw && _this.state.isEdit) {
        var cx1 = event.currentTarget.x1.baseVal.value,
            cy1 = event.currentTarget.y1.baseVal.value,
            cx2 = event.currentTarget.x2.baseVal.value,
            cy2 = event.currentTarget.y2.baseVal.value,
            editColor = event.currentTarget.style.stroke,
            editWidth = event.currentTarget.style.strokeWidth,
            obstacleIndex = event.target.getAttribute("data-obstacleIndex"),
            editObstacleName = event.target.getAttribute("data-obstacleName"),
            editSignalreducevalue = event.target.getAttribute("data-signalreducevalue");
        _this.setState({
          cx1: cx1, cy1: cy1, cx2: cx2, cy2: cy2, editColor: editColor, editWidth: editWidth, obstacleInd: obstacleIndex, editObstacleName: editObstacleName, editSignalreducevalue: editSignalreducevalue
        });
      }
    }, _this.changeIsEdit = function () {
      _this.setState({
        isEdit: !_this.state.isEdit, obstacleInd: undefined, cx1: undefined, cy1: undefined, cx2: undefined, cy2: undefined, editColor: undefined, editWidth: undefined, editObstacleName: undefined, editSignalreducevalue: undefined
      });
    }, _this.deleteObstacle = function () {
      _this.state.obstacleInd ? _this.state.obstacleData.splice(_this.state.obstacleInd, 1) : '';
      _this.props.setObstacleData(_this.state.obstacleData);
      _this.setState({
        obstacleData: _this.state.obstacleData, obstacleInd: undefined, cx1: undefined, cy1: undefined, cx2: undefined, cy2: undefined, editColor: undefined, editWidth: undefined, editObstacleName: undefined, editSignalreducevalue: undefined
      });
    }, _this.obstacleChoose = function (value) {
      _this.state.obstacleArr.forEach(function (val, ind) {
        if (value === val.obstacleColor) {
          _this.setState({
            drawingColor: value,
            drawingWidth: val.obstacleWidth,
            drawingObstacleName: val.obstacleName,
            drawingSignalreducevalue: val.signalreducevalue
          });
        }
      });
    }, _this.circleDown1 = function (event) {
      _this.setState({
        cx11: _this.state.cx1, cy11: _this.state.cy1
      });
    }, _this.circleDown2 = function () {
      _this.setState({
        cx22: _this.state.cx2, cy22: _this.state.cy2
      });
    }, _this.showAP = function () {
      _this.setState({
        showAP: !_this.state.showAP,
        dragArr: [],
        selectedAPGroup: 'all',
        APDetail: false,
        hotMap: false
      });
    }, _this.apDown = function (event) {
      var APX = event.currentTarget.x.baseVal.value,
          APY = event.currentTarget.y.baseVal.value,
          imgMAC = event.target.getAttribute("data-imgMAC");
      if (_this.checkIsDrag(imgMAC)) {
        _this.setState({
          APX: APX, APY: APY, APMAC: imgMAC
        });
      }
    }, _this.addAPModalShow = function () {
      _this.setState({
        addAPModalShow: true
      });
    }, _this.closeAPModal = function () {
      _this.props.form.resetFields();
      _this.setState({
        addAPModalShow: false
      });
    }, _this.addAP = function () {
      _this.props.form.validateFields(['MAC', 'IP', 'group'], function (err, values) {
        var isbe = true;
        _this.state.apData.forEach(function (val) {
          if (val.MAC === values.MAC) {
            isbe = false;
          }
        });
        if (!err && isbe) {
          _this.props.setApData(_this.state.apData.concat([{ apX: 50, apY: 50, group: values.group, MAC: values.MAC, IP: values.IP, client: 0, Status: '在线', users: 0 }]));
          _this.setState({
            apData: _this.state.apData.concat([{ apX: 50, apY: 50, group: values.group, MAC: values.MAC, IP: values.IP, client: 0, Status: '在线', users: 0 }]),
            addAPModalShow: false
          });
          _this.props.form.resetFields();
        }
      });
    }, _this.deleteAP = function (event) {
      var MAC = event.target.getAttribute("data-circleMAC");
      _this.state.apData.forEach(function (val, ind) {
        if (val.MAC === MAC) {
          _this.state.apData.splice(ind, 1);
          _this.props.setApData(_this.state.apData);
          _this.setState({
            apData: _this.state.apData
          });
        }
      });
    }, _this.changeDrag = function (event) {
      var circleMAC = event.target.getAttribute("data-circleMAC");
      if (_this.state.dragArr.indexOf(circleMAC) === -1) {
        _this.state.dragArr.push(circleMAC);
        _this.setState({ dragArr: _this.state.dragArr });
      } else {
        _this.state.dragArr.splice(_this.state.dragArr.indexOf(circleMAC), 1);
        _this.setState({ dragArr: _this.state.dragArr });
      }
    }, _this.checkIsDrag = function (val) {
      return _this.state.dragArr.indexOf(val) === -1 ? false : true;
    }, _this.APDetail = function () {
      _this.setState({
        APDetail: !_this.state.APDetail
      });
    }, _this.chooseAPGroup = function (value) {
      _this.setState({
        selectedAPGroup: value,
        dragArr: []
      });
    }, _this.hotMap = function () {
      _this.setState({
        hotMap: !_this.state.hotMap
      });
    }, _this.selectedColor = function (value) {
      _this.setState({
        selectedColor: value
      });
    }, _this.colorPickerShow = function () {
      _this.setState({
        colorPickerShow: !_this.state.colorPickerShow
      });
    }, _this.closeColorPicker = function () {
      _this.setState({
        colorPickerShow: false
      });
    }, _this.addMaterialShow = function () {
      _this.setState({
        addMaterialShow: !_this.state.addMaterialShow,
        editMaterialShow: !_this.state.editMaterialShow,
        colorPickerShow: false,
        selectedColor: ''
      });
      _this.props.form.resetFields();
    }, _this.addMaterial = function () {
      _this.props.form.validateFields(['signalreducevalue', 'obstacleWidth', 'obstacleName'], function (err, values) {
        if (!err && _this.state.selectedColor !== '') {
          _this.props.setObstacleArr([Object.assign({}, values, { obstacleColor: _this.state.selectedColor })]);
          _this.setState({
            obstacleArr: _this.state.obstacleArr.concat([Object.assign({}, values, { obstacleColor: _this.state.selectedColor })]),
            selectedColor: '',
            addMaterialShow: false,
            colorPickerShow: false,
            editMaterialShow: !_this.state.editMaterialShow
          });

          _this.props.form.resetFields();
        }
      });
    }, _this.editMaterialShow = function () {
      _this.setState({
        editMaterialShow: !_this.state.editMaterialShow
      });
      _this.setState({
        drawingColor: _this.state.obstacleArr[0].obstacleColor,
        drawingWidth: _this.state.obstacleArr[0].obstacleWidth,
        drawingObstacleName: _this.state.obstacleArr[0].obstacleName,
        drawingSignalreducevalue: _this.state.obstacleArr[0].signalreducevalue
      });
    }, _this.deleteMaterial = function (ind) {
      _this.state.obstacleArr.splice(ind, 1);
      _this.props.deleteObstacleArr(ind);
      _this.setState({
        obstacleArr: _this.state.obstacleArr
      });
    }, _this.render = function () {
      var props = {
        accept: "image/*",
        name: "mapImage",
        action: _this.props.action,
        onChange: _this.handleChange,
        showUploadList: false,
        // headers: {
        //   authorization: 'Access-Control-Allow-Origin',
        // },
        beforeUpload: _this.beforeUpload,
        customRequest: _this.updateSet
      };
      var formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 10 } };
      var formItemLayout1 = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
      var getFieldDecorator = _this.props.form.getFieldDecorator;


      var ColorHex = ['00', '33', '66', '99', 'CC', 'FF'],
          colorTable = [];

      var _loop = function _loop(i) {
        var _loop2 = function _loop2(j) {
          var colorTd = [];

          var _loop3 = function _loop3(k) {
            var _loop4 = function _loop4(l) {
              colorTd.push(_react2.default.createElement('td', { key: 'td' + i + j + k + l, style: { width: '15px', cursor: 'pointer', border: '0.5px solid black', backgroundColor: '#' + ColorHex[k + i * 3] + ColorHex[l] + ColorHex[j] }, onClick: function onClick() {
                  _this.selectedColor('#' + ColorHex[k + i * 3] + ColorHex[l] + ColorHex[j]);
                } }));
            };

            for (var l = 0; l < 6; l++) {
              _loop4(l);
            }
          };

          for (var k = 0; k < 3; k++) {
            _loop3(k);
          }
          colorTable.push(_react2.default.createElement(
            'tr',
            { style: { height: '15px' }, key: 'tr' + i + j },
            colorTd
          ));
        };

        for (var j = 0; j < 6; j++) {
          _loop2(j);
        }
      };

      for (var i = 0; i < 2; i++) {
        _loop(i);
      }
      var getColor = _react2.default.createElement(
        'table',
        { style: { border: '1px solid black' }, cellSpacing: '0' },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { colSpan: 18, style: { textAlign: 'right' } },
              _react2.default.createElement(
                'span',
                { onClick: _this.colorPickerShow, style: { paddingRight: '5px', cursor: 'pointer' } },
                '\xD7\u5173\u95ED'
              )
            )
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          colorTable
        )
      );
      var signalUnit = getFieldDecorator('signalUnit')(_react2.default.createElement(
        'div',
        null,
        'db'
      ));
      var lineUnit = getFieldDecorator('lineUnit')(_react2.default.createElement(
        'div',
        null,
        'px'
      ));
      var setScale = getFieldDecorator('setScale')(_react2.default.createElement(
        'div',
        null,
        '1 : '
      ));
      return _react2.default.createElement(
        'div',
        { style: { marginTop: '30px' } },
        _react2.default.createElement(
          _row2.default,
          { type: 'flex', justify: 'end' },
          _react2.default.createElement(
            'div',
            { style: { lineHeight: '28px', margin: '0 10px', fontSize: '20px', fontWeight: 'bold' } },
            _this.state.mapName
          ),
          _this.props.author === 'owner' ? _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              _button2.default,
              { type: 'primary', size: 'default', onClick: _this.addMapModal },
              '\u6DFB\u52A0\u5730\u56FE'
            ),
            _react2.default.createElement(
              _button2.default,
              { type: 'primary', size: 'default', onClick: _this.deleteMapModal },
              '\u5220\u9664\u5730\u56FE'
            ),
            _react2.default.createElement(
              _button2.default,
              { type: 'primary', size: 'default', disabled: _this.state.showAP, onClick: _this.changeDraw },
              _this.state.isDraw ? '暂停绘制' : '绘制地图'
            )
          ) : '',
          _this.state.isDraw ? _react2.default.createElement(
            _button2.default,
            { type: 'default', size: 'default', disabled: _this.state.obstacleData.length === 0 && !_this.state.isEdit, onClick: _this.changeIsEdit },
            _this.state.isEdit ? '暂停修改' : '修改地图'
          ) : '',
          _this.state.isDraw && _this.state.isEdit ? _react2.default.createElement(
            _button2.default,
            { type: 'default', size: 'default', disabled: _this.state.obstacleInd === undefined, onClick: _this.deleteObstacle },
            '\u5220\u9664'
          ) : '',
          _this.state.isDraw && !_this.state.isEdit ? _react2.default.createElement(
            _select2.default,
            { value: _this.state.drawingColor, onChange: _this.obstacleChoose },
            _this.state.obstacleArr.map(function (val, ind) {
              return _react2.default.createElement(
                Option,
                { key: ind, value: val.obstacleColor, style: { color: '' + val.obstacleColor } },
                '-',
                val.signalreducevalue,
                'db'
              );
            }),
            _react2.default.createElement(
              Option,
              { key: 'more' },
              _react2.default.createElement(
                'div',
                { onClick: _this.editMaterialShow, style: { textAlign: 'center', color: 'blue' } },
                '\u66F4\u591A'
              )
            )
          ) : '',
          _react2.default.createElement(
            _button2.default,
            { type: 'primary', size: 'default', disabled: _this.state.isDraw, onClick: _this.showAP },
            _this.state.showAP ? '隐藏AP' : '显示AP'
          ),
          _this.state.showAP ? _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              _button2.default,
              { type: 'default', size: 'default', disabled: _this.state.apData.length === 0, onClick: _this.APDetail },
              _this.state.APDetail ? '关闭详情' : 'AP详情'
            ),
            _this.props.author === 'owner' ? _react2.default.createElement(
              _button2.default,
              { type: 'default', size: 'default', onClick: _this.addAPModalShow },
              '\u7ED1\u5B9AAP'
            ) : '',
            _react2.default.createElement(
              _select2.default,
              { value: _this.state.selectedAPGroup, onChange: _this.chooseAPGroup },
              _react2.default.createElement(
                Option,
                { value: 'all' },
                '\u5168\u90E8\u5206\u7EC4'
              ),
              _this.props.userGroupArr.map(function (val, ind) {
                return _react2.default.createElement(
                  Option,
                  { key: ind, value: val },
                  val
                );
              })
            )
          ) : '',
          _react2.default.createElement(
            _button2.default,
            { type: 'primary', size: 'default', disabled: _this.state.apData.length === 0 || !_this.state.showAP, onClick: _this.hotMap },
            '\u8986\u76D6\u8303\u56F4'
          )
        ),
        _react2.default.createElement(
          _row2.default,
          null,
          _react2.default.createElement(
            'div',
            { style: { width: '80px', height: '28px', margin: '4px', textAlign: 'center' } },
            _react2.default.createElement(
              _row2.default,
              null,
              _react2.default.createElement(
                'div',
                null,
                Math.floor(_this.state.mapScale / _this.state.scale * 100) / 100,
                ' m'
              )
            ),
            _react2.default.createElement(
              _row2.default,
              null,
              _react2.default.createElement('div', { style: { width: '80px', height: '8px', borderLeft: '2px solid black', borderRight: '2px solid black', borderBottom: '4px solid black' } })
            )
          )
        ),
        _react2.default.createElement(_index2.default, { title: _react2.default.createElement(
            'h2',
            null,
            '\u6DFB\u52A0\u5730\u56FE'
          ), width: 1000, visible: _this.state.addMapModalShow, onCancel: _this.closeMapModal, onOk: _this.addMap, cancelText: '取消', okText: '保存', content: _react2.default.createElement(
            _form2.default,
            null,
            _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout, { label: '\u70ED\u56FE\u540D\u79F0' }),
              getFieldDecorator('mapName', { rules: [{ required: true, message: 'Please enter the map name' }] })(_react2.default.createElement(_input2.default, { autoComplete: 'off' }))
            ),
            _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout, { label: '\u6BD4\u4F8B\u5C3A' }),
              getFieldDecorator('mapScale', { rules: [{ required: true, message: 'Please enter a scale' }] })(_react2.default.createElement(_input2.default, { autoComplete: 'off', placeholder: '100', addonBefore: setScale }))
            ),
            _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout1, { label: '\u56FE\u7247\u540D\u79F0' }),
              getFieldDecorator('fileName', { rules: [{ required: true, message: 'Please select the image' }] })(_react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  _col2.default,
                  { span: 15 },
                  _react2.default.createElement(
                    'div',
                    { className: 'fileName', style: { cursor: 'not-allowed' } },
                    _this.state.fileName
                  )
                ),
                _react2.default.createElement(
                  _col2.default,
                  { span: 8, offset: 1 },
                  _react2.default.createElement(
                    _upload2.default,
                    props,
                    _react2.default.createElement(
                      _button2.default,
                      { type: 'primary', size: 'large' },
                      '\u9009\u62E9\u56FE\u7247'
                    )
                  )
                )
              ))
            ),
            _this.state.fileUrl ? _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout, { label: '\u56FE\u7247\u9884\u89C8' }),
              getFieldDecorator('filePreview', {})(_react2.default.createElement('img', { src: _this.state.fileUrl, className: 'filePreview' }))
            ) : ''
          ) }),
        _react2.default.createElement(_index2.default, { title: _react2.default.createElement(
            'h2',
            null,
            '\u6DFB\u52A0AP'
          ), width: 1000, visible: _this.state.addAPModalShow, onCancel: _this.closeAPModal, onOk: _this.addAP, cancelText: '取消', okText: '保存', content: _react2.default.createElement(
            _form2.default,
            null,
            _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout, { label: 'IP\u5730\u5740' }),
              getFieldDecorator('IP', { rules: [{ required: true, message: 'Please enter the IP' }] })(_react2.default.createElement(_input2.default, { autoComplete: 'off', placeholder: '192.168.1.1' }))
            ),
            _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout, { label: 'MAC\u5730\u5740' }),
              getFieldDecorator('MAC', { rules: [{ required: true, message: 'Please enter the MAC' }] })(_react2.default.createElement(_input2.default, { autoComplete: 'off', placeholder: 'FF:FF:FF:FF:FF:FF' }))
            ),
            _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout, { label: '\u5206\u7EC4' }),
              getFieldDecorator('group', { rules: [{ required: true, message: 'Please enter the group' }], initialValue: _this.props.userGroupArr[0] })(_react2.default.createElement(
                _select2.default,
                null,
                _this.props.userGroupArr.map(function (val, ind) {
                  return _react2.default.createElement(
                    Option,
                    { key: ind, value: val },
                    val
                  );
                })
              ))
            )
          ) }),
        _react2.default.createElement(_index2.default, { title: _react2.default.createElement(
            'h2',
            null,
            '\u6DFB\u52A0\u6750\u6599'
          ), width: 1000, visible: _this.state.addMaterialShow, onCancel: _this.addMaterialShow, onOk: _this.addMaterial, cancelText: '取消', okText: '保存', content: _react2.default.createElement(
            _form2.default,
            null,
            _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout, { label: '\u6750\u6599\u540D\u79F0' }),
              getFieldDecorator('obstacleName', { rules: [{ required: true, message: '请输入材料名称' }] })(_react2.default.createElement(_input2.default, { autoComplete: 'off', onFocus: _this.closeColorPicker }))
            ),
            _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout, { label: '\u4FE1\u53F7\u8870\u51CF' }),
              getFieldDecorator('signalreducevalue', { rules: [{ required: true, message: '请输入信号衰减数值' }] })(_react2.default.createElement(_input2.default, { autoComplete: 'off', addonAfter: signalUnit, onFocus: _this.closeColorPicker }))
            ),
            _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout, { label: '\u6750\u6599\u989C\u8272' }),
              getFieldDecorator('selectedColor', { rules: [{ required: true, message: '请选择材料颜色' }] })(_react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('div', { className: 'fileName', onClick: function onClick() {
                    _this.setState({ colorPickerShow: true });
                  }, style: { backgroundColor: '' + _this.state.selectedColor } }),
                _this.state.colorPickerShow ? getColor : ''
              ))
            ),
            _react2.default.createElement(
              FormItem,
              _extends({}, formItemLayout, { label: '\u6750\u6599\u5BBD\u5EA6' }),
              getFieldDecorator('obstacleWidth', { rules: [{ required: true, message: '请输入1~10的整数' }] })(_react2.default.createElement(_input2.default, { autoComplete: 'off', addonAfter: lineUnit, onFocus: _this.closeColorPicker }))
            )
          ) }),
        _react2.default.createElement(_index2.default, { title: _react2.default.createElement(
            'h2',
            null,
            '\u4FEE\u6539\u6750\u6599'
          ), width: 1000, visible: _this.state.editMaterialShow, onCancel: _this.editMaterialShow, onOk: _this.editMaterialShow, okText: '\u786E\u5B9A', content: _react2.default.createElement(
            'span',
            null,
            _this.state.obstacleArr.map(function (val, ind) {
              return _react2.default.createElement(
                _row2.default,
                { key: ind, style: { height: '30px', margin: '10px', lineHeight: '30px' } },
                _react2.default.createElement(
                  _col2.default,
                  { span: 5 },
                  _react2.default.createElement(
                    'h3',
                    { style: { textAlign: 'right', paddingRight: '30px' } },
                    val.obstacleName,
                    '\uFF1A'
                  )
                ),
                _react2.default.createElement(
                  _col2.default,
                  { span: 10 },
                  _react2.default.createElement('div', { style: { backgroundColor: '' + val.obstacleColor, height: val.obstacleWidth + 'px', marginTop: (30 - val.obstacleWidth) / 2 + 'px' } })
                ),
                _this.state.obstacleArr.length === ind + 1 ? _react2.default.createElement(
                  _col2.default,
                  { span: 2, offset: 1 },
                  _react2.default.createElement(
                    _button2.default,
                    { type: 'primary', size: 'default', onClick: _this.addMaterialShow },
                    '\u6DFB\u52A0\u6750\u6599'
                  )
                ) : '',
                ind > 3 ? _react2.default.createElement(
                  _col2.default,
                  { span: 1, offset: 1 },
                  _react2.default.createElement(_icon2.default, { type: 'delete', onClick: function onClick() {
                      _this.deleteMaterial(ind);
                    }, style: { fontSize: '20px', cursor: 'pointer', lineHeight: '30px' } })
                ) : ''
              );
            })
          ) }),
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            'div',
            { className: 'svgContainer', onWheel: _this.mouseWheel, onMouseDown: _this.mapDown, id: 'svg_container', style: { width: '' + _this.props.mapWidth, height: '' + _this.props.mapHeight } },
            _react2.default.createElement(
              'svg',
              { width: '100%', height: '100%', style: { cursor: _this.state.isDraw ? _this.state.isEdit ? 'default' : 'crosshair' : 'default' } },
              _react2.default.createElement(
                'g',
                { transform: 'translate(' + _this.state.positionX + ',' + _this.state.positionY + ')scale(' + _this.state.scale + ')' },
                _react2.default.createElement('image', { href: _this.state.mapUrl, width: _this.state.imgWidth, height: _this.state.imgHeight }),
                _react2.default.createElement(
                  'defs',
                  null,
                  _react2.default.createElement(
                    'filter',
                    { id: 'f1' },
                    _react2.default.createElement('feGaussianBlur', { 'in': 'SourceGraphic', stdDeviation: '5' })
                  )
                ),
                _react2.default.createElement(
                  'g',
                  null,
                  _this.state.obstacleData.map(function (val, ind) {
                    var _ref2 = [val.xOne, val.yOne, val.xTwo, val.yTwo, val.color, val.width, val.obstacleName, val.signalreducevalue],
                        x1 = _ref2[0],
                        y1 = _ref2[1],
                        x2 = _ref2[2],
                        y2 = _ref2[3],
                        color = _ref2[4],
                        width = _ref2[5],
                        obstacleName = _ref2[6],
                        signalreducevalue = _ref2[7];

                    return _react2.default.createElement('line', { key: ind, 'data-obstacleIndex': ind, 'data-obstacleName': obstacleName, 'data-signalreducevalue': signalreducevalue, x1: x1, y1: y1, x2: x2, y2: y2, style: { stroke: '' + color, strokeWidth: '' + width, cursor: _this.state.isEdit ? 'pointer' : 'default' }, onMouseDown: _this.editObstacle });
                  }),
                  !_this.state.isEdit ? _react2.default.createElement('path', { d: 'M' + _this.state.drawingX1 + ',' + _this.state.drawingY1 + 'L' + _this.state.drawingX2 + ',' + _this.state.drawingY2, style: { fill: 'none', stroke: '' + _this.state.drawingColor, strokeWidth: '' + _this.state.drawingWidth } }) : _this.state.cx1 !== undefined ? _react2.default.createElement('path', { d: 'M' + _this.state.cx1 + ',' + _this.state.cy1 + 'L' + _this.state.cx2 + ',' + _this.state.cy2, style: { fill: 'none', stroke: '' + _this.state.editColor, strokeWidth: '' + _this.state.editWidth } }) : '',
                  _this.state.cx1 && _this.state.isEdit && _this.state.isDraw ? _react2.default.createElement(
                    'g',
                    null,
                    _react2.default.createElement('circle', { cx: _this.state.cx1, cy: _this.state.cy1, r: '5', stroke: '#fff', fill: '#000', style: { cursor: 'pointer' }, onMouseDown: _this.circleDown1 }),
                    _react2.default.createElement('circle', { cx: _this.state.cx2, cy: _this.state.cy2, r: '5', stroke: '#fff', fill: '#000', style: { cursor: 'pointer' }, onMouseDown: _this.circleDown2 })
                  ) : ''
                )
              ),
              _this.state.showAP ? _react2.default.createElement(
                'g',
                null,
                _this.state.apData.filter(function (val) {
                  if (_this.state.selectedAPGroup === 'all') {
                    return true;
                  } else {
                    return val.group === _this.state.selectedAPGroup;
                  }
                }).map(function (val) {
                  var _ref3 = [val.apX, val.apY, val.group, val.MAC, val.IP, val.client, val.Status, val.users],
                      x = _ref3[0],
                      y = _ref3[1],
                      group = _ref3[2],
                      MAC = _ref3[3],
                      IP = _ref3[4],
                      client = _ref3[5],
                      Status = _ref3[6],
                      users = _ref3[7];

                  return _react2.default.createElement(
                    'g',
                    { key: MAC },
                    _react2.default.createElement('image', { onMouseDown: _this.apDown, key: MAC, 'data-imgMAC': MAC, href: './apimg.png', onClick: _this.clickAp, x: '' + (_this.state.positionX + x * _this.state.scale), y: '' + (_this.state.positionY + y * _this.state.scale), width: '50', height: '50', style: { cursor: 'pointer' } }),
                    _this.props.author === 'owner' ? _react2.default.createElement(
                      'g',
                      null,
                      _react2.default.createElement('circle', { onClick: _this.changeDrag, 'data-circleMAC': MAC, cx: '' + (_this.state.positionX + x * _this.state.scale + 10), cy: '' + (_this.state.positionY + y * _this.state.scale - 10), r: '10', style: { fill: '' + (_this.checkIsDrag(MAC) ? '#76FC5D' : 'red'), cursor: 'pointer' } }),
                      _this.checkIsDrag(MAC) ? _react2.default.createElement('circle', { onClick: _this.deleteAP, 'data-circleMAC': MAC, cx: '' + (_this.state.positionX + x * _this.state.scale + 40), cy: '' + (_this.state.positionY + y * _this.state.scale - 10), r: '10', style: { fill: 'red', cursor: 'pointer' } }) : ''
                    ) : '',
                    _this.state.APDetail ? _react2.default.createElement(
                      'g',
                      null,
                      _react2.default.createElement('rect', { x: '' + (_this.state.positionX + x * _this.state.scale - 75), y: '' + (_this.state.positionY + y * _this.state.scale + 55), width: '200', height: '60', style: { fill: 'black', strokeWidth: 0, stroke: 'black', fillOpacity: '0.5' } }),
                      _react2.default.createElement(
                        'text',
                        { style: { fill: 'white', fontSize: '16px' }, x: '' + (_this.state.positionX + x * _this.state.scale - 75), y: '' + (_this.state.positionY + y * _this.state.scale + 70) },
                        '\u5206\u7EC4\uFF1A',
                        group
                      ),
                      _react2.default.createElement(
                        'text',
                        { style: { fill: 'white', fontSize: '16px' }, x: '' + (_this.state.positionX + x * _this.state.scale - 75), y: '' + (_this.state.positionY + y * _this.state.scale + 90) },
                        'IP\uFF1A',
                        IP
                      ),
                      _react2.default.createElement(
                        'text',
                        { style: { fill: 'white', fontSize: '16px' }, x: '' + (_this.state.positionX + x * _this.state.scale - 75), y: '' + (_this.state.positionY + y * _this.state.scale + 110) },
                        'MAC\uFF1A',
                        MAC
                      )
                    ) : _react2.default.createElement(
                      'g',
                      null,
                      _react2.default.createElement('rect', { x: '' + (_this.state.positionX + x * _this.state.scale - 25), y: '' + (_this.state.positionY + y * _this.state.scale + 55), width: '100', height: '60', style: { fill: 'black', strokeWidth: 0, stroke: 'black', fillOpacity: '0.5' } }),
                      _react2.default.createElement(
                        'text',
                        { style: { fill: 'white', fontSize: '16px' }, x: '' + (_this.state.positionX + x * _this.state.scale - 25), y: '' + (_this.state.positionY + y * _this.state.scale + 70) },
                        '\u72B6\u6001\uFF1A',
                        Status
                      ),
                      _react2.default.createElement(
                        'text',
                        { style: { fill: 'white', fontSize: '16px' }, x: '' + (_this.state.positionX + x * _this.state.scale - 25), y: '' + (_this.state.positionY + y * _this.state.scale + 90) },
                        '\u7EC8\u7AEF\uFF1A',
                        client
                      ),
                      _react2.default.createElement(
                        'text',
                        { style: { fill: 'white', fontSize: '16px' }, x: '' + (_this.state.positionX + x * _this.state.scale - 25), y: '' + (_this.state.positionY + y * _this.state.scale + 110) },
                        '\u7528\u6237\uFF1A',
                        users
                      )
                    )
                  );
                })
              ) : '',
              _this.state.hotMap ? _this.state.apData.filter(function (val) {
                if (_this.state.selectedAPGroup === 'all') {
                  return true;
                } else {
                  return val.group === _this.state.selectedAPGroup;
                }
              }).map(function (val) {
                var _ref4 = [val.apX, val.apY, val.group, val.MAC, val.IP, val.client, val.Status, val.users],
                    x = _ref4[0],
                    y = _ref4[1],
                    group = _ref4[2],
                    MAC = _ref4[3],
                    IP = _ref4[4],
                    client = _ref4[5],
                    Status = _ref4[6],
                    users = _ref4[7];

                return _react2.default.createElement('circle', { key: MAC, cx: '' + (_this.state.positionX + x * _this.state.scale + 25), cy: '' + (_this.state.positionY + y * _this.state.scale + 25), r: 100 * _this.state.scale, fill: '#76FC5D', filter: 'url(#f1)', style: { fillOpacity: '0.5' } });
              }) : ''
            )
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /*上传转base64*/

  /*覆盖上传===================================*/

  /*删除地图*/

  /*鼠标滚动*/

  /*绘制障碍*/

  /*操作地图*/

  /*修改障碍*/

  /*拖动线条*/

  /*显示AP*/

  /*AP单个拖动*/

  /*显示AP详情*/

  /*热图*/

  /*取色*/

  /*修改材料*/

  /*删除材料*/


  return MapComponent;
}(_react2.default.Component);

MapComponent.defaultProps = {
  mapWidth: '100%',
  mapHeight: '1000px',
  initialScale: 1,
  mapScale: 0,
  obstacleArr: [],
  apData: [],
  obstacleData: []
};

MapComponent.propTypes = {
  /**
   * 可选
   *
   *map显示区域的宽
   */
  mapWidth: _react.PropTypes.string,
  /**
   * 可选
   *
   *map显示区域的高
   */
  mapHeight: _react.PropTypes.string,
  /**
   * 必选
   *
   *上传的地址
   */
  action: _react.PropTypes.string.isRequired,
  /**
   * 必选
   *
   *图片的宽
   */
  imgWidth: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  /**
   * 必选
   *
   *图片的高
   */
  imgHeight: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  /**
   * 可选
   *
   *AP数据
   */
  apData: _react.PropTypes.arrayOf(_react.PropTypes.object),
  /**
   * 可选
   *
   *障碍材料
   */
  obstacleArr: _react.PropTypes.arrayOf(_react.PropTypes.object),
  /**
   * 可选
   *
   *障碍数据
   */
  obstacleData: _react.PropTypes.arrayOf(_react.PropTypes.object),
  /**
   * 可选
   *
   *初始缩放大小
   */
  initialScale: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  /**
   * 可选
   *
   *图片比例尺
   */
  mapScale: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])

};

exports.default = (0, _dva.connect)()(_form2.default.create()(MapComponent));
//# sourceMappingURL=index.js.map