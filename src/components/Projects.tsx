import { useState } from "react";
import { MapPin } from "lucide-react";

type Filter = "all" | "sahara" | "nord";

const projects = [
  { id: 1, title: "Résidence Al Massira", location: "Laâyoune", region: "sahara" as const, type: "Construction", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop" },
  { id: 2, title: "Tour Atlas Business", location: "Casablanca", region: "nord" as const, type: "Ascenseur", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop" },
  { id: 3, title: "Hôtel Sahara Palace", location: "Dakhla", region: "sahara" as const, type: "Construction & Ascenseur", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop" },
  { id: 4, title: "Centre Commercial Oasis", location: "Guelmim", region: "sahara" as const, type: "Ascenseur", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop" },
  { id: 5, title: "Immeuble Anfa Residence", location: "Casablanca", region: "nord" as const, type: "Modernisation", image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&h=400&fit=crop" },
  { id: 6, title: "Complexe Industriel Sud", location: "Tan-Tan", region: "sahara" as const, type: "Construction", image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=600&h=400&fit=crop" },
];

const Projects = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.region === filter);

  return (
    <section id="projets" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-body text-accent text-sm tracking-[0.2em] uppercase mb-3">Portfolio</p>
          <h2 className="font-heading text-foreground text-3xl md:text-5xl mb-4">Nos Réalisations</h2>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {([
            ["all", "Tous les projets"],
            ["sahara", "Projets Sahara"],
            ["nord", "Projets Nord / Casablanca"],
          ] as [Filter, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`font-body text-sm px-5 py-2.5 rounded-md transition-all ${
                filter === key
                  ? "bg-accent text-accent-foreground font-bold"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <div key={p.id} className="group rounded-lg overflow-hidden shadow-md hover-lift bg-card">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-body font-bold px-3 py-1 rounded">
                  {p.type}
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-heading text-foreground text-lg mb-1">{p.title}</h4>
                <p className="font-body text-muted-foreground text-sm flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {p.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
