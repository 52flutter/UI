/**
 * Created by yin on 2017/10/9.
 */
import React from 'react';
import {Card,Icon} from "antd";
import PropTypes from 'prop-types';
/**
 * 基于antd基础之上二次封装Card
 */
class CardComponent extends React.Component {
  render = () => {
    return (
      <Card style={{...this.props.style}} title={this.props.title}
            extra={this.props.closeButton ? <Icon onClick={()=>this.props.closeFunction(this.props.id)} type="close" className="pointer"/> : ''}>
        <div>
          {this.props.children}
        </div>
        {
          this.props.detailsButton ?   <div className="more-card">
            <a onClick={()=>this.props.detailsFunction(this.props.id)}>{this.props.detailsText}</a>
          </div> : ''
        }
      </Card>
    );
  }
}

CardComponent.defaultProps = {
  closeButton: true,
  detailsText: <Icon type="double-right" />,
  detailsButton: true
};
CardComponent.propTypes = {
  /**
   * 必选
   *
   * Card的唯一标识
   */
  id: PropTypes.string.isRequired,
  /**
   * 可选
   *
   * 是否显示关闭按钮
   */
  closeButton: PropTypes.bool,
  /**
   * 可选
   *
   * 点击关闭按钮回调函数
   * 回调函数可接收id
   */
  closeFunction: PropTypes.func,
  /**
   * 可选
   *
   * 点击详情按钮回调函数
   * 回调函数可接收id
   */
  detailsFunction: PropTypes.func,
  /**
   * 可选
   *
   * 标题
   */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  /**
   * 可选
   *
   * 右下角详情文本
   * （注：如果传了该属性，对应detailsFunction必须也一同传入）
   */
  detailsText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /**
   * 可选
   *
   * 自定义样式
   */
  style: PropTypes.object
};

export default CardComponent;
