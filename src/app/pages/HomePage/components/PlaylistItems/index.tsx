/**
 *
 * PlaylistItems
 *
 */
import { youtube, YOUTUBE_NO_THUMB_URL } from 'api';
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { ReactComponent as ContextMenuSvg } from './assets/context-menu.svg';

export interface PlaylistItemsProps {
  playlistId?: string;
}

export function PlaylistItems({ playlistId }: PlaylistItemsProps) {
  const { t } = useTranslation();

  const [playlistItems, setPlaylistItems] =
    useState<gapi.client.youtube.PlaylistItemListResponse | null>();

  useEffect(() => {
    (async () => {
      if (!playlistId) return;

      const response = await youtube.getMyPlaylistItems(playlistId);

      setPlaylistItems(response);
    })();
  }, [playlistId]);

  return (
    <Container>
      {playlistItems?.items?.map(playlistItem => (
        <PlaylistItem key={playlistItem.id} tabIndex={0}>
          <PlaylistItemThumb
            src={
              playlistItem.snippet?.thumbnails?.default?.url ||
              YOUTUBE_NO_THUMB_URL
            }
            alt={t(translations.thumbnail)}
          />
          <PlaylistItemTitle>{playlistItem.snippet?.title}</PlaylistItemTitle>
          <PlaylistContextMenuButton type="button">
            <PlaylistContextMenuIcon as={ContextMenuSvg} />
          </PlaylistContextMenuButton>
        </PlaylistItem>
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

const PlaylistItem = styled.div`
  align-content: center;
  align-items: center;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  outline: none !important;
  padding: 0.375rem 0.5rem;
  text-align: left;

  &:hover {
    background-color: var(--tracklistHoverColor);
  }
`;

const PlaylistItemThumb = styled.img`
  background-size: cover;
  border-radius: 0.25rem;
  height: 2rem;
  margin-right: 0.625rem;
  width: 2rem !important;
`;

const PlaylistItemTitle = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlaylistContextMenuButton = styled.button``;

const PlaylistContextMenuIcon = styled.svg`
  fill: var(--keyColor);
`;
