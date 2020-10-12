import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import mapData from '@highcharts/map-collection/countries/us/us-all.geo.json';
import proj4 from 'proj4';
import { useSelector } from 'react-redux';

highchartsMap(Highcharts);
if (typeof window !== 'undefined') {
  window.proj4 = window.proj4 || proj4;
}

const makeOptions = (data, displayField) => {
  const valArray = data.map((v) => v[1]);

  const option = {
    chart: {
      map: mapData,
    },
    title: {
      text: '',
    },
    mapNavigation: {
      enabled: true,
    },
    colorAxis: {
      min: Math.min(...valArray),
      max: Math.max(...valArray),
      stops: [
        [0, '#00FF00'],
        [0.5, '#ffffff'],
        [1, '#C40401'],
      ],
    },
    series: [
      {
        name: 'Separators',
        type: 'mapline',
        color: 'silver',
        nullColor: 'silver',
        showInLegend: false,
        enableMouseTracking: false,
      },
      {
        name: displayField,
        data: [...data],
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
      },
    ],
  };

  return option;
};

const Chart = () => {
  const { mapData, displayField } = useSelector(({ data }) => data);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (mapData.length !== 0) {
      setOptions(makeOptions(mapData, displayField));
      console.log(mapData);
    } else {
      setOptions(null);
    }
  }, [mapData, displayField]);

  return (
    <>
      {options ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={'mapChart'}
        />
      ) : null}
    </>
  );
};

export default Chart;
