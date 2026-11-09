import { CalendarDays, Camera, Phone } from "lucide-react";
import { contact } from "@/lib/contact";

export function ContactLinks({ variant = "section" }: { variant?: "section" | "footer" }) {
  return (
    <div className={`contact-links contact-links-${variant}`}>
      <a
        className={variant === "section" ? "button button-dark" : "footer-contact-link"}
        href={contact.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CalendarDays size={18} aria-hidden="true" />
        Programează o ședință
      </a>
      <a className="contact-link" href={contact.phoneUrl}>
        <Phone size={17} aria-hidden="true" />
        {contact.phone}
      </a>
      <a className="contact-link" href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
        <Camera size={17} aria-hidden="true" />
        Instagram
      </a>
    </div>
  );
}
