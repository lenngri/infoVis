import React, { useState } from 'react';
import { useInvestmentData } from './useInvestmentData';
import { usePatentData } from './usePatentData';
import { usePopulationData } from './usePopulationData';

export const useData = () => {
  const data = null;
  const patentData = usePatentData();
  const populationData = usePopulationData();
  const investmentData = useInvestmentData();

  if (!patentData || !populationData || !investmentData) {
    return data;
  }

  // append population to patent entries
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

  // append investmentData to patent entries
  patentData.forEach((patentEntry) => {
    investmentData.forEach((investmentEntry) => {
      if (
        patentEntry.country === investmentEntry.country &&
        patentEntry.year === investmentEntry.year
      ) {
        patentEntry.investment = investmentEntry.value;
      }
    });
  });

  console.log('useData joined data!');

  return patentData;
};
