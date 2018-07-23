import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'

import {checkoutReducer} from './reducers'

export const store = createStore(checkoutReducer, applyMiddleware(thunk))