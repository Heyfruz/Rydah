import styled from 'styled-components/native';

import { Text } from '../General';
import { UserIcon } from '../Element';

import { layout, pallets } from 'constant';
import { formatCurrency } from 'utils';

const { window, spacing, fonts } = layout;

interface Props {
  transaction: Transaction;
  onPress: () => void;
  marginBottom?: number;
  variant: 'transaction' | 'review';
}

export default function Transaction({
  transaction,
  marginBottom,
  variant,
  onPress,
}: Props): JSX.Element {
  if (variant === 'review') {
    return (
      <Container onPress={onPress} marginBottom={marginBottom}>
        <ImageContainer>
          <UserIcon size={30} marginRight={8} />
          <DescriptionContainer>
            <Text marginBottom={2} size={fonts.subhead}>
              {transaction.feedback}
            </Text>
            <Text color={pallets.darkGrey} size={fonts.caption1}>
              {transaction.customerName}
            </Text>
          </DescriptionContainer>
        </ImageContainer>
        <PriceContainer>
          <Text
            color={
              transaction.status === 'purchased' ? pallets.red : pallets.green
            }
            size={fonts.subhead}
            variant="600">
            {formatCurrency(transaction.price)}
          </Text>
        </PriceContainer>
      </Container>
    );
  }

  return (
    <Container onPress={onPress} marginBottom={marginBottom}>
      <ImageContainer>
        <Image source={{ uri: transaction.imageUrl }} />
        <DescriptionContainer>
          <Text marginBottom={2} size={fonts.subhead}>
            {transaction.productName}
          </Text>
          <Text
            color={pallets.darkGrey}
            textTransform="uppercase"
            size={fonts.caption1}>
            {transaction.category}
          </Text>
        </DescriptionContainer>
      </ImageContainer>
      <PriceContainer>
        <Text
          color={
            transaction.status === 'purchased' ? pallets.red : pallets.green
          }
          size={fonts.subhead}
          variant="600">
          {formatCurrency(transaction.price)}
        </Text>
      </PriceContainer>
    </Container>
  );
}

type ContainerProps = Pick<Props, 'marginBottom'>;

const Container = styled.TouchableOpacity<ContainerProps>`
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  border-width: 1.5px;
  width: ${window.width - spacing.padding * 2}px;
  border-color: ${pallets.primary};
  padding: 8px 12px;
  flex-direction: row;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 4px;
  margin-right: 8px;
`;

const ImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const DescriptionContainer = styled.View`
  flex: 1;
`;

const PriceContainer = styled.View`
  /* flex: 1; */
`;
