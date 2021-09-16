import React from 'react';
import { shallow } from 'enzyme';
import { PostsUserComponent } from './PostsUser';

describe('Component PostsUser', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostsUserComponent />);
    expect(component).toBeTruthy();
  });
});
