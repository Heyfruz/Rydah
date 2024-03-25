import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { Button, Container, Footer, Header, Text } from 'components';
import { layout, pallets } from 'constant';
import { AppRoutes, DashboardRoutes, RootNavigationProp } from 'navigation';

const { spacing } = layout;

export default function Success({
  navigation,
  route,
}: RootNavigationProp<AppRoutes, DashboardRoutes, 'Success'>): JSX.Element {
  const { params } = route;

  const title =
    params.action === 'purchase'
      ? 'You have successfully placed an order'
      : 'Item added successfully';

  return (
    <>
      <Header title="" hideLeftComp />
      <Container alignItems="center">
        <IconContainer>
          <Icon
            name="check-decagram"
            size={80}
            color={pallets.primary}
            style={{ marginBottom: 12 }}
          />
          <Text variant="500" textAlign="center">
            {title}
          </Text>
        </IconContainer>
        <Footer paddingBottom={32}>
          <Button
            label="Complete"
            onPress={() => {
              if (params.action === 'sell') {
                navigation.navigate('Tab', { screen: 'Sell' });
              } else {
                navigation.navigate('Tab', { screen: 'Dashboard' });
              }
            }}
          />
        </Footer>
      </Container>
    </>
  );
}

const IconContainer = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
  width: ${spacing.width}px;
`;
