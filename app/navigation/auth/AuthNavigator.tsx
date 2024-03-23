import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { AuthRoutes } from '../types';

import { Login, Register } from 'screens/Auth';

const { Navigator, Screen } = createStackNavigator<AuthRoutes>();

export default function AuthNavigator(): JSX.Element {
  return (
    <>
      <Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleVisible: false,
          headerShown: false,
          headerTitle: '',
        }}>
        <Screen name="Register" component={Register} />
        <Screen name="Login" component={Login} />
      </Navigator>
    </>
  );
}
