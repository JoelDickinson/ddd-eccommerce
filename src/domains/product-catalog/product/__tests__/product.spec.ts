import { ProductCreated } from '../../events/product-created'
import { Money } from '../../money'
import { ProductId } from '../../product-id'
import { ProductName } from '../../product-name'
import { Product } from '../product'

describe('Product', () => {
    const id = new ProductId('PROD-1')
    const name = new ProductName('Apple')
    const price = new Money(1)

    it('should initialise with id, name and price', () => {
        const product = new Product({ id, name, price })
        expect(product.id.value).toEqual('PROD-1')
        expect(product.name.value).toEqual('Apple')
        expect(product.price.amount).toEqual(1)
    })

    it('should have ProductId as identity', () => {
        const product = new Product({ id, name, price })
        expect(product.id.equals(new ProductId('PROD-1'))).toBe(true)
    })

    it('should throw when price is negative', () => {
        expect(
            () =>
                new Product({
                    id,
                    name,
                    price: new Money(-1),
                }),
        ).toThrow('Amount must be non-negative')
    })

    it('should throw when name is empty', () => {
        expect(
            () =>
                new Product({
                    id,
                    name: new ProductName(''),
                    price,
                }),
        ).toThrow('ProductName must not be empty')
    })

    describe('domain events', () => {
        it('should record ProductCreated event in constructor', () => {
            const product = new Product({ id, name, price })
            const events = product.getDomainEvents()
            expect(events).toHaveLength(1)
            expect(events[0].type).toBe('ProductCreated')
            const created = events[0] as ProductCreated
            expect(created.productId.equals(id)).toBe(true)
            expect(created.name.equals(name)).toBe(true)
            expect(created.price.equals(price)).toBe(true)
            expect(created.occurredAt).toBeInstanceOf(Date)
        })

        it('should return ProductCreated from getDomainEvents', () => {
            const product = new Product({ id, name, price })
            expect(product.getDomainEvents()).toHaveLength(1)
        })

        it('should record ProductPriceChanged when changePrice is called', () => {
            const product = new Product({ id, name, price })
            product.clearDomainEvents()
            const newPrice = new Money(2)
            product.changePrice(newPrice)
            const events = product.getDomainEvents()
            expect(events).toHaveLength(1)
            expect(events[0].type).toBe('ProductPriceChanged')
            expect((events[0] as { oldPrice: Money }).oldPrice.amount).toBe(1)
            expect((events[0] as { newPrice: Money }).newPrice.amount).toBe(2)
        })

        it('should empty events array after clearDomainEvents', () => {
            const product = new Product({ id, name, price })
            expect(product.getDomainEvents()).toHaveLength(1)
            product.clearDomainEvents()
            expect(product.getDomainEvents()).toHaveLength(0)
        })
    })
})
