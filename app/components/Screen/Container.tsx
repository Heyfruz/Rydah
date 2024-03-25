import React from 'react';
import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

import { layout } from 'constant';

const { spacing } = layout;

interface ContainerProps extends ViewProps {
  children?: React.ReactNode;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  backgroundColor?: string;
  paddingVertical?: number;
  padding?: number;
}

export default function Container({
  alignItems = 'flex-start', // Provide a default value to align items
  children,
  backgroundColor,
  padding,
  paddingVertical,
  ...props
}: ContainerProps): JSX.Element {
  return (
    <StyledContainer
      alignItems={alignItems}
      paddingVertical={paddingVertical}
      padding={padding}
      backgroundColor={backgroundColor}
      {...props}>
      {children}
    </StyledContainer>
  );
}

// Styled component View that accepts ContainerProps
const StyledContainer = styled.View<ContainerProps>`
  flex: 1;
  padding: ${({ padding }) => padding ?? spacing.padding}px;
  padding-top: ${({ paddingVertical }) => paddingVertical || 0}px;
  padding-bottom: ${({ paddingVertical }) => paddingVertical || 0}px;
  /* padding-top: 30px; */
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
`;
