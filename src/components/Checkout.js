import React, {Fragment} from 'react'

import Cart from './Cart'
import CustomerSelector from './CustomerSelector'

const Checkout = () => (
    <Fragment>
        <CustomerSelector/>
        <Cart/>
    </Fragment>
)

export default Checkout
