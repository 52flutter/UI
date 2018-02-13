import React from 'react';
import {Table,Icon,Button,Input,Checkbox,Select,DatePicker  } from "antd";
const { RangePicker } = DatePicker;
import ItemSelectModal from "../ItemSelectModal/index";
// import TableDrag from "./table-drag";
import PropTypes from 'prop-types';
if(!Date.prototype.format){
  Date.prototype.format = function (format) {
    const o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'H+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      S: this.getMilliseconds(),
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
      }
    }
    return format
  }
}

let mousePositionLeft=0;
let de=null;
let deLeft=0;
let maxColumn=0;
let minColumn=0;
let limitRight=0;
let limitLeft=0;
let cur=document.body.style.cursor;
let overflowX=document.body.style.overflowX;//表格拖拽出现问题，造成视觉上表格移动，看如何设置可避免
let ic=0;
let lc=0;
let overlay=null;
let startColumn=0;
let endColumn=0;
let deWidth=0;
export class TableDragComponent extends React.Component {
  componentWillMount=()=>{
    let filter=this.initialFilter(this.props.table.order);
    this.props.buttonGroup.setFilterValues(filter);
    this.setState({
      addId:false,//是否已经给脱拽的table添加id
      id:this.props.table.id,//给拖拽的table添加的id
      checkbox:!!this.props.table.rowSelection,//判断table是否有checkbox
      order:this.props.table.order,//table的title顺序
      searchShow:true,//设置是否显示搜索框
      searchValue:"",//搜索框的值
      filerModalShow:false,//filter模态框是否显示
      filter:filter,//搜索数据汇总
      setting:false,//设置模态框是否可用
      moreButtonStatus:false,//为了以免响应数据慢，出现多次点击按钮，出现重复id,
      hasSearch:true,//为了解决用户在点击筛选条件后，未点击查询而直接点击下一页和页码的问题
    });
  }
  componentDidMount=()=>{
    if(!this.state.addId){//给table添加id
      let tableContainer=this.refs.tableContainer;
      let table=tableContainer.querySelector("table");
      table.setAttribute("id",this.state.id);
      this.setState({addId:true});
    }
  }
  componentWillReceiveProps=(nextProps)=>{
    if(this.props.table.order.length===0&&nextProps.table.order.length!==0){
      this.setState({order:nextProps.table.order});
      let filter=this.initialFilter(nextProps.table.order);
      this.setState({filter:filter});
      this.props.buttonGroup.setFilterValues(filter);
    }
    if(this.props.tableFilter.filterOption.length===0&&nextProps.tableFilter.filterOption.length!==0){
      let filter=this.initialFilter(nextProps.table.order,nextProps.tableFilter.filterOption);
      this.setState({filter:filter});
      this.props.buttonGroup.setFilterValues(filter);
    }
    if(this.props.moreButton.show&&this.props.table.dataSource!==nextProps.table.dataSource){
      this.setState({moreButtonStatus:false});
    }
  }
  componentWillUpdate=(nextProps,nextState)=>{
    // if(this.state.addId!==nextState.addId){//实例化一个可拖拽table的对象
    //   new TableDrag(document.getElementById(this.state.id), { distance: true, restoreState: false ,changeColumn:this.changeColumn});
    // }
    // if(this.state.addId){
    //   console.log(document.getElementById(this.state.id).getBoundingClientRect());
    // }
  }
  changeColumn=(start,end)=>{
    // console.log("start",start);
    // console.log("end",end);
    //改变table的title顺序
    //深克隆
    let order=this.state.order;
    if(this.state.checkbox){
      start=start-1 > 0 ? start-1 : 0;
      end=end-1 > 0 ? end-1 : 0;
    }
    let del=order.splice(start,1);
    order.splice(end,0,del[0]);
    this.setState({order:order});
    this.props.table.changeTitleOrder(order);
  }
  componentWillUnmount=()=>{

  }


  //重写drag组件
  eventPageX=(event)=>{
    let pageX = event.pageX;
    if (typeof pageX == 'undefined') {
      let body = document.body;
      let docElem = document.documentElement;
      pageX = event.clientX + (docElem && docElem.scrollLeft || body && body.scrollLeft || 0) - (docElem && docElem.clientLeft || body && body.clientLeft || 0);
    }
    return pageX;
  }
  tridentDetection=()=>{
    return (navigator.userAgent.indexOf("Trident") != -1) ? true : false;
  }
  borderCollapseDetection=(table)=>{
    return this.elementStyleProperty(table, 'border-collapse') == 'collapse' ? true : false;
  }
  getOffsetRect=(elem)=>{
    // (1)
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    // (2)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    // (3)
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    // (4)
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
  }
  numericProperty=(prop)=>{
    return (typeof prop == 'undefined' || prop == '' || prop == null) ? 0 : parseInt(prop);
  }
  eventTargetTh=(event)=>{
    let e;
    let type=Object.prototype.toString.call(event);
    if(type==="[object MouseEvent]"||type==="[object Object]"){
      e=event.target || event.srcElement;
    }else{
      e=event;
    }
    if(Object.prototype.toString.call(e)==="[object HTMLTableCellElement]"
      ||Object.prototype.toString.call(e)==="[object HTMLTableHeaderCellElement]"){
      //兼容性IE的table类型为[object HTMLTableHeaderCellElement]
      return e;
    }else{
      return this.eventTargetTh(e.parentElement);
    }
  }
  elementStyleProperty=(element, prop)=>{
    if (window.getComputedStyle) {
      return window.getComputedStyle(element, "").getPropertyValue(prop);
    } else { // http://stackoverflow.com/questions/21797258/getcomputedstyle-like-javascript-function-for-ie8
      var re = /(\-([a-z]){1})/g;
      if (prop == 'float') prop = 'styleFloat';
      if (re.test(prop)) {
        prop = prop.replace(re, function () {
          return arguments[2].toUpperCase();
        });
      }
      return element.currentStyle[prop]
    }
  }
  copyStyles=(el)=> {
    var cs = window.getComputedStyle ? window.getComputedStyle(el, null) : el.currentStyle,
      css = '';
    for (var i = 0; i < cs.length; i++) {
      var style = cs[i];
      css += style + ': ' + cs.getPropertyValue(style) + ';';
    }
    return css;
  }
  mousePrepareDrag=(event)=>{
    var trident = this.tridentDetection(),
      table = document.getElementById(this.state.id),
      borderCollapse = this.borderCollapseDetection(table),
      tablePosition = this.getOffsetRect(table),
      row = table.rows[0],
      rowPosition = this.getOffsetRect(row),
      rowOffsetHeight = row.offsetHeight,
      tableClientLeft = trident ? (rowPosition.left - tablePosition.left) : table.clientLeft,
      tableClientTop = trident ? (rowPosition.top - tablePosition.top) : table.clientTop,
      backLeft = borderCollapse ? tablePosition.left : (tablePosition.left + tableClientLeft),
      backTop = borderCollapse ? tablePosition.top : (rowPosition.top),
      backWidth = borderCollapse ? table.offsetWidth : table.offsetWidth - 2 * tableClientLeft,
      backHeight = table.rows[0].offsetHeight,
      zIndex = this.numericProperty(table.style.zIndex),
      zIndex = zIndex ? zIndex + 1 : 1,
      // initialColumn = eventTarget(event).cellIndex,
      //由于table-drag的th里面不能包含其他元素，所以为了满足项目需求增加方法更改查找父元素为th,eventTargetTh--rain
      initialColumn = this.eventTargetTh(event).cellIndex,
      backgroundColor = this.elementStyleProperty(table, 'background-color');
    //在table的setting，重置table的列数时，nc的数据有问题，所以进行重置
    var  hr = table.rows[0];
    var  nc = hr.cells.length;

    // last column, initial column
    lc = initialColumn;
    ic = initialColumn;
    startColumn=initialColumn;
    endColumn=initialColumn;
    // overlay - back
    var back = document.createElement("div");
    back.style.position = 'absolute';
    back.style.left = backLeft + 'px';
    back.style.top = backTop + 'px';
    back.style.width = backWidth + 'px';
    // back.style.width = parentWidth;
    back.style.height = backHeight + 'px';
    back.style.backgroundColor = backgroundColor;
    back.style.zIndex = zIndex;
    back.className = "csp-table-drag-container";
    //由于ant-table在列较多时，会滚动，会溢出ant-table标题区域,所以获取table父元素位置和大小，超出父元素位置，设置其opacity为0，视觉上看不见
    var tableLeft=tablePosition.left;
    var tableParent=table.parentElement;
    var tableParentLeft=this.getOffsetRect(tableParent).left;
    var tableParentWidth=parseInt(this.elementStyleProperty(tableParent,"width").slice(0,-2));
    var tableLimitLeft=tableParentLeft-tableLeft;
    var tableLimitRight=tableLimitLeft+tableParentWidth;
    // console.log("tableParentLeft",tableParentLeft);
    // console.log("tableLeft",tableLeft);
    // console.log("tableLimitLeft",tableLimitLeft);
    // console.log("tableLimitRight",tableLimitRight);
    //添加整个拖拽元素移动界限
    limitRight=backWidth;
    limitLeft=0;
    minColumn=0;
    maxColumn=nc;
    // overlay - front
    for (var i = 0; i < nc; i++) {
      // if (row.cells[i].getAttribute("class") !== "ant-table-selection-column") {
      var cell = row.cells[i],
        cellPosition = this.getOffsetRect(cell),
        offsetWidth = cell.offsetWidth,
        offsetHeight = cell.offsetHeight,
        clientWidth = cell.clientWidth,
        clientHeight = cell.clientHeight,
        clientLeft = cell.clientLeft,
        clientTop = cell.clientTop,
        clientRight = offsetWidth - clientWidth - clientLeft,
        clientBottom = offsetHeight - clientHeight - clientTop,
        paddingTop = this.numericProperty(this.elementStyleProperty(cell, 'padding-top')),
        paddingBottom = this.numericProperty(this.elementStyleProperty(cell, 'padding-bottom')),
        temp = cell.getBoundingClientRect(),
        computedCellHeight = temp.bottom - temp.top - clientTop - clientBottom - paddingTop - paddingBottom,
        borderLeftWidth = borderCollapse ? (clientRight + clientLeft) : clientLeft,
        borderTopWidth = borderCollapse ? (clientTop + clientBottom) : clientTop,
        borderRightWidth = borderCollapse ? (clientRight + clientLeft) : clientRight,
        borderBottomWidth = borderCollapse ? (clientTop + clientBottom) : clientBottom,
        elementBaseLeft = borderCollapse ? (cellPosition.left - backLeft - tableClientLeft) : cellPosition.left - backLeft,
        elementBaseTop = borderCollapse ? (cellPosition.top - backTop - tableClientTop) : cellPosition.top - backTop,
        elementBaseWidth = clientWidth + borderLeftWidth + borderRightWidth,
        elementBaseHeight = rowOffsetHeight;

      var element = document.createElement("div");
      element.style.cssText = this.copyStyles(cell);
      element.style.position = 'absolute';
      element.style.left = 0;
      element.style.top = 0;
      element.style.height = computedCellHeight+1 + 'px';//高度+1，拖拽时候比ant-table的标题少1px，没找到原因，可能因为子元素样式引起的问题
      element.style.borderLeftWidth = borderLeftWidth + 'px';
      element.style.borderTopWidth = borderTopWidth + 'px';
      element.style.borderRightWidth = borderRightWidth + 'px';
      element.style.borderBottomWidth = borderBottomWidth + 'px';
      element.innerHTML = cell.innerHTML;
      element.style.zIndex = zIndex + 3;
      //当ant-table含有复选框时，给复选框添加单独class
      if(row.cells[i].getAttribute("class") === "ant-table-selection-column"){
        element.className="csp-table-drag-input";
      }
      if (i == initialColumn) element.style.left = elementBaseLeft + 'px';
      if (i == initialColumn) element.style.top = elementBaseTop + 'px';

      var elementBase = document.createElement("div");
      elementBase.style.position = 'absolute';
      elementBase.style.left = elementBaseLeft + 'px';
      elementBase.style.top = elementBaseTop+ 'px';
      elementBase.style.height = elementBaseHeight + 'px';
      elementBase.style.width = elementBaseWidth + 'px';
      elementBase.style.backgroundColor = 'white';
      elementBase.style.zIndex = zIndex + 2;
      //当ant-table含有复选框时，给复选框容器添加data-checkbox，自定义属性区分，暂时没对这个属性进行应用
      if(row.cells[i].getAttribute("class") === "ant-table-selection-column"){
        elementBase.setAttribute('data-checkbox','checkbox');
      }
      if (i == initialColumn) elementBase.style.zIndex = zIndex + 1;

      // drag element
      if (i == initialColumn) {
        de = element ;
        deLeft=elementBaseLeft;
        deWidth=elementBaseWidth;
      }
      if (i != initialColumn) elementBase.appendChild(element);



      //当元素位置超过ant-table的左右边界限制时，使元素的opacity为0，视觉上看不见
      var elementBaseLimitRight=elementBaseLeft+elementBaseWidth;
      if(!(elementBaseLeft>=tableLimitLeft&&elementBaseLimitRight<=tableLimitRight)){
        // elementBase.style.opacity=0;
        elementBase.setAttribute("class","csp-opacity");
        if(i == initialColumn){
          de.style.opacity=0;
          return false;
        }
      }
      //添加整个拖拽元素移动界限
      if(!(elementBaseLeft>=tableLimitLeft)){
        limitLeft=elementBaseLeft+elementBaseWidth;
        minColumn=i+1;
      }
      if(!(elementBaseLimitRight<=tableLimitRight)){
        limitRight=elementBaseLeft>limitRight?limitRight:elementBaseLeft;
        maxColumn=i<maxColumn?i-1:maxColumn;
      }
      // console.log("elementBaseLeft",elementBaseLeft);
      // console.log("i",i);
      // console.log("tableLimitRight",tableLimitRight);
      // console.log("tableLimitLeft",tableLimitLeft);
      // console.log("elementBaseLeft",elementBaseLeft);
      // console.log("elementBaseLimitRight",elementBaseLimitRight);
      // console.log("limitLeft",limitLeft);
      // console.log("this.limitLeft",this.limitLeft);
      // console.log("limitRight",limitRight);
      // console.log("minColumn",minColumn);
      // console.log("maxColumn",maxColumn);
      // console.log("this.limitRight",this.limitRight);
      // console.log("elementBaseLimitRight",elementBaseLimitRight);
      back.appendChild(elementBase);
      // console.log("elementBaseLeft",elementBaseLeft);
      // }
    }
    back.appendChild(de);
    document.body.appendChild(back);
    overlay = back;

    // replace current document cursor
    cur = document.body.style.cursor;
    document.body.style.cursor = 'move';
    return true;
  }
  getEvent=(event)=>{
    return event || window.event;
  }
  eventWhich=(event)=> {
    return event.which || event.button;
  }
  addEvent=(obj, type, fn)=> {
    if (obj.attachEvent) {
      obj['e' + type + fn] = fn;
      obj[type + fn] = function () {
        obj['e' + type + fn](window.event);
      };
      obj.attachEvent('on' + type, obj[type + fn]);
    } else
      obj.addEventListener(type, fn, false);
  }
  removeEvent=(obj, type, fn)=>{
    if (obj.detachEvent) {
      obj.detachEvent('on' + type, obj[type + fn]);
      obj[type + fn] = null;
    } else
      obj.removeEventListener(type, fn, false);
  }
  getTableColumn=(table, pageX, defaultColumn)=> {
    var cells = table.rows[0].cells;
    for (var i = 0; i < cells.length; i++) {
      var tx = this.getOffsetRect(cells[i]).left;
      if (tx <= pageX && pageX <= tx + cells[i].offsetWidth) {
        return i;
      }
    }

    return (typeof defaultColumn == 'undefined' ? -1 : defaultColumn);
  }
  sign=(x)=> {
    return typeof x == 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
  }
  mouseMoveDelegate=(event)=>{
    // console.log("this.eventPageX(event)",this.eventPageX(event));
    // console.log("mousePositionLeft",mousePositionLeft);
    var distance = this.eventPageX(event) - mousePositionLeft,
      table = document.getElementById(this.state.id),
      lastColumn = lc,
      eventColumn = this.getTableColumn(table, this.eventPageX(event), lastColumn);//这个地方出问题
    //console.log("lastColumn",lastColumn);//当前移动的column的序号
    //console.log("eventColumn",eventColumn);//当前移动元素到哪个column的序号
    eventColumn<minColumn?eventColumn=minColumn:eventColumn>maxColumn?eventColumn=maxColumn:eventColumn;
    // if (positionLeft >= limitLeft && positionLeft <= (limitRight - eventWidth))
    // this.tableMove=true;
    //原代码
    if((limitRight-deWidth)>=(deLeft + distance)&&(deLeft + distance)>=limitLeft){
      de.style.left = deLeft + distance + 'px';
    }else if((deLeft + distance)>(limitRight-deWidth)){
      de.style.left = limitRight-deWidth + 'px';
    }else if((deLeft + distance)<limitLeft){
      de.style.left = limitLeft + 'px';
    }
    // console.log("deWidth",deWidth);
    // console.log("limitRight",limitRight);
    // console.log("limitLeft",limitLeft);
    // console.log("deLeft",deLeft);
    // console.log("distance",distance);
    // console.log("this.numericProperty(de.style.left)",this.numericProperty(de.style.left));
    if (eventColumn != lastColumn) { // bubble
      var trident = this.tridentDetection(),
        borderCollapse = this.borderCollapseDetection(table),
        borderSpacing = borderCollapse ? 0 : this.numericProperty(this.elementStyleProperty(table, 'border-spacing')),
        direction = this.sign(eventColumn - lastColumn);
      for (var i = lastColumn; i != eventColumn; i += direction) {

        var start = i,
        end = start + direction,
        shift = 0,
          shift = (direction < 0 && start > ic) ? 1 : ((direction > 0 && start < ic) ? -1 : 0),
          layerOne = overlay.childNodes[direction < 0 ? ic : (end + shift)],
          layerTwo = overlay.childNodes[direction > 0 ? ic : (end + shift)],
          borderLeftWidth = this.numericProperty(this.elementStyleProperty(direction < 0 ? layerTwo.childNodes[0] : de, 'border-left-width')),
          borderLeftWidth = borderCollapse ? borderLeftWidth : 0,
          left = this.numericProperty(layerTwo.style.left),
          width = this.numericProperty(layerOne.style.width);
        layerOne.style.left = left + 'px';
        layerTwo.style.left = left + width + borderSpacing - borderLeftWidth + 'px';
        //layerOne.setAttribute("class","csp-move-column")//可能没用
        //layerOne 移动的空白站位
        //layerTwo 其他已经移动位置元素
        // console.log("layerOne", layerOne);
        // console.log("layerTwo", layerTwo);





        endColumn=end;
        // console.log("startColumn",startColumn);
        // console.log("endColumn",endColumn);
        // set new column
        lc = end;
      }
    }
  }
  mouseUpDelegate=(e)=>{
    document.body.removeChild(overlay);
    // console.log("overlay",overlay);
    this.changeColumn(startColumn, endColumn);
    this.removeEvent(document, 'mousemove', this.mouseMoveDelegate);
    document.body.style.cursor = cur;
    this.removeEvent(document, 'mouseup', this.mouseUpDelegate);
  }
  titleMouseDown=(e)=>{
    (e.preventDefault ? e.preventDefault() : (e.returnValue=false));
    (e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true));
    if(this.eventWhich(e)===0){
      mousePositionLeft=this.eventPageX(e);
      if(this.mousePrepareDrag(e)){
        this.addEvent(document, 'mousemove', this.mouseMoveDelegate);
        this.addEvent(document, 'mouseup', this.mouseUpDelegate);
      }
    }
  }
  //drag组件结束

  getColumns=()=>{
    //重新设置table的title顺序
    let order=this.state.order;
    let columns=this.props.table.columns;
    let newColumn=[];
    let that=this;
    if(order.length!==0){
      order.map(function(val){
        for(let i=0;i<columns.length;i++){
          if(val===columns[i].key){
            let newVal={};
            for(let key in columns[i]){
              if(key==="title"){
                newVal[key]=<p className="csp-table-title" onMouseDown={that.titleMouseDown}>{columns[i][key]}</p>;
                // newVal[key]=<p className="csp-table-title">{columns[i][key]}</p>;
              }else{
                newVal[key]=columns[i][key];
              }
            }
            newColumn.push(newVal);
            return false;
          }
        }
      });
      return newColumn;
    }else{
      return columns;
    }
  }
  searchClick=()=>{
    //search按钮在点击时候设置下面search框显示或者隐藏
    this.setState({searchShow:!this.state.searchShow,searchValue:""});
    if(this.state.searchValue!==""){
      let filter=this.state.filter;
      filter=Object.assign({},filter,{[this.state.searchName]:""})
      this.triggerSearchFilter({[this.state.searchName]:""});
      this.props.buttonGroup.setFilterValues(filter);
    }
  }
  // emptySearchValue=()=>{
  //   //清空searchValue
  //   this.setState({searchValue:""});
  //   this.triggerSearchFilter({[this.state.searchName]:""});
  // }
  searchChange=(e)=>{
    //search搜索框在onChange触发的事件
    let filter=this.state.filter;
    filter=Object.assign({},filter,{[this.state.searchName]:e.target.value})
    this.setState({searchValue:e.target.value,filter:filter});
    this.props.buttonGroup.setFilterValues(filter);
    this.setState({hasSearch:false});
    // this.triggerSearchFilter({[this.state.searchName]:e.target.value});
  }
  filterClick=()=>{
    this.setState({filerModalShow:!this.state.filerModalShow});
    if(this.state.filerModalShow){
      let filter=this.initialFilter(this.state.order);
      this.setState({filter:filter});
      this.triggerSearchFilter(filter);
      this.props.buttonGroup.setFilterValues(filter);
    }
  }
  filterResetClick=()=>{
    let filter=this.initialFilter(this.state.order);
    if(this.props.buttonGroup.search&&this.state.searchShow){
      this.setState({searchValue:""});
      filter=Object.assign({},filter,{[this.state.searchName]:""})
    }
    this.setState({filter:filter});
    this.triggerSearchFilter(filter);
    this.props.buttonGroup.setFilterValues(filter);
  }
  setDateFilter=(name,value)=>{
    this.setState({[name+"FilterReal"]:value});
  }
  // setRangeFilter=(name,value)=>{
  //   //保存range类型筛选的值，满足都是数字的要求，点击对号放入filter过滤
  //   this.setState({[name+"FilterReal"]:value});
  // }
  initialFilter=(order,option)=>{
    //由于日期组件设置时间的值会与传给后台的值有出入，filter中为传给后台日期格式，再state设置dateFilterReal属性为date的值
    //由于用户对于range类型筛选可能包含非数字，故保存range类型筛选的值在rangeFilter对象中，满足都是数字的要求，点击对号放入state的filter过滤
    let filter={};
    let that=this;
    if(!option){
      if(this.props.buttonGroup.filter){
        this.props.tableFilter.filterOption.map(function(val,index){
          switch(val.type){
            case "string":
              if(order.indexOf(val.property)!==-1){
                filter=Object.assign({},filter,{[val.name]:true});
              }else{
                filter=Object.assign({},filter,{[val.name]:false});
              }
              break;
            case "enum":
              filter=Object.assign({},filter,{[val.name]:val.options[0].value});
              break;
            case "date":
              that.setDateFilter(val.name,[null,null]);
              filter=Object.assign({},filter,{[val.name]:["",""]});
              break;
            case "range":
              // that.setRangeFilter(val.name,["",""]);
              filter=Object.assign({},filter,{[val.name]:["",""]});
              break;
            case "search":
              that.setState({searchName:val.name});
              filter=Object.assign({},filter,{[val.name]:""});
              break;
          }
        });
      }
    }else{
      if(this.props.buttonGroup.filter){
        option.map(function(val,index){
          switch(val.type){
            case "string":
              if(order.indexOf(val.property)!==-1){
                filter=Object.assign({},filter,{[val.name]:true});
              }else{
                filter=Object.assign({},filter,{[val.name]:false});
              }
              break;
            case "enum":
              filter=Object.assign({},filter,{[val.name]:val.options[0].value});
              break;
            case "date":
              that.setDateFilter(val.name,[null,null]);
              filter=Object.assign({},filter,{[val.name]:["",""]});
              break;
            case "range":
              // that.setRangeFilter(val.name,["",""]);
              filter=Object.assign({},filter,{[val.name]:["",""]});
              break;
            case "search":
              that.setState({searchName:val.name});
              filter=Object.assign({},filter,{[val.name]:""});
              break;
          }
        });
      }
    }
    return filter;
  }
  filterCheckbox=(name,e)=>{
    // this.triggerSearchFilter({[name]:e.target.checked});
    if(!e.target.checked){
      let filterArray=this.props.tableFilter.filterOption;
      let filter=this.state.filter;
      let stringArray=[];
      let reset=true;
      filterArray.map(function(val){
        if(val.type==="string"&&val.name!==name){
          stringArray.push(val.name);
        }
      });
      if(stringArray.length===0){
        reset=true;
      }
      for(let i=0;i<stringArray.length;i++){
        if(filter[stringArray[i]]){
          reset=false;
        }
      }
      if(reset){
        let newFilter=Object.assign({},filter,{[this.state.searchName]:""});
        this.setState({searchValue:""});
        this.setState({filter:newFilter});
      }
    }
    let filter=this.state.filter;
    filter=Object.assign({},filter,{[name]:e.target.checked});
    this.props.buttonGroup.setFilterValues(filter);
    this.setState({filter:filter});
    this.setState({hasSearch:false});
  }
  filterSelect=(name,e)=>{
    let filter=this.state.filter;
    filter=Object.assign({},filter,{[name]:e});
    this.props.buttonGroup.setFilterValues(filter);
    this.setState({filter:filter});
    this.setState({hasSearch:false});
    // this.triggerSearchFilter({[name]:e});
  }
  filterDateChange=(name,date, dateString)=>{
    let filter=this.state.filter;
    filter=Object.assign({},filter,{[name]:dateString});
    this.props.buttonGroup.setFilterValues(filter);
    this.setState({filter:filter});
    this.setDateFilter(name,date);
    this.setState({hasSearch:false});
    // this.triggerSearchFilter({[name]:dateString});
  }
  // filterRangeConfirm=(name)=>{
  //   let filter=this.state.filter;
  //   filter=Object.assign({},filter,{[name]:JSON.parse(JSON.stringify(this.state[name+"FilterReal"]))});
  //   this.setState({filter:filter});
  //   this.triggerSearchFilter({[name]:JSON.parse(JSON.stringify(this.state[name+"FilterReal"]))});
  // }
  filterRangeInput=(name,e,index)=>{
    let arr=this.state.filter[name];
    let filter=this.state.filter;
    if(this.isInteger(e.target.value)||e.target.value===""){
      arr[index]=e.target.value ? parseInt(e.target.value) : "";
      filter=Object.assign({},filter,{[name]:arr});
      this.setState({filter:filter});
      this.props.buttonGroup.setFilterValues(filter);
    }
    this.setState({hasSearch:false});
    // if(arr[0]===""&&arr[1]===""){
    //   let filter=this.state.filter;
    //   filter=Object.assign({},filter,{[name]:["",""]});
    //   this.setState({filter:filter});
    //   this.triggerSearchFilter({[name]:["",""]});
    // }
  }
  // filterRangeAddClass=(name)=>{
  //   let arr=this.state[name+"FilterReal"];
  //   for(let i=0;i<arr.length;i++){
  //     if(!this.isInteger(arr[i])){
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  isInteger=(num)=>{
    return /^[0-9]+$/.test(num);
  }
  queryFilter=()=>{
    this.triggerSearchFilter({});
  }
  getFilterList=()=>{
    let stringDom=[];
    let enumDom=[];
    let dateDom=[];
    let rangeDom=[];
    let order=this.state.order;
    this.props.tableFilter.filterOption.map((val,index)=>{
      switch(val.type){
        case "string":
          if(order.indexOf(val.property)!==-1){
            stringDom.push(<Checkbox key={val.name} checked={this.state.filter[val.name]}
                                     onChange={(e)=>{this.filterCheckbox(val.name,e)}}>{val.label}</Checkbox>);
          }
          break;
        case "enum":
          if(order.indexOf(val.property)!==-1){
            enumDom.push(
              <Select value={this.state.filter[val.name]} key={val.name} dropdownMatchSelectWidth={false}
                      onChange={(select)=>{this.filterSelect(val.name,select)}}>
                {val.options.map((option,i)=>{
                  return <Select.Option key={option.value} value={option.value}>{val.label+" : "+option.label}</Select.Option>
                })}
              </Select>);
          }
          break;
        case "date":
          if(order.indexOf(val.property)!==-1){
            dateDom.push(
              <RangePicker key={val.name} onChange={(date, dateString)=>{this.filterDateChange(val.name,date, dateString)}}
                           placeholder={val.placeholder} value={this.state[val.name+"FilterReal"]}/>);
          }
          break;
        case "range":
          if(order.indexOf(val.property)!==-1){
            rangeDom.push(
              <span key={val.name} className={"csp-table-filter-range"}>
            <Button type="default" disabled>{val.label}</Button>
            <Input value={this.state.filter[val.name][0]} onChange={(e)=>{this.filterRangeInput(val.name,e,0)}}
                   placeholder={this.props.tableFilter.rangePlaceholder[0]}/>
            <Input placeholder="~" disabled/>
            <Input value={this.state.filter[val.name][1]}  onChange={(e)=>{this.filterRangeInput(val.name,e,1)}}
                   placeholder={this.props.tableFilter.rangePlaceholder[1]}/>
                {/*<Button disabled={this.filterRangeAddClass(val.name)} type="primary" icon="check" onClick={()=>this.filterRangeConfirm(val.name)}/>*/}
          </span>
            )
          }
          break;
      }
    });
    return (
      <div className="csp-table-filter-box">
        {
          stringDom.length===0 ? null :
            <div className="csp-table-filter-type">
              <div className="csp-table-filter-title">{this.props.tableFilter.stringFilterTitle}&nbsp;:&nbsp;</div>
              <div className="csp-table-filter-content">
                {stringDom}
                {
                  enumDom.length===0 ?
                    <Button type="primary" size="default" onClick={this.queryFilter}>{this.props.buttonGroup.filterQuery}</Button> : null
                }
              </div>
            </div>
        }
        {
          enumDom.length===0 ? null :
            <div className="csp-table-filter-type">
              <div className="csp-table-filter-title">{this.props.tableFilter.typeFilterTitle}&nbsp;:&nbsp;</div>
              <div className="csp-table-filter-content">
                {enumDom}
                {dateDom.length===0?null:dateDom}
                {rangeDom.length===0?null:rangeDom}
                <Button type="primary" size="default" onClick={this.queryFilter}>{this.props.buttonGroup.filterQuery}</Button>
              </div>
            </div>
        }
        {
          stringDom.length===0 && enumDom.length===0 ?
            <div className="csp-table-filter-empty-content">{this.props.buttonGroup.filterEmptyContent}</div>
            : null
        }
      </div>
    )
  }
  downloadClick=()=>{
    let notDownloadColumns=this.props.buttonGroup.notDownloadColumns;
    let data=this.props.table.dataSource;
    let title=this.props.table.columns;
    let order=this.state.order;
    let result=[];
    let subTitle=[];
    for(let i=0;i<order.length;i++){
      title.map(function(val,index){
        if(order[i]===val.key){
          if(notDownloadColumns.indexOf(order[i])===-1){
            subTitle.push(val.title);
          }
          return false;
        }
      });
    }
    data.map(function(value,index){
      let content=[];
      for(let i=0;i<order.length;i++){
        title.map(function(val,index){
          if(order[i]===val.key){
            if(notDownloadColumns.indexOf(order[i])===-1){
              if(val.textContent){
                //为了数字时间等正确显示及英文,和所包含的\n
                content.push(('"'+val.textContent(value[order[i]],value)+'"')+"\t");
              }else{
                content.push(('"'+value[order[i]]+'"')+"\t");
              }
            }

            return false;
          }
        });
      }
      result.push(content);
    });
    result.unshift(subTitle);
    let csvContent = "data:text/csv;charset=utf-8,\ufeff";
    if (window.navigator.msSaveOrOpenBlob) {
      csvContent = "\ufeff";
    }
    result.forEach(function(infoArray, index){
      let dataString = infoArray.join(",");
      csvContent += index < data.length ? dataString+ "\n" : dataString;
    });
    if (window.navigator.msSaveOrOpenBlob) {
        // if browser is IE
      let blob = new Blob([decodeURIComponent(encodeURI(csvContent))],{
        type: "text/csv;charset=utf-8;"
      });
      navigator.msSaveBlob(blob, this.props.buttonGroup.downloadFileName+'.csv');
    }else{
      let encodedUri = encodeURI(csvContent);
      let link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", this.props.buttonGroup.downloadFileName+".csv");
      document.body.appendChild(link);
      link.click();
      }
  }
  sortFilterValues=(filter)=>{
    let filterArray=this.props.tableFilter.filterOption;
    let range=[];
    filterArray.map(function(val){
      if(val.type==="range"){
        range.push(val.name);
      }
    });
    range.map(function(name){
      filter=Object.assign({},filter,{[name]:filter[name][0]!==""&&filter[name][1]!==""?
        filter[name][0]>filter[name][1]?[filter[name][1],filter[name][0]]
          :filter[name]:filter[name]})
    });
    this.setState({filter:filter});
    return filter;
  }
  triggerSearchFilter=(obj)=>{
    let filter=this.filterValues(obj);
    // if(this.props.buttonGroup.search){
    //   filter=Object.assign({},filter,{[this.state.searchName]:this.state.searchValue});
    // }
    // if(this.props.buttonGroup.filter){
    //   filter=Object.assign({},filter,this.state.filter);
    // }
    // filter=Object.assign({},filter,obj);
    filter=this.sortFilterValues(filter);
    // console.log("传递数据正确？？？",filter);
    this.props.buttonGroup.searchChange(filter);
    this.setState({hasSearch:true});
  }
  filterValues=(obj)=>{
    let filter={};
    if(this.props.buttonGroup.filter){
      filter=Object.assign({},filter,this.state.filter);
    }
    if(this.props.buttonGroup.search){
      filter=Object.assign({},filter,{[this.state.searchName]:this.state.searchValue});
    }
    filter=Object.assign({},filter,obj);
    return filter;
  }
  syncClick=()=>{
    let filter=this.filterValues({});
    filter=this.sortFilterValues(filter);
    this.props.buttonGroup.syncClick(filter);
  }
  moreButtonClick=()=>{
    let filter=this.filterValues({});
    // if(this.props.buttonGroup.search){
    //   filter=Object.assign({},filter,{[this.state.searchName]:this.state.searchValue});
    // }
    // if(this.props.buttonGroup.filter){
    //   filter=Object.assign({},filter,this.state.filter);
    // }
    filter=this.sortFilterValues(filter);
    this.props.moreButton.moreClick(filter,this.state.hasSearch);
    this.setState({hasSearch:true});
    this.setState({moreButtonStatus:true});
    // console.log("more button传递数据正确？？？",filter);
  }
  deleteClick=()=>{
    let filter=this.filterValues({});
    // if(this.props.buttonGroup.search){
    //   filter=Object.assign({},filter,{[this.state.searchName]:this.state.searchValue});
    // }
    // if(this.props.buttonGroup.filter){
    //   filter=Object.assign({},filter,this.state.filter);
    // }
    this.props.buttonGroup.deleteClick(filter);
  }
  settingClick=()=>{
    this.changeSettingModal(true);
  }
  changeSettingModal=(bool)=>{
    this.setState({setting:bool});
  }
  settingSave=(selectedItems)=>{
    // console.log("selectedItems",selectedItems);
    let order=[];
    selectedItems.map(function(val){
      order.push(val.key);
    });
    this.setState({order:order});
    this.settingResultFilter(order);
    this.props.buttonGroup.settingSave(order);
    // console.log("order",order);
    this.changeSettingModal(false);
  }
  settingResultFilter=(order)=>{
    let filter=this.state.filter;
    let filterOption=this.props.tableFilter.filterOption;
    let that=this;
    let string=[];
    let empty=true;
    if(this.props.buttonGroup.filter){
      filterOption.map(function(val,index){
        switch(val.type){
          case "string":
            if(order.indexOf(val.property)===-1){
              filter=Object.assign({},filter,{[val.name]:false});
            }
            string.push(val.name);
            break;
          case "enum":
            if(order.indexOf(val.property)===-1){
              filter=Object.assign({},filter,{[val.name]:val.options[0].value});
            }
            break;
          case "date":
            if(order.indexOf(val.property)===-1){
              that.setDateFilter(val.name,[null,null]);
              filter=Object.assign({},filter,{[val.name]:["",""]});
            }
            break;
          case "range":
            if(order.indexOf(val.property)===-1){
              filter=Object.assign({},filter,{[val.name]:["",""]});
            }
            // that.setRangeFilter(val.name,["",""]);
            break;
        }
      });
    }
    if(this.props.buttonGroup.filter){
      string.map(function(val){
        if(filter[val]){
          empty=false;
          return false;
        }
      });
    }
    if(empty){
      this.setState({searchValue:""});
      filter=Object.assign({},filter,{[this.state.searchName]:""});
    }
    let newFilter=this.filterValues(filter);
    newFilter=this.sortFilterValues(filter);
    this.setState({filter:newFilter});
    //需要重新发送搜索数据
    this.props.buttonGroup.searchChange(newFilter);
    this.props.buttonGroup.setFilterValues(newFilter);
    this.setState({hasSearch:true});
  }

  getSelectedItems=()=>{
    let selected=[];
    let order=this.state.order;
    let columns=this.props.table.columns;
    order.map(function(val){
      for(let i=0;i<columns.length;i++){
        if(val===columns[i].key){
          selected.push({key:val,title:columns[i].title});
          return false;
        }
      }
    });
    return selected;
  }
  getInputStatus=()=>{
    let filterArray=this.props.tableFilter.filterOption;
    let filter=this.state.filter;
    let stringArray=[];
    filterArray.map(function(val){
      if(val.type==="string"){
        stringArray.push(val.name);
      }
    });
    if(stringArray.length===0){
      return true;
    }
    for(let i=0;i<stringArray.length;i++){
      if(filter[stringArray[i]]){
        return false;
      }
    }
    return true;
  }
  getInputPlaceholder=()=>{
    let placeholder=[];
    let stringArray=[];
    let filterArray=this.props.tableFilter.filterOption;
    let filter=this.state.filter;
    filterArray.map(function(val){
      if(val.type==="string"){
        stringArray.push(val);
      }
    });
    for(let i=0;i<stringArray.length;i++){
      if(filter[stringArray[i].name]){
        placeholder.push(stringArray[i].label);
      }
    }
    return placeholder.join("/");
  }
  pageSizeChange=(value)=>{
    let filter=this.filterValues({});
    filter=this.sortFilterValues(filter);
    this.setState({moreButtonStatus:true});
    this.props.moreButton.pageSizeChange(value,filter,this.state.hasSearch);
    this.setState({hasSearch:true});
  }
  render = () => {
    let {moreButton,buttonGroup,tableFilter}=this.props;
    let table=Object.assign({},this.props.table,{columns:this.getColumns()});
    let moreShow=moreButton.show&&(table.dataSource.length < moreButton.total);
    let dynamicButton=buttonGroup.dynamicButton?buttonGroup.dynamicButton:"show";
    let dynamicButtonChildren=false;
    //console.log("children",this.props.children);
    if(this.props.children){
      if(Array.isArray(this.props.children)){
        this.props.children.map(function(val){
          if(val){
            return dynamicButtonChildren=true;
          }
        });
      }else{
        dynamicButtonChildren=true;
      }
    }

    // console.log("state",this.state);
    // console.log("filter",this.state.filter);
    // console.log("searchValue",this.state.searchValue);
    // console.log("order",this.state.order);
    // console.log("columns",this.getColumns());

    return (
      <div className="csp-table-container">
        <div className="csp-table-dynamic-button" style={{display:dynamicButton==="show"||dynamicButtonChildren?"block":"none"}}>
          {
            dynamicButton==="show" ?
              <Button.Group>
                <Button  size="large" type="primary" icon="plus" disabled={!buttonGroup.add}
                         onClick={this.props.buttonGroup.addClick} title={buttonGroup.addTitle}/>
                <Button  size="large" type="primary" icon="delete"
                         disabled={!buttonGroup.delete||(this.props.table.rowSelection&&this.props.table.rowSelection.selectedRowKeys.length===0)}
                         onClick={this.deleteClick} title={buttonGroup.deleteTitle}/>
                <Button  size="large" type="primary" icon="edit"
                         disabled={!buttonGroup.edit||(this.props.table.rowSelection&&this.props.table.rowSelection.selectedRowKeys.length!==1)}
                         onClick={this.props.buttonGroup.editClick} title={buttonGroup.editTitle}/>
              </Button.Group> : null
          }
          {
            dynamicButtonChildren ?
              <div className="csp-table-dynamic-button-children">
                {
                  this.props.children
                }
              </div> : null
          }
        </div>
        <div className="csp-table-fixed-button">
          {//searchPlaceholder
            buttonGroup.search&&this.state.searchShow ?
              <Input.Search disabled={this.getInputStatus()} placeholder={this.getInputStatus()?buttonGroup.searchPlaceholder:this.getInputPlaceholder()}
                     onChange={this.searchChange} onSearch={this.queryFilter} value={this.state.searchValue} size="large"/>
              : null}
          <Button.Group>
            <Button  size="large" type="primary" icon="search" disabled={!buttonGroup.search}
                     onClick={this.searchClick} title={buttonGroup.searchTitle}/>
            <Button  size="large" type="primary" icon="filter" disabled={!buttonGroup.filter}
                     onClick={this.filterClick} title={buttonGroup.filterTitle}/>
            <Button  size="large" type="primary" icon="reload" disabled={!buttonGroup.filter&&!buttonGroup.search}
                     onClick={this.filterResetClick} title={buttonGroup.resetTitle}/>
            <Button  size="large" type="primary" icon="sync" disabled={!buttonGroup.sync}
                     onClick={this.syncClick} title={buttonGroup.syncTitle}/>
            <Button  size="large" type="primary" icon="setting" disabled={!buttonGroup.setting}
                     onClick={this.settingClick} title={buttonGroup.settingTitle}/>
            <Button  size="large" type="primary" icon="download" disabled={!buttonGroup.download||this.props.table.dataSource.length===0}
                     onClick={this.downloadClick} title={buttonGroup.downloadTitle}/>
          </Button.Group>
        </div>
        {
          buttonGroup.filter&&this.state.filerModalShow ?
                this.getFilterList()
            : null
        }

        <div className="csp-table-box"  ref="tableContainer">
          <Table className="csp-table" {...table} bordered/>
        </div>
        {
          moreShow ?
            <div className="csp-table-more">
              <Select value={moreButton.pageSize} onChange={this.pageSizeChange} disabled={this.state.moreButtonStatus}>
                {
                  moreButton.pageSizeList.map(function(val){
                    return <Select.Option key={val} value={val}>{val+"/"+moreButton.pageSizeContent}</Select.Option>
                  })
                }
              </Select>
              <Button type="primary" onClick={this.moreButtonClick} disabled={this.state.moreButtonStatus}>{moreButton.content}<Icon type="down"/></Button>
            </div> : null
        }
        {
          buttonGroup.setting&&this.state.setting ? <ItemSelectModal okText={this.props.buttonGroup.settingOkText}
                                                cancelText={this.props.buttonGroup.settingCancelText}
                                                selectedItems={this.getSelectedItems()}
                                                allItems={this.props.table.columns}
                                                visible={this.state.setting}
                                                title={this.props.buttonGroup.settingModalTitle}
                                                itemSelectedContent={this.props.buttonGroup.settingItemSelectedContent}
                                                placeholder={this.props.buttonGroup.settingPlaceholder}
                                                hideModal={()=>this.changeSettingModal(false)}
                                                onSave={this.settingSave}
                                                addAllItemTitle={this.props.buttonGroup.settingAddAllItemTitle}
                                                addSelectedItemTitle={this.props.buttonGroup.settingAddSelectedItemTitle}
                                                removeAllItemTitle={this.props.buttonGroup.settingRemoveAllItemTitle}
                                                removeSelectedItemTitle={this.props.buttonGroup.settingRemoveSelectedItemTitle}
                                                savePrompt={this.props.buttonGroup.settingSavePrompt}
                                                /> : null
        }
      </div>
    );
  }
}
TableDragComponent.defaultProps={
  table:{
    pagination:false,
  },
  moreButton:{
    show:false,
  },
  buttonGroup:{
    search:true,
    add:true,
  },
}
TableDragComponent.propTypes = {
  /**
   * id : string类型，必须，table的id ;<br/>
   *columns : array类型，必须，同ant-table。为了在下载表格时，表格中内容可以与页面显示一致（为了兼容中英文及一些bool等判断可以正确显示为用户可读内容），
   * 若columns中的render中包含一些dom元素或存在bool等需前端判断而显示不同文字，需增加textContent(text,record)，必须返回纯文本 ;<br/>
   *order : array类型，必须，table的title顺序,在组件componentWillMount时请求后台获取该数据，当对table的标题进行增加或更改顺序，只需向后台发送数据，不需要重新请求更新 ;<br/>
   *dataSource : 参考ant-table的dataSource ;<br/>
   *changeTitleOrder : function类型，必须，改变table的title顺序后的回调函数，会传入新的order ;<br/>
   * 注 :1. 若table含有列表可选功能时，rowSelection 要包含onChange和 selectedRowKeys;<br/>
   * 其他 : 参考ant-table;<br/>
   *
   */
  table:PropTypes.shape({
    id:PropTypes.string.isRequired,//table的id，为了定位而使用
    // rowSelection:PropTypes.object,
    // scroll:PropTypes.object,
    columns:PropTypes.array.isRequired,//下载按钮可用时，为了使传入的布尔值或者disable/enable等正确的输出中英文转换，
    // 需增加一个方法textContent(text,record),返回纯文本，若包含这个方法，则使用这个方法返回的值，不包含直接使用DataSource对应key传入的值
    // pagination:PropTypes.bool,
    order:PropTypes.array.isRequired,//table的title顺序
    dataSource:PropTypes.array.isRequired,
    changeTitleOrder:PropTypes.func.isRequired,//改变title顺序后的回调函数，会传入新的order
  }).isRequired,
  /**
  * show : bool类型，是否显示more按钮，必须;<br/>
  * content : string类型，设置more按钮的显示文字，若show为true时，必须 ;<br/>
  * moreClick : function类型，more按钮点击后的回调函数，会把当前搜索框及过滤器的值及hasSearch（bool值，为了解决用户在点击筛选条件后，未点击查询而直接点击下一页和页码的问题）传入，若show为true时，必须 ;<br/>
  * pageSize : string类型，more按钮前设置初始请求数据的条数，由string类型的数据组成的数组（select组件的要求），若show为true时，必须 ;<br/>
  * pageSizeChange : function类型，设置页数的回调，第一个参数为页数的value，第二个为filter的值，第三个值为hasSearch（bool值，为了解决用户在点击筛选条件后，未点击查询而直接点击下一页和页码的问题）若show为true时，必须 ;<br/>
  * pageSizeContent : string类型，页数的显示内容，若show为true时，必须 ;<br/>
  * pageSizeList : array类型，页数可选的数组，由string类型的数据组成的数组（select组件的要求），若show为true时，必须 ;<br/>
  * total : number类型，总共数据的条数,当历史数据全部加载more按钮隐藏，若show为true时，必须 ;<br/>
   **/
  moreButton:PropTypes.shape({
    show:PropTypes.bool.isRequired,//是否显示more按钮
    content:PropTypes.string,//设置more按钮的内容
    moreClick:PropTypes.func,//点击后的回调函数,会把当前搜索框及过滤器的值传入
    pageSize:PropTypes.string,//设置初始请求数据的条数
    pageSizeChange:PropTypes.func,//设置页数的回调
    pageSizeContent:PropTypes.string,//文字内容
    pageSizeList:PropTypes.array,//页数可选的数组
    total:PropTypes.number,//总共数据的条数
  }).isRequired,
  /**
  *search :  bool类型，搜索按钮是否可用，必须 ;<br/>
  *searchTitle :  string类型，搜索按钮可用时，必须 ;<br/>
  *searchChange : function类型，根据关键字搜索及根据过滤器结果进行搜索的回调函数,注意由于需要要求增加页数选择，故在页数更改时pageSize是存在外边容器的state内，故发送数据需注意对pageSize的处理,若search可用或filter为true时，必须 ;<br/>
  *searchPlaceholder : string类型，搜索输入框无搜索包含（table用户未选择可筛选的标题或未选搜索包含）的placeholder文字,若search可用，必须 ;<br/>
  *add :  bool类型，添加按钮是否可用 ;<br/>
  *addTitle :  string类型，添加按钮可用时，必须 ;<br/>
  *addClick : function类型，添加按钮点击的回调函数,若add可用,必须 ;<br/>
  *filter : bool类型，过滤器按钮是否可用，必须  ;<br/>
  *filterTitle : string类型，过滤器按钮可用时，必须  ;<br/>
  *filterQuery : string类型，过滤器查询按钮的文字，过滤器按钮可用时，必须  ;<br/>
  *filterEmptyContent : string类型，当用户没有可筛选内容时，显示的内容，过滤器按钮可用时，必须  ;<br/>
  *setFilterValues : fun类型，为了把当前组件的过滤器内容传递到父容器中，会传入相关过滤筛选内容，当过滤器含有range类型，返回的值需要进行排序，过滤器按钮或搜索可用时，必须  ;<br/>
  *resetTitle : string类型，过滤器按钮或搜索按钮可用时，必须  ;<br/>
  *setting : bool类型，设置按钮是否可用，必须 ;<br/>
  *settingTitle : string类型，设置按钮可用时，必须 ;<br/>
  *settingAddAllItemTitle : string类型，setting模态框的全选的title，设置按钮可用时，必须 ;<br/>
  *settingAddSelectedItemTitle : string类型，setting模态框的添加所选item的title，设置按钮可用时，必须 ;<br/>
  *settingRemoveAllItemTitle : string类型，setting模态框的移除的title，设置按钮可用时，必须 ;<br/>
  *settingRemoveSelectedItemTitle : string类型，setting模态框的移除所选item的title，设置按钮可用时，必须 ;<br/>
  *settingModalTitle : string类型，setting模态框的标题，当setting为可用时，必须 ; <br/>
  *settingPlaceholder : string类型，setting模态框内搜索框的placeholder，当setting为可用时，必须 ; <br/>
  *settingItemSelectedContent : string类型，setting模态框已选item的显示文字，当setting为可用时，必须 ; <br/>
  *settingSavePrompt : string类型，setting模态框未选择任何item给用户的提示信息，当setting为可用时，必须 ; <br/>
  *settingOkText : string类型，setting模态框ok按钮显示的文字，当setting为可用时，必须 ; <br/>
  *settingCancelText : string类型，setting模态框cancel按钮文字，当setting为可用时，必须 ; <br/>
  *settingSave : function类型，setting模态框,保存后的回调函数，当setting为可用时，必须 ; <br/>
  *sync : bool类型，刷新按钮是否可用，必须 ; <br/>
  *syncTitle : string类型，刷新按钮可用时，必须 ; <br/>
  *syncClick : function类型，sync按钮点击的回调函数，会传入当前搜索及根据过滤器结果，若sync可用，必须 ;<br/>
  *download : bool类型，下载按钮是否可用，必须; <br/>
  *downloadTitle :  string类型，下载按钮可用时，必须; <br/>
  *notDownloadColumns : array类型，下载表格数据时，不包含的列，若全部列都需下载，则传入[]，对应的为columns数组中对应的key，下载按钮可用时，必须 ; <br/>
  *downloadFileName : string类型，下载csv文件的，文件名，下载按钮可用时，必须 ; <br/>
  *delete : bool类型，删除按钮是否可用，必须; <br/>
  *deleteTitle : string类型，删除按钮可用时，必须; <br/>
  *deleteClick : function类型，删除按钮点击的回调函数，会传入search的值及过滤器结果，当删除按钮可用时，必须; <br/>
  *edit : bool类型，编辑按钮是否可用，必须; <br/>
  *editTitle : string类型，编辑按钮可用时，必须; <br/>
  *editClick : function类型，编辑按钮点击的回调函数，当编辑按钮可用时，必须; <br/>
  *dynamicButton : string类型，添加、删除、修改按钮是否显示，不设置默认显示，不显示则值为hide(由于项目中添加删除修改按钮还可能根据权限表格数据中字段等设置状态，故添加一个属性判断); <br/>
  * 注 : 若需要增加额外按钮，Button的size为large，会显示在与添加、删除、编辑按钮一行
  **/
  buttonGroup:PropTypes.shape({
    search:PropTypes.bool.isRequired,//搜索按钮是否可用
    searchTitle:PropTypes.string,//搜索按钮title
    searchChange:PropTypes.func,//根据关键字搜索及根据过滤器结果进行搜索的回调函数
    searchPlaceholder:PropTypes.string,//搜索输入框的placeholder文字
    add:PropTypes.bool.isRequired,//添加按钮是否可用
    addTitle:PropTypes.string,//添加按钮title
    addClick:PropTypes.func,//添加按钮点击的回调函数
    filter:PropTypes.bool.isRequired,//过滤器按钮是否可用
    filterTitle:PropTypes.string,//过滤器按钮title
    filterQuery:PropTypes.string,//过滤器查询按钮文字
    filterEmptyContent:PropTypes.string,//没有可筛选时显示内容
    setFilterValues:PropTypes.func,//为了把当前组件的过滤器内容传递到父容器中，会传入相关过滤筛选内容
    resetTitle:PropTypes.string,//重置按钮title
    setting:PropTypes.bool.isRequired,//设置按钮是否可用
    settingTitle:PropTypes.string,//setting模态框的标题
    settingPlaceholder:PropTypes.string,//setting模态框搜索框placeholder
    settingItemSelectedContent:PropTypes.string,//setting模态框已选item显示内容
    settingSavePrompt:PropTypes.string,//setting模态框未选择任何item给用户的提示信息
    settingOkText:PropTypes.string,//设置页面ok按钮文字
    settingCancelText:PropTypes.string,//设置页面cancel按钮文字
    settingSave:PropTypes.func,//设置页面保存的回调函数
    sync:PropTypes.bool.isRequired,//刷新按钮是否可用
    syncTitle:PropTypes.string,//刷新按钮title
    syncClick:PropTypes.func,//刷新按钮点击的回调函数
    download:PropTypes.bool.isRequired,//下载按钮是否可用
    notDownloadColumns:PropTypes.array,//下载时不包含的列
    downloadFileName:PropTypes.string,//下载文件的名称
    delete:PropTypes.bool.isRequired,//删除按钮是否可用
    deleteClick:PropTypes.func,//删除按钮点击的回调函数
    edit:PropTypes.bool.isRequired,//编辑按钮是否可用
    editClick:PropTypes.func,//编辑按钮点击的回调函数
    dynamicButton:PropTypes.string,//添加、删除、修改按钮是否显示，不设置默认显示，不显示则值为hide，
  }).isRequired,
  /**
   * filterOption : array类型，过滤器内所显示的过滤条件,支持4种类型string、enum、date、range，结构如下：<br/>
   *[<br/>
   *&nbsp;{type:"search",name:"search111"},//若搜索框可用，必须传递，目的是与后台search关键字对应 <br/>
   *&nbsp;{type:"string",name:"name",property:"name",label:"名称"},//property为了便于后期联合查询及过滤器的显示内容<br/>
   *&nbsp;{type:"enum",name:"status",property:"status",label:"状态",options:[{label:"全部",value:"all"},{label:"在线",value:"online"},{label:"离线",value:"offline"}]},
   * //注意option顺序，默认option的第一个为选择状态，即与你componentWillMount时向后台发送对应数据对应，property为了便于后期联合查询及过滤器的显示内容<br/>
   *&nbsp;{type:"date",name:"time",property:"etime"placeholder:["开始时间","结束时间"]},//property为了便于后期联合查询及过滤器的显示内容<br/>
   *&nbsp;{type:"range",name:"client",property:"client",label:"终端数量"},//property为了便于后期联合查询及过滤器的显示内容<br/>
   *];<br/>
   *rangePlaceholder : array类型，当过滤器内容包含range类型时，为必须，指range类型最小值和最大值的placeholder，注意顺序，第一个为最小值，第二个为最大值;<br/>
   *stringFilterTitle : string类型，当过滤器内容包含string类型时，为必须，指string类型前面的title内容;<br/>
   *typeFilterTitle : string类型，当过滤器内容包含enum、date、range类型时，为必须，指enum、date、range类型前面的title内容;<br/>
   *注 : 过滤器string类型，返回的为bool值，enum类型返回你传入option对应的value，date类型返回的是一个数组，若未选择区域返回["",""] ，
   *range类型返回一个数组，顺序未按照大小顺序排序，若未选择区域返回["",""] ;<br/>
   **/
  tableFilter:PropTypes.shape({
    filterOption:PropTypes.array.isRequired,
    rangePlaceholder:PropTypes.array,
    stringFilterTitle:PropTypes.string,
    typeFilterTitle:PropTypes.string,
  }),
};

export default TableDragComponent;
