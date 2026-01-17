# Ecommerce DDD Project

A Domain-Driven Design (DDD) implementation of an ecommerce system, built with TypeScript. This project demonstrates core DDD patterns including bounded contexts, value objects, entities, aggregates, and domain events.

## Overview

This project implements a simplified ecommerce domain with two bounded contexts:

- **Product Catalog**: Manages product information, pricing, and product lifecycle
- **Ordering**: Handles order creation, order lines, and order placement

The project follows strict **Test-Driven Development (TDD)** principles, with all features implemented using the Red-Green-Refactor cycle.

## Features

- ✅ **Value Objects**: `ProductId`, `ProductName`, `Money`, `OrderId`
- ✅ **Entities**: `Product`, `Order`, `OrderLine`
- ✅ **Aggregate Roots**: `Product`, `Order`
- ✅ **Domain Events**: `ProductCreated`, `ProductPriceChanged`, `OrderPlaced`
- ✅ **Bounded Contexts**: Clear separation between Product Catalog and Ordering
- ✅ **TDD**: All code written test-first
- ✅ **Type Safety**: Full TypeScript with strict mode

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Available Scripts

```bash
# Run tests
npm test

# Build TypeScript to JavaScript
npm run build

# Format code with Prettier
npm run format
```

## Project Structure

```
src/
├── domains/
│   ├── product-catalog/          # Product Catalog Bounded Context
│   │   ├── product-id.ts         # Value Object
│   │   ├── product-name.ts       # Value Object
│   │   ├── money.ts              # Value Object (shared)
│   │   ├── product/               # Product Aggregate
│   │   │   ├── product.ts        # Aggregate Root
│   │   │   └── __tests__/
│   │   └── events/               # Domain Events
│   │       ├── product-created.ts
│   │       └── product-price-changed.ts
│   └── ordering/                 # Ordering Bounded Context
│       ├── order-id.ts           # Value Object
│       ├── order/                 # Order Aggregate
│       │   ├── order.ts          # Aggregate Root
│       │   ├── order-line.ts     # Entity
│       │   └── __tests__/
│       └── events/                # Domain Events
│           └── order-placed.ts
└── index.ts
```

## DDD Concepts Implemented

### Bounded Contexts

The project is organized into two bounded contexts that maintain clear boundaries:

- **Product Catalog**: Owns product data and pricing
- **Ordering**: Owns order data and references products by ID only

### Value Objects

Immutable objects defined by their attributes:

- `ProductId`: Unique product identifier
- `ProductName`: Validated product name
- `Money`: Amount and currency with validation
- `OrderId`: Unique order identifier

### Entities

Objects with identity that can change over time:

- `Product`: Product aggregate root
- `Order`: Order aggregate root
- `OrderLine`: Entity within Order aggregate

### Aggregate Roots

- `Product`: Controls access to product data
- `Order`: Controls access to order and order lines, enforces business rules

### Domain Events

Immutable records of domain occurrences:

- `ProductCreated`: Emitted when a product is created
- `ProductPriceChanged`: Emitted when a product price changes
- `OrderPlaced`: Emitted when an order is placed

## Example Usage

### Creating a Product

```typescript
import { Product } from './domains/product-catalog/product/product'
import { ProductId } from './domains/product-catalog/product-id'
import { ProductName } from './domains/product-catalog/product-name'
import { Money } from './domains/product-catalog/money'

const product = new Product({
    id: new ProductId('PROD-1'),
    name: new ProductName('Apple'),
    price: new Money(1.50, 'GBP')
})

// Access domain events
const events = product.getDomainEvents()
console.log(events[0]) // ProductCreated event
```

### Creating an Order

```typescript
import { Order } from './domains/ordering/order/order'
import { OrderId } from './domains/ordering/order-id'
import { ProductId } from './domains/product-catalog/product-id'
import { Money } from './domains/product-catalog/money'

const order = new Order(new OrderId('ORD-1'))
order.addLine(
    new ProductId('PROD-1'),
    2,
    new Money(1.50, 'GBP')
)
order.place()

// Access domain events
const events = order.getDomainEvents()
console.log(events[0]) // OrderPlaced event
```

## Testing

All code is written using Test-Driven Development (TDD). Tests are located alongside the code they test in `__tests__` directories.

Run tests with:

```bash
npm test
```

Test coverage is collected automatically. View coverage reports in the `coverage/` directory after running tests.

## Architecture Documentation

For detailed architecture documentation and diagrams, see [docs/ddd-architecture.md](./docs/ddd-architecture.md).

## Development Principles

1. **TDD First**: All features are implemented test-first
2. **Domain-Driven**: Business logic lives in the domain layer
3. **Type Safety**: Leverage TypeScript's type system
4. **Immutability**: Value objects are immutable
5. **Clear Boundaries**: Bounded contexts maintain clear separation

## License

Private project - not for distribution.
