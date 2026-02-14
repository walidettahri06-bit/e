import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/75" />

      {/* Vertical decorative line */}
      <div className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-px vertical-line hidden md:block" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="font-body text-accent text-sm md:text-base tracking-[0.3em] uppercase mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          BTP & Mobilité Verticale
        </p>
        <h1 className="font-heading font-black text-primary-foreground text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          L'excellence bâtie,
          <br />
          <span className="text-accent">l'élévation assurée.</span>
        </h1>
        <p className="font-body text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Expertise BTP & Maintenance d'ascenseurs au service de la région du Sahara et de tout le Maroc.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <a
            href="#services"
            className="bg-accent text-accent-foreground font-heading font-bold px-8 py-4 rounded-md text-sm tracking-wide hover:scale-105 transition-transform"
          >
            Découvrir nos services
          </a>
          <a
            href="#projets"
            className="border border-primary-foreground/30 text-primary-foreground font-body px-8 py-4 rounded-md text-sm hover:border-accent hover:text-accent transition-colors"
          >
            Voir nos réalisations
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/50 animate-bounce">
        <ArrowDown className="w-6 h-6" />
      </a>
    </section>
  );
};

export default Hero;
