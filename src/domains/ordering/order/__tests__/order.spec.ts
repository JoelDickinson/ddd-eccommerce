import { Money } from '../../../product-catalog/money'
import { ProductId } from '../../../product-catalog/product-id'
import { OrderPlaced } from '../../events/order-placed'
import { OrderId } from '../../order-id'
import { Order } from '../order'
import { OrderLine } from '../order-line'

describe('Order', () => {
    const orderId = new OrderId('ORD-1')
    const productId = new ProductId('PROD-1')
    const unitPrice = new Money(10, 'GBP')

    describe('construction', () => {
        it('should create Order with OrderId, starting as Draft with empty lines', () => {
            const order = new Order(orderId)
            expect(order.id.equals(orderId)).toBe(true)
            expect(order.status).toBe('Draft')
            expect(order.lines).toEqual([])
        })
    })

    describe('addLine', () => {
        it('should add line when Draft', () => {
            const order = new Order(orderId)
            order.addLine(productId, 2, unitPrice)
            expect(order.lines).toHaveLength(1)
            expect(order.lines[0].productId.equals(productId)).toBe(true)
            expect(order.lines[0].quantity).toBe(2)
        })

        it('should throw when adding line to Placed order', () => {
            const order = new Order(orderId)
            order.addLine(productId, 1, unitPrice)
            order.place()
            expect(() => order.addLine(productId, 1, unitPrice)).toThrow(
                'Cannot add line to order that is not Draft',
            )
        })

        it('should throw when quantity is less than 1', () => {
            const order = new Order(orderId)
            expect(() => order.addLine(productId, 0, unitPrice)).toThrow(
                'Quantity must be at least 1',
            )
        })

        it('should contain added line in lines array', () => {
            const order = new Order(orderId)
            order.addLine(productId, 3, unitPrice)
            const line = order.lines[0]
            expect(line).toBeInstanceOf(OrderLine)
            expect(line.quantity).toBe(3)
            expect(line.lineTotal.amount).toBe(30)
        })
    })

    describe('removeLine', () => {
        it('should remove line when Draft', () => {
            const order = new Order(orderId)
            order.addLine(productId, 1, unitPrice)
            expect(order.lines).toHaveLength(1)
            order.removeLine(0)
            expect(order.lines).toHaveLength(0)
        })

        it('should throw when removing from Placed order', () => {
            const order = new Order(orderId)
            order.addLine(productId, 1, unitPrice)
            order.place()
            expect(() => order.removeLine(0)).toThrow(
                'Cannot remove line from order that is not Draft',
            )
        })
    })

    describe('place', () => {
        it('should place Draft order with at least one line', () => {
            const order = new Order(orderId)
            order.addLine(productId, 1, unitPrice)
            order.place()
            expect(order.status).toBe('Placed')
        })

        it('should throw when placing order with no lines', () => {
            const order = new Order(orderId)
            expect(() => order.place()).toThrow(
                'Cannot place order with no lines',
            )
        })

        it('should not allow add or remove after placing', () => {
            const order = new Order(orderId)
            order.addLine(productId, 1, unitPrice)
            order.place()
            expect(() => order.addLine(productId, 1, unitPrice)).toThrow()
            expect(() => order.removeLine(0)).toThrow()
        })
    })

    describe('total', () => {
        it('should calculate total correctly from all lines', () => {
            const order = new Order(orderId)
            order.addLine(productId, 2, unitPrice)
            order.addLine(new ProductId('PROD-2'), 1, new Money(5, 'GBP'))
            expect(order.total().amount).toBe(25)
            expect(order.total().currency).toBe('GBP')
        })
    })

    describe('domain events', () => {
        it('should record OrderPlaced event when place is called', () => {
            const order = new Order(orderId)
            order.addLine(productId, 2, unitPrice)
            order.place()
            const events = order.getDomainEvents()
            expect(events).toHaveLength(1)
            expect(events[0].type).toBe('OrderPlaced')
        })

        it('should include orderId, lines, total and occurredAt in OrderPlaced', () => {
            const order = new Order(orderId)
            order.addLine(productId, 2, unitPrice)
            order.place()
            const placed = order.getDomainEvents()[0] as OrderPlaced
            expect(placed.orderId.equals(orderId)).toBe(true)
            expect(placed.lines).toHaveLength(1)
            expect(placed.lines[0].productId.equals(productId)).toBe(true)
            expect(placed.lines[0].quantity).toBe(2)
            expect(placed.lines[0].unitPrice.equals(unitPrice)).toBe(true)
            expect(placed.total.amount).toBe(20)
            expect(placed.occurredAt).toBeInstanceOf(Date)
        })

        it('should return OrderPlaced from getDomainEvents after place', () => {
            const order = new Order(orderId)
            order.addLine(productId, 1, unitPrice)
            order.place()
            expect(order.getDomainEvents()).toHaveLength(1)
        })
    })
})
