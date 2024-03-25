import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

import { TabRoutes } from 'navigation/types';

type IconName = Pick<React.ComponentProps<typeof Feather>, 'name'>['name'];

export const getTabIcon = (
  route: RouteProp<TabRoutes, keyof TabRoutes>,
): IconName => {
  switch (route.name) {
    case 'Dashboard':
      return 'grid';
    case 'Sell':
      return 'plus-circle';
    case 'Profile':
      return 'user';
    default:
      return 'search';
  }
};

export const getTotalAmount = (
  accumulator: number,
  a: number,
  _currentIndex: number,
  _array: number[],
): number => {
  return accumulator + a;
};

export const formatCurrency = (value: number | string): string => {
  let amount =
    typeof value === 'string' ? Number(value.replaceAll(',', '')) : value;

  if (Number.isNaN(amount)) {
    amount = 0;
  }

  return new Intl.NumberFormat('en-GB', {
    currency: 'GBP',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(amount);
};

export function generateRandomHexadecimal(length: number): string {
  // Characters available for a hexadecimal string
  const characters = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    // Generate a random index to pick a character from the characters string
    const randomIndex = Math.floor(Math.random() * characters.length);
    // Add the character to the result string
    result += characters[randomIndex];
  }
  return result;
}

export * from './validation';
