import { useId } from 'react';

import styles from './AuthPanel.module.scss';

export type AuthPanelVariant = 'gateway' | 'login' | 'register';

export type AuthPanelProps = {
  variant?: AuthPanelVariant;
  title?: string;
  description?: string;
  className?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onForgotPassword?: () => void;
  onFacebookAuth?: () => void;
  onGoogleAuth?: () => void;
};

const copyByVariant: Record<AuthPanelVariant, { title: string; description: string }> = {
  gateway: {
    title: 'Accede a tu cuenta',
    description: 'Gestiona tus compras, preferencias y beneficios desde un espacio privado.',
  },
  login: {
    title: 'Iniciar sesion',
    description: 'Ingresa con tus credenciales o continua con una cuenta social.',
  },
  register: {
    title: 'Crear cuenta',
    description: 'Completa tus datos para guardar direcciones, pagos y seguimiento de pedidos.',
  },
};

export function AuthPanel({
  variant = 'gateway',
  title,
  description,
  className,
  onLogin,
  onRegister,
  onForgotPassword,
  onFacebookAuth,
  onGoogleAuth,
}: AuthPanelProps) {
  const generatedId = useId();
  const resolvedTitle = title ?? copyByVariant[variant].title;
  const resolvedDescription = description ?? copyByVariant[variant].description;

  return (
    <section
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-labelledby={generatedId}
    >
      <div className={styles.header}>
        <p className={styles.kicker}>Cuenta segura</p>
        <h3 id={generatedId}>{resolvedTitle}</h3>
        <p>{resolvedDescription}</p>
      </div>

      {variant === 'gateway' ? (
        <div className={styles.gatewayActions}>
          <button className={styles.primaryButton} type="button" onClick={onRegister}>
            Registrarse
          </button>
          <button className={styles.secondaryButton} type="button" onClick={onLogin}>
            Iniciar sesion
          </button>
        </div>
      ) : (
        <>
          <div className={styles.socialGrid} aria-label="Opciones sociales">
            <button className={styles.socialButton} type="button" onClick={onGoogleAuth}>
              <span aria-hidden="true">G</span>
              Google
            </button>
            <button className={styles.socialButton} type="button" onClick={onFacebookAuth}>
              <span aria-hidden="true">f</span>
              Facebook
            </button>
          </div>

          <div className={styles.divider}>
            <span>o continua con email</span>
          </div>

          <form className={styles.form}>
            {variant === 'register' ? (
              <label className={styles.field}>
                <span>Nombre completo</span>
                <input type="text" name="name" placeholder="Sofia Alvarez" autoComplete="name" />
              </label>
            ) : null}

            <label className={styles.field}>
              <span>Email</span>
              <input type="email" name="email" placeholder="tu@email.com" autoComplete="email" />
            </label>

            <label className={styles.field}>
              <span>Contrasena</span>
              <input
                type="password"
                name="password"
                placeholder="Minimo 8 caracteres"
                autoComplete={variant === 'login' ? 'current-password' : 'new-password'}
              />
            </label>

            {variant === 'register' ? (
              <label className={styles.field}>
                <span>Confirmar contrasena</span>
                <input
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Repite tu contrasena"
                  autoComplete="new-password"
                />
              </label>
            ) : (
              <button className={styles.linkButton} type="button" onClick={onForgotPassword}>
                Olvide mi contrasena
              </button>
            )}

            <button
              className={styles.primaryButton}
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                if (variant === 'login') {
                  onLogin?.();
                  return;
                }

                onRegister?.();
              }}
            >
              {variant === 'login' ? 'Ingresar' : 'Crear cuenta'}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
