import styled from 'styled-components/native';

import { pallets } from 'constant';
import { Button, Text } from 'components';

interface Props {
  onApplePress?: () => void;
  onGooglePress?: () => void;
  appleLabel?: string;
  googleLabel?: string;
}

export default function AltLogin({
  onApplePress,
  onGooglePress,
  appleLabel,
  googleLabel,
}: Props): JSX.Element | null {
  return (
    <>
      <OrView>
        <Line />
        <Text size={12}>OR</Text>
        <Line />
      </OrView>
      <Button
        variant="secondary"
        label={appleLabel || 'Continue with Apple'}
        icon="logo-apple"
        onPress={onApplePress}
        color={pallets.black}
        marginBottom={8}
      />
      <Button
        variant="secondary"
        label={googleLabel ?? 'Continue with Google'}
        icon="logo-google"
        onPress={onGooglePress}
        color={pallets.black}
        marginBottom={16}
      />
    </>
  );
}

const OrView = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 16px 0;
  width: 100%;
`;

const Line = styled.View`
  background-color: ${pallets.darkGrey};
  height: 1px;
  opacity: 0.5;
  width: 40%;
`;
