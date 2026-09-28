export const aboutParagraphs = Array.from({ length: 4 }).map(
  () =>
    "Our annual Little Readers Festival returns to the Brooklyn Central Library! Award-winning children's authors will lead immersive storytelling sessions, and kids will get the chance to illustrate their own mini-books. Sessions are organised by age group to ensure the perfect experience for every child. Limited spots per session — early registration is strongly encouraged."
);

export type Activity = {
  title: string;
  text: string;
  instructor: string;
  duration: string;
  slots: { time: string; note: string; full?: boolean }[];
};

export const activities: Activity[] = [
  {
    title: "Kids fun day program",
    text: "Interactive picture-book storytelling with puppets, songs, and a simple craft activity.",
    instructor: "Ms. Amara Collins",
    duration: "45 min",
    slots: [
      { time: "10:00 AM – 10:45 AM", note: "6 left" },
      { time: "11:30 AM – 12:15 PM", note: "Full", full: true },
      { time: "2:00 PM – 2:45 PM", note: "14 left" },
    ],
  },
  {
    title: "Dragons & Dreamers: Ages 4–6",
    text: "Interactive picture-book storytelling with puppets, songs, and a simple craft activity.",
    instructor: "Ms. Amara Collins",
    duration: "45 min",
    slots: [
      { time: "10:00 AM – 10:45 AM", note: "6 left" },
      { time: "11:30 AM – 12:15 PM", note: "Full", full: true },
      { time: "2:00 PM – 2:45 PM", note: "14 left" },
    ],
  },
];

export type ChoiceGroup = {
  group: string;
  name: string;
  options: { text: string; time: string; disabled?: boolean }[];
};

export type ChooseDay = {
  title: string;
  date: string;
  groups: ChoiceGroup[];
};

export const chooseDays: ChooseDay[] = [
  {
    title: "Choose your Activities",
    date: "Friday, 17 August",
    groups: [
      {
        group: "Screening & The Fixies Live Show",
        name: "d1a",
        options: [
          { text: "The Fixies Screening - Age 4+", time: "2:30pm" },
          { text: "The Fixies Live Show - To attend tickets can be booked via Virgin Tickets Age 4+", time: "5:00pm" },
          { text: "The Fixies Screening - Age 4+", time: "6:30pm" },
        ],
      },
      {
        group: "Calm & Connect",
        name: "d1b",
        options: [
          { text: "Fun Interactive Wellbeing - Age 4+", time: "3:00pm" },
          { text: "Fun Interactive Wellbeing - Age 4+", time: "6:30pm" },
        ],
      },
      {
        group: "Interactive Sessions",
        name: "d1c",
        options: [{ text: "Whats in my Tummy? (Interactive Kids Session) - Age 4+", time: "3:30pm" }],
      },
      {
        group: "Story telling",
        name: "d1d",
        options: [{ text: "Dania Droubi ELF - Age 3+", time: "6:00pm" }],
      },
    ],
  },
  {
    title: "Choose your Activities",
    date: "Saturday, 18 August",
    groups: [
      {
        group: "Screening & The Fixies Live Show",
        name: "d2a",
        options: [
          { text: "The Fixies Screening - Age 4+", time: "11:45am" },
          { text: "The Fixies Screening - Age 4+", time: "1:30pm", disabled: true },
          { text: "The Fixies Live Show - To attend tickets can be booked via Virgin Tickets Age 4+", time: "5:00pm" },
        ],
      },
      {
        group: "Calm & Connect",
        name: "d2b",
        options: [
          { text: "Fun Interactive Wellbeing - Age 4+", time: "10:30am" },
          { text: "Fun Interactive Wellbeing - Age 4+", time: "2:30pm" },
        ],
      },
      {
        group: "Interactive Sessions",
        name: "d2c",
        options: [
          { text: "Discover your Talent! (Interactive Kids ECA Session) - Age 4+", time: "11:00am" },
          { text: "Whats in my Tummy? (Interactive Kids Session) - Age 4+", time: "12:45pm" },
          { text: "Back to School (Interactive Kids Session) Age 4+", time: "3:15pm" },
          { text: "Let's Go To Sleep! (Interactive Kids Session) Age 4+", time: "6:15pm" },
        ],
      },
      {
        group: "Story telling",
        name: "d2d",
        options: [
          { text: "Storytelling - Surprise Reading - Age 3+", time: "12:15pm" },
          { text: "The Majlis Academy - Age 3+", time: "2:00pm" },
        ],
      },
    ],
  },
];
