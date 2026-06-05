# Lab Articles — Phase 1
> Author: Ilham Wijaya
> Lab: Enterprise IT Infrastructure (Home Lab)
> Status: Draft — Ready for Web Implementation
> 
> ## Notes for Claude Design / Developer
> - Each article follows a consistent 5-section template
> - Screenshots are referenced as `[SS: filename]` — replace with actual image component
> - Config blocks use triple backtick code blocks — render with syntax highlighting + copy button
> - Partial topology diagrams are noted as `[DIAGRAM: description]` — build using React Flow
> - Articles are grouped by category matching the Skills section
> - Each article slug is noted for URL routing

---

# 📌 NETWORK

---

## Article 01 — VLAN Design & Trunking
**Slug:** `/lab/phase1/vlan-trunking`
**Category:** Network
**Difficulty:** Intermediate

### Overview
One of the foundational pieces of this lab is a proper VLAN design that mirrors what you'd find in a real enterprise environment. Rather than running everything flat on a single network, I segmented the HQ network into distinct VLANs — each serving a specific purpose — and connected them using trunk links with LACP port-channels for redundancy.

The goal was simple: simulate the kind of segmented network you'd actually manage in production, where servers, users, management, and DMZ traffic are all isolated from each other.

**[DIAGRAM: Partial topology showing CoreHQ, ServerSwitch, AccessSwitch with VLAN segments highlighted. Show LACP port-channels between switches.]**

---

### VLAN Design

| VLAN ID | Name | Subnet | Purpose |
|---|---|---|---|
| 10 | VM-Subnet | 10.10.10.0/24 | Server & VM traffic |
| 20 | Container-Subnet | 10.10.20.0/24 | Kubernetes / containers |
| 30 | HQ-User-Subnet | 10.10.30.0/24 | End-user devices, DHCP |
| 50 | DMZ | 10.10.50.0/24 | DMZ segment |
| 99 | Management | 10.10.99.0/24 | Network device management |

Branch uses a separate VLAN scheme:

| VLAN ID | Name | Subnet | Purpose |
|---|---|---|---|
| 40 | Branch-User | 10.10.40.0/24 | Branch user devices |
| 199 | Branch-Mgmt | 10.10.199.0/24 | Branch device management |

---

### Configuration

**CoreHQ — VLAN & Trunk Config:**
```
vlan 10
 name VM-Subnet
vlan 20
 name Container-Subnet
vlan 30
 name HQ-User-Subnet
vlan 50
 name DMZ
vlan 99
 name Management

! LACP Port-Channel to ServerSwitch (Po1) — VLAN 10,20,99
interface Port-channel1
 switchport trunk allowed vlan 10,20,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk

interface Ethernet0/1
 switchport trunk allowed vlan 10,20,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 1 mode active

interface Ethernet0/2
 switchport trunk allowed vlan 10,20,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 1 mode active

! LACP Port-Channel to AccessSwitch (Po2) — VLAN 30,99
interface Port-channel2
 switchport trunk allowed vlan 30,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk

interface Ethernet1/0
 switchport trunk allowed vlan 30,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 2 mode active

interface Ethernet1/1
 switchport trunk allowed vlan 30,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 2 mode active
```

**CoreHQ — SVI (Layer 3) Config:**
```
interface Vlan10
 ip address 10.10.10.1 255.255.255.0

interface Vlan20
 ip address 10.10.20.1 255.255.255.0

interface Vlan30
 ip address 10.10.30.1 255.255.255.0

interface Vlan50
 ip address 10.10.50.1 255.255.255.0

interface Vlan99
 ip address 10.10.99.1 255.255.255.0
```

---

### Evidence

**[SS: 01-vlan-trunking-01.png]**
*CoreHQ — `show vlan brief` showing all VLANs active*

**[SS: 01-vlan-trunking-02.png]**
*CoreHQ — `show interfaces trunk` showing Po1 and Po2 trunk links*

**[SS: 01-vlan-trunking-03.png]**
*CoreHQ — `show etherchannel summary` showing both LACP port-channels in SU state*

**[SS: 01-vlan-trunking-04.png]**
*ServerSwitch — `show vlan brief` confirming VLAN propagation*

**[SS: 01-vlan-trunking-05.png]**
*AccessSwitch — `show interfaces trunk` confirming trunk on Po1*

---

### Lessons Learned
- Native VLAN on all trunks is set to VLAN 99 (Management) — this keeps untagged traffic on a dedicated management segment rather than the default VLAN 1, which is a common security best practice.
- LACP was used instead of static EtherChannel to allow for dynamic negotiation and easier troubleshooting — if one side goes down, the channel degrades gracefully rather than going fully dark.
- The separation between ServerSwitch (VLAN 10/20) and AccessSwitch (VLAN 30) reflects how you'd physically separate server-side and user-side traffic in a real datacenter environment.

---
---

## Article 02 — OSPF Configuration
**Slug:** `/lab/phase1/ospf`
**Category:** Network
**Difficulty:** Intermediate

### Overview
With VLANs and Layer 3 SVIs in place, the next step was getting dynamic routing up. I chose OSPF as the IGP for the HQ site — it's the standard in most enterprise environments and gives clean redistribution into BGP later.

The OSPF design is straightforward: all HQ devices run in Area 0 (backbone area), and the Palo Alto participates as an OSPF neighbor with CoreHQ. This means the firewall learns all internal routes dynamically — no static routes needed on the PA side for internal subnets.

**[DIAGRAM: Partial topology showing OSPF adjacency between CoreHQ and PA-HQ. Highlight the ethernet1/3 ↔ Ethernet0/0 link with OSPF neighbor relationship.]**

---

### OSPF Design

| Device | Router-ID | Area | Networks Advertised |
|---|---|---|---|
| CoreHQ | 10.0.0.10 | 0 | All HQ VLANs + Loopback |
| PA-HQ | 10.0.0.4 | 0 | Connected subnets via redistribute |

The link between CoreHQ and PA-HQ is a routed point-to-point link: `172.16.0.12/30` — CoreHQ uses `.13`, PA-HQ uses `.14`.

---

### Configuration

**CoreHQ — OSPF Config:**
```
router ospf 1
 router-id 10.0.0.10
 network 10.0.0.10 0.0.0.0 area 0
 network 10.10.10.0 0.0.0.255 area 0
 network 10.10.20.0 0.0.0.255 area 0
 network 10.10.30.0 0.0.0.255 area 0
 network 10.10.50.0 0.0.0.255 area 0
 network 10.10.99.0 0.0.0.255 area 0
 network 172.16.0.12 0.0.0.3 area 0
```

**PA-HQ — OSPF Config (via GUI path):**
```
Network > Virtual Routers > default > OSPF

Router ID   : 10.0.0.4
Area        : 0.0.0.0 (backbone)
Interface   : ethernet1/3 (172.16.0.14/30)

Redistribution: Connected routes redistributed into OSPF
```

---

### Evidence

**[SS: 02-ospf-01.png]**
*CoreHQ — `show ip ospf neighbor` showing PA-HQ as FULL neighbor*

**[SS: 02-ospf-02.png]**
*CoreHQ — `show ip route ospf` showing PA-learned routes including Branch subnets*

**[SS: 02-ospf-03.png]**
*PA-HQ — OSPF Neighbor table showing CoreHQ (10.0.0.10) as FULL*

**[SS: 02-ospf-04.png]**
*PA-HQ — Routing table showing OSPF-learned HQ subnets*

---

### Lessons Learned
- Setting explicit Router-IDs (Loopback addresses) on all devices makes OSPF topology much easier to read and troubleshoot — don't rely on the auto-selected Router-ID.
- The PA-HQ doesn't run OSPF natively on its inside interfaces — instead it redistributes connected routes into OSPF. This is intentional: the firewall acts as a redistribution point between the internal network and the routing domain.
- Branch subnets appear in CoreHQ's routing table as OSPF External Type 2 (E2) routes because they're redistributed from BGP — this is expected behavior and confirms the full routing chain is working.

---
---

## Article 03 — BGP Setup (eBGP HQ ↔ Branch)
**Slug:** `/lab/phase1/bgp`
**Category:** Network
**Difficulty:** Advanced

### Overview
While OSPF handles routing within the HQ site, I needed something to handle routing between the two sites — HQ and Branch. I chose eBGP for this, which is how most enterprise WAN designs work when you want clear autonomous system boundaries between sites.

HQ runs AS65100 (PA-HQ) and Branch runs AS65200 (FortiGate). The eBGP session runs over the IPSec tunnel, which I'll cover in more detail in the BGP over IPSec article. This article focuses on the BGP configuration itself and what routes are being exchanged.

**[DIAGRAM: Partial topology showing AS65100 (PA-HQ) and AS65200 (FortiGate-Branch) with eBGP session over tunnel.2/169.1.1.0/30.]**

---

### BGP Design

| Device | AS Number | BGP Peer IP | Peer AS |
|---|---|---|---|
| PA-HQ | 65100 | 169.1.1.1 | — |
| FortiGate | 65200 | 169.1.1.2 | — |

The BGP session uses tunnel interface IPs (`169.1.1.0/30`) rather than physical IPs — this keeps the control plane inside the encrypted tunnel.

Routes exchanged:
- HQ advertises: 10.10.10.0/24, 10.10.20.0/24, 10.10.30.0/24 (redistributed from OSPF)
- Branch advertises: 10.10.40.0/24, 10.10.199.0/24, 172.16.1.16/30

---

### Configuration

**PA-HQ — BGP Config:**
```
Network > Virtual Routers > default > BGP

Local AS     : 65100
Router ID    : 10.0.0.4

Peer Group   : BRANCH-PEERS
  Peer       : FORTIGATE-BRANCH
  Peer IP    : 169.1.1.2
  Remote AS  : 65200
  Local IP   : 169.1.1.1

Redistribution: OSPF routes redistributed into BGP
```

**FortiGate — BGP Config:**
```
config router bgp
    set as 65200
    set router-id 10.0.0.1
    config neighbor
        edit "169.1.1.1"
            set remote-as 65100
            set interface "IPSEC-TUNNEL-HQ"
        next
    end
    config redistribute "connected"
        set status enable
    end
end
```

---

### Evidence

**[SS: 03-bgp-01.png]**
*PA-HQ — BGP Summary showing route table with Branch subnets learned*

**[SS: 03-bgp-02.png]**
*PA-HQ — BGP Peer showing FORTIGATE-BRANCH as Established*

**[SS: 03-bgp-03.png]**
*PA-HQ — Routing table showing BGP routes (A?B flags) from Branch*

**[SS: 03-bgp-04.png]**
*FortiGate — BGP Neighbors showing HQ peer (169.1.1.1) as Established*

---

### Lessons Learned
- eBGP between two different AS numbers gives clean route separation — you can see exactly which routes come from which site, which is useful for troubleshooting and policy control.
- Redistributing OSPF into BGP on the PA-HQ side means Branch automatically gets all HQ internal subnets without needing to manually configure them. The reverse also works — HQ gets Branch routes via BGP redistribution.
- The BGP peer IPs (169.1.1.x) are tunnel interface addresses, not physical IPs. This is intentional — covered in detail in the BGP over IPSec article.

---
---

## Article 04 — IPSec Site-to-Site VPN (HQ ↔ Branch)
**Slug:** `/lab/phase1/ipsec-hq-branch`
**Category:** Network
**Difficulty:** Advanced

### Overview
The IPSec tunnel between HQ and Branch is the backbone of the inter-site connectivity in this lab. It connects the Palo Alto VM-Series at HQ with the FortiGate VM at Branch, using IKEv1 in Main Mode with a pre-shared key.

The physical path is: PA-HQ (ethernet1/1, 192.168.1.101) ↔ FortiGate (port1, 192.168.1.110) — both on the same simulated "WAN" segment in PNETLab. In a real environment, this would be over the internet.

**[DIAGRAM: Partial topology showing PA-HQ ↔ FortiGate IPSec tunnel. Highlight WAN interface (eth1/1 / port1), tunnel.2 interface on PA side, and IPSEC-TUNNEL-HQ on Forti side.]**

---

### Tunnel Design

| Parameter | Value |
|---|---|
| IKE Version | IKEv1 Main Mode |
| IKE Encryption | DES |
| IKE Hash | SHA-256 |
| IKE DH Group | Group 14 |
| IKE Lifetime | 28800 seconds (8 hours) |
| IPSec Encryption | DES |
| IPSec Hash | SHA-256 |
| IPSec DH Group | Group 14 |
| IPSec Lifetime | 3600 seconds (1 hour) |
| PA Local IP | 192.168.1.101 |
| FortiGate Peer IP | 192.168.1.110 |
| Tunnel Interface (PA) | tunnel.2 (169.1.1.1/30) |

---

### Configuration

**PA-HQ — IKE Gateway:**
```
Network > Network Profiles > IKE Gateways > IKE-GW-BRANCH

Interface       : ethernet1/1
Local IP        : 192.168.1.101
Peer IP         : 192.168.1.110
IKE Version     : IKEv1
Authentication  : Pre-Shared Key
IKE Crypto      : IKE-CRYPTO-HQ (SHA256 / DES / DH14)
```

**PA-HQ — IPSec Tunnel:**
```
Network > IPSec Tunnels > IPSEC-TUNNEL-BRANCH

IKE Gateway     : IKE-GW-BRANCH
IPSec Crypto    : IPSEC-CRYPTO-HQ (SHA256 / DES / DH14)
Tunnel Interface: tunnel.2
```

**FortiGate — IPSec Tunnel:**
```
config vpn ipsec phase1-interface
    edit "IPSEC-TUNNEL-HQ"
        set interface "port1"
        set ike-version 1
        set peertype any
        set remote-gw 192.168.1.101
        set psksecret <psk>
        set proposal des-sha256
        set dhgrp 14
    next
end

config vpn ipsec phase2-interface
    edit "PHASE2-HQ"
        set phase1name "IPSEC-TUNNEL-HQ"
        set proposal des-sha256
        set dhgrp 14
    next
end
```

---

### Evidence

**[SS: 04-ipsec-hq-branch-01.png]**
*PA-HQ — IPSec Tunnels showing IPSEC-TUNNEL-BRANCH with green status (both IKE and Tunnel UP)*

**[SS: 04-ipsec-hq-branch-02.png]**
*PA-HQ — IKE Info showing IKE-GW-BRANCH session active, PSK/DH14/DES/SHA256*

**[SS: 04-ipsec-hq-branch-03.png]**
*FortiGate — IPSec Tunnels showing IPSEC-TUNNEL-HQ connected, phase1 and phase2 UP*

**[SS: 04-ipsec-hq-branch-04.png]**
*Ping test from HQ VPC (10.10.30.2) to Branch VPC (10.10.40.2) — successful cross-site connectivity*

---

### Lessons Learned
- DES encryption is intentionally used here because it's a lab environment running on limited hardware (laptop CPU). In production, you'd use AES-256 minimum.
- IKEv1 Main Mode requires both peers to have static, known IPs — which works fine for this lab since both PA and FortiGate have fixed IPs on the simulated WAN segment.
- The tunnel interface (tunnel.2) on the PA side is what BGP peers over — without assigning an IP to tunnel.2, the BGP session wouldn't have a source/destination to work with.

---
---

## Article 05 — BGP over IPSec
**Slug:** `/lab/phase1/bgp-over-ipsec`
**Category:** Network
**Difficulty:** Advanced

### Overview
Running BGP over an IPSec tunnel is a design choice worth explaining, because the alternative — static routes — is simpler to configure but significantly harder to manage at scale.

The question is: once you have an IPSec tunnel connecting two sites, how do you handle routing between them? You have two options: add static routes pointing into the tunnel on both sides, or run a dynamic routing protocol over the tunnel. I chose BGP.

**[DIAGRAM: Partial topology showing the full routing chain — OSPF within HQ → redistribute into BGP → BGP over IPSec tunnel → FortiGate redistributes into connected routes at Branch.]**

---

### Why BGP over IPSec?

Static routes would work, but they have limitations:
- Every time you add a new subnet, you need to update routes on both sides manually
- There's no automatic failover — if the tunnel drops, traffic silently blackholes until someone fixes the route
- Harder to scale when you have many subnets

With BGP over IPSec:
- Route changes propagate automatically
- BGP keepalives double as tunnel health monitoring — if the tunnel drops, BGP session drops, routes withdraw
- Gives you a foundation to apply routing policy later (BGP communities, route filters, etc.)

---

### How It Works

The tunnel interface (tunnel.2) on PA-HQ gets an IP: `169.1.1.1/30`. FortiGate's tunnel interface gets `169.1.1.2/30`. These become the BGP peer addresses.

Traffic flow:
```
HQ Host (10.10.30.x)
  → CoreHQ (OSPF)
  → PA-HQ (redistribute OSPF → BGP)
  → IPSec tunnel (encrypted)
  → FortiGate (BGP peer)
  → Branch Host (10.10.40.x)
```

---

### Configuration

**PA-HQ — Tunnel Interface IP:**
```
Network > Interfaces > Tunnel > tunnel.2

IP Address  : 169.1.1.1/30
Zone        : VPN
```

**PA-HQ — BGP Peer (using tunnel IP):**
```
Network > Virtual Routers > BGP > Peer

Peer Name   : FORTIGATE-BRANCH
Peer Group  : BRANCH-PEERS
Local IP    : 169.1.1.1
Peer IP     : 169.1.1.2
Remote AS   : 65200
```

**FortiGate — BGP using tunnel interface:**
```
config router bgp
    set as 65200
    config neighbor
        edit "169.1.1.1"
            set remote-as 65100
            set interface "IPSEC-TUNNEL-HQ"
        next
    end
end
```

---

### Evidence

**[SS: 05-bgp-over-ipsec-01.png]**
*PA-HQ — Side-by-side: IPSec tunnel BRANCH UP + BGP peer FORTIGATE-BRANCH Established simultaneously*

**[SS: 05-bgp-over-ipsec-02.png]**
*PA-HQ — Routing table showing Branch subnets (A?B flags) learned via BGP through tunnel*

**[SS: 05-bgp-over-ipsec-03.png]**
*FortiGate — Routing table showing HQ subnets learned via BGP through IPSEC-TUNNEL-HQ*

**[SS: 05-bgp-over-ipsec-04.png]**
*Ping from Branch VPC (10.10.40.2) to AD server (10.10.10.10) — cross-site reachability confirmed*

---

### Lessons Learned
- The key insight is that BGP needs a routable path to establish the session — the tunnel interface IPs (169.1.1.x) provide that. Without IPs on the tunnel interfaces, BGP has no addresses to peer with.
- BGP keepalive timers act as a dead peer detection mechanism for the tunnel — if IPSec goes down, BGP will detect it within keepalive interval and withdraw routes automatically.
- This setup scales cleanly: add a third site, spin up another tunnel, add another BGP peer, and routes propagate everywhere automatically.

---
---

## Article 06 — IPSec Site-to-Site VPN (HQ ↔ Azure) + WireGuard CGNAT Workaround
**Slug:** `/lab/phase1/ipsec-azure`
**Category:** Network
**Difficulty:** Expert

### Overview
Getting IPSec to work between the on-prem Palo Alto and Azure VPN Gateway turned out to be more involved than a standard site-to-site tunnel — mainly because of a CGNAT problem with my ISP.

This article covers both the IPSec configuration itself and the WireGuard workaround that made it possible.

**[DIAGRAM: Full path diagram showing: Home Lab (PA-HQ behind CGNAT) → WireGuard tunnel → S-Net Ubuntu VM (public IP 149.129.220.212) → IPSec → Azure VPN Gateway → vm-web-lab (10.20.10.4)]**

---

### The CGNAT Problem

My home ISP uses CGNAT (Carrier-Grade NAT) — which means I don't have a real public IP. My router's WAN IP is a private address, and the ISP NAT-translates it to a shared public IP.

This breaks IPSec because:
- Azure VPN Gateway needs to know what IP to send IKE packets to
- With CGNAT, my public IP changes and isn't actually mine — it's shared with other customers
- IKE NAT-Traversal (NAT-T) helps with one layer of NAT, but CGNAT adds extra complexity

**The Solution: WireGuard as a relay**

I have a separate cloud VM (Ubuntu on S-Net provider) with a real public IP: `149.129.220.212`. This VM runs WireGuard and acts as a relay between the lab and Azure.

Traffic path:
```
PA-HQ → WireGuard tunnel → Ubuntu VM (149.129.220.212)
                                    ↓
                          Azure sees source = 149.129.220.212
                                    ↓
                          IPSec negotiation completes
```

---

### WireGuard Configuration

**Ubuntu VM (wireguard) — WireGuard config:**
```
[Interface]
Address = 10.1.1.1/30
ListenPort = 41411
PrivateKey = <hidden>

# SNAT traffic from PA toward Azure VPN Gateway
PostUp = iptables -t nat -A POSTROUTING -d 20.11.94.68 -j MASQUERADE
PostDown = iptables -t nat -D POSTROUTING -d 20.11.94.68 -j MASQUERADE

[Peer]
# PA-HQ
PublicKey = <PA-public-key>
AllowedIPs = 10.1.1.0/30, 192.168.1.101/32
```

**PA-HQ side — WireGuard client (built into PAN-OS as tunnel):**
- WireGuard connects to Ubuntu VM: `149.129.220.212:41411`
- When PA sends IKE to Azure VPN GW IP, it goes through WireGuard → Ubuntu VM does SNAT → Azure sees source as `149.129.220.212`

**MTU Note:** WireGuard tunnel MTU set to 1300 to account for double encapsulation (WireGuard + IPSec headers).

---

### Azure IPSec Configuration

**Azure VPN Gateway settings:**
```
VPN Gateway Name   : vpngw-lab
SKU                : VpnGw1
Type               : Route-based

Local Network Gateway (lng-onprem):
  IP Address       : 149.129.220.212  ← WireGuard VM public IP
  Address Spaces   : 10.10.10.0/24, 10.10.20.0/24,
                     10.10.30.0/24, 10.10.99.0/24

Connection (IPSec_Palo):
  IKE Version      : IKEv2
  Encryption       : AES-256
  Integrity        : SHA-256
  DH Group         : DHGroup14
  PFS Group        : None
```

**PA-HQ — IKE Gateway for Azure:**
```
Network > IKE Gateways > IKE-GW-AZURE

Interface       : ethernet1/1
Local IP        : 192.168.1.101
Peer IP         : 20.11.94.68 (Azure VPN GW public IP)
IKE Version     : IKEv2
Crypto Profile  : IKE-CRYPTO-AZURE (AES256 / SHA256 / DH14)
NAT Traversal   : Enabled
```

**PA-HQ — IPSec Tunnel for Azure:**
```
Network > IPSec Tunnels > IPSEC-TUNNEL-AZURE

IKE Gateway     : IKE-GW-AZURE
IPSec Crypto    : IPSEC-CRYPTO-AZURE (AES256 / SHA256 / DH14)
Tunnel Interface: tunnel.3
```

---

### Evidence

**[SS: 06-ipsec-azure-01.png]**
*PA-HQ — IPSEC-TUNNEL-AZURE status showing active tunnel*

**[SS: 06-ipsec-azure-02.png]**
*Azure Portal — IPSec_Palo connection showing Status: Connected*

**[SS: 06-ipsec-azure-03.png]**
*Ubuntu WireGuard VM — `sudo wg show` confirming active peer with latest handshake and traffic*

**[SS: 06-ipsec-azure-04.png]**
*SSH into vm-web-lab (10.20.10.4) from lab network — confirming end-to-end tunnel connectivity*

**[SS: 06-ipsec-azure-05.png]**
*Ping from HQ VPC (10.10.30.2) → vm-web-lab (10.20.10.4) successful*

---

### Lessons Learned
- CGNAT is a real-world problem that many home lab builders hit — the WireGuard relay approach solves it cleanly without needing a paid VPN service or port forwarding on the ISP side.
- IKEv2 was used for Azure (vs IKEv1 for Branch) because Azure VPN Gateway has better IKEv2 support and it's the recommended standard for new deployments.
- MTU is critical — without setting WireGuard MTU to 1300, you get silent packet drops on large payloads because the double-encapsulation (WireGuard + IPSec) exceeds the physical MTU of 1500.
- The SNAT rule on the WireGuard VM is the key piece — without it, return traffic from Azure wouldn't know how to get back to the PA-HQ.

---
---

## Article 07 — DHCP Configuration
**Slug:** `/lab/phase1/dhcp`
**Category:** Network
**Difficulty:** Beginner

### Overview
DHCP is configured on CoreHQ to serve addresses to the HQ User subnet (VLAN 30). Rather than deploying a separate DHCP server, I kept it on the Layer 3 switch — which is common in medium-sized enterprise environments where a dedicated DHCP server isn't warranted.

**[DIAGRAM: Partial topology showing CoreHQ as DHCP server for VLAN 30 (10.10.30.0/24), with Win10 and VPC as DHCP clients.]**

---

### DHCP Design

| Parameter | Value |
|---|---|
| Pool Name | User-DHCP |
| Network | 10.10.30.0/24 |
| Default Gateway | 10.10.30.1 (CoreHQ SVI) |
| DNS Server | 10.10.10.10 (AD DNS) + 8.8.8.8 |
| Excluded Addresses | 10.10.30.1 (gateway) |

---

### Configuration

**CoreHQ — DHCP Config:**
```
ip dhcp excluded-address 10.10.30.1

ip dhcp pool User-DHCP
 network 10.10.30.0 255.255.255.0
 default-router 10.10.30.1
 dns-server 10.10.10.10 8.8.8.8
```

---

### Evidence

**[SS: 07-dhcp-01.png]**
*CoreHQ — `show run | section dhcp` showing DHCP pool configuration*

**[SS: 07-dhcp-02.png]**
*CoreHQ — `show ip dhcp binding` showing active leases*

**[SS: 07-dhcp-03.png]**
*VPC/Win10 — `show ip` / `ipconfig` showing DHCP-assigned address from 10.10.30.0/24*

---

### Lessons Learned
- Pointing DNS to the AD server (10.10.10.10) as the primary DNS is important — it allows domain-joined machines to resolve internal hostnames like `win-server.ilwij.lab`. Without this, AD authentication and domain lookups would fail.
- The excluded-address for the gateway prevents address conflicts — always exclude any statically configured IPs from DHCP pools.

---
---

## Article 08 — NTP Infrastructure
**Slug:** `/lab/phase1/ntp`
**Category:** Network
**Difficulty:** Beginner

### Overview
Time synchronization might seem like a minor detail, but it's critical for RADIUS authentication, log correlation, and certificate validation. A 5-minute time skew between a device and the NTP server will cause Kerberos-based auth to fail.

Rather than pointing all devices at an external NTP server, I deployed an NTP container in the Kubernetes cluster and used it as the internal time source for the entire lab.

**[DIAGRAM: NTP hierarchy diagram — internet NTP pool → K3s NTP container (10.10.20.51) → all lab devices (CoreHQ, PA-HQ, Fortigate, Win-Server, Switches).]**

---

### NTP Design

| Layer | Device | NTP Source |
|---|---|---|
| Stratum 2 | K3s NTP container | 0.id.pool.ntp.org, 1.id.pool.ntp.org |
| Stratum 3 | All lab devices | 10.10.20.51 (NTP container) |

The NTP container uses the `cturra/ntp` Docker image, deployed via Kubernetes with MetalLB assigning it the IP `10.10.20.51`.

---

### Configuration

**K3s — NTP Deployment:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ntp-server
  namespace: infra
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ntp
  template:
    spec:
      containers:
      - name: ntp
        image: cturra/ntp:latest
        env:
        - name: NTP_SERVERS
          value: "0.id.pool.ntp.org,1.id.pool.ntp.org"
        - name: TZ
          value: "Asia/Jakarta"
        securityContext:
          capabilities:
            add: ["SYS_TIME"]
        ports:
        - containerPort: 123
          protocol: UDP
---
apiVersion: v1
kind: Service
metadata:
  name: ntp-server
  namespace: infra
spec:
  type: LoadBalancer
  loadBalancerIP: 10.10.20.51
  ports:
  - port: 123
    protocol: UDP
```

**CoreHQ — NTP Client:**
```
ntp server 10.10.20.51
clock timezone WIB 7 0
```

**PA-HQ — NTP Client:**
```
Device > Setup > Services > NTP
Primary NTP Server: 10.10.20.51
```

**FortiGate — NTP Client:**
```
config system ntp
    set ntpsync enable
    set syncinterval 60
    config ntpserver
        edit 1
            set server 10.10.20.51
        next
    end
end
```

**Windows Server — NTP Client:**
```
w32tm /config /manualpeerlist:"10.10.20.51" /syncfromflags:manual /reliable:YES /update
net stop w32tm && net start w32tm
```

---

### Evidence

**[SS: 08-ntp-01.png]**
*K3s — NTP container pod running in infra namespace*

**[SS: 08-ntp-02.png]**
*CoreHQ — `show ntp status` and `show ntp associations` showing synchronized to 10.10.20.51*

**[SS: 08-ntp-03.png]**
*PA-HQ — NTP status in Device > Services showing synchronized*

**[SS: 08-ntp-04.png]**
*FortiGate — System Settings NTP status showing synchronized*

**[SS: 08-ntp-05.png]**
*Windows Server — `w32tm /query /status` showing synced to 10.10.20.51*

---

### Lessons Learned
- Running NTP inside Kubernetes as a LoadBalancer service is a clean approach — the container gets a stable IP, restarts automatically if it crashes, and you can update the NTP server image without touching device configs.
- The `SYS_TIME` capability is required for the NTP container to adjust the system clock — without it, the container can't actually set the time and will just act as a relay.
- All devices pointing to the same internal NTP source means logs are consistent — critical when correlating events across PA firewall, FortiGate, switches, and Windows Server.

---
---

# 🔒 NETWORK SECURITY

---

## Article 09 — Palo Alto Security Policies & Zones
**Slug:** `/lab/phase1/pa-security-policies`
**Category:** Network Security
**Difficulty:** Intermediate

### Overview
Zone-based security is the foundation of how Palo Alto firewalls work — every interface belongs to a zone, and traffic is only allowed between zones if there's an explicit security policy permitting it. This article covers the zone design and security policy structure for the PA-HQ firewall.

**[DIAGRAM: Partial topology showing PA-HQ with all zones: Outside, Inside, VPN, Azure, MGT. Show traffic flows between zones.]**

---

### Zone Design

| Zone | Interface | Purpose |
|---|---|---|
| Outside | ethernet1/1 | WAN / Internet-facing |
| Inside | ethernet1/3 | Internal LAN (via CoreHQ) |
| VPN | tunnel.2 | IPSec tunnel to Branch |
| Azure | tunnel.3 | IPSec tunnel to Azure |
| MGT | Management | Out-of-band management |

---

### Security Policy Structure

Key policies configured:

| Rule Name | Source Zone | Dest Zone | Application | Action |
|---|---|---|---|---|
| HQ-TO-BRANCH | Inside | VPN | any | Allow |
| BRANCH-TO-HQ | VPN | Inside | any | Allow |
| HQ-TO-AZURE | Inside | Azure | any | Allow |
| AZURE-TO-HQ | Azure | Inside | any | Allow |
| INSIDE-TO-OUTSIDE | Inside | Outside | any | Allow |
| DENY-ALL | any | any | any | Deny (implicit) |

---

### Configuration

**PA-HQ — Zone Configuration (CLI equivalent):**
```
set zone Outside network layer3 ethernet1/1
set zone Inside network layer3 ethernet1/3
set zone VPN network layer3 tunnel.2
set zone Azure network layer3 tunnel.3
```

**PA-HQ — Security Policy (key rules):**
```
set rulebase security rules HQ-TO-BRANCH from Inside to VPN
  application any
  service any
  action allow

set rulebase security rules HQ-TO-AZURE from Inside to Azure
  application any
  service any
  action allow
```

---

### Evidence

**[SS: 09-pa-security-policies-01.png]**
*PA-HQ — Zone list showing all configured zones (Outside, Inside, VPN, Azure)*

**[SS: 09-pa-security-policies-02.png]**
*PA-HQ — Security policy list showing all rules*

**[SS: 09-pa-security-policies-03.png]**
*PA-HQ — Detail view of HQ-TO-BRANCH policy*

**[SS: 09-pa-security-policies-04.png]**
*PA-HQ — Traffic log showing policy hits confirming rules are matching traffic*

---

### Lessons Learned
- Zone separation makes security policy much cleaner — instead of writing rules based on IP addresses, you write rules based on logical zones. Adding a new device to a zone automatically inherits all existing zone-based policies.
- The implicit deny-all at the bottom means any traffic not explicitly permitted is dropped and logged — this is the correct default behavior for a production firewall.
- Keeping VPN and Azure as separate zones (rather than combining them) gives you the flexibility to apply different policies to Branch vs Azure traffic without complex conditions.

---
---

## Article 10 — Palo Alto Security Profiles
**Slug:** `/lab/phase1/pa-security-profiles`
**Category:** Network Security
**Difficulty:** Intermediate

### Overview
Security profiles in Palo Alto add deep inspection on top of the base security policies — they're what make the PA a "next-gen" firewall rather than just a stateful packet filter. This article covers the profiles configured in the lab and a note about license limitations.

**[DIAGRAM: Partial topology showing PA-HQ with security profiles applied to Inside → Outside policy. Show profile types: IPS, URL Filter, App-ID.]**

---

### Profiles Configured

| Profile Type | Name | Status |
|---|---|---|
| Vulnerability Protection | Lab-VP | Configured (no license enforcement) |
| URL Filtering | Lab-URL | Configured (no license enforcement) |
| App-ID | Built-in | Active (no license required) |

**Important note on licensing:** In this lab, PA runs as a VM-Series trial. Security profiles (IPS/Threat Prevention, URL Filtering) are configured but enforcement requires a valid Threat Prevention license. The profiles show in the GUI but won't generate threat logs without the license. App-ID however works without a license.

---

### Configuration

**PA-HQ — Vulnerability Protection Profile:**
```
Objects > Security Profiles > Vulnerability Protection > Lab-VP

Rules:
  - Critical/High severity: Alert
  - Medium severity: Alert
  - Low/Informational: Allow
```

**PA-HQ — URL Filtering Profile:**
```
Objects > Security Profiles > URL Filtering > Lab-URL

Categories blocked: malware, phishing, command-and-control
Categories alerted: hacking, questionable
```

**PA-HQ — Applying profiles to policy:**
```
Policies > Security > INSIDE-TO-OUTSIDE

Profile Type: Profiles
  Vulnerability  : Lab-VP
  URL Filtering  : Lab-URL
```

---

### Evidence

**[SS: 10-pa-security-profiles-01.png]**
*PA-HQ — Vulnerability Protection profile (Lab-VP) configuration*

**[SS: 10-pa-security-profiles-02.png]**
*PA-HQ — URL Filtering profile (Lab-URL) configuration*

**[SS: 10-pa-security-profiles-03.png]**
*PA-HQ — Security policy showing profiles attached (Application column showing App-ID in use)*

**[SS: 10-pa-security-profiles-04.png]**
*PA-HQ — Threat log showing "No data" — expected behavior without Threat Prevention license*

---

### Lessons Learned
- App-ID works without a license — the PA can identify applications (web-browsing, ssl, dns, etc.) based on protocol behavior rather than just port numbers. This is a core PAN-OS feature.
- In production, you'd always have Threat Prevention and URL Filtering licenses — the profiles themselves are the right way to configure them, just need active subscriptions to enforce.
- Even without license enforcement, configuring the profiles correctly is valuable for the lab — it demonstrates understanding of the configuration and prepares for production deployment where licenses would be in place.

---
---

## Article 11 — Fortinet Security Policies & Zones
**Slug:** `/lab/phase1/forti-security-policies`
**Category:** Network Security
**Difficulty:** Intermediate

### Overview
FortiGate uses a similar zone-based model to Palo Alto, but the terminology and configuration flow is different. This article covers how the Branch firewall (FortiGate VM running FortiOS 7.6.2) is configured for traffic control between the Branch network and HQ.

**[DIAGRAM: Partial topology showing FortiGate-Branch with zones: wan (port1), lan (port3), ipsec-tunnel. Show traffic flows between Branch user subnet and HQ via tunnel.]**

---

### Interface / Zone Design

| Interface | Zone | IP | Purpose |
|---|---|---|---|
| port1 | wan | 192.168.1.110/24 | WAN / IPSec endpoint |
| port3 | lan | Connected to Core-Branch | LAN-side |
| IPSEC-TUNNEL-HQ | vpn | 169.1.1.2/30 | BGP + data toward HQ |

---

### Security Policy Structure

| Policy Name | Source | Destination | Action |
|---|---|---|---|
| Branch-to-HQ | lan | vpn | Accept |
| HQ-to-Branch | vpn | lan | Accept |
| Branch-to-Internet | lan | wan | Accept + NAT |

---

### Configuration

**FortiGate — Interface / Zone:**
```
config system interface
    edit "port1"
        set alias "WAN"
        set role wan
    next
    edit "port3"
        set alias "LAN"
        set role lan
    next
end
```

**FortiGate — Firewall Policy (Branch → HQ):**
```
config firewall policy
    edit 1
        set name "Branch-to-HQ"
        set srcintf "port3"
        set dstintf "IPSEC-TUNNEL-HQ"
        set srcaddr "all"
        set dstaddr "all"
        set action accept
        set schedule always
        set service ALL
    next
    edit 2
        set name "HQ-to-Branch"
        set srcintf "IPSEC-TUNNEL-HQ"
        set dstintf "port3"
        set srcaddr "all"
        set dstaddr "all"
        set action accept
        set schedule always
        set service ALL
    next
end
```

---

### Evidence

**[SS: 11-forti-security-policies-01.png]**
*FortiGate — Interface list showing port1 (WAN), port3 (LAN), IPSEC-TUNNEL-HQ*

**[SS: 11-forti-security-policies-02.png]**
*FortiGate — Firewall Policy list showing Branch-to-HQ and HQ-to-Branch rules*

**[SS: 11-forti-security-policies-03.png]**
*FortiGate — Detail of Branch-to-HQ policy*

**[SS: 11-forti-security-policies-04.png]**
*FortiGate — Forward traffic log showing traffic matching policies*

---

### Lessons Learned
- FortiGate's policy model is interface-based by default (not zone-based like PA) but you can group interfaces into zones for cleaner policy management — in this lab I kept it interface-based for simplicity.
- The BGP traffic between FortiGate and PA-HQ (169.1.1.x) also needs to match the firewall policy — BGP runs on TCP port 179, and the policy allows ALL services, so it passes through.
- Logging all allowed traffic is important in a lab — it gives you visibility into what's actually flowing and confirms your policies are matching the right traffic.

---
---

## Article 12 — RADIUS / AAA
**Slug:** `/lab/phase1/radius-aaa`
**Category:** Network Security
**Difficulty:** Intermediate

### Overview
One of the things I wanted to prove in this lab is centralized authentication — rather than having local usernames configured on every device, all network devices authenticate against a central RADIUS server backed by Active Directory.

This means I can log into any switch, firewall, or router using a single domain credential, and access is controlled by AD group membership.

**[DIAGRAM: Authentication flow diagram: Engineer → SSH to CoreHQ → CoreHQ sends RADIUS request to Win-Server (NPS) → NPS checks AD group membership → returns accept/reject → CoreHQ grants/denies access.]**

---

### Architecture

| Component | Role |
|---|---|
| Windows Server (10.10.10.10) | RADIUS Server via NPS |
| Active Directory | User/Group database |
| AD Group: infra-admins | Full access (privilege 15) |
| AD Group: readonly | Read-only access |
| RADIUS Clients | CoreHQ, ServerSwitch, AccessSwitch, Core-Branch, SW-Branch, PA-HQ, FortiGate |

---

### Configuration

**Windows Server — NPS (RADIUS) Client config:**
```
Each device registered as RADIUS client in NPS:
  CoreHQ        : 10.10.99.1  / secret: radius123
  ServerSwitch  : 10.10.99.12 / secret: radius123
  AccessSwitch  : 10.10.99.13 / secret: radius123
  Core-Branch   : 10.10.199.1 / secret: radius123
  SW-Branch     : 10.10.199.10/ secret: radius123
  PA-HQ         : 10.0.0.4    / secret: (configured in PA)
  FortiGate     : 10.10.40.1  / secret: (configured in Forti)
```

**CoreHQ — AAA Config:**
```
aaa new-model
aaa authentication login default group radius local
aaa authentication login CONSOLE local
aaa authorization exec default group radius local
aaa authorization exec CONSOLE local

radius server WIN-SERVER
 address ipv4 10.10.10.10 auth-port 1812 acct-port 1813
 key radius123

ip radius source-interface Vlan99
```

**PA-HQ — RADIUS Auth Profile:**
```
Device > Server Profiles > RADIUS > WIN-SERVER-NPS
  Server: 10.10.10.10 port 1812
  Secret: configured

Device > Authentication Profile > RADIUS-AUTH
  Type: RADIUS
  Profile: WIN-SERVER-NPS
```

**FortiGate — RADIUS Config:**
```
config user radius
    edit "WIN-SERVER"
        set server "10.10.10.10"
        set secret <secret>
    next
end

config user group
    edit "infra-admins"
        set member "WIN-SERVER"
    next
end
```

---

### Evidence

**[SS: 12-radius-aaa-01.png]**
*Windows Server — NPS RADIUS Clients list showing all 7 devices registered*

**[SS: 12-radius-aaa-02.png]**
*Windows Server — NPS Network Policies showing infra-admins policy*

**[SS: 12-radius-aaa-03.png]**
*CoreHQ — SSH login using AD user (ilham) showing privilege level 15 granted*

**[SS: 12-radius-aaa-04.png]**
*PA-HQ — Login using AD user, Dashboard showing username ilham*

**[SS: 12-radius-aaa-05.png]**
*FortiGate — Login using AD user, Dashboard showing username*

---

### Lessons Learned
- `ip radius source-interface Vlan99` is important on Cisco — without it, the RADIUS request might come from the wrong interface IP and NPS won't recognize the client, causing auth to fail silently.
- The CONSOLE authentication (`login authentication CONSOLE`) must be kept as local — if RADIUS is unavailable and you lock yourself out of VTY lines, you need console access with a local credential to recover.
- NPS on Windows Server is a solid, free RADIUS implementation for labs — it integrates natively with AD and supports group-based authorization out of the box.

---
---

## Article 13 — GlobalProtect VPN (Remote Access)
**Slug:** `/lab/phase1/globalprotect`
**Category:** Network Security
**Difficulty:** Advanced

### Overview
GlobalProtect is Palo Alto's remote access VPN solution. Beyond just connectivity, it integrates with the PA security stack — users connecting via GlobalProtect are subject to the same App-ID, security profiles, and zone-based policies as on-site users.

In this lab, GP is configured with the Portal accessible via the WireGuard VM's public IP (`149.129.220.212`), which means I can connect from anywhere in the world using the GP client and tunnel into the lab.

**[DIAGRAM: Remote access diagram: GP Client (outside) → internet → 149.129.220.212 (WireGuard VM) → port forward to PA-HQ → GP authentication → access to lab network.]**

---

### Architecture

| Component | Value |
|---|---|
| GP Portal URL | https://149.129.220.212 |
| GP Gateway | PA-HQ (ethernet1/1) |
| Certificate | PA-Root-CA (self-signed) |
| Authentication | RADIUS (AD credentials) |
| VPN Users | VPN01, VPN02 (local), + AD users |
| IP Pool | Assigned from tunnel pool |

---

### Configuration

**PA-HQ — GP Portal:**
```
Network > GlobalProtect > Portals > GP-Portal

Interface       : ethernet1/1
IP              : 192.168.1.102 (secondary IP on eth1/1)
Certificate     : PA-Device-VPN
Authentication  : RADIUS-AUTH (AD backend)
Agent Config    : GP-Agent-Config
  Gateway       : 149.129.220.212
```

**PA-HQ — GP Gateway:**
```
Network > GlobalProtect > Gateways > GP-Gateway

Interface       : ethernet1/1
IP              : 192.168.1.101
Certificate     : PA-Device-VPN
Authentication  : RADIUS-AUTH
Tunnel Interface: tunnel.1
```

---

### Evidence

**[SS: 13-globalprotect-01.png]**
*PA-HQ — GlobalProtect Portal configuration*

**[SS: 13-globalprotect-02.png]**
*PA-HQ — GlobalProtect Gateway configuration*

**[SS: 13-globalprotect-03.png]**
*Browser — GP Portal login page accessible at https://149.129.220.212 from outside network*

**[SS: 13-globalprotect-04.png]**
*GP Client — Connected status showing tunnel established*

---

### Lessons Learned
- Using a secondary IP (192.168.1.102) for the Portal while the primary (192.168.1.101) handles the Gateway and IPSec tunnels avoids certificate conflicts — each service can use a different CN.
- The WireGuard VM acts as a port forwarder here (same as for IPSec) — it forwards incoming HTTPS (443) and UDP to the PA-HQ inside the CGNAT network.
- Self-signed certificates work fine for a lab — in production you'd use a CA-signed cert to avoid browser warnings when users access the portal.

---
---

# 🖥️ SERVER & VIRTUALIZATION

---

## Article 14 — Proxmox VE Setup
**Slug:** `/lab/phase1/proxmox`
**Category:** Server & Virtualization
**Difficulty:** Intermediate

### Overview
The entire lab runs on a single laptop using Proxmox VE as the hypervisor. Proxmox gives me the flexibility to run both full VMs (for Windows Server, the network devices in PNETLab) and containers, all from a single management interface.

The key challenge was networking — getting Proxmox to bridge correctly with the PNETLab network so that VMs could communicate with each other and with the physical switch stack.

**[DIAGRAM: Proxmox architecture — Physical laptop → Proxmox hypervisor → PNETLab VM (contains all network devices) + K3s VMs (101, 102, 103) + Win Server VM. Show vmbr0 and vmbr1 bridges.]**

---

### Architecture

| VM ID | Name | Role | Resources |
|---|---|---|---|
| PNETLab | PNETLab | Network simulation (PA, Forti, switches, etc.) | 8 vCPU, 16GB RAM |
| 101 | k3s-master | Kubernetes master node | 2 vCPU, 4GB RAM |
| 102 | k3s-worker1 | Kubernetes worker node | 2 vCPU, 2GB RAM |
| 103 | win-server | Windows Server 2022 | 2 vCPU, 4GB RAM |

**Network Bridges:**

| Bridge | Purpose |
|---|---|
| vmbr0 | External / management (Proxmox management + internet) |
| vmbr1 | Internal lab network — connects VMs to PNETLab topology |

---

### Configuration

**Proxmox Network Config (`/etc/network/interfaces`):**
```
auto lo
iface lo inet loopback

auto enp3s0
iface enp3s0 inet manual

auto vmbr0
iface vmbr0 inet static
  address 192.168.0.x/24
  gateway 192.168.0.1
  bridge-ports enp3s0
  bridge-stp off
  bridge-fd 0

auto vmbr1
iface vmbr1 inet manual
  bridge-ports none
  bridge-stp off
  bridge-fd 0
  bridge-vlan-aware yes
  bridge-vids 2-4094
```

The `bridge-vlan-aware yes` on vmbr1 is important — it allows tagged VLAN traffic to pass between PNETLab and the K3s VMs, which is how the VMs connect to the correct network segments.

---

### Evidence

**[SS: 14-proxmox-01.png]**
*Proxmox Web UI — Dashboard showing all VMs and their running status*

**[SS: 14-proxmox-02.png]**
*Proxmox Web UI — Node > Network showing vmbr0 and vmbr1 configuration*

**[SS: 14-proxmox-03.png]**
*Proxmox Web UI — k3s-master VM summary (CPU, RAM, network)*

**[SS: 14-proxmox-04.png]**
*Browser — Proxmox Web UI accessible at https://10.10.99.18:8006*

---

### Lessons Learned
- `bridge-vlan-aware yes` on vmbr1 is the key configuration that makes the whole lab work — without it, VLAN tags are stripped and VMs can't connect to the right network segments inside PNETLab.
- Running everything on a single laptop is resource-intensive but manageable — the key is careful resource allocation. PNETLab gets the most resources since it runs multiple Cisco/Palo/Forti instances simultaneously.
- Proxmox's built-in backup (vzdump) is useful even for a lab — it saved me twice when I accidentally broke a K3s config and needed to roll back.

---
---

## Article 15 — K3s Kubernetes Cluster
**Slug:** `/lab/phase1/k3s`
**Category:** Server & Virtualization
**Difficulty:** Advanced

### Overview
I deployed a 2-node K3s cluster (1 master + 1 worker) to host the lab's infrastructure services — NTP, monitoring stack (Prometheus + Grafana), and the Kubernetes dashboard. Using K3s rather than full Kubernetes keeps the resource footprint manageable while giving me real Kubernetes experience.

MetalLB is used as the load balancer, assigning real IP addresses from the VLAN 20 (Container-Subnet) range to services that need external access.

**[DIAGRAM: K3s cluster diagram showing k3s-master (10.10.20.x) and k3s-worker (10.10.20.x) connected to Container-Subnet (VLAN 20). Show MetalLB IP pool and assigned service IPs.]**

---

### Cluster Architecture

| Node | IP | Role |
|---|---|---|
| k3s-master | 10.10.20.x | Control plane + etcd |
| k3s-worker1 | 10.10.20.x | Worker node |

**MetalLB IP Pool:** 10.10.20.50 - 10.10.20.59

**Service IP Assignments:**

| Service | IP | Port |
|---|---|---|
| Kubernetes Dashboard | 10.10.20.50 | 443 |
| NTP Server | 10.10.20.51 | 123/UDP |
| Alertmanager | 10.10.20.52 | 9093 |
| Grafana | 10.10.20.53 | 80 |
| Prometheus | 10.10.20.54 | 9090 |
| SNMP Exporter | 10.10.20.55 | 9116 |

---

### Configuration

**K3s Installation (master):**
```bash
curl -sfL https://get.k3s.io | sh -s - \
  --cluster-init \
  --disable traefik \
  --flannel-backend=vxlan
```

**K3s Installation (worker):**
```bash
curl -sfL https://get.k3s.io | K3S_URL=https://<master-ip>:6443 \
  K3S_TOKEN=<node-token> sh -
```

**MetalLB IP Pool config:**
```yaml
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: lab-pool
  namespace: metallb-system
spec:
  addresses:
  - 10.10.20.50-10.10.20.59
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: lab-l2
  namespace: metallb-system
```

---

### Evidence

**[SS: 15-k3s-01.png]**
*`kubectl get nodes -o wide` showing master and worker nodes in Ready state*

**[SS: 15-k3s-02.png]**
*`kubectl get pods -A` showing all pods running across all namespaces*

**[SS: 15-k3s-03.png]**
*`kubectl get svc -A` showing all LoadBalancer services with MetalLB-assigned external IPs*

**[SS: 15-k3s-04.png]**
*Kubernetes Dashboard accessible at https://10.10.20.50*

**[SS: 15-k3s-05.png]**
*Grafana accessible at http://10.10.20.53 via MetalLB IP*

---

### Lessons Learned
- Disabling Traefik (`--disable traefik`) during K3s install is important if you're using MetalLB — having both trying to handle ingress/LoadBalancer services causes conflicts.
- MetalLB in L2 mode works well in a lab environment — it broadcasts ARP for each LoadBalancer IP, and the network switches learn the MAC addresses and route traffic correctly.
- Flannel VXLAN was chosen as the CNI because it works well with the VLAN-aware bridge setup in Proxmox without additional configuration.

---
---

## Article 16 — Windows Server — AD, DNS, NPS
**Slug:** `/lab/phase1/windows-server`
**Category:** Server & Virtualization
**Difficulty:** Intermediate

### Overview
Windows Server 2022 runs three critical services in this lab: Active Directory Domain Services (AD DS), DNS, and Network Policy Server (NPS) for RADIUS. Together they provide centralized identity, name resolution, and authentication for the entire lab.

**[DIAGRAM: Windows Server services diagram — AD DS (domain: ilwij.lab) + DNS (authoritative for ilwij.lab) + NPS (RADIUS for all 7 network devices). Show relationship to domain-joined Win10 client.]**

---

### Domain Design

| Parameter | Value |
|---|---|
| Domain Name | ilwij.lab |
| Domain Controller IP | 10.10.10.10 |
| DNS Zone | ilwij.lab (forward lookup) |
| AD Groups | infra-admins, readonly |
| AD Users | ilham, lab, VPN01, VPN02 |

---

### Configuration

**AD DS — Domain Setup:**
```powershell
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
Install-ADDSForest -DomainName "ilwij.lab" -InstallDns
```

**DNS — Key Records:**
```
win-server.ilwij.lab  → 10.10.10.10
k3s-master.ilwij.lab  → 10.10.20.x
grafana.ilwij.lab     → 10.10.20.53
```

**NPS — RADIUS Configuration:**
```
# Add RADIUS clients (example for CoreHQ):
Server Manager > NPS > RADIUS Clients > New
  Friendly name : CoreHQ
  Address       : 10.10.99.1
  Shared Secret : radius123

# Network Policy for infra-admins:
Conditions: Windows Group = ILWIJ\infra-admins
Permissions: Access Granted
Settings: Service-Type = Administrative
```

---

### Evidence

**[SS: 16-windows-server-01.png]**
*AD Users & Computers showing users and groups in ilwij.lab domain*

**[SS: 16-windows-server-02.png]**
*AD Groups — infra-admins and readonly groups*

**[SS: 16-windows-server-03.png]**
*DNS Manager — ilwij.lab forward lookup zone with records*

**[SS: 16-windows-server-04.png]**
*Win10 — System Properties showing domain joined to ilwij.lab*

**[SS: 16-windows-server-05.png]**
*NPS — RADIUS Clients list showing all 7 network devices registered*

---

### Lessons Learned
- Running DNS on the same server as AD is the standard approach — AD relies heavily on DNS for service locator records (SRV), so having them co-located simplifies the setup significantly.
- The RADIUS shared secret must match exactly on both the NPS client config and the device config — even a single character difference will cause authentication to fail with a generic "Access-Reject" with no useful error message.
- AD groups (infra-admins vs readonly) give clean role separation — you can control who gets privilege 15 on switches vs who gets view-only, all from a single place.

---
---

## Article 17 — Docker Setup (Azure VM)
**Slug:** `/lab/phase1/docker`
**Category:** Server & Virtualization
**Difficulty:** Beginner

### Overview
The Azure VM (vm-web-lab) serves as the cloud-side endpoint for this lab — it's where the web portfolio will eventually be hosted. For now it runs Nginx and Docker, demonstrating basic cloud VM deployment and container runtime setup.

This VM is only accessible via the IPSec tunnel — it has a private IP (10.20.10.4) and uses the Azure NAT Gateway for outbound internet access.

**[DIAGRAM: Azure VM diagram showing vm-web-lab (10.20.10.4) in snet-vm subnet, connected to Azure VPN GW via vnet-lab, accessible from on-prem via IPSec tunnel.]**

---

### VM Specs

| Parameter | Value |
|---|---|
| VM Name | vm-web-lab |
| Size | Standard B2ats v2 (2 vCPU, 1 GiB RAM) |
| OS | Ubuntu 24.04 LTS |
| Private IP | 10.20.10.4 |
| Subnet | snet-vm (10.20.10.0/24) |
| Outbound | Azure NAT Gateway |
| Inbound | Via IPSec tunnel only (SSH from 10.x.x.x) |

---

### Configuration

**Docker Installation:**
```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker labadmin
sudo systemctl enable docker
sudo systemctl start docker

# Verify
docker --version
sudo systemctl status docker
```

**Nginx Installation:**
```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

# Custom landing page
echo "<h1>You've reached Azure territory 🌩️</h1>
<p>vm-web-lab | 10.20.10.4 | Australia East</p>" | \
sudo tee /var/www/html/index.html
```

---

### Evidence

**[SS: 17-docker-01.png]**
*vm-web-lab — `docker --version` + `systemctl status docker` showing Docker running*

**[SS: 17-docker-02.png]**
*vm-web-lab — `systemctl status nginx` showing Nginx active*

**[SS: 17-docker-03.png]**
*Browser — Nginx landing page accessible at http://10.20.10.4 from lab network via tunnel*

**[SS: 17-docker-04.png]**
*vm-web-lab — `hostname` + `ifconfig` showing hostname and private IP 10.20.10.4*

---

### Lessons Learned
- The custom Nginx landing page ("You've reached Azure territory") is intentionally simple but effective as a proof-of-concept — it visually confirms that traffic from on-prem actually reaches the Azure VM through the tunnel.
- vm-web-lab has no public IP for inbound traffic by design — this is more secure and forces all access through the IPSec tunnel, which is how you'd manage cloud infrastructure in a real zero-trust environment.
- Docker is installed and ready for future phases — Phase 2 will deploy the web portfolio as a containerized app on this VM.

---
---

# ☁️ CLOUD / AZURE

---

## Article 18 — Azure Hybrid Cloud Setup
**Slug:** `/lab/phase1/azure-hybrid`
**Category:** Cloud / Azure
**Difficulty:** Intermediate

### Overview
The Azure portion of this lab simulates a hybrid cloud environment — on-prem infrastructure extended into Azure. This article covers the Azure infrastructure setup: resource group, virtual network, subnets, NSG, and the VM.

**[DIAGRAM: Azure infrastructure diagram — RG-Lab containing: vnet-lab (10.20.0.0/16) → snet-vm (10.20.10.0/24) with vm-web-lab + GatewaySubnet with vpngw-lab. Show NAT Gateway for outbound.]**

---

### Resource Group Overview

Resources in RG-Lab (Australia East):

| Resource | Type | Purpose |
|---|---|---|
| vnet-lab | Virtual Network | 10.20.0.0/16 |
| snet-vm | Subnet | 10.20.10.0/24 (VMs) |
| GatewaySubnet | Subnet | Azure VPN Gateway requirement |
| vpngw-lab | VPN Gateway | IPSec endpoint |
| lng-onprem | Local Network Gateway | Represents on-prem (149.129.220.212) |
| IPSec_Palo | Connection | IPSec tunnel to PA-HQ |
| natgw-lab | NAT Gateway | Outbound internet for VMs |
| pip-natgw-lab | Public IP | NAT Gateway public IP |
| pip-vpngw-lab | Public IP | VPN Gateway public IP (20.11.94.68) |
| vm-web-lab | Virtual Machine | Ubuntu 24.04, 10.20.10.4 |
| vm-web-lab-nsg | NSG | Network security for vm-web-lab |

---

### Key Configuration

**Virtual Network:**
```
Name          : vnet-lab
Address Space : 10.20.0.0/16

Subnets:
  snet-vm        : 10.20.10.0/24
  GatewaySubnet  : 10.20.0.0/27 (Azure requirement)
```

**NSG Rules (vm-web-lab-nsg):**
```
Inbound:
  Priority 100 — Allow-SSH — TCP/22 — Source: Any → 10.20.10.4

  (All other inbound blocked by default DenyAllInBound)

Outbound:
  Default Azure rules (allow VNet + Internet outbound)
```

**Local Network Gateway (represents on-prem):**
```
Name          : lng-onprem
IP Address    : 149.129.220.212  ← WireGuard VM public IP
Address Space : 10.10.10.0/24, 10.10.20.0/24,
                10.10.30.0/24, 10.10.99.0/24
```

---

### Evidence

**[SS: 18-azure-hybrid-01.png]**
*Azure Portal — RG-Lab overview showing all resources*

**[SS: 18-azure-hybrid-02.png]**
*Azure Portal — vnet-lab showing address space and subnets*

**[SS: 18-azure-hybrid-03.png]**
*Azure Portal — vm-web-lab-nsg showing inbound security rules*

**[SS: 18-azure-hybrid-04.png]**
*Azure Portal — vm-web-lab overview showing Running status, private IP, subnet*

---

### Lessons Learned
- GatewaySubnet must be named exactly "GatewaySubnet" — Azure requires this specific name for the subnet that hosts the VPN Gateway, and won't let you deploy the gateway to any other subnet name.
- The NSG only allows SSH (port 22) inbound — no HTTP/HTTPS inbound from internet, because the web server is only meant to be accessed via the IPSec tunnel. This is intentional security design.
- Australia East was chosen purely because it was one of the free tier eligible regions at the time — in a real deployment you'd pick based on latency to your users.

---
---

## Article 19 — Azure IPSec Connection
**Slug:** `/lab/phase1/azure-ipsec`
**Category:** Cloud / Azure
**Difficulty:** Expert

### Overview
This article covers the IPSec connection between the on-prem Palo Alto and Azure VPN Gateway — including the WireGuard workaround needed to solve the CGNAT problem. The actual tunnel configuration was covered in Article 06 (IPSec HQ ↔ Azure), so this article focuses on the Azure side and the end-to-end verification.

*(For the full WireGuard workaround explanation, see Article 06)*

**[DIAGRAM: Connection status diagram showing the full path: PA-HQ → WireGuard VM (149.129.220.212) → Azure VPN Gateway (20.11.94.68) → vnet-lab → vm-web-lab. Show IPSec_Palo connection status: Connected.]**

---

### Azure VPN Gateway Configuration

**VPN Gateway:**
```
Name      : vpngw-lab
SKU       : VpnGw1
Type      : Route-based (required for IKEv2)
Public IP : 20.11.94.68
```

**Connection (IPSec_Palo):**
```
Name                    : IPSec_Palo
Virtual Network Gateway : vpngw-lab
Local Network Gateway   : lng-onprem
Connection Type         : Site-to-Site (IPSec)
Shared Key              : <psk>

IKEv2 Custom Policy:
  IKE Encryption   : AES256
  IKE Integrity    : SHA256
  DH Group         : DHGroup14
  IPSec Encryption : AES256
  IPSec Integrity  : SHA256
  PFS Group        : None
  SA Lifetime      : 3600 seconds
```

---

### End-to-End Verification

Connection established when:
1. WireGuard tunnel between PA-HQ and Ubuntu VM is UP
2. Azure sees source IP `149.129.220.212` for IKE negotiation
3. PA-HQ IPSEC-TUNNEL-AZURE shows active
4. Azure IPSec_Palo connection shows "Connected"
5. Ping from on-prem to 10.20.10.4 succeeds

---

### Evidence

**[SS: 19-azure-ipsec-01.png]**
*Azure Portal — IPSec_Palo connection showing Status: Connected, Data in/out showing traffic*

**[SS: 19-azure-ipsec-02.png]**
*Azure Portal — lng-onprem showing IP 149.129.220.212 and on-prem address spaces*

**[SS: 19-azure-ipsec-03.png]**
*PA-HQ — IPSEC-TUNNEL-AZURE showing active status*

**[SS: 19-azure-ipsec-04.png]**
*Ubuntu WireGuard VM — `sudo wg show` showing active peer with recent handshake and data transfer*

**[SS: 19-azure-ipsec-05.png]**
*Ping from on-prem VPC (10.10.30.2) to Azure VM (10.20.10.4) — successful with ~116ms RTT*

---

### Lessons Learned
- The ~116ms ping RTT is expected — traffic goes from the lab through WireGuard to the Ubuntu VM, then IPSec to Azure Australia East. That's two layers of VPN plus geographic distance.
- "Data in/out" on the Azure connection page is a good quick health check — if you see bytes flowing, the tunnel is working. Zero bytes means something is wrong even if the status shows "Connected".
- Route-based VPN (on Azure side) is more flexible than policy-based — it supports IKEv2 and allows dynamic routing protocols (if you ever want to run BGP to Azure as well).

---
---

# 📊 MONITORING

---

## Article 20 — Prometheus & Grafana Stack
**Slug:** `/lab/phase1/prometheus-grafana`
**Category:** Monitoring
**Difficulty:** Intermediate

### Overview
The monitoring stack is deployed entirely on Kubernetes using the `kube-prometheus-stack` Helm chart. This gives me Prometheus, Grafana, Alertmanager, and node exporters all pre-configured with sensible defaults — plus the ability to add custom exporters (like SNMP) on top.

**[DIAGRAM: Monitoring stack architecture — K3s cluster running Prometheus (scrapes targets) → Grafana (visualizes) → Alertmanager (handles alerts). Show MetalLB IPs for each service.]**

---

### Stack Components

| Component | Pod | External IP | Port |
|---|---|---|---|
| Prometheus | prometheus-stack-kube-prom-prometheus-0 | 10.10.20.54 | 9090 |
| Grafana | prometheus-stack-grafana | 10.10.20.53 | 80 |
| Alertmanager | alertmanager-prometheus-stack-kube-prom | 10.10.20.52 | 9093 |
| Node Exporter | daemonset (all nodes) | — | 9100 |
| SNMP Exporter | snmp-exporter | 10.10.20.55 | 9116 |
| kube-state-metrics | — | — | 8080 |

---

### Installation

**Helm install (kube-prometheus-stack):**
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.service.type=LoadBalancer \
  --set grafana.service.loadBalancerIP=10.10.20.53 \
  --set prometheus.service.type=LoadBalancer \
  --set prometheus.service.loadBalancerIP=10.10.20.54 \
  --set alertmanager.service.type=LoadBalancer \
  --set alertmanager.service.loadBalancerIP=10.10.20.52
```

**Verify deployment:**
```bash
kubectl get all -n monitoring
kubectl get svc -n monitoring
```

---

### Evidence

**[SS: 20-prometheus-grafana-01.png]**
*Prometheus UI at http://10.10.20.54:9090/targets — showing all scrape targets*

**[SS: 20-prometheus-grafana-02.png]**
*Prometheus UI — PromQL query example showing metrics*

**[SS: 20-prometheus-grafana-03.png]**
*Grafana UI at http://10.10.20.53 — dashboard list showing available dashboards*

**[SS: 20-prometheus-grafana-04.png]**
*`kubectl get pods -n monitoring` — all pods in Running state*

---

### Lessons Learned
- Using Helm for the full kube-prometheus-stack saves hours of manual configuration — you get pre-built Grafana dashboards for Kubernetes cluster monitoring out of the box.
- Setting explicit `loadBalancerIP` values in the Helm values ensures the services always get the same IPs after restarts — critical for NTP client configs on network devices that reference these IPs.
- The kube-prometheus-stack includes recording rules and alerts pre-configured — this is useful even in a lab because it gives you real alerting experience without writing rules from scratch.

---
---

## Article 21 — SNMP Monitoring — All Devices
**Slug:** `/lab/phase1/snmp`
**Category:** Monitoring
**Difficulty:** Intermediate

### Overview
While the Kubernetes stack monitors the VMs and containers, I needed a way to monitor the network devices (switches and firewalls). SNMP is the universal protocol for this — virtually every network device supports it, and the Prometheus SNMP Exporter translates SNMP metrics into the Prometheus format.

All 7 network devices in the lab have SNMP v2c configured with the same community string, pointing to the SNMP Exporter as the collector.

**[DIAGRAM: SNMP monitoring flow — Network devices → SNMP v2c → SNMP Exporter (10.10.20.55:9116) → Prometheus scrapes → Grafana NOC dashboard.]**

---

### SNMP Device Inventory

| Device | IP | Location Tag |
|---|---|---|
| CoreHQ | 10.10.99.1 | HQ-Lab |
| ServerSwitch | 10.10.99.12 | HQ-Lab |
| AccesSwitchHQ | 10.10.99.13 | HQ-Lab |
| PA-HQ | 10.0.0.4 | HQ-Lab |
| Core-Branch | 10.10.199.1 | Branch-Lab |
| SW-Branch | 10.10.199.10 | Branch-Lab |
| FortiGate | 10.10.40.1 | Branch-Lab |

Community string: `ilwij-snmp` (read-only, ACL restricted to VLAN 20)

---

### Configuration

**Cisco Switches (CoreHQ example):**
```
snmp-server community ilwij-snmp RO 10
snmp-server location HQ-Lab
snmp-server contact ilham@ilwij.lab
access-list 10 permit 10.10.20.0 0.0.0.255
```

**PA-HQ — SNMP:**
```
Device > Setup > Operations > SNMP Setup
  Version      : V2c
  Community    : ilwij-snmp
  Permitted IPs: 10.10.20.0/24
```

**FortiGate — SNMP:**
```
config system snmp community
    edit 1
        set name "ilwij-snmp"
        config hosts
            edit 1
                set ip 10.10.20.55/32
            next
        end
    next
end
```

**SNMP Exporter — scrape config (in Prometheus):**
```yaml
- job_name: 'snmp'
  static_configs:
    - targets:
      - 10.10.99.1    # CoreHQ
      - 10.10.99.12   # ServerSwitch
      - 10.10.99.13   # AccessSwitch
      - 10.0.0.4      # PA-HQ
      - 10.10.199.1   # Core-Branch
      - 10.10.199.10  # SW-Branch
      - 10.10.40.1    # FortiGate
  metrics_path: /snmp
  params:
    module: [if_mib]
  relabel_configs:
    - source_labels: [__address__]
      target_label: __param_target
    - target_label: __address__
      replacement: 10.10.20.55:9116
```

---

### Evidence

**[SS: 21-snmp-01.png]**
*Prometheus targets — SNMP job showing all 7 devices UP (green)*

**[SS: 21-snmp-02.png]**
*Grafana — Lab NOC Overview dashboard showing network device status panel*

**[SS: 21-snmp-03.png]**
*CoreHQ — `show run | section snmp` confirming SNMP config*

**[SS: 21-snmp-04.png]**
*PA-HQ — SNMP configuration in Device > Operations*

**[SS: 21-snmp-05.png]**
*FortiGate — SNMP community configuration*

---

### Lessons Learned
- The ACL (`access-list 10 permit 10.10.20.0 0.0.0.255`) restricts SNMP polling to only the Container subnet — this prevents someone on the user VLAN from polling devices, which would be a security issue in production.
- `ip radius source-interface` equivalent for SNMP is `snmp-server trap-source` — ensuring SNMP responses come from the management interface rather than the best-path interface avoids intermittent connectivity issues.
- SNMP Exporter running in Kubernetes as a LoadBalancer service means it's reachable from any device in the lab — clean, no port forwarding needed.

---
---

## Article 22 — Grafana Dashboards
**Slug:** `/lab/phase1/grafana-dashboards`
**Category:** Monitoring
**Difficulty:** Beginner

### Overview
Grafana ties the entire monitoring stack together visually. This article walks through the dashboards configured in the lab — from the out-of-the-box Kubernetes dashboards to a custom NOC overview built specifically for this lab.

**[DIAGRAM: Grafana dashboard overview showing 3 main dashboards: K8s Cluster (top-level), Node Exporter (VM metrics), Lab NOC Overview (network devices). Show data flow from Prometheus → Grafana.]**

---

### Dashboards

| Dashboard | Source | Purpose |
|---|---|---|
| Kubernetes Cluster Overview | kube-prometheus-stack (default) | Cluster health, pod status, resource usage |
| Node Exporter Full | Community (Grafana ID: 1860) | Per-VM CPU, RAM, disk, network |
| Lab NOC Overview | Custom built | Network device status, interface metrics |

**Grafana access:** http://10.10.20.53

---

### Lab NOC Overview Dashboard

The custom NOC dashboard was built to give a single-pane view of all network devices in the lab. Key panels:

| Panel | Metric | Visualization |
|---|---|---|
| Device Status | SNMP up/down | Status grid (green/red) |
| Interface Traffic | ifInOctets/ifOutOctets | Time series per interface |
| CPU Usage | (PA/Forti via SNMP) | Gauge |
| Uptime | sysUpTime | Stat panel |

---

### Evidence

**[SS: 22-grafana-dashboards-01.png]**
*Grafana — Kubernetes Cluster dashboard showing cluster health and pod counts*

**[SS: 22-grafana-dashboards-02.png]**
*Grafana — Node Exporter dashboard showing CPU and RAM for lab VMs*

**[SS: 22-grafana-dashboards-03.png]**
*Grafana — Lab NOC Overview dashboard showing all network devices and metrics*

**[SS: 22-grafana-dashboards-04.png]**
*Alertmanager UI at http://10.10.20.52:9093 showing configured alerts*

---

### Lessons Learned
- Starting with community dashboards (Grafana dashboard library) saves hours — the Node Exporter Full dashboard (ID: 1860) is production-quality and shows everything you need about VM health.
- Building a custom NOC dashboard from scratch is a good learning exercise — it forces you to understand PromQL and how Prometheus labels work, which is valuable for real monitoring work.
- Alertmanager is configured but alerts in this lab are mostly informational — in production you'd wire it to PagerDuty, Slack, or email for on-call notifications.

---

# End of Phase 1 Lab Articles
> Total articles: 22
> All screenshots referenced as [SS: filename] — replace with actual image components
> All diagrams referenced as [DIAGRAM: description] — build using React Flow or similar
