import Link from "next/link";

const footerLinks = {
  Company: [
    { href: "/", label: "Home" },
    { href: "/about/", label: "About" },
    { href: "/services/", label: "Services" },
    { href: "/contact/", label: "Contact" },
  ],
  Services: [
    { href: "/services/", label: "Web Development" },
    { href: "/services/", label: "UI/UX Design" },
    { href: "/services/", label: "Consulting" },
    { href: "/services/", label: "Support" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-slate-400">
      <div className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="text-white font-bold text-xl tracking-tight">
              Acme<span className="text-primary-light">Co.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              We build modern digital products and services that help businesses
              grow. Quality, clarity, and results — every time.
            </p>
            <div className="flex gap-4 mt-6">
              {["twitter", "linkedin", "github"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-slate-300 hover:text-white"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Acme Co. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
