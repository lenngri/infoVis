import React from 'react';
import { useStoreState } from 'easy-peasy';
import Legend from '../charttools/useLegend';

const ColorLegend = () => {
  const scheme = useStoreState((state) => state.scheme);

  // generate map legend and append to svg,
  // follows https://stackoverflow.com/questions/45877087/render-svgsvgelement-in-react-js-without-dangerouslysetinnerhtml
  const legend = Legend(scheme.colorScale, { title: scheme.legendTitle, width: 500 });
  return (
    <svg width={500} height={50}>
      <g
        // follows https://stackoverflow.com/questions/45877087/render-svgsvgelement-in-react-js-without-dangerouslysetinnerhtml
        // and https://stackoverflow.com/questions/26815738/svg-use-tag-and-reactjs
        dangerouslySetInnerHTML={{ __html: legend.innerHTML }}
      ></g>
    </svg>
  );
};

export default ColorLegend;
