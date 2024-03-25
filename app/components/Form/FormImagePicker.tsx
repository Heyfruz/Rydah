import { useFormikContext } from 'formik';
import { Alert } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Feather as Icon } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { Text } from 'components/General';
import { layout, pallets } from 'constant';

interface FieldKeys {
  imageUrl: string;
}

interface Props {
  name: keyof FieldKeys;
  marginBottom?: number;
  disabled?: boolean;
  noteVisible?: boolean;
  placeholder?: string;
  error?: boolean;
}

const { fonts, input, window, cards } = layout;

export default function FormDocPicker({
  name,
  placeholder,
  disabled,
  noteVisible,
  marginBottom = 20,
}: Props): JSX.Element | null {
  const [imageResponse, setImageResponse] =
    useState<ImagePicker.ImagePickerSuccessResult | null>(null);

  const { setFieldTouched, setFieldValue, errors, touched } =
    useFormikContext<FieldKeys>();

  const error = !!(errors[name] && touched[name]);

  const handleTakePicture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (!status) {
        Alert.alert(
          'Permission required',
          'We need Camera roll permission to access your photos',
          [
            { text: 'Dismiss' },
            {
              onPress: handleTakePicture,
              text: 'Try Again',
            },
          ],
        );

        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.2,
      });

      if (!result.canceled) {
        // const value = `data:${'image/png'};base64,${result.assets[0]?.base64}`;
        const value = result.assets[0]?.base64;

        setImageResponse(result);
        setFieldValue(name, value);
        setFieldTouched(name);
      }
    } catch {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.2,
      });

      if (!result.canceled) {
        // const value = `data:${'image/png'};base64,${result.assets[0]?.base64}`;
        const value = result.assets[0]?.base64;

        setImageResponse(result);
        setFieldValue(name, value);
      }
    }
  };

  return (
    <>
      <Container
        disabled={disabled}
        error={error}
        onPress={() => {
          handleTakePicture();
        }}>
        {imageResponse?.assets[0]?.base64 ? (
          <Image
            source={{
              uri: `data:image/png;base64,${imageResponse.assets[0]?.base64}`,
            }}
          />
        ) : (
          <IconContainer>
            <Icon
              color={pallets.darkGrey}
              name="camera"
              size={32}
              style={{ margin: 8 }}
            />
            <Text color={pallets.darkGrey}>{placeholder}</Text>
          </IconContainer>
        )}
      </Container>
      <ErrorMessageContainer
        marginBottom={marginBottom}
        noteVisible={noteVisible}
        error={error}>
        {error && (
          <ErrorMessageView>
            <Text variant="300" size={fonts.subhead} color={pallets.red}>
              {errors?.[name] || 'Select an image'}
            </Text>
          </ErrorMessageView>
        )}
      </ErrorMessageContainer>
    </>
  );
}

interface ContainerPros
  extends Pick<Props, 'disabled' | 'error' | 'marginBottom'> {}

const Container = styled.TouchableOpacity<ContainerPros>`
  background-color: ${pallets.grey};
  border-color: ${({ disabled, error }) =>
    disabled ? pallets.inactive : error ? pallets.red : pallets.border};
  border-radius: ${input.inputRadius}px;
  border-width: ${input.borderWidth}px;
  height: ${cards.productHeight}px;
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  width: ${window.width - 16 * 2}px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  overflow: hidden;
`;

const Image = styled.Image`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
const IconContainer = styled.View`
  align-items: center;
`;

const ErrorMessageContainer = styled.View<
  Pick<Props, 'marginBottom' | 'noteVisible' | 'error'>
>`
  align-items: center;
  flex-direction: row;
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  margin-top: ${({ noteVisible, error }) => (noteVisible || error ? 5 : 0)}px;
`;

const ErrorMessageView = styled.View`
  align-items: flex-end;
  flex: 1;
`;
