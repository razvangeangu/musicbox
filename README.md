<!-- markdownlint-disable MD041 -->

![[License]https://opensource.org/licenses/MIT](https://img.shields.io/npm/l/make-coverage-badge.svg) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) ![build](https://github.com/razvangeangu/musicbox/workflows/build/badge.svg?branch=main) [![Coverage Status](https://coveralls.io/repos/github/razvangeangu/coveralls/badge.svg?branch=main&t=PGI2iS)](https://coveralls.io/github/razvangeangu/coveralls?branch=main)

# @razvangeangu/musicbox

This app showcases an integration between [MusicKit on the Web](https://js-cdn.music.apple.com/musickit/v3/docs/index.html) and [YouTube Data API](https://developers.google.com/youtube/v3) that allows one to sync playlists from YouTube and add them to library results to Apple Music.

## Getting started

[Try the demo](https://razvangeangu.github.io/musicbox) or follow the next steps to load the local environment for development.

Clone the repository and run the following commands:

```sh
gh repo clone razvangeangu/musicbox
cd musicbox
yarn
yarn start
```

## Features

The app is built using React and the 3rd party libraries compatible with JavaScript.

### MusicKit on the Web

MusicKit is used to authenticate an user to Apple Music API. Users can lookup tracks from their YouTube playlist, listen to a preview or the full song. Once they are happy with their selection they can add it to their library automatically.

The app also makes use of the Apple Music Design System and Web Components.

### YouTube Data API

YouTube API is used to authenticate an user to get their YouTube data. Users can fetch their playlists and navigate through them. Once a selection is made Apple Music loads the search results.

## Disclaimers

The MusicBox app is built for demonstration purposes only.

Apple and Apple Music are trademarks of Apple Inc., registered in the U.S. and other countries.

YOUTUBE is a trademark of GOOGLE LLC

## License

[MIT License, Copyright (c) 2022 Razvan-Gabriel Geangu](LICENSE)
