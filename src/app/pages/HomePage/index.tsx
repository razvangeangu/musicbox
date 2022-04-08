/**
 *
 * HomePage
 *
 */
import { translations } from 'locales/translations';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

export function HomePage() {
  const { t } = useTranslation();

  // TODO: remove test
  (async () => {
    const music = MusicKit.getInstance();
    // You should check authorization before accessing user's iCloud Music Library:
    await music.authorize();
  })();

  return (
    <>
      <Helmet>
        <title>{t(translations.routes.home)}</title>
      </Helmet>

      <Container>{t(translations.routes.home)}</Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  height: calc(100vh - 5rem - 2.6875rem);
`;
