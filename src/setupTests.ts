// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import 'jest-styled-components';

import en from 'locales/en/translation.json';
import { convertLanguageJsonToObject } from 'locales/translations';

import mockYoutubePlaylists from '__mocks__/youtube-playlists.json';
import mockYoutubePlaylistItems from '__mocks__/youtube-playlist-items.json';
import mockAppleMusicSearch from '__mocks__/apple-music-search.json';

import { HelmetProvider } from 'react-helmet-async';

HelmetProvider.canUseDOM = false;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: str => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

convertLanguageJsonToObject(en);

jest.mock('api', () => ({
  ...jest.requireActual('api'),
  youtube: {
    getMyPlaylists: async () => mockYoutubePlaylists,
    getMyPlaylistItems: async () => mockYoutubePlaylistItems,
  },
  music: {
    search: async (..._: any[]) => mockAppleMusicSearch,
  },
}));

(global as any).MusicKit = {
  getInstance: jest.fn(),
};

// const appleMusicWebComponents = [
//   'apple-music-volume',
//   'apple-music-playback-controls',
//   'apple-music-progress',
//   'apple-music-card-player',
// ];

// appleMusicWebComponents.forEach(componentName => {
//   customElements.define(
//     componentName,
//     class extends HTMLElement {
//       constructor() {
//         super();
//         const p = document.createElement('p');
//         p.textContent = componentName;
//         this.appendChild(p);
//       }
//     },
//   );
// });
