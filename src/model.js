import { action, thunk } from 'easy-peasy';
import { patentColorTheme, rDColorTheme } from './charttools/useColorTheme';

const model = {
  // state
  data: null,
  selectedYear: 2005,
  view: 'patents',
  scheme: patentColorTheme(),
  checkedCountries: [],
  // actions
  setData: action((state, data) => {
    state.data = data;
    console.log('New data object set.');
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
  setCheckedCountries: action((state, checkedCountries) => {
    state.checkedCountries = checkedCountries;
    console.log('Updated checked countries.');
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
