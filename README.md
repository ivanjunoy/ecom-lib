# library-ivan-junoy

React + TypeScript components and hooks for e-commerce checkout flows.

## Scripts

```sh
npm install
npm run dev
npm run build
npm run test:run
npm run lint
npm run storybook
```

## MVP

- React + TypeScript
- Vite library mode
- Storybook
- Vitest + React Testing Library
- ESLint + Prettier
- Components exported from `src/index.ts`

## Components

### `CouponInput`

Controlled coupon code input for checkout flows. It includes a label, text input,
apply button, loading state, disabled state, Enter key submission, and accessible
error messaging.

Main props:

- `value`: current coupon code.
- `onChange`: receives the next input value.
- `onApply`: runs when the user applies the coupon.
- `loading`, `error`, `disabled`: optional UI states.
- `label`, `placeholder`, `applyLabel`, `loadingLabel`: optional text overrides.
- `id`, `className`: optional DOM customization.

### `ProductCard`

Product summary card for catalog or checkout-adjacent views. It supports product
imagery, fallback image state, tags, badge, price, primary action, and wishlist
action.

Main props:

- `name`: product name.
- `price`: display price.
- `description`: optional product description.
- `imageUrl`, `imageAlt`: optional product image.
- `badge`, `tags`: optional product metadata.
- `actionLabel`, `onAction`: optional primary action.
- `favoriteLabel`, `onFavorite`: optional wishlist action.
- `className`: optional DOM customization.

## Development surfaces

- `npm run dev`: opens the local playground/docs app.
- `npm run storybook`: opens Storybook for isolated component states.
- `npm run build`: builds the publishable library.
- `npm run build:docs`: builds the playground/docs app into `docs-dist`.
