import produce from 'immer'

import {CHANGE_QUANTITY, FETCH_CUSTOMERS, FETCH_PRODUCTS, SELECT_CUSTOMER} from './actions'

const initialState = {
    customers: [],
    products: [],
    cartQuantities: {},
}

export function checkoutReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CUSTOMERS:
            if (action.status !== 'SUCCESS') {
                return state
            }
            return produce(state, draftState => {
                draftState.customers = action.customers
            })
        case FETCH_PRODUCTS:
            if (action.status !== 'SUCCESS') {
                return state
            }
            return produce(state, draftState => {
                draftState.products = action.products
            })
        case CHANGE_QUANTITY:
            const quantityAsNumber = Number(action.quantity)
            if (Number.isNaN(quantityAsNumber) || !Number.isInteger(quantityAsNumber) || quantityAsNumber < 0) {
                return state
            }
            return produce(state, draftState => {
                draftState.cartQuantities[action.productId] = quantityAsNumber
            })
        case SELECT_CUSTOMER:
            return produce(state, draftState => {
                draftState.selectedCustomer = action.customer
            })
        default:
            return state
    }
}