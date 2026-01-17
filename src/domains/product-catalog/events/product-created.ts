import { Money } from '../money'
import { ProductId } from '../product-id'
import { ProductName } from '../product-name'

export interface ProductCreated {
    readonly type: 'ProductCreated'
    readonly productId: ProductId
    readonly name: ProductName
    readonly price: Money
    readonly occurredAt: Date
}
