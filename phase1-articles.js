/* Phase 1 article registry — shared by Lab Phase 1.html (index) and article.html (reader).
   Order here defines reading order + prev/next. Slugs map to ## Article blocks in lab-articles/phase1.md
   and to screenshots in screenshots/phase1/<slug-prefix>-NN.png */
window.PHASE1_ARTICLES = [
  // ── Network ───────────────────────────────────────────────
  { n: "01", slug: "vlan-trunking",        cat: "Network",                title: "VLAN Design & Trunking",                diff: "Intermediate", desc: "VLAN segmentation with LACP trunk port-channels across the HQ switch stack." },
  { n: "02", slug: "ospf",                 cat: "Network",                title: "OSPF Configuration",                    diff: "Intermediate", desc: "OSPF Area 0 as the HQ IGP, with the Palo Alto joining as an OSPF neighbor." },
  { n: "03", slug: "bgp",                  cat: "Network",                title: "BGP Setup (eBGP HQ ↔ Branch)",          diff: "Advanced",     desc: "eBGP between the HQ and Branch autonomous systems for inter-site routing." },
  { n: "04", slug: "ipsec-hq-branch",      cat: "Network",                title: "IPSec Site-to-Site VPN (HQ ↔ Branch)",  diff: "Advanced",     desc: "IKEv1 site-to-site tunnel linking Palo Alto HQ and FortiGate Branch." },
  { n: "05", slug: "bgp-over-ipsec",       cat: "Network",                title: "BGP over IPSec",                        diff: "Advanced",     desc: "Running BGP across the IPSec tunnel for dynamic, self-healing routes." },
  { n: "06", slug: "ipsec-azure",          cat: "Network",                title: "IPSec to Azure + WireGuard CGNAT Fix",  diff: "Expert",       desc: "IPSec to Azure VPN Gateway, with a WireGuard relay to beat CGNAT." },
  { n: "07", slug: "dhcp",                 cat: "Network",                title: "DHCP Configuration",                    diff: "Beginner",     desc: "DHCP served straight from the CoreHQ L3 switch to the HQ user VLAN." },
  { n: "08", slug: "ntp",                  cat: "Network",                title: "NTP Infrastructure",                    diff: "Beginner",     desc: "Containerised NTP on K3s acting as the lab's single time source." },
  // ── Network Security ──────────────────────────────────────
  { n: "09", slug: "pa-security-policies", cat: "Network Security",       title: "Palo Alto — Security Policies & Zones", diff: "Intermediate", desc: "Zone-based security policies on the Palo Alto NGFW." },
  { n: "10", slug: "pa-security-profiles", cat: "Network Security",       title: "Palo Alto — Security Profiles",         diff: "Intermediate", desc: "App-ID, vulnerability and URL-filtering profiles on the Palo Alto." },
  { n: "11", slug: "forti-security-policies", cat: "Network Security",    title: "Fortinet — Security Policies & Zones",  diff: "Intermediate", desc: "Interface/zone design and firewall policies on the FortiGate Branch." },
  { n: "12", slug: "radius-aaa",           cat: "Network Security",       title: "RADIUS / AAA",                          diff: "Intermediate", desc: "Centralised device login against the Windows NPS RADIUS server." },
  { n: "13", slug: "globalprotect",        cat: "Network Security",       title: "GlobalProtect VPN (Remote Access)",     diff: "Advanced",     desc: "GlobalProtect remote-access VPN terminating on the Palo Alto." },
  // ── Server & Virtualization ───────────────────────────────
  { n: "14", slug: "proxmox",              cat: "Server & Virtualization", title: "Proxmox VE Setup",                     diff: "Intermediate", desc: "Proxmox VE hypervisor and VLAN-aware bridges hosting the whole lab." },
  { n: "15", slug: "k3s",                  cat: "Server & Virtualization", title: "K3s Kubernetes Cluster",               diff: "Advanced",     desc: "Two-node K3s cluster with MetalLB load-balancing for infra services." },
  { n: "16", slug: "windows-server",       cat: "Server & Virtualization", title: "Windows Server — AD, DNS, NPS",        diff: "Intermediate", desc: "Windows Server 2022 running Active Directory, DNS and NPS." },
  { n: "17", slug: "docker",               cat: "Server & Virtualization", title: "Docker Setup (Azure VM)",              diff: "Beginner",     desc: "Docker and Nginx on the Azure VM, reachable only through the tunnel." },
  // ── Cloud / Azure ─────────────────────────────────────────
  { n: "18", slug: "azure-hybrid",         cat: "Cloud / Azure",          title: "Azure Hybrid Cloud Setup",              diff: "Intermediate", desc: "Azure VNet, NSG, NAT Gateway and VM for the cloud side of the lab." },
  { n: "19", slug: "azure-ipsec",          cat: "Cloud / Azure",          title: "Azure IPSec Connection",                diff: "Expert",       desc: "Azure VPN Gateway IPSec connection plus the WireGuard CGNAT workaround." },
  // ── Monitoring ────────────────────────────────────────────
  { n: "20", slug: "prometheus-grafana",   cat: "Monitoring",             title: "Prometheus & Grafana Stack",            diff: "Intermediate", desc: "Prometheus + Grafana monitoring stack running on Kubernetes." },
  { n: "21", slug: "snmp",                 cat: "Monitoring",             title: "SNMP Monitoring — All Devices",         diff: "Intermediate", desc: "SNMP polling of every device via the Prometheus SNMP exporter." },
  { n: "22", slug: "grafana-dashboards",   cat: "Monitoring",             title: "Grafana Dashboards",                    diff: "Beginner",     desc: "Grafana dashboards visualising device and cluster health." }
];

/* Category order + counts for the index. */
window.PHASE1_CATEGORIES = [
  { key: "Network",                 label: "Network",                short: "net" },
  { key: "Network Security",        label: "Network Security",       short: "sec" },
  { key: "Server & Virtualization", label: "Server & Virtualization", short: "srv" },
  { key: "Cloud / Azure",           label: "Cloud / Azure",          short: "cloud" },
  { key: "Monitoring",              label: "Monitoring",             short: "mon" }
];
