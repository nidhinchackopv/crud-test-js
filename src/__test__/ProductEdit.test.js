import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as ReactDom from 'react-dom'
import ProdutEdit from '../admin/ProdutEdit'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme';
import * as APIEdit from '../admin/services/editprod';


// let state={title:"hello",body:"world"}
jest.mock('../admin/services/editprod');
it('fetching', async () => {
  APIEdit.editProd.mockResolvedValueOnce({ok : true});
  render(<ProdutEdit />);
  const input = screen.getByTestId('pro-input');
  fireEvent.change(input, { 'target' : { 'value' : 'hello' }});
  const textarea = screen.getByTestId('pro-textarea');
  fireEvent.change(textarea, { 'target' : { 'value' : 'world' }});
  const button = screen.getByTestId('submit');
  fireEvent.click(button);
  expect(APIEdit.editProd).toHaveBeenCalledTimes(1)
  // expect(APIEdit.editProd).toHaveBeenCalledWith(1 , state)
})

jest.mock('../admin/services/editprod');

it('fetching', async () => { 
  APIEdit.editProdOne.mockResolvedValueOnce({ok : true});
  render(<ProdutEdit />);
  expect(APIEdit.editProdOne).toHaveBeenCalledTimes(1)
})


it('can render the About page', () => {
  const tree = renderer.create(<ProdutEdit />).toJSON();
  expect(tree).toMatchSnapshot();
})

describe("component test", () => {
  let container

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDom.render(<ProdutEdit />, container);
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

  // test("should display a form with values ", () => {
  //   const defaultValue = "defaultValue";
  //   ReactDom.render(<ProdutEdit initial={defaultValue}/>, container);
  //   expect(container.getByTestId(/pro-input/i).value).toBe(defaultValue);
  // });


})
