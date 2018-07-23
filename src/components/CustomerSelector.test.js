import {shallow} from 'enzyme'
import React from 'react'

import {CustomerSelector} from './CustomerSelector'

const fetchCustomers = jest.fn()
const selectCustomer = jest.fn()

const customers = [
    {id: 1, name: 'Unilever'},
    {id: 2, name: 'Apple'},
    {id: 3, name: 'Nike'},
    {id: 4, name: 'Ford'},
]

beforeEach(() => {
    jest.resetAllMocks()
})

it('renders', () => {
    const wrapper = shallow(
        <CustomerSelector
            customers={customers}
            fetchCustomers={fetchCustomers}
        />)
    expect(fetchCustomers.mock.calls.length).toBe(1)
    const options = wrapper.find('option')
    expect(options.length).toBe(5)
    expect(options.at(0).text()).toBe('None')
    expect(options.at(1).text()).toBe('Unilever')
})

test('select customer', () => {
    const wrapper = shallow(
        <CustomerSelector
            customers={customers}
            fetchCustomers={fetchCustomers}
            selectCustomer={selectCustomer}
        />)
    wrapper.find('.customer-select').simulate('change', {target: {value: 4}})
    expect(selectCustomer.mock.calls[0][0]).toBe(customers[3])
})