import { TextProps } from 'react-native';

type Variants = '300' | '400' | '500' | '600' | '700';

export type FontName =
  | 'SpaceGrotesk-Bold'
  | 'SpaceGrotesk-Light'
  | 'SpaceGrotesk-Medium'
  | 'SpaceGrotesk-Regular'
  | 'SpaceGrotesk-SemiBold';

export interface Props extends TextProps {
  children: React.ReactNode;
  variant?: Variants;
  color?: string;
  size?: number;
  lineHeight?: number;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}
