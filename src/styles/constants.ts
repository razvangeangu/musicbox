import { css } from 'styled-components/macro';

export const NAV_BAR_SIZE = 59.5;

export const FOOTER_SIZE = 60;

export const MAX_HORIZONTAL_WIDTH = 1024;

export const backdropFilter = css`
  background-color: var(--playerBackground);

  @supports ((-webkit-backdrop-filter: initial) or (backdrop-filter: initial)) {
    backdrop-filter: saturate(50%) blur(20px);
  }
`;
