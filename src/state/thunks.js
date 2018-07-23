import {getCustomers} from '../api/customerApi'
import {getProducts} from '../api/productApi'
import {fetchCustomersError, fetchCustomersStarted, fetchCustomersSuccess, fetchProductsError, fetchProductsStarted, fetchProductsSuccess} from './actions'

export const fetchCustomers = () => {
    return dispatch => {
        dispatch(fetchCustomersStarted())
        return getCustomers()
            .then(customers => dispatch(fetchCustomersSuccess(customers)))
            .catch(error => dispatch(fetchCustomersError(error)))
    }
}

export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStarted())
        return getProducts()
            .then(products => dispatch(fetchProductsSuccess(products)))
            .catch(error => dispatch(fetchProductsError(error)))
    }
}