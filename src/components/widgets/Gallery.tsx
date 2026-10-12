import { useState } from 'react';
import type { Img } from '../../content/types';
import { Icon } from '../ui/Icon';
import { Lightbox } from './Lightbox';

interface Props {
  images: Img[];
  cols?: 2 | 3 | 4;
  /** Contain (plans, maps) instead of cover-cropping photos. */
  contain?: boolean;
}

/** Elementor Gallery / Basic Gallery widget, link → Media File, lightbox on. */
export function Gallery({ images, cols = 3, contain }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className={`wk-gallery wk-gallery--${cols}${contain ? ' wk-gallery--contain' : ''}`} data-widget="gallery">
        {images.map((img, i) => (
          <figure key={img.src + i} className="wk-gallery__item" data-reveal style={{ transitionDelay: `${(i % cols) * 60}ms` }}>
            <button type="button" className="wk-gallery__btn" onClick={() => setOpen(i)} aria-label={`Enlarge: ${img.alt}`}>
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
              <span className="wk-gallery__zoom" aria-hidden="true">
                <Icon name="maximize" size={18} />
              </span>
            </button>
            {img.caption && <figcaption>{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}
