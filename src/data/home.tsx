export type Article = {
  img: string;
  title: string;
  text?: string;
  tag?: string;
};

export const heroArticles: Article[] = [
  { img: "/assets/images/img1.jpg", title: "Being Part of a Community Supports Children's Mental Health and Social Growth." },
  { img: "/assets/images/img2.jpg", title: "Being Part of a Community Supports Children's Mental Health and Social Growth." },
];

export const heroSlides = [
  {
    image: "/assets/images/hero1.jpg",
    eyebrow: "E-Magazine",
    title: ["Stay Informed and ", <br key="br" />, "be ", <span key="sp">Inspired</span>],
    text: "Explore expert insights, real stories and practical tips for every stage of family life.",
    doodles: [
      { src: "/assets/images/object1.svg", className: "hero__doodle--papers" },
      { src: "/assets/images/object2.svg", className: "hero__doodle--pencil opacity-50" },
    ],
    showCards: true,
  },
  {
    image: "/assets/images/hero2.jpg",
    video: "/assets/images/video.mp4",
    eyebrow: "Raise Confident Kids",
    title: ["Listen to Our ", <br key="br" />, "Expert’s ", <span key="sp">Podcasts</span>],
    text: "Explore expert insights, real stories and practical tips for every stage of family life.",
    doodles: [
      { src: "/assets/images/object3.svg", className: "hero__doodle--mic opacity-50" },
      { src: "/assets/images/object4.svg", className: "hero__doodle--camera opacity-75" },
    ],
    showCards: true,
  },
  {
    image: "/assets/images/hero3.jpg",
    eyebrow: "Raise Confident Kids",
    title: ["Moms! ", <br key="br" />, "Stronger ", <span key="sp">Together</span>],
    text: "Motherhood can be rewarding, but it can also feel isolating. Connecting with other mothers and families not only provides friendship and support, but it also benefits both mental and physical health.",
    doodles: [
      { src: "/assets/images/object5.svg", className: "hero__doodle--heart opacity-50" },
      { src: "/assets/images/object2.svg", className: "hero__doodle--pencil opacity-50" },
    ],
    showCards: false,
  },
];

export type TribeItem = {
  img: string;
  variant: "blue" | "yellow" | "green" | "pink";
  title: string;
  text?: string;
};

export const tribeItems: TribeItem[] = [
  { img: "/assets/images/img1.jpg", variant: "blue", title: "Find Your Tribe Zone", text: "Connect with families sharing your culture and interests" },
  { img: "/assets/images/img2.jpg", variant: "yellow", title: "Start Your Journey", text: "Get curated guides based on your child's age or family phase" },
  { img: "/assets/images/hero2.jpg", variant: "green", title: "Claim Your Pack", text: "Access exclusive Sample Packs based on your family's needs" },
  { img: "/assets/images/hero3.jpg", variant: "pink", title: "Find Your Tribe Zone", text: "Connect with families sharing your culture and interests" },
  { img: "/assets/images/img1.jpg", variant: "blue", title: "Find Your Tribe Zone", text: "Connect with families sharing your culture and interests" },
  { img: "/assets/images/img2.jpg", variant: "yellow", title: "Start Your Journey", text: "Get curated guides based on your child's age or family phase" },
  { img: "/assets/images/hero2.jpg", variant: "green", title: "Claim Your Pack", text: "Access exclusive Sample Packs based on your family's needs" },
  { img: "/assets/images/hero3.jpg", variant: "pink", title: "Find Your Tribe Zone", text: "Connect with families sharing your culture and interests" },
];

export const activityTribeItems: TribeItem[] = [
  { img: "/assets/images/img1.jpg", variant: "blue", title: "Café Meetups" },
  { img: "/assets/images/img2.jpg", variant: "yellow", title: "Storytelling Mornings" },
  { img: "/assets/images/hero2.jpg", variant: "green", title: "Parenting Circles" },
  { img: "/assets/images/hero3.jpg", variant: "pink", title: "Masterclasses" },
  { img: "/assets/images/img1.jpg", variant: "blue", title: "Play Zones" },
  { img: "/assets/images/img1.jpg", variant: "blue", title: "Café Meetups" },
  { img: "/assets/images/img2.jpg", variant: "yellow", title: "Storytelling Mornings" },
  { img: "/assets/images/hero2.jpg", variant: "green", title: "Parenting Circles" },
  { img: "/assets/images/hero3.jpg", variant: "pink", title: "Masterclasses" },
  { img: "/assets/images/img1.jpg", variant: "blue", title: "Play Zones" },
];

export const cityEventItems: TribeItem[] = [
  { img: "/assets/images/img1.jpg", variant: "blue", title: "Mommy & Me Playdate" },
  { img: "/assets/images/img2.jpg", variant: "yellow", title: "Mommy & Me Playdate" },
  { img: "/assets/images/hero2.jpg", variant: "green", title: "Mommy & Me Playdate" },
  { img: "/assets/images/hero3.jpg", variant: "pink", title: "Mommy & Me Playdate" },
  { img: "/assets/images/img1.jpg", variant: "blue", title: "Mommy & Me Playdate" },
  { img: "/assets/images/img2.jpg", variant: "yellow", title: "Mommy & Me Playdate" },
  { img: "/assets/images/hero2.jpg", variant: "green", title: "Mommy & Me Playdate" },
  { img: "/assets/images/hero3.jpg", variant: "pink", title: "Mommy & Me Playdate" },
];

export type FeaturedEvent = {
  img: string;
  day: string;
  date: string;
  title: string;
  text: string;
  time: string;
  place: string;
};

export const featuredEvent: FeaturedEvent = {
  img: "/assets/images/hero3.jpg",
  day: "05",
  date: "Tue<br>June 26",
  title: "Parenting Circle: Wellness Day",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  time: "09:30 AM - 11:30 AM",
  place: "Al Qudra Cycling Track",
};

export type EventListItem = {
  img: string;
  title: string;
  day: string;
  date: string;
};

export const eventListItems: EventListItem[] = [
  { img: "/assets/images/img1.jpg", title: "Masterclass: Financial Planning for New Parents", day: "10", date: "Wed\nJuly 26" },
  { img: "/assets/images/img2.jpg", title: "The MPT Annual Family Expo 2026 The GCC's Biggest Family Event", day: "04", date: "Sun\nAug 26" },
  { img: "/assets/images/hero2.jpg", title: "The MPT Annual Family Expo 2026 The GCC's Biggest Family Event", day: "02", date: "Tue\nSep 26" },
  { img: "/assets/images/hero1.jpg", title: "Masterclass: Financial Planning for New Parents", day: "10", date: "Wed\nJuly 26" },
  { img: "/assets/images/img1.jpg", title: "Masterclass: Financial Planning for New Parents", day: "12", date: "Fri\nOct 26" },
  { img: "/assets/images/img2.jpg", title: "The MPT Annual Family Expo 2026 The GCC's Biggest Family Event", day: "18", date: "Sat\nNov 26" },
];

export type MagazineCard = {
  img: string;
  title: string;
  text: string;
};

export const magazineFeatured: MagazineCard[] = [
  { img: "/assets/images/hero1.jpg", title: "Being Part of a Community Supports Children's Mental Health and Social Growth.", text: "Children thrive when they belong to a caring community, not just their nuclear family, but a broader circle they can call their own." },
  { img: "/assets/images/img2.jpg", title: "Being Part of a Community Supports Children's Mental Health and Social Growth.", text: "Children thrive when they belong to a caring community, not just their nuclear family, but a broader circle they can call their own." },
];

export const magazineMore: MagazineCard[] = [
  { img: "/assets/images/hero1.jpg", title: "Pops Need Their Own Community Too", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/img2.jpg", title: "Did you know?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/hero2.jpg", title: "Pops Need Their Own Community Too", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/hero3.jpg", title: "Did you know?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/img1.jpg", title: "Pops Need Their Own Community Too", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/hero1.jpg", title: "Did you know?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/img2.jpg", title: "Pops Need Their Own Community Too", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
];

export const recommendationsCards: MagazineCard[] = [
  { img: "/assets/images/hero1.jpg", title: "Pops Need Their Own Community Too", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/img2.jpg", title: "Did you know?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/hero2.jpg", title: "Pops Need Their Own Community Too", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/hero3.jpg", title: "Did you know?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/img1.jpg", title: "Pops Need Their Own Community Too", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/hero1.jpg", title: "Did you know?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/img2.jpg", title: "Pops Need Their Own Community Too", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
  { img: "/assets/images/hero3.jpg", title: "Did you know?", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros." },
];

export const recommendationFilters = ["All Reviews", "Baby Care", "Education", "Dining", "Wellness", "Apparel", "Travel"];

export type Offer = {
  img: string;
  name: string;
  deal: string;
};

export const offers: Offer[] = [
  { img: "/assets/images/hero2.jpg", name: "KidzLearn Academy", deal: "20% off all term enrollment" },
  { img: "/assets/images/img1.jpg", name: "First Step Shop", deal: "20% off all term enrollment" },
  { img: "/assets/images/hero3.jpg", name: "KidzLearn Academy", deal: "20% off all term enrollment" },
  { img: "/assets/images/img2.jpg", name: "First Step Shop", deal: "20% off all term enrollment" },
  { img: "/assets/images/hero1.jpg", name: "KidzLearn Academy", deal: "20% off all term enrollment" },
  { img: "/assets/images/hero2.jpg", name: "First Step Shop", deal: "20% off all term enrollment" },
];

export type TribeCard = {
  variant: "green" | "pink" | "blue" | "yellow";
  featured: boolean;
};

export const communityCards: TribeCard[] = [
  { variant: "green", featured: true },
  { variant: "pink", featured: true },
  { variant: "blue", featured: true },
  { variant: "yellow", featured: true },
  { variant: "green", featured: false },
  { variant: "pink", featured: false },
  { variant: "blue", featured: false },
  { variant: "yellow", featured: false },
];

export type BusinessCard = {
  name: string;
  category: string;
  categoryColor: "pink" | "green" | "yellow" | "blue";
};

export const businesses: BusinessCard[] = [
  { name: "Kidz ’n’ Kidz", category: "Baby Products", categoryColor: "pink" },
  { name: "Kidly", category: "Schools", categoryColor: "green" },
  { name: "Kids Land", category: "Nurseries", categoryColor: "pink" },
  { name: "Children Complex", category: "Extra-Curricular Activities", categoryColor: "yellow" },
  { name: "Kidly", category: "Food & Beverage", categoryColor: "blue" },
  { name: "Kidz ’n’ Kidz", category: "Baby Products", categoryColor: "pink" },
  { name: "Kidly", category: "Schools", categoryColor: "green" },
  { name: "Kids Land", category: "Nurseries", categoryColor: "pink" },
  { name: "Children Complex", category: "Extra-Curricular Activities", categoryColor: "yellow" },
  { name: "Kidly", category: "Food & Beverage", categoryColor: "blue" },
];

export type PodcastCard = {
  img: string;
  cat: string;
  episode: string;
  duration: string;
  title: string;
  by: string;
};

export const podcasts: PodcastCard[] = [
  { img: "/assets/images/hero1.jpg", cat: "For Pops", episode: "E-20", duration: "20 min", title: "Work-Life Balance: How to Be Present in 3 Simple Steps.", by: "Ahmed" },
  { img: "/assets/images/img2.jpg", cat: "For Moms", episode: "E-20", duration: "20 min", title: "Understanding Toddler Tantrums: Expert Q&A With Jasmine", by: "Jasmine" },
  { img: "/assets/images/hero3.jpg", cat: "Child Development", episode: "E-20", duration: "20 min", title: "Is My Child Ready for School? A Readiness Checklist.", by: "Amina" },
  { img: "/assets/images/hero2.jpg", cat: "For Pops", episode: "E-21", duration: "20 min", title: "Work-Life Balance: How to Be Present in 3 Simple Steps.", by: "Ahmed" },
  { img: "/assets/images/img1.jpg", cat: "For Moms", episode: "E-19", duration: "20 min", title: "Understanding Toddler Tantrums: Expert Q&A With Jasmine", by: "Jasmine Shah" },
  { img: "/assets/images/hero1.jpg", cat: "Child Development", episode: "E-18", duration: "20 min", title: "Is My Child Ready for School? A Readiness Checklist.", by: "Amina" },
];

export const voteFilters = ["All Categories", "Apparel", "Baby Monitors", "Car Seats", "High Chairs", "Nursery & Sleep", "Strollers", "Toys & Learning"];

export type VoteCard = {
  img: string;
  variant: "yellow" | "green" | "pink";
  title: string;
  text: string;
};

export const voteCards: VoteCard[] = [
  { img: "/assets/images/hero1.jpg", variant: "yellow", title: "Toys & Learning", text: "Stage-based toys designed by child experts" },
  { img: "/assets/images/hero3.jpg", variant: "green", title: "Storytime Corner", text: "Interactive story sessions that build early language skills" },
  { img: "/assets/images/img2.jpg", variant: "pink", title: "Toys & Learning", text: "Stage-based toys designed by child experts" },
  { img: "/assets/images/img1.jpg", variant: "yellow", title: "Storytime Corner", text: "Interactive story sessions that build early language skills" },
  { img: "/assets/images/hero2.jpg", variant: "green", title: "Toys & Learning", text: "Stage-based toys designed by child experts" },
  { img: "/assets/images/hero1.jpg", variant: "pink", title: "Storytime Corner", text: "Interactive story sessions that build early language skills" },
];

export type ToolItem = { icon: string; label: string };

export const tools: ToolItem[] = [
  { icon: "/assets/images/icon1.svg", label: "Pregnancy Tracker" },
  { icon: "/assets/images/icon2.svg", label: "Due Date Tracker" },
  { icon: "/assets/images/icon3.svg", label: "Children Milestone" },
  { icon: "/assets/images/icon4.svg", label: "Weather Tracker" },
  { icon: "/assets/images/icon1.svg", label: "Pregnancy Tracker" },
  { icon: "/assets/images/icon2.svg", label: "Due Date Tracker" },
  { icon: "/assets/images/icon3.svg", label: "Children Milestone" },
  { icon: "/assets/images/icon4.svg", label: "Pregnancy Tracker" },
  { icon: "/assets/images/icon1.svg", label: "Children Milestone" },
  { icon: "/assets/images/icon2.svg", label: "Weather Tracker" },
  { icon: "/assets/images/icon3.svg", label: "Pregnancy Tracker" },
  { icon: "/assets/images/icon4.svg", label: "Due Date Tracker" },
];

export const featureItems = [
  { icon: "/assets/images/event-icon1.svg", label: "Meet & connect" },
  { icon: "/assets/images/event-icon2.svg", label: "Meaningful Activities" },
  { icon: "/assets/images/event-icon3.svg", label: "Quality Time" },
  { icon: "/assets/images/event-icon4.svg", label: "Trusted Community" },
];

export type CardV2 = {
  img: string;
  status: string;
  date: string;
  cat: string;
  title: string;
  text: string;
  place: string;
};

export const cardV2Items: CardV2[] = Array.from({ length: 8 }).map(() => ({
  img: "/assets/images/img1.jpg",
  status: "Registration open",
  date: "26 - 27",
  cat: "Family Activities",
  title: "Little Readers Storytelling...",
  text: "A vibrant afternoon of storytelling, art stations, and live music for the whole family.",
  place: "Manrat Al Saadiyat, Abu Dhabi",
}));

export type CalendarEvent = {
  img: string;
  time: string;
  title: string;
  place: string;
};

export const calendarEvents: CalendarEvent[] = [
  { img: "/assets/images/img1.jpg", time: "12:00 PM", title: "Masterclass: Financial Planning", place: "Manrat Al Saadiyat, Abu Dhabi" },
  { img: "/assets/images/img2.jpg", time: "12:00 PM", title: "Masterclass: Financial Planning", place: "Manrat Al Saadiyat, Abu Dhabi" },
  { img: "/assets/images/hero1.jpg", time: "12:00 PM", title: "Masterclass: Financial Planning", place: "Manrat Al Saadiyat, Abu Dhabi" },
  { img: "/assets/images/hero3.jpg", time: "12:00 PM", title: "Masterclass: Financial Planning", place: "Manrat Al Saadiyat, Abu Dhabi" },
  { img: "/assets/images/img1.jpg", time: "12:00 PM", title: "Masterclass: Financial Planning", place: "Manrat Al Saadiyat, Abu Dhabi" },
  { img: "/assets/images/img2.jpg", time: "12:00 PM", title: "Masterclass: Financial Planning", place: "Manrat Al Saadiyat, Abu Dhabi" },
];
