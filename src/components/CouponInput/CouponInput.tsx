import { useId } from 'react';

import styles from './CouponInput.module.scss';

export type CouponInputProps = {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
  label?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  applyLabel?: string;
  loadingLabel?: string;
};

export function CouponInput({
  value,
  onChange,
  onApply,
  loading = false,
  error,
  disabled = false,
  label = 'Código de cupón',
  id,
  className,
  placeholder,
  applyLabel = 'Aplicar',
  loadingLabel = 'Aplicando...',
}: CouponInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const isApplyDisabled = disabled || loading || value.trim().length === 0;

  const applyCoupon = () => {
    if (isApplyDisabled) {
      return;
    }

    onApply();
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>

      <div className={styles.controlGroup}>
        <input
          id={inputId}
          className={styles.input}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              applyCoupon();
            }
          }}
          disabled={disabled || loading}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />

        <button
          className={styles.button}
          type="button"
          onClick={applyCoupon}
          disabled={isApplyDisabled}
        >
          {loading ? loadingLabel : applyLabel}
        </button>
      </div>

      {error ? (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
