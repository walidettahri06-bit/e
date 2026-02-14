import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import esmLogo from "@/assets/esm-logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState("FR");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Accueil", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Projets", href: "#projets" },
    { label: "Confiance", href: "#confiance" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary shadow-lg" : "bg-primary/90 backdrop-blur-sm"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2">
          <img src={esmLogo} alt="ESM Logo" className="h-16 md:h-20 w-auto object-contain" />
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-primary-foreground text-lg leading-none block">ESM</span>
            <span className="text-primary-foreground/60 text-[10px] font-body leading-none">Elevators Sahara Morocco</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-sm">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="hidden md:flex items-center gap-1 text-xs text-primary-foreground/60">
            {["FR", "AR", "EN"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-1.5 py-0.5 rounded transition-colors ${lang === l ? "bg-accent text-accent-foreground" : "hover:text-primary-foreground"
                  }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Emergency CTA */}
          <a
            href="tel:0651641379"
            className="pulse-cta flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-md font-body font-bold text-xs md:text-sm transition-transform hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Dépannage 24/7</span>
            <span className="hidden md:inline">: 06 51 64 13 79</span>
          </a>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-primary border-t border-primary-foreground/10 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block px-6 py-3 text-primary-foreground/80 hover:text-accent font-body transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-2 px-6 pt-2 text-xs text-primary-foreground/60">
            {["FR", "AR", "EN"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded ${lang === l ? "bg-accent text-accent-foreground" : ""}`}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
