import { P } from 'app/components/NotFoundPage/P';
import { translations } from 'locales/translations';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>404 {t(translations.notFound.title)}</title>
        <meta name="description" content={t(translations.notFound.title)} />
      </Helmet>
      <Wrapper>
        <Title>
          4<span role="img">😢</span>4
        </Title>
        <Link to="/">
          <span>{t(translations.routes.home)}</span>
        </Link>
        <P>{t(translations.notFound.info)}</P>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  min-height: 20rem;
  padding: 0 1.875rem;
  text-align: center;
`;

const Title = styled.div`
  color: ${p => p.theme.text.default};
  font-size: 3.375rem;
  font-weight: bold;
  margin-top: -8vh;

  span {
    font-size: 3.125rem;
  }
`;
