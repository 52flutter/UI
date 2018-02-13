/**
 * Created by yin on 2017/11/9.
 */
import React from 'react';
import { connect } from 'dva';
import {CardComponent,DragGridLayout,ItemSelectModal} from '../../../lib/test/index';
import {Card,Button,Layout,Row} from "antd";
import Demo from './Demo';

import Redemo from 'redemo';

//const code = require("file!./Demo.js");
const code =require("raw!./Demo.js");

const docgen = require("!!docgen!../../components/ItemSelectModal/index.js");
const doc ='为这个demo做一些说明，  支持*markdown*'





export class IndexPage extends React.Component {


  closeFunction =(key)=> {
    //console.log('closeFunction',key)
    console.log('cardArr',cardArr)
    this.setState({cardArr: cardArr});
  }
  detailsFunction=(key)=> {
    console.log('detailsFunction',key)
  }
  render = () => {
    return (
      <div style={{padding: '18px'}}>
        <Redemo
          style={{width: '100%'}}
          docgen={docgen}
          doc={doc}
        >
          <a>ItemSelectModal</a>
        </Redemo>

        <Demo />
      </div>
    );
  }
}

IndexPage.propTypes = {

};

export default connect()(IndexPage);
