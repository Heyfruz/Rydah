import React, { forwardRef } from 'react';
import styled from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import { Text } from '../General';

import { layout, pallets } from 'constant';

type IconName = Pick<React.ComponentProps<typeof Icon>, 'name'>['name'];

const { height, inputRadius, borderWidth } = layout.input;
const { subhead } = layout.fonts;

interface Props extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
  placeholderColor?: string;
  disabled?: boolean;
  valid?: boolean;
  note?: string;
  noteVisible?: boolean;
  placeholder?: string;
  rightLabel?: string;
  onRightLabelPress?: () => void;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
}

const FormInput = forwardRef<TextInput, Props>(
  (
    {
      value,
      onChangeText,
      error,
      placeholderColor,
      marginBottom = 15,
      errorMessage,
      disabled,
      rightLabel,
      onRightLabelPress,
      rightIcon,
      onRightIconPress,
      noteVisible,
      placeholder,
      multiline,
      ...props
    },
    ref,
  ) => (
    <>
      <Container disabled={disabled} error={error} multiline={multiline}>
        <StyledInput
          editable={!disabled}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor || pallets.darkGrey}
          onChangeText={onChangeText}
          ref={ref}
          value={value}
          {...props}
        />
        {Boolean(rightLabel) && !rightIcon && (
          <RightBox onPress={onRightLabelPress} activeOpacity={0.5}>
            <Text color={pallets.primary} size={subhead} variant="500">
              {rightLabel}
            </Text>
          </RightBox>
        )}
        {Boolean(rightIcon) && !rightLabel && (
          <RightBox onPress={onRightIconPress} activeOpacity={0.5}>
            <Icon name={rightIcon} color={pallets.primary} size={20} />
          </RightBox>
        )}
      </Container>
      <ErrorMessageContainer
        marginBottom={marginBottom}
        noteVisible={noteVisible}
        error={error}>
        {error && (
          <ErrorMessageView>
            <Text variant="300" size={subhead} color={pallets.red}>
              {errorMessage}
            </Text>
          </ErrorMessageView>
        )}
      </ErrorMessageContainer>
    </>
  ),
);

const Container = styled.View<Props>`
  background-color: ${pallets.grey};
  border-color: ${({ disabled, error }) =>
    disabled ? pallets.inactive : error ? pallets.red : pallets.border};
  border-radius: ${inputRadius}px;
  border-width: ${borderWidth}px;
  flex-direction: row;
  min-height: ${({ multiline }) => (multiline ? height * 1.5 : height)}px;
  overflow: hidden;
`;

const StyledInput = styled(TextInput).attrs((props: TextInputProps) => ({
  placeholderTextColor: props.placeholderTextColor || pallets.darkGrey,
}))<TextInputProps>`
  flex: 1;
  color: ${pallets.text};
  padding-left: 10px;
  min-height: ${({ multiline }) => (multiline ? height * 2 : height)}px;
`;

const RightBox = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-right: 10px;
`;

const ErrorMessageContainer = styled.View<Props>`
  align-items: center;
  flex-direction: row;
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  margin-top: ${({ noteVisible, error }) => (noteVisible || error ? 5 : 0)}px;
`;

const ErrorMessageView = styled.View`
  align-items: flex-end;
  flex: 1;
`;

export default FormInput;
