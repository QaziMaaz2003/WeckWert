import { useState } from 'react';
import type { FormEvent } from 'react';
import { brand, contact } from '../content/site';
import { Eyebrow } from '../components/widgets/Heading';
import { Icon } from '../components/ui/Icon';

/**
 * Project brief / contact form.
 * WordPress: Elementor Pro Form widget (or WPForms, already installed on the live site)
 * with the same fields: Select ×2, Radio (styled as chips), Text, Email, Tel, Textarea.
 * This React version validates and shows the success message only — it does not send email.
 */
export function ProjectBrief({ id = 'brief' }: { id?: string }) {
  const [category, setCategory] = useState(contact.categories[0]);
  const [scale, setScale] = useState(contact.scales[1]);
  const [timeline, setTimeline] = useState(contact.timelines[1]);
  const [sent, setSent] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const name = String(new FormData(form).get('name') ?? '').trim().split(' ')[0];
    setSent(name);
    form.reset();
  };

  return (
    <div className="wk-brief" id={id} data-reveal>
      <div className="wk-brief__panel">
        <Eyebrow>{contact.eyebrow}</Eyebrow>
        <h2 className="wk-brief__title">{contact.title}</h2>
        <p className="wk-brief__text">{contact.text}</p>
        <div className="wk-brief__summary" aria-live="polite">
          <p className="wk-brief__summary-label">Your brief</p>
          <p className="wk-brief__summary-text">
            {category} · {scale} · {timeline}
          </p>
        </div>
        <ul className="wk-brief__contact">
          <li>
            <Icon name="phone" size={18} />
            <div>
              <span>Call the office</span>
              <a href={brand.phoneHref}>{brand.phone}</a>
            </div>
          </li>
          <li>
            <Icon name="map-pin" size={18} />
            <div>
              <span>Visit</span>
              <a href={brand.mapsUrl} target="_blank" rel="noopener noreferrer">
                {brand.address.join(', ')}
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div className="wk-brief__form-wrap">
        {sent !== null ? (
          <div className="wk-brief__success" role="status">
            <Icon name="check-circle" size={40} strokeWidth={1.4} />
            <h3>{sent ? `Thank you, ${sent}.` : 'Thank you.'}</h3>
            <p>{contact.success}</p>
            <button type="button" className="wk-btn wk-btn--line" onClick={() => setSent(null)}>
              <span>Send another brief</span>
            </button>
          </div>
        ) : (
          <form className="wk-form" onSubmit={onSubmit} noValidate={false} data-widget="form">
            <div className="wk-form__row">
              <label className="wk-field">
                <span className="wk-field__label">Project category</span>
                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {contact.categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="wk-field">
                <span className="wk-field__label">Approximate scale</span>
                <select name="scale" value={scale} onChange={(e) => setScale(e.target.value)}>
                  {contact.scales.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="wk-field wk-field--chips">
              <legend className="wk-field__label">Timeline goal</legend>
              <div className="wk-chips">
                {contact.timelines.map((t) => (
                  <label key={t} className={`wk-chip${timeline === t ? ' is-active' : ''}`}>
                    <input type="radio" name="timeline" value={t} checked={timeline === t} onChange={() => setTimeline(t)} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="wk-form__row">
              <label className="wk-field">
                <span className="wk-field__label">Full name *</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label className="wk-field">
                <span className="wk-field__label">Phone</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
            </div>
            <label className="wk-field">
              <span className="wk-field__label">Email address *</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label className="wk-field">
              <span className="wk-field__label">Project details *</span>
              <textarea name="message" rows={4} required placeholder="Site location, size, what you’d like to build and any key dates." />
            </label>
            <button type="submit" className="wk-btn wk-btn--green wk-btn--block">
              <span>Send this project brief</span>
              <Icon name="arrow-right" size={17} className="wk-btn__icon" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
