import { createStackNavigator } from '@react-navigation/stack';

import { AppRoutes } from '../types';

import Tab from './Tab';

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
    </Navigator>
  );
}
