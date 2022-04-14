import React from 'react';
import { render } from 'utils/test-utils';
import { MusicItem } from '../index';

describe('<MusicItem  />', () => {
  it('should render', async () => {
    const component = render(<MusicItem />);
    expect(component).toBeTruthy();
  });
});
