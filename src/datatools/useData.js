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

  // add years to data object
  const data = {};
  for (let i = 1996; i <= 2014; i++) {
    data[i] = [];
  }
  console.log(data);

  // loop through every year in data object
  for (let year in data) {
    console.log();
    countryData.forEach((d) => {
      data[year].push({ country: d.name, selected: true });
    });
    // loop through every array for each year
    data[year].forEach((object) => {
      // add flags to data
      filteredFlagData.forEach((flagEntry) => {
        if (object.country === flagEntry.name) {
          object.flag = flagEntry.flag;
        }
      });
      // add patents to data
      filteredPatentData.forEach((patentEntry) => {
        if (object.country === patentEntry.country && Number(year) === patentEntry.year) {
          object.patents = patentEntry.patents;
        }
      });
      // add population to data
      filteredPopulationData.forEach((populationEntry) => {
        if (object.country === populationEntry.country && Number(year) === populationEntry.year) {
          object.population = populationEntry.population;
        }
      });
      // add investment to data
      filteredInvestmentData.forEach((investmentEntry) => {
        if (object.country === investmentEntry.country && Number(year) === investmentEntry.year) {
          object.investment = Number(investmentEntry.value.replace(',', '.'));
        }
      });
    });
  }
  return data;
};
