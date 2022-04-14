import React from 'react';
import { act, render } from 'utils/test-utils';
import { App } from '../index';

describe('<App  />', () => {
  it('should render', async () => {
    await act(async () => {
      const component = render(<App />);
      expect(component).toBeTruthy();
    });
  });
});
