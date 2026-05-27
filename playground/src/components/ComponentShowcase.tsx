import { useMemo, useState } from 'react';

import { CouponInput, ProductCard } from '../../../src';

type CouponState = 'idle' | 'success' | 'error';

export function ComponentShowcase() {
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
    <section className="band" id="demo">
      <div className="sectionHeader">
        <p className="eyebrow">Componentes</p>
        <h2>Bloques para checkout</h2>
        <p>
          Esta sección funciona como vitrina del sistema: cada tarjeta muestra un componente de la
          librería en un contexto real de e-commerce.
        </p>
      </div>

      <div className="componentShowcaseGrid">
        <div className="componentDemoSlot">
          <div className="componentDemoHeader">
            <h3>ProductCard</h3>
            <span>Product summary</span>
          </div>

          <ProductCard
            name="Nike Running Shoe"
            description="Crossing hardwood comfort with off-court flair. '80s-inspired construction, bold details and nothin'-but-net style."
            price="$69.99"
            tags={['EU38', 'Black/White']}
          />
        </div>

        <div className="componentDemoSlot">
          <div className="componentDemoHeader">
            <h3>CouponInput</h3>
            <span>Promo code</span>
          </div>

          <article className="componentDemoCard" aria-label="CouponInput demo">
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
      </div>
    </section>
  );
}
