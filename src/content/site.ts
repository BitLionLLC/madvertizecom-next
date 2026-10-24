export const site = {
  name: "Madvertize",
  tagline: "Creative that sells. Ads that scale.",
  description:
    "Madvertize is a creative and paid-social agency. We produce the video and print material your brand needs, then run the Meta Ads that put it in front of buyers.",
  url: "https://madvertize.com",
  email: "hello@madvertize.com",
  phone: "+1 (555) 014-2200",
  address: "Remote-first — serving brands across North America",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

export type Service = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  deliverables: string[];
  icon: "video" | "flyer" | "target" | "compass";
};

export const services: Service[] = [
  {
    slug: "video",
    name: "Video Production",
    headline: "Short-form video built for the feed",
    summary:
      "Scroll-stopping ad creative shot and edited for Reels, Stories, TikTok and YouTube Shorts — hook-first, caption-ready, and cut in the aspect ratios each placement actually needs.",
    deliverables: [
      "UGC-style and creator-led ad spots",
      "Product films and brand sizzles",
      "Motion graphics and animated logo stings",
      "Captions, subtitles and localized cutdowns",
      "Batch variants for creative testing",
    ],
    icon: "video",
  },
  {
    slug: "flyers",
    name: "Flyer & Print Design",
    headline: "Flyers people actually keep",
    summary:
      "Print material designed with the same discipline as paid creative: one clear offer, one clear action, and press-ready files that come back from the printer looking like the proof.",
    deliverables: [
      "Flyers, posters and door hangers",
      "Menus, rate cards and one-pagers",
      "Direct mail and insert campaigns",
      "Trade-show banners and signage",
      "Print-ready PDFs with bleed and crop marks",
    ],
    icon: "flyer",
  },
  {
    slug: "meta-ads",
    name: "Meta Ads Management",
    headline: "Paid social that pays itself back",
    summary:
      "We build and run your Meta Ads end to end — account structure, tracking, audiences and a creative testing cadence that tells you which ad is carrying the account.",
    deliverables: [
      "Campaign architecture and budget pacing",
      "Pixel, Conversions API and event mapping",
      "Audience, offer and creative testing",
      "Retargeting and retention sequences",
      "Plain-English reporting every week",
    ],
    icon: "target",
  },
  {
    slug: "strategy",
    name: "Creative Strategy",
    headline: "Know what to say before you spend",
    summary:
      "The work that decides whether the media budget works: sharpening the offer, writing the hooks, and mapping the message to the moment someone is ready to buy.",
    deliverables: [
      "Offer and positioning workshops",
      "Hook libraries and ad scripts",
      "Brand kit, voice and visual direction",
      "Content calendars and shot lists",
      "Landing-page and funnel review",
    ],
    icon: "compass",
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    body: "A 45-minute call plus an audit of your account, creative and offer. You leave with a written point of view on what is holding growth back — whether or not you hire us.",
  },
  {
    step: "02",
    title: "Create",
    body: "We script, shoot, design and edit. You get a first batch of video and print assets built around distinct hooks, not five slight variations of the same idea.",
  },
  {
    step: "03",
    title: "Launch",
    body: "Tracking is verified, campaigns are structured for clean reads, and creative goes live in a test that can be judged in days instead of quarters.",
  },
  {
    step: "04",
    title: "Scale",
    body: "Winners get more budget and more variants. Losers get cut. Every week you see what spent, what it returned, and what we are shipping next.",
  },
] as const;

export const differentiators = [
  {
    title: "One team, not three vendors",
    body: "The people editing the video are in the same standup as the people buying the media. No handoff gaps, no blaming the other agency.",
  },
  {
    title: "Creative volume on purpose",
    body: "Paid social rewards variety. We ship in batches so the algorithm always has something new to find an audience for.",
  },
  {
    title: "You own everything",
    body: "Raw footage, source files, print PDFs, and the ad account itself. If we part ways, you keep the whole library.",
  },
  {
    title: "Reporting a human can read",
    body: "Spend, revenue, cost per result, and what we changed. One page, every week, in words instead of dashboards.",
  },
] as const;

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "northline-coffee",
    client: "Northline Coffee",
    industry: "DTC / Beverage",
    title: "A subscription launch carried by six seconds of video",
    summary:
      "We rebuilt the ad library around a single brewing hook, then tested fourteen variants in three weeks to find the one that could take real budget.",
    deliverables: ["12 video ads", "Landing page creative", "Meta Ads management"],
    metrics: [
      { label: "Return on ad spend", value: "4.1x" },
      { label: "Cost per subscriber", value: "-38%" },
      { label: "Time to launch", value: "19 days" },
    ],
  },
  {
    slug: "harborside-dental",
    client: "Harborside Dental",
    industry: "Local services",
    title: "Filling a new-patient calendar with flyers and retargeting",
    summary:
      "A neighborhood mail drop built the first wave of awareness; Meta retargeting closed the people who read the flyer and went looking online.",
    deliverables: ["Direct mail design", "4 video ads", "Local campaign build"],
    metrics: [
      { label: "New patient bookings", value: "+112" },
      { label: "Cost per booking", value: "$31" },
      { label: "Campaign window", value: "90 days" },
    ],
  },
  {
    slug: "atlas-fitness",
    client: "Atlas Fitness Collective",
    industry: "Fitness / Membership",
    title: "Nine studios, one creative system",
    summary:
      "We built a templated creative kit so every location could run the same tested campaign with its own trainers, timetable and offer.",
    deliverables: ["Creative system", "Studio flyer templates", "27 video cutdowns"],
    metrics: [
      { label: "Trial signups", value: "+2,400" },
      { label: "Cost per trial", value: "-44%" },
      { label: "Locations launched", value: "9" },
    ],
  },
  {
    slug: "verdant-home",
    client: "Verdant Home Goods",
    industry: "Ecommerce",
    title: "Breaking a ceiling by changing the hook, not the budget",
    summary:
      "Spend had plateaued for two quarters. Reframing the product around a room-by-room before-and-after reopened a cold audience.",
    deliverables: ["Creative strategy", "18 video ads", "Meta Ads management"],
    metrics: [
      { label: "Monthly revenue", value: "+67%" },
      { label: "Hook rate", value: "3.2x" },
      { label: "Creative shipped", value: "18 ads" },
    ],
  },
  {
    slug: "pico-tacos",
    client: "Pico Tacos",
    industry: "Restaurant group",
    title: "Opening week sold out before the doors did",
    summary:
      "Print in the neighborhood, video on the feed, and a countdown offer that gave both a reason to exist on the same week.",
    deliverables: ["Opening flyer campaign", "6 video ads", "Geo-targeted media"],
    metrics: [
      { label: "Opening week covers", value: "1,840" },
      { label: "Reach in trade area", value: "81%" },
      { label: "Cost per cover", value: "$2.10" },
    ],
  },
  {
    slug: "ridgeway-roofing",
    client: "Ridgeway Roofing",
    industry: "Home services",
    title: "Turning storm season into a booked quarter",
    summary:
      "Seasonal creative on standby, launched the day the weather turned, with a lead form built to screen out tyre-kickers.",
    deliverables: ["Seasonal creative library", "Lead-gen campaigns", "Flyer drops"],
    metrics: [
      { label: "Qualified leads", value: "+318" },
      { label: "Cost per lead", value: "$44" },
      { label: "Close rate", value: "27%" },
    ],
  },
];

export const testimonials = [
  {
    quote:
      "We had an agency for creative and another for media, and neither one would own the number. Madvertize took both and the account finally moved.",
    name: "Dana Whitfield",
    role: "Founder, Northline Coffee",
  },
  {
    quote:
      "They shot, designed and launched in under three weeks. The flyer and the video said the same thing, which sounds obvious until you have seen the alternative.",
    name: "Marcus Oyelaran",
    role: "Marketing Director, Atlas Fitness Collective",
  },
  {
    quote:
      "The weekly report is one page and I actually read it. I know what we spent, what came back, and what they are testing next.",
    name: "Priya Raman",
    role: "Owner, Harborside Dental",
  },
] as const;

export const plans = [
  {
    name: "Starter",
    price: "$2,500",
    cadence: "per month",
    blurb: "For a first real test of paid social, with creative good enough to judge it by.",
    features: [
      "4 video ads per month",
      "2 flyer or print pieces",
      "Meta Ads management up to $10k spend",
      "Tracking setup and verification",
      "Monthly strategy call",
    ],
    cta: "Start here",
    featured: false,
  },
  {
    name: "Growth",
    price: "$5,500",
    cadence: "per month",
    blurb: "The main engagement: enough creative volume to keep a testing cadence alive.",
    features: [
      "10 video ads per month",
      "Unlimited print requests in queue",
      "Meta Ads management up to $50k spend",
      "Creative strategy and hook development",
      "Weekly reporting and call",
      "Landing-page review",
    ],
    cta: "Most teams pick this",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    cadence: "quoted per quarter",
    blurb: "For multi-location brands and accounts spending past $50k a month.",
    features: [
      "Dedicated creative pod",
      "On-site production days",
      "Multi-location creative systems",
      "Expanded channels beyond Meta",
      "Quarterly planning workshops",
      "Shared Slack channel",
    ],
    cta: "Talk to us",
    featured: false,
  },
] as const;

export const faqs = [
  {
    q: "Do we need to be spending on ads already?",
    a: "No. Roughly a third of the brands we take on are launching paid social for the first time. We will tell you honestly whether your offer is ready for media spend before you commit a budget to it.",
  },
  {
    q: "Who owns the footage and the design files?",
    a: "You do, including raw footage, project files, print-ready PDFs and the ad account. Ownership is written into the agreement, not something you have to ask for on the way out.",
  },
  {
    q: "Is the ad budget included in your fee?",
    a: "No. Media spend is paid directly to Meta on your own card, so you keep full visibility. Our fee covers creative production, strategy and management.",
  },
  {
    q: "How fast can creative go live?",
    a: "First assets are typically in your hands within two weeks of kickoff, and campaigns go live the week after tracking is verified.",
  },
  {
    q: "Do you only run Meta Ads?",
    a: "Meta is where most of our clients see the clearest return, so it is our default. We also run TikTok, YouTube and Google when the audience is genuinely there — we will say so rather than spread a small budget thin.",
  },
  {
    q: "What do you need from us to start?",
    a: "Access to your ad account and assets, someone who can approve creative, and an honest conversation about margins. That is enough to begin.",
  },
] as const;
