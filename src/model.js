import { action, thunk } from 'easy-peasy';
import { patentColorTheme, rDColorTheme } from './charttools/useColorTheme';

const model = {
  // state
  data: null,
  mapData: null,
  categoryData: null,
  selectedYear: 2005,
  clickedCountry: null,
  view: 'patents',
  scheme: patentColorTheme(),
  renderFlag: false,
  openPieChart: false,
  // actions
  setData: action((state, data) => {
    state.data = data;
    console.log('New data object set.');
  }),
  setMapData: action((state, mapData) => {
    state.mapData = mapData;
    console.log('New mapData object set.');
  }),
  setCategoryData: action((state, categoryData) => {
    state.categoryData = categoryData;
    console.log('New categoryData object set.');
  }),
  setClickedCountry: action((state, clickedCountry) => {
    state.clickedCountry = clickedCountry;
    console.log('New clickedCountry object set.', clickedCountry);
  }),
  setSelectedYear: action((state, year) => {
    state.selectedYear = year;
    console.log('New selected year set.');
  }),
  setView: action((state, view) => {
    state.view = view;
    console.log('New view set.');
  }),
  setScheme: action((state, scheme) => {
    state.scheme = scheme;
    console.log('New scheme set.');
  }),
  setRenderFlag: action((state, renderFlag) => {
    state.renderFlag = renderFlag;
    console.log('Updated renderFlag.');
  }),
  setOpenPieChart: action((state, openPieChart) => {
    state.openPieChart = openPieChart;
    console.log('PieChart value changed.', openPieChart);
  }),
  // thunks
  changeView: thunk((actions, view) => {
    actions.setView(view);
    if (view === 'investments') {
      actions.setScheme(rDColorTheme());
    } else {
      actions.setScheme(patentColorTheme());
    }
  }),
  changeClickedCountry: thunk((actions, clickedCountry) => {
    actions.setClickedCountry(clickedCountry);
    actions.setOpenPieChart(true);
  }),
};

export default model;
