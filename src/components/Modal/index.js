import React,{ PropTypes } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'
import ButtonComponent from '../Button/index';
export class ModalComponent extends React.Component{
  render = () => {
    let test = {...this.props}
    delete test.disabled
    delete test.content
    delete test.dispatch
    delete test.size
    return (
      <Modal {...test} title={this.props.title} width={this.props.size==='large'?'1200px':this.props.size==='middle'?'860px':'520px'} maskClosable={false}
          footer={this.props.footer!==void(0)?this.props.footer:<span>
            <ButtonComponent key="_modal_cancel" onClick={this.props.onCancel} size="large" content={this.props.cancelText||'取消'}/>
            <ButtonComponent key="_modal_ok"  disabled={this.props.disabled} onClick={this.props.onOk} type='primary' size="large" loading={this.props.confirmLoading} content={this.props.okText||'保存'}/>
          </span>}>
        {
          this.props.content
        }
      </Modal>
    )
  }
}
ModalComponent.defaultProps = {
  size:'small',
}
ModalComponent.propTypes = {
  /**
   * 必选
   *
   * 标题
   */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  /**
   * 可选
   *
   * 设置模态框宽度，可选值为 large middle 或者不设
   */
  size: PropTypes.string,
  /**
   * 可选
   *
   * 确定按钮 disabled
   */
  disabled:PropTypes.bool,
  /**
   * 必选
   *
   * 对话框的内容
   */
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
}
export default connect()(ModalComponent)
