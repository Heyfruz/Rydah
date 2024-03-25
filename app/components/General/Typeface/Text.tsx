import styled from 'styled-components/native';

import { FontName, Props } from './types';

import { layout, pallets } from 'constant';

const { fonts } = layout;

export const Text = styled.Text<Props>`
  color: ${props => props.color || pallets.text};
  font-family: ${props => {
    let fontFamily: FontName = 'SpaceGrotesk-Regular';

    switch (props.variant) {
      case '300':
        fontFamily = 'SpaceGrotesk-Light';
        break;
      case '400':
        fontFamily = 'SpaceGrotesk-Regular';
        break;
      case '500':
        fontFamily = 'SpaceGrotesk-Medium';
        break;
      case '600':
        fontFamily = 'SpaceGrotesk-SemiBold';
        break;
      case '700':
        fontFamily = 'SpaceGrotesk-Bold';
        break;
      default:
        fontFamily = 'SpaceGrotesk-Regular';
    }

    return fontFamily;
  }};
  font-size: ${props => props.size || fonts.body}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  ${props => (props.lineHeight ? `line-height: ${props.lineHeight};` : '')}
  ${props =>
    props.textTransform ? `text-transform: ${props.textTransform};` : ''}
`;
