/**
 * Created by yin on 2017/10/18.
 */
//import 'babel-polyfill';
//require ( 'antd');
require ( './src/index.less');
var CardComponent = require('./lib/Card/index.js');
exports.CardComponent = CardComponent.default;
var DragGridLayout = require('./lib/DragGridLayout/index.js');
exports.DragGridLayout = DragGridLayout.default;
var ItemSelectModal =  require('./lib/ItemSelectModal/index.js');
exports.ItemSelectModal =ItemSelectModal.default;
var TableDragComponent =  require('./lib/TableDrag/index.js');
exports.TableDragComponent =TableDragComponent.default;
var MapComponent =  require('./lib/Map/index.js');
exports.MapComponent =MapComponent.default;
var ModalComponent =  require('./lib/Modal/index.js');
exports.ModalComponent =ModalComponent.default;
var ButtonComponent =  require('./lib/Button/index.js');
exports.ButtonComponent =ButtonComponent.default;
//var RightBar =  require('./lib/RightBar/index.js');
//exports.RightBar =RightBar.default;
