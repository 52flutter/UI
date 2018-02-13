import React from 'react';
import { connect } from 'dva';
import Redemo from 'redemo';
import ButtonComponent from '../../components/Button/index';
// import {ButtonComponent} from '../../../lib/test/index';

const code = require("raw!../ButtonExample/ButtonExample");
const docgen = require("!!docgen!../../components/Button/index");
const doc = `Button组件`
export class ButtonExample extends React.Component {
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
        <ButtonComponent type='primary' size="large" content={'登录'}/>
        <ButtonComponent type='primary' size="default" content={'添加'}/>
        <ButtonComponent type='primary' size="small" content={'添加'}/>
        <ButtonComponent type='danger' size="large" content={'按钮2'}/>
        <ButtonComponent type='skip' size="large" content={'按钮3'}/>
        <ButtonComponent type='default' size="large" content={'按钮4'}/>
        <ButtonComponent type='primary' size="large" content={'按钮5'} disabled/>
      </div>
    )
  }
}
ButtonExample.propTypes = {};
export default connect()(ButtonExample);
