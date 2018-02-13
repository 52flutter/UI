/**
 * Created by yin on 2018/1/9.
 */
import React from 'react';
import { connect } from 'dva';
import {RightBar} from '../../../lib/test/index';
import {Card,Button,Layout,Row,Collapse} from "antd";
const Panel = Collapse.Panel;
//import {Resizable, ResizableBox} from "react-resizable";
//import Resizable from "re-resizable";
import Redemo from 'redemo';
import Dock from 'react-dock';
const code = require("raw!./RightBarExample");
const docgen = require("!!docgen!../../components/RightBar/index");
const doc = `RightBar组件`
//import RightBar from '../../components/RightBar/index';
export class RightBarExample extends React.Component {

  state = {width: 200, height: 200,isVisible: false,size: 0.3};

  onClick = () => {
    this.setState({width: 200, height: 200});
  };

  onResize = (event, {element, size}) => {
    this.setState({width: size.width, height: size.height});
  };
  onSizeChange =(size)=> {
    console.log('onSizeChange',size)
    if (size < 0.5 && size >0.3 ) {
      this.setState({size: size});
    }
  }
  onChangeDock=()=> {
    this.setState({ isVisible: !this.state.isVisible })
  }

  render = () => {
    let test = 0.98
    if (this.state.isVisible) {
      test = 0.98- this.state.size
    }
    return (
      <Layout style={{background: '#fff'}}>
        <Redemo
          style={{width: '100%'}}
          title="RightBarComponent"
          docgen={docgen}
          doc={doc}
          code={code}
        >
          <a>Test</a>
        </Redemo>
        <div style={{position: 'relative'}}>
          <RightBar
            leftIsVisible={true}
            leftSize={test}
            rightIsVisible={this.state.isVisible}
            rightSize={this.state.size}
            rightOnSizeChange={this.onSizeChange}
          >
            <div key="left">
              <Collapse accordion>
                <Panel header="This is panel header 1" key="1">
                  <p>888888888</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                  <p>asdasdasdasdasdsadas</p>
                </Panel>
              </Collapse>
              <h1>
                <div onClick={this.onChangeDock}>X</div>
              </h1>
            </div>

            <div key="right">
              <div style={{height: '600px',background: 'red'}}>
                11111111111111111111111
              </div>
              <h1>
                asdasdsa
              </h1>
              <Collapse accordion>
                <Panel header="This is panel header 1" key="1">
                  <p>888888888</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                  <p>asdasdasdasdasdsadas</p>
                  <div style={{height: '600px',background: 'red'}}>
                    11111111111111111111111
                  </div>
                </Panel>
              </Collapse>
            </div>
          </RightBar>
        </div>
      </Layout>
    );
  }
}

RightBarExample.propTypes = {

};

export default connect()(RightBarExample);
