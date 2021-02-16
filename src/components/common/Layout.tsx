import styled from 'styled-components';
import { screenSize, ScreenSize, device, DeviceSize } from '../../theme';

export const Section = styled.section<{ margin?: string }>`
  width: 100vw;
  margin-top: ${p => (p.margin ? p.margin : '1rem')};
  margin-bottom: ${p => (p.margin ? p.margin : '1rem')};
`;

export const Container = styled.div<{ size?: ScreenSize }>`
  max-width: ${p => (p.size ? screenSize[p.size] : screenSize.md)};
  margin: auto;
`;

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HorizontalCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const VerticalCenter = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export interface RowProps {
  breakpoint?: DeviceSize;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
}

export type AlignItems = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline' | 'inherit';

export type JustifyContent =
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline'
  | 'inherit';

export const Row = styled.div<RowProps>`
  width: 100%;
  display: flex;
  justify-content: ${p => p.justifyContent};
  align-items: ${p => p.alignItems ?? 'center'};

  @media ${p => (p.breakpoint ? device[p.breakpoint] : null)} {
    flex-direction: ${p => p.breakpoint && 'column'};
  }
`;

export const Column = styled.div`
  flex: 1;
`;
