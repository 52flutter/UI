import React from 'react';
import {TableDragComponent} from "../../../lib/test/index";
// import TableDragComponent from "../../components/TableDrag/index";

export class TableExample extends React.Component {
  componentWillMount=()=>{
    this.setState({
      selectedRowKeys:[],
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
  nextClick=()=>{
    console.log("nextClick");
  }
  changeTitleOrder=(order)=>{
    console.log("order",order);
  }
  searchChange=(value)=>{
    console.log("search",value);
  }
  addClick=()=>{
    console.log("addClick");
  }
  filterClick=()=>{
    console.log("fliter");
  }
  settingSave=()=>{
    console.log("setting");
  }
  syncClick=()=>{
    console.log("syncClick");
  }
  deleteClick=()=>{
    console.log("deleteClick");
  }
  editClick=()=>{
    console.log("editClick");
  }
  render = () => {
    const rowSelection = {onChange:this.getSelectedAP,selectedRowKeys: this.state.selectedRowKeys,hideDefaultSelections:true};
    let dataSource = [
      {
        key: "854689473332744193",
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
        corp: "的回复,收到吧",
      },
      {
        key: "854689473332744191",
        name: "一个ap名字是啥",
        mac: "34:E7:0B:01:3E:90",
        version: "3.0.0.119",
        model: "AP106",
        status: "disable",
        IP: "192.168.2.111",
        serialNumber: "WKS164301203",
        isAlive: false,
        client: 0,
        site: "ygiefenzumingchengruhezayangad",
        group: "ygiefenzumingchengruhezayangad",
        corp: "但是减肥骄傲的索拉卡",
      },
    ];
    return (<div style={{padding:"20px"}}>
        <TableDragComponent table={{
          id:"csp-table-demo",
          rowSelection: rowSelection,
          scroll: {x: 1360},
          columns: this.getColumns(),
          pagination:false,
          order: ['name','site','group','corp','mac', 'version','model', 'status', 'IP', 'serialNumber','isAlive','client','operate',],
          dataSource:this.state.dataSource,
          changeTitleOrder:this.changeTitleOrder,
        }}
                            moreButton={{
                              show:true,
                              content:"更多",
                              moreClick:this.nextClick,
                              total:20
                            }}
                            buttonGroup={{
                              search:true,
                              searchChange:this.searchChange,
                              searchPlaceholder:"search",
                              add:true,
                              addClick:this.addClick,
                              filter:true,
                              setting:true,
                              settingTitle:"选择显示列",
                              settingPlaceholder:"搜索",
                              settingItemSelectedContent:"item selected 111",
                              settingOkText:"保存",
                              settingCancelText:"取消",
                              settingSave:this.settingSave,
                              sync:true,
                              download:true,
                              notDownloadColumns:["name","operate"],
                              downloadFileName:"csp-table",
                              delete:true,
                              deleteClick:this.deleteClick,
                              edit:true,
                              editClick:this.editClick
                            }}
                            tableFilter={{
                              filterOption:[
                                {type:"search",name:"search111"},//若search可用，必须传递
                                {type:"string",name:"name",label:"名称"},
                                {type:"string",name:"site",label:"场所"},
                                {type:"string",name:"corp",label:"集团"},
                                {type:"enum",name:"status",label:"状态",options:[{label:"全部",value:"all"},{label:"在线",value:"online"},{label:"离线",value:"offline"}]},
                                {type:"enum",name:"license",label:"License",options:[{label:"全部",value:"all"},{label:"启用启用启用启用启用启用",value:"enable"},{label:"禁用禁用禁用禁用禁用",value:"disable"}]},
                                {type:"date",name:"time",label:"时间"},
                                {type:"range",name:"client",label:"终端数量"},
                                {type:"range",name:"power",label:"功率"},
                                {type:"range",name:"channel",label:"信道"},
                                {type:"range",name:"attack",label:"攻击次数"},
                              ],
                              datePlaceholder:["开始时间1","结束时间1"],
                              stringFilterTitle:"搜索包含1",
                              typeFilterTitle:"条件筛选1"
                            }}>
          <Button type="primary" size="large">设置场所</Button><Button  size="large" type="primary">启用</Button><Button  size="large" type="primary">禁用</Button>
        </TableDragComponent>
      </div>
    );
  }
}

TableExample.propTypes = {

};

export default TableExample;
