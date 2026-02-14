import { Building2, Wrench, HardHat, RefreshCw, Cog, Paintbrush } from "lucide-react";

const services = [
  {
    pole: "construction",
    icon: HardHat,
    title: "Gros Œuvre",
    description: "Fondations, structures en béton armé et charpentes métalliques pour tous types de bâtiments.",
  },
  {
    pole: "construction",
    icon: Paintbrush,
    title: "Second Œuvre",
    description: "Finitions, plomberie, électricité et aménagements intérieurs de haute qualité.",
  },
  {
    pole: "construction",
    icon: Building2,
    title: "Rénovation Industrielle",
    description: "Réhabilitation et mise aux normes de bâtiments industriels et commerciaux.",
  },
  {
    pole: "ascenseur",
    icon: Cog,
    title: "Installation",
    description: "Installation d'ascenseurs neufs conformes aux normes européennes de sécurité.",
  },
  {
    pole: "ascenseur",
    icon: RefreshCw,
    title: "Modernisation",
    description: "Mise à niveau technologique et esthétique de vos équipements existants.",
  },
  {
    pole: "ascenseur",
    icon: Wrench,
    title: "Maintenance",
    description: "Contrats de maintenance préventive et curative avec intervention rapide 24/7.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 section-pearl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-body text-accent text-sm tracking-[0.2em] uppercase mb-3">Nos Expertises</p>
          <h2 className="font-heading text-foreground text-3xl md:text-5xl mb-4">
            Deux pôles, <span className="text-accent">une vision</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            ESM réunit l'expertise du bâtiment et de la mobilité verticale pour offrir des solutions complètes à ses clients.
          </p>
        </div>

        {/* Construction */}
        <div className="mb-12">
          <h3 className="font-heading text-foreground text-lg mb-6 flex items-center gap-3">
            <span className="w-10 h-px bg-accent" />
            Pôle Construction
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {services
              .filter((s) => s.pole === "construction")
              .map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
          </div>
        </div>

        {/* Ascenseurs */}
        <div>
          <h3 className="font-heading text-foreground text-lg mb-6 flex items-center gap-3">
            <span className="w-10 h-px bg-accent" />
            Pôle Ascenseurs
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {services
              .filter((s) => s.pole === "ascenseur")
              .map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <div className="glass-card rounded-lg p-8 hover-lift group cursor-default">
    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
      <Icon className="w-7 h-7 text-accent" />
    </div>
    <h4 className="font-heading text-foreground text-xl mb-3">{title}</h4>
    <p className="font-body text-muted-foreground text-sm leading-relaxed">{description}</p>
  </div>
);

export default Services;
