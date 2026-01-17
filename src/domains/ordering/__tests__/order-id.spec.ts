import { OrderId } from '../order-id'

describe('OrderId', () => {
    it('should create OrderId with valid non-empty string', () => {
        const id = new OrderId('ORD-123')
        expect(id.value).toBe('ORD-123')
    })

    it('should throw if value is empty', () => {
        expect(() => new OrderId('')).toThrow('OrderId must not be empty')
    })

    it('should throw if value is whitespace only', () => {
        expect(() => new OrderId('   ')).toThrow('OrderId must not be empty')
    })

    it('should be equal to another OrderId with same value', () => {
        const a = new OrderId('ORD-1')
        const b = new OrderId('ORD-1')
        expect(a.equals(b)).toBe(true)
    })

    it('should not be equal to OrderId with different value', () => {
        const a = new OrderId('ORD-1')
        const b = new OrderId('ORD-2')
        expect(a.equals(b)).toBe(false)
    })

    it('should expose value property', () => {
        const id = new OrderId('ORD-1')
        expect(id).toHaveProperty('value')
        expect(id.value).toBe('ORD-1')
    })
})
