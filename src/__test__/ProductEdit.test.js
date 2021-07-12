import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as ReactDom from 'react-dom'
import ProdutEdit from '../admin/ProdutEdit'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme';
import * as APIEditProd from '../admin/ProdutEdit';


// jest.mock('../admin/ProdutEdit');

// it('fetching', async () => {
//   APIEditProd.ProdutEdit.hello.mockResolvedValueOnce({ok : true});
//   render(<ProdutEdit />);
//   const input = screen.getByTestId('pro-input');
//   fireEvent.change(input, { 'target' : { 'value' : 'textone' }});
//   const textarea = screen.getByTestId('pro-textarea');
//   fireEvent.change(textarea, { 'target' : { 'value' : 'texttwo' }});
//   const button = screen.getByTestId('submit');
//   fireEvent.click(button);
//   expect(APIEditProd.ProdutEdit.hello).toHaveBeenCalledTimes(1)
//   expect(APIEditProd.ProdutEdit.hello).toHaveBeenCalledWith("textone")
//   expect(APIEditProd.ProdutEdit.hello).toHaveBeenCalledWith("texttwo")
// })


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
