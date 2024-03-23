import { View } from 'react-native';

import { Container, Header } from 'components';
import { setAuthenticated, useDispatch } from 'store';

export default function Dashboard(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <>
      <Header
        hideLeftComp
        title=""
        rightLabel="Log Out"
        onRightLabelPress={() => {
          dispatch(setAuthenticated(false));
        }}
      />
      <Container paddingTop={0} paddingBottom={0}>
        <View />
      </Container>
    </>
  );
}
