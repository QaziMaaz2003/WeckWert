import { Link } from 'react-router-dom';
import { brand } from '../../content/site';
import { projectsOfType } from '../../content/projects';
import { Icon } from '../ui/Icon';

const links = (type: 'residential' | 'commercial') =>
  projectsOfType(type).map((p) => ({ label: p.short ?? p.title, to: `/projects/${p.slug}` }));

/** Elementor Pro Theme Builder → Footer template (Container grid 5 / 3 / 2 + bottom bar). */
export function Footer() {
  const residential = links('residential');
  const commercial = links('commercial');

  return (
    <footer className="wk-footer" data-el="footer">
      <div className="wk-container">
        <div className="wk-footer__grid">
          <div className="wk-footer__brand">
            <Link to="/" aria-label={`${brand.name} — home`}>
              <img src={brand.logoLight} alt={brand.legalName} width={240} height={64} loading="lazy" />
            </Link>
            <p>{brand.blurb}</p>
          </div>

          <div>
            <h2 className="wk-footer__title">Headquarters</h2>
            <address className="wk-footer__address">
              {brand.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <ul className="wk-footer__links wk-footer__links--icons">
              <li>
                <Icon name="phone" size={15} />
                <a href={brand.phoneHref}>{brand.phone}</a>
              </li>
              <li>
                <Icon name="map" size={15} />
                <a href={brand.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Get directions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="wk-footer__title">
              <Link to="/commercial">Commercial</Link>
            </h2>
            <ul className="wk-footer__links wk-footer__links--2col">
              {commercial.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="wk-footer__title">
              <Link to="/residential">Residential</Link>
            </h2>
            <ul className="wk-footer__links">
              {residential.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="wk-footer__title">Company</h2>
            <ul className="wk-footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/about#team">Leadership</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="wk-footer__bottom">
          <p>© {new Date().getFullYear()} {brand.legalName} All rights reserved.</p>
          <p>Developer &amp; General Contractor · Thomasville, Georgia</p>
        </div>
      </div>
    </footer>
  );
}
