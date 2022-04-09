/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Layout } from 'app/components/Layout';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import { HomePage } from 'app/pages/HomePage/Loadable';
import dayjs from 'dayjs';
import { translations } from 'locales/translations';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { basePath } from 'utils/base-path';

export function App() {
  const { t, i18n } = useTranslation();

  dayjs.locale(i18n.language);

  return (
    <BrowserRouter basename={basePath}>
      <Helmet
        titleTemplate={`%s | ${t(translations.name)}`}
        defaultTitle={t(translations.name)}
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content={t(translations.description)} />
      </Helmet>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
