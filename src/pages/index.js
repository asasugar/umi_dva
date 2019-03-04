import React from 'react';
import { Card } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import myFetch from '@/utils/request';

class Areanull extends React.Component {
  state = {
    data: [],
  };

  componentDidMount = async () => {
    this.getMockData();
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
