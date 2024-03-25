import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const xSmall = width < 325;
const small = width >= 325 && width < 350;
const medium = width >= 350 && width < 450;
const large = width >= 450;

const padding = small ? 14 : 16;

export default {
  button: {
    height: 51,
    height2: 70,
    radius1: 25,
    radius2: 16,
    width: '65%',
  },
  cards: {
    cardHeight: 65,
    cardRadius: 8,
    categoryHeight: height * 0.125,
    categoryWidth: (width - 16) * 0.65,
    productHeight: height * 0.2,
    productWidth: (width - 16) * 0.4,
    productWidthLarge: width - 16 * 2,
  },
  dimension: {
    isLandscape: height < width,
    isLargeDevice: large,
    isMediumDevice: medium,
    isPhone: width < 450,
    isPortrait: height > width,
    isSmallDevice: small,
    isSmallOrTiny: small || xSmall,
    isTablet: width >= 450,
    isTinyDevice: xSmall,
  },
  fonts: {
    body: xSmall ? 14 : small ? 15 : medium ? 16 : 17,
    callout: xSmall ? 13 : small ? 14 : medium ? 14 : 16,
    caption1: xSmall ? 11 : small ? 11 : 12,
    caption2: xSmall ? 11 : small ? 11 : 11,
    footnote: xSmall ? 12 : small ? 12 : 13,
    headline: xSmall ? 14 : small ? 15 : medium ? 16 : 17,
    largeTitle: xSmall ? 28 : small ? 30 : 34,
    subhead: xSmall ? 12 : small ? 13 : medium ? 14 : 15,
    title1: xSmall ? 22 : small ? 24 : 28,
    title2: xSmall ? 20 : small ? 20 : 22,
    title3: xSmall ? 18 : small ? 18 : 20,
  },
  input: {
    borderWidth: 1,
    height: 50,
    inputBottom: 16,
    inputRadius: 8,
  },
  spacing: {
    l: 24,
    m: 16,
    padding,
    r: 20,
    s: 8,
    width: width - padding * 2,
    xl: 32,
    xl2: 32 * 2,
    xs: 4,
    xxl: 40,
    xxl2: 40 * 2,
  },
  window: {
    height,
    width,
  },
};
