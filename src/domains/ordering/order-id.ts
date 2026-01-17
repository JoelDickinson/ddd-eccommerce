export class OrderId {
    public readonly value: string

    constructor(value: string) {
        const trimmed = value.trim()
        if (!trimmed) {
            throw new Error('OrderId must not be empty')
        }
        this.value = trimmed
    }

    equals(other: OrderId): boolean {
        return this.value === other.value
    }
}
