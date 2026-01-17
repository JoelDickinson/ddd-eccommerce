import { ProductId } from '../product-id'

describe('ProductId', () => {
    it('should create ProductId with valid non-empty string', () => {
        const id = new ProductId('PROD-123')
        expect(id.value).toBe('PROD-123')
    })

    it('should throw if value is empty', () => {
        expect(() => new ProductId('')).toThrow('ProductId must not be empty')
    })

    it('should throw if value is whitespace only', () => {
        expect(() => new ProductId('   ')).toThrow('ProductId must not be empty')
    })

    it('should be equal to another ProductId with same value', () => {
        const a = new ProductId('PROD-1')
        const b = new ProductId('PROD-1')
        expect(a.equals(b)).toBe(true)
    })

    it('should not be equal to ProductId with different value', () => {
        const a = new ProductId('PROD-1')
        const b = new ProductId('PROD-2')
        expect(a.equals(b)).toBe(false)
    })

    it('should expose value property', () => {
        const id = new ProductId('PROD-1')
        expect(id).toHaveProperty('value')
        expect(id.value).toBe('PROD-1')
    })
})
