import { action, thunk } from 'easy-peasy';
import { patentColorTheme, rDColorTheme } from './charttools/useColorTheme';

const model = {
  // state
  data: null,
  mapData: null,
  selectedYear: 2005,
  view: 'patents',
  scheme: patentColorTheme(),
  // actions
  setData: action((state, data) => {
    state.data = data;
    console.log('New data object set.');
  }),
  setMapData: action((state, mapData) => {
    state.mapData = mapData;
    console.log('New mapData object set.');
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
  // thunks
  changeView: thunk((actions, view) => {
    actions.setView(view);
    if (view === 'investments') {
      actions.setScheme(rDColorTheme());
    } else {
      actions.setScheme(patentColorTheme());
    }
  }),
};

export default model;
