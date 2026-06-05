# Web Portfolio Blueprint — Ilham Wijaya
> Last Updated: Session 3
> Status: ✅ Blueprint Complete — Moving to Execution

---

## Overview

Web portfolio yang berfungsi sebagai **interactive CV** untuk job hunting, sekaligus membuktikan skill IT Infrastructure secara nyata — bukan hanya tulisan di CV.

**Tech Stack (Planned):**
- Frontend: React + Tailwind CSS
- Diagram: React Flow
- Web Server: Nginx (on-prem Proxmox VM — vm-web-lab Azure)
- SSL: Let's Encrypt / Certbot

---

## Struktur Pages

| # | Page / Section | Tipe | Status |
|---|---|---|---|
| 1 | Hero / Landing | Section | ✅ Locked |
| 2 | About Me | Section | ✅ Locked |
| 3 | Skills & Certifications | Section | ✅ Locked |
| 4 | Experience & Education | Section | ✅ Locked |
| 5 | Lab Showcase + Phase Roadmap | Full Page | ✅ Locked |
| 6 | Contact | Section | ✅ Locked |
| - | Blog / Write-ups | - | ❌ Skip (bisa ditambah nanti) |

---

## ✅ Page 1 — Hero / Landing (LOCKED)

```
1. Nama          → Ilham Wijaya
2. Title         → IT Infrastructure Engineer
3. Lokasi        → Bekasi, Indonesia
4. Tagline       → "My CV doesn't just say I know it — it shows you it's running."
5. CTA Buttons   → [ Explore My Lab ]  [ Contact Me ]
6. Quick Stats   → 5+ Years | 6 Certs | HQ + Branch + Azure
```

**Keputusan:**
- Tidak ada Download CV (alasan privasi — no HP & alamat)
- Tidak ada Live Lab Status Badge (lab on-prem, Azure free trial 30 hari)
- Hero clean & minimalis — tidak ada profile singkat, langsung tagline

---

## ✅ Page 2 — About Me (LOCKED)

**Tone:** Professional tapi approachable/casual

**Final Text (English):**

> I'm an IT Infrastructure professional with over 5 years of experience spanning network engineering, security, server virtualization, and end-to-end project delivery. I started my career getting hands-on with network and server deployments, and over time grew into roles that involved solution design, presales, and managing projects from the first client conversation all the way through to handover.
>
> What sets me apart is that I sit at the intersection of technical depth and business awareness. I'm comfortable going deep into firewall policies and routing protocols, and equally comfortable presenting a solution to a client or putting together a pricing proposal. That combination is something I've built gradually — and it's something I genuinely enjoy.
>
> Outside of work, I'm currently building a full enterprise lab environment from scratch — dual-site network with Palo Alto and Fortinet firewalls, a Kubernetes cluster, hybrid cloud connectivity to Azure, and a full monitoring stack. Not because I have to, but because I want to keep pushing what I know and prove it beyond just a list of bullet points on a CV.

**Keputusan:**
- Tidak ada "Why End User" section — tetap terbuka ke semua peluang termasuk vendor besar & principal
- Title: "IT Infrastructure professional" (bukan Engineer — lebih open ke managerial)
- Panjang: 3 paragraf
- Angle utama: background vendor → kekuatan, bukan kelemahan
- Tidak ada closing "looking for a role" — timeless, tetap relevan setelah dapat kerja

---

## ✅ Page 3 — Skills & Certifications (LOCKED)

### Pendekatan
- Kategorisasi: **by Tool/Technology**
- Setiap skill punya **level indicator**: `Proficient` / `Experienced` / `Familiar`
- Dua jenis skill:
  - **Lab-backed** → ada artikel + bukti di Lab section, ada link
  - **Experience-backed** → pernah dipakai di kerjaan nyata, tanpa link
- Setiap skill punya **sub-section** yang link ke artikel lab yang relevan
- Skills dan Products/Tools **dipisah** dalam tiap kategori

### Kategori Skills
```
1. Network                        ✅ Locked
2. Network Security               ✅ Locked
3. Server & Virtualization        ✅ Locked
4. Cloud                          ✅ Locked
5. Monitoring                     ✅ Locked
6. Business & Project Management  ✅ Locked
7. Programming                    ✅ Locked
8. Automation                     ⏳ Skip — tunggu Phase 2
```

---

### ✅ Network (LOCKED)

| Skill | Level | Type |
|---|---|---|
| VLAN & Trunking | Proficient | lab-backed |
| NAT | Proficient | lab-backed |
| DHCP | Proficient | lab-backed |
| LACP | Experienced | lab-backed |
| OSPF | Experienced | lab-backed |
| BGP | Experienced | lab-backed |
| BGP over IPSec | Experienced | lab-backed |
| IPSec Site-to-Site VPN | Experienced | lab-backed |
| SD-WAN (failover & load balancing) | Experienced | experience-backed |
| Wireless LAN Management (WLC / Master AP mode) | Experienced | experience-backed |
| HA / Stacking | Experienced | experience-backed |

**Products/Tools:**
- Cisco (IOS — L2/L3 Switch, Router)
- MikroTik
- Aruba
- Ruijie
- H3C
- Juniper
- Ruckus

---

### ✅ Network Security (LOCKED)

| Skill | Level | Type |
|---|---|---|
| Firewall Policy | Proficient | lab-backed |
| NAT | Proficient | lab-backed |
| Zone-Based Firewall | Experienced | lab-backed |
| Policy Optimization | Experienced | lab-backed |
| IPSec Site-to-Site VPN | Experienced | lab-backed |
| Remote Access VPN | Experienced | lab-backed |
| Security Profiles (IPS, App-ID, URL Filtering) | Experienced | lab-backed |
| RADIUS / AAA | Experienced | lab-backed |
| High Availability | Experienced | experience-backed |
| FSSO | Experienced | experience-backed |
| Virtual System/Domain | Experienced | experience-backed |

**Products/Tools:**
- Palo Alto NGFW
- Fortinet FortiGate
- FortiWeb (WAF)
- OPNsense
- H3C

---

### ✅ Server & Virtualization (LOCKED)

| Skill | Level | Type |
|---|---|---|
| Virtualization | Experienced | lab-backed |
| Linux Administration | Experienced | lab-backed |
| Kubernetes / k3s | Experienced | lab-backed |
| Windows Server | Experienced | lab-backed |
| Active Directory | Experienced | lab-backed |
| DNS & NTP | Experienced | lab-backed |
| Docker | Familiar | lab-backed |
| Group Policy (GPO) | Familiar | experience-backed |
| Storage Management | Familiar | experience-backed |
| Backup & Recovery | Familiar | experience-backed |
| File Server | Familiar | experience-backed |

**Products/Tools:**

*Hypervisor:*
- VMware ESXi (Experienced)
- Sangfor HCI (Experienced)
- Proxmox VE (Experienced — lab-backed)
- KVM (Experienced)

*OS:*
- Windows Server
- Linux (Ubuntu, Debian, CentOS)

---

### ✅ Cloud (LOCKED)

| Skill | Level | Type |
|---|---|---|
| Virtual Network (VNet) | Familiar | lab-backed |
| VPN Gateway (Site-to-Site) | Familiar | lab-backed |
| Virtual Machines | Familiar | lab-backed |
| Hybrid Cloud Connectivity | Familiar | lab-backed |
| NSG (Network Security Group) | Familiar | lab-backed |

**Products/Tools:**
- Microsoft Azure (lab-backed)
- AWS (experience-backed)

---

### ✅ Monitoring (LOCKED)

| Skill | Level | Type |
|---|---|---|
| NMS Deployment & Management | Experienced | lab-backed |
| Network Monitoring (SNMP, Traps) | Experienced | lab-backed |
| Dashboard & Visualization | Experienced | lab-backed |
| Alerting | Experienced | experience-backed |
| Netflow | Experienced | experience-backed |

**Products/Tools:**
- Grafana (Experienced — lab-backed)
- Prometheus (Experienced — lab-backed)
- SolarWinds (Experienced — experience-backed)
- PRTG (Experienced — experience-backed)

---

### ✅ Business & Project Management (LOCKED)

| Skill | Level | Type |
|---|---|---|
| Project Management | Experienced | experience-backed |
| Presales & Solution Design | Experienced | experience-backed |
| Client Relationship Management | Experienced | experience-backed |
| Technical Documentation | Experienced | experience-backed |
| Tender Submission (to Customer) | Experienced | experience-backed |
| Tender Opening (to Partner) | Experienced | experience-backed |
| Vendor Management | Experienced | experience-backed |
| BOQ Creation | Experienced | experience-backed |
| HPS / Cost Owner | Experienced | experience-backed |
| Cost & Margin Analysis | Experienced | experience-backed |
| SOC Project Implementation | Experienced | experience-backed |
| (Wazuh SIEM, Agent, Syslog, Honeypot, Alerting) | | |

**Products/Tools:**
- Microsoft To Do
- Trello
- Draw.io
- Wazuh (project context)

---

### ✅ Programming (LOCKED)

| Skill | Level | Type |
|---|---|---|
| Backend Development | Familiar | lab-backed* |
| Frontend Development | Familiar | lab-backed* |
| Database | Familiar | lab-backed* |
| REST API | Familiar | experience-backed |
| Version Control (Git) | Familiar | experience-backed |

*bukti = web portfolio ini sendiri 😄

**Products/Tools:**

*Languages:*
- Python, JavaScript, PHP, HTML, CSS

*Frameworks:*
- Flask, Express.js, Bootstrap

*Database:*
- MongoDB, MySQL

*Tools:*
- Git

---

### ⏳ Automation — Skip, tunggu Phase 2

---

### Certifications (Struktur)
- Section **tersendiri**, pisah dari Skills
- Visual: card per cert — gambar certificate + nama + issuer + tombol "Verify"
- Posisi: bersebelahan dengan Skills section secara visual

**List Certifications:**
- Palo Alto Networks Certified Network Security Engineer (PCNSE) — Palo Alto Networks
- Certified in Cybersecurity (CC) — ISC2
- Fortinet Certified Associate in Cybersecurity (FCA) — Fortinet
- Fortinet Certified Fundamentals in Cybersecurity (FCF) — Fortinet
- MikroTik Certified Network Associate (MTCNA) — MikroTik
- Certificate of Competence — Computer Network Management — BNSP

---

## ✅ Page 4 — Experience & Education (LOCKED)

### Experience — Timeline Vertical

**1. PT Sinergi Mitra Lestari Indonesia**
- Role: IT Infrastructure Lead (Architect IT)
- Periode: July 2024 - Present
- Handle IT infrastructure projects for enterprise clients within MIND ID Group, full project lifecycle ownership
- Lead technical discussions and solution presentations with clients and partners
- Put together pricing proposals — COGS, margins, final quotation
- Prepare tender documentation (ToR, Owner's Estimate, Request Forms, Budget Verification)
- Set up kick-off meetings, align timelines, act as PM or technical SPOC through to handover
- Supervise engineers, decide in-house vs partner based on complexity & capacity
- Notable: SOC (Wazuh SIEM), device rental program, network rollouts, software licensing

**2. PT Datacomm Diangraha**
- Role 1: L2 IT Security Engineer (January 2024 - June 2024)
- Role 2: IT Security Engineer / L1 (July 2023 - January 2024)
- Promoted L1 → L2 within 6 months
- Handled L1 escalations for security incidents & complex config issues (Palo Alto & Fortinet)
- Configured Palo Alto NGFW — security policies, NAT, routing, security profiles, IPSec VPN
- Regular client contact for active projects & follow-on opportunities
- Day-to-day firewall admin across Fortinet & Palo Alto for multiple client environments
- Daily security incident analysis + structured activity reports for clients
- Monitored middleware security applications

**3. PT Timah Tbk**
- Role: IT Infrastructure Operational Support
- Periode: August 2021 - July 2023
- Supported day-to-day IT ops — network, server & security devices across enterprise environment
- Independently deployed SolarWinds, ManageEngine, OpenOffice from start to finish
- Produced weekly & monthly device performance reports for IT management
- Maintained IT asset inventory in ManageEngine
- Worked alongside third-party vendors on network projects & application rollouts

**4. PT Altros Teknologi**
- Role: Network & Infrastructure Engineer
- Periode: November 2020 - March 2021
- Implemented & maintained network and server infrastructure for enterprise clients
- Configured Cisco, MikroTik, Aruba & SD-WAN (failover & load balancing)
- Set up VMware ESXi, Sangfor HCI, Windows Server, Linux environments
- Deployed SolarWinds monitoring for clients

---

### Education — Section Tersendiri

**Universitas Gunadarma**
- Bachelor of Information Systems
- 2016 - 2020 | GPA: 3.34
- Thesis: Design and Implementation of Blockchain Technology in Web-Based Attendance Applications

---

## ✅ Page 5 — Lab Showcase + Phase Roadmap (LOCKED)

### Struktur Halaman

```
[ Lab Page ]

SECTION 1 — Overview / Big Picture
- Deskripsi singkat lab Phase 1
- Topology diagram (polished — rebuild dari Pnet)
- Pnet topology mentahan tetap ditampilkan sebagai "backend proof"

SECTION 2 — Phase Tabs
[ Phase 1 ✅ ]  [ Phase 2 🔄 ]  [ Phase 3 ⏳ ]  [ Phase 4 ⏳ ]

Klik Phase 1 → tampil konten detail
Klik Phase 2/3/4 → tampil deskripsi singkat + "Coming Soon"

SECTION 3 — Phase 1 Detail (setelah tab diklik)
- Topology diagram partial Phase 1
- Deskripsi gambaran besar Phase 1
- List artikel per kategori (bisa diklik → ke artikel)
```

### Template Artikel (Konsisten untuk semua artikel)
```
1. Overview        → Apa yang dibangun & tujuannya
2. Topology        → Partial diagram konteks artikel ini
3. Configuration   → Potongan config relevan (code block, copyable)
4. Evidence        → Screenshot bukti
5. Lessons Learned → Catatan penting / troubleshooting
```

### Keputusan Diagram
- Diagram utama: **rebuild polished** (bukan mentahan Pnet)
- Pnet topology mentahan: **tetap ditampilkan** sebagai backend proof
- Per artikel: **partial diagram** yang di-highlight bagian relevan

### Config Sensitif
- Tetap ditampilkan (lab only, not publicly accessible)

---

### 📋 List Artikel Phase 1 — 22 Artikel

#### 📌 Network (8 artikel)
| # | Judul Artikel | Type |
|---|---|---|
| 1 | VLAN Design & Trunking | lab-backed |
| 2 | OSPF Configuration | lab-backed |
| 3 | BGP Setup (eBGP HQ ↔ Branch) | lab-backed |
| 4 | IPSec Site-to-Site VPN (HQ ↔ Branch) | lab-backed |
| 5 | BGP over IPSec | lab-backed |
| 6 | IPSec Site-to-Site VPN (HQ ↔ Azure) + WireGuard CGNAT Workaround | lab-backed |
| 7 | DHCP Configuration | lab-backed |
| 8 | NTP Infrastructure | lab-backed |

#### 🔒 Network Security (5 artikel)
| # | Judul Artikel | Type |
|---|---|---|
| 9 | Palo Alto — Security Policies & Zones | lab-backed |
| 10 | Palo Alto — Security Profiles | lab-backed |
| 11 | Fortinet — Security Policies & Zones | lab-backed |
| 12 | RADIUS / AAA | lab-backed |
| 13 | GlobalProtect VPN (Remote Access) | lab-backed |

#### 🖥️ Server & Virtualization (4 artikel)
| # | Judul Artikel | Type |
|---|---|---|
| 14 | Proxmox VE Setup | lab-backed |
| 15 | K3s Kubernetes Cluster | lab-backed |
| 16 | Windows Server — AD, DNS, NPS | lab-backed |
| 17 | Docker Setup (Azure VM) | lab-backed |

#### ☁️ Cloud / Azure (2 artikel)
| # | Judul Artikel | Type |
|---|---|---|
| 18 | Azure Hybrid Cloud Setup | lab-backed |
| 19 | Azure IPSec Connection + WireGuard CGNAT Workaround | lab-backed |

#### 📊 Monitoring (3 artikel)
| # | Judul Artikel | Type |
|---|---|---|
| 20 | Prometheus & Grafana Stack | lab-backed |
| 21 | SNMP Monitoring — All Devices | lab-backed |
| 22 | Grafana Dashboards | lab-backed |

---

## ✅ Page 6 — Contact (LOCKED)

```
- Email    → ilhamwijaya279@gmail.com
- LinkedIn → https://www.linkedin.com/in/ilham-wijaya/
- GitHub   → https://github.com/ilwij
```

- Tidak ada contact form
- Clean & simpel

---

## ❌ Blog / Write-ups — SKIP
Bisa ditambahkan di masa mendatang. Tidak diprioritaskan untuk launch pertama.

---

## Next Steps

```
✅ Blueprint — Complete
✅ About Me Text — Complete
✅ Screenshot Strategy — Complete (96 screenshots, tersimpan di Google Drive)

⏳ 1. Upload screenshot per artikel (Opsi 3 — per artikel sambil draft)
⏳ 2. Rebuild topology diagram (polished version)
⏳ 3. Start coding (React + Tailwind)
⏳ 4. Draft artikel per lab topic (sambil upload screenshot)
```

**Google Drive Screenshots:**
- Link: https://drive.google.com/file/d/1fsCN_ryphFxlIJEKxdxROlIFZKv2GBSo/view?usp=sharing
- Total: 96 screenshots, 22 artikel, ZIP format
