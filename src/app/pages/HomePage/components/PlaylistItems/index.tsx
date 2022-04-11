/**
 *
 * PlaylistItems
 *
 */
import { youtube } from 'api';
import MusicItem from 'app/components/MusicItem';
import ProgressIndicator from 'app/components/ProgressIndicator';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

export interface PlaylistItemsProps {
  playlistId?: string;
  onItemSelected?: (item: gapi.client.youtube.PlaylistItem) => void;
}

export function PlaylistItems({
  playlistId,
  onItemSelected,
}: PlaylistItemsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [playlistItems, setPlaylistItems] =
    useState<gapi.client.youtube.PlaylistItemListResponse | null>();

  useEffect(() => {
    (async () => {
      if (!playlistId) return;

      setIsLoading(true);

      const response = await youtube.getMyPlaylistItems(playlistId);

      setPlaylistItems(response);
      setIsLoading(false);
    })();
  }, [playlistId]);

  const didClickItem = (item: gapi.client.youtube.PlaylistItem) => {
    onItemSelected?.(item);
  };

  return (
    <Container>
      {isLoading && (
        <ProgressIndicatorContainer>
          <ProgressIndicator />
        </ProgressIndicatorContainer>
      )}

      {playlistItems?.items?.map(playlistItem => (
        <MusicItem
          name={playlistItem.snippet?.title!}
          thumbnailUrl={playlistItem.snippet?.thumbnails?.default?.url}
          key={playlistItem.id}
          onClickItem={() => didClickItem(playlistItem)}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  width: 100%;
`;

const ProgressIndicatorContainer = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
`;
