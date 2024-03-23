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

export * from './validation';
