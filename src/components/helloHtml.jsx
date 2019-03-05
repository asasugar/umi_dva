/* 父向子props传值通信 */
import React from 'react';
import PropTypes from 'prop-types';

export default class HelloHtml extends React.Component {
  render() {
    return <h1>Hello, {this.props.msg}</h1>;
  }
}
HelloHtml.propTypes = {
  msg: PropTypes.string.isRequired,
};
