import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import { Text } from '../General';

import { useHeaderHeight } from 'hooks';
import { layout, pallets } from 'constant';

const { fonts, spacing } = layout;

interface Props {
  backgroundColor?: string;
  handleCloseIcon?: () => void;
  hideLeftComp?: boolean;
  itemColor?: string;
  leftLabel?: string;
  leftLabelOption?: {
    variant: Pick<React.ComponentProps<typeof Text>, 'variant'>['variant'];
    size: number;
  };
  onLeftLabelPress?: () => void;
  onRightLabelPress?: () => void;
  rightLabel?: string;
  showCloseIcon?: boolean;
  title: string;
}

type ExtendedProps = Pick<
  Props,
  | 'handleCloseIcon'
  | 'hideLeftComp'
  | 'itemColor'
  | 'leftLabel'
  | 'leftLabelOption'
  | 'onLeftLabelPress'
  | 'showCloseIcon'
>;

interface BackProps extends ExtendedProps {
  canGoBack: boolean;
  handleBack: () => void;
  showCloseIcon?: boolean;
}

type ExtendProps = Omit<
  Props,
  'title' | 'backgroundColor' | 'rightLabel' | 'onRightLabelPress'
>;

interface BackProps extends ExtendProps {
  canGoBack: boolean;
  handleBack: () => void;
}

const TopPadding = styled.View<{
  backgroundColor?: string;
  insetsTop: number;
}>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};
  height: ${({ insetsTop }) => insetsTop}px;
`;

const HeaderContent = styled.View<{
  backgroundColor?: string;
  headerHeight: number;
  insetsTop: number;
  paddingHorizontal: number;
}>`
  align-items: center;
  flex-direction: row;
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: ${({ headerHeight, insetsTop }) => headerHeight - insetsTop}px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${pallets.border};
`;

const HeaderActions = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleBox = styled.View`
  align-items: center;
  height: 100%;
  justify-content: center;
  left: ${spacing.padding}px;
  position: absolute;
  width: 100%;
  z-index: -1;
`;

const BackTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export default function Header({
  title,
  showCloseIcon,
  handleCloseIcon,
  leftLabel,
  hideLeftComp,
  itemColor,
  rightLabel,
  onLeftLabelPress,
  backgroundColor,
  onRightLabelPress,
  leftLabelOption,
}: Props): JSX.Element {
  const { insets, headerHeight } = useHeaderHeight();
  const navigation = useNavigation();

  const handleBack = () => navigation.canGoBack() && navigation.goBack();
  const canGoBack = navigation.canGoBack();

  return (
    <>
      <TopPadding backgroundColor={backgroundColor} insetsTop={insets.top} />
      <HeaderContent
        backgroundColor={backgroundColor}
        headerHeight={headerHeight}
        insetsTop={insets.top}
        paddingHorizontal={spacing.padding}>
        <HeaderActions>
          <Back
            {...{
              canGoBack,
              handleBack,
              handleCloseIcon,
              hideLeftComp,
              itemColor,
              leftLabel,
              leftLabelOption,
              onLeftLabelPress,
              showCloseIcon,
            }}
          />
          {Boolean(rightLabel) && (
            <TouchableOpacity activeOpacity={0.7} onPress={onRightLabelPress}>
              <Text
                variant="600"
                size={fonts.subhead}
                color={itemColor || pallets.text}>
                {rightLabel || 'Go'}
              </Text>
            </TouchableOpacity>
          )}
        </HeaderActions>
        <TitleBox>
          <Text variant="700" size={fonts.body} color={itemColor}>
            {title}
          </Text>
        </TitleBox>
      </HeaderContent>
    </>
  );
}

const Back = ({
  canGoBack,
  handleBack,
  hideLeftComp,
  showCloseIcon,
  handleCloseIcon,
  itemColor,
  onLeftLabelPress,
  leftLabel,
  leftLabelOption,
}: BackProps): JSX.Element => {
  if (hideLeftComp) {
    return <View />;
  }

  if (leftLabel) {
    return (
      <BackTouchable activeOpacity={0.7} onPress={onLeftLabelPress}>
        <Text
          variant={leftLabelOption?.variant || '500'}
          size={leftLabelOption?.size || fonts.subhead}
          color={itemColor || pallets.primary}>
          {leftLabel}
        </Text>
      </BackTouchable>
    );
  }

  if (canGoBack && !showCloseIcon) {
    return (
      <BackTouchable activeOpacity={0.7} onPress={handleBack}>
        <Text
          variant="500"
          size={fonts.subhead}
          color={itemColor || pallets.primary}>
          Back
        </Text>
      </BackTouchable>
    );
  }

  if (showCloseIcon) {
    return (
      <BackTouchable
        activeOpacity={0.7}
        onPress={() => {
          handleCloseIcon ? handleCloseIcon() : handleBack();
        }}>
        <Icon name="x" size={20} color={itemColor || pallets.darkGrey} />
      </BackTouchable>
    );
  }

  return <View />;
};
