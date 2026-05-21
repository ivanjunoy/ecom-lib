import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CouponInput } from './CouponInput';

describe('CouponInput', () => {
  it('renders an accessible label and current value', () => {
    render(<CouponInput value="SAVE10" onChange={vi.fn()} onApply={vi.fn()} />);

    expect(screen.getByLabelText('Código de cupón')).toHaveValue('SAVE10');
  });

  it('calls onChange when the input value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<CouponInput value="" onChange={onChange} onApply={vi.fn()} />);

    await user.type(screen.getByLabelText('Código de cupón'), 'SAVE10');

    expect(onChange).toHaveBeenCalledWith('S');
  });

  it('calls onApply when clicking the apply button with a value', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();

    render(<CouponInput value="SAVE10" onChange={vi.fn()} onApply={onApply} />);

    await user.click(screen.getByRole('button', { name: 'Aplicar' }));

    expect(onApply).toHaveBeenCalledTimes(1);
  });

  it('calls onApply when pressing Enter with a value', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();

    render(<CouponInput value="SAVE10" onChange={vi.fn()} onApply={onApply} />);

    await user.type(screen.getByLabelText('Código de cupón'), '{Enter}');

    expect(onApply).toHaveBeenCalledTimes(1);
  });

  it('does not call onApply when the value is empty', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();

    render(<CouponInput value="   " onChange={vi.fn()} onApply={onApply} />);

    await user.click(screen.getByRole('button', { name: 'Aplicar' }));
    await user.type(screen.getByLabelText('Código de cupón'), '{Enter}');

    expect(onApply).not.toHaveBeenCalled();
  });

  it('does not call onApply while loading', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();

    render(<CouponInput value="SAVE10" onChange={vi.fn()} onApply={onApply} loading />);

    await user.type(screen.getByLabelText('Código de cupón'), '{Enter}');

    expect(screen.getByRole('button', { name: 'Aplicando...' })).toBeDisabled();
    expect(onApply).not.toHaveBeenCalled();
  });

  it('does not call onApply when disabled', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();

    render(<CouponInput value="SAVE10" onChange={vi.fn()} onApply={onApply} disabled />);

    await user.type(screen.getByLabelText('Código de cupón'), '{Enter}');

    expect(screen.getByRole('button', { name: 'Aplicar' })).toBeDisabled();
    expect(onApply).not.toHaveBeenCalled();
  });

  it('links error text to the input', () => {
    render(
      <CouponInput
        value="SAVE10"
        onChange={vi.fn()}
        onApply={vi.fn()}
        error="El cupón no es válido"
      />,
    );

    const input = screen.getByLabelText('Código de cupón');
    const error = screen.getByRole('alert');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', error.id);
    expect(error).toHaveTextContent('El cupón no es válido');
  });
});
