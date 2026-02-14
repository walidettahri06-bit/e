import { useState, useRef } from "react";
import { Building2, ArrowUpDown, Upload, X, Send } from "lucide-react";

const tabs = [
  { id: "btp", label: "BTP & Construction", icon: Building2 },
  { id: "ascenseurs", label: "Ascenseurs & Mobilité", icon: ArrowUpDown },
] as const;

type TabId = (typeof tabs)[number]["id"];

const QuoteForm = () => {
  const [activeTab, setActiveTab] = useState<TabId>("btp");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // BTP fields
  const [btpType, setBtpType] = useState("");
  const [btpSurface, setBtpSurface] = useState("");
  const [btpLocation, setBtpLocation] = useState("");

  // Ascenseur fields
  const [ascEtages, setAscEtages] = useState("");
  const [ascType, setAscType] = useState("");
  const [ascService, setAscService] = useState("");

  // Common
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Prepare form data
    const formData = new FormData();
    formData.append('activeTab', activeTab);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);

    // BTP fields
    formData.append('btpType', btpType);
    formData.append('btpSurface', btpSurface);
    formData.append('btpLocation', btpLocation);

    // Ascenseur fields
    formData.append('ascEtages', ascEtages);
    formData.append('ascType', ascType);
    formData.append('ascService', ascService);

    // File
    if (file) {
      formData.append('attachment', file);
    }

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ success: true, message: data.message });

        // Open WhatsApp after successful submission
        if (data.whatsappUrl) {
          window.open(data.whatsappUrl, '_blank');
        }

        // Reset form
        setBtpType("");
        setBtpSurface("");
        setBtpLocation("");
        setAscEtages("");
        setAscType("");
        setAscService("");
        setName("");
        setPhone("");
        setEmail("");
        setFile(null);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        setSubmitStatus({ success: false, message: data.message || 'Une erreur est survenue' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-muted bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/60 transition-all";
  const labelClass = "block text-sm font-heading font-semibold text-foreground mb-1.5";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <section id="devis" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary text-center mb-2">
          Demander une Étude & Devis
        </h2>
        <p className="text-center text-muted-foreground font-body mb-10">
          Sélectionnez votre domaine d'expertise et remplissez le formulaire ci-dessous.
        </p>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-muted mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-heading font-bold text-sm md:text-base transition-all ${active
                    ? "bg-accent text-accent-foreground shadow-inner"
                    : "bg-background text-muted-foreground hover:bg-muted/60"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-10 rounded-2xl space-y-6">
          {/* BTP Fields */}
          {activeTab === "btp" && (
            <div className="grid md:grid-cols-2 gap-5 animate-fade-in">
              <div className="md:col-span-2">
                <label className={labelClass}>Type de projet</label>
                <select value={btpType} onChange={(e) => setBtpType(e.target.value)} className={selectClass} required>
                  <option value="">— Sélectionnez —</option>
                  <option value="villa">Villa</option>
                  <option value="immeuble">Immeuble</option>
                  <option value="industriel">Industriel</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Surface estimée (m²)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Ex: 250"
                  value={btpSurface}
                  onChange={(e) => setBtpSurface(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Localisation au Maroc</label>
                <input
                  type="text"
                  placeholder="Ex: Casablanca, Laâyoune..."
                  value={btpLocation}
                  onChange={(e) => setBtpLocation(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          )}

          {/* Ascenseurs Fields */}
          {activeTab === "ascenseurs" && (
            <div className="grid md:grid-cols-2 gap-5 animate-fade-in">
              <div>
                <label className={labelClass}>Nombre d'étages</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Ex: 5"
                  value={ascEtages}
                  onChange={(e) => setAscEtages(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Type d'appareil</label>
                <select value={ascType} onChange={(e) => setAscType(e.target.value)} className={selectClass} required>
                  <option value="">— Sélectionnez —</option>
                  <option value="passagers">Passagers</option>
                  <option value="monte-charge">Monte-charge</option>
                  <option value="monte-plat">Monte-plat</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Service demandé</label>
                <select value={ascService} onChange={(e) => setAscService(e.target.value)} className={selectClass} required>
                  <option value="">— Sélectionnez —</option>
                  <option value="installation">Installation neuve</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="modernisation">Modernisation</option>
                </select>
              </div>
            </div>
          )}

          {/* Common fields */}
          <div className="grid md:grid-cols-3 gap-5 pt-2 border-t border-muted">
            <div>
              <label className={labelClass}>Nom complet</label>
              <input type="text" placeholder="Votre nom" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Téléphone</label>
              <input type="tel" placeholder="06 XX XX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" placeholder="votre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* File upload */}
          <div>
            <label className={labelClass}>Joindre un plan ou cahier des charges</label>
            <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFile} className="hidden" />
            {!file ? (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-muted-foreground/30 rounded-xl py-6 flex flex-col items-center gap-2 text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                <Upload className="w-8 h-8" />
                <span className="text-sm font-body">Cliquez pour téléverser un fichier</span>
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-muted/60 rounded-lg px-4 py-3">
                <Upload className="w-5 h-5 text-accent" />
                <span className="text-sm font-body flex-1 truncate">{file.name}</span>
                <button type="button" onClick={() => setFile(null)} className="text-muted-foreground hover:text-destructive">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin"></span>
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer ma demande de devis
              </>
            )}
          </button>

          {/* Status Message */}
          {submitStatus && (
            <div className={`p-4 rounded-lg text-center font-body ${submitStatus.success
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default QuoteForm;
