/* 子向父通过回调函数传值通信 */
import React from 'react';
import PropTypes from 'prop-types';
import events from '@/utils/events';

export default class HelloCss extends React.Component {
  static propTypes = {
    msg: PropTypes.string.isRequired,
    callBack: PropTypes.func,
  };

  cb = msg => {
    events.emit('login', '哈哈哈哈哈哈');
    events.emit('login2', '哈哈哈哈哈哈');
    events.remove('login');
    return this.props.callBack(msg);
  };

  render() {
    return (
      <div>
        <h1>Hello, {this.props.msg}</h1>
        <button onClick={() => this.cb('我们通信吧~')}>点击通信</button>
      </div>
    );
  }
}
