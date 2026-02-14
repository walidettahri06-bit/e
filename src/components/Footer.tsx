import { Mail, Phone, MapPin } from "lucide-react";
import esmLogo from "@/assets/esm-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={esmLogo} alt="ESM Logo" className="h-16 w-auto object-contain" />
              <div>
                <span className="font-heading font-bold text-primary-foreground text-lg block leading-none">ESM</span>
                <span className="text-primary-foreground/50 text-[10px] font-body">Elevators Sahara Morocco</span>
              </div>
            </div>
            <p className="font-body text-primary-foreground/60 text-sm leading-relaxed">
              L'excellence bâtie, l'élévation assurée. Votre partenaire BTP & ascenseurs au Maroc.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-primary-foreground text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3 font-body text-sm">
              <a href="mailto:elevatorssaharamorcco@gmail.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 text-accent" />
                elevatorssaharamorcco@gmail.com
              </a>
              <a href="tel:0651641379" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-accent" />
                06 51 64 13 79
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>26 Avenue Mers Sultan, Casablanca</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-primary-foreground text-sm uppercase tracking-wider mb-4">Informations Légales</h4>
            <div className="font-body text-primary-foreground/50 text-xs space-y-1.5">
              <p>ICE : 0033510716000038</p>
              <p>RC : 24135 Casablanca</p>
              <p>Patente : 34106519</p>
              <p>IF : 65976492</p>
              <p>CNSS : 1258963</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6">
          <p className="font-body text-primary-foreground/40 text-xs text-center">
            © 2026 Elevators Sahara Morocco. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
