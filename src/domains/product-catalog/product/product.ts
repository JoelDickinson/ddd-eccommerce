export interface IProductProps {
    name: string
    price: number
}

export class Product {
    public name: string
    public price: number

    constructor({ name, price }: IProductProps) {
        if (price < 0) {
            throw new Error('Price must be non-negative')
        }

        this.name = name
        this.price = price
    }
}
