/* ─────────────────────────────────────────────────────────────────────────────
   botRules.js
   Rule-based chatbot engine for the L&A portfolio assistant.
   To add a new topic: add an object to BOT_RULES with:
     patterns: [...keywords]   — any substring match triggers the rule
     replies:  [...strings]    — one is picked at random
───────────────────────────────────────────────────────────────────────────── */

export const BOT_RULES = [
  {
    patterns: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "howdy", "sup"],
    replies: [
      "Hi there! 👋 Welcome to Lakshyaveer & Amit's portfolio. How can I help you today?",
      "Hello! 😊 Great to have you here. Feel free to ask anything about our services, tech stack, pricing, or process!",
      "Hey! Welcome! I'm here to answer any questions you have about working with Lakshyaveer & Amit.",
    ],
  },
  {
    patterns: ["who are you", "what are you", "are you a bot", "are you human", "are you ai", "are you real"],
    replies: [
      "I'm a virtual assistant for Lakshyaveer & Amit — a two-person full-stack dev duo based in Noida, India. I can answer your pre-sales questions before you get on a call with them!",
      "I'm the portfolio chatbot for L&A! Not a human, but I know everything about their services, pricing, and process. Ask away!",
    ],
  },
  {
    patterns: ["who is lakshyaveer", "tell me about lakshyaveer", "about lakshyaveer"],
    replies: [
      "Lakshyaveer Singh is a Backend Architect & Android Engineer with 6+ years of experience. He specialises in Java microservices, AWS infrastructure, and Android SDK internals. 📞 +91 81304 17748",
    ],
  },
  {
    patterns: ["who is amit", "tell me about amit", "about amit"],
    replies: [
      "Amit Upadhyay is a Full-Stack Developer & API Engineer focused on clean REST API architecture, PostgreSQL database design, and end-to-end Android application development. 📞 +91 91401 42098",
    ],
  },
  {
    patterns: ["team", "members", "founders", "people", "duo", "both"],
    replies: [
      "The team is:\n• Lakshyaveer Singh — Backend Architect & Android Engineer (+91 81304 17748)\n• Amit Upadhyay — Full-Stack Developer & API Engineer (+91 91401 42098)\n\nTogether they bring 10+ years of combined experience!",
    ],
  },
  {
    patterns: ["tech stack", "technologies", "what do you use", "tools", "languages", "framework"],
    replies: [
      "Here's the full stack:\n\n📱 Android: Kotlin, Jetpack Compose, Android SDK, ReactiveX, Dagger/Hilt, Kotlin Multiplatform\n\n⚙️ Backend: Java SE/EE, Node.js, REST APIs, Microservices, AWS, PostgreSQL, Redis, Firebase\n\n🔧 Other: Docker, CI/CD, GraphQL",
    ],
  },
  {
    patterns: ["java", "android", "kotlin", "jetpack", "compose", "dagger", "hilt", "reactivex"],
    replies: [
      "Yes! Java and Android are our core strengths. Lakshyaveer specialises in Java microservices and Android SDK internals, while Amit handles full-stack Android and API work using Kotlin, Jetpack Compose, and Dagger/Hilt.",
      "Android + Java is exactly what we do best — from Jetpack Compose UIs to scalable Java backends. Want to discuss a specific project?",
    ],
  },
  {
    patterns: ["node", "nodejs", "postgresql", "postgres", "firebase", "aws", "redis", "docker"],
    replies: [
      "Absolutely, that's part of our backend toolkit. We use Node.js, PostgreSQL, Firebase, Redis, AWS, and Docker in production. Amit leads most backend API work while Lakshyaveer handles cloud infrastructure and microservices.",
    ],
  },
  {
    patterns: ["price", "pricing", "cost", "how much", "budget", "rate", "fees", "charge", "expensive"],
    replies: [
      "Here's a rough idea of our pricing:\n\n💡 Small projects / MVPs: ₹50,000 – ₹1,50,000\n📦 Medium projects: ₹1,50,000 – ₹4,00,000\n🏢 Large / Enterprise: Custom quote after a discovery call\n⏱ Hourly consulting: Available on request\n\nEvery project is scoped individually. Want to book a free 30-min discovery call?",
    ],
  },
  {
    patterns: ["timeline", "how long", "duration", "time", "deadline", "weeks", "months", "fast", "quick"],
    replies: [
      "Typical timelines:\n\n⚡ MVP / Small project: 3–6 weeks\n📲 Medium Android app: 6–12 weeks\n🏗 Large backend system: 3–6 months\n\nWe work in weekly sprints with regular client updates. Project kickoff usually happens within 1–2 weeks of agreement.",
    ],
  },
  {
    patterns: ["process", "workflow", "steps", "how do you work", "methodology", "approach"],
    replies: [
      "Our work process is simple and transparent:\n\n1️⃣ Discovery call — free, 30 minutes\n2️⃣ Scoping & proposal — 2–3 days\n3️⃣ Development — weekly updates & demos\n4️⃣ Testing & QA — before any release\n5️⃣ Deployment & handover\n6️⃣ Post-launch support\n\nWant to start with step 1?",
    ],
  },
  {
    patterns: ["services", "what do you do", "what can you build", "offer", "expertise", "capabilities"],
    replies: [
      "We offer:\n\n📱 Custom Android app development (native & hybrid)\n⚙️ Java backend & microservices architecture\n🔌 API design and third-party integrations\n🔍 Technical audits & code reviews\n🚀 Performance optimisation for existing apps\n\nHave a specific project in mind? Tell me more!",
    ],
  },
  {
    patterns: ["mobile", "app", "android app", "ios", "flutter", "hybrid", "react native"],
    replies: [
      "We specialise in native Android development using Kotlin and Jetpack Compose. We also have experience with hybrid approaches using Kotlin Multiplatform. For iOS-only or React Native projects, we can discuss scope on a call.",
    ],
  },
  {
    patterns: ["backend", "server", "api", "microservice", "database", "cloud"],
    replies: [
      "Backend is our strong suit! We build scalable Java microservices, RESTful APIs, and cloud infrastructure on AWS. Our systems are designed for high throughput and low latency. What kind of backend are you looking to build?",
    ],
  },
  {
    patterns: ["mvp", "startup", "idea", "prototype", "proof of concept", "poc"],
    replies: [
      "We love working on MVPs and early-stage startups! We can help you build a lean, production-ready MVP quickly so you can validate your idea. Typical MVP cost: ₹50,000–₹1,50,000. Want to discuss your idea?",
    ],
  },
  {
    patterns: ["freelance", "upwork", "fiverr", "hire", "available", "availability", "free"],
    replies: [
      "We're generally available for new projects, with kickoff typically within 1–2 weeks of agreement. You can reach us directly at devduality7@gmail.com or book a free discovery call. We've delivered 40+ projects across Upwork and Fiverr!",
    ],
  },
  {
    patterns: ["contact", "reach", "call", "phone", "email", "get in touch", "talk", "connect", "meeting"],
    replies: [
      "You can reach the team directly:\n\n📧 devduality7@gmail.com\n📞 Lakshyaveer Singh: +91 81304 17748\n📞 Amit Upadhyay: +91 91401 42098\n\nOr scroll up to the Contact section to send an inquiry form!",
    ],
  },
  {
    patterns: ["location", "where are you", "based", "india", "noida", "remote", "onsite"],
    replies: [
      "We're based in Noida, India 🇮🇳 and work with clients globally — fully remote-friendly. We've successfully delivered projects for clients in India, UAE, UK, and the US.",
    ],
  },
  {
    patterns: ["experience", "years", "how long have you", "background", "history", "portfolio"],
    replies: [
      "Lakshyaveer & Amit have a combined 10+ years of experience in Java and Android development. They've shipped 40+ projects across domains like fintech, edtech, logistics, and SaaS. You can see selected work in the Projects section above!",
    ],
  },
  {
    patterns: ["review", "testimonial", "rating", "feedback", "client", "happy", "satisfied"],
    replies: [
      "We have 60+ five-star reviews across Upwork and Fiverr! Clients consistently highlight our technical depth, communication, and on-time delivery. You can see some testimonials scrolling above on this page 😊",
    ],
  },
  {
    patterns: ["thanks", "thank you", "thank", "appreciate", "helpful", "great", "awesome", "good"],
    replies: [
      "You're welcome! 😊 Feel free to ask anything else, or reach out directly at devduality7@gmail.com",
      "Happy to help! If you're ready to start a project, drop us a line at devduality7@gmail.com 🚀",
      "Glad I could help! Don't hesitate to get in touch with the team when you're ready.",
    ],
  },
  {
    patterns: ["bye", "goodbye", "see you", "later", "take care", "ciao"],
    replies: [
      "Goodbye! 👋 Hope to hear from you soon at devduality7@gmail.com",
      "See you! Feel free to come back anytime. Good luck with your project! 🚀",
    ],
  },
];

export const FALLBACK_REPLIES = [
  "I'm not sure I understood that. Could you try rephrasing? You can ask about our tech stack, pricing, timeline, services, or how to get in touch!",
  "Hmm, that's outside what I can answer right now. For detailed queries, reach us at devduality7@gmail.com or call +91 81304 17748 📞",
  "I didn't quite catch that! Try asking about: services, pricing, tech stack, process, or how to contact the team.",
];

/**
 * Returns a reply string for the given user input.
 * Matches against BOT_RULES patterns (substring, case-insensitive).
 * Falls back to a random FALLBACK_REPLY if no rule matches.
 */
export function getBotReply(userInput) {
  const text = userInput.toLowerCase().trim();
  for (const rule of BOT_RULES) {
    if (rule.patterns.some((p) => text.includes(p))) {
      const { replies } = rule;
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
}