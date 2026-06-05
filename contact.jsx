/* ===== Contact — data + view ===== */
/* Loaded as a babel script BEFORE the main app; exposes window.ContactSection */

const CONTACTS = [
  {
    kind: "email",
    slot: "@",
    label: "Email",
    value: "ilham.wijaya@ilwij.com",
    href: "mailto:ilham.wijaya@ilwij.com",
    copy: "ilham.wijaya@ilwij.com",
  },
  {
    kind: "link",
    slot: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/ilham-wijaya",
    href: "https://www.linkedin.com/in/ilham-wijaya/",
  },
  {
    kind: "link",
    slot: "gh",
    label: "GitHub",
    value: "github.com/ilwij",
    href: "https://github.com/ilwij",
  },
];

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2"></rect>
      <path d="M5 15V5a2 2 0 0 1 2-2h10"></path>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
function OpenIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7"></path><path d="M8 7h9v9"></path>
    </svg>
  );
}

function ContactRow({ c }) {
  const [copied, setCopied] = React.useState(false);

  function handleCopy(e) {
    e.preventDefault();
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(c.copy).then(done).catch(done);
    } else {
      done();
    }
  }

  if (c.kind === "email") {
    return (
      <a className="ct-row" href={c.href}>
        <span className="ct-slot">{c.slot}</span>
        <span className="ct-main">
          <span className="ct-label">{c.label}</span>
          <span className="ct-value">{c.value}</span>
        </span>
        <button
          type="button"
          className={"ct-action" + (copied ? " copied" : "")}
          onClick={handleCopy}
          aria-label="Copy email address"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "copied" : "copy"}
        </button>
      </a>
    );
  }

  return (
    <a className="ct-row" href={c.href} target="_blank" rel="noopener noreferrer">
      <span className="ct-slot">{c.slot}</span>
      <span className="ct-main">
        <span className="ct-label">{c.label}</span>
        <span className="ct-value">{c.value}</span>
      </span>
      <span className="ct-action">open <OpenIcon /></span>
    </a>
  );
}

function ContactSection() {
  return (
    <React.Fragment>
      <section id="contact" className="section contact">
        <div className="section-inner">
          <div className="shead">
            <span className="shead-no">04</span>
            <span className="shead-tag">Contact</span>
            <span className="shead-rule"></span>
          </div>

          <div className="contact-grid">
            <div>
              <div className="ct-prompt">
                <span className="p">$</span> <span className="c">cat contact.txt</span>
              </div>
              <h2 className="ct-head">
                Let's build something<br />that <span className="g">actually runs.</span>
              </h2>
              <p className="ct-sub">
                A role, a project, or just infrastructure talk — pick a channel below
                and I'll get back to you.
              </p>
            </div>

            <div className="ct-links">
              {CONTACTS.map((c, i) => <ContactRow key={i} c={c} />)}
            </div>
          </div>
        </div>
      </section>

      <footer className="site-foot">
        <span className="fl">© 2026 <b>Ilham Wijaya</b> — designed &amp; built from scratch</span>
        <span className="fr">
          <span className="dot"></span>Space Grotesk · IBM Plex Mono · served on <b>nginx</b>
        </span>
      </footer>
    </React.Fragment>
  );
}

window.ContactSection = ContactSection;
