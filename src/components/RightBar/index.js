/**
 * Created by yin on 2018/1/10.
 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Dock from 'react-dock';

export class RightBar extends React.Component {

  render = () => {
    let that = this
    return (
      <div>
        {(this.props.children.map((itm, ind) => {
            if (itm.key === 'left') {
              return ( <Dock  key={ind} dockStyle={{float: 'left'}} dimMode="none" position='left' size={this.props.leftSize} isVisible={this.props.leftIsVisible}>
                  {itm}
              </Dock>)
            } else if (itm.key === 'right') {
              return that.props.rightIsVisible ? ( <Dock key={ind} dimMode="none" position={'right'}
                     dockStyle={{float: 'right'}} size={this.props.rightSize} isVisible={this.props.rightIsVisible} onSizeChange={this.props.rightOnSizeChange}>
                {itm}
              </Dock>) : ''
            }
          })
        )}
      </div>
    );
  }
}
RightBar.defaultProps = {
  leftIsVisible: true,
  leftSize: 1,
}
RightBar.propTypes = {
  /**
   * 可选
   *
   * 左侧区域是否显示
   */
  leftIsVisible: PropTypes.bool,
  /**
   * 可选
   *
   * 左侧区域占屏幕的百分比
   */
  leftSize: PropTypes.number,
  /**
   * 可选
   *
   * 右侧区域是否显示
   */
  rightIsVisible: PropTypes.bool,
  /**
   * 可选
   *
   * 右侧区域占屏幕的百分比
   */
  rightSize: PropTypes.number,
  /**
   * 可选
   *
   * 右侧区域拖动改变左右两侧的大小占比
   */
  rightOnSizeChange:PropTypes.func
};

export default connect()(RightBar);
