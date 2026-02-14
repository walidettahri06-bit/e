import { ShieldCheck, MapPin, FileText, Award } from "lucide-react";

const credentials = [
  { label: "ICE", value: "0033510716000038" },
  { label: "RC", value: "24135 Casablanca" },
  { label: "Patente", value: "34106519" },
  { label: "IF", value: "65976492" },
  { label: "CNSS", value: "1258963" },
];

const Trust = () => {
  return (
    <section id="confiance" className="py-24 section-navy relative overflow-hidden">
      {/* Decorative geometry */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="font-body text-accent text-sm tracking-[0.2em] uppercase mb-3">Transparence</p>
          <h2 className="font-heading text-primary-foreground text-3xl md:text-5xl mb-4">
            Confiance & Légalité
          </h2>
          <p className="font-body text-primary-foreground/60 max-w-xl mx-auto">
            ESM place la transparence administrative au cœur de sa relation client.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Accreditations */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="w-8 h-8 text-accent" />
              <h3 className="font-heading text-primary-foreground text-xl">Accréditations Officielles</h3>
            </div>
            <div className="space-y-4">
              {credentials.map((c) => (
                <div key={c.label} className="flex items-center gap-4 bg-primary-foreground/5 rounded-lg px-5 py-4">
                  <FileText className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <span className="font-heading text-accent text-sm">{c.label}</span>
                    <p className="font-body text-primary-foreground/80 text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-8 h-8 text-accent" />
              <h3 className="font-heading text-primary-foreground text-xl">Notre Siège</h3>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="ESM Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-7.6191!3d33.5912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzI4LjMiTiA3wrAzNycwOC44Ilc!5e0!3m2!1sfr!2sma!4v1700000000000"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Award className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <p className="font-body text-primary-foreground/70 text-sm leading-relaxed">
                26 Avenue Mers Sultan, Casablanca — Au cœur du quartier d'affaires, pour une proximité optimale avec nos clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
