/**
 *
 * AppleMusicResults
 *
 */
import { music } from 'api';
import MusicItem from 'app/components/MusicItem';
import ProgressIndicator from 'app/components/ProgressIndicator';
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

export interface AppleMusicResultsProps {
  itemTitle?: string;
}

export function AppleMusicResults({ itemTitle }: AppleMusicResultsProps) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const [statusText, setStatusText] = useState<string>(
    t(translations.appleMusicResults.initialStatusText),
  );

  const [songs, setSongs] = useState<MusicKit.Songs[]>();

  useEffect(() => {
    (async () => {
      if (!itemTitle) return;
      setIsLoading(true);

      const response = await music.search(itemTitle, ['songs']);

      setIsLoading(false);
      setSongs(response?.data?.results?.songs?.data);
      setStatusText(
        response?.data?.results?.songs?.data
          ? ''
          : t(translations.appleMusicResults.noResultsFound),
      );
    })();
  }, [itemTitle, t]);

  const didClickItem = async (song: MusicKit.Songs) => {
    const instance = MusicKit.getInstance();
    await instance.setQueue({ song: song.id });
    if (instance.playbackState !== MusicKit.PlaybackState.PLAYING) {
      instance.play();
    }
  };

  const didClickPreview = (previews?: MusicKit.Preview[]) => {
    if (!previews) return;

    const audio = new Audio(previews[0].url);
    audio.play();
  };

  return (
    <Container>
      <MusicResults>
        <Header>{t(translations.appleMusicResults.header)}</Header>

        {isLoading && (
          <ProgressIndicatorContainer>
            <ProgressIndicator />
          </ProgressIndicatorContainer>
        )}

        {!isLoading &&
          songs &&
          songs.map(song => (
            <MusicItem
              key={song.id}
              name={`${song.attributes!.artistName} - ${song.attributes!.name}`}
              thumbnailUrl={song.attributes?.artwork.url
                .replace('{w}', '56')
                .replace('{h}', '56')}
              onClickItem={() => didClickItem(song)}
              onClickPreview={() => didClickPreview(song.attributes?.previews)}
            />
          ))}

        {!isLoading && !songs && <span>{statusText}</span>}
      </MusicResults>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 2rem 1.25rem;
`;

const ProgressIndicatorContainer = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
`;

const Header = styled.h2`
  padding-bottom: 0.5rem;
`;

const MusicResults = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  min-height: 6.25rem;
  position: relative;
  width: 100%;
`;
