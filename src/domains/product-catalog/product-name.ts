export class ProductName {
    public readonly value: string

    constructor(value: string) {
        const trimmed = value.trim()
        if (!trimmed) {
            throw new Error('ProductName must not be empty')
        }
        this.value = trimmed
    }

    equals(other: ProductName): boolean {
        return this.value === other.value
    }
}
