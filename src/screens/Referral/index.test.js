import React from 'react';
import Referral from './index';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Referral />).toJSON();
  expect(rendered).toBeTruthy();
});
