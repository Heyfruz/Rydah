import styled from 'styled-components/native';

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
      <StyledImage source={{ uri: category.imageUrl }} />
      <Overlay>
        <Text color={pallets.primary} variant="700" textTransform="uppercase">
          {category.name}
        </Text>
      </Overlay>
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
