import React from 'react';
import { render } from 'utils/test-utils';
import { ProgressIndicator } from '../index';

describe('<ProgressIndicator  />', () => {
  it('should render', async () => {
    const component = render(<ProgressIndicator />);
    expect(component).toBeTruthy();
  });
});
