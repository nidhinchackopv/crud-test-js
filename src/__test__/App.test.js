import React from 'react';
import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme'
import App from '../App';
import * as ReactDom from 'react-dom'
import renderer from 'react-test-renderer'


it('can render the About page', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
})

describe("component test", () => {
  let container

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDom.render(<App />, container);
  })

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  })

  it("contains the ellements", () => {
    expect(container.querySelector("[data-testid = 'products']"));
    expect(container.querySelector("[data-testid = 'productcreate']"));
    expect(container.querySelector("[data-testid = 'productedit']"));
  })
})
