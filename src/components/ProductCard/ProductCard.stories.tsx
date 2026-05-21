import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProductCard } from './ProductCard';

const meta = {
  title: 'Checkout/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  args: {
    name: 'Nike Running Shoe',
    description:
      "Crossing hardwood comfort with off-court flair. '80s-inspired construction, bold details and nothin'-but-net style.",
    price: '$69.99',
    tags: ['EU38', 'Black/White'],
  },
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
