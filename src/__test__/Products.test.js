import React from 'react';
import { fireEvent, render, screen, act, cleanup, waitFor, getByText } from '@testing-library/react';
import * as ReactDom from 'react-dom'
import Products from '../admin/Products'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme';
import * as APICall from '../admin/services/fetchprod'
import * as APIDelete from '../admin/services/delprod'


jest.mock('../admin/services/fetchprod');

it('fetching', async () => {
  APICall.fetchData.mockResolvedValueOnce({ok : true});
  render(<Products />);
  expect(APICall.fetchData).toHaveBeenCalledTimes(1)
})

jest.mock('../admin/services/delprod');

// it('fetching', async () => {
//   APIDelete.delData.mockResolvedValueOnce({ok : true});
//   render(<Products key = {"delete"}/>)
//   // expect(fireEvent.click(containerone.querySelector("[data-testid = 'delete']")))
//   const button = screen.findByTestId('delete')
//   fireEvent.click(button)
//   expect(APIDelete.delData).toHaveBeenCalledTimes(1)
// })


describe("component test", () => {
  let container
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDom.render(<Products />, container);
  })

  afterEach(() => {
    document.body.removeChild(container);
    container.remove(),
    cleanup
  })


  it("table delete and edit", () => {
    render(<Products />)
    expect(container.querySelector("[data-testid = 'table']"))
    expect(fireEvent.change(container.querySelector("[data-testid = 'tbody']")))
    expect(container.querySelector("[data-testid = 'delete']"))
    expect(container.querySelector("[data-testid = 'edit']"))
  })
  
})

test("table items", () => {
  render(<Products />)
  expect(screen.getByText("#id"))
  expect(screen.getByText("Title"))
  expect(screen.getByText("Body"))
})

it('can render the About page', () => {
  const tree = renderer.create(<Products />).toJSON();
  expect(tree).toMatchSnapshot();
})

  // test('Anchor needs to have proper text', () => {
  //   const element = shallow(<App />);
  //   expect(element.find('a').text()).toBe("Edit");
  // });

//   it("calls the `openPopup` function", () => {
//     const onMockFunction = jest.fn();
//     const comp = shallow(
//         <SparkTheme>
//             <Contact handleButtonClick={onMockFunction} />
//         </SparkTheme>
//     );
//     comp.find(Header).simulate("change");
//     expect(onMockFunction).toBeCalledTimes(1);
// });

// it('test', async () => {
//     let component;
//     const fakeResponse = 'example text';
//     const mockFetch = Promise.resolve({json: () => Promise.resolve(fakeResponse)});
//     const mockedFetch = jest.spyOn(window, 'table').mockImplementationOnce(() => mockFetch )
//     await waitFor( async () => {
//         component = render(<Products />);
//     })
//     const value = component.container.querySelector("[data-testid = 'tbody']")
//     console.log(value);
//     expect(mockedFetch).toHaveBeenCalledTimes(1);
//   })

// global.fetch = jest.fn(() => Promise.resolve({
//   json: () => Promise.resolve({
//     title:"how are you"
//   })
// }))
// describe("fetch", () => {
// test('fetching',async () => {
//   await act( async () => render(<Products />))
//   expect(screen.getByText("how are you"))
// })
// })