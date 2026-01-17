import { Money } from '../money'
import { ProductId } from '../product-id'

export interface ProductPriceChanged {
    readonly type: 'ProductPriceChanged'
    readonly productId: ProductId
    readonly oldPrice: Money
    readonly newPrice: Money
    readonly occurredAt: Date
}
