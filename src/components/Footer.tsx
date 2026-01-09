import { Heart, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Lang } from "@/lib/i18n";

interface FooterProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const Footer = ({ lang, setLang }: FooterProps) => {
  const isTamil = lang === "ta";

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-8">

        {/* DISCLAIMER */}
        <div className="mb-8 rounded-xl bg-warning-light border border-warning/20 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-warning" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {isTamil ? "மருத்துவ எச்சரிக்கை" : "Medical Disclaimer"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {isTamil
                  ? "இந்த கருவி தகவல் நோக்கத்திற்காக மட்டுமே. அவசரநிலையில் 108-ஐ அழைக்கவும்."
                  : "This tool is for informational purposes only. In emergencies, call 108."}
              </p>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-medical-blue">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">
                CareNav
              </span>
            </Link>

            <p className="mt-3 text-sm text-muted-foreground">
              {isTamil
                ? "உங்கள் நம்பகமான மருத்துவ வழிகாட்டி."
                : "Your trusted companion for symptom assessment and healthcare guidance."}
            </p>

            {/* LANGUAGE SELECTOR */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                {isTamil ? "மொழி" : "Language"}
              </label>
              <select
                value={lang}
                onChange={e => setLang(e.target.value as Lang)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold">
              {isTamil ? "விரைவு இணைப்புகள்" : "Quick Links"}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/">{isTamil ? "முகப்பு" : "Home"}</Link></li>
              <li><Link to="/chat">{isTamil ? "அறிகுறி சரிபார்ப்பு" : "Symptom Check"}</Link></li>
              <li><Link to="/guidelines">{isTamil ? "மருத்துவ வழிகாட்டிகள்" : "Medical Guidelines"}</Link></li>
            </ul>
          </div>

          {/* STANDARDS */}
          <div>
            <h4 className="font-semibold">
              {isTamil ? "எங்கள் தரநிலைகள்" : "Our Standards"}
            </h4>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex gap-2">
                <Shield className="h-4 w-4 text-medical-teal" />
                {isTamil ? "WHO & CDC வழிகாட்டுதல்கள்" : "Following CDC & WHO Guidelines"}
              </li>
              <li className="flex gap-2">
                <Shield className="h-4 w-4 text-medical-teal" />
                {isTamil ? "தனியுரிமை பாதுகாப்பு" : "Privacy-First Approach"}
              </li>
              <li className="flex gap-2">
                <Shield className="h-4 w-4 text-medical-teal" />
                {isTamil ? "ஆதார அடிப்படையிலான பரிந்துரைகள்" : "Evidence-Based Recommendations"}
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CareNav — {isTamil ? "அவசரநிலையில் 108-ஐ அழைக்கவும்" : "For emergencies, call 108"}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
