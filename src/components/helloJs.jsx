/* 父向子context传值通信 */
import React from 'react';
import PropTypes from 'prop-types';
import events from '@/utils/events';

export default class HelloJs extends React.Component {
  // 子组件声明自己要使用context
  static contextTypes = {
    color: PropTypes.string,
  };

  static propTypes = {
    msg: PropTypes.string.isRequired,
  };
  componentDidMount() {
    events.on('login', msg => {
      console.log(msg, 1);
    });
  }
  render() {
    return <h1 style={{ background: this.context.color }}>Hello, {this.props.msg}</h1>;
  }
}
