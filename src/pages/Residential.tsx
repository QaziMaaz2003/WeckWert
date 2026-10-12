import { Link } from 'react-router-dom';
import { residentialPage as rp } from '../content/site';
import { projectBySlug, projectsOfType } from '../content/projects';
import { Section } from '../components/elementor/Section';
import { SectionHeader } from '../components/widgets/Heading';
import { FeatureGrid } from '../components/widgets/FeatureGrid';
import { Button } from '../components/widgets/Button';
import { PageHero } from '../sections/Heroes';
import { CtaBand } from '../sections/Blocks';
import { ProjectGrid } from '../sections/Projects';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Residential() {
  usePageTitle('Residential', rp.hero.text);
  const list = projectsOfType('residential');
  const available = rp.available.items.map((s) => projectBySlug(s)!);

  return (
    <>
      <PageHero
        eyebrow={rp.hero.eyebrow}
        title={rp.hero.title}
        text={rp.hero.text}
        image={rp.hero.image}
        stats={rp.hero.stats}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Residential' }]}
      />

      <Section tone="light">
        <div className="wk-split wk-split--intro">
          <SectionHeader eyebrow={rp.intro.eyebrow} title={rp.intro.title} text={rp.intro.text} width="narrow">
            <div className="wk-head__actions">
              <Button to="#communities" variant="line">See the communities</Button>
            </div>
          </SectionHeader>
          <FeatureGrid items={rp.types} cols={2} numbered={false} compact />
        </div>
      </Section>

      <Section tone="forest" id="communities">
        <SectionHeader eyebrow={rp.grid.eyebrow} title={rp.grid.title} text={rp.grid.text} />
        <ProjectGrid projects={list} feature={false} />
      </Section>

      <Section tone="sand">
        <SectionHeader eyebrow={rp.available.eyebrow} title={rp.available.title} />
        <div className="wk-spots">
          {available.map((p) => (
            <article key={p.slug} className="wk-spot" data-reveal>
              <Link to={`/projects/${p.slug}`} className="wk-spot__media" tabIndex={-1} aria-hidden="true">
                <img src={p.cover} alt="" loading="lazy" />
              </Link>
              <div className="wk-spot__body">
                {p.status && <span className={`wk-badge wk-badge--${p.status.tone} wk-badge--inline`}>{p.status.label}</span>}
                <h3 className="wk-spot__title">{p.short ?? p.title}</h3>
                <p className="wk-spot__meta">{p.category}{p.location ? ` · ${p.location}` : ''}</p>
                <p className="wk-spot__text">{p.summary}</p>
                <Button to={`/projects/${p.slug}`} variant="text">View {p.short ?? p.title}</Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
