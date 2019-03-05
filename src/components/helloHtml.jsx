/* 父向子props传值通信 */
import React from 'react';
import PropTypes from 'prop-types';
import events from '@/utils/events';

export default class HelloHtml extends React.Component {
  componentDidMount() {
    events.on('login', msg => {
      console.log(msg, 2);
    });
    events.on('login2', msg => {
      console.log(msg, 2);
    });
  }
  render() {
    return <h1>Hello, {this.props.msg}</h1>;
  }
}
HelloHtml.propTypes = {
  msg: PropTypes.string.isRequired,
};
