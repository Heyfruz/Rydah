import styled from 'styled-components/native';
import { useFormikContext } from 'formik';
import { Ionicons as Icon } from '@expo/vector-icons';

import { Text } from '../General';

import { layout, pallets } from 'constant';

const { subhead } = layout.fonts;

interface CheckFieldKeys {
  save: boolean;
}

interface Props {
  name: keyof CheckFieldKeys;
  label: string;
}

// Styled-components
const Container = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

export default function FormCheck({ label, name }: Props): JSX.Element | null {
  const { setFieldTouched, setFieldValue, values, errors } =
    useFormikContext<CheckFieldKeys>();

  return (
    <Container
      activeOpacity={0.7}
      onBlur={() => setFieldTouched(name)}
      onPress={() => setFieldValue(name, !values[name])}>
      <Icon
        size={20}
        name={values[name] ? 'checkbox-outline' : 'square-outline'}
        style={{ marginRight: 8 }}
        color={
          errors[name]
            ? pallets.red
            : values[name]
              ? pallets.black
              : pallets.grey2
        }
      />
      <Text
        textTransform="capitalize"
        size={subhead}
        color={pallets.grey2}
        style={{ flex: 1 }}>
        {label}
      </Text>
    </Container>
  );
}
