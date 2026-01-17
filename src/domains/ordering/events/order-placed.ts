import { Money } from '../../product-catalog/money'
import { ProductId } from '../../product-catalog/product-id'
import { OrderId } from '../order-id'

export interface OrderPlacedLine {
    readonly productId: ProductId
    readonly quantity: number
    readonly unitPrice: Money
}

export interface OrderPlaced {
    readonly type: 'OrderPlaced'
    readonly orderId: OrderId
    readonly lines: readonly OrderPlacedLine[]
    readonly total: Money
    readonly occurredAt: Date
}
