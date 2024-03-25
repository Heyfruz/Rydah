import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { categories, location } from './Data';

import {
  Container,
  Form,
  FormField,
  FormImagePicker,
  FormPicker,
  Header,
  KeyboardAvoidView,
  Submit,
} from 'components';
import { layout, pallets } from 'constant';
import { AppRoutes, RootNavigationProp, TabRoutes } from 'navigation';
import { sellValidationSchema } from 'utils';
import { addProduct, useDispatch } from 'store';

const { spacing } = layout;

export default function Sell({
  navigation,
}: RootNavigationProp<AppRoutes, TabRoutes, 'Sell'>): JSX.Element {
  const dispatch = useDispatch();
  const [formKey, setFormKey] = useState<'clear' | 'fill'>('fill');

  useFocusEffect(
    useCallback(() => {
      setFormKey('fill');
      return () => {
        setFormKey('clear');
      };
    }, []),
  );

  return (
    <>
      <Header hideLeftComp title="Sell" itemColor={pallets.black} />
      <Form
        key={formKey}
        enableReinitialize
        initialValues={{
          category: undefined as unknown as PickerItemProps,
          description: '',
          imageUrl: '',
          name: '',
          price: '',
          sellerLocation: undefined as unknown as PickerItemProps,
        }}
        validationSchema={sellValidationSchema}
        onSubmit={values => {
          dispatch(
            addProduct({
              category: values.category.value as CategoryList,
              description: values.description,
              imageUrl: `data:image/png;base64,${values.imageUrl}`,
              name: values.name,
              price: Number(values.price),
              sellerLocation: values.sellerLocation.value,
            }),
          );

          navigation.navigate('DashboardStack', {
            params: { action: 'sell' },
            screen: 'Success',
          });
        }}>
        <KeyboardAvoidView>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            enableOnAndroid>
            <Container paddingVertical={24}>
              <FormImagePicker name="imageUrl" placeholder="Select an Image" />
              <FormField name="name" placeholder="Enter Name" />
              <FormField
                name="price"
                placeholder="Enter Price"
                keyboardType="number-pad"
              />
              <FormPicker
                name="sellerLocation"
                placeholder="Choose a Location"
                items={location}
              />
              <FormPicker
                name="category"
                placeholder="Select a Category"
                items={categories.map(i => ({ label: i.name, value: i.name }))}
              />
              <FormField
                name="description"
                placeholder="Enter Description"
                multiline
                marginBottom={24}
              />
            </Container>
          </KeyboardAwareScrollView>
          <Footer>
            <Submit label="Submit" />
          </Footer>
        </KeyboardAvoidView>
      </Form>
    </>
  );
}

const Footer = styled.View`
  padding: ${spacing.padding / 2}px ${spacing.padding}px;
`;
