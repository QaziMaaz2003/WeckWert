import { useEffect } from 'react';

const SITE = 'Weckwert Commercial';

/** Sets <title> — in WordPress this is the page title + an SEO plugin (Yoast / Rank Math). */
export function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Turn-Key Construction in Thomasville, Georgia`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
