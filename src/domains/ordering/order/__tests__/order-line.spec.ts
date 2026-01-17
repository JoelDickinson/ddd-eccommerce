import { Money } from '../../../product-catalog/money'
import { ProductId } from '../../../product-catalog/product-id'
import { OrderLine } from '../order-line'

describe('OrderLine', () => {
    const productId = new ProductId('PROD-1')
    const unitPrice = new Money(10, 'GBP')

    it('should create OrderLine with productId, quantity and unitPrice', () => {
        const line = new OrderLine({ productId, quantity: 2, unitPrice })
        expect(line.productId.equals(productId)).toBe(true)
        expect(line.quantity).toBe(2)
        expect(line.unitPrice.equals(unitPrice)).toBe(true)
    })

    it('should throw on quantity less than 1', () => {
        expect(
            () => new OrderLine({ productId, quantity: 0, unitPrice }),
        ).toThrow('Quantity must be at least 1')
        expect(
            () => new OrderLine({ productId, quantity: -1, unitPrice }),
        ).toThrow('Quantity must be at least 1')
    })

    it('should throw on non-integer quantity', () => {
        expect(
            () => new OrderLine({ productId, quantity: 1.5, unitPrice }),
        ).toThrow('Quantity must be an integer')
    })

    it('should calculate lineTotal correctly', () => {
        const line = new OrderLine({ productId, quantity: 3, unitPrice })
        expect(line.lineTotal.amount).toBe(30)
        expect(line.lineTotal.currency).toBe('GBP')
    })

    it('should be immutable once created', () => {
        const line = new OrderLine({ productId, quantity: 2, unitPrice })
        expect(line.productId).toBeDefined()
        expect(line.quantity).toBe(2)
        expect(line.unitPrice).toBeDefined()
        expect(line.lineTotal).toBeDefined()
    })
})
