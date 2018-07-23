import {shallow} from 'enzyme'
import React from 'react'

import {Cart} from './Cart'
import CartItem from './CartItem'

it('renders', () => {
    const fetchProducts = jest.fn()
    const wrapper = shallow(<Cart
        products={[]}
        total={0}
        fetchProducts={fetchProducts}
    />)
    expect(fetchProducts.mock.calls.length).toBe(1)
    expect(wrapper.find(CartItem).length).toBe(0)
    expect(wrapper.find('#total').text()).toBe('$0.00')
})

it('renders a list of CartItem', () => {
    const fetchProducts = jest.fn()
    const wrapper = shallow(<Cart
        products={[{id: 'A'}, {id: 'B'}, {id: 'C'}]}
        total={0}
        fetchProducts={fetchProducts}
    />)
    expect(wrapper.find(CartItem).length).toBe(3)
})

it('renders total correctly', () => {
    const fetchProducts = jest.fn()
    const wrapper = shallow(<Cart
        products={[]}
        total={1234.56}
        fetchProducts={fetchProducts}
    />)
    expect(wrapper.find('#total').text()).toBe('$1,234.56')
})