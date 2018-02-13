import React,{ PropTypes } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
export class ButtonComponent extends React.Component{
  render = () => {
    let test = {...this.props}
    delete test.type
    delete test.content
    delete test.dispatch
    return (
      <Button {...test} className={this.props.type==='primary'?'ant-btn-primary':this.props.type==='danger'?'ant-btn-danger':this.props.type==='skip'?'ant-btn-skip':''}>
        {this.props.content}
      </Button>
    )
  }
}
ButtonComponent.defaultProps = {}
ButtonComponent.propTypes = {
  /**
   * 可选
   *l
   * 设置按钮样式，可选值为 primary default danger skip 或者不设
   */
  type: PropTypes.string,
  /**
   * 必选
   *
   * 按钮的文字
   */
  content: PropTypes.string,
}
export default connect()(ButtonComponent)
