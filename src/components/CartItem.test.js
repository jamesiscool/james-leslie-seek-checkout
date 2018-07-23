import {shallow} from 'enzyme'
import React from 'react'

import {CartItem} from './CartItem'

const classicProduct = {
    'id': 'classic',
    'name': 'Classic Ad',
    'description': 'Basic level of advertisement',
    'price': 269.99,
}

const zeroSubtotal = {
    discountApplied: false,
    itemTotal: 0,
}

let changeQuantity = jest.fn()

beforeEach(() => {
    jest.resetAllMocks()
})

it('renders', () => {
    const wrapper = shallow(
        <CartItem
            product={classicProduct}
            quantity={0}
            subtotal={zeroSubtotal}
            changeQuantity={changeQuantity}
        />)
    expect(wrapper.find('.quantity').props().value).toBe(0)
    expect(wrapper.find('.total').text()).toBe('$0.00')
    expect(wrapper.find('.discount').length).toBe(0)
    expect(wrapper.find('.full-total').length).toBe(0)
})

it('renders correctly with quantity > 0', () => {
    const wrapper = shallow(
        <CartItem
            product={classicProduct}
            quantity={1}
            subtotal={{discountApplied: false, itemTotal: 269.99}}
            changeQuantity={changeQuantity}
        />)
    expect(wrapper.find('.quantity').props().value).toBe(1)
    expect(wrapper.find('.total').text()).toBe('$269.99')
    expect(wrapper.find('.discount').length).toBe(0)
    expect(wrapper.find('.full-total').length).toBe(0)
})

it('renders correctly with discount', () => {
    const wrapper = shallow(
        <CartItem
            product={classicProduct}
            quantity={1}
            subtotal={{discountApplied: true, itemTotal: 100.01, fullItemTotal: 200.02}}
            changeQuantity={changeQuantity}
        />)
    expect(wrapper.find('.quantity').props().value).toBe(1)
    expect(wrapper.find('.total').text()).toBe('$100.01')
    expect(wrapper.find('.discount').text()).toBe('-$100.01')
    expect(wrapper.find('.full-total').text()).toBe('$200.02')
})


test('quantity input change', () => {
    const wrapper = shallow(
        <CartItem
            product={classicProduct}
            quantity={0}
            subtotal={zeroSubtotal}
            changeQuantity={changeQuantity}
        />)
    wrapper.find('.quantity').simulate('change', {target: {value: 1}})
    expect(changeQuantity.mock.calls[0][0]).toBe(1)
})

test('increment', () => {
    const wrapper = shallow(
        <CartItem
            product={classicProduct}
            quantity={1}
            subtotal={zeroSubtotal}
            changeQuantity={changeQuantity}
        />)
    wrapper.find('.increment').simulate('click')
    expect(changeQuantity.mock.calls[0][0]).toBe(2)
})

test('decrement', () => {
    const wrapper = shallow(
        <CartItem
            product={classicProduct}
            quantity={1}
            subtotal={zeroSubtotal}
            changeQuantity={changeQuantity}
        />)
    wrapper.find('.decrement').simulate('click')
    expect(changeQuantity.mock.calls[0][0]).toBe(0)
})
