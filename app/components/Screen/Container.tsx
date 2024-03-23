import React from 'react';
import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

import { layout } from 'constant';

const { padding } = layout.spacing;

interface ContainerProps extends ViewProps {
  children?: React.ReactNode;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  backgroundColor?: string;
  paddingTop?: number;
  paddingBottom?: number;
}

// Create a styled component that replaces the View and accepts ContainerProps
const StyledContainer = styled.View<ContainerProps>`
  flex: 1;
  padding: ${padding}px;
  padding-top: ${({ paddingTop }) => paddingTop || 0}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom || 0}px;
  /* padding-top: 30px; */
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
`;

export default function Container({
  alignItems = 'flex-start', // Provide a default value to align items
  children,
  paddingTop,
  paddingBottom,
  backgroundColor,
  ...props
}: ContainerProps): JSX.Element {
  return (
    <StyledContainer
      alignItems={alignItems}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      backgroundColor={backgroundColor}
      {...props}>
      {children}
    </StyledContainer>
  );
}
