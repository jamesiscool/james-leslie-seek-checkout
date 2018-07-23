import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import {total} from '../state/selectors'
import {fetchProducts} from '../state/thunks'
import {toCurrencyString} from '../utils/currency'
import CartItem from './CartItem'

export class Cart extends Component {

    componentDidMount() {
        this.props.fetchProducts()
    }

    render() {
        return (
            <Fragment>
                <h4 className="my-4">Cart</h4>
                <ul className="list-group pb-2">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="d-none d-sm-block col-sm-7 col-md-8">Product</div>
                            <div className="col-6 col-sm-3 col-md-2"><span className="pl-sm-4">Qty</span></div>
                            <div className="col-6 col-sm-2 text-right">Subtotal</div>
                        </div>
                    </li>
                    {this.props.products.map(product => <CartItem key={product.id} product={product}/>)}
                    <li className="list-group-item d-flex justify-content-between">
                        <span id="total-label">Total (AUD)</span>
                        <strong id="total" aria-labelledby="total-label">{toCurrencyString(this.props.total)}</strong>
                    </li>
                </ul>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products,
    total: total(state),
})

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
