import React from 'react';
import { connect } from 'dva';
import ModalComponent from '../../components/Modal/index';
import ButtonComponent from '../../components/Button/index';
// import {ModalComponent,ButtonComponent} from '../../../lib/test/index';
import Redemo from 'redemo';

const code = require("raw!./ModalExample");
const docgen = require("!!docgen!../../components/Modal/index");
const doc = `Modal组件API及damo演示 该组件基于antd封装 凡未出现的字段可根据antd设置`
export class ModalPage extends React.Component {
  componentWillMount = () => {this.setState({show1:false,show2:false,show3:false})}
  closeModal1 = () => {this.setState({show1:false})}
  closeModal2 = () => {this.setState({show2:false})}
  closeModal3 = () => {this.setState({show3:false})}
  showModal1 = () => {this.setState({show1:true})}
  showModal2 = () => {this.setState({show2:true})}
  showModal3 = () => {this.setState({show3:true})}
  render = () => {
    return (
      <div>
        <Redemo
          style={{width: '100%'}}
          title="ModalComponent"
          docgen={docgen}
          doc={doc}
          code={code}
        >
          <a>Test</a>
        </Redemo>
        <ButtonComponent type="primary" onClick={this.showModal1} content='Modal1'/>
        <ButtonComponent type="primary" onClick={this.showModal2} content='Modal2'/>
        <ButtonComponent type="primary" onClick={this.showModal3} content='Modal3'/>
        <ModalComponent title='Modal1' onCancel={this.closeModal1} onOk={this.closeModal1} visible={this.state.show1} content={'标准样式'}/>
        <ModalComponent title='Modal2' onCancel={this.closeModal2} onOk={this.closeModal2} visible={this.state.show2} content={'模态框大小'} size='large'/>
        <ModalComponent title='Modal3' onCancel={this.closeModal3} onOk={this.closeModal3} visible={this.state.show3} content={'确认按钮disabled'} disabled size='middle'/>
      </div>
    )
  }
}
ModalPage.propTypes = {};
export default connect()(ModalPage);
