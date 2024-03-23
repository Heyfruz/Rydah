import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

interface FooterProps {
  style?: ViewStyle;
  children: React.ReactNode;
  alignItems?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | undefined;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  flex?: number;
  paddingBottom?: number;
}

// StyledFooter replaces the View component, directly incorporating style props
const StyledFooter = styled.View<FooterProps>`
  flex: ${({ flex }) => flex ?? 1};
  width: 100%;
  align-items: ${({ alignItems }) => alignItems ?? 'stretch'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-end'};
  padding-bottom: ${({ paddingBottom }) => paddingBottom ?? 0}px;
`;

function Footer({
  children,
  style,
  alignItems,
  justifyContent = 'flex-end',
  flex = 1,
  paddingBottom = 16,
}: FooterProps): JSX.Element {
  return (
    <StyledFooter
      style={style} // Allows custom styles to be passed in and applied
      alignItems={alignItems}
      justifyContent={justifyContent}
      flex={flex}
      paddingBottom={paddingBottom}>
      {children}
    </StyledFooter>
  );
}

export default Footer;
