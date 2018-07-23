import React from 'react'
import {connect} from 'react-redux'

import {subtotal} from '../state/selectors'
import {changeQuantity} from '../state/actions'
import {toCurrencyString} from '../utils/currency'

export const CartItem = (props) => (
    <li className="list-group-item">
        <div className="row">
            <div className="col-sm-7 col-md-8 pb-2 pb-sm-0">
                <h6 className="name my-0">{props.product.name}</h6>
                <small className="description text-muted">{props.product.description}</small>
            </div>
            <div className="col-6 col-sm-3 col-md-2">
                <div className="input-group input-group-sm quantity-input">
                    <div className="input-group-prepend">
                        <button className="decrement btn" onClick={() => props.changeQuantity(props.quantity - 1)} aria-label="decrement quantity">-</button>
                    </div>
                    <input value={props.quantity}
                           onChange={event => props.changeQuantity(event.target.value)}
                           className="quantity form-control"
                           aria-label={props.product.name + ' quantity'}/>
                    <div className="input-group-append">
                        <button className="increment btn" onClick={() => props.changeQuantity(props.quantity + 1)} aria-label="increment quantity">+</button>
                    </div>
                </div>
            </div>
            <div className="col-6 col-sm-2">
                {!props.subtotal.discountApplied ?
                    <div className="total item-total text-right text-muted">{toCurrencyString(props.subtotal.itemTotal)}</div>
                    :
                    <div>
                        <div className="full-total text-right text-muted">
                            <del>{toCurrencyString(props.subtotal.fullItemTotal)}</del>
                        </div>
                        <div className="discount text-right text-muted">-{toCurrencyString(props.subtotal.fullItemTotal - props.subtotal.itemTotal)}</div>
                        <div className="total text-right text-muted">{toCurrencyString(props.subtotal.itemTotal)}</div>
                    </div>}
            </div>
        </div>
    </li>)

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeQuantity: (quantity) => dispatch(changeQuantity(ownProps.product.id, quantity)),
})

const mapStateToProps = (state, ownProps) => ({
    quantity: state.cartQuantities[ownProps.product.id] || 0,
    subtotal: subtotal(state, ownProps.product),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
