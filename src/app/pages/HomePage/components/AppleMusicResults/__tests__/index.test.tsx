import React from 'react';
import { act, render } from 'utils/test-utils';
import { AppleMusicResults } from '../index';

describe('<AppleMusicResults  />', () => {
  it('should render', async () => {
    await act(async () => {
      const component = render(
        <AppleMusicResults itemTitle="Michael Jackson - Liberian Girl" />,
      );
      expect(component).toBeTruthy();
    });
  });
});
