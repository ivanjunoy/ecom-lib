import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AuthPanel } from './AuthPanel';

describe('AuthPanel', () => {
  it('renders gateway actions', () => {
    render(<AuthPanel />);

    expect(screen.getByRole('heading', { name: 'Accede a tu cuenta' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar sesion' })).toBeInTheDocument();
  });

  it('renders login fields and actions', async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();

    render(<AuthPanel variant="login" onLogin={onLogin} />);

    expect(screen.getByRole('heading', { name: 'Iniciar sesion' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contrasena')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Google' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Facebook' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Olvide mi contrasena' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  it('renders register fields and actions', async () => {
    const user = userEvent.setup();
    const onRegister = vi.fn();

    render(<AuthPanel variant="register" onRegister={onRegister} />);

    expect(screen.getByRole('heading', { name: 'Crear cuenta' })).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contrasena')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar contrasena')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }));

    expect(onRegister).toHaveBeenCalledTimes(1);
  });
});
