import React from 'react';
import { Card } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import myFetch from '@/utils/request';
import PropTypes from 'prop-types';
import HelloHtml from '@/components/helloHtml';
import HelloJs from '@/components/helloJs';
import HelloCss from '@/components/helloCss';
import HelloReact from '@/components/helloReact';
import HelloHooks from '@/components/helloHooks';

class Areanull extends React.Component {
  // 父组件声明自己支持context
  static childContextTypes = {
    color: PropTypes.string,
  };

  helloReactRef = React.createRef();

  state = {
    data: [],
  };

  componentDidMount = async () => {
    this.getMockData();
  };

  // 提供一个函数,用来返回相应的context对象
  getChildContext() {
    return {
      color: 'red',
    };
  }

  callBack = msg => {
    alert(msg);
  };

  handleClick1 = msg => {
    // 方法一：
    this.refs.myRef.cb(msg);
  };

  handleClick2 = msg => {
    // 方法二：
    this.helloReactRef.current.cb(msg);
  };

  getMockData = async () => {
    const {
      success,
      data: { list },
    } = await myFetch({ url: '/mockApi/tags' });
    if (success) this.setState({ data: list });
  };

  render() {
    var dv = new DataSet.View().source(this.state.data);
    dv.transform({
      type: 'fold',
      fields: ['ACME', 'Compitor'],
      key: 'type',
      value: 'value',
    });
    const scale = {
      value: {
        alias: 'The Share Price in Dollars',
        formatter: function(val) {
          return '$' + val;
        },
      },
      year: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <HelloHtml msg="HTML" />
        <HelloJs msg="JavaScript" />
        <HelloCss msg="Css" callBack={this.callBack.bind(this)} />
        <HelloReact msg="react" ref="myRef" />
        <HelloReact msg="react" ref={this.helloReactRef} />
        <HelloHooks />
        <button onClick={this.handleClick1.bind(this, 'hello react1~')}>
          点击触发ref子组件写法一
        </button>
        <button onClick={this.handleClick2.bind(this, 'hello react2~')}>
          点击触发ref子组件写法二
        </button>
        <Card style={{ width: 600 }}>
          <Chart height={300} data={dv} padding={'auto'} scale={scale} forceFit>
            <Tooltip crosshairs />
            <Axis />
            <Legend />
            <Geom type="area" position="year*value" color="type" shape="smooth" />
            <Geom type="line" position="year*value" color="type" shape="smooth" size={2} />
          </Chart>
        </Card>
      </div>
    );
  }
}

export default Areanull;
