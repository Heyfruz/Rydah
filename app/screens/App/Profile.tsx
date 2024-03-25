import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { transactions } from './Data';

import {
  Container,
  Header,
  ProductCard,
  Section,
  Text,
  TransactionCard,
  UserIcon,
  VirtualScroll,
} from 'components';
import { layout, pallets } from 'constant';
import { setAuthenticated, useDispatch, useSelector } from 'store';

const { spacing, cards } = layout;

export default function Profile(): JSX.Element {
  const dispatch = useDispatch();
  const { product } = useSelector(state => state.product);

  const myProducts = product.slice(0, 3);

  return (
    <>
      <Header
        hideLeftComp
        title="My Profile"
        itemColor={pallets.black}
        rightLabel="Log Out"
        onRightLabelPress={() => {
          dispatch(setAuthenticated(false));
        }}
      />
      <VirtualScroll>
        <Container padding={0} paddingVertical={spacing.padding}>
          <NameContainer>
            <UserIcon />
            <Name>
              <Text
                variant="500"
                color={pallets.text}
                size={16}
                textTransform="capitalize">
                Janice Lou
              </Text>
              <Text variant="500" color={pallets.text} size={12}>
                Janicelou@gmail.com
              </Text>
            </Name>
          </NameContainer>
          <Section label="On Sale" />
          <FlatList
            data={myProducts}
            decelerationRate="fast"
            horizontal
            ListFooterComponent={<Separator />}
            ListHeaderComponent={<Separator />}
            snapToInterval={cards.productWidth + spacing.padding}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const last = index === myProducts.length - 1;

              return (
                <ProductCard
                  product={item}
                  variant="small"
                  marginRight={last ? 0 : 16}
                  onPress={() => {
                    console.log(item.id);
                  }}
                />
              );
            }}
          />
          <Section label="Transactions" />
          <FlatList
            data={transactions}
            style={{ paddingHorizontal: spacing.padding }}
            renderItem={({ item, index }) => {
              const last = index === transactions.length - 1;

              return (
                <TransactionCard
                  transaction={item}
                  variant="transaction"
                  marginBottom={last ? 0 : 8}
                  onPress={() => {
                    console.log(item);
                  }}
                />
              );
            }}
          />
          <Section label="Reviews" />
          <FlatList
            data={transactions.filter(i => i.status !== 'purchased')}
            style={{ paddingHorizontal: spacing.padding }}
            renderItem={({ item, index }) => {
              const last = index === transactions.length - 1;

              return (
                <TransactionCard
                  transaction={item}
                  variant="review"
                  marginBottom={last ? 0 : 8}
                  onPress={() => {
                    console.log(item);
                  }}
                />
              );
            }}
          />
        </Container>
      </VirtualScroll>
    </>
  );
}

const Separator = styled.View`
  width: ${spacing.padding}px;
`;

const NameContainer = styled.View`
  flex-direction: row;
  padding: 0 20px;
`;

const Name = styled.View`
  margin-left: 12px;
  justify-content: center;
`;
