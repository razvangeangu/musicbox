import React from 'react';
import { act, render } from 'utils/test-utils';
import { PlaylistItems } from '../index';

describe('<PlaylistItems  />', () => {
  it('should render', async () => {
    await act(async () => {
      const component = render(
        <PlaylistItems playlistId="PLAkkNPSZ-2RDnCODjkube5L2cg4YG-6Jx" />,
      );
      expect(component).toBeTruthy();
    });
  });
});
