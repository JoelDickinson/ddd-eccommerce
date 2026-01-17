import { Money } from '../money'

describe('Money', () => {
    it('should create Money with valid amount and currency', () => {
        const money = new Money(100, 'GBP')
        expect(money.amount).toBe(100)
        expect(money.currency).toBe('GBP')
    })

    it('should throw on negative amount', () => {
        expect(() => new Money(-1, 'GBP')).toThrow('Amount must be non-negative')
    })

    it('should throw on empty currency', () => {
        expect(() => new Money(100, '')).toThrow('Currency must not be empty')
    })

    it('should default currency to GBP if not provided', () => {
        const money = new Money(100)
        expect(money.currency).toBe('GBP')
    })

    it('should be equal to another Money with same amount and currency', () => {
        const a = new Money(50, 'GBP')
        const b = new Money(50, 'GBP')
        expect(a.equals(b)).toBe(true)
    })

    it('should not be equal to Money with different amount', () => {
        const a = new Money(50, 'GBP')
        const b = new Money(51, 'GBP')
        expect(a.equals(b)).toBe(false)
    })

    it('should not be equal to Money with different currency', () => {
        const a = new Money(50, 'GBP')
        const b = new Money(50, 'USD')
        expect(a.equals(b)).toBe(false)
    })

    it('should add two Money objects with same currency', () => {
        const a = new Money(30, 'GBP')
        const b = new Money(20, 'GBP')
        const sum = a.add(b)
        expect(sum.amount).toBe(50)
        expect(sum.currency).toBe('GBP')
        expect(sum).not.toBe(a)
        expect(sum).not.toBe(b)
    })

    it('should throw when adding Money with different currencies', () => {
        const a = new Money(30, 'GBP')
        const b = new Money(20, 'USD')
        expect(() => a.add(b)).toThrow('Cannot add Money with different currencies')
    })
})
