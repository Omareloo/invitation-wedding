import story1 from "@/assets/wedding/story-1.jpg";
import story2 from "@/assets/wedding/story-2.jpg";
import story3 from "@/assets/wedding/story-3.jpg";
import story4 from "@/assets/wedding/story-4.jpg";
import story5 from "@/assets/wedding/story-5.jpg";
import gallery1 from "@/assets/wedding/gallery-1.jpg";
import gallery2 from "@/assets/wedding/gallery-2.jpg";
import gallery3 from "@/assets/wedding/gallery-3.jpg";
import gallery4 from "@/assets/wedding/gallery-4.jpg";
import gallery5 from "@/assets/wedding/gallery-5.jpg";
import gallery6 from "@/assets/wedding/gallery-6.jpg";

export const wedding = {
  groom: "Daniel",
  bride: "Sophia",
  monogram: "D & S",
  // Ceremony date/time (local). Used for the countdown.
  date: "2026-12-12T16:00:00",
  dateLabel: "Saturday, December 12, 2026",
  timeLabel: "4:00 PM in the afternoon",
  venue: "The Grand Rosewood Estate",
  venueAddress: "120 Vineyard Lane, Napa Valley, California",
  dressCode: "Black Tie & Elegant Gowns",
  contact: "+1 (555) 014-2280",
  mapQuery: "The Grand Rosewood Estate, Napa Valley, California",
  whatsapp: "15550142280",
  rsvpFormUrl: "https://forms.gle/",
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  image: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "2018",
    title: "First Meet",
    description:
      "A quiet café, two strangers, and a conversation that lasted until the lights dimmed. We never wanted it to end.",
    image: story1,
  },
  {
    year: "2019",
    title: "First Date",
    description:
      "Golden streetlights and endless laughter — the night we knew this was the beginning of something timeless.",
    image: story2,
  },
  {
    year: "2022",
    title: "The Proposal",
    description:
      "Beneath a glowing sunset, one knee, one ring, and a forever question answered with happy tears.",
    image: story3,
  },
  {
    year: "2023",
    title: "Engagement",
    description:
      "Surrounded by candlelight and the people we love, we promised the world we were ready.",
    image: story4,
  },
  {
    year: "2026",
    title: "Wedding Day",
    description:
      "Now, we invite you to witness the day two hearts become one — our forever begins.",
    image: story5,
  },
];

export type GalleryImage = { src: string; tall?: boolean };

export const gallery: GalleryImage[] = [
  { src: gallery1, tall: true },
  { src: gallery2 },
  { src: gallery3, tall: true },
  { src: gallery4 },
  { src: gallery5, tall: true },
  { src: gallery6, tall: true },
];