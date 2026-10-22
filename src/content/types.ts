// Shared content types. Each maps to a WordPress structure (see docs/ELEMENTOR-MAPPING.md).

export type IconName =
  | 'building' | 'factory' | 'home' | 'layers' | 'pencil-ruler' | 'hard-hat' | 'map-pin' | 'phone'
  | 'mail' | 'clock' | 'check-circle' | 'check' | 'arrow-right' | 'arrow-left' | 'chevron-down'
  | 'chevron-left' | 'chevron-right' | 'menu' | 'x' | 'award' | 'dollar' | 'shield-check' | 'users'
  | 'key' | 'hammer' | 'clipboard' | 'flag' | 'construction' | 'heart' | 'calendar' | 'ruler'
  | 'file-text' | 'download' | 'maximize' | 'image' | 'map' | 'send' | 'trending-up' | 'external-link'
  | 'store' | 'utensils' | 'briefcase' | 'compass';

export interface Img {
  src: string;
  alt: string;
  caption?: string;
}

export interface Fact {
  label: string;
  value: string;
}

/** A floor plan, plat or site plan. `pdf` = printable original from the live site. */
export interface PlanDoc {
  title: string;
  /** Very wide drawing (e.g. campus map): spans the full row instead of one grid cell. */
  wide?: boolean;
  caption?: string;
  image: string;
  pdf?: string;
}

export interface UnitSpec {
  name: string;
  beds: string;
}

/** Spec sheet for a residential floor plan (features + options), from the live-site spec images. */
export interface SpecSheet {
  title: string;
  units: UnitSpec[];
  sizes: Fact[];
  features: string[];
  options?: string[];
}

/** Extra titled block on a project page (e.g. the Huntington Pointe clubhouse). */
export interface ProjectSection {
  title: string;
  text: string[];
  images: Img[];
}

export type ProjectType = 'residential' | 'commercial';
export type StatusTone = 'sold' | 'available' | 'current' | 'complete';

/** WordPress: custom post type `project` + taxonomy `project_type` + ACF fields. */
export interface Project {
  slug: string;
  type: ProjectType;
  title: string;
  /** Label for menus (defaults to title). */
  navTitle?: string;
  /** Short title for cards (defaults to title). */
  short?: string;
  category: string;
  location?: string;
  years?: string;
  status?: { label: string; tone: StatusTone };
  /** Short headline number shown on cards, e.g. "82 homes". */
  cardStat?: string;
  summary: string;
  body: string[];
  highlights: string[];
  facts: Fact[];
  tags: string[];
  cover: string;
  coverAlt: string;
  /** Use the plain textured hero instead of the cover photo (cover has text baked in / low-res photos). */
  plainHero?: boolean;
  gallery?: Img[];
  sections?: ProjectSection[];
  specs?: SpecSheet[];
  plans?: PlanDoc[];
  maps?: Img[];
  brandLogo?: Img;
}

export interface TeamMember {
  slug: string;
  name: string;
  known?: string;
  role: string;
  photo: string;
  short: string;
  bio: string[];
}
