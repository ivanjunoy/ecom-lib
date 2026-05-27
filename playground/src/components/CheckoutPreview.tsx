import { useEffect, useState } from 'react';

import { CouponInput, ProductCard } from '../../../src';
import './CheckoutPreview.css';

type PreviewSlide = {
  key: 'product-card' | 'coupon-input' | 'order-review';
  title: string;
  eyebrow: string;
};

const previewSlides: PreviewSlide[] = [
  {
    key: 'product-card',
    title: 'ProductCard',
    eyebrow: 'Product summary',
  },
  {
    key: 'coupon-input',
    title: 'CouponInput',
    eyebrow: 'Promo code',
  },
  {
    key: 'order-review',
    title: 'Checkout review',
    eyebrow: 'Order totals',
  },
];

const previewInterval = 3200;

function renderPreviewSlide(slide: PreviewSlide) {
  if (slide.key === 'product-card') {
    return (
      <ProductCard
        className="previewProductCard"
        name="Nike Running Shoe"
        description="Comfort diario para sumar al carrito desde el resumen."
        price="$69.99"
        badge="Nuevo"
        tags={['EU38', 'Black/White']}
      />
    );
  }

  if (slide.key === 'coupon-input') {
    return (
      <article className="previewCouponCard">
        <CouponInput
          id="preview-promo-code"
          label="Promo code"
          placeholder="Promo code"
          applyLabel="Apply"
          loadingLabel="Applying..."
          value="SAVE15"
          onChange={() => undefined}
          onApply={() => undefined}
        />
        <p className="successMessage">Cupón listo para aplicar.</p>
      </article>
    );
  }

  return (
    <article className="previewOrderCard" aria-label="Resumen de orden">
      <dl className="checkoutTotals">
        <div>
          <dt>Subtotal</dt>
          <dd>$300.00</dd>
        </div>
        <div>
          <dt>Delivery & Handling</dt>
          <dd>$8.00</dd>
        </div>
        <div>
          <dt>Discount</dt>
          <dd>-$45.00</dd>
        </div>
        <div className="checkoutTotalRow">
          <dt>Total</dt>
          <dd>$263.00</dd>
        </div>
      </dl>
      <button className="placeOrderButton" type="button">
        Place order
      </button>
    </article>
  );
}

export function CheckoutPreview() {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const activePreview = previewSlides[activePreviewIndex];

  useEffect(() => {
    const previewTimer = window.setInterval(() => {
      setActivePreviewIndex((currentIndex) => (currentIndex + 1) % previewSlides.length);
    }, previewInterval);

    return () => window.clearInterval(previewTimer);
  }, []);

  return (
    <div className="checkoutPreview" aria-live="polite" aria-label="Vista previa de checkout">
      <div className="previewHeader">
        <span>{activePreview.eyebrow}</span>
        <strong>{activePreview.title}</strong>
      </div>

      <div className="previewStage" key={activePreview.key}>
        {renderPreviewSlide(activePreview)}
      </div>

      <div className="previewDots" aria-hidden="true">
        {previewSlides.map((preview, index) => (
          <span
            className={index === activePreviewIndex ? 'isActive' : undefined}
            key={preview.key}
          />
        ))}
      </div>
    </div>
  );
}
