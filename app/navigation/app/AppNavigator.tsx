import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { AppRoutes } from '../types';

import Tab from './Tab';
import DashboardNavigator from './DashboardStack';

const { Navigator, Screen, Group } = createStackNavigator<AppRoutes>();

export default function AppNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Group>
        <Screen name="Tab" component={Tab} />
      </Group>
      <Group
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}>
        <Screen name="DashboardStack" component={DashboardNavigator} />
      </Group>
    </Navigator>
  );
}
