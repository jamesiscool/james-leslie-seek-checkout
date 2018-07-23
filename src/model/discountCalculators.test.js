import discountCalculators from './discountCalculators'

describe('discountCalculators', () => {

    describe('forThePriceOf', () => {

        test('regular use', () => {
            expect(discountCalculators.forThePriceOf(3, 100, {forQuantity: 2, includedQuantity: 3})).toBe(200)
        })

        test('handles fractions', () => {
            expect(discountCalculators.forThePriceOf(3, 100.50, {forQuantity: 2, includedQuantity: 3})).toBe(201)
        })

        test('handles quantity not evenly divisible by includedQuantity', () => {
            expect(discountCalculators.forThePriceOf(4, 100, {forQuantity: 2, includedQuantity: 3})).toBe(300)
        })

        test('handles quantity less then includedQuantity', () => {
            expect(discountCalculators.forThePriceOf(2, 100, {forQuantity: 2, includedQuantity: 3})).toBe(200)
        })

        test('handles quantity of 0', () => {
            expect(discountCalculators.forThePriceOf(0, 100, {forQuantity: 2, includedQuantity: 3})).toBe(0)
        })

    })

    describe('discountPrice', () => {

        test('regular use', () => {
            expect(discountCalculators.discountPrice(3, 100, {discountPrice: 50})).toBe(150)
        })

        test('handles fractions', () => {
            expect(discountCalculators.discountPrice(3, 100, {discountPrice: 50.50})).toBe(151.5)
        })

        test('handles quantity of 0', () => {
            expect(discountCalculators.discountPrice(0, 100, {discountPrice: 50})).toBe(0)
        })

    })

    describe('discountPriceAfter', () => {

        test('regular use', () => {
            expect(discountCalculators.discountPriceAfter(3, 100, {requiredQuantity: 3, discountPrice: 50})).toBe(150)
        })

        test('handles fractions', () => {
            expect(discountCalculators.discountPriceAfter(3, 100, {requiredQuantity: 3, discountPrice: 50.50})).toBe(151.5)
        })

        test('handles quantity less then required quantity', () => {
            expect(discountCalculators.discountPriceAfter(2, 100, {requiredQuantity: 3, discountPrice: 50})).toBe(200)
        })

        test('handles quantity of 0', () => {
            expect(discountCalculators.discountPriceAfter(0, 100, {discountPrice: 50})).toBe(0)
        })

    })

})