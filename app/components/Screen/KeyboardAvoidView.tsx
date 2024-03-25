import { KeyboardAvoidingViewProps, Platform } from 'react-native';
import styled from 'styled-components/native';

interface Props extends KeyboardAvoidingViewProps {
  children: React.ReactNode;
}

export default function KeyboardAvoidContainer({
  children,
  ...props
}: Props): JSX.Element | null {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      {...props}>
      {children}
    </KeyboardAvoidingView>
  );
}

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
