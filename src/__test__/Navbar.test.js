import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as ReactDom from 'react-dom'
import Navebar from '../admin/Navebar'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme';


it('can render the About page', () => {
    const tree = renderer.create(<Navebar />).toJSON();
    expect(tree).toMatchSnapshot();
})


test("contains correct text", () => {
    render(<Navebar />);

    const link = screen.getByText(/home/i);
    fireEvent.click(link);
    expect(screen.getByText("Menu"))
    expect(screen.getByText("About"))
    expect(screen.getByText("Contact"))
    expect(screen.getByTestId("nav"))
  });