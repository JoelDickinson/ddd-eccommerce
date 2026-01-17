export class ProductId {
    public readonly value: string

    constructor(value: string) {
        const trimmed = value.trim()
        if (!trimmed) {
            throw new Error('ProductId must not be empty')
        }
        this.value = trimmed
    }

    equals(other: ProductId): boolean {
        return this.value === other.value
    }
}
