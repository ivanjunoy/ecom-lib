import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('renders product information', () => {
    render(
      <ProductCard
        name="Nike Running Shoe"
        description="Crossing hardwood comfort with off-court flair."
        price="$69.99"
        tags={['EU38', 'Black/White']}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Nike Running Shoe' })).toBeInTheDocument();
    expect(screen.getByText('Crossing hardwood comfort with off-court flair.')).toBeInTheDocument();
    expect(screen.getByText('$69.99')).toBeInTheDocument();
    expect(screen.getByText('EU38')).toBeInTheDocument();
    expect(screen.getByText('Black/White')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to wishlist' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
  });
});
