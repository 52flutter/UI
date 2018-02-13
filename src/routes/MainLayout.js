/**
 * Created by yin on 2017/11/3.
 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import { Link } from 'dva/router';
const mapStateToProps = (state) => ({
  state,
});

export class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render = () => {
    return (
      <Layout style={{height: '100%'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to={'card'}>Card</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={'itemSelectModal'}>ItemSelectModal</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={'dragGridLayout'}>DragGridLayout</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={'table'}>Table</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <span>nav 3</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to={'modal'}>Modal</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to={'map'}>Map</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to={'button'}>Button</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to={'rightBar'}>RightBar</Link>
            </Menu.Item>
            {/*
            <Menu.Item key="9">
              <Link to={'transparentMultipleModal'}>TransparentMultipleModal</Link>
            </Menu.Item>
             */}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Layout>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 400 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

MainLayout.propTypes = {

};

export default connect(mapStateToProps, {

})(MainLayout);
