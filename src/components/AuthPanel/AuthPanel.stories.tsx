import type { Meta, StoryObj } from '@storybook/react-vite';

import { AuthPanel } from './AuthPanel';

const meta = {
  title: 'Components/AuthPanel',
  component: AuthPanel,
  args: {
    variant: 'gateway',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['gateway', 'login', 'register'],
    },
  },
} satisfies Meta<typeof AuthPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Gateway: Story = {
  args: {
    variant: 'gateway',
  },
};

export const Login: Story = {
  args: {
    variant: 'login',
  },
};

export const Register: Story = {
  args: {
    variant: 'register',
  },
};
