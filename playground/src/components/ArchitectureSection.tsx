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

export function ArchitectureSection() {
  return (
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
  );
}
