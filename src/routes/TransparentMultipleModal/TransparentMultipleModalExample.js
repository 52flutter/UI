import React from 'react';
import { connect } from 'dva';
import {Button} from "antd";
import { Modal } from 'antd'
export class TransparentMultipleModalExample extends React.Component {
  componentWillMount=()=>{
    this.setState({
      firstShow:false,
      secondShow:false,
      minHeight:0,
    });
  }
  componentDidMount=()=>{

  }
  componentWillReceiveProps=(nextProps)=>{

  }
  componentWillUpdate=(nextProps,nextState)=>{

  }
  componentDidUpdate=(prevProps,prevState)=>{
    if(this.state.firstShow&&!prevState.firstShow){
      let container=this.refs.modalContainer;
      let height=container.offsetHeight;
      this.setState({minHeight:height+"px"});
    }
  }
  componentWillUnmount=()=>{

  }
  showModal=()=>{
    this.setState({firstShow:true});
  }
  handleFirstOk=()=>{
    this.setState({secondShow:true});
  }
  handleFirstCancel=()=>{
    this.setState({firstShow:false});
  }
  handleSecondOk=()=>{
    this.setState({secondShow:false});
  }
  handleSecondCancel=()=>{
    this.setState({secondShow:false});
  }
  hide=()=>{
    this.setState({firstShow:false});
    this.setState({minHeight:"0px"});
  }
  render = () => {
    return (
      <div style={{padding:"20px"}} >
        <div style={{width:"600px",border:"1px solid #ccc",position:"relative",minHeight:this.state.minHeight}}>
          <Button onClick={this.showModal}>一个背景透明模态框</Button>
          <Button onClick={this.showModal}>一个背景透明模态框</Button>
          <Button onClick={this.showModal}>一个背景透明模态框</Button>
          <Button onClick={this.showModal}>一个背景透明模态框</Button>
          <Button onClick={this.showModal}>一个背景透明模态框</Button>
          {
            this.state.firstShow ?
              <div className="csp-modal-form" onClick={this.hide}>
                <div ref="modalContainer">
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>
                <p>11111</p>

                </div>
              </div> : null
          }
        </div>
        {/*
         <Modal
         title="First Modal"
         className="right-modal"
         width="600px"
         style={{ top: 100,float: "right",paddingRight:"24px"}}
         visible={this.state.firstShow}
         onOk={this.handleFirstOk}
         onCancel={this.handleFirstCancel}
         maskClosable={false}
         mask={false}
         >
         <p>First Modal...</p>
         <p>First Modal...</p>
         <p>First Modals...</p>
         <p>First Modals...</p>
         <p>First Modals...</p>
         <p>First Modals...</p>
         <p>First Modals...</p>
         <p>First Modals...</p>
         <p>First Modals...</p>
         <p>First Modals...</p>
         <p>First Modals...</p>
         <p>First Modals...</p>
         </Modal>
        */}
      </div>
    );
  }
}

TransparentMultipleModalExample.propTypes = {

};

export default connect()(TransparentMultipleModalExample);

