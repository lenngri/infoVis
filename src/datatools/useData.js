import React, { useState } from 'react';
import { useInvestmentData } from './useInvestmentData';
import { usePatentData } from './usePatentData';
import { usePopulationData } from './usePopulationData';

export const useData = () => {
  // load data sets, patent data is the base data set
  const data = usePatentData();
  const populationData = usePopulationData();
  const investmentData = useInvestmentData();

  if (!data || !populationData || !investmentData) {
    return null;
  }

  // append population to general data object
  data.forEach((patentEntry) => {
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
  data.forEach((patentEntry) => {
    investmentData.forEach((investmentEntry) => {
      if (
        patentEntry.country === investmentEntry.country &&
        patentEntry.year === investmentEntry.year
      ) {
        patentEntry.investment = investmentEntry.value;
      }
    });
  });

  return data;
};
