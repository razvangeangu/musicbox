/**
 *
 * AppleMusicResults
 *
 */
import MusicItem from 'app/components/MusicItem';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

export interface AppleMusicResultsProps {
  itemTitle?: string;
}

export function AppleMusicResults({ itemTitle }: AppleMusicResultsProps) {
  const [songs, setSongs] = useState<MusicKit.Songs[]>();

  useEffect(() => {
    (async () => {
      if (!itemTitle) return;

      const music = MusicKit.getInstance();

      const params = new URLSearchParams({
        term: itemTitle,
        types: ['songs'].toString(),
      });
      const response = await (music.api as any).music(
        `/v1/catalog/${music.storefrontId}/search?${params.toString()}`,
      );

      setSongs(response?.results?.songs?.data);
    })();
  }, [itemTitle]);

  const didClickItem = async (song: MusicKit.Songs) => {
    const music = MusicKit.getInstance();
    await music.setQueue({ song: song.id });
    if (music.playbackState !== MusicKit.PlaybackState.PLAYING) {
      music.play();
    }
  };

  const didClickPreview = (previews?: MusicKit.Preview[]) => {
    if (!previews) return;

    const audio = new Audio(previews[0].url);
    audio.play();
  };

  return (
    <Container>
      {songs?.map(song => (
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
    </Container>
  );
}

const Container = styled.div``;
