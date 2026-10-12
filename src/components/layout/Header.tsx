import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { brand, nav } from '../../content/site';
import { Icon } from '../ui/Icon';

/**
 * Elementor Pro Theme Builder → Header template:
 *   Container "Top bar" (Icon List ×2 + Text) — hidden on tablet/mobile
 *   Container "Main" (Site Logo · Nav Menu w/ dropdowns · Button), Motion Effects → Sticky: Top
 */
export function Header() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
    setSub(null);
  }, [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('wk-menu-open', open);
    return () => document.body.classList.remove('wk-menu-open');
  }, [open]);

  return (
    <>
      <div className="wk-topbar" data-el="container">
        <div className="wk-container wk-topbar__inner">
          <ul className="wk-topbar__list">
            <li>
              <Icon name="map-pin" size={15} />
              <a href={brand.mapsUrl} target="_blank" rel="noopener noreferrer">
                {brand.city}
              </a>
            </li>
            <li>
              <Icon name="phone" size={15} />
              <a href={brand.phoneHref}>{brand.phone}</a>
            </li>
          </ul>
          <p className="wk-topbar__note">Developer &amp; general contractor since {brand.founded}</p>
        </div>
      </div>

      <header className={`wk-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`} data-el="header">
        <div className="wk-container wk-header__inner">
          <Link to="/" className="wk-header__logo" aria-label={`${brand.name} — home`}>
            <img src={brand.logoDark} alt={brand.legalName} width={196} height={52} />
          </Link>

          <nav className="wk-nav" aria-label="Primary">
            <ul className="wk-nav__list">
              {nav.map((item) => (
                <li key={item.to} className={`wk-nav__item${item.children ? ' has-children' : ''}`}>
                  <NavLink to={item.to} end={item.to === '/'} className="wk-nav__link">
                    {item.label}
                    {item.children && <Icon name="chevron-down" size={15} className="wk-nav__caret" />}
                  </NavLink>
                  {item.children && (
                    <div className={`wk-dropdown${item.children.length > 6 ? ' wk-dropdown--wide' : ''}`}>
                      <Link to={item.to} className="wk-dropdown__all">
                        All {item.label.toLowerCase()} projects <Icon name="arrow-right" size={15} />
                      </Link>
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.to}>
                            <NavLink to={c.to}>{c.label}</NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <Link to="/contact" className="wk-btn wk-btn--green wk-header__cta">
            <span>Request Proposal</span>
            <Icon name="arrow-right" size={17} className="wk-btn__icon" />
          </Link>

          <button
            className="wk-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="wk-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'x' : 'menu'} size={24} />
          </button>
        </div>

        <div id="wk-mobile-menu" className="wk-mobile" hidden={!open}>
          <ul className="wk-mobile__list">
            {nav.map((item) => (
              <li key={item.to} className="wk-mobile__item">
                <div className="wk-mobile__row">
                  <NavLink to={item.to} end={item.to === '/'} className="wk-mobile__link">
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <button
                      className="wk-mobile__toggle"
                      aria-label={`Show ${item.label} projects`}
                      aria-expanded={sub === item.to}
                      onClick={() => setSub((s) => (s === item.to ? null : item.to))}
                    >
                      <Icon name="chevron-down" size={20} />
                    </button>
                  )}
                </div>
                {item.children && sub === item.to && (
                  <ul className="wk-mobile__sub">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <NavLink to={c.to}>{c.label}</NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="wk-mobile__foot">
            <Link to="/contact" className="wk-btn wk-btn--green wk-btn--block">
              <span>Request Proposal</span>
              <Icon name="arrow-right" size={17} className="wk-btn__icon" />
            </Link>
            <a href={brand.phoneHref} className="wk-btn wk-btn--line wk-btn--block">
              <Icon name="phone" size={17} />
              <span>{brand.phone}</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
