import { forwardRef } from 'react';
import { useFormikContext } from 'formik';
import { TextInput, TextInputProps } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import FormInput from './FormInput';

export interface FieldKeys {
  email: string;
  name: string;
  password: string;
}

type IconName = Pick<React.ComponentProps<typeof Icon>, 'name'>['name'];

interface FormFieldProps extends TextInputProps {
  name: keyof FieldKeys;
  placeholder: string;
  placeholderColor?: string;
  onTextChange?: (text: string) => void;
  disabled?: boolean;
  marginBottom?: number;
  rightLabel?: string;
  onRightLabelPress?: () => void;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
}

const FormField = forwardRef<TextInput, FormFieldProps>(
  (
    {
      name,
      placeholder,
      placeholderColor,
      onTextChange,
      disabled,
      marginBottom,
      onRightLabelPress,
      rightIcon,
      onRightIconPress,
      rightLabel,
      ...props
    }: FormFieldProps,
    ref,
  ): JSX.Element | null => {
    const {
      setFieldTouched,
      setFieldValue,
      errors,
      touched,
      handleSubmit,
      values,
    } = useFormikContext<FieldKeys>();

    const error = !!(errors[name] && touched[name]);
    // const error = Boolean(errors[name]);

    return (
      <>
        <FormInput
          onChangeText={text => {
            setFieldValue(name, text);
            onTextChange?.(text);
          }}
          onBlur={() => {
            setFieldTouched(name);
          }}
          onSubmitEditing={() => handleSubmit()}
          errorMessage={errors[name]}
          value={values[name]}
          {...{
            disabled,
            error,
            marginBottom,
            onRightIconPress,
            onRightLabelPress,
            placeholder,
            placeholderColor,
            ref,
            rightIcon,
            rightLabel,
          }}
          {...props}
        />
      </>
    );
  },
);

export default FormField;
