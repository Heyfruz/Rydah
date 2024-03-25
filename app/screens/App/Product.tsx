import styled from 'styled-components/native';

import {
  Button,
  Container,
  Header,
  Section,
  Text,
  VirtualScroll,
} from 'components';
import { DashboardRoutes, StackNavigationProps } from 'navigation';
import { layout, pallets } from 'constant';
import { formatCurrency } from 'utils';

const { window, spacing, fonts } = layout;

export default function Product({
  route,
  navigation,
}: StackNavigationProps<DashboardRoutes, 'Product'>): JSX.Element {
  const product = route.params?.product;

  return (
    <>
      <Header title={product.name} />
      <VirtualScroll>
        <Container paddingVertical={spacing.m}>
          <Image source={{ uri: product.imageUrl }} />
          <Row>
            <TitleContainer>
              <Text marginBottom={4} variant="700">
                {product.name}
              </Text>
              <Text
                size={fonts.caption1}
                variant="300"
                textTransform="uppercase">
                {product.category}
              </Text>
            </TitleContainer>
            <Text size={fonts.title2} variant="700">
              {formatCurrency(product.price)}
            </Text>
          </Row>
          <Section label="Description" padding={0} paddingVertical={8} />
          <Text marginBottom={16}>{product.description}</Text>
          <Section label="Seller Location" padding={0} paddingVertical={8} />
          <Text marginBottom={16}>{product.sellerLocation}</Text>
        </Container>
      </VirtualScroll>
      <Footer>
        <Button
          label="Purchase"
          onPress={() => {
            navigation.navigate('Success', { action: 'purchase' });
          }}
        />
      </Footer>
    </>
  );
}

const Image = styled.Image`
  height: ${window.height * 0.35}px;
  width: ${window.width - spacing.padding * 2}px;
  border-width: 1px;
  border-color: ${pallets.grey};
  border-radius: 8px;
  margin-bottom: 24px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${spacing.width}px;
  margin-bottom: 16px;
`;

const TitleContainer = styled.View``;

const Footer = styled.View`
  padding: ${spacing.padding}px;
  padding-bottom: ${spacing.padding * 2}px;
`;
