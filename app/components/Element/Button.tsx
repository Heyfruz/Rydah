import React from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Platform,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import { Text } from '../General';

import { layout, pallets } from 'constant';

const { fonts, button } = layout;

type IconName = Pick<React.ComponentProps<typeof Icon>, 'name'>['name'];
type Variants = 'secondary' | 'outline' | 'transparent';

export interface ButtonProps {
  variant?: Variants;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  marginBottom?: number;
  color?: string;
  labelColor?: string;
  isLoading?: boolean;
  width?: `${number}%`;
  icon?: IconName;
}

interface TouchableProps {
  children: JSX.Element;
}

// Styled container replacing View
const StyledContainer = styled.View<ButtonProps>`
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: ${button.height}px;
`;

// Styled control replacing View with style control
const StyledControl = styled.View<ButtonProps>`
  align-self: center;
  border-radius: ${button.radius2}px;
  background-color: ${({ variant, color, disabled, isLoading }) => {
    if (disabled || isLoading) {
      return variant === 'transparent' ? pallets.transparent : pallets.grey;
    }
    switch (variant) {
      case 'secondary':
        return color || pallets.white;
      case 'transparent':
        return pallets.transparent;
      case 'outline':
        return pallets.transparent;
      default:
        return pallets.primary;
    }
  }};
  border-color: ${({ variant, color }) =>
    variant === 'outline' ? color || pallets.primary : 'transparent'};
  border-width: ${({ variant }) => (variant === 'outline' ? 1.5 : 0)}px;
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  width: ${({ width }) => width || '100%'};
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
`;

function Button({
  disabled: buttonDisabled,
  label,
  onPress,
  variant,
  marginBottom,
  labelColor,
  color,
  isLoading = false,
  width,
  icon,
}: ButtonProps): JSX.Element | null {
  const disabled = buttonDisabled || isLoading;
  let textColor: string = pallets.white;

  switch (variant) {
    case 'secondary':
      textColor = color ? pallets.white : pallets.primary;
      break;
    case 'transparent':
    case 'outline':
      textColor = color || pallets.primary;
      break;
    default:
      textColor = pallets.white;
      break;
  }

  const Touchable = ({ children }: TouchableProps): JSX.Element => {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          disabled={disabled}
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple('#33333333', true)}>
          <StyledContainer>{children}</StyledContainer>
        </TouchableNativeFeedback>
      );
    }
    return (
      <StyledTouchableOpacity disabled={disabled} onPress={onPress}>
        {children}
      </StyledTouchableOpacity>
    );
  };

  return (
    <StyledControl
      variant={variant}
      disabled={disabled}
      marginBottom={marginBottom}
      color={color}
      isLoading={isLoading}
      width={width}>
      <Touchable>
        <StyledContainer>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={
                variant === 'transparent'
                  ? color || pallets.primary
                  : pallets.white
              }
            />
          ) : (
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              {Boolean(icon) && (
                <Icon
                  name={icon}
                  size={20}
                  color={textColor}
                  style={{ marginRight: 4 }}
                />
              )}
              <Text
                size={fonts.subhead}
                variant="600"
                color={labelColor || textColor}>
                {label}
              </Text>
            </View>
          )}
        </StyledContainer>
      </Touchable>
    </StyledControl>
  );
}

export default React.memo(Button);
