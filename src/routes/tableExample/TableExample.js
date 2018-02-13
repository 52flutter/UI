import React from 'react';
import { connect } from 'dva';
import {Button} from "antd";
// import {TableDragComponent} from "../../../lib/test/index";
import TableDragComponent from "../../components/TableDrag/index";
import Redemo from 'redemo';
const code = require("raw!./TableDemo");
const docgen = require("!!docgen!../../components/TableDrag/index.js");
const doc = `此组件为对ant-table的进一步封装，可拖拽table的表头，进行自由对table的表头排列,table的一些使用参考ant-table。为了便于维护考虑及便于区分，
此组件分四个对象table（存储table相关设置）、moreButton（table下more按钮相关设置）、buttonGroup（table上一些功能按钮配置）、tableFilter（table过滤器相关配置）`;

export class TableExample extends React.Component {
  componentWillMount=()=>{
    this.setState({
      tableLoading:false,
      pageSize:"30",
      selectedRowKeys:[],
      dataSource: [
        {
          key: "854689473332744193",
          name: "0000001111111111111111111111111111111",
          mac: "34:E7:0B:01:3E:90",
          version: "3.0.0.119",
          model: "AP106",
          status: "enable",
          IP: "192.168.2.111",
          serialNumber: "WKS164301203",
          isAlive: true,
          client: 0,
          site: "99999999999999999999999999",
          group: "ygiefenzumingchengruhezayangad",
          corp: '的回复,收到吧',
          time:"2017-11-14",
          etime:"2017-11-11",
        },
        {
          key: "854689473332744191",
          name: "555555555555555555555555500",
          mac: "34:E7:0B:01:3E:90",
          version: "3.0.0.119",
          model: "AP106",
          status: "disable",
          IP: "192.168.2.111",
          serialNumber: "WKS164301203",
          isAlive: false,
          client: 0,
          site: "ygiefenzumingchengruhezayangad",
          group: "000014545440000",
          corp: "但是减肥骄傲\n的索,,,,,,,拉卡",
          time:"2017-11-15",
          etime:"2017-11-11",
        },
      ],
    });
  }
  componentDidMount=()=>{

  }
  componentWillReceiveProps=(nextProps)=>{

  }
  componentWillUpdate=(nextProps,nextState)=>{

  }
  componentDidUpdate=(nextProps,nextState)=>{

  }
  componentWillUnmount=()=>{

  }
  getColumns=()=>{
    let columns=[
      {
        dataIndex: 'name',
        key: 'name',
        title:'名称',
        textContent:(text,record)=>{
          return text;
        }
      },
      {
        dataIndex: 'site',
        key: 'site',
        title: '场所',
      },
      {
        dataIndex: 'group',
        key: 'group',
        title: '分组',
      },
      {
        dataIndex: 'corp',
        key: 'corp',
        title: '集团',
      },
      {
        dataIndex: 'mac',
        key: 'mac',
        title:'MAC',
      },
      {
        dataIndex: 'version',
        key: 'version',
        title: '版本',
      },
      {
        dataIndex: 'model',
        key: 'model',
        title: '型号',
      },
      {
        dataIndex: 'status',
        key: 'status',
        title: 'License',
        textContent:(text,record)=>{
          return text==="enable"?"启用":"禁用"
        },
        render:(text,record)=>{
          return text==="enable"?"启用":"禁用"
        },
      },
      {
        dataIndex: 'IP',
        key: 'IP',
        title: 'IP',
      },
      {
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        title: '序列号',
      },
      {
        dataIndex: 'isAlive',
        key: 'isAlive',
        title: '状态',
        textContent:(text,record)=>{
          return text?"在线":"离线"
        },
        render:(text,record)=>{
          return text?"在线":"离线"
        }
      },
      {
        dataIndex: 'client',
        key: 'client',
        title: '终端数量',
      },
      {
        dataIndex: 'time',
        key: 'time',
        title: '时间',
      },
      {
        dataIndex: 'etime',
        key: 'etime',
        title: '时间区间',
      },
      {
        dataIndex: 'operate',
        key: 'operate',
        title: '操作',
      },
    ];
    return columns;
  }
  getSelectedAP=(selectedRowKeys, selectedRows)=>{
    this.setState({selectedRowKeys:selectedRowKeys});
  }
  nextClick=(filter,hasSearch)=>{
    console.log("nextClick",filter);
    let dataSource= JSON.parse(JSON.stringify(this.state.dataSource));
    let that=this;
    dataSource.push(
      {
        key: new Date().getTime(),
        name: "水果",
        mac: "34:E7:0B:01:3E:90",
        version: "3.0.0.119",
        model: "AP106",
        status: "enable",
        IP: "192.168.2.111",
        serialNumber: "WKS164301203",
        isAlive: true,
        client: 0,
        site: "ygiefenzumingchengruhezayangad",
        group: "ygiefenzumingchengruhezayangad",
        corp: "的回复收到吧",
      }
    );
    setTimeout(function(){
      that.setState({dataSource:dataSource});
    },1000)

  }
  changeTitleOrder=(order)=>{
    console.log("order",order);
  }
  searchChange=(value)=>{
    console.log("search",value);
    this.setState({tableLoading:true});
    let that=this;
    setTimeout(function(){
      that.setState({tableLoading:false});
    },3000);
  }
  addClick=()=>{
    console.log("addClick");
  }
  filterClick=()=>{
    console.log("fliter");
  }
  settingSave=(selectedItems)=>{
    console.log("setting",selectedItems);
  }
  syncClick=(filter)=>{
    console.log("syncClick",filter);
  }
  deleteClick=(filter)=>{
    console.log("deleteClick",filter);
  }
  pageSizeChange=(value,filter,hasSearch)=>{
    console.log("pageSize",value);
    let dataSource= JSON.parse(JSON.stringify(this.state.dataSource));
    let that=this;
    dataSource.push(
      {
        key: new Date().getTime(),
        name: "1111111111111111111111",
        mac: "34:E7:0B:01:3E:90",
        version: "3.0.0.119",
        model: "AP106",
        status: "enable",
        IP: "192.168.2.111",
        serialNumber: "WKS164301203",
        isAlive: true,
        client: 0,
        site: "ygiefenzumingchengruhezayangad",
        group: "ygiefenzumingchengruhezayangad",
        corp: "的回复收到吧",
      }
    );
    setTimeout(function(){
      that.setState({dataSource:dataSource});
    },1000)
    this.setState({pageSize:value});
  }
  editClick=()=>{
    console.log("editClick");
  }
  setFilterValues=(values)=>{
    console.log("传递到父组件的values",values);
  }
  render = () => {
    const rowSelection = {onChange:this.getSelectedAP,selectedRowKeys: this.state.selectedRowKeys,hideDefaultSelections:true};
    return (<div style={{padding:"20px"}}>
        <Redemo
          style={{width: '100%',marginBottom:"12px"}}
          title="tableComponent"
          docgen={docgen}
          doc={doc}
          code={code}
        >ant-table-draggable</Redemo>

      <TableDragComponent table={{
        id:"csp-table-demo",
        rowSelection: rowSelection,
        scroll: {x: 1360},
        columns: this.getColumns(),
        pagination:false,
        // pagination:{showSizeChanger:true,total:500,pageSize:30,pageSizeOptions:["30","50","70","90"]},
        order: ['name','site','group','corp','mac', 'version','model', 'status', 'IP', 'serialNumber','isAlive','client','time','etime','operate',],
        dataSource:this.state.dataSource,
        changeTitleOrder:this.changeTitleOrder,
        loading:this.state.tableLoading,
      }}
      moreButton={{
        show:true,
        content:"更多",
        moreClick:this.nextClick,
        pageSize:this.state.pageSize,
        pageSizeChange:this.pageSizeChange,
        pageSizeContent:"page",
        pageSizeList:["30","40","50","100"],
        total:10,
      }}
      buttonGroup={{
        search:true,
        searchTitle:"搜索",
        searchChange:this.searchChange,
        searchPlaceholder:"您未选择搜索包含",
        add:true,
        addTitle:"添加",
        addClick:this.addClick,
        filter:true,
        filterTitle:"过滤器",
        filterQuery:"查询",
        filterEmptyContent:"您所选的table的title没有可用的筛选条件",
        setFilterValues:this.setFilterValues,
        resetTitle:"重置",
        setting:true,
        settingTitle:"设置",
        settingAddAllItemTitle:"添加所有",
        settingAddSelectedItemTitle:"添加所选",
        settingRemoveAllItemTitle:"移除所有",
        settingRemoveSelectedItemTitle:"移除所选",
        settingModalTitle:"选择显示列",
        settingPlaceholder:"搜索",
        settingItemSelectedContent:"item selected 111",
        settingOkText:"保存",
        settingCancelText:"取消",
        settingSavePrompt:"请至少选择一个",
        settingSave:this.settingSave,
        sync:true,
        syncTitle:"刷新",
        syncClick:this.syncClick,
        download:true,
        downloadTitle:"下载",
        notDownloadColumns:["operate"],
        downloadFileName:"csp-table",
        delete:true,
        deleteTitle:"删除",
        deleteClick:this.deleteClick,
        edit:true,
        editTitle:"编辑",
        editClick:this.editClick,
        dynamicButton:"show",
      }}
      tableFilter={{
        filterOption:[
          {type:"search",name:"search111"},//若search可用，必须传递
          {type:"string",name:"name",property:"name",label:"名称"},
          {type:"string",name:"site",property:"site",label:"场所"},
          {type:"string",name:"corp",property:"corp",label:"集团"},
          {type:"string",name:"group",property:"group",label:"分组"},
          {type:"string",name:"mac",property:"mac",label:"MAC"},
          {type:"string",name:"version",property:"version",label:"版本"},
          {type:"string",name:"model",property:"model",label:"型号"},
          {type:"string",name:"IP",property:"IP",label:"IP"},
          {type:"string",name:"serialNumber",property:"serialNumber",label:"序列号"},
          {type:"enum",name:"status",property:"status",label:"License",options:[{label:"全部",value:"all"},{label:"启用",value:"enable"},{label:"禁用",value:"disable"}]},
          {type:"enum",name:"isAlive",property:"isAlive",label:"状态",options:[{label:"全部",value:"all"},{label:"在线",value:"online"},{label:"离线",value:"offline"}]},
          {type:"enum",name:"etime",property:"etime",label:"时间区间",options:[{label:"全部",value:"0"},{label:"一天",value:"1"},{label:"最近三小时",value:"2"}]},
          {type:"date",name:"time",property:"time",label:"时间",placeholder:["开始时间呀呀呀呀","结束时间呀呀呀"]},
          {type:"range",name:"client",property:"client",label:"终端数量"},
        ],
        stringFilterTitle:"搜索包含1",
        typeFilterTitle:"条件筛选1",
        rangePlaceholder:["最小值","最大值"],
      }}>
        <Button type="primary" size="large">设置场所</Button>
        {/*<Button  size="large" type="primary">启用</Button>*/}
        {/*<Button  size="large" type="primary">禁用</Button>*/}
      </TableDragComponent>
      </div>
    );
  }
}

TableExample.propTypes = {

};

export default connect()(TableExample);
