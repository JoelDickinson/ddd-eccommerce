import { IProductProps, Product } from '../product'

const props: IProductProps = {
    name: 'Apple',
    price: 1,
}

describe('Product', () => {
    it('should initialise with name and price', () => {
        const product = new Product(props)
        expect(product.name).toEqual(props.name)
        expect(product.price).toEqual(props.price)
    })

    it('should throw if price is below 0', () => {
        expect(
            () =>
                new Product({
                    ...props,
                    price: -1,
                }),
        ).toThrow('Price must be non-negative')
    })
})
