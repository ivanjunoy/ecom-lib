import styles from './ProductCard.module.scss';

export type ProductCardProps = {
  name: string;
  price: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  badge?: string;
  tags?: string[];
  actionLabel?: string;
  onAction?: () => void;
  favoriteLabel?: string;
  onFavorite?: () => void;
  className?: string;
};

export function ProductCard({
  name,
  price,
  description,
  imageUrl,
  imageAlt = '',
  badge,
  tags = [],
  actionLabel = 'Add to cart',
  onAction,
  favoriteLabel = 'Add to wishlist',
  onFavorite,
  className,
}: ProductCardProps) {
  return (
    <article className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.imageWrap}>
        {imageUrl ? (
          <img className={styles.image} src={imageUrl} alt={imageAlt} />
        ) : (
          <div className={styles.imageFallback} aria-hidden="true" />
        )}

        <button
          className={styles.favoriteButton}
          type="button"
          aria-label={favoriteLabel}
          onClick={onFavorite}
        >
          <span aria-hidden="true">♡</span>
        </button>
      </div>

      <div className={styles.content}>
        <h3>{name}</h3>

        {tags.length > 0 ? (
          <ul className={styles.tags} aria-label="Product attributes">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

        {description ? <p>{description}</p> : null}

        {badge ? <span className={styles.badge}>{badge}</span> : null}

        <div className={styles.footer}>
          <div className={styles.priceGroup}>
            <span>Price</span>
            <strong>{price}</strong>
          </div>

          <button className={styles.actionButton} type="button" onClick={onAction}>
            {actionLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
