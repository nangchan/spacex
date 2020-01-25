import React from 'react';
import { mount } from 'enzyme';
import Search from './Search';

// for debugging
//import beautify from 'js-beautify';


test('renders search page', () => {
  // query sent to SpaceXgraphQL
  const [query, setQuery] = [
    {
      mission_name: '',
      rocket_name: '',
      launch_year: '',
      limit: 50,
    }, // initial state
    jest.fn() // mock setState
  ];

  const wrapper = mount(
    <Search query={query} setQuery={setQuery} />
  );

  // populate form fields

  const mission_name = wrapper.find('input[name="mission_name"]').first();
  mission_name.simulate('change', {target: {name: 'mission_name', value: 'My Mission'}});    

  const rocket_name = wrapper.find('input[name="rocket_name"]').first();
  rocket_name.simulate('change', {target: {name: 'rocket_name', value: 'My Rocket'}});    

  const launch_year = wrapper.find('input[name="launch_year"]').first();
  launch_year.simulate('change', {target: {name: 'launch_year', value: '2020'}});    

  const form = {
    mission_name: wrapper.find('input[name="mission_name"]').first().props().value,
    rocket_name: wrapper.find('input[name="rocket_name"]').first().props().value,
    launch_year: wrapper.find('input[name="launch_year"]').first().props().value,
    limit: wrapper.find('select[name="limit"]').first().props().value,
  }

  // validate form field entered
  expect(form).toStrictEqual({
    mission_name: 'My Mission',
    rocket_name: 'My Rocket',
    launch_year: '2020',
    limit: 50,
  });

  // submit form
  const submit = wrapper.find('button[type="submit"]').first();
  submit.simulate('submit');

  // validate call to setQuery using mocked function
  expect(setQuery.mock.calls).toEqual([
    [{
      mission_name: 'My Mission',
      rocket_name: 'My Rocket',
      launch_year: '2020',
      limit: 50,
    }]
  ]);

  // for debugging
  //console.log(wrapper.debug);
  //console.log(beautify(wrapper.html()));
});

