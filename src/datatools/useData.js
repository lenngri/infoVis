import { useInvestmentData } from './useInvestmentData';
import { usePatentData } from './usePatentData';
import { usePopulationData } from './usePopulationData';
import { useCountryData } from './useCountryData';

export const useData = () => {
  // load data sets, patent data is the base data set
  const data = usePatentData();
  const populationData = usePopulationData();
  const investmentData = useInvestmentData();
  const countryData = useCountryData();

  if (!data || !populationData || !investmentData || !countryData) {
    return null;
  }

  const filteredData = data.filter((o1) => countryData.some((o2) => o1.country === o2.name));

  // append population to general data object
  filteredData.forEach((patentEntry) => {
    populationData.forEach((populationEntry) => {
      if (
        patentEntry.country === populationEntry.country &&
        patentEntry.year === populationEntry.year
      ) {
        patentEntry.population = populationEntry.population;
      }
    });
  });

  // append investmentData to general data object
  filteredData.forEach((patentEntry) => {
    investmentData.forEach((investmentEntry) => {
      if (
        patentEntry.country === investmentEntry.country &&
        patentEntry.year === investmentEntry.year
      ) {
        patentEntry.investment = Number(investmentEntry.value.replace(',', '.'));
      }
    });
  });

  return filteredData;
};
