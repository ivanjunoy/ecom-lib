import { CheckoutPreview } from './CheckoutPreview';

export function HeroSection() {
  return (
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

      <CheckoutPreview />
    </section>
  );
}
