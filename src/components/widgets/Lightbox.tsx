import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Img } from '../../content/types';
import { Icon } from '../ui/Icon';

interface Props {
  images: Img[];
  index: number | null;
  onChange: (i: number | null) => void;
}

/** Image lightbox — Elementor's built-in lightbox (Site Settings → Lightbox) replaces this. */
export function Lightbox({ images, index, onChange }: Props) {
  const open = index !== null;
  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      onChange((index + d + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, go, onChange]);

  if (index === null) return null;
  const img = images[index];

  return createPortal(
    <div className="wk-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => onChange(null)}>
      <button className="wk-lightbox__close" aria-label="Close" onClick={() => onChange(null)}>
        <Icon name="x" size={26} />
      </button>
      {images.length > 1 && (
        <>
          <button className="wk-lightbox__nav wk-lightbox__nav--prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); go(-1); }}>
            <Icon name="chevron-left" size={28} />
          </button>
          <button className="wk-lightbox__nav wk-lightbox__nav--next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); go(1); }}>
            <Icon name="chevron-right" size={28} />
          </button>
        </>
      )}
      <figure className="wk-lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={img.src} alt={img.alt} />
        <figcaption>
          <span>{img.caption ?? img.alt}</span>
          {images.length > 1 && (
            <span className="wk-lightbox__count">
              {index + 1} / {images.length}
            </span>
          )}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}
