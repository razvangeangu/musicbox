import React from 'react';
import { act, render } from 'utils/test-utils';
import { HomePage } from '../index';

describe('<HomePage  />', () => {
  it('should render', async () => {
    await act(async () => {
      const component = render(<HomePage />);
      expect(component).toBeTruthy();
    });
  });
});
