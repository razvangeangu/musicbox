/**
 *
 * HomePage
 *
 */
import { youtube } from 'api';
import { ProgressIndicator } from 'app/components/ProgressIndicator';
import { AppleMusicResults } from 'app/pages/HomePage/components/AppleMusicResults';
import { PlaylistItems } from 'app/pages/HomePage/components/PlaylistItems';
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Carousel, CarouselProps } from 'react-responsive-carousel';
import styled, { css } from 'styled-components/macro';

export function HomePage() {
  const { t } = useTranslation();

  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);

  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState<number>(0);

  const [selectedPlaylistItem, setSelectedPlaylistItem] =
    useState<gapi.client.youtube.PlaylistItem>();

  const [playlists, setPlaylists] =
    useState<gapi.client.youtube.PlaylistListResponse | null>();

  useEffect(() => {
    (async () => {
      setIsLoadingPlaylists(true);
      const response = await youtube.getMyPlaylists();
      setPlaylists(response);
      setIsLoadingPlaylists(false);
    })();
  }, []);

  const didChangeCarousel: CarouselProps['onChange'] = index => {
    setSelectedCarouselIndex(index);
  };

  const didSelectPlaylistItem = (item: gapi.client.youtube.PlaylistItem) => {
    setSelectedPlaylistItem(item);
  };

  return (
    <>
      <Helmet>
        <title>{t(translations.routes.home)}</title>
      </Helmet>

      <Background
        src={
          playlists?.items?.[selectedCarouselIndex]?.snippet?.thumbnails
            ?.standard?.url ||
          playlists?.items?.[selectedCarouselIndex]?.snippet?.thumbnails
            ?.default?.url
        }
      />
      <BackgroundContainer />

      <Container>
        <FlexContainer>
          <SizedContainer>
            <h2>{t(translations.youtubeResults.header)}</h2>
            <span>{t(translations.appleMusicResults.initialStatusText)}</span>

            {isLoadingPlaylists && !playlists?.items?.length && (
              <ProgressIndicatorContainer>
                <ProgressIndicator />
              </ProgressIndicatorContainer>
            )}
          </SizedContainer>
        </FlexContainer>

        <Carousel
          showThumbs={false}
          autoPlay={false}
          showStatus={false}
          showIndicators={false}
          useKeyboardArrows
          swipeable
          emulateTouch
          centerMode
          centerSlidePercentage={60}
          onChange={didChangeCarousel}
        >
          {playlists?.items?.map((item, itemIndex) => (
            <Playlist
              key={item.id}
              selected={selectedCarouselIndex === itemIndex}
            >
              <Leading>
                <Thumbnail
                  src={
                    item.snippet?.thumbnails?.standard?.url ||
                    item.snippet?.thumbnails?.default?.url
                  }
                  alt={t(translations.thumbnail)}
                />
                <PlaylistName>{item.snippet?.localized?.title}</PlaylistName>
                <PlaylistOwner>{item.snippet?.channelTitle}</PlaylistOwner>
              </Leading>

              {selectedCarouselIndex === itemIndex && (
                <Trailing>
                  <PlaylistItems
                    playlistId={playlists?.items?.[selectedCarouselIndex].id}
                    onItemSelected={didSelectPlaylistItem}
                  />
                </Trailing>
              )}
            </Playlist>
          ))}
        </Carousel>

        <AppleMusicResults itemTitle={selectedPlaylistItem?.snippet?.title} />
      </Container>
    </>
  );
}

const Playlist = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 2rem;
  transition: transform 350ms;

  ${p =>
    !p.selected
      ? css`
          transform: translateX(calc(50% - 2rem));
        `
      : ''}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .selected {
    + * {
      ${Playlist} {
        transform: translateX(0);
      }
    }
  }

  .control-arrow {
    box-shadow: none !important;
  }
`;

const Thumbnail = styled.img`
  background-size: cover;
  border-radius: 1.25rem;
  box-shadow: 0 0.625rem 1.25rem 0 var(--radiosityShadowColor);
  margin-right: 0.5rem;
`;

const Leading = styled.div`
  padding: 1rem;
  width: 50%;
`;

const Trailing = styled.div`
  overflow-y: auto;
  position: relative;
  width: 50%;
`;

const PlaylistName = styled.h1`
  align-items: baseline;
  margin-top: 1.125rem;
  overflow: hidden;
  user-select: text;
`;

const PlaylistOwner = styled.h2`
  color: var(--keyColor);
  font-weight: 400;
`;

const Background = styled.img`
  bottom: 0;
  height: 100%;
  left: 0;
  opacity: 0.2;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: -1;
`;

const BackgroundContainer = styled.div`
  background-color: var(--sidebar);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;

  @supports ((-webkit-backdrop-filter: initial) or (backdrop-filter: initial)) {
    backdrop-filter: saturate(50%) blur(20px);
  }
`;

const SizedContainer = styled.div`
  max-width: 60rem;
  width: 100%;

  h2 {
    padding-bottom: 0.25rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 2rem;
  text-align: left;
  width: 100%;
`;

const ProgressIndicatorContainer = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  width: 100%;
`;
