import { ProductCreated } from '../events/product-created'
import { ProductPriceChanged } from '../events/product-price-changed'
import { Money } from '../money'
import { ProductId } from '../product-id'
import { ProductName } from '../product-name'

export interface IProductProps {
    id: ProductId
    name: ProductName
    price: Money
}

export class Product {
    public readonly id: ProductId
    public readonly name: ProductName
    private _price: Money
    private _domainEvents: Array<ProductCreated | ProductPriceChanged> = []

    constructor({ id, name, price }: IProductProps) {
        this.id = id
        this.name = name
        this._price = price
        this._domainEvents.push({
            type: 'ProductCreated',
            productId: id,
            name,
            price,
            occurredAt: new Date(),
        })
    }

    get price(): Money {
        return this._price
    }

    changePrice(newPrice: Money): void {
        const oldPrice = this._price
        this._domainEvents.push({
            type: 'ProductPriceChanged',
            productId: this.id,
            oldPrice,
            newPrice,
            occurredAt: new Date(),
        })
        this._price = newPrice
    }

    getDomainEvents(): Array<ProductCreated | ProductPriceChanged> {
        return [...this._domainEvents]
    }

    clearDomainEvents(): void {
        this._domainEvents = []
    }
}
