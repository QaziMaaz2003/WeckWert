import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project, ProjectType } from '../content/types';
import { Icon } from '../components/ui/Icon';

const STATE: Record<string, string> = { Georgia: 'GA', Florida: 'FL', Alabama: 'AL', Louisiana: 'LA' };

/** "US 19 & US 84, Thomasville, Georgia" → "Thomasville, GA"; a list of states → "GA · FL · AL · LA". */
export function shortPlace(location?: string) {
  if (!location) return undefined;
  const tokens = location.split(/,\s*|\s*&\s*/);
  if (tokens.every((t) => STATE[t])) return tokens.map((t) => STATE[t]).join(' · ');
  const [city, state] = location.split(',').map((s) => s.trim()).slice(-2);
  return state ? `${city}, ${STATE[state] ?? state}` : city;
}

/** Meta line above the card title, e.g. "Mexico Beach, FL · Townhome Subdivision". */
export function projectMeta(p: Project) {
  return [shortPlace(p.location), p.category].filter(Boolean).join(' · ');
}

/**
 * Loop Item template (Elementor Pro → Theme Builder → Loop Item, source: Projects).
 * Featured image as background, dynamic tags for meta + title, whole card links to the post.
 */
export function ProjectCard({ project, wide, headingLevel = 3 }: { project: Project; wide?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <article className={`wk-pcard${wide ? ' wk-pcard--wide' : ''}`} data-widget="loop-item">
      <img className="wk-pcard__img" src={project.cover} alt={project.coverAlt} loading="lazy" decoding="async" />
      <div className="wk-pcard__shade" aria-hidden="true" />
      {project.status && <span className={`wk-badge wk-badge--${project.status.tone}`}>{project.status.label}</span>}
      <div className="wk-pcard__body">
        <p className="wk-pcard__meta">{projectMeta(project)}</p>
        <div className="wk-pcard__row">
          <H className="wk-pcard__title">
            <Link to={`/projects/${project.slug}`} className="wk-pcard__link">
              {project.short ?? project.title}
            </Link>
          </H>
          <span className="wk-pcard__arrow" aria-hidden="true">
            <Icon name="arrow-right" size={18} />
          </span>
        </div>
        {project.cardStat && <p className="wk-pcard__stat">{project.cardStat}</p>}
      </div>
    </article>
  );
}

interface GridProps {
  projects: Project[];
  /** Show the All / Commercial / Residential filter (Elementor Pro Taxonomy Filter widget). */
  filter?: boolean;
  /** Make the first card span two columns (bento layout). */
  feature?: boolean;
  limit?: number;
}

/** Loop Grid (3 / 2 / 1 columns) + optional Taxonomy Filter on `project_type`. */
export function ProjectGrid({ projects, filter, feature = true, limit }: GridProps) {
  const [type, setType] = useState<'all' | ProjectType>('all');
  const shown = useMemo(() => {
    const list = type === 'all' ? projects : projects.filter((p) => p.type === type);
    return limit ? list.slice(0, limit) : list;
  }, [projects, type, limit]);

  const options: { key: 'all' | ProjectType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'residential', label: 'Residential' },
  ];

  return (
    <>
      {filter && (
        <div className="wk-filter" role="group" aria-label="Filter projects" data-widget="taxonomy-filter">
          {options.map((o) => (
            <button key={o.key} type="button" className={`wk-filter__btn${type === o.key ? ' is-active' : ''}`} aria-pressed={type === o.key} onClick={() => setType(o.key)}>
              {o.label}
            </button>
          ))}
        </div>
      )}
      <div className="wk-pgrid" data-widget="loop-grid">
        {shown.map((p, i) => (
          // only widen the first card when that still fills complete rows of three
          <ProjectCard key={p.slug} project={p} wide={feature && i === 0 && (shown.length + 1) % 3 === 0} />
        ))}
      </div>
    </>
  );
}
