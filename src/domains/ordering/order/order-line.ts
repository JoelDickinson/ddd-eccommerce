import { Money } from '../../product-catalog/money'
import { ProductId } from '../../product-catalog/product-id'

export interface IOrderLineProps {
    productId: ProductId
    quantity: number
    unitPrice: Money
}

export class OrderLine {
    public readonly productId: ProductId
    public readonly quantity: number
    public readonly unitPrice: Money
    public readonly lineTotal: Money

    constructor({ productId, quantity, unitPrice }: IOrderLineProps) {
        if (quantity < 1) {
            throw new Error('Quantity must be at least 1')
        }
        if (!Number.isInteger(quantity)) {
            throw new Error('Quantity must be an integer')
        }
        this.productId = productId
        this.quantity = quantity
        this.unitPrice = unitPrice
        this.lineTotal = new Money(quantity * unitPrice.amount, unitPrice.currency)
    }
}
