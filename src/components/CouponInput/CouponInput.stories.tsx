import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { CouponInput } from './CouponInput';

const meta = {
  title: 'Checkout/CouponInput',
  component: CouponInput,
  tags: ['autodocs'],
  args: {
    label: 'Código de cupón',
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof CouponInput>;

export default meta;

type Story = StoryObj<typeof meta>;

function StatefulCouponInput(args: ComponentProps<typeof CouponInput>) {
  const [value, setValue] = useState(args.value ?? '');

  return <CouponInput {...args} value={value} onChange={setValue} />;
}

export const Default: Story = {
  args: {
    value: '',
    onChange: () => undefined,
    onApply: () => undefined,
  },
  render: (args) => <StatefulCouponInput {...args} />,
};

export const WithValue: Story = {
  args: {
    value: 'SAVE10',
    onChange: () => undefined,
    onApply: () => undefined,
  },
  render: (args) => <StatefulCouponInput {...args} />,
};

export const Loading: Story = {
  args: {
    value: 'SAVE10',
    loading: true,
    onChange: () => undefined,
    onApply: () => undefined,
  },
  render: (args) => <StatefulCouponInput {...args} />,
};

export const Disabled: Story = {
  args: {
    value: 'SAVE10',
    disabled: true,
    onChange: () => undefined,
    onApply: () => undefined,
  },
  render: (args) => <StatefulCouponInput {...args} />,
};

export const WithError: Story = {
  args: {
    value: 'SAVE10',
    error: 'El cupón no es válido',
    onChange: () => undefined,
    onApply: () => undefined,
  },
  render: (args) => <StatefulCouponInput {...args} />,
};
