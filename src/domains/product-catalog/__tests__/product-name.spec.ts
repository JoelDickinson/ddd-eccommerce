import { ProductName } from '../product-name'

describe('ProductName', () => {
    it('should create ProductName with valid string', () => {
        const name = new ProductName('Apple')
        expect(name.value).toBe('Apple')
    })

    it('should automatically trim whitespace', () => {
        const name = new ProductName('  Apple  ')
        expect(name.value).toBe('Apple')
    })

    it('should throw on empty string after trim', () => {
        expect(() => new ProductName('')).toThrow('ProductName must not be empty')
        expect(() => new ProductName('   ')).toThrow('ProductName must not be empty')
    })

    it('should be equal to another ProductName with same trimmed value', () => {
        const a = new ProductName('Apple')
        const b = new ProductName('  Apple  ')
        expect(a.equals(b)).toBe(true)
    })

    it('should expose value property', () => {
        const name = new ProductName('Apple')
        expect(name).toHaveProperty('value')
        expect(name.value).toBe('Apple')
    })
})
