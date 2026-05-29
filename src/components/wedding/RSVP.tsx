import { motion } from "framer-motion";
import { FaWhatsapp, FaRegCalendarCheck } from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { wedding } from "@/data/wedding";
import { Reveal, SectionHeading } from "./effects";

function buildIcs() {
  const dt = new Date(wedding.date);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const end = new Date(dt.getTime() + 4 * 3600000);
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(dt)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Wedding of ${wedding.groom} & ${wedding.bride}`,
    `LOCATION:${wedding.venue}, ${wedding.venueAddress}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(body);
}

export function RSVP() {
  const waText = encodeURIComponent(
    `Hi! I would love to attend the wedding of ${wedding.groom} & ${wedding.bride}. Please count me in!`,
  );
  const buttons = [
    {
      label: "RSVP on WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/${wedding.whatsapp}?text=${waText}`,
      primary: true,
    },
    {
      label: "RSVP via Form",
      icon: HiOutlineClipboardDocumentList,
      href: wedding.rsvpFormUrl,
    },
    {
      label: "Save the Date",
      icon: FaRegCalendarCheck,
      href: buildIcs(),
      download: `wedding-${wedding.groom}-${wedding.bride}.ics`,
    },
  ];

  return (
    <section id="rsvp" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading eyebrow="Will You Join Us?" title="Kindly Reply" />
        <Reveal>
          <p className="mx-auto mb-10 max-w-xl text-center font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            We can&apos;t wait to celebrate with you. Please let us know if you&apos;ll be
            joining us on our special day.
          </p>
        </Reveal>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {buttons.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.1} className="w-full sm:w-auto">
              <motion.a
                href={b.href}
                target={b.download ? undefined : "_blank"}
                rel="noreferrer"
                download={b.download}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 font-sans text-xs uppercase tracking-[0.2em] transition-shadow sm:w-auto ${
                  b.primary
                    ? "bg-gradient-to-r from-gold to-rose-gold text-primary-foreground glow-border"
                    : "glass-card text-gold hover:shadow-[var(--shadow-gold)]"
                }`}
              >
                <b.icon className="h-5 w-5" /> {b.label}
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}