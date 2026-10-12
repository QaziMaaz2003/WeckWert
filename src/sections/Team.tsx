import { team } from '../content/team';
import { home } from '../content/site';
import { Section } from '../components/elementor/Section';
import { Button } from '../components/widgets/Button';
import { SectionHeader } from '../components/widgets/Heading';

/**
 * Home "Leadership & heritage" — charcoal Container; header row (Heading + Text | Blockquote),
 * then a bordered Grid Container of team cards (Image + Heading + Text). CPT-free: plain widgets.
 */
export function Leadership() {
  const l = home.leadership;
  return (
    <Section tone="charcoal" id="leadership">
      <div className="wk-lead__head">
        <SectionHeader eyebrow={l.eyebrow} title={l.title} text={l.text} width="narrow" />
        <blockquote className="wk-lead__quote" data-reveal>
          <p>{l.statement}</p>
        </blockquote>
      </div>
      <div className="wk-people" data-el="grid">
        {team.map((m, i) => (
          <article key={m.slug} className="wk-person" data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
            <img className="wk-person__photo" src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" width={96} height={96} />
            <h3 className="wk-person__name">{m.name}</h3>
            <p className="wk-person__role">{m.role}</p>
            <p className="wk-person__text">{m.short}</p>
          </article>
        ))}
      </div>
      <div className="wk-center" data-reveal>
        <Button to={l.cta.to} variant="ghost">
          {l.cta.label}
        </Button>
      </div>
    </Section>
  );
}

/** About page — full bios, alternating image / text rows (Container → Image + Heading + Text Editor). */
export function TeamBios() {
  return (
    <div className="wk-bios">
      {team.map((m) => (
        <article key={m.slug} className="wk-bio" id={`team-${m.slug}`} data-reveal>
          <div className="wk-bio__media">
            <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" width={720} height={720} />
          </div>
          <div className="wk-bio__body">
            <p className="wk-bio__role">{m.role}</p>
            <h3 className="wk-bio__name">
              {m.name}
              {m.known && <span className="wk-bio__known"> ({m.known})</span>}
            </h3>
            {m.bio.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
