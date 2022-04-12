/**
 *
 * MusicItem
 *
 */
import { YOUTUBE_NO_THUMB_URL } from 'api/youtube';
import { translations } from 'locales/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { ReactComponent as AddSvg } from './assets/add.svg';
import { ReactComponent as PlaySvg } from './assets/play-button.svg';

export interface MusicItemProps {
  className?: string;
  name: string;
  thumbnailUrl?: string;
  onClickItem?: () => void;
  onClickPreview?: () => void;
  onClickAddToPlaylist?: () => void;
}

export default function MusicItem({
  className,
  name,
  thumbnailUrl,
  onClickItem,
  onClickPreview,
  onClickAddToPlaylist,
}: MusicItemProps) {
  const { t } = useTranslation();

  const didClickItem = () => {
    onClickItem?.();
  };

  const didClickPreview: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();

    onClickPreview?.();
  };

  const didClickAddToPlaylistButton: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    event.stopPropagation();

    onClickAddToPlaylist?.();
  };

  return (
    <PlaylistItem className={className} tabIndex={0} onClick={didClickItem}>
      <PlaylistPreview>
        <PlaylistItemThumb
          // TODO: change to generic no thumb
          src={thumbnailUrl || YOUTUBE_NO_THUMB_URL}
          alt={t(translations.thumbnail)}
        />
        {onClickPreview && (
          <PlaylistPreviewButton type="button" onClick={didClickPreview}>
            <PlaylistPlayIcon as={PlaySvg} />
          </PlaylistPreviewButton>
        )}
      </PlaylistPreview>
      <PlaylistItemTitle>{name}</PlaylistItemTitle>
      {onClickAddToPlaylist && (
        <PlaylistContextButton
          type="button"
          onClick={didClickAddToPlaylistButton}
        >
          <PlaylistContextIcon as={AddSvg} />
        </PlaylistContextButton>
      )}
    </PlaylistItem>
  );
}

const PlaylistPreview = styled.div`
  margin-right: 0.625rem;
  position: relative;
`;

const PlaylistPreviewButton = styled.button`
  align-items: center;
  border-radius: 0.25rem;
  bottom: 0;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  visibility: hidden;
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

    ${PlaylistPreviewButton} {
      background-color: rgba(0, 0, 0, 0.45);
      visibility: visible;
    }
  }
`;

const PlaylistItemThumb = styled.img`
  background-size: cover;
  border-radius: 0.25rem;
  height: 2rem;
  width: 2rem !important;
`;

const PlaylistItemTitle = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlaylistContextButton = styled.button``;

const PlaylistContextIcon = styled.svg`
  fill: var(--keyColor);
`;

const PlaylistPlayIcon = styled.svg`
  fill: #fff;
`;
