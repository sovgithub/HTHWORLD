import React from 'react';
import Landing from './index';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Landing />).toJSON();
  expect(rendered).toBeTruthy();
});
