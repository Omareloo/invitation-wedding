import { FaInstagram, FaFacebookF, FaXTwitter, FaPinterestP } from "react-icons/fa6";
import { wedding } from "@/data/wedding";

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaXTwitter, href: "#", label: "Twitter" },
  { icon: FaPinterestP, href: "#", label: "Pinterest" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 py-12">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <p className="font-script text-4xl text-gradient-gold md:text-5xl">{wedding.monogram}</p>
        <p className="mt-3 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {wedding.dateLabel}
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold/80 transition-all hover:border-gold hover:bg-gold hover:text-primary-foreground"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <div className="gold-divider mx-auto mt-8 w-32" />
        <p className="mt-6 font-sans text-xs text-muted-foreground">
          Made with love for {wedding.groom} &amp; {wedding.bride} · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}