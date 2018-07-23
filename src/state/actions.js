export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS'
export const fetchCustomersStarted = () => ({
    type: FETCH_CUSTOMERS,
})
export const fetchCustomersSuccess = (customers) => ({
    type: FETCH_CUSTOMERS,
    status: 'SUCCESS',
    customers,
})
export const fetchCustomersError = (error) => ({
    type: FETCH_CUSTOMERS,
    status: 'ERROR',
    error,
})

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const fetchProductsStarted = () => ({
    type: FETCH_PRODUCTS,
})
export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS,
    status: 'SUCCESS',
    products,
})
export const fetchProductsError = (error) => ({
    type: FETCH_PRODUCTS,
    status: 'ERROR',
    error,
})

export const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
export const changeQuantity = (productId, quantity) => ({
    type: CHANGE_QUANTITY,
    productId,
    quantity,
})

export const SELECT_CUSTOMER = 'SELECT_CUSTOMER'
export const selectCustomer = (customer) => ({
    type: SELECT_CUSTOMER,
    customer,
})