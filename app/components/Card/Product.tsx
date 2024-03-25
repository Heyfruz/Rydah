import styled from 'styled-components/native';
import { Feather as Icon } from '@expo/vector-icons';

import { Text } from '../General';

import { layout, pallets } from 'constant';
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
        <ImageContainer>
          <StyledImage source={{ uri: product.imageUrl }} />
          <PlaceholderImage>
            <Icon name="image" color={pallets.primary} size={32} />
          </PlaceholderImage>
        </ImageContainer>
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
      <ImageContainerLarge>
        <StyledImageLarge source={{ uri: product.imageUrl }} />
        <PlaceholderImageLarge>
          <Icon name="image" color={pallets.primary} size={32} />
        </PlaceholderImageLarge>
      </ImageContainerLarge>
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
  z-index: 1;
`;

const StyledImageLarge = styled.Image`
  width: '100%';
  height: ${cards.productWidthLarge}px;
  border-radius: 4px;
  margin-bottom: 8px;
  z-index: 1;
`;

const Description = styled.View``;

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2px;
`;

const PlaceholderImage = styled.View`
  width: '100%';
  height: ${cards.productHeight}px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background-color: ${pallets.grey};
`;

const PlaceholderImageLarge = styled.View`
  width: '100%';
  height: ${cards.productWidthLarge}px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background-color: ${pallets.grey};
`;

const ImageContainer = styled.View`
  width: '100%';
  height: ${cards.productHeight}px;
  border-radius: 4px;
  margin-bottom: 8px;
  overflow: hidden;
`;

const ImageContainerLarge = styled.View`
  width: '100%';
  height: ${cards.productWidthLarge}px;
  border-radius: 4px;
  margin-bottom: 8px;
  overflow: hidden;
`;
