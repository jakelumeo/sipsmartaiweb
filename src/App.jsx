import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Camera,
  Check,
  ChevronDown,
  ExternalLink,
  LineChart,
  Mail,
  Search,
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

function useRoute() {
  const routeFromPath = () =>
    window.location.pathname.replace(/\/+$/, "") === "/support" ? "support" : "home";
  const [route, setRoute] = useState(routeFromPath);

  useEffect(() => {
    const onPopState = () => setRoute(routeFromPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextRoute, hash = "") => {
    const path = nextRoute === "support" ? "/support" : "/";
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

  return (
    <>
      {route === "support" ? (
        <SupportPage navigate={navigate} />
      ) : (
        <LandingPage navigate={navigate} />
      )}
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

function Footer({ navigate, compact = false }) {
  return (
    <footer className={compact ? "footer compact" : "footer wrap"}>
      <div className="footer-row">
        <div>© {year} SipSmart AI</div>
        <div className="footer-links">
          <button type="button" onClick={() => navigate("home")}>
            Home
          </button>
          <a href="mailto:hello@sipsmart.ai?subject=Privacy%20Policy%20Request">Privacy</a>
          <a href="mailto:hello@sipsmart.ai?subject=Terms%20of%20Service%20Request">Terms</a>
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
