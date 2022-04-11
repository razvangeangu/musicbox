/**
 *
 * PlaylistItems
 *
 */
import { youtube } from 'api';
import MusicItem from 'app/components/MusicItem';
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
  const [playlistItems, setPlaylistItems] =
    useState<gapi.client.youtube.PlaylistItemListResponse | null>();

  useEffect(() => {
    (async () => {
      if (!playlistId) return;

      const response = await youtube.getMyPlaylistItems(playlistId);

      setPlaylistItems(response);
    })();
  }, [playlistId]);

  const didClickItem = (item: gapi.client.youtube.PlaylistItem) => {
    onItemSelected?.(item);
  };

  return (
    <Container>
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
  position: absolute;
  width: 100%;
`;
