/* ===== Experience & Education — data + view ===== */
/* Loaded as a babel script BEFORE the main app; exposes window.ExperienceSection */

const XP = [
  {
    company: "PT Sinergi Mitra Lestari Indonesia",
    period: "Jul 2024 — Present",
    current: true,
    roles: [
      { title: "IT Infrastructure Lead", sub: "Architect IT" },
    ],
    context: (
      <span>
        Own enterprise IT infrastructure projects for clients within the <b>MIND ID Group</b> — full
        lifecycle, from the first client conversation through to handover.
      </span>
    ),
    bullets: [
      <span>Lead technical discussions and solution presentations with clients and partners</span>,
      <span>Build pricing proposals end-to-end — <b>COGS, margins, final quotation</b></span>,
      <span>Prepare tender documentation: ToR, Owner's Estimate, request forms, budget verification</span>,
      <span>Run kick-off meetings, align timelines, act as PM / technical SPOC through to handover</span>,
      <span>Supervise engineers; decide in-house vs partner delivery by complexity &amp; capacity</span>,
    ],
    tags: ["SOC · Wazuh SIEM", "Device rental program", "Network rollouts", "Software licensing"],
  },
  {
    company: "PT Datacomm Diangraha",
    period: "Jul 2023 — Jun 2024",
    roles: [
      { title: "L2 IT Security Engineer", period: "Jan 2024 — Jun 2024" },
      { title: "IT Security Engineer", sub: "L1", period: "Jul 2023 — Jan 2024" },
    ],
    promo: "Promoted L1 → L2 within 6 months",
    bullets: [
      <span>Handled L1 escalations for security incidents &amp; complex config issues — <b>Palo Alto &amp; Fortinet</b></span>,
      <span>Configured Palo Alto NGFW — security policies, NAT, routing, security profiles, IPSec VPN</span>,
      <span>Day-to-day firewall administration across Fortinet &amp; Palo Alto for multiple client environments</span>,
      <span>Daily security incident analysis with structured activity reports for clients</span>,
      <span>Regular client contact for active projects &amp; follow-on opportunities</span>,
    ],
    tags: [],
  },
  {
    company: "PT Timah Tbk",
    period: "Aug 2021 — Jul 2023",
    roles: [
      { title: "IT Infrastructure Operational Support" },
    ],
    bullets: [
      <span>Supported day-to-day IT ops — network, server &amp; security devices across an enterprise environment</span>,
      <span>Independently deployed <b>SolarWinds, ManageEngine &amp; OpenOffice</b> end-to-end</span>,
      <span>Produced weekly &amp; monthly device performance reports for IT management</span>,
      <span>Maintained the IT asset inventory in ManageEngine</span>,
      <span>Worked alongside third-party vendors on network projects &amp; application rollouts</span>,
    ],
    tags: [],
  },
  {
    company: "PT Altros Teknologi",
    period: "Nov 2020 — Mar 2021",
    roles: [
      { title: "Network & Infrastructure Engineer" },
    ],
    bullets: [
      <span>Implemented &amp; maintained network and server infrastructure for enterprise clients</span>,
      <span>Configured <b>Cisco, MikroTik, Aruba</b> &amp; SD-WAN (failover &amp; load balancing)</span>,
      <span>Set up VMware ESXi, Sangfor HCI, Windows Server &amp; Linux environments</span>,
      <span>Deployed SolarWinds monitoring for clients</span>,
    ],
    tags: [],
  },
];

function XpItem({ x }) {
  return (
    <div className="xp-item">
      <span className={"xp-node" + (x.current ? " now" : "")}><i></i></span>
      <article className="xp-card">
        <div className="xp-head">
          <div>
            <h3 className="xp-company">{x.company}</h3>
            <ul className="xp-roles">
              {x.roles.map((r, i) => (
                <li className="xp-role-line" key={i}>
                  <span className="xp-role">
                    {r.title}{r.sub ? <span className="sub"> · {r.sub}</span> : null}
                  </span>
                  {r.period && <span className="xp-rperiod">{r.period}</span>}
                </li>
              ))}
            </ul>
          </div>
          <span className={"xp-period" + (x.current ? " now" : "")}>{x.period}</span>
        </div>

        {x.promo && (
          <span className="xp-promo">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            {x.promo}
          </span>
        )}

        {x.context && <p className="xp-context">{x.context}</p>}

        <ul className="xp-bullets">
          {x.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>

        {x.tags.length > 0 && (
          <div className="xp-tags">
            <span className="xp-tags-label">Notable</span>
            {x.tags.map((t, i) => <span className="chip" key={i}>{t}</span>)}
          </div>
        )}
      </article>
    </div>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <div className="shead">
          <span className="shead-no">03</span>
          <span className="shead-tag">Experience &amp; Education</span>
          <span className="shead-rule"></span>
        </div>

        <div className="xp-intro">
          <span><b>4</b> roles</span>
          <span className="dot-sep"></span>
          <span><b>5+</b> years</span>
          <span className="dot-sep"></span>
          <span>vendor &amp; enterprise · network, security &amp; infrastructure</span>
        </div>

        <div className="xp-wrap">
          {XP.map((x, i) => <XpItem key={i} x={x} />)}
        </div>

        <div className="subhead">
          <h3>Education</h3>
          <span className="rule"></span>
          <span className="cnt">B.Sc · 2016—2020</span>
        </div>

        <div className="edu-card">
          <div className="edu-mark">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"></path><path d="M6 12v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5"></path><line x1="22" y1="10" x2="22" y2="15"></line></svg>
          </div>
          <div className="edu-main">
            <h3 className="edu-school">Universitas Gunadarma</h3>
            <div className="edu-degree">Bachelor of Information Systems</div>
            <p className="edu-thesis">
              <span className="lbl">Thesis</span>
              Design and Implementation of Blockchain Technology in Web-Based Attendance Applications
            </p>
          </div>
          <div className="edu-meta">
            <span className="edu-period">2016 — 2020</span>
            <span className="edu-gpa">GPA <b>3.34</b></span>
          </div>
        </div>
      </div>
    </section>
  );
}

window.ExperienceSection = ExperienceSection;
