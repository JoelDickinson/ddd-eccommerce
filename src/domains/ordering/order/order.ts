import { Money } from '../../product-catalog/money'
import { ProductId } from '../../product-catalog/product-id'
import { OrderPlaced } from '../events/order-placed'
import { OrderId } from '../order-id'
import { OrderLine } from './order-line'

export type OrderStatus = 'Draft' | 'Placed' | 'Shipped'

export class Order {
    public readonly id: OrderId
    public status: OrderStatus
    public lines: OrderLine[]
    private _domainEvents: OrderPlaced[] = []

    constructor(id: OrderId) {
        this.id = id
        this.status = 'Draft'
        this.lines = []
    }

    addLine(productId: ProductId, quantity: number, unitPrice: Money): void {
        if (this.status !== 'Draft') {
            throw new Error('Cannot add line to order that is not Draft')
        }
        this.lines.push(new OrderLine({ productId, quantity, unitPrice }))
    }

    removeLine(index: number): void {
        if (this.status !== 'Draft') {
            throw new Error('Cannot remove line from order that is not Draft')
        }
        this.lines.splice(index, 1)
    }

    place(): void {
        if (this.lines.length === 0) {
            throw new Error('Cannot place order with no lines')
        }
        this.status = 'Placed'
        this._domainEvents.push({
            type: 'OrderPlaced',
            orderId: this.id,
            lines: this.lines.map((l) => ({
                productId: l.productId,
                quantity: l.quantity,
                unitPrice: l.unitPrice,
            })),
            total: this.total(),
            occurredAt: new Date(),
        })
    }

    getDomainEvents(): OrderPlaced[] {
        return [...this._domainEvents]
    }

    clearDomainEvents(): void {
        this._domainEvents = []
    }

    total(): Money {
        if (this.lines.length === 0) {
            return new Money(0, 'GBP')
        }
        return this.lines.reduce(
            (sum, line) => sum.add(line.lineTotal),
            new Money(0, this.lines[0].unitPrice.currency),
        )
    }
}
