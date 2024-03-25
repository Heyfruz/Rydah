import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { DashboardRoutes } from 'navigation';
import { Product, Success } from 'screens';

const { Navigator, Screen, Group } = createStackNavigator<DashboardRoutes>();

export default function DashboardNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Product" component={Product} />
      <Group
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}>
        <Screen name="Success" component={Success} />
      </Group>
    </Navigator>
  );
}
