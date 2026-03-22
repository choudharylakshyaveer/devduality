import { useState } from "react";
import { collection, addDoc, serverTimestamp} from "firebase/firestore";
import AmitPhoto from "../static/Amit_Upadhyay.png";
import LakshyaveerPhoto from "../static/Lakshyaveer.jpeg";
import LakshyaveerQR from "../static/lakshyaveer_whatsapp_qr.png";
import AmitQR from "../static/amit_whatsapp_qr.png";
import { db } from "../firebase";

const Icon = ({ name, className = "", style = {} }) => (
  <span className={`material-symbols-outlined ${className}`} style={style}>{name}</span>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus]     = useState("idle");
  const [activeQR, setActiveQR] = useState(null);

  const people = [
    { name: "Lakshyaveer Singh", role: "Backend Architect · Android Engineer", phone: "+91 81304 17748", tel: "+918130417748", photo: LakshyaveerPhoto, whatsappQR: LakshyaveerQR, linkedin: "https://linkedin.com/in/lakshyaveer", github: "https://github.com/lakshyaveer" },
    { name: "Amit Upadhyay",     role: "Full-Stack Developer · API Engineer",   phone: "+91 91401 42098", tel: "+919140142098", photo: AmitPhoto, whatsappQR: AmitQR, linkedin: "https://linkedin.com/in", github: "https://github.com/amitupadhyay" },
  ];

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async () => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) { alert("Please fill in all fields before submitting."); return; }
    setStatus("sending");
    try {
      await addDoc(collection(db, "inquiries"), { name: name.trim(), email: email.trim(), message: message.trim(), createdAt: serverTimestamp() });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Firestore write failed:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-12 bg-surface-container-low">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="uppercase tracking-[0.2em] text-primary font-bold text-[10px] block mb-6">03. Collaboration</span>
          <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter mb-8">Initiate Project.</h2>
          <p className="text-secondary max-w-lg mx-auto">Ready to build something remarkable? Let's discuss your architectural needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {people.map((p) => (
            <div key={p.name} className="bg-surface-container-lowest rounded-2xl editorial-shadow border border-black/5 transition-transform hover:-translate-y-1 overflow-hidden flex flex-col">
              {/* Photo */}
              <div className="bg-surface-container-low flex items-center justify-center p-4 pt-6">
                <img src={p.photo} alt={p.name} style={{ width: "100%", maxHeight: "320px", objectFit: "contain", objectPosition: "center top", display: "block" }} />
              </div>

              <div className="mx-6 border-t border-black/5" />

              {/* Info */}
              <div className="px-6 pb-6 pt-4 flex flex-col gap-4">
                <div>
                  <h3 className="font-headline text-lg font-extrabold text-on-background leading-tight">{p.name}</h3>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-secondary mt-0.5">{p.role}</p>
                </div>

                <div className="space-y-3">
                  <a href={`tel:${p.tel}`} className="flex items-center gap-2.5 text-secondary hover:text-primary transition-colors font-medium text-sm">
                    <Icon name="call" className="text-primary text-lg" />{p.phone}
                  </a>

                  {/* WhatsApp QR toggle — premium green */}
                  <button
                    type="button"
                    onClick={() => setActiveQR(activeQR === p.name ? null : p.name)}
                    className="flex items-center gap-3 w-full text-left group"
                  >
                    {/* Circular gradient badge */}
                    <span style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                      boxShadow: "0 2px 8px rgba(37,211,102,0.35)",
                      flexShrink: 0,
                      transition: "box-shadow 0.2s, transform 0.2s",
                    }}
                    className="group-hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: "1rem", height: "1rem" }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </span>

                    <span className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors" style={{ letterSpacing: "0.01em" }}>
                      Connect on WhatsApp
                    </span>

                    <Icon
                      name={activeQR === p.name ? "expand_less" : "qr_code_2"}
                      className="text-base ml-auto transition-colors"
                      style={{ color: activeQR === p.name ? "var(--color-primary)" : "rgba(0,0,0,0.3)" }}
                    />
                  </button>

                  {/* QR Code panel */}
                  {activeQR === p.name && (
                    <div className="flex flex-col items-center gap-2 pt-1 pb-2">
                      <img
                        src={p.whatsappQR}
                        alt={`WhatsApp QR for ${p.name}`}
                        style={{ width: "160px", height: "160px", objectFit: "contain", borderRadius: "12px", border: "1px solid rgba(37,211,102,0.2)", background: "#fff", padding: "8px", boxShadow: "0 4px 16px rgba(37,211,102,0.15)" }}
                      />
                      <p className="text-[10px] text-secondary tracking-wide">Scan to open WhatsApp chat</p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-1">
                    <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors border-b border-black/5 pb-1">LinkedIn</a>
                    <a href={p.github} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors border-b border-black/5 pb-1">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="space-y-6 md:space-y-8 bg-surface-container-lowest p-8 md:p-12 rounded-3xl editorial-shadow border border-black/5">
          {status === "success" && (
            <div style={{ background: "rgba(115,92,0,0.08)", border: "1px solid rgba(115,92,0,0.25)", borderRadius: "12px", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.4rem" }}>✅</span>
              <div><p className="font-headline font-bold text-sm text-primary">Message sent successfully!</p><p className="text-secondary text-xs mt-0.5">We'll get back to you within 24 hours at <strong>devduality7@gmail.com</strong></p></div>
            </div>
          )}
          {status === "error" && (
            <div style={{ background: "rgba(220,50,50,0.06)", border: "1px solid rgba(220,50,50,0.2)", borderRadius: "12px", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.4rem" }}>⚠️</span>
              <div><p className="font-headline font-bold text-sm" style={{ color: "#c0392b" }}>Something went wrong.</p><p className="text-secondary text-xs mt-0.5">Please email us directly at <strong>devduality7@gmail.com</strong></p></div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[{ label: "Full Name", name: "name", placeholder: "John Doe", type: "text" }, { label: "Email Address", name: "email", placeholder: "john@company.com", type: "email" }].map((f) => (
              <div key={f.label}>
                <label className="block text-[10px] font-bold uppercase mb-3 text-secondary tracking-widest">{f.label}</label>
                <input type={f.type} name={f.name} placeholder={f.placeholder} value={formData[f.name]} onChange={handleChange} required className="w-full bg-surface-container-low border-transparent rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm outline-none" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase mb-3 text-secondary tracking-widest">Project Details</label>
            <textarea rows={5} name="message" placeholder="How can we help you architecture your next venture?" value={formData.message} onChange={handleChange} required className="w-full bg-surface-container-low border-transparent rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm resize-none outline-none" />
          </div>
          <div className="flex justify-center pt-4">
            <button type="button" onClick={handleSubmit} disabled={status === "sending" || status === "success"}
              className="w-full md:w-auto bg-primary text-on-primary rounded-full px-12 md:px-20 py-5 font-headline font-bold text-lg shadow-xl shadow-primary/10 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              style={{ opacity: status === "sending" || status === "success" ? 0.65 : 1, cursor: status === "sending" || status === "success" ? "not-allowed" : "pointer" }}>
              {status === "sending" ? "Sending…" : status === "success" ? "Sent ✓" : "Send Inquiry"}
            </button>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 text-center">
          <a href="mailto:devduality7@gmail.com" className="text-lg md:text-xl font-bold text-on-background hover:text-primary transition-colors">devduality7@gmail.com</a>
        </div>
      </div>
    </section>
  );
}