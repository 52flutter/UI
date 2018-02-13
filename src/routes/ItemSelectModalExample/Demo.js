/**
 * Created by yin on 2017/11/2.
 */
import React from 'react';
import {ItemSelectModal} from '../../../lib/test/index';
//import ItemSelectModal from '../../components/ItemSelectModal/index';
import {Card,Button,Layout,Row} from "antd";
export class Demo extends React.Component {


  componentWillMount=()=>{
    let allItems = [
      {key:"grade",title: 'grade'},{key:"health",title: 'health'},
      {key:"model",title: 'model'},{key:"online",title: 'online'},
      {key:"load",title: 'load'},{key:"unhealthyAP",title: 'unhealthyAP'},
      {key:"group",title: 'group'}
    ]
    let selectedItems = [
      {key:"grade",title: 'grade'},{key:"health",title: 'health'},
      {key:"model",title: 'model'},{key:"online",title: 'online'},
      {key:"load",title: 'load'},{key:"unhealthyAP",title: 'unhealthyAP'},
      {key:"group",title: 'group'}
    ]
    this.setState({
      allItems: allItems,
      selectedItems: selectedItems,
      settingModal:false,
    });
  }

  onSaveItems =(items)=> {
    console.log('onSaveItems',items)
    let arr = []
    for (let j=0;j < items.length; j++) {
      arr.push(items[j].key)
    }
    this.changeSettingModal(false);
  }
  changeSettingModal=(bool)=>{
    this.setState({settingModal:bool});
  }
  render = () => {
    return (
        <div>
          <Row  style={{marginTop: '12px'}} type="flex" justify="end">
            <Button icon="setting" onClick={()=>this.changeSettingModal(true)}>自定义</Button>
            {
              this.state.settingModal ?
                <ItemSelectModal selectedItems={this.state.selectedItems}
                                 allItems={this.state.allItems} onSave={this.onSaveItems}
                                 visible={this.state.settingModal} hideModal={()=>this.changeSettingModal(false)}/> : null
            }

          </Row>
        </div>
    );
  }
}

Demo.propTypes = {

};

export default Demo;
