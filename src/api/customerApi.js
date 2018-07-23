export const getCustomers = () => {
    return Promise.resolve([
        {
            id: 1,
            name: 'Unilever',
            discounts: [{
                productId: 'classic',
                type: 'forThePriceOf',
                includedQuantity: 3,
                forQuantity: 2,
            }],
        },
        {
            id: 2,
            name: 'Apple',
            discounts: [{
                productId: 'standout',
                type: 'discountPrice',
                discountPrice: 299.99,
            }],
        },
        {
            id: 3,
            name: 'Nike',
            discounts: [{
                productId: 'premium',
                type: 'discountPriceAfter',
                requiredQuantity: 4,
                discountPrice: 379.99,
            }],
        },
        {
            id: 4,
            name: 'Ford',
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
    ])
}