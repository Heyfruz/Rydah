import styled from 'styled-components/native';
import { Feather as Icon } from '@expo/vector-icons';

import { Text } from '../General';

import { layout, pallets } from 'constant';

interface Props {
  category: Category;
  marginRight?: number;
  onPress: () => void;
}

const { cards } = layout;

export default function Category({
  category,
  onPress,
  marginRight,
}: Props): JSX.Element | null {
  return (
    <CategoryContainer {...{ marginRight, onPress }}>
      <DetailsContainer>
        <StyledImage source={{ uri: category.imageUrl }} />
        <Overlay>
          <Text color={pallets.primary} variant="700" textTransform="uppercase">
            {category.name}
          </Text>
        </Overlay>
      </DetailsContainer>
      <PlaceholderImage>
        <Icon name="image" color={pallets.primary} size={32} />
      </PlaceholderImage>
    </CategoryContainer>
  );
}

type CategoryContainerProps = Pick<Props, 'marginRight'>;

const CategoryContainer = styled.TouchableOpacity<CategoryContainerProps>`
  align-self: flex-start;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  width: ${cards.categoryWidth}px;
  height: ${cards.categoryHeight}px;
  border-radius: 4px;
  overflow: hidden;
`;

const PlaceholderImage = styled.View`
  width: ${cards.categoryWidth}px;
  height: ${cards.categoryHeight}px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background-color: ${pallets.grey};
`;

const StyledImage = styled.Image`
  flex: 1;
`;

const Overlay = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: #00000066;
`;

const DetailsContainer = styled.View`
  z-index: 1;
  flex: 1;
`;
