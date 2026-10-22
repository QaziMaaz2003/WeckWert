import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Img, Project, SpecSheet } from '../content/types';
import { projectBySlug, projectsOfType } from '../content/projects';
import { brand } from '../content/site';
import { Section } from '../components/elementor/Section';
import type { Tone } from '../components/elementor/Section';
import { Eyebrow, SectionHeader } from '../components/widgets/Heading';
import { Button } from '../components/widgets/Button';
import { Gallery } from '../components/widgets/Gallery';
import { Lightbox } from '../components/widgets/Lightbox';
import { Icon } from '../components/ui/Icon';
import { PageHero } from '../sections/Heroes';
import { CtaBand } from '../sections/Blocks';
import { ProjectCard, shortPlace } from '../sections/Projects';
import { usePageTitle } from '../hooks/usePageTitle';
import NotFound from './NotFound';

/**
 * Single Project template — Elementor Pro Theme Builder → Single Post (Projects).
 * Every block below reads an ACF field with Dynamic Tags; blocks with empty fields
 * are hidden (Elementor Pro "Display Conditions" / ACF "Hide if empty").
 */
export default function ProjectDetail() {
  const { slug = '' } = useParams();
  const project = projectBySlug(slug);
  if (!project) return <NotFound />;
  return <ProjectView key={project.slug} project={project} />;
}

function ProjectView({ project: p }: { project: Project }) {
  usePageTitle(p.title, p.summary);
  const typeLabel = p.type === 'residential' ? 'Residential' : 'Commercial';
  const siblings = projectsOfType(p.type);
  const idx = siblings.findIndex((s) => s.slug === p.slug);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];
  const related = [1, 2, 3].map((o) => siblings[(idx + o) % siblings.length]).filter((r) => r.slug !== p.slug);

  // optional blocks, toned alternately so neighbours never share a background
  const blocks: { key: string; render: (tone: Tone) => ReactNode }[] = [];
  if (p.specs?.length) blocks.push({ key: 'specs', render: (t) => <SpecsBlock tone={t} specs={p.specs!} /> });
  if (p.gallery?.length) blocks.push({ key: 'gallery', render: (t) => <GalleryBlock tone={t} images={p.gallery!} title={p.short ?? p.title} /> });
  p.sections?.forEach((s) =>
    blocks.push({
      key: s.title,
      render: (t) => (
        <Section tone={t}>
          <div className="wk-split wk-split--sub">
            <div className="wk-prose" data-reveal>
              <Eyebrow>Amenities</Eyebrow>
              <h2 className="wk-h2">{s.title}</h2>
              {s.text.map((x, i) => (
                <p key={i}>{x}</p>
              ))}
            </div>
            <Gallery images={s.images} cols={3} />
          </div>
        </Section>
      ),
    }),
  );
  if (p.plans?.length) blocks.push({ key: 'plans', render: (t) => <PlansBlock tone={t} plans={p.plans!} /> });
  if (p.maps?.length)
    blocks.push({
      key: 'maps',
      render: (t) => (
        <Section tone={t}>
          <SectionHeader eyebrow="Location" title="Where it is." />
          <Gallery images={p.maps!} cols={2} contain />
        </Section>
      ),
    });

  const meta = (
    <ul className="wk-pmeta">
      <li>
        <Icon name="layers" size={16} />
        {p.category}
      </li>
      {p.location && (
        <li>
          <Icon name="map-pin" size={16} />
          {shortPlace(p.location)}
        </li>
      )}
      {p.years && (
        <li>
          <Icon name="calendar" size={16} />
          {p.years}
        </li>
      )}
      {p.status && <li className={`wk-badge wk-badge--${p.status.tone} wk-badge--inline`}>{p.status.label}</li>}
    </ul>
  );

  return (
    <>
      <PageHero
        eyebrow={`${typeLabel} project`}
        title={p.title}
        text={p.summary}
        image={p.plainHero ? undefined : p.cover}
        meta={meta}
        crumbs={[{ label: 'Home', to: '/' }, { label: typeLabel, to: `/${p.type}` }, { label: p.short ?? p.title }]}
      />

      <section className="wk-facts" aria-label="Project facts" data-el="container">
        <div className="wk-container">
          <dl className={`wk-facts__grid wk-facts__grid--${Math.min(p.facts.length, 6)}`}>
            {p.facts.map((f) => (
              <div key={f.label} className="wk-facts__item">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section tone="light">
        <div className="wk-overview">
          <div className="wk-prose" data-reveal>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="wk-h2">About {p.short ?? p.title}.</h2>
            {p.body.map((b, i) => (
              <p key={i} className={i === 0 ? 'wk-lead' : undefined}>
                {b}
              </p>
            ))}
          </div>
          <aside className="wk-aside" data-reveal>
            <div className="wk-aside__panel">
              {p.brandLogo && <img className="wk-aside__logo" src={p.brandLogo.src} alt={p.brandLogo.alt} loading="lazy" />}
              <p className="wk-aside__label">Highlights</p>
              <ul className="wk-aside__list">
                {p.highlights.map((h) => (
                  <li key={h}>
                    <Icon name="check" size={16} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <Button to="/contact" variant="gold" block>
                Discuss a similar project
              </Button>
              <a className="wk-aside__phone" href={brand.phoneHref}>
                <Icon name="phone" size={16} /> {brand.phone}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      {blocks.map((b, i) => (
        <div key={b.key} className="wk-block">{b.render(i % 2 === 0 ? 'sand' : 'light')}</div>
      ))}

      <nav className="wk-pager" aria-label="More projects">
        <div className="wk-container wk-pager__inner">
          <Link to={`/projects/${prev.slug}`} className="wk-pager__link wk-pager__link--prev">
            <Icon name="arrow-left" size={18} />
            <span>
              <small>Previous</small>
              {prev.short ?? prev.title}
            </span>
          </Link>
          <Link to={`/${p.type}`} className="wk-pager__all">
            All {typeLabel.toLowerCase()} projects
          </Link>
          <Link to={`/projects/${next.slug}`} className="wk-pager__link wk-pager__link--next">
            <span>
              <small>Next</small>
              {next.short ?? next.title}
            </span>
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </nav>

      <Section tone="forest">
        <SectionHeader eyebrow={`More ${typeLabel.toLowerCase()} work`} title="Keep exploring." />
        <div className="wk-pgrid">
          {related.map((r) => (
            <ProjectCard key={r.slug} project={r} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

function SpecsBlock({ specs, tone }: { specs: SpecSheet[]; tone: Tone }) {
  return (
    <Section tone={tone}>
      <SectionHeader eyebrow="Features & specifications" title={specs.length > 1 ? 'Two plans, thoughtfully finished.' : 'What every home included.'} />
      <div className={`wk-specs wk-specs--${specs.length}`}>
        {specs.map((s) => (
          <article key={s.title} className="wk-spec" data-reveal>
            <header className="wk-spec__head">
              <h3 className="wk-spec__title">{s.title}</h3>
              <ul className="wk-spec__units">
                {s.units.map((u) => (
                  <li key={u.name}>
                    <strong>{u.name}</strong> {u.beds}
                  </li>
                ))}
              </ul>
            </header>
            <dl className="wk-spec__sizes">
              {s.sizes.map((z) => (
                <div key={z.label}>
                  <dt>{z.label}</dt>
                  <dd>{z.value}</dd>
                </div>
              ))}
            </dl>
            <p className="wk-spec__label">Standard features</p>
            <ul className="wk-spec__list">
              {s.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {s.options && (
              <>
                <p className="wk-spec__label">Options</p>
                <ul className="wk-spec__list wk-spec__list--options">
                  {s.options.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

function GalleryBlock({ images, title, tone }: { images: Img[]; title: string; tone: Tone }) {
  return (
    <Section tone={tone}>
      <SectionHeader eyebrow="Photo gallery" title={`${title} in pictures.`} text="Select any photo to view it larger." />
      <Gallery images={images} cols={images.length === 2 || images.length === 4 ? 2 : 3} />
    </Section>
  );
}

function PlansBlock({ plans, tone }: { plans: NonNullable<Project['plans']>; tone: Tone }) {
  const [open, setOpen] = useState<number | null>(null);
  const images: Img[] = plans.map((pl) => ({ src: pl.image, alt: pl.title, caption: pl.caption ? `${pl.title} — ${pl.caption}` : pl.title }));
  const cols = plans.length >= 4 ? 4 : plans.length === 3 ? 3 : 2;
  return (
    <Section tone={tone}>
      <SectionHeader eyebrow="Plans & documents" title="Floor plans, plats and site plans." text="Open any drawing for a larger view; printable PDFs are provided where available." />
      <div className={`wk-plans wk-plans--${cols}`} data-widget="loop-grid">
        {plans.map((pl, i) => (
          <article key={pl.image} className={`wk-plan${pl.wide ? ' wk-plan--wide' : ''}`} data-reveal style={{ transitionDelay: `${(i % cols) * 60}ms` }}>
            <button type="button" className="wk-plan__media" onClick={() => setOpen(i)} aria-label={`View ${pl.title} larger`}>
              <img src={pl.image} alt={pl.title} loading="lazy" />
            </button>
            <div className="wk-plan__body">
              <h3 className="wk-plan__title">{pl.title}</h3>
              {pl.caption && <p className="wk-plan__caption">{pl.caption}</p>}
              <div className="wk-plan__actions">
                <button type="button" className="wk-plan__action" onClick={() => setOpen(i)}>
                  <Icon name="maximize" size={15} /> View larger
                </button>
                {pl.pdf && (
                  <a className="wk-plan__action" href={pl.pdf} target="_blank" rel="noopener noreferrer">
                    <Icon name="download" size={15} /> PDF
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <Lightbox images={images} index={open} onChange={setOpen} />
    </Section>
  );
}
