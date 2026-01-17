export class Money {
    public readonly amount: number
    public readonly currency: string

    constructor(amount: number, currency: string = 'GBP') {
        if (amount < 0) {
            throw new Error('Amount must be non-negative')
        }
        if (!currency || currency.trim() === '') {
            throw new Error('Currency must not be empty')
        }
        this.amount = amount
        this.currency = currency
    }

    equals(other: Money): boolean {
        return this.amount === other.amount && this.currency === other.currency
    }

    add(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Cannot add Money with different currencies')
        }
        return new Money(this.amount + other.amount, this.currency)
    }
}
