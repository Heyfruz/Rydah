import styled from 'styled-components/native';

import { Text } from '../General';

import { layout } from 'constant';

const { spacing, fonts } = layout;

interface Props {
  label: string;
  padding?: number;
  paddingVertical?: number;
}

export default function Section({
  label,
  padding = spacing.padding,
  paddingVertical,
}: Props): JSX.Element {
  return (
    <SectionContainer padding={padding} paddingVertical={paddingVertical}>
      <Text variant="600" size={fonts.title3}>
        {label}
      </Text>
    </SectionContainer>
  );
}

const SectionContainer = styled.View<{
  padding: number;
  paddingVertical?: number;
}>`
  padding: ${({ padding, paddingVertical }) =>
      (paddingVertical || padding) * 1.5}px
    ${({ padding }) => padding}px;
`;
