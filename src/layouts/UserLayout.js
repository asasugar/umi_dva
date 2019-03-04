import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import router from 'umi/router';
import myFetch from '@/utils/request';
import { setLocalStorage, removeLocalStorage } from '@/utils/localStorage';
import styles from './u.less';

class NormalLoginForm extends React.Component {
  componentDidMount() {
    removeLocalStorage('userInfo');
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { success, msg, data } = await myFetch({
          url: '/mockApi/login',
          type: 'post',
          data: {
            userName: values.userName,
            password: values.password,
          },
        });
        if (success) {
          setLocalStorage('userInfo', data);
          await window.g_app._store.dispatch({
            type: 'app/saveUserInfo',
            payload: data,
          });
          message.success(msg);
          router.push('/');
        } else {
          message.error(msg);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}> Yay!Welcome to umi! </h1>{' '}
        <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
          <Form.Item>
            {' '}
            {getFieldDecorator('userName', {
              initialValue: 'admin',
              rules: [
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ],
            })(
              <Input
                prefix={
                  <Icon
                    type="user"
                    style={{
                      color: 'rgba(0,0,0,.25)',
                    }}
                  />
                }
                placeholder="Username"
              />
            )}{' '}
          </Form.Item>{' '}
          <Form.Item>
            {' '}
            {getFieldDecorator('password', {
              initialValue: 'admin',
              rules: [
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ],
            })(
              <Input
                prefix={
                  <Icon
                    type="lock"
                    style={{
                      color: 'rgba(0,0,0,.25)',
                    }}
                  />
                }
                type="password"
                placeholder="Password"
              />
            )}{' '}
          </Form.Item>{' '}
          <Form.Item>
            {' '}
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox> Remember me </Checkbox>)}{' '}
            <a className={styles['login-form-forgot']} href="">
              Forgot password{' '}
            </a>{' '}
            <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
              Log in
            </Button>
            Or <a href=""> register now! </a>{' '}
          </Form.Item>{' '}
        </Form>{' '}
      </div>
    );
  }
}

const UserLayout = Form.create({
  name: 'normal_login',
})(NormalLoginForm);
export default UserLayout;
