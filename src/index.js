import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import Checkout from './components/Checkout'
import {store} from './state/store'

import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <Checkout/>
    </Provider>,
    document.getElementById('checkout'))
