import React from 'react';
import { render } from 'utils/test-utils';
import { Footer } from '../index';

describe('<Footer  />', () => {
  it('should render', async () => {
    const component = render(<Footer />);
    expect(component).toBeTruthy();
  });
});
