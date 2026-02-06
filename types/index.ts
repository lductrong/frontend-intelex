// Button interface
export interface Button {
  label: string;
  url: string;
  style: 'primary' | 'outline' | 'text-only';
  isExternal: boolean;
}

// Feature interface for about section
export interface Feature {
  title: string;
  description: string;
  iconCode: string;
}

// Homepage section interfaces
export interface HeroSectionData {
  __component: 'homepage.hero-section';
  title: string;
  subtitle: string;
  typerWords: string[];
  buttons?: Button[];
}

export interface AboutSectionData {
  __component: 'homepage.about-section';
  heading: string;
  features: Feature[];
}

export interface AcademySectionData {
  __component: 'homepage.academy-showcase';
  heading: string;
  description: string;
  statsNumber: number;
  statsLabel: string;
  featuredCourses?: Course[];
}

export interface EventSectionData {
  __component: 'homepage.event-showcase';
  heading: string;
  description: string;
  featuredEvents?: Event[];
}

export interface CtaSectionData {
  __component: 'homepage.cta-section';
  icon: string;
  title: string;
  content: string;
  buttons?: Button[];
}

export interface PartnerSectionData {
  __component: 'homepage.partner-section';
  heading: string;
  description?: string;
  partners?: Partner[];
}

// Union type for all homepage sections
export type HomepageSection = 
  | HeroSectionData 
  | AboutSectionData 
  | AcademySectionData 
  | EventSectionData 
  | CtaSectionData 
  | PartnerSectionData;

export interface Course {
  title: string;
  slug: string;
  description: string;
  icon: string;
  link: string;
}

export interface Event {
  title: string;
  slug: string;
  description: string;
  date: string;
  location: string;
  speaker?: string;
  status: string;
}

export interface Partner {
  name: string;
  logo?: {
    url: string;
  };
  website?: string;
}

export interface HomepageData {
  content: HomepageSection[];
  courses: Course[];
  events: Event[];
  partners: Partner[];
}

// About Page Types
export interface FeatureItem {
  text: string;
  iconClass: string;
}

export interface VisionMissionData {
  sectionTitle: string;
  heading: string;
  description: string;
  mission: string;
  features: FeatureItem[];
}

export interface CeoQuoteData {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorPhoto?: {
    url: string;
  };
}

export interface SocialLink {
  platform: string;
  url: string;
  iconClass: string;
}

export interface TeamMemberData {
  name: string;
  position: string;
  description: string;
  photo?: {
    url: string;
  };
  socialLinks: SocialLink[];
}

export interface PartnersSectionData {
  sectionTitle: string;
  heading: string;
  description: string;
}

export interface AboutPageData {
  pageTitle: string;
  heroImage?: {
    url: string;
  };
  visionMission: VisionMissionData;
  ceoQuote: CeoQuoteData;
  teamMembers: TeamMemberData[];
  partnersSection: PartnersSectionData;
}

// Academy Page Types
export interface CategoryFilter {
  name: string;
  value: string;
  isActive: boolean;
}

export interface FilterSectionData {
  heading: string;
  categories: CategoryFilter[];
}

export interface AcademyPageData {
  pageTitle: string;
  pageSubtitle?: string;
  heroImage?: {
    url: string;
  };
  filterSection: FilterSectionData;
  courses?: AcademyCourse[];
}

export interface Mentor {
  name: string;
  slug: string;
  title?: string;
  bio?: string;
  avatar?: {
    url: string;
  };
  expertise?: string[];
  experience?: string;
  socialLinks?: SocialLink[];
}

export interface AcademyCourse {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image?: {
    url: string;
  };
  category: 'web' | 'cloud' | 'ai' | 'mobile' | 'devops';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  studentsCount: number;
  price: number;
  currency: string;
  mentorSlug?: string;
  featured: boolean;
  status: 'active' | 'inactive' | 'coming-soon';
}

// Community Page Types
export interface SectionContent {
  heading: string;
  description: string;
}

export interface CommunityPageData {
  pageTitle: string;
  pageSubtitle?: string;
  heroIcon: string;
  heroDescription: string;
  hackathonSection: SectionContent;
  capstoneSection: SectionContent;
  mentorSection: SectionContent;
  hackathons?: Hackathon[];
  capstoneProjects?: CapstoneProject[];
  mentors?: CommunityMentor[];
}

export interface Hackathon {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image?: {
    url: string;
  };
  startDate: string;
  endDate: string;
  location: string;
  prize: string;
  registeredTeams: number;
  status: 'open' | 'closed' | 'upcoming';
  type: 'hackathon' | 'workshop' | 'networking' | 'competition';
  featured: boolean;
}

export interface CapstoneProject {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image?: {
    url: string;
  };
  partner: string;
  university: string;
  technologies: string;
  duration: string;
  teamSize: string;
  category: 'fintech' | 'healthtech' | 'iot' | 'ai' | 'blockchain';
  status: 'recruiting' | 'in-progress' | 'completed';
  featured: boolean;
}

export interface CommunityMentor extends Mentor {
  skills?: string[];
  mentees?: number;
  rating?: number;
  available?: boolean;
}

// Venture Hub Page Types
export interface VentureHubPageData {
  pageTitle: string;
  pageSubtitle?: string;
  heroIcon: string;
  heroDescription: string;
  criteriaSection: SectionContent;
  processSection: SectionContent;
  fundedStartupsSection: SectionContent;
  applicationSection: SectionContent;
}

export interface Startup {
  name: string;
  slug: string;
  description: string;
  logo?: {
    url: string;
  };
  industry: 'edtech' | 'fintech' | 'healthtech' | 'ecommerce' | 'ai' | 'iot' | 'other';
  fundingAmount: number;
  currency: string;
  metrics: {
    [key: string]: string;
    label: string;
  };
  teamMembers: string;
  status: 'funded' | 'incubating' | 'graduated';
  featured: boolean;
  fundingDate: string;
}

export interface Criteria {
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface ProcessStep {
  title: string;
  description: string;
  stepNumber: number;
  order: number;
}

export interface ApplicationForm {
  representativeName: string;
  email: string;
  phone: string;
  university: string;
  startupName: string;
  industry: 'edtech' | 'fintech' | 'healthtech' | 'ecommerce' | 'ai' | 'iot' | 'other';
  description: string;
  pitchDeckUrl?: string;
  demoUrl?: string;
}

// Partners Page Types
export interface PartnersPageData {
  pageTitle: string;
  pageSubtitle?: string;
  heroIcon: string;
  heroDescription: string;
  universityBenefitsSection: SectionContent;
  companyBenefitsSection: SectionContent;
  successStoriesSection: SectionContent;
  partnershipFormSection: SectionContent;
  strategicPartnersSection: SectionContent;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
  targetAudience: 'university' | 'company' | 'both';
  order: number;
}

export interface SuccessStory {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image?: {
    url: string;
  };
  universityPartner: string;
  companyPartner: string;
  duration: string;
  results: string;
  metrics: {
    [key: string]: string;
  };
  quote?: string;
  quoteAuthor?: string;
  quoteAuthorTitle?: string;
  category: 'edtech' | 'fintech' | 'healthtech' | 'iot' | 'ai' | 'other';
  year: number;
  featured: boolean;
  status: 'active' | 'completed' | 'ongoing';
}

export interface PartnershipForm {
  partnerType: 'university' | 'company' | 'government' | 'ngo';
  organization: string;
  contactName: string;
  position: string;
  email: string;
  phone: string;
  cooperationType: 'capstone' | 'mentorship' | 'hackathon' | 'scholarship' | 'research' | 'recruitment' | 'other';
  message: string;
  website?: string;
}

// Blog Page Types
export interface BlogPageData {
  pageTitle: string;
  pageSubtitle?: string;
  featuredPostSection: SectionContent;
  blogPostsSection: SectionContent;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description?: string;
  color: string;
  order: number;
}

export interface BlogAuthor {
  name: string;
  slug: string;
  bio?: string;
  avatar?: {
    url: string;
  };
  position?: string;
  email?: string;
  socialLinks?: SocialLink[];
}

export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: {
    url: string;
  };
  authorSlug: string;
  categorySlug: string;
  tags?: string[];
  readTime: number;
  viewCount: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  publishedDate: string;
}