import { useInvestmentData } from './useInvestmentData';
import { usePatentData } from './usePatentData';
import { usePopulationData } from './usePopulationData';
import { useCountryData } from './useCountryData';
import { useFlagData } from './useFlagData';

export const useData = () => {
  // load data sets, patent data is the base data set
  const patentData = usePatentData();
  const populationData = usePopulationData();
  const investmentData = useInvestmentData();
  const countryData = useCountryData();
  const flagData = useFlagData();

  if (!patentData || !populationData || !investmentData || !countryData || !flagData) {
    return null;
  }

  const filteredPatentData = patentData.filter((o1) =>
    countryData.some((o2) => o1.country === o2.name)
  );
  const filteredPopulationData = populationData.filter((o1) =>
    countryData.some((o2) => o1.country === o2.name)
  );
  const filteredInvestmentData = investmentData.filter((o1) =>
    countryData.some((o2) => o1.country === o2.name)
  );
  const filteredFlagData = flagData.filter((o1) => countryData.some((o2) => o1.name === o2.name));

  // add years to data objects
  const data = {};
  for (let i = 1996; i <= 2014; i++) {
    data[i] = {};
  }

  // add countries to data object
  for (let key in data) {
    countryData.forEach((d) => {
      data[key][d.name] = { selected: true };
    });
    filteredFlagData.forEach((d) => {
      if (data[key][d.name]) {
        data[key][d.name].flag = d.flag;
      }
    });
  }

  // add number of patents to data object
  filteredPatentData.forEach((d) => {
    if (data[d.year][d.country]) {
      data[d.year][d.country].patents = d.patents;
    }
  });

  // add population to data object
  filteredPopulationData.forEach((d) => {
    if (data[d.year][d.country]) {
      data[d.year][d.country].population = d.population;
    } else {
      data[d.year][d.country].population = 'no data';
    }
  });

  // add investments to data object
  filteredInvestmentData.forEach((d) => {
    if (data[d.year][d.country]) {
      data[d.year][d.country].investment = Number(d.value.replace(',', '.'));
    }
  });

  console.log(data);

  // append population to general patentData object
  patentData.forEach((patentEntry) => {
    populationData.forEach((populationEntry) => {
      if (
        patentEntry.country === populationEntry.country &&
        patentEntry.year === populationEntry.year
      ) {
        patentEntry.population = populationEntry.population;
      }
    });
  });

  // append investmentData to general patentData object
  patentData.forEach((patentEntry) => {
    investmentData.forEach((investmentEntry) => {
      if (
        patentEntry.country === investmentEntry.country &&
        patentEntry.year === investmentEntry.year
      ) {
        patentEntry.investment = Number(investmentEntry.value.replace(',', '.'));
      }
    });
  });

  // append flagData to general patentData object
  patentData.forEach((patentEntry) => {
    flagData.forEach((flagEntry) => {
      if (patentEntry.country === flagEntry.name) {
        patentEntry.flag = flagEntry.flag;
      }
    });
  });

  patentData.forEach((patentEntry) => {
    patentEntry.selected = true;
  });

  const filteredData = patentData.filter((o1) => countryData.some((o2) => o1.country === o2.name));
  return filteredData;
};
