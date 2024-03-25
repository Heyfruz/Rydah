import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather as Icon } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { TabRoutes } from '../types';

import { getTabIcon } from 'utils';
import { Text } from 'components';
import { Dashboard, Profile, Sell } from 'screens';

const { Screen, Navigator } = createBottomTabNavigator<TabRoutes>();

export default function Tab(): JSX.Element {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const name = getTabIcon(route);

          return <Icon {...{ color, name, size }} />;
        },
        tabBarLabel: ({ color, focused }) => {
          return (
            <Text
              variant={focused ? '600' : '300'}
              size={12}
              color={color}
              style={[Platform.OS === 'android' ? { paddingBottom: 4 } : {}]}>
              {route.name}
            </Text>
          );
        },
        tabBarStyle: [Platform.OS === 'android' && { height: 64, padding: 4 }],
      })}>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Sell" component={Sell} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}
