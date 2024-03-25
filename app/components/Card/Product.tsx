import styled from 'styled-components/native';

import { Text } from '../General';

import { layout } from 'constant';
import { formatCurrency } from 'utils';

interface Props {
  product: Product;
  marginRight?: number;
  onPress: () => void;
  variant: 'large' | 'small';
}

const { cards, fonts } = layout;

export default function Product({
  product,
  marginRight,
  onPress,
  variant,
}: Props): JSX.Element | null {
  if (variant === 'small') {
    return (
      <ProductContainer marginRight={marginRight} onPress={onPress}>
        <StyledImage source={{ uri: product.imageUrl }} />
        <Description>
          <Text marginBottom={2}>{product.name}</Text>
          <Text size={12} numberOfLines={1} variant="600">
            {formatCurrency(product.price)}
          </Text>
        </Description>
      </ProductContainer>
    );
  }

  return (
    <ProductContainerLarge marginRight={marginRight} onPress={onPress}>
      <StyledImageLarge source={{ uri: product.imageUrl }} />
      <Description>
        <TitleRow>
          <Text>{product.name}</Text>
          <Text size={fonts.subhead} variant="600">
            {formatCurrency(product.price)}
          </Text>
        </TitleRow>
        <Text variant="300" size={fonts.caption1}>
          {product.sellerLocation}
        </Text>
      </Description>
    </ProductContainerLarge>
  );
}

type ProductContainerProps = Pick<Props, 'marginRight'>;

const ProductContainer = styled.TouchableOpacity<ProductContainerProps>`
  align-self: flex-start;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  width: ${cards.productWidth}px;
`;

const ProductContainerLarge = styled.TouchableOpacity<ProductContainerProps>`
  align-self: flex-start;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  width: ${cards.productWidthLarge}px;
`;

const StyledImage = styled.Image`
  width: '100%';
  height: ${cards.productHeight}px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const StyledImageLarge = styled.Image`
  width: '100%';
  height: ${cards.productWidthLarge}px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Description = styled.View``;

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2px;
`;
