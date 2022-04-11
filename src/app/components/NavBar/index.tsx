/**
 *
 * NavBar
 *
 */
import { youtube } from 'api';
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { backdropFilter } from 'styles/constants';
import { media } from 'styles/media';
import { noop } from 'utils/no-op';
import { ReactComponent as AppleMusicSvg } from './assets/apple-music.svg';
import { ReactComponent as YouTubeSvg } from './assets/youtube.svg';

export function NavBar() {
  const { t } = useTranslation();

  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false);
  const [isMusicConnected, setIsMusicConnected] = useState(false);

  const didClickAppleMusicService = async () => {
    const music = MusicKit.getInstance();
    await music.authorize();
    setIsMusicConnected(music.isAuthorized);
  };

  const didClickYouTubeService = async () => {
    await youtube.authenticate();
  };

  const didChangeGAuth = event => {
    setIsYouTubeConnected((event as CustomEvent).detail);

    gapi.auth2?.getAuthInstance?.().isSignedIn?.listen?.(signedIn => {
      setIsYouTubeConnected(signedIn);
    });
  };

  useEffect(() => {
    setIsMusicConnected(MusicKit.getInstance().isAuthorized);

    document.addEventListener('gauth2', didChangeGAuth);

    return () => {
      document.removeEventListener('gauth2', didChangeGAuth);
    };
  }, []);

  return (
    <Container>
      <Leading>{t(translations.name)}</Leading>

      <Trailing>
        <ServiceConnectButton
          id="apple-music-authorize"
          as={!isMusicConnected ? undefined : 'div'}
          onClick={!isMusicConnected ? didClickAppleMusicService : noop}
        >
          <Icon as={AppleMusicSvg} />
          <span>
            {isMusicConnected
              ? t(translations.navbar.connected)
              : t(translations.navbar.disconnected, { provider: 'Music' })}
          </span>
        </ServiceConnectButton>
        <ServiceConnectButton
          as={!isYouTubeConnected ? undefined : 'div'}
          onClick={!isYouTubeConnected ? didClickYouTubeService : noop}
        >
          <Icon as={YouTubeSvg} />
          <span>
            {isYouTubeConnected
              ? t(translations.navbar.connected)
              : t(translations.navbar.disconnected, { provider: 'YouTube' })}
          </span>
        </ServiceConnectButton>
      </Trailing>
    </Container>
  );
}

const Container = styled.nav`
  align-content: center;
  align-items: center;
  box-shadow: 0 0.0625rem 0 rgba(0, 0, 0, 0.05),
    0 0.0625rem 0.1875rem var(--playerDropShadow2),
    inset 0 -0.0313rem 0 var(--playerInnerShadow);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;

  ${backdropFilter}
`;

const Leading = styled.div`
  display: flex;
  font-size: 1.25rem;
  font-weight: 600;
`;

const Trailing = styled.div`
  display: flex;

  > * {
    :not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const ServiceConnectButton = styled.button`
  align-content: center;
  align-items: center;
  display: flex;

  span {
    display: none;
  }

  ${media.small`
    span {
      display: initial;
    }
  `}
`;

const Icon = styled.svg`
  height: 1.5rem;
  margin-right: 0.375rem;
`;
