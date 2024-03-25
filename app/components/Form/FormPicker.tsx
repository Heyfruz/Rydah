import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useFormikContext } from 'formik';
import { Feather as Icon } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { Text } from '../General';

import Input from './FormInput';

import { layout, pallets } from 'constant';

const { height, inputRadius, borderWidth } = layout.input;
const { subhead } = layout.fonts;
const { window } = layout;

interface PickerFieldKeys {
  [key: string]: PickerItemProps;
}

interface Props {
  name: keyof PickerFieldKeys & string;
  onSelectItem?: (item: PickerItemProps) => void;
  items: PickerItemProps[];
  hasSearch?: boolean;
  marginBottom?: number;
  disabled?: boolean;
  noteVisible?: boolean;
  placeholder?: string;
  error?: boolean;
}

export default function FormPicker({
  name,
  disabled,
  placeholder,
  items,
  onSelectItem,
  marginBottom = 15,
  hasSearch,
  noteVisible,
}: Props): JSX.Element | null {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['45%', '75%'], []);
  const [search, setSearch] = useState('');

  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext<PickerFieldKeys>();

  const error = !!(errors[name] && touched[name]);
  const value = values[name]?.label;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const BackDrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={1} />
    ),
    [],
  );

  return (
    <>
      <>
        <Container
          disabled={disabled}
          error={error}
          onPress={() => {
            handlePresentModalPress();
            console.log('Pressed');
          }}>
          <LabelContainer>
            <Text
              textTransform="capitalize"
              color={value ? pallets.text : pallets.darkGrey}>
              {value ?? placeholder}
            </Text>
          </LabelContainer>
          <Icon name="chevron-down" color={pallets.primary} size={20} />
        </Container>
        <ErrorMessageContainer
          marginBottom={marginBottom}
          noteVisible={noteVisible}
          error={error}>
          {error && (
            <ErrorMessageView>
              <Text variant="300" size={subhead} color={pallets.red}>
                {(errors?.[name] as unknown as string) || 'Select an item'}
              </Text>
            </ErrorMessageView>
          )}
        </ErrorMessageContainer>
      </>
      <BottomSheetModal
        index={1}
        backdropComponent={BackDrop}
        snapPoints={snapPoints}
        ref={bottomSheetRef}>
        {hasSearch && (
          <View style={{ paddingHorizontal: 20 }}>
            <Input
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              style={{ height: 45 }}
              clearButtonMode="while-editing"
              marginBottom={0}
            />
          </View>
        )}
        <FlatList
          data={items.filter(item =>
            item.label.toLowerCase().includes(search.toLowerCase()),
          )}
          style={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <>
              <PickerItem
                onPress={() => {
                  bottomSheetRef.current?.close();
                  setFieldTouched(name);
                  onSelectItem?.(item);
                  setFieldValue(name, item);
                }}>
                <Text
                  textTransform="capitalize"
                  color={value === item.value ? pallets.primary : pallets.text}>
                  {item.label}
                </Text>
                {value === item.value && (
                  <Icon
                    name="check-square"
                    size={24}
                    color={
                      value === item.value ? pallets.primary : pallets.text
                    }
                  />
                )}
              </PickerItem>
            </>
          )}
        />
      </BottomSheetModal>
    </>
  );
}

interface ContainerPros
  extends Pick<Props, 'disabled' | 'error' | 'marginBottom'> {}

const Container = styled.TouchableOpacity<ContainerPros>`
  background-color: ${pallets.grey};
  border-color: ${({ disabled, error }) =>
    disabled ? pallets.inactive : error ? pallets.red : pallets.border};
  border-radius: ${inputRadius}px;
  border-width: ${borderWidth}px;
  flex-direction: row;
  height: ${height}px;
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  width: ${window.width - 16 * 2}px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const LabelContainer = styled.View``;

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

const PickerItem = styled.TouchableOpacity`
  padding: 12px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
