import React from 'react';
import { render } from 'utils/test-utils';
import { NavBar } from '../index';

describe('<NavBar  />', () => {
  it('should render', async () => {
    const component = render(<NavBar />);
    expect(component).toBeTruthy();
  });
});
