import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage';

//import CardComponent from '../../components/Card/index';
//import DragGridLayout from '../../components/DragGridLayout/index';
//import ItemSelectModal from '../../components/ItemSelectModal/index';
import {CardComponent,DragGridLayout,ItemSelectModal} from '../../../lib/test/index';
import {Card,Button,Layout,Row,Icon} from "antd";
import ReactGridLayout from 'react-grid-layout';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { Header, Content, Footer, Sider } = Layout;
const layoutsCard = {
  grade: {
    lg:1,
    md:1,
    sm:1,
    xs:1,
    xxs:1,
    static: true
  },
  health: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  model: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  online: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  load: {
    lg: 2,
    md: 2,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  unhealthyAP: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  group: {
    lg: 2,
    md: 2,
    sm: 2,
    xs: 2,
    xxs: 2
  },
  wlan: {
    lg: 2,
    md: 2,
    sm: 2,
    xs: 2,
    xxs: 2
  },
  clientHealthy: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  clientBand: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  clientType: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  clientOperate: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  intrusiveAP: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  intrusiveClient: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
    xxs: 1
  },
  bandwidth: {
    lg: 4,
    md: 3,
    sm: 2,
    xs: 2,
    xxs: 2
  },
  clientNum: {
    lg: 4,
    md: 3,
    sm: 2,
    xs: 2,
    xxs: 2
  }
}
const layoutGrid= {
  lg: 4, md: 3, sm: 2, xs: 2, xxs: 2
}
const  layoutBreakpoints ={lg: 1600, md: 1200, sm: 992, xs: 768, xxs: 0}
const layoutRowHeight =320



import Redemo from 'redemo';

//const code = require("raw!./Demo.js");
const docgen = require("!!docgen!../../components/DragGridLayout/index.js");
const doc = `为这个demo做一些说明，支持*markdown*`





export class IndexPage extends React.Component {


  componentWillMount=()=>{
    let cardArr = ['grade',"health",'group', "model", "online", "load",'unhealthyAP']
    let allItems = [
      {key:"grade",title: 'grade',static: true},{key:"health",title: 'health'},
      {key:"model",title: 'model'},{key:"online",title: 'online'},
      {key:"load",title: 'load'},{key:"unhealthyAP",title: 'unhealthyAP'},
      {key:"group",title: 'group'}
    ]
    let selectedItems = [
      {key:"grade",title: 'grade',static: true},{key:"health",title: 'health'},
      {key:"model",title: 'model'},{key:"online",title: 'online'},
      {key:"load",title: 'load'},{key:"unhealthyAP",title: 'unhealthyAP'},
      {key:"group",title: 'group'}
    ]
    this.setState({
      cardArr: cardArr,
      allItems: allItems,
      selectedItems: selectedItems,
      settingModal:false,
    });
  }
  closeFunction =(key)=> {
    let testArr = []
    let cardArr = this.state.cardArr.concat()
    cardArr.splice(cardArr.indexOf(key),1)
    var selectedItems = this.state.selectedItems
    var selectedItemsNew = []
     cardArr.map(function (item) {
      for (let i=0;i<selectedItems.length;i++) {
        if (selectedItems[i].key === item) {
          selectedItemsNew.push(selectedItems[i])
        }
      }
    });

    this.setState({cardArr: cardArr,selectedItems: selectedItemsNew});
  }
  detailsFunction=(key)=> {
    console.log('detailsFunction',key)
  }
  dragCallback =(items)=> {
    this.setState({
      cardArr: items
    });
  }
  onSaveItems =(items)=> {
    let cardArr =this.state.cardArr.concat()

    let sortCard1 = []
    let sortCard2 = []
    let selectedSort1 = []
    let selectedSort2 = []
    for (let i=0;i<items.length;i++) {
      let falg = false
      for (let j=0;j<cardArr.length;j++) {
        if (items[i].key === cardArr[j]) {
          falg = true
          break
        }
      }
      if (falg) {
        sortCard1.push(items[i].key)
        selectedSort1.push(items[i])
      } else {
        sortCard2.push(items[i].key)
        selectedSort2.push(items[i])
      }
    }
    let cardArrNew =sortCard1.concat(sortCard2)
    let selectedItemsNew = selectedSort1.concat(selectedSort2)

    this.setState({cardArr: cardArrNew,selectedItems: selectedItemsNew});

    this.changeSettingModal(false);
  }
  changeSettingModal=(bool)=>{
    this.setState({settingModal:bool});
  }
  render = () => {
    return (
      <div style={{padding: '26px'}}>

        <Redemo
          style={{width: '100%'}}
          title="CardComponent"
          docgen={docgen}
          doc={doc}
        >
          <a>DragGridLayout</a>
        </Redemo>
        <Row  style={{marginTop: '12px'}} type="flex" justify="end">
          <Button icon="setting" onClick={()=>this.changeSettingModal(true)}>自定义</Button>
          {
            this.state.settingModal ?
              <ItemSelectModal selectedItems={this.state.selectedItems} title="显示" placeholder="搜索" itemSelectedContent="item selected"
                               allItems={this.state.allItems} onSave={this.onSaveItems}
                               visible={this.state.settingModal} hideModal={()=>this.changeSettingModal(false)}/> : null
          }

        </Row>
        <DragGridLayout items={this.state.cardArr}
                            dragCallback={this.dragCallback}
                            layoutsCard={layoutsCard}>
          <CardComponent  id={'grade'} key={'grade'} title="Card grade"  detailsFunction={this.detailsFunction} closeFunction={this.closeFunction}  >
            grade
          </CardComponent>

          {/*健康度*/}
            <CardComponent id={'health'} key={'health'} title="Card health"  detailsFunction={this.detailsFunction} closeFunction={this.closeFunction}  >
              health
            </CardComponent>
          {/*AP类型*/}

          <CardComponent  id={'model'} key={'model'} title="Card model"  detailsFunction={this.detailsFunction} closeFunction={this.closeFunction} >
            model
          </CardComponent>

          <CardComponent  id={'online'} key={'online'} title="Card online"  detailsFunction={this.detailsFunction} closeFunction={this.closeFunction}  >
            online
          </CardComponent>

          <CardComponent  id={'load'} key={'load'} title="Card load"  detailsFunction={this.detailsFunction} closeFunction={this.closeFunction}  >
            load
          </CardComponent>

          <CardComponent  id={'unhealthyAP'} key={'unhealthyAP'} title="Card unhealthyAP"  detailsFunction={this.detailsFunction} closeFunction={this.closeFunction} >
            unhealthyAP
          </CardComponent>

          <CardComponent
            id={'group'} key={'group'} title="Card group" detailsFunction={this.detailsFunction} closeFunction={this.closeFunction}>
            group
          </CardComponent>

        </DragGridLayout>
      </div>
    );
  }
}

IndexPage.propTypes = {

};

export default connect()(IndexPage);
