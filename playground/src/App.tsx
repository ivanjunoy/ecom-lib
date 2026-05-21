import { useMemo, useState } from 'react';

import { CouponInput } from '../../src';

type CouponState = 'idle' | 'success' | 'error';

const examples = [
  {
    name: 'Estado base',
    description: 'Entrada controlada para capturar y aplicar cupones en checkout.',
  },
  {
    name: 'Accesibilidad',
    description: 'Incluye label, estados inválidos y asociación del mensaje de error.',
  },
  {
    name: 'Reglas de acción',
    description: 'Bloquea aplicar cuando está deshabilitado, cargando o vacío.',
  },
];

function App() {
  const [coupon, setCoupon] = useState('');
  const [status, setStatus] = useState<CouponState>('idle');
  const [isLoading, setIsLoading] = useState(false);

  const error = status === 'error' ? 'El cupón ingresado no es válido.' : undefined;
  const successMessage = status === 'success' ? 'Cupón aplicado: 15% de descuento.' : undefined;

  const orderTotal = useMemo(() => {
    const subtotal = 300;
    const delivery = 8;
    const discount = status === 'success' ? subtotal * 0.15 : 0;

    return {
      subtotal,
      delivery,
      discount,
      total: subtotal + delivery - discount,
    };
  }, [status]);

  const applyCoupon = () => {
    setIsLoading(true);

    window.setTimeout(() => {
      setStatus(coupon.trim().toUpperCase() === 'SAVE15' ? 'success' : 'error');
      setIsLoading(false);
    }, 500);
  };

  return (
    <main>
      <section className="hero">
        <div className="heroContent">
          <h1>Componentes para checkout y e-commerce</h1>
          <p className="intro">
            Una librería enfocada en patrones reales de compra: cupones, resumen de orden,
            validaciones, estados de carga y hooks reutilizables.
          </p>
          <div className="actions">
            <a href="#demo">Ver demo</a>
            <a className="secondaryLink" href="#components">
              Componentes
            </a>
          </div>
        </div>

        <div className="checkoutPreview" aria-label="Vista previa de checkout">
          <div className="previewHeader">
            <span>Checkout</span>
            <strong>Demo</strong>
          </div>
          <div className="previewRows" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="previewTotal">
            <span>Total</span>
            <strong>$101.92</strong>
          </div>
        </div>
      </section>

      <section className="band" id="demo">
        <div className="sectionHeader">
          <p className="eyebrow">Playground</p>
          <h2>CouponInput en un flujo real</h2>
          <p>Probá con el código SAVE15 para simular un cupón válido.</p>
        </div>

        <div className="checkoutDemoShell">
          <article className="checkoutCard" aria-label="Checkout demo">
            <h3>Checkout</h3>

            <div className="productRow">
              <div className="productImage" aria-hidden="true" />
              <div className="productInfo">
                <strong>Ralph Lauren Satchel</strong>
                <span>Free size</span>
              </div>
              <strong className="productPrice">${orderTotal.subtotal.toFixed(2)}</strong>
            </div>

            <CouponInput
              className="checkoutCouponInput"
              id="checkout-promo-code"
              label="Promo code"
              placeholder="Promo code"
              applyLabel="Apply"
              loadingLabel="Applying..."
              value={coupon}
              onChange={(value) => {
                setCoupon(value);
                setStatus('idle');
              }}
              onApply={applyCoupon}
              loading={isLoading}
              error={error}
            />

            {successMessage ? <p className="successMessage">{successMessage}</p> : null}

            <dl className="checkoutTotals">
              <div>
                <dt>Subtotal</dt>
                <dd>${orderTotal.subtotal.toFixed(2)}</dd>
              </div>
              <div>
                <dt>Delivery & Handling</dt>
                <dd>${orderTotal.delivery.toFixed(2)}</dd>
              </div>
              {orderTotal.discount > 0 ? (
                <div>
                  <dt>Discount</dt>
                  <dd>-${orderTotal.discount.toFixed(2)}</dd>
                </div>
              ) : null}
              <div className="checkoutTotalRow">
                <dt>Total</dt>
                <dd>${orderTotal.total.toFixed(2)}</dd>
              </div>
            </dl>

            <button className="placeOrderButton" type="button">
              Place order
            </button>
          </article>
        </div>
      </section>

      <section className="band muted" id="components">
        <div className="sectionHeader">
          <p className="eyebrow">Arquitectura</p>
          <h2>Una fuente, varias superficies</h2>
          <p>
            El componente vive en la librería, y esta web lo consume igual que lo haría una app
            externa.
          </p>
        </div>

        <div className="featureGrid">
          {examples.map((example) => (
            <article className="featureCard" key={example.name}>
              <h3>{example.name}</h3>
              <p>{example.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
