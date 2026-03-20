import Link from "next/link";

interface FooterContent {
  tagline: string;
  quickLinks: string;
  contactTitle: string;
  contactPlaceholder: string;
  rights: string;
}

interface NavContent {
  home: string;
  services: string;
  branches: string;
  about: string;
  contact: string;
}

interface FooterProps {
  locale: "ar" | "en";
  siteName: string;
  nav: NavContent;
  footer: FooterContent;
}

export default function Footer({ locale, siteName, nav, footer }: FooterProps) {
  const prefix = locale === "ar" ? "" : "/en";

  const navLinks = [
    { label: nav.home, href: locale === "ar" ? "/" : "/en" },
    { label: nav.services, href: `${prefix}/services` },
    { label: nav.branches, href: `${prefix}/branches` },
    { label: nav.about, href: `${prefix}/about` },
    { label: nav.contact, href: `${prefix}/contact` },
  ];

  return (
    <footer className="bg-navy-dark text-white/60 border-t border-white/10">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-gold font-bold text-lg leading-tight">{siteName}</p>
            <p className="mt-3 text-sm leading-relaxed max-w-xs">{footer.tagline}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {footer.contactTitle}
            </h3>
            <p className="text-sm text-white/40 italic">{footer.contactPlaceholder}</p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/40">
          {footer.rights}
        </div>
      </div>
    </footer>
  );
}
