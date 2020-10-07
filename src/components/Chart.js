import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from "highcharts/modules/map";
import mapData from '@highcharts/map-collection/countries/us/us-all.geo.json'
import proj4 from "proj4";


highchartsMap(Highcharts);
if (typeof window !== "undefined") {
  window.proj4 = window.proj4 || proj4;
}


const makeOptions = (data) => ({
  chart: {
    map: mapData,
  },
  credits: {
    enabled: false,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    max: 2,
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
      name: 'Mean',
      data: data,
      dataLabels: {
          enabled: true,
          format: '{point.name}'
      }
  }
  ],
});

const Chart = ({ data }) => {
  const [options, setOptions] = useState(null);

  useEffect(()=> {
    if(data.length !== 0) {
      setOptions(makeOptions(data))
    }
  }, [data])


  return <>
     {options ? <HighchartsReact highcharts={Highcharts} options={options} constructorType ={'mapChart'} /> : null}
  </>;
};

export default Chart;
