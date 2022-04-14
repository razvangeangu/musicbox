import React from 'react';
import { render } from 'utils/test-utils';
import { Layout } from '../index';

describe('<Layout  />', () => {
  it('should render', async () => {
    const component = render(<Layout />);
    expect(component).toBeTruthy();
  });
});
