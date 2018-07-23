import discountCalculators from '../model/discountCalculators'

export const subtotal = (state, product) => {

    const quantity = state.cartQuantities[product.id] || 0
    const fullItemTotal = product.price * quantity

    if (!state.selectedCustomer || !state.selectedCustomer.discounts || state.selectedCustomer.discounts.length < 1) {
        return {
            discountApplied: false,
            itemTotal: fullItemTotal,
        }
    }

    const applicableDiscounts = state.selectedCustomer.discounts.filter(discount => discount.productId === product.id)
    const discountedSubtotals = applicableDiscounts.map(discount => discountCalculators[discount.type](quantity, product.price, discount))
    const lowestDiscountedSubtotal = Math.min(...discountedSubtotals)
    const discountApplied = fullItemTotal > lowestDiscountedSubtotal
    const itemTotal = discountApplied ? lowestDiscountedSubtotal : fullItemTotal
    return {
        discountApplied,
        itemTotal,
        fullItemTotal,
    }
}

export const total = state => {
    return state.products.reduce((accumulator, product) => accumulator + subtotal(state, product).itemTotal, 0)
}
