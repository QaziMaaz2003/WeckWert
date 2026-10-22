import type { Fact, IconName } from './types';
import { projectsOfType } from './projects';

// All page copy lives here so it can be moved into WordPress/Elementor field by field.
// Facts come from weckwert-commercial.com; open questions are in docs/CONTENT-NOTES.md.

export const brand = {
  name: 'Weckwert Commercial',
  legalName: 'Weckwert Commercial, Inc.',
  blurb: 'Full-service developer and general contractor — turn-key construction for commercial, industrial and residential projects, shaped by four generations of building.',
  founded: 1986,
  phone: '229-233-8292',
  phoneHref: 'tel:+12292338292',
  email: 'info@weckwertcml.com',
  emailHref: 'mailto:info@weckwertcml.com',
  address: ['313 Hickory Ridge East', 'Thomasville, GA 31792'],
  city: 'Thomasville, Georgia',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=313+Hickory+Ridge+East+Thomasville+GA+31792',
  mapsEmbed: 'https://maps.google.com/maps?q=313%20Hickory%20Ridge%20East%2C%20Thomasville%2C%20GA%2031792&z=14&output=embed',
  logoLight: '/brand/logo-light.png',
  logoDark: '/brand/logo-dark.png',
};

export interface NavLink {
  label: string;
  to: string;
  children?: NavLink[];
}

const projectLinks = (type: 'residential' | 'commercial') =>
  projectsOfType(type).map((p) => ({ label: p.navTitle ?? p.title, to: `/projects/${p.slug}` }));

// WordPress: Appearance → Menus "Primary" (same pages and order as the live site).
export const nav: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Commercial', to: '/commercial', children: projectLinks('commercial') },
  { label: 'Residential', to: '/residential', children: projectLinks('residential') },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export interface Stat {
  value: number;
  suffix?: string;
  /** Render without thousands separators (years). */
  plain?: boolean;
  label: string;
  note: string;
}

export const stats: Stat[] = [
  { value: 4, label: 'Generations', note: 'of builders' },
  { value: 1986, plain: true, label: 'Established', note: 'in Thomasville, GA' },
  { value: 700, suffix: '+', label: 'Residential units', note: '11 communities, 22 phases' },
  { value: 93, suffix: '+', label: 'Wendy’s projects', note: 'built or remodeled' },
  { value: 600, suffix: '+', label: 'Tons of HVAC', note: 'at The Woodlands' },
];

export interface Card {
  icon: IconName;
  title: string;
  text: string;
}

export const capabilities: Card[] = [
  {
    icon: 'hard-hat',
    title: 'Turn-Key General Contracting',
    text: 'One team manages — and self-performs as needed — the development and construction process from start to finish.',
  },
  {
    icon: 'building',
    title: 'Commercial Build-to-Suit',
    text: 'Negotiated-bid, build-to-suit construction for out-parcel owners — restaurants, retail centers, offices and showrooms.',
  },
  {
    icon: 'home',
    title: 'Residential & Multifamily',
    text: 'Townhome communities, gated single-family subdivisions and 55+ neighborhoods, for rent or owner occupancy.',
  },
  {
    icon: 'compass',
    title: 'Civil & Site Engineering',
    text: 'In-house P.E.: site selection, site layout, lot fill, storm water, sanitary sewer and code and environmental compliance.',
  },
  {
    icon: 'factory',
    title: 'Plant & HVAC Infrastructure',
    text: 'Design, consulting and construction management for major mechanical work — like 600+ tons of new HVAC at The Woodlands.',
  },
  {
    icon: 'layers',
    title: 'Land Development',
    text: 'We take an existing or unimproved site and convert it into a complete business or multifamily community.',
  },
];

export interface Step {
  icon: IconName;
  title: string;
  text: string;
  points: string[];
}

export const processSteps: Step[] = [
  {
    icon: 'map-pin',
    title: 'Site Selection & Planning',
    text: 'We start with the land — real estate site selection, site layout and planning on a new site or one you already own.',
    points: ['Real estate site selection', 'Site layout design', 'Existing or unimproved sites'],
  },
  {
    icon: 'compass',
    title: 'Design & Compliance',
    text: 'Building, architectural and MEP design led by our in-house professional engineer, with code and environmental compliance built in.',
    points: ['Architectural / MEP design', 'Code compliance', 'Environmental compliance'],
  },
  {
    icon: 'hammer',
    title: 'Development & Construction',
    text: 'Site work, utilities and vertical construction — managed, and self-performed as needed, by our own team for economies of scale.',
    points: ['Site work & utilities', 'Self-performed as needed', 'Construction management'],
  },
  {
    icon: 'key',
    title: 'Turn-Key Handover',
    text: 'A complete business or multifamily community, ready to occupy, lease or sell — a custom, cost-effective product for the end user.',
    points: ['Lessee or owner occupied', 'Rental or for-sale homes', 'One accountable team'],
  },
];

export const advantages: Card[] = [
  { icon: 'flag', title: 'Start-to-finish management', text: 'One team manages development and construction, from an unimproved site to a finished building.' },
  { icon: 'dollar', title: 'Economies of scale', text: 'Managing the whole process achieves economies of scale typically unavailable to the end user.' },
  { icon: 'users', title: 'Four generations of builders', text: 'The Weckwert/McCaskill families have built and site-contracted for four generations.' },
  { icon: 'shield-check', title: 'Licensed professional engineer', text: 'Our P.E. is licensed in Georgia, Florida and Alabama and is a certified building contractor in Florida.' },
  { icon: 'construction', title: 'Hands-on field leadership', text: 'Our leaders run projects in the field and operate the equipment themselves — quickly and efficiently.' },
  { icon: 'heart', title: 'Rooted in Thomasville', text: 'Based in Thomasville since 1986, with a team active in the HBA, local planning and disaster relief.' },
];

export const regions = [
  {
    code: 'GA',
    state: 'Georgia',
    note: 'Headquarters',
    text: 'Thomasville and Thomas County are home: The Woodlands, Colonial Square, Huntington Pointe, The Phoenix and RSC — plus Wendy’s projects across the state.',
    projects: ['The Woodlands', 'Colonial Square', 'Huntington Pointe'],
  },
  {
    code: 'FL',
    state: 'Florida',
    note: 'Gulf Coast & panhandle',
    text: 'The Palms townhomes in Mexico Beach, a new Zaxby’s prototype in Tallahassee and Wendy’s projects across northern Florida and the panhandle.',
    projects: ['The Palms', 'Zaxby’s', 'Wendy’s'],
  },
  {
    code: 'AL',
    state: 'Alabama',
    note: 'Restaurant program',
    text: 'Wendy’s restaurant projects — new construction and remodels — throughout Alabama.',
    projects: ['Wendy’s'],
  },
  {
    code: 'LA',
    state: 'Louisiana',
    note: 'Restaurant program',
    text: 'Wendy’s restaurant projects — new construction and remodels — throughout Louisiana.',
    projects: ['Wendy’s'],
  },
];

export const faqs = [
  {
    q: 'What does turn-key delivery include?',
    a: 'Weckwert Commercial manages — and self-performs as needed — the full development and construction process: site selection and layout, design and engineering, site work and construction, through to a complete business or multifamily community ready to occupy.',
  },
  {
    q: 'Can you start with land we already own?',
    a: 'Yes. We specialize in taking an existing or unimproved site and converting it into a complete business or multifamily unit quickly and efficiently.',
  },
  {
    q: 'What kinds of commercial projects do you take on?',
    a: 'Commercial work is focused primarily on negotiated-bid, build-to-suit construction for out-parcel owners, and is lessee or owner occupied — from restaurants and retail centers to offices, showrooms and campus redevelopment.',
  },
  {
    q: 'Where do you build?',
    a: 'We are headquartered in Thomasville, Georgia, and have delivered projects in Georgia, Florida, Alabama and Louisiana.',
  },
  {
    q: 'Do you have an engineer on staff?',
    a: 'Yes. Richard Powell, P.E. is a licensed professional engineer in Georgia, Florida and Alabama, a certified building contractor in Florida and a licensed general contractor in Thomasville, Georgia.',
  },
  {
    q: 'Are any lots available right now?',
    a: 'Stone Bridge has one lot remaining and Colonial Square has six lots remaining. Contact the office for details.',
  },
];

export const home = {
  hero: {
    eyebrow: 'Building in Thomasville since 1986',
    title: 'Turn-key construction. Four generations of building.',
    text: 'From raw land to a finished business or community, Weckwert Commercial manages development and construction from start to finish — with economies of scale typically unavailable to the end user.',
    image: '/images/site/hero-commercial.jpg',
    primary: { label: 'View Projects', to: '/#work' },
    secondary: { label: 'Start a Project', to: '/contact' },
    now: { label: 'Now developing', text: 'The Woodlands redevelopment, Colonial Square & The Palms townhomes in Mexico Beach' },
  },
  capabilities: {
    eyebrow: 'Integrated capabilities',
    title: 'One team. Every critical phase.',
    text: 'Developer and general contractor under one roof — so the site, the design and the building are managed as one project.',
  },
  work: {
    eyebrow: 'Selected work',
    title: 'Built at the intersection of vision and execution.',
    text: 'Build-to-suit commercial programs, residential communities and complex redevelopments across the Southeast.',
  },
  process: {
    eyebrow: 'The turn-key advantage',
    title: 'Clarity from first acre to final key.',
    text: 'Four phases, one line of accountability — the way we have delivered projects since 1986.',
  },
  marquee: {
    eyebrow: 'A track record across commercial programs and communities',
    names: ['Wendy’s', 'Zaxby’s', 'RSC', 'The Woodlands', 'Huron Holdings', 'The Brickworks', 'Colonial Square', 'CNSNext', 'Huntington Pointe', 'Heard’s Pond'],
  },
  leadership: {
    eyebrow: 'Leadership & heritage',
    title: 'Four generations. One standard of accountability.',
    text: 'Generational field knowledge, licensed engineering and seasoned finance — under one roof in Thomasville, Georgia.',
    statement: 'Four generations of builders and site contractors in the Weckwert/McCaskill families.',
    cta: { label: 'Meet the full team', to: '/about#team' },
  },
  regions: {
    eyebrow: 'Regional reach',
    title: 'Built for the Southeast.',
    text: 'Headquartered in Thomasville, Georgia, with projects delivered across four states.',
  },
  faq: {
    eyebrow: 'Questions, answered',
    title: 'Plan with fewer unknowns.',
    text: 'Every successful project starts with clear expectations. Here are the questions owners ask us first.',
  },
};

export const cta = {
  eyebrow: 'Start with a direct conversation',
  title: 'Bring us the land, the plans — or simply the ambition.',
  text: 'We’ll help define the practical path from an unimproved site to a complete, operating business or community.',
  primary: { label: 'Start a project', to: '/contact' },
};

export const contact = {
  eyebrow: 'Project brief',
  title: 'Shape the first conversation.',
  text: 'Share the essentials and our development team will follow up.',
  categories: ['Commercial build-to-suit', 'Industrial / institutional', 'Residential community', 'Land development', 'Renovation / redevelopment', 'Other'],
  scales: ['Under 5,000 sq ft', '5,000 – 15,000 sq ft', '15,000 – 50,000 sq ft', '50,000+ sq ft', 'Land / multiple lots'],
  timelines: ['0–6 months', '6–12 months', '12+ months'],
  success: 'Thank you — your project brief has been received. We’ll be in touch shortly.',
};

export const aboutPage = {
  hero: {
    eyebrow: 'About Weckwert Commercial',
    title: 'Four generations of building in Thomasville.',
    text: 'A full-service developer and general contractor specializing in land development and turn-key construction.',
    image: '/images/projects/the-woodlands/atrium-2.jpg',
  },
  intro: {
    eyebrow: 'About us',
    title: 'From an unimproved site to a finished community.',
    paragraphs: [
      'Weckwert Commercial is a full-service developer/general contractor based in Thomasville, Georgia, specializing in land development and turn-key construction for commercial, industrial and residential single and multifamily development projects.',
      'We emphasize our ability to take an existing or unimproved site and convert it into a complete business or multifamily unit quickly and efficiently, by managing — and self-performing as needed — the development and construction process from start to finish.',
      'That lets us achieve economies of scale typically unavailable to the end user, a competitive edge that affords clients a custom, cost-effective product. Current projects include a mixed-use development, office parks, hospital renovations and townhome communities in Thomasville, Georgia and Mexico Beach, Florida.',
    ],
    image: '/images/site/thomasville.jpg',
    imageAlt: 'Weckwert Commercial logo over a map of Georgia and scenes of downtown Thomasville',
  },
  focus: [
    {
      icon: 'building' as IconName,
      title: 'Commercial',
      text: 'Commercial construction activity is focused primarily on negotiated-bid, build-to-suit construction for out-parcel owners, and is lessee or owner occupied.',
      link: { label: 'Commercial projects', to: '/commercial' },
    },
    {
      icon: 'home' as IconName,
      title: 'Residential',
      text: 'Residential development is primarily focused on multifamily rental or owner-occupied homes — from 55+ townhome communities to gated single-family subdivisions.',
      link: { label: 'Residential projects', to: '/residential' },
    },
  ],
  advantages: {
    eyebrow: 'Why Weckwert',
    title: 'The advantages of one accountable team.',
  },
  timeline: {
    eyebrow: 'Our history',
    title: 'Four decades, project by project.',
    items: [
      { year: '1986', title: 'The business is founded', text: 'Karl Weckwert establishes his construction business as a third-generation general contractor.' },
      { year: '1994', title: 'Lake Eagle begins', text: 'The company’s first 55-and-older community — sold out by 1999.' },
      { year: '1997', title: 'A home office', text: 'The Weckwert team designs and builds its own two-story office (CNSNext).' },
      { year: '1999', title: 'The Phoenix', text: 'Construction starts on a 16,200 sq ft treatment facility, completed in 2000.' },
      { year: '2000', title: 'Restaurant program', text: 'The first of 93+ Wendy’s projects — and the RSC build-to-suit on Highway 84 East.' },
      { year: '2004', title: 'The Brickworks', text: 'A 21,439 sq ft strip center shadow-anchored by CVS Pharmacy, completed in 2005.' },
      { year: '2021', title: 'Zaxby’s prototype', text: 'A new farmhouse-style Zaxby’s in Tallahassee, completed in 2022.' },
      { year: '2024', title: 'Moving to The Woodlands', text: 'Weckwert Commercial relocates to the campus it is helping redevelop.' },
    ],
  },
  team: {
    eyebrow: 'Leadership & team',
    title: 'The people behind the projects.',
    text: 'A family company — four generations of builders — backed by seasoned finance and engineering professionals.',
  },
  community: {
    eyebrow: 'In the community',
    title: 'Rooted in Thomas County.',
    items: [
      { icon: 'award' as IconName, title: 'Home Builders Association', text: 'Karl is a two-term HBA president, chaired its Home and Garden Show for four years and represented the HBA on the Team 2000 committee.' },
      { icon: 'heart' as IconName, title: 'Disaster relief', text: 'Michele and Ray volunteer for first-response disaster relief in Georgia and Florida — tree removal and roof tarping for families in need.' },
      { icon: 'compass' as IconName, title: 'Planning & engineering', text: 'Richard Powell, P.E. serves on the Grady County Planning Commission and is a member of the American Society of Civil Engineers.' },
    ],
  },
};

export const residentialPage = {
  hero: {
    eyebrow: 'Residential development',
    title: 'Communities built for living.',
    text: 'Single-family subdivisions, townhome communities and 55+ neighborhoods — developed and built by Weckwert Commercial from raw land to move-in.',
    image: '/images/projects/heards-pond/street.jpg',
    stats: [
      { label: 'Communities', value: '11' },
      { label: 'Phases', value: '22' },
      { label: 'Units built', value: '700+' },
    ] as Fact[],
  },
  intro: {
    eyebrow: 'What we build',
    title: 'Homes for every stage of life.',
    text: 'Residential development is primarily focused on multifamily rental or owner-occupied homes.',
  },
  types: [
    { icon: 'layers' as IconName, title: 'Townhome communities', text: 'The Palms, Wood Hollow, Lake Eagle and Huntington Pointe.' },
    { icon: 'home' as IconName, title: 'Single-family subdivisions', text: 'Heard’s Pond — 82 build-to-suit homes, now sold out.' },
    { icon: 'shield-check' as IconName, title: 'Gated communities', text: 'Stone Bridge and Huntington Pointe.' },
    { icon: 'users' as IconName, title: '55+ communities', text: 'Lake Eagle (our first, in 1994) and Huntington Pointe.' },
  ],
  grid: {
    eyebrow: 'Residential portfolio',
    title: 'Every community, start to finish.',
    text: 'Select a community for photos, floor plans, plats and features.',
  },
  available: {
    eyebrow: 'Available now',
    title: 'Opportunities in our communities.',
    items: ['the-palms', 'stone-bridge'],
  },
};

export const commercialPage = {
  hero: {
    eyebrow: 'Commercial & industrial',
    title: 'Built to suit your business.',
    text: 'Negotiated-bid, build-to-suit construction for out-parcel owners — lessee or owner occupied — from quick-service restaurants to retail centers and campus redevelopment.',
    image: '/images/projects/wendys/photo-09.jpg',
    stats: [
      { label: 'Restaurant projects', value: '93+' },
      { label: 'Tons of new HVAC', value: '600+' },
      { label: 'Acre mixed-use', value: '69' },
    ] as Fact[],
  },
  intro: {
    eyebrow: 'Capabilities',
    title: 'Commercial work, start to finish.',
    text: 'From the first site plan to the final punch list, one team handles design, site work and construction.',
  },
  capabilities: [
    { icon: 'utensils' as IconName, title: 'Restaurants', text: '93+ Wendy’s projects and a new Zaxby’s prototype.' },
    { icon: 'store' as IconName, title: 'Retail centers', text: 'The Brickworks — 21,439 sq ft, shadow-anchored by CVS.' },
    { icon: 'briefcase' as IconName, title: 'Office & institutional', text: 'Build-to-suit offices, classrooms and a treatment facility.' },
    { icon: 'factory' as IconName, title: 'Shop & showroom', text: 'A 10,000 sq ft build-to-suit for RSC on two acres.' },
    { icon: 'layers' as IconName, title: 'Civil & site work', text: 'Lot fill, 60-inch storm pipe and sanitary sewer at Huron.' },
    { icon: 'trending-up' as IconName, title: 'Redevelopment', text: '600+ tons of new HVAC at The Woodlands campus.' },
  ],
  grid: {
    eyebrow: 'Commercial portfolio',
    title: 'Programs, centers and campuses.',
    text: 'Select a project for details, plans and photos.',
  },
  spotlight: {
    eyebrow: 'Restaurant program',
    title: '93+ Wendy’s projects across four states.',
    text: 'From 2000 through 2021, Weckwert Commercial remodeled and/or constructed more than 93 Wendy’s restaurants across northern Florida and the panhandle, and throughout Alabama, Louisiana and Georgia.',
    link: { label: 'View the Wendy’s program', to: '/projects/wendys' },
  },
  land: {
    eyebrow: 'Land available',
    title: 'Colonial Square — only six lots remaining.',
    text: 'A 69-acre mixed-use development at the intersection of US 19 and US 84 in Thomasville, near Walmart, Lowe’s and Gateway Shopping Center. A 2000 traffic count recorded more than 27,000 vehicles per day.',
    link: { label: 'See Colonial Square', to: '/projects/colonial-square' },
  },
};

export const contactPage = {
  hero: {
    eyebrow: 'Contact',
    title: 'Let’s talk about your project.',
    text: 'Call the office, stop by in Thomasville, or send us a project brief.',
    image: '/images/site/cta-cranes.jpg',
  },
  steps: {
    eyebrow: 'What happens next',
    title: 'A straightforward start.',
    items: [
      { icon: 'send' as IconName, title: 'Send your brief', text: 'Share your site, the building or community you have in mind, and your timeline.' },
      { icon: 'phone' as IconName, title: 'We talk it through', text: 'Our team follows up to understand your goals, budget and site conditions.' },
      { icon: 'clipboard' as IconName, title: 'One turn-key scope', text: 'Design, site work and construction are planned as one start-to-finish project.' },
    ],
  },
};
