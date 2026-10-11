import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Camera,
  Check,
  ChevronDown,
  ExternalLink,
  FileText,
  LineChart,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const year = new Date().getFullYear();

const steps = [
  {
    icon: Camera,
    title: "Snap a photo",
    text: "Take a picture of your drink or product.",
  },
  {
    icon: Sparkles,
    title: "Let AI identify it",
    text: "Get an estimated type and quantity.",
  },
  {
    icon: Check,
    title: "Confirm your entry",
    text: "Review the details and make adjustments.",
  },
  {
    icon: Target,
    title: "Watch progress update",
    text: "See your daily tracking update as you go.",
  },
];

const modes = [
  {
    emoji: "💧🧠",
    title: "Water Brain",
    text: "Stay on top of fluid intake, work toward your goals, and build daily streaks.",
    className: "water",
  },
  {
    emoji: "⚡🧠",
    title: "Energy Brain",
    text: "Keep track of your coffee and energy drinks, and understand your caffeine intake.",
    className: "energy",
  },
  {
    emoji: "🎉🧠",
    title: "Party Brain",
    text: "Log beer, wine, and liquor to keep a record of your estimated alcohol intake.",
    className: "party",
  },
];

const drinkTags = [
  "💧 Water",
  "☕ Coffee & tea",
  "⚡ Energy drinks",
  "🥤 Juice & smoothies",
  "🥛 Milk & soda",
  "🍷 Beer, wine & liquor",
  "💊 Vitamins & supplements",
  "📝 Nicotine products",
];

const insights = [
  ["Drink Diary", "Everything you've logged, all in one place."],
  ["Trends", "Explore daily, weekly, and monthly activity."],
  ["Streaks & goals", "Celebrate consistency and personal progress."],
  ["Patterns", "Discover when and what you consume most."],
  ["Achievements", "Unlock milestones as you build habits."],
  ["Next reminder", "Know when your next gentle nudge is coming."],
];

const faqSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      [
        "What is SipSmart AI?",
        "SipSmart AI is a photo-first drink and wellness tracker. Take a photo, review the AI's identification and quantity estimate, and save your entry to your personal diary. Your animated brain buddy responds to what you log.",
      ],
      [
        "How do I log a drink?",
        [
          "Open SipSmart AI and tap the camera button.",
          "Photograph your drink or its container.",
          "Review the beverage type and estimated amount.",
          "Correct any details and confirm the entry.",
        ],
      ],
      [
        "What can SipSmart AI track?",
        "Supported or planned categories include water, coffee, tea, energy drinks, juice, smoothies, soda, milk, beer, wine, liquor, and other drinks. Additional substance categories, such as vitamins, supplements, and nicotine, may be available depending on the app version.",
      ],
    ],
  },
  {
    id: "ai-tracking",
    title: "AI Tracking & Accuracy",
    items: [
      [
        "How accurate is AI drink recognition?",
        "AI can make mistakes, particularly when the container size, ingredients, or amount consumed are unclear. Always verify the drink type and amount before saving. A photo of a full container does not establish how much you actually drank.",
      ],
      [
        "What if the AI identifies my drink incorrectly?",
        "Edit the beverage category or amount on the confirmation screen before saving. Unrecognized beverages may appear as Other.",
      ],
      [
        "Can I log a drink without a photo?",
        "Use manual entry if your installed app version offers it. Otherwise, contact support for assistance.",
      ],
    ],
  },
  {
    id: "brain-buddy",
    title: "Hydration & Your Brain Buddy",
    items: [
      [
        "What does my hydration progress mean?",
        "It shows your logged fluid volume compared with your daily fluid goal. It does not measure your body's actual hydration status. Different drinks can affect the body differently; logging alcohol does not mean it hydrates you like water.",
      ],
      [
        "What are the brain modes?",
        "The brain buddy concept includes Water Brain for fluid tracking, Energy Brain for caffeine-related entries, and Party Brain for alcohol-related entries. The modes available to you depend on your app version.",
      ],
      [
        "Does water cancel the effects of caffeine or alcohol?",
        "No. Drinking water does not reverse alcohol impairment or cancel the effects of caffeine. SipSmart AI is not a medical or impairment-assessment tool.",
      ],
    ],
  },
  {
    id: "goals",
    title: "Goals, Reminders & Insights",
    items: [
      [
        "How do I change my daily fluid goal?",
        "Open Settings, select your daily fluid goal, adjust the target, and save.",
      ],
      [
        "How do I customize reminders?",
        "Open Settings, choose Reminders, and adjust the available schedule or notification preferences. Make sure notifications are enabled for SipSmart AI in your device settings.",
      ],
      [
        "Where is my Drink Diary?",
        "Open Insights to see your logged drinks and available statistics, such as trends, streaks, goals reached, patterns, achievements, and your next reminder.",
      ],
      [
        "Can I edit or delete a drink entry?",
        "In Insights, open the Drink Diary and select an entry to see any available edit or delete actions.",
      ],
    ],
  },
  {
    id: "billing",
    title: "Subscriptions & Account",
    items: [
      [
        "How do I manage or cancel my subscription?",
        "If you subscribed through Apple, open iPhone Settings, tap your name, choose Subscriptions, then select SipSmart AI. Removing the app does not cancel your subscription.",
      ],
      [
        "How do I request a refund?",
        "For App Store purchases, request a refund through Apple's Report a Problem service.",
        "https://reportaproblem.apple.com/",
      ],
      [
        "How do I delete my account?",
        "Look for account deletion in the app's Settings. If the option is unavailable or you cannot access your account, contact support to request deletion.",
      ],
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    items: [
      [
        "The camera isn't working",
        [
          "Allow camera access in your device settings.",
          "Close and reopen SipSmart AI.",
          "Update to the latest app version.",
          "Restart your device if the problem continues.",
        ],
      ],
      [
        "My reminders aren't appearing",
        [
          "Enable notifications for SipSmart AI.",
          "Review your reminder schedule.",
          "Check Focus and Do Not Disturb settings.",
          "Restart the app.",
        ],
      ],
      [
        "A drink is missing from my diary",
        [
          "Check that you confirmed and saved the entry.",
          "Check your connection and reopen the app.",
          "Contact support if the entry is still missing.",
        ],
      ],
    ],
  },
];

const legalDocs = {
  privacy: {
    icon: ShieldCheck,
    eyebrow: "Privacy Notice",
    title: "SipSmart AI Privacy Notice",
    date: "Effective Date: October 10, 2026",
    intro:
      "This Privacy Notice explains how SipSmart AI collects, uses, shares, and protects information when you use our website, mobile app, support center, and related services.",
    summary: [
      "SipSmart AI uses photos and entries you choose to submit to help identify drinks and maintain your diary.",
      "AI drink recognition and quantity estimates may be incomplete or inaccurate, so you should review entries before saving.",
      "Purchases and subscriptions are handled by third-party app stores, such as Apple or Google, under their own payment terms.",
      "Replace the contact and company details on this page with your final legal information before publishing.",
    ],
    sections: [
      {
        id: "information-we-collect",
        title: "1. Information We Collect",
        paragraphs: [
          "We may collect information you provide directly, information created when you use SipSmart AI, and limited information from third parties that support the service.",
        ],
        bullets: [
          "Account and contact details, such as your name, email address, profile details, and support messages.",
          "Drink and wellness entries, including photos of drinks or containers, beverage type, estimated volume, caffeine or alcohol-related labels, diary notes, daily fluid goals, reminders, streaks, and achievements.",
          "Optional profile or preference information, such as communication settings, app preferences, and any goals you choose to provide.",
          "Usage and device information, such as device type, browser type, operating system, IP address, app activity, crash data, and approximate location inferred from your device or network.",
          "Subscription and purchase status from app stores or payment providers. We do not receive your full payment card number from Apple, Google, or similar platforms.",
        ],
      },
      {
        id: "photos-ai-and-sensitive-information",
        title: "2. Photos, AI Estimates, and Sensitive Information",
        paragraphs: [
          "SipSmart AI is designed around photo-first logging. Photos, drink entries, supplement or nicotine labels, and related notes may reveal personal habits or information that some laws treat as sensitive. You control what you submit, and you should avoid uploading anything you do not want processed by the service.",
          "AI identification and quantity estimates are automated approximations. SipSmart AI is a tracking tool, not a medical device, and it does not measure impairment, diagnose conditions, or determine your actual hydration status.",
        ],
      },
      {
        id: "how-we-use-information",
        title: "3. How We Use Information",
        paragraphs: [
          "We use information to operate, maintain, personalize, and improve SipSmart AI. This includes creating drink diary entries, estimating drink details, displaying your brain buddy mode, calculating progress toward goals, sending reminders, providing insights, troubleshooting issues, preventing misuse, and responding to support requests.",
          "We may also use aggregated, de-identified, or anonymized information for analytics, research, product development, and business reporting where permitted by law.",
        ],
      },
      {
        id: "cookies-and-analytics",
        title: "4. Cookies and Analytics",
        paragraphs: [
          "Our website may use cookies, local storage, pixels, software development kits, and similar technologies to keep the site working, remember preferences, understand usage, improve performance, prevent fraud, and measure marketing or product activity.",
          "You can usually control cookies through your browser settings. Blocking some cookies may affect certain website features.",
        ],
      },
      {
        id: "how-we-share-information",
        title: "5. How We Share Information",
        paragraphs: [
          "We may share information with service providers and partners that help us host the website, operate the app, process support requests, analyze usage, send communications, provide security, manage subscriptions, and perform other services on our behalf.",
          "We may also share information when required by law, to protect rights and safety, in connection with a merger, acquisition, financing, or sale of assets, or with your consent or direction.",
        ],
      },
      {
        id: "your-choices",
        title: "6. Your Privacy Choices",
        paragraphs: [
          "Depending on where you live, you may have rights to request access to, correction of, deletion of, or portability of your personal information. You may also have rights to limit or object to certain processing, opt out of some targeted advertising, or appeal a decision about your request.",
          "To make a privacy request, contact us at privacy@sipsmart.ai. We may need to verify your identity before fulfilling a request.",
        ],
      },
      {
        id: "retention-and-security",
        title: "7. Retention and Security",
        paragraphs: [
          "We retain information for as long as reasonably necessary to provide the service, comply with legal obligations, resolve disputes, enforce agreements, maintain security, and operate our business.",
          "We use reasonable technical, administrative, and organizational safeguards designed to protect information. No system can be guaranteed to be completely secure.",
        ],
      },
      {
        id: "children",
        title: "8. Children",
        paragraphs: [
          "SipSmart AI is not intended for children under 13. If we learn that a child under 13 has provided personal information, we will take appropriate steps to delete it. Teens should use the service only with consent and supervision from a parent or legal guardian where required.",
        ],
      },
      {
        id: "international-transfers",
        title: "9. International Transfers",
        paragraphs: [
          "SipSmart AI may process and store information in the United States and other countries where we or our service providers operate. These countries may have privacy laws that differ from those in your location.",
        ],
      },
      {
        id: "changes-contact",
        title: "10. Changes and Contact",
        paragraphs: [
          "We may update this Privacy Notice from time to time. The updated version will be identified by a new effective date.",
          "Questions about this notice can be sent to privacy@sipsmart.ai. Add your company legal name and mailing address here before publishing the final policy.",
        ],
      },
    ],
  },
  terms: {
    icon: FileText,
    eyebrow: "Terms of Use",
    title: "SipSmart AI Terms of Use",
    date: "Last Updated: October 10, 2026",
    intro:
      "These Terms of Use describe the rules that apply when you access or use SipSmart AI, including the website, mobile app, AI-powered drink logging features, support center, and related services.",
    summary: [
      "SipSmart AI provides drink tracking and habit insights, not medical advice or impairment assessment.",
      "You are responsible for reviewing AI estimates before saving entries.",
      "Subscriptions and refunds are managed through the app store or payment platform where you purchased.",
      "Have a qualified attorney review these terms before using them as your final legal agreement.",
    ],
    sections: [
      {
        id: "agreement",
        title: "1. Agreement to These Terms",
        paragraphs: [
          "By accessing or using SipSmart AI, you agree to these Terms and our Privacy Notice. If you do not agree, do not use the service.",
          "If you use SipSmart AI on behalf of a company or other organization, you represent that you have authority to bind that organization to these Terms.",
        ],
      },
      {
        id: "eligibility",
        title: "2. Eligibility",
        paragraphs: [
          "You must be at least 13 years old to use SipSmart AI. If you are between 13 and 17, you may use the service only with consent and supervision from a parent or legal guardian, who is responsible for your use.",
        ],
      },
      {
        id: "service-description",
        title: "3. The Service",
        paragraphs: [
          "SipSmart AI lets users log drinks and related wellness items, review AI-generated estimates, set goals and reminders, view diary entries and trends, and interact with an animated brain buddy experience.",
          "Features may change over time. Some features may be experimental, unavailable in certain regions, or limited by app version, device, account status, or subscription plan.",
        ],
      },
      {
        id: "health-and-safety",
        title: "4. Health and Safety Disclaimers",
        paragraphs: [
          "SipSmart AI does not provide medical, nutritional, mental health, substance-use, or safety advice. Information in the service is provided for general tracking and informational purposes only.",
          "AI drink recognition, volume estimates, caffeine estimates, alcohol labels, supplement labels, hydration progress, streaks, and insights are approximations and may be incomplete or inaccurate. You should consult qualified professionals for medical, dietary, substance-use, or safety guidance.",
          "SipSmart AI does not determine whether you are hydrated, sober, impaired, safe to drive, or safe to perform any activity.",
        ],
      },
      {
        id: "accounts",
        title: "5. Accounts and Security",
        paragraphs: [
          "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us promptly if you believe your account has been compromised.",
        ],
      },
      {
        id: "user-content",
        title: "6. User Content",
        paragraphs: [
          "You may submit photos, diary entries, notes, preferences, goals, and other content to the service. You represent that you have the rights needed to submit that content and that your content does not violate law or the rights of others.",
          "You grant SipSmart AI a non-exclusive, worldwide, royalty-free license to host, store, reproduce, process, analyze, display, and otherwise use your content as needed to operate, secure, support, and improve the service, including AI-powered features where permitted by law and your settings.",
        ],
      },
      {
        id: "acceptable-use",
        title: "7. Acceptable Use",
        paragraphs: ["You agree not to misuse SipSmart AI or help anyone else misuse it."],
        bullets: [
          "Do not upload unlawful, harmful, infringing, explicit, deceptive, or abusive content.",
          "Do not upload photos of people or private property without any required consent.",
          "Do not attempt to reverse engineer, scrape, copy, disrupt, or gain unauthorized access to the service.",
          "Do not use SipSmart AI to make medical, legal, safety, impairment, or emergency decisions.",
          "Do not use the service to violate applicable law or third-party rights.",
        ],
      },
      {
        id: "subscriptions",
        title: "8. Subscriptions, Billing, and Refunds",
        paragraphs: [
          "Paid features, subscriptions, trials, renewals, cancellations, and refunds may be processed by third-party platforms such as the Apple App Store or Google Play Store. Their terms and policies govern payment processing, renewal timing, cancellation, and refunds.",
          "Deleting the app does not necessarily cancel a subscription. Manage or cancel subscriptions through the platform where you purchased unless SipSmart AI provides another method.",
        ],
      },
      {
        id: "third-party-services",
        title: "9. Third-Party Services",
        paragraphs: [
          "SipSmart AI may link to or integrate with third-party services. We do not control those services and are not responsible for their content, policies, or practices.",
        ],
      },
      {
        id: "intellectual-property",
        title: "10. Intellectual Property",
        paragraphs: [
          "SipSmart AI, including its software, design, branding, content, AI features, and other materials, is owned by SipSmart AI or its licensors. Except as allowed by these Terms, you may not copy, modify, sell, distribute, or create derivative works from the service.",
          "If you provide feedback or suggestions, you grant us the right to use them without restriction or compensation.",
        ],
      },
      {
        id: "termination",
        title: "11. Suspension and Termination",
        paragraphs: [
          "We may suspend or terminate access to SipSmart AI if you violate these Terms, create risk for the service or others, or where required by law. You may stop using the service at any time.",
        ],
      },
      {
        id: "disclaimers",
        title: "12. Disclaimers",
        paragraphs: [
          "SipSmart AI is provided on an AS IS and AS AVAILABLE basis. To the maximum extent permitted by law, we disclaim warranties of any kind, including warranties of accuracy, reliability, merchantability, fitness for a particular purpose, non-infringement, and uninterrupted operation.",
        ],
      },
      {
        id: "liability",
        title: "13. Limitation of Liability",
        paragraphs: [
          "To the maximum extent permitted by law, SipSmart AI and its affiliates, officers, employees, agents, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost data, or loss of goodwill.",
          "To the maximum extent permitted by law, our total liability for any claim related to the service will not exceed the greater of the amount you paid to use the service in the 12 months before the claim or USD $100.",
        ],
      },
      {
        id: "governing-law",
        title: "14. Governing Law and Disputes",
        paragraphs: [
          "These Terms are governed by the laws of the state or country identified in SipSmart AI's final company legal notice, without regard to conflict-of-law rules. Add your final governing law, venue, arbitration, and class action waiver language before publishing.",
        ],
      },
      {
        id: "changes-contact",
        title: "15. Changes and Contact",
        paragraphs: [
          "We may update these Terms from time to time. Continued use of SipSmart AI after updated Terms become effective means you accept the updated Terms.",
          "Questions about these Terms can be sent to support@sipsmart.ai. Add your company legal name and mailing address here before publishing the final terms.",
        ],
      },
    ],
  },
};

function useRoute() {
  const routeFromPath = () => {
    const path = window.location.pathname.replace(/\/+$/, "");
    if (path === "/support") return "support";
    if (path === "/privacy") return "privacy";
    if (path === "/terms") return "terms";
    return "home";
  };
  const [route, setRoute] = useState(routeFromPath);

  useEffect(() => {
    const onPopState = () => setRoute(routeFromPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextRoute, hash = "") => {
    const paths = { home: "/", support: "/support", privacy: "/privacy", terms: "/terms" };
    const path = paths[nextRoute] ?? "/";
    window.history.pushState({}, "", `${path}${hash}`);
    setRoute(nextRoute);
    requestAnimationFrame(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  return [route, navigate];
}

function App() {
  const [route, navigate] = useRoute();

  useEffect(() => {
    const titles = {
      home: "SipSmart AI | Your AI Brain Buddy",
      support: "Support | SipSmart AI",
      privacy: "Privacy Notice | SipSmart AI",
      terms: "Terms of Use | SipSmart AI",
    };
    document.title = titles[route] ?? titles.home;
  }, [route]);

  return (
    <>
      {route === "support" && <SupportPage navigate={navigate} />}
      {route === "privacy" && <LegalPage doc={legalDocs.privacy} navigate={navigate} />}
      {route === "terms" && <LegalPage doc={legalDocs.terms} navigate={navigate} />}
      {route === "home" && <LandingPage navigate={navigate} />}
    </>
  );
}

function LandingPage({ navigate }) {
  return (
    <div className="site-shell">
      <header className="wrap nav">
        <button className="logo link-button" type="button" onClick={() => navigate("home")}>
          <span className="logo-icon" aria-hidden="true">
            🧠
          </span>
          SipSmart AI
        </button>
        <nav className="navlinks" aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#brains">Brains</a>
          <a href="#insights">Insights</a>
          <button className="nav-link-button" type="button" onClick={() => navigate("support")}>
            Support
          </button>
          <a className="btn" href="#download">
            Get the app <ExternalLink size={16} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="wrap hero">
          <div>
            <span className="eyebrow">Meet your AI brain buddy</span>
            <h1>
              Every sip.
              <br />
              <span>One smart brain.</span>
            </h1>
            <p className="lead">
              Track what you drink, understand your habits, and watch your brain change. Just snap
              a photo and let SipSmart AI handle the logging.
            </p>
            <div className="actions">
              <a className="btn" href="#download">
                Get SipSmart AI <ExternalLink size={16} aria-hidden="true" />
              </a>
              <a className="btn secondary" href="#how">
                See how it works <ChevronDown size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="note">Snap it. Log it. Watch your brain change.</div>
          </div>

          <div className="hero-art" aria-label="Illustration of the SipSmart AI brain buddy">
            <div className="brain-stage">
              <div className="brain" role="img" aria-label="Smiling brain">
                🧠
              </div>
              <div className="pulse pulse-one" />
              <div className="pulse pulse-two" />
            </div>
            <div className="mini-card card-one">
              <LineChart size={18} aria-hidden="true" />
              <span>
                Daily progress
                <small>Keep your streak going</small>
              </span>
            </div>
            <div className="mini-card card-two">
              <Sparkles size={18} aria-hidden="true" />
              <span>
                One photo
                <small>Fast, simple logging</small>
              </span>
            </div>
          </div>
        </section>

        <section id="how" className="band white-band">
          <div className="wrap center">
            <div className="kicker">One photo, your whole day</div>
            <h2 className="section-title">Tracking should be effortless.</h2>
            <p className="sub">
              No complicated forms. No endless tapping. A few simple steps help you stay aware of
              what you consume.
            </p>
            <div className="steps">
              {steps.map(({ icon: Icon, title, text }) => (
                <article className="step" key={title}>
                  <Icon className="step-icon" size={30} aria-hidden="true" />
                  <strong>{title}</strong>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="brains" className="band">
          <div className="wrap center">
            <div className="kicker">Meet your three brains</div>
            <h2 className="section-title">One brain buddy. Three personalities.</h2>
            <p className="sub">
              Your most recently logged drink determines which brain appears on your home screen.
            </p>
            <div className="modes">
              {modes.map((mode) => (
                <article className={`mode ${mode.className}`} key={mode.title}>
                  <div className="emoji" aria-hidden="true">
                    {mode.emoji}
                  </div>
                  <div>
                    <h3>{mode.title}</h3>
                    <p>{mode.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band white-band">
          <div className="wrap split">
            <div>
              <div className="kicker">More than just water</div>
              <h2 className="section-title">Whatever you're sipping, keep track of it.</h2>
              <p className="body-copy">
                From your morning coffee to a drink with friends, SipSmart AI helps you organize
                what you consume in one place.
              </p>
              <div className="chips">
                {drinkTags.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <PhoneMock />
          </div>
        </section>

        <section id="insights" className="band">
          <div className="wrap center">
            <div className="kicker">Your habits, your insights</div>
            <h2 className="section-title">See the bigger picture.</h2>
            <p className="sub">
              Turn everyday logging into a clearer view of your routines, progress, and patterns.
            </p>
            <div className="insights">
              {insights.map(([title, text]) => (
                <article className="insight" key={title}>
                  <b>{title}</b>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="wrap reminder">
            <div>
              <div className="kicker">Reminders that fit your life</div>
              <h2 className="section-title">A little nudge goes a long way.</h2>
              <p>
                Set a daily fluid goal, customize reminders around your routine, and keep your
                progress moving without turning tracking into a chore.
              </p>
            </div>
            <div className="reminder-icon" aria-hidden="true">
              <Bell size={52} />
              <span>💧</span>
            </div>
          </div>
        </section>

        <section id="download" className="wrap">
          <div className="cta">
            <h2>
              Your brain has a story.
              <br />
              Start tracking it.
            </h2>
            <p>
              Morning coffee. Workouts. Busy days. Nights out. Meet the brain buddy that keeps up
              with you.
            </p>
            <a className="btn" href="mailto:hello@sipsmart.ai?subject=SipSmart%20AI%20App%20Access">
              Get SipSmart AI <Mail size={16} aria-hidden="true" />
            </a>
            <div className="note">Replace this button with your App Store link when ready.</div>
          </div>
        </section>
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="visual">
      <div className="phone" aria-label="Example daily fluid tracking dashboard">
        <div className="phone-top">
          <span>Today</span>
          <Zap size={15} aria-hidden="true" />
        </div>
        <div className="phone-num">64 oz</div>
        <div className="phone-caption">Fluid goal · 72% complete</div>
        <div className="phone-brain" aria-hidden="true">
          🧠
        </div>
        <div className="progress" aria-hidden="true">
          <i />
        </div>
        <div className="phone-bottom">
          <span>Drink diary</span>
          <span>View insights</span>
        </div>
      </div>
    </div>
  );
}

function SupportPage({ navigate }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  const filteredSections = useMemo(
    () =>
      faqSections
        .map((section) => ({
          ...section,
          items: section.items.filter(([question, answer]) => {
            const answerText = Array.isArray(answer) ? answer.join(" ") : answer;
            return `${question} ${answerText}`.toLowerCase().includes(normalized);
          }),
        }))
        .filter((section) => section.items.length || !normalized),
    [normalized],
  );

  const resultCount = filteredSections.reduce((count, section) => count + section.items.length, 0);

  return (
    <div className="support-shell">
      <header className="support-header">
        <nav>
          <button className="support-brand link-button" type="button" onClick={() => navigate("home")}>
            SipSmart <span>AI</span>
          </button>
          <div className="support-navlinks">
            <button type="button" onClick={() => navigate("home")}>
              Home
            </button>
            <button type="button" onClick={() => navigate("privacy")}>
              Privacy
            </button>
            <button type="button" onClick={() => navigate("terms")}>
              Terms
            </button>
            <a href="#contact">Contact Support</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="support-hero">
          <div className="eyebrow">Help Center</div>
          <h1>How can we help?</h1>
          <p>Find answers about your brain buddy, drink tracking, reminders, and account.</p>
          <label className="search-box" htmlFor="support-search">
            <Search size={19} aria-hidden="true" />
            <span className="sr-only">Search help topics</span>
            <input
              id="support-search"
              type="search"
              placeholder="Search help topics..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </section>

        <div className="support-wrap">
          <aside className="sidebar">
            <h2>Topics</h2>
            <nav aria-label="Support topics">
              {faqSections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  {section.title}
                </a>
              ))}
              <a href="#contact">Contact Support</a>
            </nav>
          </aside>

          <div className="topics">
            {filteredSections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.items.map(([question, answer, url]) => (
                  <details className="faq" key={question}>
                    <summary>{question}</summary>
                    <div className="answer">
                      {Array.isArray(answer) ? (
                        <ul>
                          {answer.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>
                          {answer}{" "}
                          {url ? (
                            <a href={url} target="_blank" rel="noreferrer">
                              Open Apple support
                            </a>
                          ) : null}
                        </p>
                      )}
                    </div>
                  </details>
                ))}
              </section>
            ))}

            {normalized && resultCount === 0 ? (
              <p className="empty" role="status">
                No matching help topics. Try another search or contact support below.
              </p>
            ) : null}

            <section id="contact" className="contact">
              <h2>Still need help?</h2>
              <p>
                Questions, feedback, or technical trouble? Include your device model, iOS version,
                app version, and a brief description of the issue. Please don't send passwords.
              </p>
              <p className="note">
                <strong>Before publishing:</strong> Replace the support email placeholder below with
                your real address.
              </p>
              <a
                className="button"
                href="mailto:support@example.com?subject=SipSmart%20AI%20Support%20Request"
              >
                Email Support
              </a>
            </section>
          </div>
        </div>
      </main>

      <Footer navigate={navigate} compact />
    </div>
  );
}

function LegalPage({ doc, navigate }) {
  const Icon = doc.icon;

  return (
    <div className="legal-shell">
      <header className="support-header">
        <nav>
          <button className="support-brand link-button" type="button" onClick={() => navigate("home")}>
            SipSmart <span>AI</span>
          </button>
          <div className="support-navlinks">
            <button type="button" onClick={() => navigate("home")}>
              Home
            </button>
            <button type="button" onClick={() => navigate("support")}>
              Support
            </button>
            <button type="button" onClick={() => navigate("privacy")}>
              Privacy
            </button>
            <button type="button" onClick={() => navigate("terms")}>
              Terms
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="legal-hero">
          <div className="legal-icon" aria-hidden="true">
            <Icon size={30} />
          </div>
          <div className="eyebrow">{doc.eyebrow}</div>
          <h1>{doc.title}</h1>
          <p className="legal-date">{doc.date}</p>
          <p>{doc.intro}</p>
        </section>

        <div className="legal-wrap">
          <aside className="legal-toc">
            <h2>On this page</h2>
            <nav aria-label={`${doc.title} sections`}>
              {doc.sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  {section.title.replace(/^\d+\.\s*/, "")}
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal-content">
            <div className="legal-summary">
              <h2>Quick Summary</h2>
              <ul>
                {doc.summary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {doc.sections.map((section) => (
              <section className="legal-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </main>

      <Footer navigate={navigate} compact />
    </div>
  );
}

function Footer({ navigate, compact = false }) {
  return (
    <footer className={compact ? "footer compact" : "footer wrap"}>
      <div className="footer-row">
        <div>© {year} SipSmart AI</div>
        <div className="footer-links">
          <button type="button" onClick={() => navigate("home")}>
            Home
          </button>
          <button type="button" onClick={() => navigate("privacy")}>
            Privacy
          </button>
          <button type="button" onClick={() => navigate("terms")}>
            Terms
          </button>
          <button type="button" onClick={() => navigate("support")}>
            Support
          </button>
          <a href="mailto:hello@sipsmart.ai">Contact</a>
        </div>
      </div>
      <p className="disclaimer">
        AI identification and quantity estimates may be inaccurate. Review entries before saving.
        SipSmart AI is a tracking tool, not a medical device, and does not measure impairment or
        actual hydration status. Replace placeholder contact links, legal links, and App Store link
        before publishing.
      </p>
    </footer>
  );
}

export default App;
