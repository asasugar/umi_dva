import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Avatar } from 'antd';
import { getLocalStorage } from '@/utils/localStorage';
import router from 'umi/router';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './b.less';

const { Header, Content, Footer } = Layout;
const menu = (
  <Menu>
    <Menu.Item onClick={() => router.push('/login')}>SIGN OUT</Menu.Item>
  </Menu>
);

class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({
      collapsed,
    });
  };

  async componentDidMount() {
    if (!getLocalStorage('userInfo')) router.push('/login');
    else {
      if (Object.keys(this.props.app.userInfo).length === 0) {
        this.props.dispatch({
          type: 'app/saveUserInfo',
          payload: getLocalStorage('userInfo'),
        });
      }
    }
  }

  render() {
    return (
      <Layout className={styles['basic-layout']}>
        <Header className={styles.header}>
          <div>
            <div className={styles.logo} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[`${this.props.location.pathname}`]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="/">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="/user">
                <Link to="/user">User</Link>
              </Menu.Item>
            </Menu>
          </div>

          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
              <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large">
                {this.props.app.userInfo.name}
              </Avatar>
              <Icon type="down" />
            </a>
          </Dropdown>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64, overflowY: 'scroll' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return {
    app,
  };
};

export default connect(mapStateToProps)(BasicLayout);
