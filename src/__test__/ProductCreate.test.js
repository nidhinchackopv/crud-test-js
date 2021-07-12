import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as ReactDom from 'react-dom'
import ProductCreate from '../admin/ProductCreate'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import * as APIService from '../admin/services/postprod'


it('can render the About page', () => {
  const tree = renderer.create(<ProductCreate />).toJSON();
  expect(tree).toMatchSnapshot();
})

describe("component test", () => {
  let container

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDom.render(<ProductCreate />, container);
  })

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  })

  it("contains the ellements", () => {
    expect(container.querySelector("[data-testid = 'pro-input']")?.getAttribute('name')).toBe('Title');
    expect(container.querySelector("[data-testid = 'pro-textarea']")?.getAttribute('name')).toBe('body');
  })

  test("table items", () => {
    const button = screen.getByTestId("submit");
    fireEvent.click(button);
    expect(screen.getByText("Title"))
    expect(screen.getByText("Description"))
  })

  test("should display a form with values ", () => {
    const input = screen.getByTestId("pro-input");
    fireEvent.change(input);
    const textarea = screen.getByTestId("pro-textarea");
    fireEvent.change(textarea);
    expect(screen.getByTestId("pro-form").getAttribute('Title','body'))
  });

})


jest.mock('../admin/services/postprod');

it('posting', async () => {
  APIService.getData.mockResolvedValueOnce({ok : true});
  render(<ProductCreate />);
  const input = screen.getByTestId('pro-input');
  fireEvent.change(input, { 'target' : { 'value' : 'textone' }});
  const textarea = screen.getByTestId('pro-textarea');
  fireEvent.change(textarea, { 'target' : { 'value' : 'texttwo' }});
  const button = screen.getByTestId('submit');
  fireEvent.click(button)
  expect(APIService.getData).toHaveBeenCalledTimes(1)
  expect(APIService.getData).toHaveBeenCalledWith("textone","texttwo")
})


// describe('Test case for testing login', () => {
// let wrapper;
//   test('input check', () => {
//     wrapper = shallow(<ProductCreate />);
//     wrapper
//       .find('input[type="text"]')
//       .simulate('change', { target: { name: 'Title' } });
//     expect(wrapper.state('Title'));
//   });
//   it('textarea check', () => {
//     wrapper = shallow(<ProductCreate />);
//     wrapper
//       .find('textarea[type="textarea"]')
//       .simulate('change', { target: { name: 'body'} });
//     expect(wrapper.state('body'));
//   })
// })