import {CHANGE_QUANTITY, FETCH_CUSTOMERS, FETCH_PRODUCTS, SELECT_CUSTOMER} from './actions'
import {checkoutReducer} from './reducers'

describe('todos reducer', () => {

    it('should return the initial state', () => {
        expect(checkoutReducer(undefined, {})).toEqual({cartQuantities: {}, customers: [], products: []})
    })

    it('should handle FETCH_CUSTOMERS success', () => {
        expect(checkoutReducer(undefined, {
            type: FETCH_CUSTOMERS,
            status: 'SUCCESS',
            customers: [{id: 1, name: 'Unilever'}],
        })).toEqual({cartQuantities: {}, customers: [{id: 1, name: 'Unilever'}], products: []})
    })

    it('should handle FETCH_PRODUCTS success', () => {
        expect(checkoutReducer(undefined, {
            type: FETCH_PRODUCTS,
            status: 'SUCCESS',
            products: [{
                id: 'classic',
                name: 'Classic Ad',
                description: 'Basic level of advertisement',
                price: 269.99,
            }],
        })).toEqual({
            cartQuantities: {}, customers: [], products: [{
                id: 'classic',
                name: 'Classic Ad',
                description: 'Basic level of advertisement',
                price: 269.99,
            }],
        })
    })

    it('should handle CHANGE_QUANTITY', () => {
        expect(checkoutReducer(undefined, {
            type: CHANGE_QUANTITY,
            quantity: 1,
            productId: 'classic',
        })).toEqual({cartQuantities: {classic: 1}, customers: [], products: []})
    })

    it('CHANGE_QUANTITY should accept only integers >= 0', () => {
        expect(checkoutReducer(undefined, {
            type: CHANGE_QUANTITY,
            quantity: -1,
            productId: 'classic',
        })).toEqual({cartQuantities: {}, customers: [], products: []})
        expect(checkoutReducer(undefined, {
            type: CHANGE_QUANTITY,
            quantity: 'a',
            productId: 'classic',
        })).toEqual({cartQuantities: {}, customers: [], products: []})
        expect(checkoutReducer(undefined, {
            type: CHANGE_QUANTITY,
            quantity: '1.1',
            productId: 'classic',
        })).toEqual({cartQuantities: {}, customers: [], products: []})
    })

    it('should handle SELECT_CUSTOMER', () => {
        expect(checkoutReducer(undefined, {
            type: SELECT_CUSTOMER,
            customer: {
                id: 1,
                name: 'Unilever',
                discounts: [{
                    productId: 'classic',
                    type: 'forThePriceOf',
                    includedQuantity: 3,
                    forQuantity: 2,
                }],
            },
        })).toEqual({
            cartQuantities: {}, customers: [], products: [], selectedCustomer: {
                id: 1,
                name: 'Unilever',
                discounts: [{
                    productId: 'classic',
                    type: 'forThePriceOf',
                    includedQuantity: 3,
                    forQuantity: 2,
                }],
            },
        })
    })

    it('should handle SELECT_CUSTOMER for null', () => {
        expect(checkoutReducer(undefined, {
            type: SELECT_CUSTOMER,
            customer: null,
        })).toEqual({cartQuantities: {}, customers: [], products: [], selectedCustomer: null})
    })

})