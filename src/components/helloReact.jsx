/* 父组件通过ref调用子组件方法 */
import React from 'react';
import PropTypes from 'prop-types';

export default class HelloReact extends React.Component {
  static propTypes = {
    msg: PropTypes.string.isRequired,
  };

  cb = msg => {
    alert(msg);
  };

  render() {
    return <h1>Hello, {this.props.msg}</h1>;
  }
}
