/**
 * Created by yin on 2017/11/2.
 */
import React from 'react';
import {Icon} from "antd";
import {CardComponent,DragGridLayout,ItemSelectModal} from '../../../lib/test/index';

export class Demo extends React.Component {

  closeFunction =(key)=> {
    console.log('closeFunction',key)
  }
  detailsFunction=(key)=> {
    console.log('detailsFunction',key)
  }
  render = () => {
    return (
        <CardComponent  id={'test'} title="CardComponent Demo" detailsFunction={this.detailsFunction} closeFunction={this.closeFunction}  >
          CardComponent Demo
        </CardComponent>
    );
  }
}

Demo.propTypes = {

};

export default Demo;
