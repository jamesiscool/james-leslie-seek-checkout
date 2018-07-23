export const getProducts = () => {
    return Promise.resolve([
        {
            id: 'classic',
            name: 'Classic Ad',
            description: 'Basic level of advertisement',
            price: 269.99,
        }, {
            id: 'standout',
            name: 'Standout Ad',
            description: 'Basic plus allows the use of a company logo and a longer presentation text',
            price: 322.99,
        }, {
            id: 'premium',
            name: 'Premium Ad',
            description: 'Standout plus puts the ad at the top of search results allowing for higher visibility',
            price: 394.99,
        },
    ])
}