import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { categories } from './Data';

import {
  CategoryCard,
  Container,
  Header,
  ProductCard,
  Section,
  VirtualScroll,
} from 'components';
import { layout } from 'constant';
import { AppRoutes, RootNavigationProp, TabRoutes } from 'navigation';
import { useSelector } from 'store';

const { fonts, spacing, cards } = layout;

export default function Dashboard({
  navigation,
}: RootNavigationProp<AppRoutes, TabRoutes, 'Dashboard'>): JSX.Element {
  const { product } = useSelector(state => state.product);

  const latest = product.slice(0, 5);
  const hot = product.slice(5);

  return (
    <>
      <Header
        leftLabel="RYDAH"
        leftLabelOption={{ size: fonts.title3, variant: '700' }}
        title=""
      />
      <VirtualScroll>
        <Container padding={0} paddingVertical={spacing.padding}>
          <Section label="Latest Items" />
          <FlatList
            data={latest}
            decelerationRate="fast"
            horizontal
            ListFooterComponent={<Separator />}
            ListHeaderComponent={<Separator />}
            snapToInterval={cards.productWidth + 16}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const last = index === latest.length - 1;

              return (
                <ProductCard
                  product={item}
                  variant="small"
                  marginRight={last ? 0 : 16}
                  onPress={() => {
                    navigation.navigate('DashboardStack', {
                      params: { product: item },
                      screen: 'Product',
                    });
                  }}
                />
              );
            }}
          />
          <Section label="Categories" />
          <FlatList
            data={categories}
            decelerationRate="fast"
            horizontal
            ListFooterComponent={<Separator />}
            ListHeaderComponent={<Separator />}
            snapToInterval={cards.categoryWidth + 16}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const last = index === categories.length - 1;

              return (
                <CategoryCard
                  category={item}
                  marginRight={last ? 0 : 16}
                  onPress={() => {
                    console.log(item.id);
                  }}
                />
              );
            }}
          />
          <Section label="Trending" />
          <FlatList
            data={hot}
            decelerationRate="fast"
            horizontal
            ListFooterComponent={<Separator />}
            ListHeaderComponent={<Separator />}
            snapToInterval={cards.productWidthLarge + 16}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const last = index === hot.length - 1;

              return (
                <ProductCard
                  product={item}
                  variant="large"
                  marginRight={last ? 0 : 16}
                  onPress={() => {
                    navigation.navigate('DashboardStack', {
                      params: { product: item },
                      screen: 'Product',
                    });
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
