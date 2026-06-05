/* ===== Skills & Certifications — data + view ===== */
/* Loaded as a babel script BEFORE the main app; exposes window.SkillsSection */

const SK_GROUPS = [
  {
    cat: "Network",
    skills: [
      { n: "VLAN & Trunking", lvl: 3, lab: true, slug: "vlan-trunking" },
      { n: "NAT", lvl: 3, lab: true, slug: "pa-security-policies" },
      { n: "DHCP", lvl: 3, lab: true, slug: "dhcp" },
      { n: "LACP", lvl: 2, lab: true, slug: "vlan-trunking" },
      { n: "OSPF", lvl: 2, lab: true, slug: "ospf" },
      { n: "BGP", lvl: 2, lab: true, slug: "bgp" },
      { n: "BGP over IPSec", lvl: 2, lab: true, slug: "bgp-over-ipsec" },
      { n: "IPSec Site-to-Site VPN", lvl: 2, lab: true, slug: "ipsec-hq-branch" },
      { n: "SD-WAN (failover & load balancing)", lvl: 2, lab: false },
      { n: "Wireless LAN Management (WLC / Master AP)", lvl: 2, lab: false },
      { n: "HA / Stacking", lvl: 2, lab: false },
    ],
    tools: [
      { sub: null, items: [
        { name: "Cisco IOS" }, { name: "MikroTik" }, { name: "Aruba" },
        { name: "Ruijie" }, { name: "H3C" }, { name: "Juniper" }, { name: "Ruckus" },
      ]},
    ],
  },
  {
    cat: "Network Security",
    skills: [
      { n: "Firewall Policy", lvl: 3, lab: true, slug: "pa-security-policies" },
      { n: "NAT", lvl: 3, lab: true, slug: "pa-security-policies" },
      { n: "Zone-Based Firewall", lvl: 2, lab: true, slug: "forti-security-policies" },
      { n: "Policy Optimization", lvl: 2, lab: true, slug: "pa-security-profiles" },
      { n: "IPSec Site-to-Site VPN", lvl: 2, lab: true, slug: "ipsec-hq-branch" },
      { n: "Remote Access VPN", lvl: 2, lab: true, slug: "globalprotect" },
      { n: "Security Profiles (IPS, App-ID, URL Filtering)", lvl: 2, lab: true, slug: "pa-security-profiles" },
      { n: "RADIUS / AAA", lvl: 2, lab: true, slug: "radius-aaa" },
      { n: "High Availability", lvl: 2, lab: false },
      { n: "FSSO", lvl: 2, lab: false },
      { n: "Virtual System / Domain", lvl: 2, lab: false },
    ],
    tools: [
      { sub: null, items: [
        { name: "Palo Alto NGFW" }, { name: "Fortinet FortiGate" },
        { name: "FortiWeb (WAF)" }, { name: "OPNsense" }, { name: "H3C" },
      ]},
    ],
  },
  {
    cat: "Server & Virtualization",
    skills: [
      { n: "Virtualization", lvl: 2, lab: true, slug: "proxmox" },
      { n: "Linux Administration", lvl: 2, lab: true, slug: "k3s" },
      { n: "Kubernetes / k3s", lvl: 2, lab: true, slug: "k3s" },
      { n: "Windows Server", lvl: 2, lab: true, slug: "windows-server" },
      { n: "Active Directory", lvl: 2, lab: true, slug: "windows-server" },
      { n: "DNS & NTP", lvl: 2, lab: true, slug: "ntp" },
      { n: "Docker", lvl: 1, lab: true, slug: "docker" },
      { n: "Group Policy (GPO)", lvl: 1, lab: false },
      { n: "Storage Management", lvl: 1, lab: false },
      { n: "Backup & Recovery", lvl: 1, lab: false },
      { n: "File Server", lvl: 1, lab: false },
    ],
    tools: [
      { sub: "Hypervisor", items: [
        { name: "VMware ESXi" }, { name: "Sangfor HCI" },
        { name: "Proxmox VE", lab: true }, { name: "KVM" },
      ]},
      { sub: "OS", items: [
        { name: "Windows Server" }, { name: "Ubuntu" },
        { name: "Debian" }, { name: "CentOS" },
      ]},
    ],
  },
  {
    cat: "Cloud",
    skills: [
      { n: "Virtual Network (VNet)", lvl: 1, lab: true, slug: "azure-hybrid" },
      { n: "VPN Gateway (Site-to-Site)", lvl: 1, lab: true, slug: "azure-ipsec" },
      { n: "Virtual Machines", lvl: 1, lab: true, slug: "azure-hybrid" },
      { n: "Hybrid Cloud Connectivity", lvl: 1, lab: true, slug: "azure-hybrid" },
      { n: "NSG (Network Security Group)", lvl: 1, lab: true, slug: "azure-hybrid" },
    ],
    tools: [
      { sub: null, items: [
        { name: "Microsoft Azure", lab: true }, { name: "AWS" },
      ]},
    ],
  },
  {
    cat: "Monitoring",
    skills: [
      { n: "NMS Deployment & Management", lvl: 2, lab: true, slug: "prometheus-grafana" },
      { n: "Network Monitoring (SNMP, Traps)", lvl: 2, lab: true, slug: "snmp" },
      { n: "Dashboard & Visualization", lvl: 2, lab: true, slug: "grafana-dashboards" },
      { n: "Alerting", lvl: 2, lab: false },
      { n: "Netflow", lvl: 2, lab: false },
    ],
    tools: [
      { sub: null, items: [
        { name: "Grafana", lab: true }, { name: "Prometheus", lab: true },
        { name: "SolarWinds" }, { name: "PRTG" },
      ]},
    ],
  },
  {
    cat: "Programming",
    skills: [
      { n: "Backend Development", lvl: 1, lab: true },
      { n: "Frontend Development", lvl: 1, lab: true },
      { n: "Database", lvl: 1, lab: true },
      { n: "REST API", lvl: 1, lab: false },
      { n: "Version Control (Git)", lvl: 1, lab: false },
    ],
    tools: [
      { sub: "Languages", items: [
        { name: "Python" }, { name: "JavaScript" }, { name: "PHP" },
        { name: "HTML" }, { name: "CSS" },
      ]},
      { sub: "Frameworks", items: [
        { name: "Flask" }, { name: "Express.js" }, { name: "Bootstrap" },
      ]},
      { sub: "Database", items: [{ name: "MongoDB" }, { name: "MySQL" }] },
      { sub: "Tools", items: [{ name: "Git" }] },
    ],
  },
];

const CERTS = [
  { code: "PCNSE", name: "Certified Network Security Engineer", issuer: "Palo Alto Networks", brand: "#FA582D", file: "assets/certs/PCNSE" },
  { code: "CC",    name: "Certified in Cybersecurity", issuer: "ISC2", brand: "#00A9A5", file: "assets/certs/CC" },
  { code: "FCA",   name: "Fortinet Certified Associate in Cybersecurity", issuer: "Fortinet", brand: "#EE3124", file: "assets/certs/FCA" },
  { code: "FCF",   name: "Fortinet Certified Fundamentals in Cybersecurity", issuer: "Fortinet", brand: "#EE3124", file: "assets/certs/FCF" },
  { code: "MTCNA", name: "MikroTik Certified Network Associate", issuer: "MikroTik", brand: "#E2231A", file: "assets/certs/MTCNA" },
  { code: "BNSP",  name: "Computer Network Management", issuer: "BNSP · National Cert.", brand: "#D4A017", file: "assets/certs/BNSP" },
];

function Lvl({ n }) {
  return (
    <span className="lvl" title={["Familiar", "Experienced", "Proficient"][n - 1]}>
      {[1, 2, 3].map(i => <i key={i} className={i <= n ? "on" : ""}></i>)}
    </span>
  );
}

function SkillCard({ g }) {
  return (
    <div className="sk-card">
      <div className="sk-card-head">
        <span className="sk-cat">{g.cat}</span>
        <span className="sk-count">{g.skills.length} skills</span>
      </div>
      <div className="sk-list">
        {g.skills.map((s, i) => (
          <div className="sk-row" key={i}>
            {s.slug
              ? <a className="sk-name sk-name--linked" href={"article.html?a=" + s.slug} target="_blank" rel="noopener" title={"Buka write-up: " + s.n}>{s.n}</a>
              : <span className="sk-name">{s.n}</span>
            }
            {s.lab && <span className="lab-chip" title="Lab-backed — write-up available">lab</span>}
            <Lvl n={s.lvl} />
          </div>
        ))}
      </div>
      <div className="sk-tools">
        <span className="sk-tools-label">Products / Tools</span>
        {g.tools.map((grp, gi) => (
          <div className="sk-tool-group" key={gi}>
            {grp.sub && <span className="sk-tool-sub">{grp.sub}</span>}
            <div className="tool-chips">
              {grp.items.map((it, ii) => (
                <span key={ii} className={it.lab ? "lab" : ""}>{it.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertCard({ c, onOpen }) {
  return (
    <button type="button" className="cert-card" style={{ "--brand": c.brand }} onClick={() => onOpen(c)}>
      <div className="cert-img">
        <img src={c.file + ".png"} alt={c.code + " — " + c.name} loading="lazy" />
        <span className="cert-brandbar" style={{ background: c.brand }}></span>
        <span className="cert-zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
        </span>
      </div>
      <div className="cert-body">
        <span className="cert-code">{c.code}</span>
        <span className="cert-name">{c.name}</span>
        <span className="cert-issuer">{c.issuer}</span>
      </div>
    </button>
  );
}

function CertLightbox({ cert, onClose }) {
  React.useEffect(() => {
    if (!cert) return;
    function onKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [cert, onClose]);

  if (!cert) return null;
  return (
    <div className="lb-overlay" onClick={onClose}>
      <button type="button" className="lb-close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line></svg>
        <span>Close</span>
      </button>
      <div className="lb-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="lb-figure">
          <img src={cert.file + ".png"} alt={cert.code + " — " + cert.name} />
        </div>
        <div className="lb-caption">
          <span className="lb-code" style={{ color: cert.brand }}>{cert.code}</span>
          <span className="lb-name">{cert.name}</span>
          <span className="lb-issuer">{cert.issuer}</span>
        </div>
      </div>
    </div>
  );
}

function SkillsSection() {
  const [active, setActive] = React.useState(null);
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <div className="shead">
          <span className="shead-no">02</span>
          <span className="shead-tag">Skills &amp; Certifications</span>
          <span className="shead-rule"></span>
        </div>

        <div className="skills-legend">
          <span className="legend-item"><Lvl n={3} /> Proficient</span>
          <span className="legend-item"><Lvl n={2} /> Experienced</span>
          <span className="legend-item"><Lvl n={1} /> Familiar</span>
          <span className="legend-sep"></span>
          <span className="legend-item"><span className="lab-chip">lab</span> lab-backed — proven in the lab, write-up linked</span>
        </div>

        <div className="sk-grid">
          {SK_GROUPS.map((g, i) => <SkillCard key={i} g={g} />)}
        </div>

        <div className="subhead">
          <h3>Certifications</h3>
          <span className="rule"></span>
          <span className="cnt">{CERTS.length} active</span>
        </div>

        <div className="cert-grid">
          {CERTS.map((c, i) => <CertCard key={i} c={c} onOpen={setActive} />)}
        </div>
      </div>
      <CertLightbox cert={active} onClose={() => setActive(null)} />
    </section>
  );
}

window.SkillsSection = SkillsSection;
