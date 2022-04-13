/**
 *
 * Footer
 *
 */
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { backdropFilter } from 'styles/constants';
import { selectThemeKey } from 'styles/theme/slice';
import { isSystemDark } from 'styles/theme/utils';

export function Footer() {
  const { t } = useTranslation();
  const theme = useSelector(selectThemeKey);
  const selectedTheme =
    // eslint-disable-next-line no-nested-ternary
    theme === 'system' ? (isSystemDark ? 'dark' : 'light') : theme;

  const [mediaItems, setMediaItems] = useState<MusicKit.MediaItem[]>([]);

  const queueItemsDidChange = queue => {
    setMediaItems(queue as MusicKit.MediaItem[]);
  };

  useEffect(() => {
    MusicKit.getInstance()?.addEventListener(
      'queueItemsDidChange',
      queueItemsDidChange,
    );

    return () => {
      MusicKit.getInstance()?.removeEventListener(
        'queueItemsDidChange',
        queueItemsDidChange as any,
      );
    };
  });

  return (
    <Container>
      <apple-music-playback-controls theme={selectedTheme} />
      <ProgressContainer>
        <CurrentMediaItem>
          {mediaItems?.[0]
            ? `${mediaItems?.[0]?.artistName} - ${mediaItems?.[0]?.title}`
            : t(translations.footer.notPlaying)}
        </CurrentMediaItem>
        <apple-music-progress theme={selectedTheme} />
      </ProgressContainer>
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
  padding: 0.5rem 1rem;
  position: fixed;
  width: 100%;
  z-index: 99;

  apple-music-playback-controls {
    margin-right: 1rem;
  }

  apple-music-progress {
    width: 100%;
  }

  ${backdropFilter}
`;

const CurrentMediaItem = styled.span`
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const ProgressContainer = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  width: 100%;
`;
