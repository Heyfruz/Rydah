import styled from 'styled-components/native';
import { Feather as Icon } from '@expo/vector-icons';

import { pallets } from 'constant';

interface Props {
  size?: number;
  marginRight?: number;
}

export default function User({
  size = 50,
  marginRight,
}: Props): JSX.Element | null {
  return (
    <UserImage size={size} marginRight={marginRight}>
      <Icon name="user" size={size / 2 - 1} color={pallets.white} />
    </UserImage>
  );
}

const UserImage = styled.View<Props>`
  align-items: center;
  background-color: ${pallets.primary};
  border-radius: 10px;
  height: ${({ size }) => size}px;
  justify-content: center;
  overflow: hidden;
  width: ${({ size }) => size}px;
  margin-right: ${({ marginRight }) => marginRight}px;
`;
