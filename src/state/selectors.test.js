import {subtotal, total} from './selectors'

describe('subtotal', () => {

    it('should calculate a basic subtotal', () => {
        expect(subtotal(
            {cartQuantities: {classic: 1}},
            {id: 'classic', price: 100}),
        ).toEqual({discountApplied: false, itemTotal: 100})
    })

    it('should apply a discount', () => {
        expect(subtotal({
                cartQuantities: {classic: 3},
                selectedCustomer: {
                    discounts: [{
                        productId: 'classic',
                        type: 'forThePriceOf',
                        includedQuantity: 3,
                        forQuantity: 2,
                    }],
                },
            },
            {id: 'classic', price: 100},
        )).toEqual({
            discountApplied: true,
            itemTotal: 200,
            fullItemTotal: 300,
        })
    })

    it('should apply the best discount', () => {
        expect(subtotal({
                cartQuantities: {classic: 3},
                selectedCustomer: {
                    discounts: [{
                        productId: 'classic',
                        type: 'forThePriceOf',
                        includedQuantity: 3,
                        forQuantity: 2,
                    }, {
                        productId: 'classic',
                        type: 'discountPrice',
                        discountPrice: 50,
                    }],
                },
            },
            {id: 'classic', price: 100},
        )).toEqual({
            discountApplied: true,
            itemTotal: 150,
            fullItemTotal: 300,
        })
    })

    it('should only apply discounts for matching products', () => {
        expect(subtotal({
                cartQuantities: {classic: 3},
                selectedCustomer: {
                    discounts: [{
                        productId: 'standout',
                        type: 'forThePriceOf',
                        includedQuantity: 3,
                        forQuantity: 2,
                    }],
                },
            },
            {id: 'classic', price: 100},
        )).toEqual({discountApplied: false, itemTotal: 300, fullItemTotal: 300})
    })

})

const products = [
    {id: 'classic', price: 269.99},
    {id: 'standout', price: 322.99},
    {id: 'premium', price: 394.99},
]

describe('total', () => {

    it('should add up a basic total', () => {
        expect(total({
            cartQuantities: {classic: 1},
            products: products,
        })).toEqual(269.99)
    })

    it('should add up a total with discounts', () => {
        expect(total({
            cartQuantities: {classic: 3},
            products: products,
            selectedCustomer: {
                discounts: [{
                    productId: 'classic',
                    type: 'forThePriceOf',
                    includedQuantity: 3,
                    forQuantity: 2,
                }],
            },
        })).toEqual(539.98)
    })

    describe('business examples', () => {

        test('default', () => {
            expect(total({
                cartQuantities: {classic: 1, standout: 1, premium: 1},
                products: products,
            })).toEqual(987.97)
        })

        test('Unilever', () => {
            expect(total({
                cartQuantities: {classic: 3, standout: 0, premium: 1},
                products: products,
                selectedCustomer: {
                    discounts: [{
                        productId: 'classic',
                        type: 'forThePriceOf',
                        includedQuantity: 3,
                        forQuantity: 2,
                    }],
                },
            })).toEqual(934.97)
        })

        test('Apple', () => {
            expect(total({
                cartQuantities: {classic: 0, standout: 3, premium: 1},
                products: products,
                selectedCustomer: {
                    discounts: [{
                        productId: 'standout',
                        type: 'discountPrice',
                        discountPrice: 299.99,
                    }],
                },
            })).toEqual(1294.96)
        })

        test('Nike', () => {
            expect(total({
                cartQuantities: {classic: 0, standout: 0, premium: 4},
                products: products,
                selectedCustomer: {
                    discounts: [{
                        productId: 'premium',
                        type: 'discountPriceAfter',
                        requiredQuantity: 4,
                        discountPrice: 379.99,
                    }],
                },
            })).toEqual(1519.96)
        })

        test('Ford', () => {
            expect(total({
                cartQuantities: {classic: 6, standout: 3, premium: 4},
                products: products,
                selectedCustomer: {
                    discounts: [{
                        productId: 'classic',
                        type: 'forThePriceOf',
                        includedQuantity: 5,
                        forQuantity: 4,
                    }, {
                        productId: 'standout',
                        type: 'discountPrice',
                        discountPrice: 309.99,
                    }, {
                        productId: 'premium',
                        type: 'discountPriceAfter',
                        requiredQuantity: 3,
                        discountPrice: 389.99,
                    }],
                },
            })).toEqual(3839.88)
        })
    })

})