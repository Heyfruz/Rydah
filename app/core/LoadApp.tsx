import { useCallback } from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppNavigator, AuthNavigator } from 'navigation';
import { useSelector } from 'store';
import { pallets } from 'constant';

const theme: Theme = {
  colors: {
    background: pallets.background,
    border: pallets.border,
    card: pallets.card,
    notification: pallets.notification,
    primary: pallets.primary,
    text: pallets.text,
  },
  dark: false,
};

const fonts = {
  'SpaceGrotesk-Bold': require('assets/fonts/SpaceGrotesk-Bold.ttf'),
  'SpaceGrotesk-Light': require('assets/fonts/SpaceGrotesk-Light.ttf'),
  'SpaceGrotesk-Medium': require('assets/fonts/SpaceGrotesk-Medium.ttf'),
  'SpaceGrotesk-Regular': require('assets/fonts/SpaceGrotesk-Regular.ttf'),
  'SpaceGrotesk-SemiBold': require('assets/fonts/SpaceGrotesk-SemiBold.ttf'),
};

export default function LoadApp(): JSX.Element | null {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [fontsLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 800);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer {...{ theme }}>
          <SafeAreaProvider>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent
            />
          </SafeAreaProvider>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
