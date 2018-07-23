// All calculators must be have the same method signature (quantity, fullPrice, discount)
const discountCalculators = {
    forThePriceOf: (quantity, fullPrice, discount) => {
        const timesDiscountApplies = Math.floor(quantity / discount.includedQuantity)
        const coveredByDiscount = timesDiscountApplies * discount.includedQuantity
        const notCoveredByDiscount = quantity - coveredByDiscount
        const newQuantity = (timesDiscountApplies * discount.forQuantity) + notCoveredByDiscount
        return newQuantity * fullPrice
    },
    discountPrice: (quantity, fullPrice, discount) => {
        return quantity * discount.discountPrice
    },
    discountPriceAfter: (quantity, fullPrice, discount) => {
        if (quantity >= discount.requiredQuantity) {
            return quantity * discount.discountPrice
        } else {
            return quantity * fullPrice
        }
    },
}

export default discountCalculators