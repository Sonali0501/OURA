import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

// Root-absolute hashes so the links also resolve from /founder and /products/:id
const LINKS = [
  { label: "Genesis", href: "/#genesis" },
  { label: "Spectrum", href: "/#spectrum" },
  { label: "Soil to Sip", href: "/#soil-to-sip" },
  { label: "Partner With Us", href: "/#b2b" }
];

const SOCIALS = [
  { name: "X", href: "https://x.com/ouracoconut", icon: Twitter },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ouracoconut?igsh=MW4zM2o4c3M5NDd1MQ==",
    icon: Instagram
  },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/ouraindia/", icon: Linkedin },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592877777442",
    icon: Facebook
  },
  { name: "YouTube", href: "https://youtube.com/@ouracoconut?si=zkqgTedW-Azba-Dd", icon: Youtube }
];

export default function OuraFooter() {
  return (
    <footer className="bg-ivory text-palm border-t border-palm/10">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-bold">OURA</p>
            <p className="mt-2 text-[11px] font-sans-ui tracking-luxe uppercase text-gold">
              The Complete Coconut Story
            </p>
            <p className="mt-5 max-w-sm text-sm text-palm/75 leading-relaxed">
              Organic. Untouched. Raw. Authentic. A promise of pure heritage — engineered from our
              home in Kerala to yours.
            </p>
            <div className="mt-5 flex flex-row gap-4">
              {SOCIALS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-palm/55 hover:text-gold transition-colors"
                >
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </a>
              ))}
            </div>

          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/55 mb-4">
              Explore
            </p>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-palm/70 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/55 mb-4">
              Contact
            </p>
            <p className="text-sm text-palm/70">Sisiram Group</p>
            <p className="text-sm text-palm/70">Kochi, Kerala, India</p>
            <a href="mailto:ontact@ouracoconut.com" className="block mt-3 text-sm text-gold hover:underline">
              contact@ouracoconut.com
            </a>
            <a href="tel:8138014300" className="block mt-3 text-sm text-gold hover:underline">
             +91 8138014300
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-palm/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/55">
            © {new Date().getFullYear()} Sisiram Group
          </p>
        </div>
      </div>
    </footer>
  );
}