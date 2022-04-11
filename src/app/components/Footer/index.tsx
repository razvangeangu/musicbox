/**
 *
 * Footer
 *
 */
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { backdropFilter } from 'styles/constants';
import { selectThemeKey } from 'styles/theme/slice';
import { isSystemDark } from 'styles/theme/utils';

export function Footer() {
  const theme = useSelector(selectThemeKey);
  const selectedTheme =
    // eslint-disable-next-line no-nested-ternary
    theme === 'system' ? (isSystemDark ? 'dark' : 'light') : theme;

  return (
    <Container>
      <apple-music-playback-controls theme={selectedTheme} />
      <apple-music-progress theme={selectedTheme} />
    </Container>
  );
}

const Container = styled.footer`
  align-content: center;
  align-items: center;
  border-top: 0.0313rem solid var(--labelDivider);
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 1rem 0.3125rem;
  position: fixed;
  width: 100%;
  z-index: 99;

  apple-music-playback-controls {
    margin: 0 0 0.6875rem;
    margin-right: 1rem;
  }

  apple-music-progress {
    margin-right: 1rem;
    width: 100%;
  }

  ${backdropFilter}
`;
