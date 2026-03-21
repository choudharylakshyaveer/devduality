import { useState } from "react";
import { collection, addDoc, serverTimestamp} from "firebase/firestore";
import AmitPhoto from "../static/Amit_Upadhyay.png";
import LakshyaveerPhoto from "../static/Lakshyaveer.jpeg";
import { db } from "../firebase";

const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);


export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus]     = useState("idle");
  const people = [
    { name: "Lakshyaveer Singh", role: "Backend Architect · Android Engineer", phone: "+91 81304 17748", tel: "+918130417748", photo: LakshyaveerPhoto, linkedin: "https://linkedin.com/in/lakshyaveer", github: "https://github.com/lakshyaveer" },
    { name: "Amit Upadhyay",     role: "Full-Stack Developer · API Engineer",   phone: "+91 91401 42098", tel: "+919140142098", photo: AmitPhoto, linkedin: "https://linkedin.com/in", github: "https://github.com/amitupadhyay" },
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
              <div className="bg-surface-container-low flex items-center justify-center p-4 pt-6">
                <img src={p.photo} alt={p.name} style={{ width: "100%", maxHeight: "320px", objectFit: "contain", objectPosition: "center top", display: "block" }} />
              </div>
              <div className="mx-6 border-t border-black/5" />
              <div className="px-6 pb-6 pt-4">
                <h3 className="font-headline text-lg font-extrabold text-on-background leading-tight">{p.name}</h3>
                <p className="text-[10px] font-medium uppercase tracking-widest text-secondary mb-4 mt-0.5">{p.role}</p>
                <div className="space-y-3">
                  <a href={`tel:${p.tel}`} className="flex items-center gap-2.5 text-secondary hover:text-primary transition-colors font-medium text-sm">
                    <Icon name="call" className="text-primary text-lg" />{p.phone}
                  </a>
                  <div className="flex gap-4 pt-1">
                    <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors border-b border-black/5 pb-1">LinkedIn</a>
                    <a href={p.github} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors border-b border-black/5 pb-1">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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