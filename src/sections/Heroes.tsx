import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Fact } from '../content/types';
import { home } from '../content/site';
import { Button } from '../components/widgets/Button';
import { Eyebrow } from '../components/widgets/Heading';
import { Icon } from '../components/ui/Icon';

/**
 * Home hero — Elementor Container (min-height 100vh − header, background image +
 * gradient overlay `--wk-hero-overlay`), Heading ×2, Text Editor, Button ×2, and an
 * Icon List "Now developing" callout.
 */
export function HomeHero() {
  const h = home.hero;
  return (
    <section className="wk-hero" data-el="container">
      <img className="wk-hero__bg" src={h.image} alt="" fetchPriority="high" />
      <div className="wk-hero__shade" aria-hidden="true" />
      <div className="wk-container wk-hero__inner">
        <div className="wk-hero__content">
          <Eyebrow line className="wk-rise">{h.eyebrow}</Eyebrow>
          <h1 className="wk-hero__title wk-rise wk-rise--2">{h.title}</h1>
          <p className="wk-hero__text wk-rise wk-rise--3">{h.text}</p>
          <div className="wk-hero__actions wk-rise wk-rise--4">
            <Button to={h.primary.to} variant="gold">{h.primary.label}</Button>
            <Button to={h.secondary.to} variant="ghost" icon={null}>{h.secondary.label}</Button>
          </div>
          <div className="wk-now wk-rise wk-rise--5">
            <span className="wk-now__dot" aria-hidden="true" />
            <div>
              <p className="wk-now__label">{h.now.label}</p>
              <p className="wk-now__text">{h.now.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  text?: string;
  /** Background photo; omit for the plain textured green hero. */
  image?: string;
  crumbs: Crumb[];
  stats?: Fact[];
  meta?: ReactNode;
  children?: ReactNode;
}

/** Inner-page hero — same structure as the home hero, shorter; optional stat strip. */
export function PageHero({ eyebrow, title, text, image, crumbs, stats, meta, children }: PageHeroProps) {
  return (
    <section className={`wk-pagehero${image ? '' : ' wk-pagehero--plain'}`} data-el="container">
      {image && <img className="wk-hero__bg" src={image} alt="" fetchPriority="high" />}
      {image && <div className="wk-hero__shade" aria-hidden="true" />}
      <div className="wk-container wk-pagehero__inner">
        <nav className="wk-crumbs wk-rise" aria-label="Breadcrumb">
          <ol>
            {crumbs.map((c, i) => (
              <li key={c.label}>
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                {i < crumbs.length - 1 && <Icon name="chevron-right" size={13} />}
              </li>
            ))}
          </ol>
        </nav>
        <Eyebrow line className="wk-rise wk-rise--2">{eyebrow}</Eyebrow>
        <h1 className="wk-pagehero__title wk-rise wk-rise--2">{title}</h1>
        {meta && <div className="wk-pagehero__meta wk-rise wk-rise--3">{meta}</div>}
        {text && <p className="wk-pagehero__text wk-rise wk-rise--3">{text}</p>}
        {children && <div className="wk-rise wk-rise--4">{children}</div>}
      </div>
      {stats && (
        <div className="wk-pagehero__stats">
          <div className="wk-container">
            <dl className="wk-herostats">
              {stats.map((s) => (
                <div key={s.label} className="wk-herostats__item">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}
