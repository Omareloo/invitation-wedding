import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/wedding/hero.jpg";
import { wedding } from "@/data/wedding";
import { CursorGlow, ScrollProgress } from "@/components/wedding/effects";
import { Loader } from "@/components/wedding/Loader";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { Navbar } from "@/components/wedding/Navbar";
import { Hero } from "@/components/wedding/Hero";
import { Timeline } from "@/components/wedding/Timeline";
import { Countdown } from "@/components/wedding/Countdown";
import { WeddingDetails } from "@/components/wedding/WeddingDetails";
import { MapSection } from "@/components/wedding/MapSection";
import { Gallery } from "@/components/wedding/Gallery";
import { InvitationMessage } from "@/components/wedding/InvitationMessage";
import { RSVP } from "@/components/wedding/RSVP";
import { ThankYou } from "@/components/wedding/ThankYou";
import { Footer } from "@/components/wedding/Footer";

const pageTitle = `${wedding.groom} & ${wedding.bride} — Wedding Invitation`;
const pageDesc = `Join us to celebrate the wedding of ${wedding.groom} & ${wedding.bride} on ${wedding.dateLabel} at ${wedding.venue}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDesc },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDesc },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <Loader show={loading} />
      <ScrollProgress />
      <CursorGlow />
      <MusicPlayer autoStart={!loading} />
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Countdown />
        <WeddingDetails />
        <MapSection />
        <Gallery />
        <InvitationMessage />
        <RSVP />
        <ThankYou />
      </main>
      <Footer />
    </div>
  );
}
