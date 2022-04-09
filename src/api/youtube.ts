const authenticate = async () => {
  try {
    const auth = gapi.auth2.getAuthInstance();
    const currentUser = auth.currentUser.get();

    auth.isSignedIn.listen(signedIn => {
      document.dispatchEvent(new CustomEvent('gauth2', { detail: signedIn }));
    });

    if (currentUser) {
      await currentUser.reloadAuthResponse();
    } else {
      await auth.signIn({
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
      });
    }

    // eslint-disable-next-line no-console
    console.log('Sign-in successful');

    await loadClient();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error signing in', err);
  }
};

const loadClient = async () => {
  gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY || '');

  try {
    await gapi.client.load(
      'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
      'v3',
    );

    // eslint-disable-next-line no-console
    console.log('GAPI client loaded for API');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error loading GAPI client for API', err);
  }
};

const getMyPlaylists = async () => {
  try {
    if (!gapi.client.youtube) {
      await authenticate();
    }

    const response = await gapi.client.youtube.playlists.list({
      part: ['snippet,contentDetails'],
      maxResults: 50,
      mine: true,
    });

    if (response.status === 200) {
      return response.result;
    }

    return null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getMyPlaylists error', err);
  }

  return null;
};

const getMyPlaylistItems = async (playlistId: string) => {
  try {
    if (!gapi.client.youtube) {
      await authenticate();
    }

    const response = await gapi.client.youtube.playlistItems.list({
      part: ['snippet'],
      maxResults: 500,
      playlistId,
    });

    if (response.status === 200) {
      return response.result;
    }

    return null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getMyPlaylistItems error', err);
  }

  return null;
};

export const youtube = {
  authenticate,
  getMyPlaylists,
  getMyPlaylistItems,
};

export const YOUTUBE_NO_THUMB_URL = 'https://i.ytimg.com/img/no_thumbnail.jpg';
