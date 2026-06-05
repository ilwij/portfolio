# Ilham Wijaya — Lab Configuration Phase 1
**Last Updated: 2026-05-24**

## 1. Network Devices

### 1.1 CoreHQ

CoreHQ#show run
Building configuration...

Current configuration : 3571 bytes
!
! Last configuration change at 00:14:55 WIB Sun May 24 2026 by lab
! NVRAM config last updated at 00:14:57 WIB Sun May 24 2026 by lab
!
version 15.2
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption
service compress-config
!
hostname CoreHQ
!
boot-start-marker
boot-end-marker
!
!
!
username lab privilege 15 secret 5 $1$.wvv$I5URe0PHaxcoyel9ZvH8c/
aaa new-model
!
!
aaa authentication login default group radius local
aaa authentication login CONSOLE local
aaa authorization console
aaa authorization exec default group radius local
aaa authorization exec CONSOLE local
!
!
!
!
!
!
aaa session-id common
clock timezone WIB 7 0
!
!
!
!
!
!
ip dhcp excluded-address 10.10.30.1
!
ip dhcp pool User-DHCP
 network 10.10.30.0 255.255.255.0
 default-router 10.10.30.1
 dns-server 10.10.10.10 8.8.8.8
!
!
ip domain-name ilwij.lab
ip name-server 10.10.10.10
ip cef
no ipv6 cef
!
!
spanning-tree mode pvst
spanning-tree extend system-id
!
vlan internal allocation policy ascending
!
ip ssh time-out 60
ip ssh version 2
!
!
!
!
!
!
!
!
!
!
!
!
interface Loopback0
 ip address 10.0.0.10 255.255.255.255
!
interface Port-channel1
 switchport trunk allowed vlan 10,20,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
!
interface Port-channel2
 switchport trunk allowed vlan 30,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
!
interface Ethernet0/0
 no switchport
 ip address 172.16.0.13 255.255.255.252
 duplex auto
!
interface Ethernet0/1
 switchport trunk allowed vlan 10,20,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 1 mode active
!
interface Ethernet0/2
 switchport trunk allowed vlan 10,20,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 1 mode active
!
interface Ethernet0/3
 switchport access vlan 99
 switchport mode access
!
interface Ethernet1/0
 switchport trunk allowed vlan 30,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 2 mode active
!
interface Ethernet1/1
 switchport trunk allowed vlan 30,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 2 mode active
!
interface Ethernet1/2
!
interface Ethernet1/3
!
interface Vlan10
 ip address 10.10.10.1 255.255.255.0
!
interface Vlan20
 ip address 10.10.20.1 255.255.255.0
!
interface Vlan30
 ip address 10.10.30.1 255.255.255.0
!
interface Vlan50
 ip address 10.10.50.1 255.255.255.0
!
interface Vlan99
 ip address 10.10.99.1 255.255.255.0
!
router ospf 1
 router-id 10.0.0.10
 network 10.0.0.10 0.0.0.0 area 0
 network 10.10.10.0 0.0.0.255 area 0
 network 10.10.20.0 0.0.0.255 area 0
 network 10.10.30.0 0.0.0.255 area 0
 network 10.10.50.0 0.0.0.255 area 0
 network 10.10.99.0 0.0.0.255 area 0
 network 172.16.0.12 0.0.0.3 area 0
!
ip forward-protocol nd
!
no ip http server
no ip http secure-server
!
!
!
ip radius source-interface Vlan99
access-list 10 permit 10.10.20.0 0.0.0.255
!
!
snmp-server community ilwij-snmp RO 10
snmp-server location HQ-Lab
snmp-server contact ilham@ilwij.lab
!
!
radius server WIN-SERVER
 address ipv4 10.10.10.10 auth-port 1812 acct-port 1813
 key radius123
!
!
control-plane
!
!
line con 0
 authorization exec CONSOLE
 logging synchronous
 login authentication CONSOLE
line aux 0
line vty 0 4
 exec-timeout 60 0
 transport input ssh
!
ntp server 10.10.20.51
!
end


### 1.2 ServerSwitch
ServerSwitch#show run
Building configuration...

Current configuration : 2225 bytes
!
! Last configuration change at 22:31:58 WIB Sat May 23 2026
!
version 15.2
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption
service compress-config
!
hostname ServerSwitch
!
boot-start-marker
boot-end-marker
!
!
!
username lab privilege 15 secret 5 $1$Wh60$QWClxqSLL6J/xMfmNvuVA1
aaa new-model
!
!
aaa authentication login default group radius local
aaa authentication login CONSOLE local
aaa authorization console
aaa authorization exec default group radius local
aaa authorization exec CONSOLE local
!
!
!
!
!
!
aaa session-id common
clock timezone WIB 7 0
!
!
!
!
!
!
!
!
ip domain-name ilwij.lab
ip name-server 10.10.10.10
ip cef
no ipv6 cef
!
!
!
spanning-tree mode rapid-pvst
spanning-tree extend system-id
!
vlan internal allocation policy ascending
!
ip ssh time-out 60
ip ssh version 2
!
!
!
!
!
!
!
!
!
!
!
!
interface Port-channel1
 switchport trunk allowed vlan 10,20,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
!
interface Ethernet0/0
 switchport trunk allowed vlan 10,20,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 1 mode active
!
interface Ethernet0/1
 switchport trunk allowed vlan 10,20,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 1 mode active
!
interface Ethernet0/2
!
interface Ethernet0/3
 switchport trunk allowed vlan 10,20,99
 switchport trunk encapsulation dot1q
 switchport mode trunk
!
interface Vlan99
 ip address 10.10.99.12 255.255.255.0
!
ip forward-protocol nd
!
no ip http server
no ip http secure-server
!
ip route 0.0.0.0 0.0.0.0 10.10.99.1
!
!
ip radius source-interface Vlan99
access-list 10 permit 10.10.20.0 0.0.0.255
!
!
snmp-server community ilwij-snmp RO 10
snmp-server location HQ-Lab
snmp-server contact ilham@ilwij.lab
!
!
radius server WIN-SERVER
 address ipv4 10.10.10.10 auth-port 1812 acct-port 1813
 key radius123
!
!
control-plane
!
!
line con 0
 authorization exec CONSOLE
 logging synchronous
 login authentication CONSOLE
line aux 0
line vty 0 4
 exec-timeout 60 0
 transport input ssh
!
ntp server 10.10.20.51
!
end

### 1.3 AccessSwitch
AccesSwitchHQ#show run
Building configuration...

Current configuration : 2210 bytes
!
! Last configuration change at 22:31:59 WIB Sat May 23 2026
!
version 15.2
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption
service compress-config
!
hostname AccesSwitchHQ
!
boot-start-marker
boot-end-marker
!
!
!
username lab privilege 15 secret 5 $1$.0t8$UjcJ3/f88IRdJF7W9esK2.
aaa new-model
!
!
aaa authentication login default group radius local
aaa authentication login CONSOLE local
aaa authorization console
aaa authorization exec default group radius local
aaa authorization exec CONSOLE local
!
!
!
!
!
!
aaa session-id common
clock timezone WIB 7 0
!
!
!
!
!
!
!
!
ip domain-name ilwij.lab
ip name-server 10.10.10.10
ip cef
no ipv6 cef
!
!
spanning-tree mode pvst
spanning-tree extend system-id
!
vlan internal allocation policy ascending
!
ip ssh time-out 60
ip ssh version 2
!
!
!
!
!
!
!
!
!
!
!
!
interface Port-channel1
 switchport trunk allowed vlan 30,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
!
interface Ethernet0/0
 switchport trunk allowed vlan 30,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 1 mode active
!
interface Ethernet0/1
 switchport trunk allowed vlan 30,99
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 99
 switchport mode trunk
 channel-group 1 mode active
!
interface Ethernet0/2
 switchport access vlan 30
 switchport mode access
!
interface Ethernet0/3
 switchport access vlan 30
 switchport mode access
!
interface Vlan99
 ip address 10.10.99.13 255.255.255.0
!
ip forward-protocol nd
!
no ip http server
no ip http secure-server
!
ip route 0.0.0.0 0.0.0.0 10.10.99.1
!
!
ip radius source-interface Vlan99
access-list 10 permit 10.10.20.0 0.0.0.255
!
!
snmp-server community ilwij-snmp RO 10
snmp-server location HQ-Lab
snmp-server contact ilham@ilwij.lab
!
!
radius server WIN-SERVER
 address ipv4 10.10.10.10 auth-port 1812 acct-port 1813
 key radius123
!
!
control-plane
!
!
line con 0
 authorization exec CONSOLE
 logging synchronous
 login authentication CONSOLE
line aux 0
line vty 0 4
 exec-timeout 60 0
 transport input ssh
!
ntp server 10.10.20.51
!
end

### 1.4 Core-Branch
Core-Branch#sh run
Building configuration...

Current configuration : 2627 bytes
!
! Last configuration change at 15:31:55 UTC Sat May 23 2026
!
version 15.2
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption
service compress-config
!
hostname Core-Branch
!
boot-start-marker
boot-end-marker
!
!
!
username lab privilege 15 secret 5 $1$Imqr$4dLbcFu4y/dRqAle.Bgt80
aaa new-model
!
!
aaa authentication login default group radius local
aaa authentication login CONSOLE local
aaa authorization console
aaa authorization exec default group radius local
aaa authorization exec CONSOLE local
!
!
!
!
!
!
aaa session-id common
!
!
!
!
!
!
ip dhcp excluded-address 10.10.40.1
!
ip dhcp pool Branch-User-DHCP
 network 10.10.40.0 255.255.255.0
 default-router 10.10.40.1
 dns-server 10.10.10.10 8.8.8.8
!
!
ip domain-lookup source-interface Vlan199
ip domain-name ilwij.lab
ip name-server 10.10.10.10
ip cef
no ipv6 cef
!
!
spanning-tree mode pvst
spanning-tree extend system-id
!
vlan internal allocation policy ascending
!
ip ssh version 2
!
!
!
!
!
!
!
!
!
!
!
!
interface Port-channel1
 switchport trunk allowed vlan 40,199
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 199
 switchport mode trunk
!
interface Ethernet0/0
 no switchport
 ip address 172.16.1.17 255.255.255.252
 duplex auto
!
interface Ethernet0/1
 switchport access vlan 199
 switchport mode access
!
interface Ethernet0/2
 switchport trunk allowed vlan 40,199
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 199
 switchport mode trunk
 channel-group 1 mode active
!
interface Ethernet0/3
 switchport trunk allowed vlan 40,199
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 199
 switchport mode trunk
 channel-group 1 mode active
!
interface Vlan40
 ip address 10.10.40.1 255.255.255.0
!
interface Vlan199
 ip address 10.10.199.1 255.255.255.0
!
router ospf 1
 router-id 172.16.1.17
 network 10.10.40.0 0.0.0.255 area 0
 network 10.10.199.0 0.0.0.255 area 0
 network 172.16.1.16 0.0.0.3 area 0
!
ip forward-protocol nd
!
no ip http server
no ip http secure-server
!
!
!
access-list 10 permit 10.10.20.0 0.0.0.255
!
!
snmp-server community ilwij-snmp RO 10
snmp-server trap-source Vlan199
snmp-server source-interface informs Vlan199
snmp-server location Branch-Lab
snmp-server contact ilham@ilwij.lab
!
!
radius server WIN-SERVER
 address ipv4 10.10.10.10 auth-port 1812 acct-port 1813
 key radius123
!
!
control-plane
!
!
line con 0
 authorization exec CONSOLE
 logging synchronous
 login authentication CONSOLE
line aux 0
line vty 0 4
 exec-timeout 60 0
 transport input ssh
!
ntp server 10.10.20.51 source Vlan199
!
end

### 1.5 SW-Branch
SW_Branch#sh run
Building configuration...

Current configuration : 2087 bytes
!
! Last configuration change at 15:31:54 UTC Sat May 23 2026
!
version 15.2
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption
service compress-config
!
hostname SW_Branch
!
boot-start-marker
boot-end-marker
!
!
!
username lab privilege 15 secret 5 $1$r2w.$jGJTVvrP.GmcPaDU/0WVH1
aaa new-model
!
!
aaa authentication login default group radius local
aaa authentication login CONSOLE local
aaa authorization console
aaa authorization exec default group radius local
aaa authorization exec CONSOLE local
!
!
!
!
!
!
aaa session-id common
!
!
!
!
!
!
!
!
ip domain-name ilwij.lab
ip name-server 10.10.10.10
ip cef
no ipv6 cef
!
!
spanning-tree mode pvst
spanning-tree extend system-id
!
vlan internal allocation policy ascending
!
ip ssh version 2
!
!
!
!
!
!
!
!
!
!
!
!
interface Port-channel1
 switchport trunk allowed vlan 40,199
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 199
 switchport mode trunk
!
interface Ethernet0/0
 switchport access vlan 40
 switchport mode access
!
interface Ethernet0/1
!
interface Ethernet0/2
 switchport trunk allowed vlan 40,199
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 199
 switchport mode trunk
 channel-group 1 mode active
!
interface Ethernet0/3
 switchport trunk allowed vlan 40,199
 switchport trunk encapsulation dot1q
 switchport trunk native vlan 199
 switchport mode trunk
 channel-group 1 mode active
!
interface Vlan199
 ip address 10.10.199.10 255.255.255.0
!
ip forward-protocol nd
!
no ip http server
no ip http secure-server
!
ip route 0.0.0.0 0.0.0.0 10.10.199.1
!
!
access-list 10 permit 10.10.20.0 0.0.0.255
!
!
snmp-server community ilwij-snmp RO 10
snmp-server location Branch-Lab
snmp-server contact ilham@ilwij.lab
!
!
radius server WIN-SERVER
 address ipv4 10.10.10.10 auth-port 1812 acct-port 1813
 key radius123
!
!
control-plane
!
!
line con 0
 authorization exec CONSOLE
 logging synchronous
 login authentication CONSOLE
line aux 0
line vty 0 4
 transport input ssh
!
ntp server 10.10.20.51 source Vlan199
!
end

## 2. Firewall

### 2.1. Palo Alto
This XML file does not appear to have any style information associated with it. The document tree is shown below.
<config version="10.0.0" urldb="paloaltonetworks">
<mgt-config>
<users>
<entry name="admin">
<phash>$1$nljvnqmp$mgch99MVBoPp0xMcQryth1</phash>
<permissions>
<role-based>
<superuser>yes</superuser>
</role-based>
</permissions>
</entry>
</users>
<password-complexity>
<enabled>yes</enabled>
<minimum-length>8</minimum-length>
</password-complexity>
</mgt-config>
<shared>
<application/>
<application-group/>
<service/>
<service-group/>
<botnet>
<configuration>
<http>
<dynamic-dns>
<enabled>yes</enabled>
<threshold>5</threshold>
</dynamic-dns>
<malware-sites>
<enabled>yes</enabled>
<threshold>5</threshold>
</malware-sites>
<recent-domains>
<enabled>yes</enabled>
<threshold>5</threshold>
</recent-domains>
<ip-domains>
<enabled>yes</enabled>
<threshold>10</threshold>
</ip-domains>
<executables-from-unknown-sites>
<enabled>yes</enabled>
<threshold>5</threshold>
</executables-from-unknown-sites>
</http>
<other-applications>
<irc>yes</irc>
</other-applications>
<unknown-applications>
<unknown-tcp>
<destinations-per-hour>10</destinations-per-hour>
<sessions-per-hour>10</sessions-per-hour>
<session-length>
<maximum-bytes>100</maximum-bytes>
<minimum-bytes>50</minimum-bytes>
</session-length>
</unknown-tcp>
<unknown-udp>
<destinations-per-hour>10</destinations-per-hour>
<sessions-per-hour>10</sessions-per-hour>
<session-length>
<maximum-bytes>100</maximum-bytes>
<minimum-bytes>50</minimum-bytes>
</session-length>
</unknown-udp>
</unknown-applications>
</configuration>
<report>
<topn>100</topn>
<scheduled>yes</scheduled>
</report>
</botnet>
<certificate>
<entry name="PA-Root-CA">
<subject-hash>725233d6</subject-hash>
<issuer-hash>725233d6</issuer-hash>
<not-valid-before>May 24 19:36:33 2026 GMT</not-valid-before>
<issuer>/CN=PA-Root-CA</issuer>
<not-valid-after>May 24 19:36:33 2027 GMT</not-valid-after>
<common-name>PA-Root-CA</common-name>
<expiry-epoch>1811187393</expiry-epoch>
<ca>yes</ca>
<subject>/CN=PA-Root-CA</subject>
<public-key>-----BEGIN CERTIFICATE----- MIICxTCCAa2gAwIBAgIEWK6HlDANBgkqhkiG9w0BAQsFADAVMRMwEQYDVQQDEwpQ QS1Sb290LUNBMB4XDTI2MDUyNDE5MzYzM1oXDTI3MDUyNDE5MzYzM1owFTETMBEG A1UEAxMKUEEtUm9vdC1DQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB ANZy4tXFbh+Vy+Z1fWHQeUGGZ6PfQKS8KY3gaz8hpMdJPqm4Ovc66u7UEybKYOvc +T1CLYRkKThxXqz1SuEbJhOtvIbKoNPmDVA2OqAD3EbMZ9LmG2MH4ZQf12laEhf6 KjD4SjlrwaAvThnLVA90yU8bVdY3Y4jGe0+wSujCB+vqL+SaZpK/Rvnu8LuMYdA5 Tgv9Y3MHVtcZSU99XPTwKazy1p6woLuzd8eHggvfkJZc14uyL1k0yIT2hE7CrSvh X7iGpncSIuS0jdoTPTsBQDzBa4I6mFTLz1nqRh4H8TSnnpkJuD//IRruLs8tMfPp 17EFnd3cRMTZkDw+VysPiL0CAwEAAaMdMBswDAYDVR0TBAUwAwEB/zALBgNVHQ8E BAMCAgQwDQYJKoZIhvcNAQELBQADggEBAA5uMU5w2lDggsJayrt3rz4HcDOdH5Mj wJq6RETfaKMemtjTZ41KbxGPkO6+Cwr1NEVgizxU1THRYkYJDdp+qxrO6ugHtJe6 JLgRvKnKzBqAepVYeGqeh5qie9xAKM4LI6TJFF5qInFlj1v57AglZjkQfBA9VeJl UbwKvpP6ptzBPT2VPYHALIc6lAG1KOdIf4K+9E5w5DvWGKe4Uh/FjYJUL92bO1I4 pBGVrJRln0P0BrZJukptE3gRfyyeshVe4gfaH0C64/RCCA28TPXCSzIX4zY5qjXh DlzW9sgDRBXUPbb7EdBRrdeEuWDDMwdG4dBhA4kezAJmIP0zVzqMc1U= -----END CERTIFICATE----- </public-key>
<algorithm>RSA</algorithm>
<private-key>-AQ==GA1OdjIcPux3AwyN8Sd6fw0vjxY=wfL5Zc+wUAak+B7CnAVY6NdutYWtt67XvF+yGHFGS+vmQugtSrA952XGaQ20AVyRO55ToHu6mHviNU12/nmahauYUnz/0th7bc0iuSb1ZdtNkL2/dn8D5pDvSp9lc+1mxgQIGuxzcMvV0GT+R6RyBeRLVenm5PJRwNZmFPRGhyuOTWs7wqqqPS5PnvdwqjZZeemGbBmCKgFbuzX3Nxak0S1lrh7Q5EXZJluob4jFmkdYNqPC+ItMccDC4naG+PgOoyYfw+XDLVMDgLX8Ijs8cmX5t/NOYMIztoc/4TosMcKjs/zAUiKuM41LpEuImZeX1F8/8OBcveLLbujbQUIuoqJt9GvNZzegyYP8LnE47gmLzGqshzyFOlgRXVR5hvcXgD/VP96UUhBQ8lw+Um4mUvhkP61WY7Kr8sEnYYNagyoAMo8tjvBjWJt/qePHGyycfGUcNanUAg813H6hsvimN4LvhoOABxmQ0NcYp4hSoTigon1ugX1mIY2zQRLLdqZ3wP8wJ/078TEOEuoCncPw4Q1aKote5/ZqA920Kp2Bu66iFGuf7AYMZdmNUmiSaFhP0KiMS7Wmahu+k7pM0uqqDYeghKu5zZJ+f1eJgHtg/HniQ4GxuHjaqBW6+Df635bySp3M0B59VoQ256tpwn4jxOnkkuw19aYrvjCXkvJp4t7yCiEMi89KrBCma9EQVVCyJ/rWSatfEv/DjrvJib3ODkHXwxt7flXUQvcuLDEwpUCBk8wv01ksonvFHg2B0d7pvHLrQll6aJrQrLitB6npdc+5EJbG/Rz8ZVeg0Fwc26/aKVSP61RtjskbFEHfHkzg9DfQrI+koBa/SYHbSwqE38lHjOGbdJn49fn3SmkaLkklYxNjJNEbLHYxNrWMvueoVZDWCgd4SN4ZI0nb5ikuaHJ5uz6gVzxgX9HhKvwuh0HX+/LPsBq9MqKg6OVNvG2j1d/31+mnV9tlX1fx74RddGMpoPdFV2M24/pzxIEktJdA2KNEv3ubWyOxhA4dIai3FxJzb7xGTQ5SNAXUf2OgNiQctKB40NgkTDEuk9Lsr/55nLV1IJEOcgTJbBE7U3zTccwRlZkSBMhr/hvCVmwtEi4+uvmdhCxss3BYkIESMc2+LsE+3jsSEomrsX10FHR5N/0KT/IpXWpA2x8O+s1a/5ykkbedAS5QHCu6H38vntNwS+cIniys6xQlwx4vH/rwgmEcz9bosjE50VhoTUEMVYEp4fqFnRxPBedZpCXrl1hlJn7XluIvWAxJC9qa4kiazDjBeDE7wSHLvr8HHemzv3dSvu26bk9Bht4oMuHqy/BneZS8+Xk0g+WrUJsFaQiZwkJiiEDzmtW6cgfyITapR2390ytzcwn01NmDXPEgPOcbP5wecW2zyn8o1Jo+3tmjRJ+Ut6aEt+9N1vEZ04bNLdTSEne46cEWo8io2CjrMc+ShTcOnTPaZt5vZW7dImlLRO+zfN5LO8jtTJF0RSpMhfV+mjUHPiva/0C7LPYqBvzw7G2N3UYKFieFYRo2nJLa8w6NsV+92F8aZswJ5sFzBovP4gfk2hX6MKpAcqPeK2YU5BELeQMsIo6Djrex1WcTJ8la0EW552C93HwSIJpikyshG88bYxUIzkvqi0iJ48lkhrcn1eaLgIfwCOVoyrP3d6JNE2jsj1xZLdrtRYOcFsS0QquZfWNwswxIcJBOk6YdYZ/Xsv/5Qte9qRDk4lFnH3moPa+g7nawvEWfxR5zDc1O+FfvOCA7eBxKjxW8LrI95JPKaocZSZ/YHjY2up58qV1nI5+UgxMrAylEqHszy4i7iKPQMN7YW0eOeQqns1QJiKH5sPqSizIMyrn80aX64BI2myda8RD8IUdTq3AIGfdjDYM578F/rnQJ+mab2DEOAPHJW60EKi//GH9vEkssi1JpHm2rSGGaGAQTsPzcSyE3yMYegfDu9D9+4Za8Sard3ueR2rQST7ZzXOyRkNdE/WUYjD5rFf+rhlMH5Ize1Yq6L+FswwV2wU+j4iZK1l/NgOP1E4GJ+3SRqJSIOdM+M+6Fm06Gvc5lb2CNXsm2GQeDdXjiDm098sY7Z57V68gizemhGkeC1XzyUSXcQeCz1+bPJh29bQv5vSQ0dtiByfHV2nam0QaeDbDbYC0n7cVDAGlXh7ktNpFb58rfy8M+h19Pt+y28b+uFv0UGENMRO5QMRZYEbXPz768elncM5QURGMHfUIzFVQpTsyQajOr</private-key>
</entry>
<entry name="PA-Device-VPN">
<subject-hash>0b2e4e17</subject-hash>
<issuer-hash>725233d6</issuer-hash>
<not-valid-before>Apr 13 16:45:50 2026 GMT</not-valid-before>
<issuer>/CN=PA-Root-CA</issuer>
<not-valid-after>Apr 13 16:45:50 2027 GMT</not-valid-after>
<common-name>192.168.1.102</common-name>
<expiry-epoch>1807634750</expiry-epoch>
<ca>no</ca>
<subject>/CN=192.168.1.102</subject>
<public-key>-----BEGIN CERTIFICATE----- MIIDGDCCAgCgAwIBAgIEWK6HkjANBgkqhkiG9w0BAQsFADAVMRMwEQYDVQQDEwpQ QS1Sb290LUNBMB4XDTI2MDQxMzE2NDU1MFoXDTI3MDQxMzE2NDU1MFowGDEWMBQG A1UEAxMNMTkyLjE2OC4xLjEwMjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC ggEBAO0QbK9qRxnrLe2GITxhbIMk+i05+wRsYoZhcCv7oPxOk1Whg6sFPOZ1LWYk FXM/PGlveoNCoLhAqoDKtcoliMsDZ8+6Txh5KUHMT6ZEJOv2cakL5bWDdQhvTqH6 y/IKTzbeaRfGC+IX/bs2kl0pGdhiDj7je/3F0XOcgNWeV8uVVB8QLB/47OCrXCic uWish86k4h6jCney/AZ+wCkUjtxWsww8l+AFJTOnNV800pyDQjL2iY+PXoRN/zKK zvubqMp10YO/hIYU6Z8kEELONt0IIov9zB8S4OEbraWDgib3B8LQqwIl77ZlJ3sE +sM7LQKYnxTmABEmHtVgwUZPMKMCAwEAAaNtMGswCQYDVR0TBAIwADALBgNVHQ8E BAMCA7gwJwYDVR0lBCAwHgYIKwYBBQUHAwEGCCsGAQUFBwMCBggrBgEFBQcDBTAJ BgNVHSMEAjAAMB0GA1UdDgQWBBTu24+Vw1LaKHt+6k0YbMmz7NkVRzANBgkqhkiG 9w0BAQsFAAOCAQEAbvqmnj3aLzJALFFtX/njNHIFEjk2mvfdOOIGf3DEhKnqYrFk 3288HYEBk+WJoGD4Eozluo/6hgS16BDhUo98e7wtE3R2vOz3ov2oeqaX3VOTDrlc NLf/r1jxX9biSCCYIbr6NJL4Riwh+X4tgUt00Il9vyMmjHat4IiYwdT7N0kShUJi pOZ9zRYUWZohEYTNqassk5h6tvzr6rS6mqQ/pQa9OUoaDbfG0boQvCxNIeCOxjaZ ThvSGlrdpopT2GcZdosu23SAXsUYGOBWgle9oE1PPwZllNqGokCi//HKadcac6L8 HkoCwdoNw9DLX6+nsv+ndl6y+txDxIvRnfIHjQ== -----END CERTIFICATE----- </public-key>
<algorithm>RSA</algorithm>
<private-key>-AQ==mzX4v90yo1TfmlNWT7nGW7wIB/Q=wfL5Zc+wUAak+B7CnAVY6NdutYWtt67XvF+yGHFGS+v3hQ6NGerTNEn2/C/2TE21g9Ks+V31hdEINYQTuwSK9HONKxsMFJ41meaFR2nr9t1RqmLx9bkhw63iulHE6FJpsZvJJ6viTR3he4NprF+16hgJID9lR6LJf3R/Ingu8n9qzgo4fE+HfBGgqjsnYfQLB+sioIsVij3vd6+NR2dj4mGbkRuXdt1hh851S7+/xbZZsGwN1MqWAcVdoOxZxI3TejGzzuaKt8Mh9OmXIipMzVYFp/PSko4Xwd8jyZLqn5oek8Q/3/gSo/Z1x682qbAZFtXq6rsgm53uDMDnHSNnNrrYlkqgPwYumAwXcplQWrwU+3BCtINtDqYVWFbj+UDI1P7U9SaR+22lZczZe/ufZyK0yI2sL+Qgoi92KONUdwo3Q2GUBMuFUPMMra0HS7pX8Y1RmKjsVi6m+MUsn/kv6W0WBw3K2nLJa3xqLwvZNynawRiLG7pI5jtkGPlKliNkQeIE9TaxDes8ZfrLYQqt+Q9acuKRLFuiWK9zrPX0OjivfKcuK/kkZckgNQRxJVIMSKYctcDp0eQe9K0t9MrNgr+q3oP6ovDn0q75CfcYQq/v+W+4TGCj61GWG1DRoexX924NAbSno1pehVe7SvXvAdDiL+8rVMVYPUts+zhNaLq5j3yhAtLlzkhzI4jfAdx4+Mp2CQ6SXuPTtiT/7XXkTmBhpqGcOyxUWtXa+j+5Sv9Kd9h8GGtb9rzdV5Txu7R937me905eAlmvMKetn3fsbNLPFtLu6fy+Cb4xV48fl07wBabpozhzH7IyS1FeHOEAwN8P7R04eBbNvLYL5FXn4iYypkstubRCsCFFMuixd9r663fKUwA0iEDXM+XUTRM691sF6q3RPxiIh+w962MO5L/rQNWGqjY99isyz25oIWFAoaKzSo20UdUzVLJNY7ruk1qP8TgR5ga4/nP96Rycwjr2Vots1RawvaEhFhr9PCGrijXPh3Lx4YWQorIqXnXq73wyDUJc3YdhiI39lQbPWcBNBNmyNIwhU8LZ1bhIupPfXHcQvx77UBgOoQsNgk4kK1Cm0GM4SCjiAJN+YxTSNAJ2FSYUt3hRWSngqqV62W7C/N+KBXioGzJs7pWT+PHMMVjDHrBJbhkQqE1h+p/2jUeGIHbmGk2VkKPl8mna7D3wGLsIE4ylDaqhFNSgAdZ1fwwx9dRipT5Tg0eorvxu5Kni1q8aIcfKp82IrV9ppsmtwdlE+0aQbBNaeEU8gYpMh8GYiNlPu+D4PFodgNuivzB+mhOPJrOIeSpaoMj/M5CvjxUGgp3uRcIK3/8ITosGSGrgKR4gAJ7kYo2jLMG872XXKSJDxA9XzADUkUvygGvtV7X4KfYyfb5K4VP1exGGgpjJHn9B3VRwLD0/cxRUX/9wJIySxG9uL7wvjBdUhgcCcmywQCgJI+6E7izPR0L6XBgBvazqWJrK9hnwZ2BS+JFQOuTzXgR/3LZa9Li/lbn8T8bA+jqkYTm7xCdJPcvHdisQxIHBhsKOOmtuylVQiyILOlqkg6kAqXdkp2oymRVJmAiEEfuMyul15innAaWPPkp+70VNuzF0UIDvV3VQWJAUgk+pq41I6VVoBCyRAN4Q3+PI0XAZApUeNnOrZyXujnmAJ26gwm+L6FfGgMoR8VPvE2JAVQj25wG5lW6NdnEnIUt2VuOG5H+O+ZR970LlgB3V0MOetfiDrsBhCDyZLPGNGk4b1qOfcwssCZtKexGdWFXJqpiYPYxqKU1uEiEIj5v30qNJqOG4cXzBSJkWsAf5c5OwDJg0mCbFRiZ7ez5xN93CK2VT4WUxlcamC+HqjpTciSBwrBa2YcpTnzJpj0/u8SBAf6/dkNM4WLSb/aehZj1YLJu/ogzQqg5RPpOi6txBXLk/b7lahv2b660sunHgmzrfh0t4QMFQ8dlv+oa5N/eCTQ51KIdoNVP3KP0Tx0M6GFu07kCDgQQyZ7gzNohyN3pklCewORxiC1wSV9QzRmxVj7gbLqeqecUitYxVOo/TngZmMinQiJeMNsYtSuuMBr5hMmPuq0Vzxe5UgeXkGfmqVtDXhvpKtbr4dy5d9wMSWel4F6vNgxJK7CPNfuAZcA14A8ODLXvIKLfQMvfRTT715ntU9kFrEKNQw28vz6XeDuPosRLamnjUurIt4dBzoyB07PUylL67XNyKl8fZZOie7rvEnogP5TzCozaE</private-key>
</entry>
<entry name="PA-Device-VPN-Pub">
<subject-hash>5c2a2c03</subject-hash>
<issuer-hash>725233d6</issuer-hash>
<not-valid-before>May 24 19:27:21 2026 GMT</not-valid-before>
<issuer>/CN=PA-Root-CA</issuer>
<not-valid-after>May 24 19:27:21 2027 GMT</not-valid-after>
<common-name>149.129.220.212</common-name>
<expiry-epoch>1811186841</expiry-epoch>
<ca>no</ca>
<subject>/CN=149.129.220.212</subject>
<public-key>-----BEGIN CERTIFICATE----- MIIDGjCCAgKgAwIBAgIEWK6HkzANBgkqhkiG9w0BAQsFADAVMRMwEQYDVQQDEwpQ QS1Sb290LUNBMB4XDTI2MDUyNDE5MjcyMVoXDTI3MDUyNDE5MjcyMVowGjEYMBYG A1UEAxMPMTQ5LjEyOS4yMjAuMjEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB CgKCAQEApH6i2Gq0db4eN+AthcAPESOVriCt1Hux78nywLySG8s+rAeggcESXU9f MVdzPyYhFd6bqUF24Fzhrnx6zglFRorWTgDcpEGChYn/dAt075gPQg00vrP5COtU /+00/jmaflJ0U85RTRpyGnJXYEhPQAEPtywN0WjEMRxU2R6wTP9RvgJdv9QdZtQR DaSOrhb4rBwU3cjr9XsCNFVB7VGSO3M1QYso3D/6ZXK03MVTUG+somyGpJ9JRLM8 6Dul5lEpe05mEBoBvi2wvi4bCF4KSAXDOTlQV+ddjjs9CjGQUQwYQIcP41lGQJFf KSosOkVCBX58Upxvf5dSaMVFj6b+CwIDAQABo20wazAJBgNVHRMEAjAAMAsGA1Ud DwQEAwIDuDAnBgNVHSUEIDAeBggrBgEFBQcDAQYIKwYBBQUHAwIGCCsGAQUFBwMF MAkGA1UdIwQCMAAwHQYDVR0OBBYEFCoHlmJYChf3EFTG+xPYX+RpukUIMA0GCSqG SIb3DQEBCwUAA4IBAQBiMxVhWgJ7B1cx1S+GhRHpGf8rc2c9J+pN/ENRJDoHH9XR buXJTKcg+WYPuvc87cVaNJb5uHnkE9c8d4uNGDu+0klDD4lot35AbsAw6yY3di6n sXv0K1QBAWqYEup0DtSISrWUK1dMKfuE1oPA/hCUXru5Xu35RcWhpVFxZoMAbJ8B 4q9yGW2Mix/AzsCWbGL9VnkCKgnsFT7/z93Bdl1K+8AH72i5zRNSNz6c3ynP1DEP xFlwdGQwSl4aXyBB1E6J51MK5G3muCpXkoKuaXt1Mus7Y9j2RNS4dzPgQEIOQvZS TlGg3Y3ULD/JUO1b8mLH09/b/HMELpYWN5672pYA -----END CERTIFICATE----- </public-key>
<algorithm>RSA</algorithm>
<private-key>-AQ==avdzu2C9WmqRkZHtlmRWgVSzf/Q=wfL5Zc+wUAak+B7CnAVY6NdutYWtt67XvF+yGHFGS+vmQugtSrA952XGaQ20AVyRDOvYjz0v0gvhlANDQRenxUTi18oaATrXmt6f9l8E5DSMSnTS/jqf6LF41S+jd1OOT1S5UzGPA8S0gu+BqbnlRXbhyoP3fxGKGniqoysNP5uRvKj502Q12SxdgOhdX34oqWD3GcEaGcd8DtHQmme8MAzy5J6F0n4ttcNF+OMSnITS/qfmhWroyPogdNM8H5ri/qg/ANMnJbUjLTPX70f3W5YRXDuv+43K3jq/LypDwob53u0oILpO3rtlQDU7DMXzsJoT76pJVRxqVh9+95h0Ov83d1LKEPiz1phDjsV5tncxKDMAigqphLIcafj4MMEcoCLqxlRSGVRCWZZtWfluqqAVeXjCCrBw5nTgu1VkWSuaa50r7xK3rze8ezyTa4usd/DB9iUKmZwIxmIwtyD/AXN1CyL1/SuTnCHd9RByoPxKs72AVrIJ8A8t1wn98xgNyOCe02hoflI2Pt/52eUzfTKzM9+rQybfZT+nYVUKKFpOFE32bD1hI2sBpnCckiwbeIXZwHnvgRReIvt+2UVpYI3zEMBCauTkClqBEgCYtCGat7cRMYTedEuDoTlzNegIBp3eSRZbQioC41ghOxRmYREjilNNdWEj3Eb6iq4qSTqBruyqlQEb3r3ZN/mUQtmZED1NxGO66Pbnj4tZPqSMz8shxl2/kAI25X0F4HozvkRrP8f/5pY5OM3VdOzPrIKrpm3s4IMmpOq3eii806Zgk8LjO4z0swz7lU6wPWsVfGMrVIGQYeeto7BXGgChjMrlSH9aOdHiyKGqP5LV0Ve4UCkWYvPKkArCrIl5sLmbFFh+OrFnts2adx5pReG2inVDvGDzYeiC787HK8DQPpf3xMRADw7657kvyb+ZxIhQ3eglJ0C72Ixd9xATNNEu0+omxNz3RoEtX2WcR7I3hRlb4NaJwTKX7K4s2bpbXLjf6BMVaofFXMah0IP2ActZmHIxRvHmNBboxP3hPbtSIYOmyiGmZ1IjqRvV4pFyvGje09SI7Gc3fQKo+w64fsXgi6+KLNUc5DXsCSZc5edBQD0Hyhgutc3f6Rkrel8BtD1ZeYyceEdwGD8BkM3RlqJULImXJgWU/0Usd7Wg9hH2SClv8JbZKyF1/lCsEIBs2pcI+AkJ2kJ3QX5z1+xe9PXKthBMlgzId4XhF8mK5CQIM9DSp4W4+BPmTuGmmMK2pPIIaK7z03enNVJT0MBgQRlik2xGGnKPh2exKT+wEtrBC23ia9rX/cqLlEcoMAanhqFWN5EedEMbYKfJ4waV1dl8ldReVe6uNuj+bD9jgXPlW0su7ZcD1beyMWVyrpjOWT8qpWsnmt9MR54aTXcElYxAyOcQuSgt17l3GeDzbojcsCKkIU8hoHLTrKDc2Zxr/gIUzqpWgl8yw598EDq7A52WyaSk+J59jj2Rh5Dk8+6xTGTlyKeyk6q5a1BjKyq3zoV61p7SleIK97I+LdqHlFYHyMxiMZT1RfHgu2ushbRwAd66icyYm/xJhkAgDL1DgoVmrDRzAXwKEsNMM6y65CtRVPjX8DvBD3R9aXDsspGlqpdpC8/N2URQpi2Aro8SsVKz8EYfPrRjxBlGxMCgegNr/Wb1RIduo2R+f7FBnumBbyp1+Mie6N3exAU2VgDp1Bi9exipGCOZl60aAbuvVuKJh41kT6Er9axuqOQVb2KjtyI/FzCkIAcMDweyP1AawGDdDKbGUg+5cysWyK4C9ReRzLy06m75FEse/U3sMDhOweKCWf9SvI0JUoEN5kcasRwEmXgH4pEtlWgJJs7URN8qUnRQK0qgT/TaRjz9BMrm2TO8hRWOh+D7Uz43qzd+Uf6yUoSloPXEDGL0SsmimJgjsjysJezYEqJsfyYzTon7cWkwZFAeQy4VF+SYUuyMZmoXTh5QGZOVclf56oblSfn+r/5eANHNMKh3TjpoekA7vdLIduKJTcYF1JMSdcjU9/vBTizD+i1BouNy1ddDTkC3iNcRtjnHzl/EAK7j5v5EHFrD41HlRoJOqD7G8vtWjk2nkWHmtnlo+clwWWU8JWHxmjJSYv9yOcN277at0ObqsozqJbS9ai4GUlkCmpxH0bqy+KtO/mOOlzDthu3CDGdceeRWmG4zqSch17OsdMV2j+z02tjW61oUEhLCLOZi3eRfT1nFNqbf7pDq2vA/V/T2YiPB</private-key>
</entry>
</certificate>
<ssl-tls-service-profile>
<entry name="SSL Profile GP">
<protocol-settings>
<min-version>tls1-0</min-version>
<max-version>max</max-version>
</protocol-settings>
<certificate>PA-Device-VPN</certificate>
</entry>
</ssl-tls-service-profile>
<ssl-decrypt>
<forward-trust-certificate/>
<forward-untrust-certificate/>
<trusted-root-CA>
<member>PA-Root-CA</member>
</trusted-root-CA>
</ssl-decrypt>
<authentication-profile>
<entry name="LocalVPN">
<multi-factor-auth>
<mfa-enable>no</mfa-enable>
</multi-factor-auth>
<method>
<local-database/>
</method>
<allow-list>
<member>all</member>
</allow-list>
</entry>
<entry name="RADIUS-AUTH">
<multi-factor-auth>
<mfa-enable>no</mfa-enable>
</multi-factor-auth>
<method>
<radius>
<server-profile>WIN-SERVER-NPS</server-profile>
<checkgroup>yes</checkgroup>
</radius>
</method>
<allow-list>
<member>all</member>
</allow-list>
</entry>
</authentication-profile>
<local-user-database>
<user>
<entry name="VPN01">
<phash>$1$jwjwtrko$1dFfXA9iD8NJJPWnCucN81</phash>
</entry>
<entry name="VPN02">
<phash>$1$qsgrbdig$M5belw39yQXXcI/7Ju4fY1</phash>
</entry>
</user>
</local-user-database>
<server-profile>
<radius>
<entry name="WIN-SERVER-NPS">
<protocol>
<PAP/>
</protocol>
<server>
<entry name="WIN-SERVER">
<secret>-AQ==EBDGEKCmD53hNwxoie9Vv0dAQM8=UN1KHUEvDjZldfpPPq4wIQ==</secret>
<port>1812</port>
<ip-address>10.10.10.10</ip-address>
</entry>
</server>
</entry>
</radius>
</server-profile>
</shared>
<devices>
<entry name="localhost.localdomain">
<network>
<interface>
<ethernet>
<entry name="ethernet1/1">
<layer3>
<ip>
<entry name="192.168.1.101/24"/>
<entry name="192.168.1.102/32"/>
</ip>
<interface-management-profile>Ping</interface-management-profile>
<ndp-proxy>
<enabled>no</enabled>
</ndp-proxy>
<lldp>
<enable>no</enable>
</lldp>
</layer3>
</entry>
<entry name="ethernet1/3">
<layer3>
<ndp-proxy>
<enabled>no</enabled>
</ndp-proxy>
<ip>
<entry name="172.16.0.14/30"/>
</ip>
<interface-management-profile>Ping</interface-management-profile>
<lldp>
<enable>no</enable>
</lldp>
</layer3>
</entry>
</ethernet>
<loopback>
<units>
<entry name="loopback.1">
<adjust-tcp-mss>
<enable>no</enable>
</adjust-tcp-mss>
<ip>
<entry name="10.0.0.4/32"/>
</ip>
<interface-management-profile>Ping</interface-management-profile>
</entry>
</units>
</loopback>
<tunnel>
<units>
<entry name="tunnel.1">
<ipv6>
<enabled>yes</enabled>
</ipv6>
</entry>
<entry name="tunnel.2">
<ip>
<entry name="169.1.1.1/30"/>
</ip>
<interface-management-profile>Ping</interface-management-profile>
</entry>
<entry name="tunnel.3"/>
</units>
</tunnel>
</interface>
<profiles>
<monitor-profile>
<entry name="default">
<interval>3</interval>
<threshold>5</threshold>
<action>wait-recover</action>
</entry>
</monitor-profile>
<interface-management-profile>
<entry name="Allow-Mgmt">
<http>yes</http>
<https>yes</https>
<ssh>yes</ssh>
<ping>yes</ping>
</entry>
<entry name="Ping">
<ping>yes</ping>
</entry>
</interface-management-profile>
</profiles>
<ike>
<crypto-profiles>
<ike-crypto-profiles>
<entry name="default">
<encryption>
<member>aes-128-cbc</member>
<member>3des</member>
</encryption>
<hash>
<member>sha1</member>
</hash>
<dh-group>
<member>group2</member>
</dh-group>
<lifetime>
<hours>8</hours>
</lifetime>
</entry>
<entry name="Suite-B-GCM-128">
<encryption>
<member>aes-128-cbc</member>
</encryption>
<hash>
<member>sha256</member>
</hash>
<dh-group>
<member>group19</member>
</dh-group>
<lifetime>
<hours>8</hours>
</lifetime>
</entry>
<entry name="Suite-B-GCM-256">
<encryption>
<member>aes-256-cbc</member>
</encryption>
<hash>
<member>sha384</member>
</hash>
<dh-group>
<member>group20</member>
</dh-group>
<lifetime>
<hours>8</hours>
</lifetime>
</entry>
<entry name="IKE-CRYPTO-HQ">
<hash>
<member>sha256</member>
</hash>
<dh-group>
<member>group14</member>
</dh-group>
<encryption>
<member>des</member>
</encryption>
<lifetime>
<seconds>28800</seconds>
</lifetime>
</entry>
<entry name="IKE-CRYPTO-AZURE">
<hash>
<member>sha256</member>
</hash>
<dh-group>
<member>group14</member>
</dh-group>
<encryption>
<member>aes-256-cbc</member>
</encryption>
<lifetime>
<hours>8</hours>
</lifetime>
</entry>
</ike-crypto-profiles>
<ipsec-crypto-profiles>
<entry name="default">
<esp>
<encryption>
<member>aes-128-cbc</member>
<member>3des</member>
</encryption>
<authentication>
<member>sha1</member>
</authentication>
</esp>
<dh-group>group2</dh-group>
<lifetime>
<hours>1</hours>
</lifetime>
</entry>
<entry name="Suite-B-GCM-128">
<esp>
<encryption>
<member>aes-128-gcm</member>
</encryption>
<authentication>
<member>none</member>
</authentication>
</esp>
<dh-group>group19</dh-group>
<lifetime>
<hours>1</hours>
</lifetime>
</entry>
<entry name="Suite-B-GCM-256">
<esp>
<encryption>
<member>aes-256-gcm</member>
</encryption>
<authentication>
<member>none</member>
</authentication>
</esp>
<dh-group>group20</dh-group>
<lifetime>
<hours>1</hours>
</lifetime>
</entry>
<entry name="IPSEC-CRYPTO-HQ">
<esp>
<authentication>
<member>sha256</member>
</authentication>
<encryption>
<member>des</member>
</encryption>
</esp>
<lifetime>
<seconds>3600</seconds>
</lifetime>
<dh-group>group14</dh-group>
</entry>
<entry name="IPSEC-CRYPTO-AZURE">
<esp>
<authentication>
<member>sha256</member>
</authentication>
<encryption>
<member>aes-256-cbc</member>
</encryption>
</esp>
<lifetime>
<seconds>3600</seconds>
</lifetime>
<dh-group>group14</dh-group>
</entry>
</ipsec-crypto-profiles>
<global-protect-app-crypto-profiles>
<entry name="default">
<encryption>
<member>aes-128-cbc</member>
</encryption>
<authentication>
<member>sha1</member>
</authentication>
</entry>
</global-protect-app-crypto-profiles>
</crypto-profiles>
<gateway>
<entry name="IKE-GW-BRANCH">
<authentication>
<pre-shared-key>
<key>-AQ==Ib0S3Bg/dA7nbye3jrOcitlyp1c=dy3TVto9+oiffckRkFnt4A==</key>
</pre-shared-key>
</authentication>
<protocol>
<ikev1>
<dpd>
<enable>yes</enable>
</dpd>
<ike-crypto-profile>IKE-CRYPTO-HQ</ike-crypto-profile>
<exchange-mode>main</exchange-mode>
</ikev1>
<ikev2>
<dpd>
<enable>yes</enable>
</dpd>
<ike-crypto-profile>IKE-CRYPTO-HQ</ike-crypto-profile>
</ikev2>
<version>ikev1</version>
</protocol>
<local-address>
<ip>192.168.1.101/24</ip>
<interface>ethernet1/1</interface>
</local-address>
<protocol-common>
<nat-traversal>
<enable>no</enable>
</nat-traversal>
<fragmentation>
<enable>no</enable>
</fragmentation>
<passive-mode>no</passive-mode>
</protocol-common>
<peer-address>
<ip>192.168.1.110</ip>
</peer-address>
<peer-id>
<id>192.168.1.110</id>
<type>ipaddr</type>
</peer-id>
</entry>
<entry name="IKE-GW-AZURE">
<authentication>
<pre-shared-key>
<key>-AQ==Ib0S3Bg/dA7nbye3jrOcitlyp1c=dy3TVto9+oiffckRkFnt4A==</key>
</pre-shared-key>
</authentication>
<protocol>
<ikev1>
<dpd>
<enable>yes</enable>
</dpd>
</ikev1>
<ikev2>
<dpd>
<enable>yes</enable>
</dpd>
<ike-crypto-profile>IKE-CRYPTO-AZURE</ike-crypto-profile>
</ikev2>
<version>ikev2</version>
</protocol>
<local-address>
<ip>192.168.1.101/24</ip>
<interface>ethernet1/1</interface>
</local-address>
<protocol-common>
<nat-traversal>
<enable>yes</enable>
</nat-traversal>
<fragmentation>
<enable>no</enable>
</fragmentation>
<passive-mode>no</passive-mode>
</protocol-common>
<peer-address>
<dynamic/>
</peer-address>
<peer-id>
<id>20.11.94.68</id>
<type>ipaddr</type>
</peer-id>
</entry>
</gateway>
</ike>
<qos>
<profile>
<entry name="default">
<class-bandwidth-type>
<mbps>
<class>
<entry name="class1">
<priority>real-time</priority>
</entry>
<entry name="class2">
<priority>high</priority>
</entry>
<entry name="class3">
<priority>high</priority>
</entry>
<entry name="class4">
<priority>medium</priority>
</entry>
<entry name="class5">
<priority>medium</priority>
</entry>
<entry name="class6">
<priority>low</priority>
</entry>
<entry name="class7">
<priority>low</priority>
</entry>
<entry name="class8">
<priority>low</priority>
</entry>
</class>
</mbps>
</class-bandwidth-type>
</entry>
</profile>
</qos>
<virtual-router>
<entry name="default">
<protocol>
<bgp>
<enable>yes</enable>
<dampening-profile>
<entry name="default">
<cutoff>1.25</cutoff>
<reuse>0.5</reuse>
<max-hold-time>900</max-hold-time>
<decay-half-life-reachable>300</decay-half-life-reachable>
<decay-half-life-unreachable>900</decay-half-life-unreachable>
<enable>yes</enable>
</entry>
</dampening-profile>
<routing-options>
<graceful-restart>
<enable>yes</enable>
</graceful-restart>
</routing-options>
<peer-group>
<entry name="BRANCH-PEERS">
<type>
<ebgp>
<remove-private-as>yes</remove-private-as>
<import-nexthop>original</import-nexthop>
<export-nexthop>resolve</export-nexthop>
</ebgp>
</type>
<peer>
<entry name="FORTIGATE-BRANCH">
<peer-address>
<ip>169.1.1.2</ip>
</peer-address>
<connection-options>
<incoming-bgp-connection>
<remote-port>0</remote-port>
<allow>yes</allow>
</incoming-bgp-connection>
<outgoing-bgp-connection>
<local-port>0</local-port>
<allow>yes</allow>
</outgoing-bgp-connection>
<multihop>0</multihop>
<keep-alive-interval>30</keep-alive-interval>
<open-delay-time>0</open-delay-time>
<hold-time>90</hold-time>
<idle-hold-time>15</idle-hold-time>
<min-route-adv-interval>30</min-route-adv-interval>
</connection-options>
<subsequent-address-family-identifier>
<unicast>yes</unicast>
<multicast>no</multicast>
</subsequent-address-family-identifier>
<local-address>
<ip>169.1.1.1/30</ip>
<interface>tunnel.2</interface>
</local-address>
<bfd>
<profile>Inherit-vr-global-setting</profile>
</bfd>
<max-prefixes>5000</max-prefixes>
<enable>yes</enable>
<peer-as>65200</peer-as>
<enable-mp-bgp>no</enable-mp-bgp>
<address-family-identifier>ipv4</address-family-identifier>
<enable-sender-side-loop-detection>yes</enable-sender-side-loop-detection>
<reflector-client>non-client</reflector-client>
<peering-type>unspecified</peering-type>
</entry>
</peer>
<aggregated-confed-as-path>yes</aggregated-confed-as-path>
<soft-reset-with-stored-info>no</soft-reset-with-stored-info>
<enable>yes</enable>
</entry>
</peer-group>
<redist-rules>
<entry name="REDIST-OSPF-BGP">
<address-family-identifier>ipv4</address-family-identifier>
<enable>yes</enable>
<set-origin>incomplete</set-origin>
</entry>
</redist-rules>
<allow-redist-default-route>no</allow-redist-default-route>
<router-id>169.1.1.1</router-id>
<local-as>65100</local-as>
<policy>
<import>
<rules>
<entry name="ACCEPT-BRANCH-ROUTES">
<action>
<allow>
<update>
<community>
<none/>
</community>
<extended-community>
<none/>
</extended-community>
<as-path>
<none/>
</as-path>
</update>
</allow>
</action>
<match>
<route-table>unicast</route-table>
</match>
<used-by>
<member>BRANCH-PEERS</member>
</used-by>
<enable>yes</enable>
</entry>
</rules>
</import>
</policy>
<install-route>yes</install-route>
</bgp>
<rip>
<enable>no</enable>
</rip>
<ospf>
<area>
<entry name="0.0.0.0">
<type>
<normal/>
</type>
<range>
<entry name="172.16.0.12/30">
<advertise/>
</entry>
<entry name="10.0.0.4/32">
<advertise/>
</entry>
</range>
<interface>
<entry name="ethernet1/3">
<bfd>
<profile>Inherit-vr-global-setting</profile>
</bfd>
<enable>yes</enable>
<passive>no</passive>
<gr-delay>10</gr-delay>
<metric>10</metric>
<priority>1</priority>
<hello-interval>10</hello-interval>
<dead-counts>4</dead-counts>
<retransmit-interval>5</retransmit-interval>
<transit-delay>1</transit-delay>
<link-type>
<broadcast/>
</link-type>
</entry>
</interface>
</entry>
</area>
<enable>yes</enable>
<router-id>10.0.0.4</router-id>
<allow-redist-default-route>yes</allow-redist-default-route>
<export-rules>
<entry name="Default">
<new-path-type>ext-2</new-path-type>
</entry>
</export-rules>
</ospf>
<ospfv3>
<enable>no</enable>
</ospfv3>
<redist-profile>
<entry name="Default">
<filter>
<type>
<member>connect</member>
<member>static</member>
<member>bgp</member>
</type>
<destination>
<member>0.0.0.0/0</member>
</destination>
</filter>
<priority>1</priority>
<action>
<redist/>
</action>
</entry>
<entry name="REDIST-OSPF-BGP">
<filter>
<type>
<member>ospf</member>
</type>
<destination>
<member>10.10.10.0/24</member>
<member>10.10.20.0/24</member>
<member>10.10.30.0/24</member>
</destination>
</filter>
<priority>10</priority>
<action>
<redist/>
</action>
</entry>
</redist-profile>
</protocol>
<interface>
<member>ethernet1/1</member>
<member>ethernet1/3</member>
<member>loopback.1</member>
<member>tunnel.1</member>
<member>tunnel.2</member>
<member>tunnel.3</member>
</interface>
<routing-table>
<ip>
<static-route>
<entry name="internet">
<nexthop>
<ip-address>192.168.1.1</ip-address>
</nexthop>
<bfd>
<profile>None</profile>
</bfd>
<path-monitor>
<enable>no</enable>
<failure-condition>any</failure-condition>
<hold-time>2</hold-time>
</path-monitor>
<interface>ethernet1/1</interface>
<metric>10</metric>
<destination>0.0.0.0/0</destination>
</entry>
<entry name="route-to-azure">
<bfd>
<profile>None</profile>
</bfd>
<path-monitor>
<enable>no</enable>
<failure-condition>any</failure-condition>
<hold-time>2</hold-time>
</path-monitor>
<interface>tunnel.3</interface>
<metric>10</metric>
<destination>10.20.0.0/16</destination>
<route-table>
<unicast/>
</route-table>
</entry>
<entry name="route-to-azure-gw">
<path-monitor>
<enable>no</enable>
<failure-condition>any</failure-condition>
<hold-time>2</hold-time>
</path-monitor>
<nexthop>
<ip-address>192.168.1.47</ip-address>
</nexthop>
<bfd>
<profile>None</profile>
</bfd>
<interface>ethernet1/1</interface>
<metric>10</metric>
<destination>20.11.94.68/32</destination>
<route-table>
<unicast/>
</route-table>
</entry>
</static-route>
</ip>
</routing-table>
<ecmp>
<algorithm>
<ip-modulo/>
</algorithm>
</ecmp>
</entry>
</virtual-router>
<tunnel>
<global-protect-gateway>
<entry name="GW GP VPN-N">
<local-address>
<ip>
<ipv4>192.168.1.102/32</ipv4>
</ip>
<interface>ethernet1/1</interface>
<ip-address-family>ipv4</ip-address-family>
</local-address>
<client>
<exclude-video-traffic>
<applications/>
<enabled>no</enabled>
</exclude-video-traffic>
</client>
<ipsec>
<third-party-client>
<enable>no</enable>
</third-party-client>
</ipsec>
<ip-pool/>
<tunnel-interface>tunnel.1</tunnel-interface>
</entry>
</global-protect-gateway>
<ipsec>
<entry name="IPSEC-TUNNEL-BRANCH">
<auto-key>
<ike-gateway>
<entry name="IKE-GW-BRANCH"/>
</ike-gateway>
<ipsec-crypto-profile>IPSEC-CRYPTO-HQ</ipsec-crypto-profile>
</auto-key>
<tunnel-monitor>
<enable>no</enable>
</tunnel-monitor>
<tunnel-interface>tunnel.2</tunnel-interface>
</entry>
<entry name="IPSEC-TUNNEL-AZURE">
<auto-key>
<ike-gateway>
<entry name="IKE-GW-AZURE"/>
</ike-gateway>
<ipsec-crypto-profile>IPSEC-CRYPTO-AZURE</ipsec-crypto-profile>
<proxy-id>
<entry name="Azure">
<protocol>
<any/>
</protocol>
<local>0.0.0.0/0</local>
<remote>0.0.0.0/0</remote>
</entry>
</proxy-id>
</auto-key>
<tunnel-monitor>
<enable>no</enable>
</tunnel-monitor>
<tunnel-interface>tunnel.3</tunnel-interface>
</entry>
</ipsec>
</tunnel>
</network>
<deviceconfig>
<system>
<type>
<static/>
</type>
<update-server>updates.paloaltonetworks.com</update-server>
<update-schedule>
<threats>
<recurring>
<weekly>
<day-of-week>wednesday</day-of-week>
<at>01:02</at>
<action>download-only</action>
</weekly>
</recurring>
</threats>
</update-schedule>
<timezone>Asia/Jakarta</timezone>
<service>
<disable-telnet>yes</disable-telnet>
<disable-http>yes</disable-http>
<disable-snmp>no</disable-snmp>
</service>
<hostname>PA-HQ</hostname>
<dns-setting>
<servers>
<primary>10.10.10.10</primary>
<secondary>8.8.8.8</secondary>
</servers>
</dns-setting>
<ntp-servers>
<primary-ntp-server>
<ntp-server-address>10.10.20.51</ntp-server-address>
<authentication-type>
<none/>
</authentication-type>
</primary-ntp-server>
<secondary-ntp-server>
<ntp-server-address>0.id.pool.ntp.org</ntp-server-address>
<authentication-type>
<none/>
</authentication-type>
</secondary-ntp-server>
</ntp-servers>
<ip-address>10.10.99.10</ip-address>
<netmask>255.255.255.0</netmask>
<default-gateway>10.10.99.1</default-gateway>
<authentication-profile>RADIUS-AUTH</authentication-profile>
<snmp-setting>
<access-setting>
<version>
<v2c>
<snmp-community-string>ilwij-snmp</snmp-community-string>
</v2c>
</version>
</access-setting>
<snmp-system>
<location>Palo-HQ</location>
<send-event-specific-traps>yes</send-event-specific-traps>
</snmp-system>
</snmp-setting>
</system>
<setting>
<config>
<rematch>yes</rematch>
</config>
<management>
<hostname-type-in-syslog>FQDN</hostname-type-in-syslog>
</management>
<auto-mac-detect>yes</auto-mac-detect>
</setting>
</deviceconfig>
<vsys>
<entry name="vsys1">
<application/>
<application-group/>
<zone>
<entry name="Outside">
<network>
<layer3>
<member>ethernet1/1</member>
</layer3>
</network>
</entry>
<entry name="Inside">
<network>
<layer3>
<member>ethernet1/3</member>
<member>loopback.1</member>
</layer3>
</network>
</entry>
<entry name="VPN">
<network>
<layer3>
<member>tunnel.1</member>
<member>tunnel.2</member>
</layer3>
</network>
<enable-user-identification>yes</enable-user-identification>
</entry>
<entry name="Azure">
<network>
<layer3>
<member>tunnel.3</member>
</layer3>
</network>
</entry>
</zone>
<service>
<entry name="RDP">
<protocol>
<tcp>
<port>3389</port>
<override>
<no/>
</override>
</tcp>
</protocol>
</entry>
</service>
<service-group/>
<schedule/>
<rulebase>
<security>
<rules>
<entry name="vlan10-vm-internet" uuid="fa1061c1-8abc-4b85-b469-e9a2021cb06e">
<to>
<member>Outside</member>
</to>
<from>
<member>Inside</member>
</from>
<source>
<member>10.10.10.0/24</member>
</source>
<destination>
<member>any</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>application-default</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
</entry>
<entry name="vlan20-container-internet" uuid="c985afa4-2bb7-40e0-9949-02e7d735844c">
<to>
<member>Outside</member>
</to>
<from>
<member>Inside</member>
</from>
<source>
<member>10.10.20.0/24</member>
</source>
<destination>
<member>any</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>application-default</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
</entry>
<entry name="vlan30-hquser-internet" uuid="f24022d2-ede5-407c-9f09-eecdabfcc17f">
<to>
<member>Outside</member>
</to>
<from>
<member>Inside</member>
</from>
<source>
<member>10.10.30.0/24</member>
</source>
<destination>
<member>any</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>application-default</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
<log-start>yes</log-start>
</entry>
<entry name="vlan99-mgmt-internet" uuid="175606a7-da52-4dc7-b0d7-3a48f29a1988">
<to>
<member>Outside</member>
</to>
<from>
<member>Inside</member>
</from>
<source>
<member>10.10.99.0/24</member>
</source>
<destination>
<member>any</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>application-default</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
</entry>
<entry name="GP VPN" uuid="1a42a5e0-1bfe-4cb7-a553-2f15b8383a84">
<to>
<member>Inside</member>
</to>
<from>
<member>VPN</member>
</from>
<source>
<member>GP Client</member>
</source>
<destination>
<member>vlan10</member>
<member>vlan20</member>
<member>vlan30</member>
<member>vlan99</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>any</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
</entry>
<entry name="HQ-TO-BRANCH" uuid="71c1c7f4-97c4-4b17-aba6-7a13bcccf96b">
<to>
<member>VPN</member>
</to>
<from>
<member>Inside</member>
</from>
<source>
<member>HQ-Subnets</member>
</source>
<destination>
<member>Branch-Subnets</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>application-default</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
</entry>
<entry name="BRANCH-TO-HQ" uuid="ce06e351-5001-4da3-8c07-e03d6126a2fa">
<to>
<member>Inside</member>
</to>
<from>
<member>VPN</member>
</from>
<source>
<member>Branch-Subnets</member>
</source>
<destination>
<member>HQ-Subnets</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>application-default</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
</entry>
<entry name="GP VPN to Branch" uuid="998872f1-2b90-45be-b9bd-0c27b7d0d208">
<to>
<member>VPN</member>
</to>
<from>
<member>VPN</member>
</from>
<source>
<member>GP Client</member>
</source>
<destination>
<member>Branch-Mgmt-Subnet</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>application-default</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
</entry>
<entry name="Inside To Azure" uuid="ecc57f0a-a67d-4568-9a0e-de157e0f3a99">
<to>
<member>Azure</member>
</to>
<from>
<member>Inside</member>
</from>
<source>
<member>vlan10</member>
<member>vlan20</member>
<member>vlan30</member>
<member>vlan99</member>
</source>
<destination>
<member>10.20.0.0/16</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>application-default</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
</entry>
<entry name="Azure to Inside" uuid="9792e4b0-5619-4f8a-a5d9-208c7cf7f131">
<to>
<member>Inside</member>
</to>
<from>
<member>Azure</member>
</from>
<source>
<member>10.20.0.0/16</member>
</source>
<destination>
<member>vlan10</member>
<member>vlan20</member>
<member>vlan30</member>
<member>vlan99</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>application-default</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
</entry>
<entry name="GP-Azure" uuid="acb39036-040e-476f-9cc2-2b6ee3e63bfc">
<to>
<member>Azure</member>
</to>
<from>
<member>VPN</member>
</from>
<source>
<member>any</member>
</source>
<destination>
<member>any</member>
</destination>
<source-user>
<member>any</member>
</source-user>
<category>
<member>any</member>
</category>
<application>
<member>any</member>
</application>
<service>
<member>application-default</member>
</service>
<source-hip>
<member>any</member>
</source-hip>
<destination-hip>
<member>any</member>
</destination-hip>
<action>allow</action>
</entry>
</rules>
</security>
<nat>
<rules>
<entry name="vlan10-nat" uuid="0a611f2d-1f45-4f42-b4b7-22a4a8c93058">
<source-translation>
<dynamic-ip-and-port>
<interface-address>
<ip>192.168.1.101/24</ip>
<interface>ethernet1/1</interface>
</interface-address>
</dynamic-ip-and-port>
</source-translation>
<to>
<member>Outside</member>
</to>
<from>
<member>Inside</member>
</from>
<source>
<member>vlan10</member>
</source>
<destination>
<member>any</member>
</destination>
<service>any</service>
<to-interface>ethernet1/1</to-interface>
</entry>
<entry name="vlan20-nat" uuid="d579ced8-e972-4657-a6aa-0162bc7a28ce">
<source-translation>
<dynamic-ip-and-port>
<interface-address>
<ip>192.168.1.101/24</ip>
<interface>ethernet1/1</interface>
</interface-address>
</dynamic-ip-and-port>
</source-translation>
<to>
<member>Outside</member>
</to>
<from>
<member>Inside</member>
</from>
<source>
<member>vlan20</member>
</source>
<destination>
<member>any</member>
</destination>
<service>any</service>
<to-interface>ethernet1/1</to-interface>
</entry>
<entry name="vlan30-nat" uuid="96201cdb-31f6-4fa2-87d5-123f12319103">
<source-translation>
<dynamic-ip-and-port>
<interface-address>
<ip>192.168.1.101/24</ip>
<interface>ethernet1/1</interface>
</interface-address>
</dynamic-ip-and-port>
</source-translation>
<to>
<member>Outside</member>
</to>
<from>
<member>Inside</member>
</from>
<source>
<member>vlan30</member>
</source>
<destination>
<member>any</member>
</destination>
<service>any</service>
<to-interface>ethernet1/1</to-interface>
</entry>
<entry name="vlan99-nat" uuid="fcf002e2-1687-40d8-87bd-9cf2842607b6">
<source-translation>
<dynamic-ip-and-port>
<interface-address>
<ip>192.168.1.101/24</ip>
<interface>ethernet1/1</interface>
</interface-address>
</dynamic-ip-and-port>
</source-translation>
<to>
<member>Outside</member>
</to>
<from>
<member>Inside</member>
</from>
<source>
<member>vlan99</member>
</source>
<destination>
<member>any</member>
</destination>
<service>any</service>
<to-interface>ethernet1/1</to-interface>
</entry>
<entry name="NAT GP Client To Branch" uuid="336965be-1e46-4079-ad22-62cba0f36e9e">
<source-translation>
<dynamic-ip-and-port>
<translated-address>
<member>10.10.30.200/32</member>
</translated-address>
</dynamic-ip-and-port>
</source-translation>
<to>
<member>VPN</member>
</to>
<from>
<member>VPN</member>
</from>
<source>
<member>GP Client</member>
</source>
<destination>
<member>Branch-Mgmt-Subnet</member>
</destination>
<service>any</service>
<to-interface>tunnel.2</to-interface>
</entry>
<entry name="NAT GP Client To Azure" uuid="794b0d5f-ef13-4776-a503-f1c7b7543455">
<source-translation>
<dynamic-ip-and-port>
<translated-address>
<member>10.10.10.200/32</member>
</translated-address>
</dynamic-ip-and-port>
</source-translation>
<to>
<member>Azure</member>
</to>
<from>
<member>VPN</member>
</from>
<source>
<member>GP Client</member>
</source>
<destination>
<member>Azure-Net</member>
</destination>
<service>any</service>
<to-interface>tunnel.3</to-interface>
</entry>
</rules>
</nat>
</rulebase>
<import>
<network>
<interface>
<member>ethernet1/3</member>
<member>loopback.1</member>
<member>ethernet1/1</member>
<member>tunnel.1</member>
<member>tunnel.2</member>
<member>tunnel.3</member>
</interface>
</network>
</import>
<address>
<entry name="vlan20">
<ip-netmask>10.10.20.0/24</ip-netmask>
</entry>
<entry name="vlan10">
<ip-netmask>10.10.10.0/24</ip-netmask>
</entry>
<entry name="vlan30">
<ip-netmask>10.10.30.0/24</ip-netmask>
</entry>
<entry name="vlan99">
<ip-netmask>10.10.99.0/24</ip-netmask>
</entry>
<entry name="IP Public">
<ip-netmask>192.168.1.101</ip-netmask>
</entry>
<entry name="Win10-HQUser">
<ip-netmask>10.10.30.21/32</ip-netmask>
</entry>
<entry name="IP Public 2">
<ip-netmask>192.168.1.102/32</ip-netmask>
</entry>
<entry name="IP_Branch_Forti">
<ip-netmask>192.168.1.101</ip-netmask>
</entry>
<entry name="Branch-User-Subnet">
<ip-netmask>10.10.40.0/24</ip-netmask>
</entry>
<entry name="Branch-Mgmt-Subnet">
<ip-netmask>10.10.199.0/24</ip-netmask>
</entry>
<entry name="GP Client">
<ip-range>10.10.200.2-10.10.200.254</ip-range>
</entry>
<entry name="Branch-P2P">
<ip-netmask>172.16.1.16/30</ip-netmask>
</entry>
<entry name="Azure-Net">
<ip-netmask>10.20.10.0/24</ip-netmask>
</entry>
</address>
<global-protect>
<global-protect-portal>
<entry name="Portal GP VPN">
<portal-config>
<local-address>
<ip>
<ipv4>192.168.1.102/32</ipv4>
</ip>
<interface>ethernet1/1</interface>
</local-address>
<client-auth>
<entry name="Client Portal VPN">
<user-credential-or-client-cert-required>no</user-credential-or-client-cert-required>
<os>Any</os>
<authentication-profile>LocalVPN</authentication-profile>
<authentication-message>Enter login credentials</authentication-message>
<auto-retrieve-passcode>no</auto-retrieve-passcode>
<username-label>Username</username-label>
<password-label>Password</password-label>
</entry>
</client-auth>
<custom-login-page>factory-default</custom-login-page>
<custom-home-page>factory-default</custom-home-page>
<ssl-tls-service-profile>SSL Profile GP</ssl-tls-service-profile>
</portal-config>
<client-config>
<configs>
<entry name="Client Portal">
<hip-collection>
<max-wait-time>20</max-wait-time>
<collect-hip-data>no</collect-hip-data>
</hip-collection>
<gateways>
<external>
<list>
<entry name="EGW">
<ip>
<ipv4>192.168.1.102</ipv4>
</ip>
<priority-rule>
<entry name="Any">
<priority>1</priority>
</entry>
</priority-rule>
<manual>no</manual>
</entry>
<entry name="EGW-Pub">
<ip>
<ipv4>149.129.220.212</ipv4>
</ip>
<priority-rule>
<entry name="Any">
<priority>1</priority>
</entry>
</priority-rule>
<manual>no</manual>
</entry>
</list>
<cutoff-time>5</cutoff-time>
</external>
</gateways>
<authentication-override>
<generate-cookie>no</generate-cookie>
</authentication-override>
<source-user>
<member>any</member>
</source-user>
<os>
<member>any</member>
</os>
<agent-ui>
<max-agent-user-overrides>0</max-agent-user-overrides>
<agent-user-override-timeout>0</agent-user-override-timeout>
</agent-ui>
<gp-app-config>
<config>
<entry name="connect-method">
<value>
<member>on-demand</member>
</value>
</entry>
<entry name="refresh-config-interval">
<value>
<member>24</member>
</value>
</entry>
<entry name="agent-user-override">
<value>
<member>allowed</member>
</value>
</entry>
<entry name="uninstall">
<value>
<member>allowed</member>
</value>
</entry>
<entry name="client-upgrade">
<value>
<member>prompt</member>
</value>
</entry>
<entry name="enable-signout">
<value>
<member>yes</member>
</value>
</entry>
<entry name="use-sso">
<value>
<member>yes</member>
</value>
</entry>
<entry name="use-sso-macos">
<value>
<member>no</member>
</value>
</entry>
<entry name="logout-remove-sso">
<value>
<member>yes</member>
</value>
</entry>
<entry name="krb-auth-fail-fallback">
<value>
<member>yes</member>
</value>
</entry>
<entry name="default-browser">
<value>
<member>no</member>
</value>
</entry>
<entry name="retry-tunnel">
<value>
<member>30</member>
</value>
</entry>
<entry name="retry-timeout">
<value>
<member>5</member>
</value>
</entry>
<entry name="enforce-globalprotect">
<value>
<member>no</member>
</value>
</entry>
<entry name="captive-portal-exception-timeout">
<value>
<member>0</member>
</value>
</entry>
<entry name="traffic-blocking-notification-delay">
<value>
<member>15</member>
</value>
</entry>
<entry name="display-traffic-blocking-notification-msg">
<value>
<member>yes</member>
</value>
</entry>
<entry name="traffic-blocking-notification-msg">
<value>
<member><div style="font-family:'Helvetica Neue';"><h1 style="color:red;text-align:center; margin: 0; font-size: 30px;">Notice</h1><p style="margin: 0;font-size: 15px; line-height: 1.2em;">To access the network, you must first connect to GlobalProtect.</p></div></member>
</value>
</entry>
<entry name="allow-traffic-blocking-notification-dismissal">
<value>
<member>yes</member>
</value>
</entry>
<entry name="display-captive-portal-detection-msg">
<value>
<member>no</member>
</value>
</entry>
<entry name="captive-portal-detection-msg">
<value>
<member><div style="font-family:'Helvetica Neue';"><h1 style="color:red;text-align:center; margin: 0; font-size: 30px;">Captive Portal Detected</h1><p style="margin: 0; font-size: 15px; line-height: 1.2em;">GlobalProtect has temporarily permitted network access for you to connect to the Internet. Follow instructions from your internet provider.</p><p style="margin: 0; font-size: 15px; line-height: 1.2em;">If you let the connection time out, open GlobalProtect and click Connect to try again.</p></div></member>
</value>
</entry>
<entry name="captive-portal-notification-delay">
<value>
<member>5</member>
</value>
</entry>
<entry name="certificate-store-lookup">
<value>
<member>user-and-machine</member>
</value>
</entry>
<entry name="scep-certificate-renewal-period">
<value>
<member>7</member>
</value>
</entry>
<entry name="retain-connection-smartcard-removal">
<value>
<member>yes</member>
</value>
</entry>
<entry name="enable-advanced-view">
<value>
<member>yes</member>
</value>
</entry>
<entry name="enable-do-not-display-this-welcome-page-again">
<value>
<member>yes</member>
</value>
</entry>
<entry name="rediscover-network">
<value>
<member>yes</member>
</value>
</entry>
<entry name="resubmit-host-info">
<value>
<member>yes</member>
</value>
</entry>
<entry name="can-change-portal">
<value>
<member>yes</member>
</value>
</entry>
<entry name="can-continue-if-portal-cert-invalid">
<value>
<member>yes</member>
</value>
</entry>
<entry name="show-agent-icon">
<value>
<member>yes</member>
</value>
</entry>
<entry name="user-switch-tunnel-rename-timeout">
<value>
<member>0</member>
</value>
</entry>
<entry name="pre-logon-tunnel-rename-timeout">
<value>
<member>-1</member>
</value>
</entry>
<entry name="preserve-tunnel-upon-user-logoff-timeout">
<value>
<member>0</member>
</value>
</entry>
<entry name="ipsec-failover-ssl">
<value>
<member>0</member>
</value>
</entry>
<entry name="ssl-only-selection">
<value>
<member>0</member>
</value>
</entry>
<entry name="max-internal-gateway-connection-attempts">
<value>
<member>0</member>
</value>
</entry>
<entry name="portal-timeout">
<value>
<member>5</member>
</value>
</entry>
<entry name="connect-timeout">
<value>
<member>5</member>
</value>
</entry>
<entry name="receive-timeout">
<value>
<member>30</member>
</value>
</entry>
<entry name="split-tunnel-option">
<value>
<member>network-traffic</member>
</value>
</entry>
<entry name="enforce-dns">
<value>
<member>yes</member>
</value>
</entry>
<entry name="append-local-search-domain">
<value>
<member>no</member>
</value>
</entry>
<entry name="flush-dns">
<value>
<member>no</member>
</value>
</entry>
<entry name="proxy-multiple-autodetect">
<value>
<member>no</member>
</value>
</entry>
<entry name="use-proxy">
<value>
<member>yes</member>
</value>
</entry>
<entry name="wsc-autodetect">
<value>
<member>yes</member>
</value>
</entry>
<entry name="mfa-enabled">
<value>
<member>no</member>
</value>
</entry>
<entry name="mfa-listening-port">
<value>
<member>4501</member>
</value>
</entry>
<entry name="mfa-notification-msg">
<value>
<member>You have attempted to access a protected resource that requires additional authentication. Proceed to authenticate at</member>
</value>
</entry>
<entry name="mfa-prompt-suppress-time">
<value>
<member>0</member>
</value>
</entry>
<entry name="ipv6-preferred">
<value>
<member>yes</member>
</value>
</entry>
<entry name="log-gateway">
<value>
<member>no</member>
</value>
</entry>
<entry name="quarantine-add-message">
<value>
<member>Access to the network from this device has been restricted as per your organization's security policy. Please contact your IT Administrator.</member>
</value>
</entry>
<entry name="quarantine-remove-message">
<value>
<member>Access to the network from this device has been restored as per your organization's security policy.</member>
</value>
</entry>
<entry name="init-panel">
<value>
<member>no</member>
</value>
</entry>
</config>
</gp-app-config>
<save-user-credentials>1</save-user-credentials>
<portal-2fa>no</portal-2fa>
<manual-only-gateway-2fa>no</manual-only-gateway-2fa>
<internal-gateway-2fa>no</internal-gateway-2fa>
<auto-discovery-external-gateway-2fa>no</auto-discovery-external-gateway-2fa>
<mdm-enrollment-port>443</mdm-enrollment-port>
</entry>
</configs>
<root-ca>
<entry name="PA-Root-CA">
<install-in-cert-store>no</install-in-cert-store>
</entry>
</root-ca>
</client-config>
<satellite-config>
<client-certificate>
<local/>
</client-certificate>
</satellite-config>
</entry>
</global-protect-portal>
<global-protect-gateway>
<entry name="GW GP VPN">
<roles>
<entry name="default">
<login-lifetime>
<days>30</days>
</login-lifetime>
<inactivity-logout>
<hours>3</hours>
</inactivity-logout>
<disconnect-on-idle>
<minutes>180</minutes>
</disconnect-on-idle>
</entry>
</roles>
<client-auth>
<entry name="Client Auth GP">
<os>Any</os>
<authentication-profile>LocalVPN</authentication-profile>
<authentication-message>Enter login credentials</authentication-message>
<user-credential-or-client-cert-required>no</user-credential-or-client-cert-required>
<auto-retrieve-passcode>no</auto-retrieve-passcode>
<username-label>Username</username-label>
<password-label>Password</password-label>
</entry>
</client-auth>
<remote-user-tunnel-configs>
<entry name="Client GP">
<split-tunneling>
<include-domains>
<list/>
</include-domains>
<exclude-domains>
<list/>
</exclude-domains>
<access-route>
<member>10.20.10.0/24</member>
<member>Branch-Mgmt-Subnet</member>
<member>vlan10</member>
<member>vlan20</member>
<member>vlan30</member>
<member>vlan99</member>
</access-route>
<exclude-access-route/>
<include-applications/>
<exclude-applications/>
</split-tunneling>
<authentication-override>
<generate-cookie>no</generate-cookie>
</authentication-override>
<source-address>
<ip-address/>
<region/>
</source-address>
<source-user>
<member>any</member>
</source-user>
<authentication-server-ip-pool/>
<ip-pool>
<member>10.10.200.2-10.10.200.254</member>
</ip-pool>
<dns-server>
<member>10.10.10.10</member>
<member>8.8.8.8</member>
</dns-server>
<os>
<member>any</member>
</os>
<retrieve-framed-ip-address>no</retrieve-framed-ip-address>
<no-direct-access-to-local-network>no</no-direct-access-to-local-network>
</entry>
</remote-user-tunnel-configs>
<ssl-tls-service-profile>SSL Profile GP</ssl-tls-service-profile>
<tunnel-mode>yes</tunnel-mode>
<remote-user-tunnel>tunnel.1</remote-user-tunnel>
</entry>
</global-protect-gateway>
</global-protect>
<address-group>
<entry name="HQ-Subnets">
<static>
<member>vlan10</member>
<member>vlan20</member>
<member>vlan30</member>
</static>
</entry>
<entry name="Branch-Subnets">
<static>
<member>Branch-Mgmt-Subnet</member>
<member>Branch-P2P</member>
<member>Branch-User-Subnet</member>
</static>
</entry>
</address-group>
</entry>
</vsys>
</entry>
</devices>
</config>

### 2.2 Fortigate
Branch-FW # show system interface
config system interface
    edit "port1"
        set vdom "root"
        set ip 192.168.1.110 255.255.255.0
        set allowaccess ping
        set type physical
        set alias "WAN"
        set lldp-reception enable
        set role wan
        set snmp-index 1
    next
    edit "port2"
        set vdom "root"
        set ip 10.10.199.2 255.255.255.0
        set allowaccess ping https ssh snmp radius-acct
        set type physical
        set alias "Mgmt"
        set device-identification enable
        set lldp-transmission enable
        set role lan
        set snmp-index 2
        set ip-managed-by-fortiipam disable
    next
    edit "port3"
        set vdom "root"
        set ip 172.16.1.18 255.255.255.252
        set allowaccess ping https ssh radius-acct
        set type physical
        set alias "P2P-Core"
        set device-identification enable
        set lldp-transmission enable
        set role lan
        set snmp-index 3
        set ip-managed-by-fortiipam disable
    next
    edit "naf.root"
        set vdom "root"
        set type tunnel
        set src-check disable
        set snmp-index 5
    next
    edit "l2t.root"
        set vdom "root"
        set type tunnel
        set snmp-index 6
    next
    edit "ssl.root"
        set vdom "root"
        set type tunnel
        set alias "SSL VPN interface"
        set snmp-index 7
    next
    edit "fortilink"
        set vdom "root"
        set fortilink enable
        set ip 10.255.1.1 255.255.255.0
        set allowaccess ping fabric
        set type aggregate
        set lldp-reception enable
        set lldp-transmission enable
        set snmp-index 8
    next
    edit "IPSEC-TUNNEL-HQ"
        set vdom "root"
        set ip 169.1.1.2 255.255.255.255
        set type tunnel
        set remote-ip 169.1.1.1 255.255.255.252
        set snmp-index 4
        set interface "port1"
    next
end

Branch-FW # show system global
config system global
    set alias "FGVMEV9ITJXIEA8C"
    set gui-auto-upgrade-setup-warning disable
    set hostname "Branch-FW"
    set timezone "Asia/Jakarta"
end

Branch-FW # show router static
config router static
    edit 1
        set gateway 192.168.1.1
        set device "port1"
    next
end

Branch-FW # show router ospf
config router ospf
    set default-information-originate always
    set router-id 172.16.1.18
    config area
        edit 0.0.0.0
        next
    end
    config network
        edit 1
            set prefix 172.16.1.16 255.255.255.252
        next
    end
    config redistribute "connected"
        set status enable
    end
    config redistribute "static"
        set status enable
    end
    config redistribute "rip"
    end
    config redistribute "bgp"
        set status enable
    end
    config redistribute "isis"
    end
end

Branch-FW # show router bgp
config router bgp
    set as 65200
    set router-id 169.1.1.2
    config neighbor
        edit "169.1.1.1"
            set remote-as 65100
            set update-source "IPSEC-TUNNEL-HQ"
        next
    end
    config redistribute "connected"
        set status enable
        set route-map "OSPF-TO-BGP-BRANCH"
    end
    config redistribute "rip"
    end
    config redistribute "ospf"
        set status enable
        set route-map "OSPF-TO-BGP-BRANCH"
    end
    config redistribute "static"
    end
    config redistribute "isis"
    end
    config redistribute6 "connected"
    end
    config redistribute6 "rip"
    end
    config redistribute6 "ospf"
    end
    config redistribute6 "static"
    end
    config redistribute6 "isis"
    end
end

Branch-FW # show vpn ipsec phase1-interface
config vpn ipsec phase1-interface
    edit "IPSEC-TUNNEL-HQ"
        set interface "port1"
        set keylife 28800
        set peertype any
        set net-device disable
        set proposal des-sha256
        set dhgrp 14
        set nattraversal disable
        set remote-gw 192.168.1.101
        set psksecret ENC LaTmx0wInZBO6eZb3OHsVKkKYEFkcLimAAu/IkZBuoDIvyX5UdxjZzEm4wvCXA07dv3RFj8UBTRb3F5wAhtNbSYer9Ofp61Q4p723vAXpdShmGAVWTVAvY9asOvWKRocxWzrJXqloCHZMCWMoNuXHxLdAgzJNbGzT4PBpgPjV8DWmQLIKf59a68eeFRy1oPFTO+Em1lmMjY3dkVA
    next
end

Branch-FW # show vpn ipsec phase2-interface
config vpn ipsec phase2-interface
    edit "PHASE2-HQ"
        set phase1name "IPSEC-TUNNEL-HQ"
        set proposal des-sha256
        set dhgrp 14
        set auto-negotiate enable
        set keylifeseconds 3600
    next
end

Branch-FW # show firewall policy
config firewall policy
    edit 1
        set name "User Branch Inet"
        set uuid 1aa088be-5100-51f1-74fb-f033a76fceb9
        set srcintf "port3"
        set dstintf "port1"
        set action accept
        set srcaddr "Branch User" "Branch Mgmt"
        set dstaddr "all"
        set schedule "always"
        set service "ALL"
        set logtraffic all
        set nat enable
    next
    edit 2
        set name "HQ-TO-BRANCH"
        set uuid 29b160e8-5156-51f1-a8cd-c216799c1921
        set srcintf "IPSEC-TUNNEL-HQ"
        set dstintf "port3" "port2"
        set action accept
        set srcaddr "HQ-Subnets"
        set dstaddr "Branch-Subnets"
        set schedule "always"
        set service "ALL"
        set logtraffic all
    next
    edit 3
        set name "BRANCH-TO-HQ"
        set uuid 3602b6ee-5156-51f1-3f70-3d96b708b67a
        set srcintf "port3" "port2"
        set dstintf "IPSEC-TUNNEL-HQ"
        set action accept
        set srcaddr "Branch-Subnets"
        set dstaddr "HQ-Subnets"
        set schedule "always"
        set service "ALL"
        set logtraffic all
    next
end

Branch-FW # show user radius
config user radius
    edit "WIN-SERVER-NPS"
        set server "10.10.10.10"
        set secret ENC QTRIS7SwlxM9sAbv7lU1A4wLZTTnsnNKcKbj6+SpmTzD+PiBEu/MYl+LwF5FNUl64AJjlcTBQbMvpcCR+0LaDY8h2nRqAZ2CbrVXb9TbP2A8vLUZ0DRzY10oVUrSGXWauaOJwAIdZ/0Qvd2E9LZ9D38UXW99UwsRiw+NWp6Gkxm+MG7OTJVTFg8YlUQRNPMc87A7mVlmMjY3dkVA
        set auth-type pap
        set source-ip "10.10.199.2"
        set require-message-authenticator disable
    next
end

Branch-FW # show system ntp
config system ntp
    set ntpsync enable
    set type custom
    config ntpserver
        edit 1
            set server "10.10.20.51"
        next
    end
    set server-mode enable
    set interface "fortilink"
end

Branch-FW # show system snmp community
config system snmp community
    edit 1
        set name "ilwij-snmp"
        config hosts
            edit 1
                set ip 10.10.20.0 255.255.255.0
            next
        end
        set query-v1-status disable
        set trap-v1-status disable
    next
end


## 3. Windows Server

### 3.1 Installed Roles
PS C:\Users\Administrator> Get-WindowsFeature | Where-Object {$_.Installed -eq $true} | Select Name, DisplayName                                                            
Name                      DisplayName
----                      -----------
AD-Domain-Services        Active Directory Domain Services
DNS                       DNS Server
FileAndStorage-Services   File and Storage Services
File-Services             File and iSCSI Services
FS-FileServer             File Server
Storage-Services          Storage Services
NPAS                      Network Policy and Access Services
NET-Framework-45-Features .NET Framework 4.8 Features
NET-Framework-45-Core     .NET Framework 4.8
NET-WCF-Services45        WCF Services
NET-WCF-TCP-PortSharing45 TCP Port Sharing
GPMC                      Group Policy Management
Windows-Defender          Microsoft Defender Antivirus
RSAT                      Remote Server Administration Tools
RSAT-Role-Tools           Role Administration Tools
RSAT-AD-Tools             AD DS and AD LDS Tools
RSAT-AD-PowerShell        Active Directory module for Windows PowerShell
RSAT-ADDS                 AD DS Tools
RSAT-AD-AdminCenter       Active Directory Administrative Center
RSAT-ADDS-Tools           AD DS Snap-Ins and Command-Line Tools
RSAT-DNS-Server           DNS Server Tools
RSAT-NPAS                 Network Policy and Access Services Tools
System-DataArchiver       System Data Archiver
PowerShellRoot            Windows PowerShell
PowerShell                Windows PowerShell 5.1
WoW64-Support             WoW64 Support
XPS-Viewer                XPS Viewer

### 3.2 AD Users
PS C:\Users\Administrator> Get-ADUser -Filter * -Properties * | Select Name, SamAccountName, MemberOf

Name          SamAccountName MemberOf
----          -------------- --------
Administrator Administrator  {CN=Group Policy Creator Owners,CN=Users,DC=ilwij,DC=lab, CN=Domain Admins,CN=Users,DC=ilwij,DC=lab, CN=Enterprise Admins,CN=Users,DC=ilwij...
Guest         Guest          {CN=Guests,CN=Builtin,DC=ilwij,DC=lab}
krbtgt        krbtgt         {CN=Denied RODC Password Replication Group,CN=Users,DC=ilwij,DC=lab}
Ilham Wijaya  ilham          {CN=infra-admins,DC=ilwij,DC=lab}
Guest Infra   guest.infra    {CN=readonly,DC=ilwij,DC=lab}

### 3.3 AD Groups
PS C:\Users\Administrator> Get-ADGroup -Filter * | Select Name, GroupScope

Name                                     GroupScope
----                                     ----------
Administrators                          DomainLocal
Users                                   DomainLocal
Guests                                  DomainLocal
Print Operators                         DomainLocal
Backup Operators                        DomainLocal
Replicator                              DomainLocal
Remote Desktop Users                    DomainLocal
Network Configuration Operators         DomainLocal
Performance Monitor Users               DomainLocal
Performance Log Users                   DomainLocal
Distributed COM Users                   DomainLocal
IIS_IUSRS                               DomainLocal
Cryptographic Operators                 DomainLocal
Event Log Readers                       DomainLocal
Certificate Service DCOM Access         DomainLocal
RDS Remote Access Servers               DomainLocal
RDS Endpoint Servers                    DomainLocal
RDS Management Servers                  DomainLocal
Hyper-V Administrators                  DomainLocal
Access Control Assistance Operators     DomainLocal
Remote Management Users                 DomainLocal
Storage Replica Administrators          DomainLocal
Domain Computers                             Global
Domain Controllers                           Global
Schema Admins                             Universal
Enterprise Admins                         Universal
Cert Publishers                         DomainLocal
Domain Admins                                Global
Domain Users                                 Global
Domain Guests                                Global
Group Policy Creator Owners                  Global
RAS and IAS Servers                     DomainLocal
Server Operators                        DomainLocal
Account Operators                       DomainLocal
Pre-Windows 2000 Compatible Access      DomainLocal
Incoming Forest Trust Builders          DomainLocal
Windows Authorization Access Group      DomainLocal
Terminal Server License Servers         DomainLocal
Allowed RODC Password Replication Group DomainLocal
Denied RODC Password Replication Group  DomainLocal
Read-only Domain Controllers                 Global
Enterprise Read-only Domain Controllers   Universal
Cloneable Domain Controllers                 Global
Protected Users                              Global
Key Admins                                   Global
Enterprise Key Admins                     Universal
DnsAdmins                               DomainLocal
DnsUpdateProxy                               Global
infra-admins                                 Global
readonly                                     Global

### 3.4 DNS Zones
PS C:\Users\Administrator>
>> Get-DnsServerZone

ZoneName                            ZoneType        IsAutoCreated   IsDsIntegrated  IsReverseLookupZone  IsSigned
--------                            --------        -------------   --------------  -------------------  --------
_msdcs.ilwij.lab                    Primary         False           True            False                False
0.in-addr.arpa                      Primary         True            False           True                 False
10.10.10.in-addr.arpa               Primary         False           True            True                 False
127.in-addr.arpa                    Primary         True            False           True                 False
20.10.10.in-addr.arpa               Primary         False           True            True                 False
255.in-addr.arpa                    Primary         True            False           True                 False
30.10.10.in-addr.arpa               Primary         False           True            True                 False
99.10.10.in-addr.arpa               Primary         False           True            True                 False
ilwij.lab                           Primary         False           True            False                False
TrustAnchors                        Primary         False           True            False                False

### 3.5 DNS Records
PS C:\Users\Administrator> Get-DnsServerResourceRecord -ZoneName "ilwij.lab"

HostName                  RecordType Type       Timestamp            TimeToLive      RecordData
--------                  ---------- ----       ---------            ----------      ----------
@                         A          1          05/23/26 10:00:00 PM 00:10:00        10.10.10.10
@                         NS         2          0                    01:00:00        win-server.ilwij.lab.
@                         SOA        6          0                    01:00:00        [63][win-server.ilwij.lab.][hostmaster.ilwij.lab.]
_msdcs                    NS         2          0                    01:00:00        win-server.ilwij.lab.
_gc._tcp.Default-First... SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][3268][win-server.ilwij.lab.]
_kerberos._tcp.Default... SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][88][win-server.ilwij.lab.]
_ldap._tcp.Default-Fir... SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][389][win-server.ilwij.lab.]
_gc._tcp                  SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][3268][win-server.ilwij.lab.]
_kerberos._tcp            SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][88][win-server.ilwij.lab.]
_kpasswd._tcp             SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][464][win-server.ilwij.lab.]
_ldap._tcp                SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][389][win-server.ilwij.lab.]
_kerberos._udp            SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][88][win-server.ilwij.lab.]
_kpasswd._udp             SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][464][win-server.ilwij.lab.]
access-sw                 A          1          0                    01:00:00        10.10.99.13
branch-fw                 A          1          0                    01:00:00        10.10.199.2
core-branch               A          1          0                    01:00:00        10.10.199.1
core-hq                   A          1          0                    01:00:00        10.10.99.1
dashboard                 A          1          0                    01:00:00        10.10.20.50
DomainDnsZones            A          1          05/23/26 10:00:00 PM 00:10:00        10.10.10.10
_ldap._tcp.Default-Fir... SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][389][win-server.ilwij.lab.]
_ldap._tcp.DomainDnsZones SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][389][win-server.ilwij.lab.]
ForestDnsZones            A          1          05/23/26 10:00:00 PM 00:10:00        10.10.10.10
_ldap._tcp.Default-Fir... SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][389][win-server.ilwij.lab.]
_ldap._tcp.ForestDnsZones SRV        33         05/23/26 10:00:00 PM 00:10:00        [0][100][389][win-server.ilwij.lab.]
k3s-master                A          1          0                    01:00:00        10.10.20.10
k3s-worker                A          1          0                    01:00:00        10.10.20.11
ntp                       A          1          0                    01:00:00        10.10.20.51
paloalto                  A          1          0                    01:00:00        10.10.99.10
proxmox                   A          1          0                    01:00:00        10.10.99.18
server-sw                 A          1          0                    01:00:00        10.10.99.12
sw-branch                 A          1          0                    01:00:00        10.10.199.10
win-server                A          1          0                    01:00:00        10.10.10.10
win10                     A          1          0                    01:00:00        10.10.30.21

### 3.6 NPS / RADIUS
<?xml version="1.0"?>

-<Root xmlns:dt="urn:schemas-microsoft-com:datatypes">


-<_locDefinition>

<_locDefault _loc="locNone"/>

<_locDefaultAttr _loc="locNone"/>

<_locTag _loc="locNone" _locAttrData="name">Connections_to_other_access_servers</_locTag>

<_locTag _loc="locNone" _locAttrData="name">Connections_to_Microsoft_Routing_and_Remote_Access_server</_locTag>

<_locTag _loc="locNone" _locAttrData="name">Use_Windows_authentication_for_all_users</_locTag>

</_locDefinition>


-<Children>

<Version dt:dt="int" name="Version">257</Version>

<TemplatesTimestamp dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes" name="TemplatesTimestamp"/>


-<Microsoft_Internet_Authentication_Service name="Microsoft_Internet_Authentication_Service">


-<Properties>

<Description>NPS</Description>

</Properties>


-<Children>


-<RadiusProfiles name="RadiusProfiles">


-<Children>


-<Connections_to_other_access_servers name="Connections to other access servers">


-<Properties>

<msRADIUSFramedProtocol dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</msRADIUSFramedProtocol>

<msRADIUSServiceType dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">2</msRADIUSServiceType>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">3</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">4</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">9</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">10</msNPAuthenticationType2>

<msNPAllowDialin dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</msNPAllowDialin>

</Properties>

</Connections_to_other_access_servers>


-<Connections_to_Microsoft_Routing_and_Remote_Access_server name="Connections to Microsoft Routing and Remote Access server">


-<Properties>

<msRADIUSFramedProtocol dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</msRADIUSFramedProtocol>

<msRADIUSServiceType dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">2</msRADIUSServiceType>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">5</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">4</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">10</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">3</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">9</msNPAuthenticationType2>

<msNPAllowedEapType dt:dt="bin.hex" xmlns:dt="urn:schemas-microsoft-com:datatypes">1a000000000000000000000000000000</msNPAllowedEapType>

<msNPAllowedEapType dt:dt="bin.hex" xmlns:dt="urn:schemas-microsoft-com:datatypes">0d000000000000000000000000000000</msNPAllowedEapType>

<msNPAllowDialin dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</msNPAllowDialin>

<msRASMPPEEncryptionPolicy dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">2</msRASMPPEEncryptionPolicy>

<msRASMPPEEncryptionType dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">14</msRASMPPEEncryptionType>

<msRASFilter dt:dt="bin.hex" xmlns:dt="urn:schemas-microsoft-com:datatypes">0100000048000000010000000100FFFF2800000001000000200000000000000001000000010000000100000000000000000000000000000000000000000000000000000000000000</msRASFilter>

</Properties>

</Connections_to_Microsoft_Routing_and_Remote_Access_server>


-<infra_admins_full_access name="infra-admins-full-access">


-<Properties>

<IP_Filter_Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</IP_Filter_Template_Guid>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

<msCiscoAV dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">shell:priv-lvl=15</msCiscoAV>

<msNPAllowDialin dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</msNPAllowDialin>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">3</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">9</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">4</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">10</msNPAuthenticationType2>

<msRADIUSAnyVSA dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">0100006375010Bsuperuser</msRADIUSAnyVSA>

<msRADIUSAnyVSA dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">0100003044010Einfra-admins</msRADIUSAnyVSA>

<msRADIUSServiceType dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</msRADIUSServiceType>

</Properties>

</infra_admins_full_access>


-<readonly_limited_access name="readonly-limited-access">


-<Properties>

<IP_Filter_Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</IP_Filter_Template_Guid>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

<msCiscoAV dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">shell:priv-lvl=1</msCiscoAV>

<msNPAllowDialin dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</msNPAllowDialin>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">3</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">9</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">4</msNPAuthenticationType2>

<msNPAuthenticationType2 dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">10</msNPAuthenticationType2>

<msRADIUSAnyVSA dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">0100006375010Edevicereader</msRADIUSAnyVSA>

<msRADIUSAnyVSA dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">0100003044010Areadonly</msRADIUSAnyVSA>

<msRADIUSServiceType dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</msRADIUSServiceType>

</Properties>

</readonly_limited_access>

</Children>

</RadiusProfiles>


-<NetworkPolicy name="NetworkPolicy">


-<Children>


-<Connections_to_other_access_servers name="Connections to other access servers">


-<Properties>

<msNPAction dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes" _loc="locData">Connections to other access servers</msNPAction>

<msNPConstraint dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">TIMEOFDAY("0 00:00-24:00; 1 00:00-24:00; 2 00:00-24:00; 3 00:00-24:00; 4 00:00-24:00; 5 00:00-24:00; 6 00:00-24:00")</msNPConstraint>

<msNPSequence dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">999999</msNPSequence>

</Properties>

</Connections_to_other_access_servers>


-<Connections_to_Microsoft_Routing_and_Remote_Access_server name="Connections to Microsoft Routing and Remote Access server">


-<Properties>

<msNPAction dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes" _loc="locData">Connections to Microsoft Routing and Remote Access server</msNPAction>

<msNPConstraint dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">MATCH("MS-RAS-Vendor=^311$")</msNPConstraint>

<msNPSequence dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">999998</msNPSequence>

</Properties>

</Connections_to_Microsoft_Routing_and_Remote_Access_server>


-<infra_admins_full_access name="infra-admins-full-access">


-<Properties>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Policy_Enabled dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</Policy_Enabled>

<Policy_SourceTag dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</Policy_SourceTag>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

<msNPAction dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">infra-admins-full-access</msNPAction>

<msNPConstraint dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">NTGROUPS("S-1-5-21-1885307410-1168006068-2189002089-1103")</msNPConstraint>

<msNPSequence dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</msNPSequence>

</Properties>

</infra_admins_full_access>


-<readonly_limited_access name="readonly-limited-access">


-<Properties>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Policy_Enabled dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</Policy_Enabled>

<Policy_SourceTag dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</Policy_SourceTag>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

<msNPAction dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">readonly-limited-access</msNPAction>

<msNPConstraint dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">NTGROUPS("S-1-5-21-1885307410-1168006068-2189002089-1104")</msNPConstraint>

<msNPSequence dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">2</msNPSequence>

</Properties>

</readonly_limited_access>

</Children>

</NetworkPolicy>


-<Proxy_Policies name="Proxy_Policies">


-<Children>


-<Use_Windows_authentication_for_all_users name="Use Windows authentication for all users">


-<Properties>

<msNPAction dt:dt="string" _loc="locData">Use Windows authentication for all users</msNPAction>

<msNPConstraint dt:dt="string">TIMEOFDAY("0 00:00-24:00; 1 00:00-24:00; 2 00:00-24:00; 3 00:00-24:00; 4 00:00-24:00; 5 00:00-24:00; 6 00:00-24:00")</msNPConstraint>

<msNPSequence dt:dt="int">999999</msNPSequence>

</Properties>

</Use_Windows_authentication_for_all_users>

</Children>

</Proxy_Policies>


-<Proxy_Profiles name="Proxy_Profiles">


-<Children>


-<Use_Windows_authentication_for_all_users name="Use Windows authentication for all users">


-<Properties>

<msAuthProviderType dt:dt="int">1</msAuthProviderType>

</Properties>

</Use_Windows_authentication_for_all_users>

</Children>

</Proxy_Profiles>


-<Protocols name="Protocols">


-<Children>


-<Microsoft_Protocol_Surrogate name="Microsoft Protocol Surrogate">


-<Properties>

<Component_Prog_Id dt:dt="string">IAS.IasHelper</Component_Prog_Id>

<Component_Id dt:dt="int">262145</Component_Id>

</Properties>

</Microsoft_Protocol_Surrogate>


-<Microsoft_Radius_Protocol name="Microsoft Radius Protocol">


-<Properties>

<Component_Prog_Id dt:dt="string">IAS.RadiusProtocol</Component_Prog_Id>

<Component_Id dt:dt="int">262144</Component_Id>

<Authentication_Port dt:dt="string">1812,1645</Authentication_Port>

<Accounting_Port dt:dt="string">1813,1646</Accounting_Port>

</Properties>


-<Children>


-<Vendors name="Vendors">


-<Children>


-<RADIUS_Standard name="RADIUS Standard">


-<Properties>

<NAS_Vendor_Id dt:dt="int">0</NAS_Vendor_Id>

</Properties>

</RADIUS_Standard>


-<_Com name="3Com">


-<Properties>

<NAS_Vendor_Id dt:dt="int">43</NAS_Vendor_Id>

</Properties>

</_Com>


-<ACC name="ACC">


-<Properties>

<NAS_Vendor_Id dt:dt="int">5</NAS_Vendor_Id>

</Properties>

</ACC>


-<ADC_Kentrox name="ADC Kentrox">


-<Properties>

<NAS_Vendor_Id dt:dt="int">181</NAS_Vendor_Id>

</Properties>

</ADC_Kentrox>


-<Ascend_Communications_Inc_ name="Ascend Communications Inc.">


-<Properties>

<NAS_Vendor_Id dt:dt="int">529</NAS_Vendor_Id>

</Properties>

</Ascend_Communications_Inc_>


-<BBN name="BBN">


-<Properties>

<NAS_Vendor_Id dt:dt="int">14</NAS_Vendor_Id>

</Properties>

</BBN>


-<BinTec_Communications_GmbH name="BinTec Communications GmbH">


-<Properties>

<NAS_Vendor_Id dt:dt="int">272</NAS_Vendor_Id>

</Properties>

</BinTec_Communications_GmbH>


-<Cabletron_Systems name="Cabletron Systems">


-<Properties>

<NAS_Vendor_Id dt:dt="int">52</NAS_Vendor_Id>

</Properties>

</Cabletron_Systems>


-<Cisco name="Cisco">


-<Properties>

<NAS_Vendor_Id dt:dt="int">9</NAS_Vendor_Id>

</Properties>

</Cisco>


-<Digi_International name="Digi International">


-<Properties>

<NAS_Vendor_Id dt:dt="int">332</NAS_Vendor_Id>

</Properties>

</Digi_International>


-<EICON name="EICON">


-<Properties>

<NAS_Vendor_Id dt:dt="int">434</NAS_Vendor_Id>

</Properties>

</EICON>


-<Gandalf name="Gandalf">


-<Properties>

<NAS_Vendor_Id dt:dt="int">64</NAS_Vendor_Id>

</Properties>

</Gandalf>


-<Intel_Corporation name="Intel Corporation">


-<Properties>

<NAS_Vendor_Id dt:dt="int">343</NAS_Vendor_Id>

</Properties>

</Intel_Corporation>


-<Lantronix name="Lantronix">


-<Properties>

<NAS_Vendor_Id dt:dt="int">244</NAS_Vendor_Id>

</Properties>

</Lantronix>


-<Livingston_Enterprises__Inc_ name="Livingston Enterprises, Inc.">


-<Properties>

<NAS_Vendor_Id dt:dt="int">307</NAS_Vendor_Id>

</Properties>

</Livingston_Enterprises__Inc_>


-<Proteon name="Proteon">


-<Properties>

<NAS_Vendor_Id dt:dt="int">1</NAS_Vendor_Id>

</Properties>

</Proteon>


-<Shiva_Corporation name="Shiva Corporation">


-<Properties>

<NAS_Vendor_Id dt:dt="int">166</NAS_Vendor_Id>

</Properties>

</Shiva_Corporation>


-<Telebit name="Telebit">


-<Properties>

<NAS_Vendor_Id dt:dt="int">117</NAS_Vendor_Id>

</Properties>

</Telebit>


-<U_S__Robotics__Inc_ name="U.S. Robotics, Inc.">


-<Properties>

<NAS_Vendor_Id dt:dt="int">429</NAS_Vendor_Id>

</Properties>

</U_S__Robotics__Inc_>


-<Xylogics__Inc_ name="Xylogics, Inc.">


-<Properties>

<NAS_Vendor_Id dt:dt="int">15</NAS_Vendor_Id>

</Properties>

</Xylogics__Inc_>


-<Microsoft name="Microsoft">


-<Properties>

<NAS_Vendor_Id dt:dt="int">311</NAS_Vendor_Id>

</Properties>

</Microsoft>


-<RedBack_Networks name="RedBack Networks">


-<Properties>

<NAS_Vendor_Id dt:dt="int">2352</NAS_Vendor_Id>

</Properties>

</RedBack_Networks>


-<Nortel_Networks name="Nortel Networks">


-<Properties>

<NAS_Vendor_Id dt:dt="int">562</NAS_Vendor_Id>

</Properties>

</Nortel_Networks>

</Children>

</Vendors>


-<Clients name="Clients">


-<Children>


-<CoreHQ name="CoreHQ">


-<Properties>

<Client_Secret_Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Client_Secret_Template_Guid>

<IP_Address dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">10.10.99.1</IP_Address>

<NAS_Manufacturer dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</NAS_Manufacturer>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Radius_Client_Enabled dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</Radius_Client_Enabled>

<Require_Signature dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</Require_Signature>

<Shared_Secret dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">radius123</Shared_Secret>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

</Properties>

</CoreHQ>


-<ServerSwitch name="ServerSwitch">


-<Properties>

<Client_Secret_Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Client_Secret_Template_Guid>

<IP_Address dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">10.10.99.12</IP_Address>

<NAS_Manufacturer dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</NAS_Manufacturer>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Radius_Client_Enabled dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</Radius_Client_Enabled>

<Require_Signature dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</Require_Signature>

<Shared_Secret dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">radius123</Shared_Secret>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

</Properties>

</ServerSwitch>


-<AccessSwitch name="AccessSwitch">


-<Properties>

<Client_Secret_Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Client_Secret_Template_Guid>

<IP_Address dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">10.10.99.13</IP_Address>

<NAS_Manufacturer dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</NAS_Manufacturer>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Radius_Client_Enabled dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</Radius_Client_Enabled>

<Require_Signature dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</Require_Signature>

<Shared_Secret dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">radius123</Shared_Secret>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

</Properties>

</AccessSwitch>


-<PaloAlto name="PaloAlto">


-<Properties>

<Client_Secret_Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Client_Secret_Template_Guid>

<IP_Address dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">10.10.99.10</IP_Address>

<NAS_Manufacturer dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</NAS_Manufacturer>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Radius_Client_Enabled dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</Radius_Client_Enabled>

<Require_Signature dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</Require_Signature>

<Shared_Secret dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">radius123</Shared_Secret>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

</Properties>

</PaloAlto>


-<Fortigate name="Fortigate">


-<Properties>

<Client_Secret_Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Client_Secret_Template_Guid>

<IP_Address dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">10.10.199.2</IP_Address>

<NAS_Manufacturer dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</NAS_Manufacturer>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Radius_Client_Enabled dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</Radius_Client_Enabled>

<Require_Signature dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</Require_Signature>

<Shared_Secret dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">radius123</Shared_Secret>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

</Properties>

</Fortigate>


-<Core_Branch name="Core-Branch">


-<Properties>

<Client_Secret_Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Client_Secret_Template_Guid>

<IP_Address dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">172.16.1.17</IP_Address>

<NAS_Manufacturer dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</NAS_Manufacturer>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Radius_Client_Enabled dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</Radius_Client_Enabled>

<Require_Signature dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</Require_Signature>

<Shared_Secret dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">radius123</Shared_Secret>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

</Properties>

</Core_Branch>


-<SW_Branch name="SW-Branch">


-<Properties>

<Client_Secret_Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Client_Secret_Template_Guid>

<IP_Address dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">10.10.199.10</IP_Address>

<NAS_Manufacturer dt:dt="int" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</NAS_Manufacturer>

<Opaque_Data dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes"/>

<Radius_Client_Enabled dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">1</Radius_Client_Enabled>

<Require_Signature dt:dt="boolean" xmlns:dt="urn:schemas-microsoft-com:datatypes">0</Require_Signature>

<Shared_Secret dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">radius123</Shared_Secret>

<Template_Guid dt:dt="string" xmlns:dt="urn:schemas-microsoft-com:datatypes">{00000000-0000-0000-0000-000000000000}</Template_Guid>

</Properties>

</SW_Branch>

</Children>

</Clients>

</Children>

</Microsoft_Radius_Protocol>

</Children>

</Protocols>


-<RequestHandlers name="RequestHandlers">


-<Children>


-<Microsoft_Network_Access_Policy_Evaluator name="Microsoft Network Access Policy Evaluator">


-<Properties>

<Component_Prog_Id dt:dt="string">IAS.PolicyEnforcer</Component_Prog_Id>

<Component_Id dt:dt="int">7</Component_Id>

</Properties>

</Microsoft_Network_Access_Policy_Evaluator>


-<Microsoft_NT_SAM_Authentication name="Microsoft NT SAM Authentication">


-<Properties>

<Component_Prog_Id dt:dt="string">IAS.NTSamAuthentication</Component_Prog_Id>

<Component_Id dt:dt="int">1</Component_Id>

<Allow_LM_Authentication dt:dt="boolean">1</Allow_LM_Authentication>

</Properties>

</Microsoft_NT_SAM_Authentication>


-<Microsoft_Proxy_Policy_Evaluator name="Microsoft Proxy Policy Evaluator">


-<Properties>

<Component_Prog_Id dt:dt="string">IAS.ProxyPolicyEnforcer</Component_Prog_Id>

<Component_Id dt:dt="int">5</Component_Id>

</Properties>

</Microsoft_Proxy_Policy_Evaluator>


-<Microsoft_RADIUS_Proxy name="Microsoft RADIUS Proxy">


-<Properties>

<Component_Prog_Id dt:dt="string">IAS.RadiusProxy</Component_Prog_Id>

<Component_Id dt:dt="int">8</Component_Id>

</Properties>

</Microsoft_RADIUS_Proxy>


-<Microsoft_Accounting name="Microsoft Accounting">


-<Properties>

<Component_Prog_Id dt:dt="string">IAS.Accounting</Component_Prog_Id>

<Component_Id dt:dt="int">9</Component_Id>

<Delete_If_Full dt:dt="boolean">1</Delete_If_Full>

<Log_Accounting_Packets dt:dt="boolean">1</Log_Accounting_Packets>

<Log_Authentication_Packets dt:dt="boolean">1</Log_Authentication_Packets>

<Log_Format dt:dt="int">65535</Log_Format>

<Log_Interim_Accounting_Packets dt:dt="boolean">1</Log_Interim_Accounting_Packets>

<Log_Interim_Authentication_Packets dt:dt="boolean">1</Log_Interim_Authentication_Packets>

<New_Log_Frequency dt:dt="int">3</New_Log_Frequency>

<New_Log_Size dt:dt="int">10</New_Log_Size>

<Log_File_Is_Backup dt:dt="boolean">0</Log_File_Is_Backup>

<Discard_On_Failure dt:dt="boolean">1</Discard_On_Failure>

</Properties>

</Microsoft_Accounting>


-<Microsoft_Database_Accounting name="Microsoft Database Accounting">


-<Properties>

<Component_Prog_Id dt:dt="string">IAS.DatabaseAccounting</Component_Prog_Id>

<Component_Id dt:dt="int">13</Component_Id>

<Log_Accounting_Packets dt:dt="boolean">1</Log_Accounting_Packets>

<Log_Authentication_Packets dt:dt="boolean">1</Log_Authentication_Packets>

<Log_Interim_Accounting_Packets dt:dt="boolean">1</Log_Interim_Accounting_Packets>

<Log_Interim_Authentication_Packets dt:dt="boolean">1</Log_Interim_Authentication_Packets>

<SQL_Max_Sessions dt:dt="int">20</SQL_Max_Sessions>

<Discard_On_Failure dt:dt="boolean">1</Discard_On_Failure>

</Properties>

</Microsoft_Database_Accounting>

</Children>

</RequestHandlers>


-<Auditors name="Auditors">


-<Children>


-<Microsoft_NT_Event_Log_Auditor name="Microsoft NT Event Log Auditor">


-<Properties>

<Component_Prog_Id dt:dt="string">IAS.NTEventLog</Component_Prog_Id>

<Component_Id dt:dt="int">524288</Component_Id>

<Log_Application_Events dt:dt="boolean">1</Log_Application_Events>

<Log_Malformed_Packets dt:dt="boolean">1</Log_Malformed_Packets>

<Log_Verbose dt:dt="boolean">1</Log_Verbose>

</Properties>

</Microsoft_NT_Event_Log_Auditor>

</Children>

</Auditors>


-<RADIUS_Server_Groups name="RADIUS_Server_Groups">

<Children> </Children>

</RADIUS_Server_Groups>

</Children>

</Microsoft_Internet_Authentication_Service>


-<SDO_Schema name="SDO_Schema">


-<Children>


-<SDO_Schema_Classes name="SDO_Schema_Classes">


-<Children>


-<Client_SDO name="Client_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.SdoClient</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">Require_Signature</RequiredProperties>

<RequiredProperties dt:dt="string">Shared_Secret</RequiredProperties>

<RequiredProperties dt:dt="string">NAS_Manufacturer</RequiredProperties>

<RequiredProperties dt:dt="string">IP_Address</RequiredProperties>

<RequiredProperties dt:dt="string">Radius_Client_Enabled</RequiredProperties>

<OptionalProperties dt:dt="string">Template_Guid</OptionalProperties>

<OptionalProperties dt:dt="string">Opaque_Data</OptionalProperties>

<OptionalProperties dt:dt="string">Client_Secret_Template_Guid</OptionalProperties>

</Properties>

</Client_SDO>


-<Condition_SDO name="Condition_SDO">


-<Properties>

<ClassId>IAS.SdoCondition</ClassId>

<RequiredProperties dt:dt="string">Condition_Text</RequiredProperties>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

</Properties>

</Condition_SDO>


-<Policy_SDO name="Policy_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.SdoPolicy</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">msNPConstraint</RequiredProperties>

<RequiredProperties dt:dt="string">msNPSequence</RequiredProperties>

<RequiredProperties dt:dt="string">msNPAction</RequiredProperties>

<RequiredProperties dt:dt="string">Policy_Action</RequiredProperties>

<RequiredProperties dt:dt="string">Conditions</RequiredProperties>

<RequiredProperties dt:dt="string">Policy_Enabled</RequiredProperties>

<RequiredProperties dt:dt="string">Policy_SourceTag</RequiredProperties>

<OptionalProperties dt:dt="string">Template_Guid</OptionalProperties>

<OptionalProperties dt:dt="string">Opaque_Data</OptionalProperties>

</Properties>

</Policy_SDO>


-<Profile_SDO name="Profile_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.SdoProfile</ClassId>

<RequiredProperties dt:dt="string">Profile_Attributes</RequiredProperties>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<OptionalProperties dt:dt="string">Template_Guid</OptionalProperties>

<OptionalProperties dt:dt="string">Opaque_Data</OptionalProperties>

<OptionalProperties dt:dt="string">IP_Filter_Template_Guid</OptionalProperties>

</Properties>

</Profile_SDO>


-<Microsoft_NT_Event_Log_SDO name="Microsoft_NT_Event_Log_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.NTEventLog</ClassId>

<RequiredProperties dt:dt="string">Component_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Prog_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Log_Application_Events</RequiredProperties>

<RequiredProperties dt:dt="string">Log_Malformed_Packets</RequiredProperties>

<RequiredProperties dt:dt="string">Log_Verbose</RequiredProperties>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

</Properties>

</Microsoft_NT_Event_Log_SDO>


-<Microsoft_Network_Access_Policy_Evaluator_SDO name="Microsoft_Network_Access_Policy_Evaluator_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.PolicyEnforcer</ClassId>

<RequiredProperties dt:dt="string">Component_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Prog_Id</RequiredProperties>

<RequiredProperties dt:dt="string">NAP_Policies</RequiredProperties>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

</Properties>

</Microsoft_Network_Access_Policy_Evaluator_SDO>


-<Microsoft_NT_SAM_Authentication_SDO name="Microsoft_NT_SAM_Authentication_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.NTSamAuthentication</ClassId>

<OptionalProperties dt:dt="string">Allow_LM_Authentication</OptionalProperties>

<RequiredProperties dt:dt="string">Component_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Prog_Id</RequiredProperties>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

</Properties>

</Microsoft_NT_SAM_Authentication_SDO>


-<Microsoft_Accounting_SDO name="Microsoft_Accounting_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.Accounting</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Prog_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Log_Accounting_Packets</RequiredProperties>

<RequiredProperties dt:dt="string">Log_Interim_Accounting_Packets</RequiredProperties>

<RequiredProperties dt:dt="string">Log_Authentication_Packets</RequiredProperties>

<RequiredProperties dt:dt="string">New_Log_Frequency</RequiredProperties>

<RequiredProperties dt:dt="string">New_Log_Size</RequiredProperties>

<RequiredProperties dt:dt="string">Log_File_Directory</RequiredProperties>

<RequiredProperties dt:dt="string">Log_Format</RequiredProperties>

<OptionalProperties dt:dt="string">Delete_If_Full</OptionalProperties>

<OptionalProperties dt:dt="string">Log_Interim_Authentication_Packets</OptionalProperties>

<RequiredProperties dt:dt="string">Log_File_Is_Backup</RequiredProperties>

<RequiredProperties dt:dt="string">Discard_On_Failure</RequiredProperties>

<OptionalProperties dt:dt="string">Template_Guid</OptionalProperties>

<OptionalProperties dt:dt="string">Opaque_Data</OptionalProperties>

</Properties>

</Microsoft_Accounting_SDO>


-<IAS_SDO name="IAS_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.SdoServiceIAS</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">Description</RequiredProperties>

<RequiredProperties dt:dt="string">Policies</RequiredProperties>

<RequiredProperties dt:dt="string">Profiles</RequiredProperties>

<RequiredProperties dt:dt="string">Protocols</RequiredProperties>

<RequiredProperties dt:dt="string">Auditors</RequiredProperties>

<RequiredProperties dt:dt="string">Request_Handlers</RequiredProperties>

<RequiredProperties dt:dt="string">RADIUS_Server_Groups</RequiredProperties>

<RequiredProperties dt:dt="string">Proxy_Policies</RequiredProperties>

<RequiredProperties dt:dt="string">Proxy_Profiles</RequiredProperties>

</Properties>

</IAS_SDO>


-<TEMPLATES_SDO name="TEMPLATES_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.SdoTemplatesRoot</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">Description</RequiredProperties>

<RequiredProperties dt:dt="string">Policies_Templates</RequiredProperties>

<RequiredProperties dt:dt="string">Profiles_Templates</RequiredProperties>

<RequiredProperties dt:dt="string">Profiles_InPolicyTemplates</RequiredProperties>

<RequiredProperties dt:dt="string">ProxyPolicies_Templates</RequiredProperties>

<RequiredProperties dt:dt="string">ProxyProfiles_Templates</RequiredProperties>

<RequiredProperties dt:dt="string">ProxyProfiles_InPolicyTemplates</RequiredProperties>

<RequiredProperties dt:dt="string">Radius_Clients_Templates</RequiredProperties>

<RequiredProperties dt:dt="string">RADIUS_Servers_Templates</RequiredProperties>

<RequiredProperties dt:dt="string">RADIUS_Shared_Secrets_Templates</RequiredProperties>

<RequiredProperties dt:dt="string">IP_Filters_Templates</RequiredProperties>

</Properties>

</TEMPLATES_SDO>


-<RADIUS_SDO name="RADIUS_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.RadiusProtocol</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Prog_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Vendor_Information</RequiredProperties>

<RequiredProperties dt:dt="string">Clients</RequiredProperties>

<RequiredProperties dt:dt="string">Authentication_Port</RequiredProperties>

<RequiredProperties dt:dt="string">Accounting_Port</RequiredProperties>

</Properties>

</RADIUS_SDO>


-<Protocol_Surrogate_SDO name="Protocol_Surrogate_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.IasHelper</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Prog_Id</RequiredProperties>

</Properties>

</Protocol_Surrogate_SDO>


-<Vendor_Information_SDO name="Vendor_Information_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.SdoVendor</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">NAS_Vendor_Id</RequiredProperties>

</Properties>

</Vendor_Information_SDO>


-<RADIUS_Server_Group_SDO name="RADIUS_Server_Group_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.SdoRadiusServerGroup</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">Servers</RequiredProperties>

</Properties>

</RADIUS_Server_Group_SDO>


-<RADIUS_Server_SDO name="RADIUS_Server_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.SdoRadiusServer</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<OptionalProperties dt:dt="string">Server_Accounting_Port</OptionalProperties>

<OptionalProperties dt:dt="string">Server_Authentication_Port</OptionalProperties>

<OptionalProperties dt:dt="string">Accounting_Secret</OptionalProperties>

<OptionalProperties dt:dt="string">Authentication_Secret</OptionalProperties>

<OptionalProperties dt:dt="string">Address</OptionalProperties>

<OptionalProperties dt:dt="string">Forward_Accounting_On_Off</OptionalProperties>

<OptionalProperties dt:dt="string">Priority</OptionalProperties>

<OptionalProperties dt:dt="string">Weight</OptionalProperties>

<OptionalProperties dt:dt="string">Timeout</OptionalProperties>

<OptionalProperties dt:dt="string">Maximum_Lost_Packets</OptionalProperties>

<OptionalProperties dt:dt="string">Blackout_Interval</OptionalProperties>

<OptionalProperties dt:dt="string">Send_Signature</OptionalProperties>

<OptionalProperties dt:dt="string">Template_Guid</OptionalProperties>

<OptionalProperties dt:dt="string">Opaque_Data</OptionalProperties>

<OptionalProperties dt:dt="string">Auth_Secret_Template_Guid</OptionalProperties>

<OptionalProperties dt:dt="string">Acct_Secret_Template_Guid</OptionalProperties>

</Properties>

</RADIUS_Server_SDO>


-<Microsoft_Proxy_Policy_Evaluator_SDO name="Microsoft_Proxy_Policy_Evaluator_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.ProxyPolicyEnforcer</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Prog_Id</RequiredProperties>

<RequiredProperties dt:dt="string">NAP_Policies</RequiredProperties>

</Properties>

</Microsoft_Proxy_Policy_Evaluator_SDO>


-<Microsoft_RADIUS_Proxy_SDO name="Microsoft_RADIUS_Proxy_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.RadiusProxy</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Prog_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Server_Groups</RequiredProperties>

</Properties>

</Microsoft_RADIUS_Proxy_SDO>


-<Microsoft_Database_Accounting_SDO name="Microsoft_Database_Accounting_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.DatabaseAccounting</ClassId>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Component_Prog_Id</RequiredProperties>

<RequiredProperties dt:dt="string">Log_Accounting_Packets</RequiredProperties>

<RequiredProperties dt:dt="string">Log_Interim_Accounting_Packets</RequiredProperties>

<RequiredProperties dt:dt="string">Log_Authentication_Packets</RequiredProperties>

<RequiredProperties dt:dt="string">SQL_Max_Sessions</RequiredProperties>

<OptionalProperties dt:dt="string">Log_Interim_Authentication_Packets</OptionalProperties>

<RequiredProperties dt:dt="string">Discard_On_Failure</RequiredProperties>

<OptionalProperties dt:dt="string">Template_Guid</OptionalProperties>

<OptionalProperties dt:dt="string">Opaque_Data</OptionalProperties>

</Properties>

</Microsoft_Database_Accounting_SDO>


-<IP_Filter_SDO name="IP_Filter_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.SdoIPFilter</ClassId>

<RequiredProperties dt:dt="string">IP_Filter_Attributes</RequiredProperties>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<OptionalProperties dt:dt="string">Template_Guid</OptionalProperties>

</Properties>

</IP_Filter_SDO>


-<Shared_Secret_SDO name="Shared_Secret_SDO">


-<Properties>

<ClassId dt:dt="string">IAS.SdoSharedSecret</ClassId>

<RequiredProperties dt:dt="string">RADIUS_Shared_Secret</RequiredProperties>

<RequiredProperties dt:dt="string">{46557888-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<RequiredProperties dt:dt="string">{46557889-4DB8-11d2-8ECE-00C04FC2F519}</RequiredProperties>

<OptionalProperties dt:dt="string">Template_Guid</OptionalProperties>

</Properties>

</Shared_Secret_SDO>

</Children>

</SDO_Schema_Classes>


-<SDO_Schema_Properties name="SDO_Schema_Properties">


-<Children>


-<Description name="Description">


-<Properties>

<Alias dt:dt="int">3</Alias>

<Flags dt:dt="int">96</Flags>

<Syntax dt:dt="int">8</Syntax>

<MaxLength dt:dt="int">255</MaxLength>

</Properties>

</Description>


-<Template_Guid name="Template_Guid">


-<Properties>

<Alias dt:dt="int">6</Alias>

<Flags dt:dt="int">3120</Flags>

<Syntax dt:dt="int">8</Syntax>

<MinLength dt:dt="int">38</MinLength>

<MaxLength dt:dt="int">38</MaxLength>

<DefaultValue dt:dt="string">{00000000-0000-0000-0000-000000000000}</DefaultValue>

</Properties>

</Template_Guid>


-<Opaque_Data name="Opaque_Data">


-<Properties>

<Alias dt:dt="int">7</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">8</Syntax>

<DefaultValue dt:dt="string"/>

</Properties>

</Opaque_Data>


-<Policies name="Policies">


-<Properties>

<Alias dt:dt="int">1025</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Policies>


-<Profiles name="Profiles">


-<Properties>

<Alias dt:dt="int">1026</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Profiles>


-<Protocols name="Protocols">


-<Properties>

<Alias dt:dt="int">1027</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Protocols>


-<Auditors name="Auditors">


-<Properties>

<Alias dt:dt="int">1028</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Auditors>


-<Request_Handlers name="Request_Handlers">


-<Properties>

<Alias dt:dt="int">1029</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Request_Handlers>


-<Require_Signature name="Require_Signature">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">1088</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">0</DefaultValue>

</Properties>

</Require_Signature>


-<Shared_Secret name="Shared_Secret">


-<Properties>

<Alias dt:dt="int">1026</Alias>

<Flags dt:dt="int">112</Flags>

<Syntax dt:dt="int">8</Syntax>

<MinLength dt:dt="int">0</MinLength>

<MaxLength dt:dt="int">64</MaxLength>

</Properties>

</Shared_Secret>


-<NAS_Manufacturer name="NAS_Manufacturer">


-<Properties>

<Alias dt:dt="int">1027</Alias>

<Flags dt:dt="int">1088</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">0</DefaultValue>

</Properties>

</NAS_Manufacturer>


-<IP_Address name="IP_Address">


-<Properties>

<Alias dt:dt="int">1028</Alias>

<Flags dt:dt="int">64</Flags>

<Syntax dt:dt="int">8</Syntax>

</Properties>

</IP_Address>


-<Condition_Text name="Condition_Text">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">64</Flags>

<Syntax dt:dt="int">8</Syntax>

</Properties>

</Condition_Text>


-<Accounting_Port name="Accounting_Port">


-<Properties>

<Alias dt:dt="int">1027</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">8</Syntax>

<DefaultValue dt:dt="string">1813,1646</DefaultValue>

</Properties>

</Accounting_Port>


-<Authentication_Port name="Authentication_Port">


-<Properties>

<Alias dt:dt="int">1028</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">8</Syntax>

<DefaultValue dt:dt="string">1812,1645</DefaultValue>

</Properties>

</Authentication_Port>


-<Clients name="Clients">


-<Properties>

<Alias dt:dt="int">1029</Alias>

<Flags dt:dt="int">2498</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Clients>


-<Log_Application_Events name="Log_Application_Events">


-<Properties>

<Alias dt:dt="int">1026</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">1</DefaultValue>

</Properties>

</Log_Application_Events>


-<Log_Malformed_Packets name="Log_Malformed_Packets">


-<Properties>

<Alias dt:dt="int">1027</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">0</DefaultValue>

</Properties>

</Log_Malformed_Packets>


-<Log_Verbose name="Log_Verbose">


-<Properties>

<Alias dt:dt="int">1028</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">0</DefaultValue>

</Properties>

</Log_Verbose>


-<Allow_LM_Authentication name="Allow_LM_Authentication">


-<Properties>

<Alias dt:dt="int">1026</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">1</DefaultValue>

</Properties>

</Allow_LM_Authentication>


-<Log_Accounting_Packets name="Log_Accounting_Packets">


-<Properties>

<Alias dt:dt="int">1026</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">0</DefaultValue>

</Properties>

</Log_Accounting_Packets>


-<Log_Interim_Accounting_Packets name="Log_Interim_Accounting_Packets">


-<Properties>

<Alias dt:dt="int">1027</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">0</DefaultValue>

</Properties>

</Log_Interim_Accounting_Packets>


-<Log_Authentication_Packets name="Log_Authentication_Packets">


-<Properties>

<Alias dt:dt="int">1028</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">0</DefaultValue>

</Properties>

</Log_Authentication_Packets>


-<New_Log_Frequency name="New_Log_Frequency">


-<Properties>

<Alias dt:dt="int">1029</Alias>

<Flags dt:dt="int">3148</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">0</DefaultValue>

<MinValue dt:dt="int">0</MinValue>

<MaxValue dt:dt="int">5</MaxValue>

</Properties>

</New_Log_Frequency>


-<New_Log_Size name="New_Log_Size">


-<Properties>

<Alias dt:dt="int">1030</Alias>

<Flags dt:dt="int">3148</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">10</DefaultValue>

<MinValue dt:dt="int">1</MinValue>

<MaxValue dt:dt="int">100000</MaxValue>

</Properties>

</New_Log_Size>


-<Log_File_Directory name="Log_File_Directory">


-<Properties>

<Alias dt:dt="int">1031</Alias>

<Flags dt:dt="int">3184</Flags>

<Syntax dt:dt="int">8</Syntax>

<MinLength dt:dt="int">1</MinLength>

<MaxLength dt:dt="int">255</MaxLength>

<DefaultValue dt:dt="string">%windir%\LogFiles</DefaultValue>

</Properties>

</Log_File_Directory>


-<Log_Format name="Log_Format">


-<Properties>

<Alias dt:dt="int">1032</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">0</DefaultValue>

</Properties>

</Log_Format>


-<Component_Id name="Component_Id">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">64</Flags>

<Syntax dt:dt="int">3</Syntax>

</Properties>

</Component_Id>


-<Component_Prog_Id name="Component_Prog_Id">


-<Properties>

<Alias dt:dt="int">1025</Alias>

<Flags dt:dt="int">64</Flags>

<Syntax dt:dt="int">8</Syntax>

</Properties>

</Component_Prog_Id>


-<Dictionary_Location name="Dictionary_Location">


-<Properties>

<Alias dt:dt="int">1025</Alias>

<Flags dt:dt="int">448</Flags>

<Syntax dt:dt="int">8</Syntax>

</Properties>

</Dictionary_Location>


-<NAP_Policies name="NAP_Policies">


-<Properties>

<Alias dt:dt="int">1026</Alias>

<Flags dt:dt="int">2242</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</NAP_Policies>


-<msNPConstraint name="msNPConstraint">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">576</Flags>

<Syntax dt:dt="int">8</Syntax>

</Properties>

</msNPConstraint>


-<msNPSequence name="msNPSequence">


-<Properties>

<Alias dt:dt="int">1025</Alias>

<Flags dt:dt="int">64</Flags>

<Syntax dt:dt="int">3</Syntax>

</Properties>

</msNPSequence>


-<msNPAction name="msNPAction">


-<Properties>

<Alias dt:dt="int">1028</Alias>

<Flags dt:dt="int">112</Flags>

<Syntax dt:dt="int">8</Syntax>

<MinLength dt:dt="int">1</MinLength>

<MaxLength dt:dt="int">255</MaxLength>

</Properties>

</msNPAction>


-<Policy_Action name="Policy_Action">


-<Properties>

<Alias dt:dt="int">1029</Alias>

<Flags dt:dt="int">193</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Policy_Action>


-<Conditions name="Conditions">


-<Properties>

<Alias dt:dt="int">1030</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Conditions>


-<Profile_Attributes name="Profile_Attributes">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Profile_Attributes>


-<Attribute_Value name="Attribute_Value">


-<Properties>

<Alias dt:dt="int">1036</Alias>

<Flags dt:dt="int">192</Flags>

<Syntax dt:dt="int">0</Syntax>

</Properties>

</Attribute_Value>


-<NAS_Vendor_Id name="NAS_Vendor_Id">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">320</Flags>

<Syntax dt:dt="int">3</Syntax>

</Properties>

</NAS_Vendor_Id>


-<Vendor_Information name="Vendor_Information">


-<Properties>

<Alias dt:dt="int">1030</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Vendor_Information>


-<Proxy_Policies name="Proxy_Policies">


-<Properties>

<Alias dt:dt="int">1030</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Proxy_Policies>


-<Proxy_Profiles name="Proxy_Profiles">


-<Properties>

<Alias dt:dt="int">1031</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Proxy_Profiles>


-<RADIUS_Server_Groups name="RADIUS_Server_Groups">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</RADIUS_Server_Groups>


-<Servers name="Servers">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Servers>


-<Server_Accounting_Port name="Server_Accounting_Port">


-<Properties>

<Alias dt:dt="int">1026</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">1813</DefaultValue>

</Properties>

</Server_Accounting_Port>


-<Accounting_Secret name="Accounting_Secret">


-<Properties>

<Alias dt:dt="int">1027</Alias>

<Flags dt:dt="int">0</Flags>

<Syntax dt:dt="int">8</Syntax>

</Properties>

</Accounting_Secret>


-<Server_Authentication_Port name="Server_Authentication_Port">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">1812</DefaultValue>

</Properties>

</Server_Authentication_Port>


-<Authentication_Secret name="Authentication_Secret">


-<Properties>

<Alias dt:dt="int">1025</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">8</Syntax>

<DefaultValue dt:dt="string"/>

</Properties>

</Authentication_Secret>


-<Address name="Address">


-<Properties>

<Alias dt:dt="int">1028</Alias>

<Flags dt:dt="int">0</Flags>

<Syntax dt:dt="int">8</Syntax>

</Properties>

</Address>


-<Forward_Accounting_On_Off name="Forward_Accounting_On_Off">


-<Properties>

<Alias dt:dt="int">1029</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">1</DefaultValue>

</Properties>

</Forward_Accounting_On_Off>


-<Priority name="Priority">


-<Properties>

<Alias dt:dt="int">1030</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">1</DefaultValue>

</Properties>

</Priority>


-<Weight name="Weight">


-<Properties>

<Alias dt:dt="int">1031</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">50</DefaultValue>

</Properties>

</Weight>


-<Server_Groups name="Server_Groups">


-<Properties>

<Alias dt:dt="int">1026</Alias>

<Flags dt:dt="int">2242</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Server_Groups>


-<Timeout name="Timeout">


-<Properties>

<Alias dt:dt="int">1032</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">3</DefaultValue>

</Properties>

</Timeout>


-<Maximum_Lost_Packets name="Maximum_Lost_Packets">


-<Properties>

<Alias dt:dt="int">1033</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">5</DefaultValue>

</Properties>

</Maximum_Lost_Packets>


-<Blackout_Interval name="Blackout_Interval">


-<Properties>

<Alias dt:dt="int">1034</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">30</DefaultValue>

</Properties>

</Blackout_Interval>


-<Delete_If_Full name="Delete_If_Full">


-<Properties>

<Alias dt:dt="int">1034</Alias>

<Flags dt:dt="int">3072</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">0</DefaultValue>

</Properties>

</Delete_If_Full>


-<SQL_Max_Sessions name="SQL_Max_Sessions">


-<Properties>

<Alias dt:dt="int">1035</Alias>

<Flags dt:dt="int">2060</Flags>

<Syntax dt:dt="int">3</Syntax>

<MinValue dt:dt="int">1</MinValue>

<MaxValue dt:dt="int">100</MaxValue>

</Properties>

</SQL_Max_Sessions>


-<Log_Interim_Authentication_Packets name="Log_Interim_Authentication_Packets">


-<Properties>

<Alias dt:dt="int">1036</Alias>

<Flags dt:dt="int">3072</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">0</DefaultValue>

</Properties>

</Log_Interim_Authentication_Packets>


-<Policy_Enabled name="Policy_Enabled">


-<Properties>

<Alias dt:dt="int">1031</Alias>

<Flags dt:dt="int">1088</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">1</DefaultValue>

</Properties>

</Policy_Enabled>


-<Radius_Client_Enabled name="Radius_Client_Enabled">


-<Properties>

<Alias dt:dt="int">1030</Alias>

<Flags dt:dt="int">1088</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">1</DefaultValue>

</Properties>

</Radius_Client_Enabled>


-<Send_Signature name="Send_Signature">


-<Properties>

<Alias dt:dt="int">1035</Alias>

<Flags dt:dt="int">1088</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">1</DefaultValue>

</Properties>

</Send_Signature>


-<Policy_SourceTag name="Policy_SourceTag">


-<Properties>

<Alias dt:dt="int">1032</Alias>

<Flags dt:dt="int">1088</Flags>

<Syntax dt:dt="int">3</Syntax>

<DefaultValue dt:dt="int">0</DefaultValue>

</Properties>

</Policy_SourceTag>


-<Log_File_Is_Backup name="Log_File_Is_Backup">


-<Properties>

<Alias dt:dt="int">1037</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">0</DefaultValue>

</Properties>

</Log_File_Is_Backup>


-<Discard_On_Failure name="Discard_On_Failure">


-<Properties>

<Alias dt:dt="int">1038</Alias>

<Flags dt:dt="int">3136</Flags>

<Syntax dt:dt="int">11</Syntax>

<DefaultValue dt:dt="boolean">1</DefaultValue>

</Properties>

</Discard_On_Failure>


-<Policies_Templates name="Policies_Templates">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Policies_Templates>


-<Profiles_Templates name="Profiles_Templates">


-<Properties>

<Alias dt:dt="int">1025</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Profiles_Templates>


-<Profiles_InPolicyTemplates name="Profiles_InPolicyTemplates">


-<Properties>

<Alias dt:dt="int">1026</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Profiles_InPolicyTemplates>


-<ProxyPolicies_Templates name="ProxyPolicies_Templates">


-<Properties>

<Alias dt:dt="int">1027</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</ProxyPolicies_Templates>


-<ProxyProfiles_Templates name="ProxyProfiles_Templates">


-<Properties>

<Alias dt:dt="int">1028</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</ProxyProfiles_Templates>


-<ProxyProfiles_InPolicyTemplates name="ProxyProfiles_InPolicyTemplates">


-<Properties>

<Alias dt:dt="int">1029</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</ProxyProfiles_InPolicyTemplates>


-<Radius_Clients_Templates name="Radius_Clients_Templates">


-<Properties>

<Alias dt:dt="int">1032</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</Radius_Clients_Templates>


-<RADIUS_Servers_Templates name="RADIUS_Servers_Templates">


-<Properties>

<Alias dt:dt="int">1033</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</RADIUS_Servers_Templates>


-<IP_Filter_Attributes name="IP_Filter_Attributes">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</IP_Filter_Attributes>


-<RADIUS_Shared_Secret name="RADIUS_Shared_Secret">


-<Properties>

<Alias dt:dt="int">1024</Alias>

<Flags dt:dt="int">1024</Flags>

<Syntax dt:dt="int">8</Syntax>

<DefaultValue dt:dt="string"/>

</Properties>

</RADIUS_Shared_Secret>


-<RADIUS_Shared_Secrets_Templates name="RADIUS_Shared_Secrets_Templates">


-<Properties>

<Alias dt:dt="int">1034</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</RADIUS_Shared_Secrets_Templates>


-<IP_Filters_Templates name="IP_Filters_Templates">


-<Properties>

<Alias dt:dt="int">1035</Alias>

<Flags dt:dt="int">450</Flags>

<Syntax dt:dt="int">9</Syntax>

</Properties>

</IP_Filters_Templates>


-<IP_Filter_Template_Guid name="IP_Filter_Template_Guid">


-<Properties>

<Alias dt:dt="int">1025</Alias>

<Flags dt:dt="int">3120</Flags>

<Syntax dt:dt="int">8</Syntax>

<MinLength dt:dt="int">38</MinLength>

<MaxLength dt:dt="int">38</MaxLength>

<DefaultValue dt:dt="string">{00000000-0000-0000-0000-000000000000}</DefaultValue>

</Properties>

</IP_Filter_Template_Guid>


-<Auth_Secret_Template_Guid name="Auth_Secret_Template_Guid">


-<Properties>

<Alias dt:dt="int">1036</Alias>

<Flags dt:dt="int">3120</Flags>

<Syntax dt:dt="int">8</Syntax>

<MinLength dt:dt="int">38</MinLength>

<MaxLength dt:dt="int">38</MaxLength>

<DefaultValue dt:dt="string">{00000000-0000-0000-0000-000000000000}</DefaultValue>

</Properties>

</Auth_Secret_Template_Guid>


-<Acct_Secret_Template_Guid name="Acct_Secret_Template_Guid">


-<Properties>

<Alias dt:dt="int">1037</Alias>

<Flags dt:dt="int">3120</Flags>

<Syntax dt:dt="int">8</Syntax>

<MinLength dt:dt="int">38</MinLength>

<MaxLength dt:dt="int">38</MaxLength>

<DefaultValue dt:dt="string">{00000000-0000-0000-0000-000000000000}</DefaultValue>

</Properties>

</Acct_Secret_Template_Guid>


-<Client_Secret_Template_Guid name="Client_Secret_Template_Guid">


-<Properties>

<Alias dt:dt="int">1031</Alias>

<Flags dt:dt="int">3120</Flags>

<Syntax dt:dt="int">8</Syntax>

<MinLength dt:dt="int">38</MinLength>

<MaxLength dt:dt="int">38</MaxLength>

<DefaultValue dt:dt="string">{00000000-0000-0000-0000-000000000000}</DefaultValue>

</Properties>

</Client_Secret_Template_Guid>

</Children>

</SDO_Schema_Properties>

</Children>

</SDO_Schema>

</Children>


-<registryKeys>


-<registryKey keyName="SYSTEM\CurrentControlSet\Services\IAS\Parameters">

<registryValue name="Allow SNMP Set" value="0" valueType="REG_DWORD"/>

</registryKey>


-<registryKey keyName="SYSTEM\CurrentControlSet\Services\RemoteAccess\Parameters\AccountLockout">

<registryValue name="MaxDenials" value="0" valueType="REG_DWORD"/>

</registryKey>


-<registryKey keyName="SYSTEM\CurrentControlSet\Services\RemoteAccess\Parameters\AccountLockout">

<registryValue name="ResetTime (mins)" value="2880" valueType="REG_DWORD"/>

</registryKey>


-<registryKey keyName="SYSTEM\CurrentControlSet\Services\RemoteAccess\Policy">

<registryValue name="Allow LM Authentication" value="0" valueType="REG_DWORD"/>

</registryKey>

</registryKeys>

<SystemInfo ProcessorRevision="36097" ProcessorLevel="6" ProcessorArchitecture="9"/>

</Root>

### 3.7 NTP Status
PS C:\Users\Administrator> w32tm /query /status
Leap Indicator: 0(no warning)
Stratum: 4 (secondary reference - syncd by (S)NTP)
Precision: -23 (119.209ns per tick)
Root Delay: 0.0193898s
Root Dispersion: 0.1350639s
ReferenceId: 0x0A0A1433 (source IP:  10.10.20.51)
Last Successful Sync Time: 05/24/26 10:54:02 AM
Source: 10.10.20.51
Poll Interval: 10 (1024s)

## 4. Proxmox

### 4.1 Network Interfaces
root@proxmox:~# cat /etc/network/interfaces

auto lo
iface lo inet loopback

iface nic0 inet manual

iface nic1 inet manual

auto vmbr0
iface vmbr0 inet static
        address 192.168.1.24/24
        gateway 192.168.1.1
        bridge-ports nic0
        bridge-stp off
        bridge-fd 0

auto vmbr1
iface vmbr1 inet manual
        bridge-ports nic1
        bridge-stp off
        bridge-fd 0
        bridge-vlan-aware yes
        bridge-vids 2-4094
#PNETLab link

source /etc/network/interfaces.d/*


### 4.2 NTP Status
root@proxmox:~# timedatectl status
               Local time: Sun 2026-05-24 11:04:28 WIB
           Universal time: Sun 2026-05-24 04:04:28 UTC
                 RTC time: Sun 2026-05-24 04:04:28
                Time zone: Asia/Jakarta (WIB, +0700)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no


### 4.3 VM List
root@proxmox:~# qm list
      VMID NAME                 STATUS     MEM(MB)    BOOTDISK(GB) PID
       100 TinyLinux            stopped    1024               1.00 0
       101 K3s-Master           running    2048              20.00 1979
       102 K3s-Worker-1         running    2048              20.00 1868
       103 win-server-2022      running    4096              64.00 1781

### 4.4 Storage
root@proxmox:~# pvesm status
Name             Type     Status     Total (KiB)      Used (KiB) Available (KiB)        %
local             dir     active        51288708        13002496        35865052   25.35%
local-lvm     lvmthin     active       146407424        41228330       105179093   28.16%

## 5. K3s Nodes

### 5.1 Node Status
lab@k3s-master:~$ kubectl get nodes -o wide
NAME           STATUS   ROLES                AGE   VERSION        INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION       CONTAINER-RUNTIME
k3s-master     Ready    control-plane,etcd   31d   v1.34.6+k3s1   10.10.20.10   <none>        Ubuntu 22.04.5 LTS   5.15.0-179-generic   containerd://2.2.2-bd1.34
k3s-worker-1   Ready    <none>               31d   v1.34.6+k3s1   10.10.20.11   <none>        Ubuntu 22.04.5 LTS   5.15.0-179-generic   containerd://2.2.2-bd1.34

### 5.2 Running Services
lab@k3s-master:~$ kubectl get all -A
NAMESPACE              NAME                                                         READY   STATUS      RESTARTS        AGE
infra                  pod/ntp-server-79c654d9c5-76jzg                              1/1     Running     2 (12h ago)     5d11h
infra                  pod/ntp-server-79c654d9c5-l5f97                              0/1     Completed   2 (5d12h ago)   10d
kube-system            pod/coredns-76c974cb66-4kghs                                 1/1     Running     6 (12h ago)     31d
kube-system            pod/local-path-provisioner-8686667995-8kgdp                  1/1     Running     6 (12h ago)     31d
kube-system            pod/metrics-server-c8774f4f4-rtkvs                           1/1     Running     6 (12h ago)     31d
kubernetes-dashboard   pod/dashboard-metrics-scraper-5ffb7d645f-tkxnb               1/1     Running     2 (12h ago)     5d11h
kubernetes-dashboard   pod/kubernetes-dashboard-6c7b75ffc-dbj6j                     1/1     Running     2 (12h ago)     5d11h
metallb-system         pod/controller-6cb96f995b-8gl4f                              1/1     Running     2 (12h ago)     5d11h
metallb-system         pod/controller-6cb96f995b-psbjb                              0/1     Completed   0               5d11h
metallb-system         pod/speaker-hrxtd                                            1/1     Running     2 (12h ago)     5d11h
metallb-system         pod/speaker-zwzr7                                            1/1     Running     2 (12h ago)     5d11h
monitoring             pod/alertmanager-prometheus-stack-kube-prom-alertmanager-0   2/2     Running     4 (12h ago)     5d11h
monitoring             pod/prometheus-prometheus-stack-kube-prom-prometheus-0       2/2     Running     4 (12h ago)     5d11h
monitoring             pod/prometheus-stack-grafana-847d5978b8-88j76                3/3     Running     6 (12h ago)     5d11h
monitoring             pod/prometheus-stack-kube-prom-operator-87db95b7f-gbrmg      0/1     Completed   0               5d11h
monitoring             pod/prometheus-stack-kube-prom-operator-87db95b7f-rlmb5      1/1     Running     2 (12h ago)     5d11h
monitoring             pod/prometheus-stack-kube-state-metrics-5fd4599d4-bvxjx      1/1     Running     2 (12h ago)     5d11h
monitoring             pod/prometheus-stack-prometheus-node-exporter-h5n9x          1/1     Running     2 (12h ago)     5d11h
monitoring             pod/prometheus-stack-prometheus-node-exporter-rx4bg          1/1     Running     2 (12h ago)     5d11h
monitoring             pod/snmp-exporter-65d4cf4cfb-g65nz                           1/1     Running     1 (12h ago)     4d8h

NAMESPACE              NAME                                                         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
default                service/kubernetes                                           ClusterIP      10.43.0.1       <none>        443/TCP                         31d
infra                  service/ntp-service                                          LoadBalancer   10.43.8.232     10.10.20.51   123:32215/UDP                   5d11h
kube-system            service/kube-dns                                             ClusterIP      10.43.0.10      <none>        53/UDP,53/TCP,9153/TCP          31d
kube-system            service/metrics-server                                       ClusterIP      10.43.196.63    <none>        443/TCP                         31d
kube-system            service/prometheus-stack-kube-prom-coredns                   ClusterIP      None            <none>        9153/TCP                        5d11h
kube-system            service/prometheus-stack-kube-prom-kube-controller-manager   ClusterIP      None            <none>        10257/TCP                       5d11h
kube-system            service/prometheus-stack-kube-prom-kube-etcd                 ClusterIP      None            <none>        2381/TCP                        5d11h
kube-system            service/prometheus-stack-kube-prom-kube-proxy                ClusterIP      None            <none>        10249/TCP                       5d11h
kube-system            service/prometheus-stack-kube-prom-kube-scheduler            ClusterIP      None            <none>        10259/TCP                       5d11h
kube-system            service/prometheus-stack-kube-prom-kubelet                   ClusterIP      None            <none>        10250/TCP,4194/TCP,10255/TCP    5d11h
kubernetes-dashboard   service/dashboard-metrics-scraper                            ClusterIP      10.43.233.17    <none>        8000/TCP                        31d
kubernetes-dashboard   service/kubernetes-dashboard                                 LoadBalancer   10.43.135.187   10.10.20.50   443:31205/TCP                   31d
metallb-system         service/metallb-webhook-service                              ClusterIP      10.43.202.106   <none>        443/TCP                         31d
monitoring             service/alertmanager-operated                                ClusterIP      None            <none>        9093/TCP,9094/TCP,9094/UDP      5d11h
monitoring             service/prometheus-operated                                  ClusterIP      None            <none>        9090/TCP                        5d11h
monitoring             service/prometheus-stack-grafana                             LoadBalancer   10.43.54.226    10.10.20.53   80:30822/TCP                    5d11h
monitoring             service/prometheus-stack-kube-prom-alertmanager              LoadBalancer   10.43.178.190   10.10.20.52   9093:30505/TCP,8080:32263/TCP   5d11h
monitoring             service/prometheus-stack-kube-prom-operator                  ClusterIP      10.43.228.231   <none>        443/TCP                         5d11h
monitoring             service/prometheus-stack-kube-prom-prometheus                LoadBalancer   10.43.31.222    10.10.20.54   9090:32438/TCP,8080:31485/TCP   5d11h
monitoring             service/prometheus-stack-kube-state-metrics                  ClusterIP      10.43.162.32    <none>        8080/TCP                        5d11h
monitoring             service/prometheus-stack-prometheus-node-exporter            ClusterIP      10.43.217.15    <none>        9100/TCP                        5d11h
monitoring             service/snmp-exporter                                        LoadBalancer   10.43.193.70    10.10.20.55   9116:32467/TCP                  4d9h

NAMESPACE        NAME                                                       DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
metallb-system   daemonset.apps/speaker                                     2         2         2       2            2           kubernetes.io/os=linux   31d
monitoring       daemonset.apps/prometheus-stack-prometheus-node-exporter   2         2         2       2            2           kubernetes.io/os=linux   5d11h

NAMESPACE              NAME                                                  READY   UP-TO-DATE   AVAILABLE   AGE
infra                  deployment.apps/ntp-server                            1/1     1            1           31d
kube-system            deployment.apps/coredns                               1/1     1            1           31d
kube-system            deployment.apps/local-path-provisioner                1/1     1            1           31d
kube-system            deployment.apps/metrics-server                        1/1     1            1           31d
kubernetes-dashboard   deployment.apps/dashboard-metrics-scraper             1/1     1            1           31d
kubernetes-dashboard   deployment.apps/kubernetes-dashboard                  1/1     1            1           31d
metallb-system         deployment.apps/controller                            1/1     1            1           31d
monitoring             deployment.apps/prometheus-stack-grafana              1/1     1            1           5d11h
monitoring             deployment.apps/prometheus-stack-kube-prom-operator   1/1     1            1           5d11h
monitoring             deployment.apps/prometheus-stack-kube-state-metrics   1/1     1            1           5d11h
monitoring             deployment.apps/snmp-exporter                         1/1     1            1           4d9h

NAMESPACE              NAME                                                            DESIRED   CURRENT   READY   AGE
infra                  replicaset.apps/ntp-server-5b66696db6                           0         0         0       31d
infra                  replicaset.apps/ntp-server-79c654d9c5                           1         1         1       10d
infra                  replicaset.apps/ntp-server-99cb6768d                            0         0         0       31d
kube-system            replicaset.apps/coredns-76c974cb66                              1         1         1       31d
kube-system            replicaset.apps/local-path-provisioner-8686667995               1         1         1       31d
kube-system            replicaset.apps/metrics-server-c8774f4f4                        1         1         1       31d
kubernetes-dashboard   replicaset.apps/dashboard-metrics-scraper-5ffb7d645f            1         1         1       31d
kubernetes-dashboard   replicaset.apps/kubernetes-dashboard-6c7b75ffc                  1         1         1       31d
metallb-system         replicaset.apps/controller-6cb96f995b                           1         1         1       31d
monitoring             replicaset.apps/prometheus-stack-grafana-847d5978b8             1         1         1       5d11h
monitoring             replicaset.apps/prometheus-stack-kube-prom-operator-87db95b7f   1         1         1       5d11h
monitoring             replicaset.apps/prometheus-stack-kube-state-metrics-5fd4599d4   1         1         1       5d11h
monitoring             replicaset.apps/snmp-exporter-54b9867d8c                        0         0         0       4d9h
monitoring             replicaset.apps/snmp-exporter-589f56f64b                        0         0         0       4d9h
monitoring             replicaset.apps/snmp-exporter-5f97c66d5f                        0         0         0       4d9h
monitoring             replicaset.apps/snmp-exporter-65d4cf4cfb                        1         1         1       4d8h
monitoring             replicaset.apps/snmp-exporter-686c985c8c                        0         0         0       4d9h
monitoring             replicaset.apps/snmp-exporter-79b6466d9b                        0         0         0       4d9h
monitoring             replicaset.apps/snmp-exporter-8566cccfbb                        0         0         0       4d9h
monitoring             replicaset.apps/snmp-exporter-868c764986                        0         0         0       4d9h
monitoring             replicaset.apps/snmp-exporter-cd7649c4c                         0         0         0       4d9h
monitoring             replicaset.apps/snmp-exporter-cfd965598                         0         0         0       4d9h
monitoring             replicaset.apps/snmp-exporter-fbf785fbb                         0         0         0       4d9h

NAMESPACE    NAME                                                                    READY   AGE
monitoring   statefulset.apps/alertmanager-prometheus-stack-kube-prom-alertmanager   1/1     5d11h
monitoring   statefulset.apps/prometheus-prometheus-stack-kube-prom-prometheus       1/1     5d11h


### 5.3 Services with IPs
lab@k3s-master:~$ kubectl get svc -A
NAMESPACE              NAME                                                 TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
default                kubernetes                                           ClusterIP      10.43.0.1       <none>        443/TCP                         31d
infra                  ntp-service                                          LoadBalancer   10.43.8.232     10.10.20.51   123:32215/UDP                   5d11h
kube-system            kube-dns                                             ClusterIP      10.43.0.10      <none>        53/UDP,53/TCP,9153/TCP          31d
kube-system            metrics-server                                       ClusterIP      10.43.196.63    <none>        443/TCP                         31d
kube-system            prometheus-stack-kube-prom-coredns                   ClusterIP      None            <none>        9153/TCP                        5d11h
kube-system            prometheus-stack-kube-prom-kube-controller-manager   ClusterIP      None            <none>        10257/TCP                       5d11h
kube-system            prometheus-stack-kube-prom-kube-etcd                 ClusterIP      None            <none>        2381/TCP                        5d11h
kube-system            prometheus-stack-kube-prom-kube-proxy                ClusterIP      None            <none>        10249/TCP                       5d11h
kube-system            prometheus-stack-kube-prom-kube-scheduler            ClusterIP      None            <none>        10259/TCP                       5d11h
kube-system            prometheus-stack-kube-prom-kubelet                   ClusterIP      None            <none>        10250/TCP,4194/TCP,10255/TCP    5d11h
kubernetes-dashboard   dashboard-metrics-scraper                            ClusterIP      10.43.233.17    <none>        8000/TCP                        31d
kubernetes-dashboard   kubernetes-dashboard                                 LoadBalancer   10.43.135.187   10.10.20.50   443:31205/TCP                   31d
metallb-system         metallb-webhook-service                              ClusterIP      10.43.202.106   <none>        443/TCP                         31d
monitoring             alertmanager-operated                                ClusterIP      None            <none>        9093/TCP,9094/TCP,9094/UDP      5d11h
monitoring             prometheus-operated                                  ClusterIP      None            <none>        9090/TCP                        5d11h
monitoring             prometheus-stack-grafana                             LoadBalancer   10.43.54.226    10.10.20.53   80:30822/TCP                    5d11h
monitoring             prometheus-stack-kube-prom-alertmanager              LoadBalancer   10.43.178.190   10.10.20.52   9093:30505/TCP,8080:32263/TCP   5d11h
monitoring             prometheus-stack-kube-prom-operator                  ClusterIP      10.43.228.231   <none>        443/TCP                         5d11h
monitoring             prometheus-stack-kube-prom-prometheus                LoadBalancer   10.43.31.222    10.10.20.54   9090:32438/TCP,8080:31485/TCP   5d11h
monitoring             prometheus-stack-kube-state-metrics                  ClusterIP      10.43.162.32    <none>        8080/TCP                        5d11h
monitoring             prometheus-stack-prometheus-node-exporter            ClusterIP      10.43.217.15    <none>        9100/TCP                        5d11h
monitoring             snmp-exporter                                        LoadBalancer   10.43.193.70    10.10.20.55   9116:32467/TCP                  4d9h


### 5.4 Namespaces
lab@k3s-master:~$ kubectl get namespaces
NAME                   STATUS   AGE
default                Active   31d
infra                  Active   31d
kube-node-lease        Active   31d
kube-public            Active   31d
kube-system            Active   31d
kubernetes-dashboard   Active   31d
metallb-system         Active   31d
monitoring             Active   5d11h

### 5.5 MetalLB Config
lab@k3s-master:~$ kubectl get configmap -n metallb-system -o yaml
apiVersion: v1
items:
- apiVersion: v1
  data:
    ca.crt: |
      -----BEGIN CERTIFICATE-----
      MIIBdzCCAR2gAwIBAgIBADAKBggqhkjOPQQDAjAjMSEwHwYDVQQDDBhrM3Mtc2Vy
      dmVyLWNhQDE3NzY4NzAxODQwHhcNMjYwNDIyMTQwMzA0WhcNMzYwNDE5MTQwMzA0
      WjAjMSEwHwYDVQQDDBhrM3Mtc2VydmVyLWNhQDE3NzY4NzAxODQwWTATBgcqhkjO
      PQIBBggqhkjOPQMBBwNCAAQpcWI2vafFR8oVw/cZeD7eWIRHgvSfBF5Dz2F0tl5h
      Ea79bvkT18UTOVOVJWcHM/BGZ8AMY2UDf4FoRvor+TZno0IwQDAOBgNVHQ8BAf8E
      BAMCAqQwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUh8EgkeyyRvOdMKQpl5P3
      yzYP6BYwCgYIKoZIzj0EAwIDSAAwRQIhAJQD/HsGB+ka5RUWvSLsGbEtFFM6cSIR
      Ltt9ELo6b8drAiA0iaRb+yn/Sw+J6xaShrUk4X1I1xT/QnFg2+86XWuAeQ==
      -----END CERTIFICATE-----
  kind: ConfigMap
  metadata:
    annotations:
      kubernetes.io/description: Contains a CA bundle that can be used to verify the
        kube-apiserver when using internal endpoints such as the internal service
        IP or kubernetes.default.svc. No other usage is guaranteed across distributions
        of Kubernetes clusters.
    creationTimestamp: "2026-04-22T15:52:20Z"
    name: kube-root-ca.crt
    namespace: metallb-system
    resourceVersion: "5691"
    uid: b3ae30e6-b58d-4b2b-aa7f-6a3ecad4a5b9
- apiVersion: v1
  data:
    excludel2.yaml: |
      announcedInterfacesToExclude: ["^docker.*", "^cbr.*", "^dummy.*", "^virbr.*", "^lxcbr.*", "^veth.*", "^lo$", "^cali.*", "^tunl.*", "^flannel.*", "^kube-ipvs.*", "^cni.*", "^nodelocaldns.*"]
  kind: ConfigMap
  metadata:
    annotations:
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"v1","data":{"excludel2.yaml":"announcedInterfacesToExclude: [\"^docker.*\", \"^cbr.*\", \"^dummy.*\", \"^virbr.*\", \"^lxcbr.*\", \"^veth.*\", \"^lo$\", \"^cali.*\", \"^tunl.*\", \"^flannel.*\", \"^kube-ipvs.*\", \"^cni.*\", \"^nodelocaldns.*\"]\n"},"kind":"ConfigMap","metadata":{"annotations":{},"name":"metallb-excludel2","namespace":"metallb-system"}}
    creationTimestamp: "2026-04-22T15:52:20Z"
    name: metallb-excludel2
    namespace: metallb-system
    resourceVersion: "5726"
    uid: e7d5225e-d54f-4bff-9428-f0805b001cca
kind: List
metadata:
  resourceVersion: ""

### 5.6 Monitoring Stack
lab@k3s-master:~$ kubectl get all -n monitoring
NAME                                                         READY   STATUS      RESTARTS      AGE
pod/alertmanager-prometheus-stack-kube-prom-alertmanager-0   2/2     Running     4 (12h ago)   5d11h
pod/prometheus-prometheus-stack-kube-prom-prometheus-0       2/2     Running     4 (12h ago)   5d11h
pod/prometheus-stack-grafana-847d5978b8-88j76                3/3     Running     6 (12h ago)   5d11h
pod/prometheus-stack-kube-prom-operator-87db95b7f-gbrmg      0/1     Completed   0             5d11h
pod/prometheus-stack-kube-prom-operator-87db95b7f-rlmb5      1/1     Running     2 (12h ago)   5d11h
pod/prometheus-stack-kube-state-metrics-5fd4599d4-bvxjx      1/1     Running     2 (12h ago)   5d11h
pod/prometheus-stack-prometheus-node-exporter-h5n9x          1/1     Running     2 (12h ago)   5d11h
pod/prometheus-stack-prometheus-node-exporter-rx4bg          1/1     Running     2 (12h ago)   5d11h
pod/snmp-exporter-65d4cf4cfb-g65nz                           1/1     Running     1 (12h ago)   4d9h

NAME                                                TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
service/alertmanager-operated                       ClusterIP      None            <none>        9093/TCP,9094/TCP,9094/UDP      5d11h
service/prometheus-operated                         ClusterIP      None            <none>        9090/TCP                        5d11h
service/prometheus-stack-grafana                    LoadBalancer   10.43.54.226    10.10.20.53   80:30822/TCP                    5d11h
service/prometheus-stack-kube-prom-alertmanager     LoadBalancer   10.43.178.190   10.10.20.52   9093:30505/TCP,8080:32263/TCP   5d11h
service/prometheus-stack-kube-prom-operator         ClusterIP      10.43.228.231   <none>        443/TCP                         5d11h
service/prometheus-stack-kube-prom-prometheus       LoadBalancer   10.43.31.222    10.10.20.54   9090:32438/TCP,8080:31485/TCP   5d11h
service/prometheus-stack-kube-state-metrics         ClusterIP      10.43.162.32    <none>        8080/TCP                        5d11h
service/prometheus-stack-prometheus-node-exporter   ClusterIP      10.43.217.15    <none>        9100/TCP                        5d11h
service/snmp-exporter                               LoadBalancer   10.43.193.70    10.10.20.55   9116:32467/TCP                  4d9h

NAME                                                       DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
daemonset.apps/prometheus-stack-prometheus-node-exporter   2         2         2       2            2           kubernetes.io/os=linux   5d11h

NAME                                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/prometheus-stack-grafana              1/1     1            1           5d11h
deployment.apps/prometheus-stack-kube-prom-operator   1/1     1            1           5d11h
deployment.apps/prometheus-stack-kube-state-metrics   1/1     1            1           5d11h
deployment.apps/snmp-exporter                         1/1     1            1           4d9h

NAME                                                            DESIRED   CURRENT   READY   AGE
replicaset.apps/prometheus-stack-grafana-847d5978b8             1         1         1       5d11h
replicaset.apps/prometheus-stack-kube-prom-operator-87db95b7f   1         1         1       5d11h
replicaset.apps/prometheus-stack-kube-state-metrics-5fd4599d4   1         1         1       5d11h
replicaset.apps/snmp-exporter-54b9867d8c                        0         0         0       4d9h
replicaset.apps/snmp-exporter-589f56f64b                        0         0         0       4d9h
replicaset.apps/snmp-exporter-5f97c66d5f                        0         0         0       4d9h
replicaset.apps/snmp-exporter-65d4cf4cfb                        1         1         1       4d9h
replicaset.apps/snmp-exporter-686c985c8c                        0         0         0       4d9h
replicaset.apps/snmp-exporter-79b6466d9b                        0         0         0       4d9h
replicaset.apps/snmp-exporter-8566cccfbb                        0         0         0       4d9h
replicaset.apps/snmp-exporter-868c764986                        0         0         0       4d9h
replicaset.apps/snmp-exporter-cd7649c4c                         0         0         0       4d9h
replicaset.apps/snmp-exporter-cfd965598                         0         0         0       4d9h
replicaset.apps/snmp-exporter-fbf785fbb                         0         0         0       4d9h

NAME                                                                    READY   AGE
statefulset.apps/alertmanager-prometheus-stack-kube-prom-alertmanager   1/1     5d11h
statefulset.apps/prometheus-prometheus-stack-kube-prom-prometheus       1/1     5d11h

### 5.7 NTP Status
lab@k3s-master:~$ timedatectl status
               Local time: Sun 2026-05-24 11:14:24 WIB
           Universal time: Sun 2026-05-24 04:14:24 UTC
                 RTC time: Sun 2026-05-24 04:14:24
                Time zone: Asia/Jakarta (WIB, +0700)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no

### 5.8 Network Interfaces
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: ens18: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether bc:24:11:2c:c0:ee brd ff:ff:ff:ff:ff:ff
    altname enp0s18
    inet 10.10.20.10/24 brd 10.10.20.255 scope global ens18
       valid_lft forever preferred_lft forever
    inet6 fe80::be24:11ff:fe2c:c0ee/64 scope link
       valid_lft forever preferred_lft forever
3: flannel.1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UNKNOWN group default
    link/ether a6:19:34:08:a8:10 brd ff:ff:ff:ff:ff:ff
    inet 10.42.0.0/32 scope global flannel.1
       valid_lft forever preferred_lft forever
    inet6 fe80::a419:34ff:fe08:a810/64 scope link
       valid_lft forever preferred_lft forever
4: cni0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UP group default qlen 1000
    link/ether fe:2a:ff:e4:6b:de brd ff:ff:ff:ff:ff:ff
    inet 10.42.0.1/24 brd 10.42.0.255 scope global cni0
       valid_lft forever preferred_lft forever
    inet6 fe80::fc2a:ffff:fee4:6bde/64 scope link
       valid_lft forever preferred_lft forever
5: veth3ed424ee@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue master cni0 state UP group default
    link/ether 06:7c:d4:e8:30:38 brd ff:ff:ff:ff:ff:ff link-netns cni-d57794fb-8804-2096-989c-472add07fd52
    inet6 fe80::47c:d4ff:fee8:3038/64 scope link
       valid_lft forever preferred_lft forever
6: veth89a640bf@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue master cni0 state UP group default
    link/ether 86:a0:f1:49:67:64 brd ff:ff:ff:ff:ff:ff link-netns cni-9c585cfe-a08d-c2ad-6490-576353ddf0bf
    inet6 fe80::84a0:f1ff:fe49:6764/64 scope link
       valid_lft forever preferred_lft forever
7: vethda84ad9a@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue master cni0 state UP group default
    link/ether 1e:3c:9b:a2:9e:51 brd ff:ff:ff:ff:ff:ff link-netns cni-97164356-1177-d842-b7c4-074d3e7b2590
    inet6 fe80::1c3c:9bff:fea2:9e51/64 scope link
       valid_lft forever preferred_lft forever

### 5.9 Routing Table
lab@k3s-master:~$ ip route show
default via 10.10.20.1 dev ens18 proto static
10.10.20.0/24 dev ens18 proto kernel scope link src 10.10.20.10
10.42.0.0/24 dev cni0 proto kernel scope link src 10.42.0.1
10.42.1.0/24 via 10.42.1.0 dev flannel.1 onlink

### 5.10 NTP container
lab@k3s-master:~$ kubectl get all -n infra -o yaml
apiVersion: v1
items:
- apiVersion: v1
  kind: Pod
  metadata:
    annotations:
      kubectl.kubernetes.io/restartedAt: "2026-05-14T02:49:47+07:00"
    creationTimestamp: "2026-05-18T16:36:03Z"
    generateName: ntp-server-79c654d9c5-
    generation: 1
    labels:
      app: ntp
      pod-template-hash: 79c654d9c5
    name: ntp-server-79c654d9c5-76jzg
    namespace: infra
    ownerReferences:
    - apiVersion: apps/v1
      blockOwnerDeletion: true
      controller: true
      kind: ReplicaSet
      name: ntp-server-79c654d9c5
      uid: b6b4e849-f5fd-4ece-91f9-78bf87844ee4
    resourceVersion: "481316"
    uid: 3193b106-7e62-4181-b841-ad2d93e3239c
  spec:
    containers:
    - env:
      - name: NTP_SERVERS
        value: 0.id.pool.ntp.org,1.id.pool.ntp.org
      - name: TZ
        value: Asia/Jakarta
      image: cturra/ntp:latest
      imagePullPolicy: Always
      name: ntp
      ports:
      - containerPort: 123
        protocol: UDP
      resources: {}
      securityContext:
        capabilities:
          add:
          - SYS_TIME
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-pqlxf
        readOnly: true
    dnsPolicy: ClusterFirst
    enableServiceLinks: true
    nodeName: k3s-worker-1
    preemptionPolicy: PreemptLowerPriority
    priority: 0
    restartPolicy: Always
    schedulerName: default-scheduler
    securityContext: {}
    serviceAccount: default
    serviceAccountName: default
    terminationGracePeriodSeconds: 30
    tolerations:
    - effect: NoExecute
      key: node.kubernetes.io/not-ready
      operator: Exists
      tolerationSeconds: 300
    - effect: NoExecute
      key: node.kubernetes.io/unreachable
      operator: Exists
      tolerationSeconds: 300
    volumes:
    - name: kube-api-access-pqlxf
      projected:
        defaultMode: 420
        sources:
        - serviceAccountToken:
            expirationSeconds: 3607
            path: token
        - configMap:
            items:
            - key: ca.crt
              path: ca.crt
            name: kube-root-ca.crt
        - downwardAPI:
            items:
            - fieldRef:
                apiVersion: v1
                fieldPath: metadata.namespace
              path: namespace
  status:
    conditions:
    - lastProbeTime: null
      lastTransitionTime: "2026-05-23T15:31:37Z"
      observedGeneration: 1
      status: "True"
      type: PodReadyToStartContainers
    - lastProbeTime: null
      lastTransitionTime: "2026-05-18T16:36:37Z"
      observedGeneration: 1
      status: "True"
      type: Initialized
    - lastProbeTime: null
      lastTransitionTime: "2026-05-23T15:39:21Z"
      observedGeneration: 1
      status: "True"
      type: Ready
    - lastProbeTime: null
      lastTransitionTime: "2026-05-23T15:39:21Z"
      observedGeneration: 1
      status: "True"
      type: ContainersReady
    - lastProbeTime: null
      lastTransitionTime: "2026-05-18T16:36:37Z"
      observedGeneration: 1
      status: "True"
      type: PodScheduled
    containerStatuses:
    - containerID: containerd://b1a024b3ebaac7fd8c9afff6acb12a81c226aa6cb339a4a35d7d5a5de2499f83
      image: docker.io/cturra/ntp:latest
      imageID: docker.io/cturra/ntp@sha256:7224d4e7c7833aabbcb7dd70c46c8a8dcccda365314c6db047b9b10403ace3bc
      lastState:
        terminated:
          containerID: containerd://6305ddc15acb8157662bfa4cd73b10a4d226b8c1099c8ce74e0510041946c5a5
          exitCode: 255
          finishedAt: "2026-05-23T15:31:28Z"
          reason: Unknown
          startedAt: "2026-05-19T15:18:44Z"
      name: ntp
      ready: true
      resources: {}
      restartCount: 2
      started: true
      state:
        running:
          startedAt: "2026-05-23T15:39:20Z"
      user:
        linux:
          gid: 0
          supplementalGroups:
          - 0
          - 1
          - 2
          - 3
          - 4
          - 6
          - 10
          - 11
          - 20
          - 26
          - 27
          uid: 0
      volumeMounts:
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-pqlxf
        readOnly: true
        recursiveReadOnly: Disabled
    hostIP: 10.10.20.11
    hostIPs:
    - ip: 10.10.20.11
    observedGeneration: 1
    phase: Running
    podIP: 10.42.1.74
    podIPs:
    - ip: 10.42.1.74
    qosClass: BestEffort
    startTime: "2026-05-18T16:36:37Z"
- apiVersion: v1
  kind: Pod
  metadata:
    annotations:
      kubectl.kubernetes.io/restartedAt: "2026-05-14T02:49:47+07:00"
    creationTimestamp: "2026-05-13T19:49:47Z"
    generateName: ntp-server-79c654d9c5-
    generation: 1
    labels:
      app: ntp
      pod-template-hash: 79c654d9c5
    name: ntp-server-79c654d9c5-l5f97
    namespace: infra
    ownerReferences:
    - apiVersion: apps/v1
      blockOwnerDeletion: true
      controller: true
      kind: ReplicaSet
      name: ntp-server-79c654d9c5
      uid: b6b4e849-f5fd-4ece-91f9-78bf87844ee4
    resourceVersion: "213970"
    uid: 44abf154-893b-4146-8853-36bc35296023
  spec:
    containers:
    - env:
      - name: NTP_SERVERS
        value: 0.id.pool.ntp.org,1.id.pool.ntp.org
      - name: TZ
        value: Asia/Jakarta
      image: cturra/ntp:latest
      imagePullPolicy: Always
      name: ntp
      ports:
      - containerPort: 123
        protocol: UDP
      resources: {}
      securityContext:
        capabilities:
          add:
          - SYS_TIME
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-d4fcd
        readOnly: true
    dnsPolicy: ClusterFirst
    enableServiceLinks: true
    nodeName: k3s-master
    preemptionPolicy: PreemptLowerPriority
    priority: 0
    restartPolicy: Always
    schedulerName: default-scheduler
    securityContext: {}
    serviceAccount: default
    serviceAccountName: default
    terminationGracePeriodSeconds: 30
    tolerations:
    - effect: NoExecute
      key: node.kubernetes.io/not-ready
      operator: Exists
      tolerationSeconds: 300
    - effect: NoExecute
      key: node.kubernetes.io/unreachable
      operator: Exists
      tolerationSeconds: 300
    volumes:
    - name: kube-api-access-d4fcd
      projected:
        defaultMode: 420
        sources:
        - serviceAccountToken:
            expirationSeconds: 3607
            path: token
        - configMap:
            items:
            - key: ca.crt
              path: ca.crt
            name: kube-root-ca.crt
        - downwardAPI:
            items:
            - fieldRef:
                apiVersion: v1
                fieldPath: metadata.namespace
              path: namespace
  status:
    conditions:
    - lastProbeTime: null
      lastTransitionTime: "2026-05-18T16:36:03Z"
      message: 'The node was low on resource: ephemeral-storage. Threshold quantity:
        523201134, available: 638488Ki. Container ntp was using 84Ki, request is 0,
        has larger consumption of ephemeral-storage. '
      observedGeneration: 1
      reason: TerminationByKubelet
      status: "True"
      type: DisruptionTarget
    - lastProbeTime: null
      lastTransitionTime: "2026-05-18T16:36:03Z"
      observedGeneration: 1
      status: "False"
      type: PodReadyToStartContainers
    - lastProbeTime: null
      lastTransitionTime: "2026-05-13T19:49:47Z"
      observedGeneration: 1
      reason: PodCompleted
      status: "True"
      type: Initialized
    - lastProbeTime: null
      lastTransitionTime: "2026-05-18T16:36:03Z"
      observedGeneration: 1
      reason: PodCompleted
      status: "False"
      type: Ready
    - lastProbeTime: null
      lastTransitionTime: "2026-05-18T16:36:03Z"
      observedGeneration: 1
      reason: PodCompleted
      status: "False"
      type: ContainersReady
    - lastProbeTime: null
      lastTransitionTime: "2026-05-13T19:49:47Z"
      observedGeneration: 1
      status: "True"
      type: PodScheduled
    containerStatuses:
    - containerID: containerd://614f8c8d0233d86de681fd653c10d6af15fe9d1900c7ee3edccc2b41c5c32f45
      image: docker.io/cturra/ntp:latest
      imageID: docker.io/cturra/ntp@sha256:7224d4e7c7833aabbcb7dd70c46c8a8dcccda365314c6db047b9b10403ace3bc
      lastState:
        terminated:
          containerID: containerd://6d33e8fcbc4840e7ad2dace66f69ca46ce23ab09df7d12d31978ea0b4f239872
          exitCode: 255
          finishedAt: "2026-05-18T15:15:12Z"
          reason: Unknown
          startedAt: "2026-05-17T06:55:01Z"
      name: ntp
      ready: false
      resources: {}
      restartCount: 2
      started: false
      state:
        terminated:
          containerID: containerd://614f8c8d0233d86de681fd653c10d6af15fe9d1900c7ee3edccc2b41c5c32f45
          exitCode: 0
          finishedAt: "2026-05-18T16:36:03Z"
          reason: Completed
          startedAt: "2026-05-18T15:20:21Z"
      user:
        linux:
          gid: 0
          supplementalGroups:
          - 0
          - 1
          - 2
          - 3
          - 4
          - 6
          - 10
          - 11
          - 20
          - 26
          - 27
          uid: 0
      volumeMounts:
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-d4fcd
        readOnly: true
        recursiveReadOnly: Disabled
    hostIP: 10.10.20.10
    hostIPs:
    - ip: 10.10.20.10
    observedGeneration: 1
    phase: Succeeded
    qosClass: BestEffort
    startTime: "2026-05-13T19:49:47Z"
- apiVersion: v1
  kind: Service
  metadata:
    annotations:
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"name":"ntp-service","namespace":"infra"},"spec":{"loadBalancerIP":"10.10.20.51","ports":[{"port":123,"protocol":"UDP","targetPort":123}],"selector":{"app":"ntp"},"type":"LoadBalancer"}}
      metallb.io/ip-allocated-from-pool: lab-pool
    creationTimestamp: "2026-05-18T17:04:14Z"
    finalizers:
    - service.kubernetes.io/load-balancer-cleanup
    name: ntp-service
    namespace: infra
    resourceVersion: "211654"
    uid: 116b267b-4825-4ee7-8ea6-74dcc47aa631
  spec:
    allocateLoadBalancerNodePorts: true
    clusterIP: 10.43.8.232
    clusterIPs:
    - 10.43.8.232
    externalTrafficPolicy: Cluster
    internalTrafficPolicy: Cluster
    ipFamilies:
    - IPv4
    ipFamilyPolicy: SingleStack
    loadBalancerIP: 10.10.20.51
    ports:
    - nodePort: 32215
      port: 123
      protocol: UDP
      targetPort: 123
    selector:
      app: ntp
    sessionAffinity: None
    type: LoadBalancer
  status:
    loadBalancer:
      ingress:
      - ip: 10.10.20.51
        ipMode: VIP
- apiVersion: apps/v1
  kind: Deployment
  metadata:
    annotations:
      deployment.kubernetes.io/revision: "3"
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"name":"ntp-server","namespace":"infra"},"spec":{"replicas":1,"selector":{"matchLabels":{"app":"ntp"}},"template":{"metadata":{"labels":{"app":"ntp"}},"spec":{"containers":[{"env":[{"name":"NTP_SERVERS","value":"0.id.pool.ntp.org,1.id.pool.ntp.org"},{"name":"TZ","value":"Asia/Jakarta"}],"image":"cturra/ntp:latest","name":"ntp","ports":[{"containerPort":123,"protocol":"UDP"}],"securityContext":{"capabilities":{"add":["SYS_TIME"]}}}]}}}}
    creationTimestamp: "2026-04-22T16:08:55Z"
    generation: 3
    name: ntp-server
    namespace: infra
    resourceVersion: "481320"
    uid: 6f1bb6ca-019a-460e-865a-b4c700d95509
  spec:
    progressDeadlineSeconds: 600
    replicas: 1
    revisionHistoryLimit: 10
    selector:
      matchLabels:
        app: ntp
    strategy:
      rollingUpdate:
        maxSurge: 25%
        maxUnavailable: 25%
      type: RollingUpdate
    template:
      metadata:
        annotations:
          kubectl.kubernetes.io/restartedAt: "2026-05-14T02:49:47+07:00"
        labels:
          app: ntp
      spec:
        containers:
        - env:
          - name: NTP_SERVERS
            value: 0.id.pool.ntp.org,1.id.pool.ntp.org
          - name: TZ
            value: Asia/Jakarta
          image: cturra/ntp:latest
          imagePullPolicy: Always
          name: ntp
          ports:
          - containerPort: 123
            protocol: UDP
          resources: {}
          securityContext:
            capabilities:
              add:
              - SYS_TIME
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
        dnsPolicy: ClusterFirst
        restartPolicy: Always
        schedulerName: default-scheduler
        securityContext: {}
        terminationGracePeriodSeconds: 30
  status:
    availableReplicas: 1
    conditions:
    - lastTransitionTime: "2026-04-22T16:08:55Z"
      lastUpdateTime: "2026-05-13T19:49:57Z"
      message: ReplicaSet "ntp-server-79c654d9c5" has successfully progressed.
      reason: NewReplicaSetAvailable
      status: "True"
      type: Progressing
    - lastTransitionTime: "2026-05-23T15:39:21Z"
      lastUpdateTime: "2026-05-23T15:39:21Z"
      message: Deployment has minimum availability.
      reason: MinimumReplicasAvailable
      status: "True"
      type: Available
    observedGeneration: 3
    readyReplicas: 1
    replicas: 1
    updatedReplicas: 1
- apiVersion: apps/v1
  kind: ReplicaSet
  metadata:
    annotations:
      deployment.kubernetes.io/desired-replicas: "1"
      deployment.kubernetes.io/max-replicas: "2"
      deployment.kubernetes.io/revision: "1"
    creationTimestamp: "2026-04-22T16:08:55Z"
    generation: 2
    labels:
      app: ntp
      pod-template-hash: 5b66696db6
    name: ntp-server-5b66696db6
    namespace: infra
    ownerReferences:
    - apiVersion: apps/v1
      blockOwnerDeletion: true
      controller: true
      kind: Deployment
      name: ntp-server
      uid: 6f1bb6ca-019a-460e-865a-b4c700d95509
    resourceVersion: "10025"
    uid: 124fde4d-500f-47a6-b8d7-4dfa32139180
  spec:
    replicas: 0
    selector:
      matchLabels:
        app: ntp
        pod-template-hash: 5b66696db6
    template:
      metadata:
        labels:
          app: ntp
          pod-template-hash: 5b66696db6
      spec:
        containers:
        - env:
          - name: NTP_SERVERS
            value: 0.id.pool.ntp.org,1.id.pool.ntp.org
          image: cturra/ntp:latest
          imagePullPolicy: Always
          name: ntp
          ports:
          - containerPort: 123
            protocol: UDP
          resources: {}
          securityContext:
            capabilities:
              add:
              - SYS_TIME
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
        dnsPolicy: ClusterFirst
        restartPolicy: Always
        schedulerName: default-scheduler
        securityContext: {}
        terminationGracePeriodSeconds: 30
  status:
    observedGeneration: 2
    replicas: 0
- apiVersion: apps/v1
  kind: ReplicaSet
  metadata:
    annotations:
      deployment.kubernetes.io/desired-replicas: "1"
      deployment.kubernetes.io/max-replicas: "2"
      deployment.kubernetes.io/revision: "3"
    creationTimestamp: "2026-05-13T19:49:47Z"
    generation: 1
    labels:
      app: ntp
      pod-template-hash: 79c654d9c5
    name: ntp-server-79c654d9c5
    namespace: infra
    ownerReferences:
    - apiVersion: apps/v1
      blockOwnerDeletion: true
      controller: true
      kind: Deployment
      name: ntp-server
      uid: 6f1bb6ca-019a-460e-865a-b4c700d95509
    resourceVersion: "481319"
    uid: b6b4e849-f5fd-4ece-91f9-78bf87844ee4
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: ntp
        pod-template-hash: 79c654d9c5
    template:
      metadata:
        annotations:
          kubectl.kubernetes.io/restartedAt: "2026-05-14T02:49:47+07:00"
        labels:
          app: ntp
          pod-template-hash: 79c654d9c5
      spec:
        containers:
        - env:
          - name: NTP_SERVERS
            value: 0.id.pool.ntp.org,1.id.pool.ntp.org
          - name: TZ
            value: Asia/Jakarta
          image: cturra/ntp:latest
          imagePullPolicy: Always
          name: ntp
          ports:
          - containerPort: 123
            protocol: UDP
          resources: {}
          securityContext:
            capabilities:
              add:
              - SYS_TIME
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
        dnsPolicy: ClusterFirst
        restartPolicy: Always
        schedulerName: default-scheduler
        securityContext: {}
        terminationGracePeriodSeconds: 30
  status:
    availableReplicas: 1
    fullyLabeledReplicas: 1
    observedGeneration: 1
    readyReplicas: 1
    replicas: 1
- apiVersion: apps/v1
  kind: ReplicaSet
  metadata:
    annotations:
      deployment.kubernetes.io/desired-replicas: "1"
      deployment.kubernetes.io/max-replicas: "2"
      deployment.kubernetes.io/revision: "2"
    creationTimestamp: "2026-04-22T16:14:36Z"
    generation: 2
    labels:
      app: ntp
      pod-template-hash: 99cb6768d
    name: ntp-server-99cb6768d
    namespace: infra
    ownerReferences:
    - apiVersion: apps/v1
      blockOwnerDeletion: true
      controller: true
      kind: Deployment
      name: ntp-server
      uid: 6f1bb6ca-019a-460e-865a-b4c700d95509
    resourceVersion: "61246"
    uid: 07139092-4d68-4b75-859b-37a8e82d7400
  spec:
    replicas: 0
    selector:
      matchLabels:
        app: ntp
        pod-template-hash: 99cb6768d
    template:
      metadata:
        labels:
          app: ntp
          pod-template-hash: 99cb6768d
      spec:
        containers:
        - env:
          - name: NTP_SERVERS
            value: 0.id.pool.ntp.org,1.id.pool.ntp.org
          - name: TZ
            value: Asia/Jakarta
          image: cturra/ntp:latest
          imagePullPolicy: Always
          name: ntp
          ports:
          - containerPort: 123
            protocol: UDP
          resources: {}
          securityContext:
            capabilities:
              add:
              - SYS_TIME
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
        dnsPolicy: ClusterFirst
        restartPolicy: Always
        schedulerName: default-scheduler
        securityContext: {}
        terminationGracePeriodSeconds: 30
  status:
    observedGeneration: 2
    replicas: 0
kind: List
metadata:
  resourceVersion: ""


### 5.11 SNMP Exporter config
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":7,"w":12,"x":12,"y":49},"id":11,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_transmit_packets_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\"$workload\", workload_type=~\"$type\"})
      by (pod))\n","legendFormat":"__auto"}],"title":"Rate of Transmitted Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":7,"w":12,"x":0,"y":56},"id":12,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_receive_packets_dropped_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\"$workload\", workload_type=~\"$type\"})
      by (pod))\n","legendFormat":"__auto"}],"title":"Rate of Received Packets Dropped","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":7,"w":12,"x":12,"y":56},"id":13,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_transmit_packets_dropped_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\"$workload\", workload_type=~\"$type\"})
      by (pod))\n","legendFormat":"__auto"}],"title":"Rate of Transmitted Packets
      Dropped","type":"timeseries"}],"refresh":"10s","schemaVersion":39,"tags":["kubernetes-mixin"],"templating":{"list":[{"current":{"selected":true,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","regex":"","type":"datasource"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"label":"cluster","name":"cluster","query":"label_values(up{job=\"kube-state-metrics\"},
      cluster)","refresh":2,"sort":1,"type":"query","allValue":".*"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"label":"namespace","name":"namespace","query":"label_values(kube_namespace_status_phase{job=\"kube-state-metrics\",
      cluster=\"$cluster\"}, namespace)","refresh":2,"sort":1,"type":"query"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"workload_type","name":"type","query":"label_values(namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\"}, workload_type)","refresh":2,"sort":1,"type":"query"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"workload","name":"workload","query":"label_values(namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}, workload)","refresh":2,"sort":1,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Kubernetes / Compute Resources / Workload","uid":"a164a7f0339f99e89cea5cb47e9be617"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-k8s-resources-workload
    namespace: monitoring
    resourceVersion: "202541"
    uid: 1c8d29d6-915a-40e1-a249-f372bdf11c8c
- apiVersion: v1
  data:
    k8s-resources-workloads-namespace.json: '{"editable":true,"links":[{"asDropdown":true,"includeVars":true,"keepTime":true,"tags":["kubernetes-mixin"],"targetBlank":false,"title":"Kubernetes","type":"dashboards"}],"panels":[{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true}},"overrides":[{"matcher":{"id":"byFrameRefID","options":"B"},"properties":[{"id":"custom.lineStyle","value":{"fill":"dash"}},{"id":"custom.lineWidth","value":2},{"id":"color","value":{"fixedColor":"red","mode":"fixed"}}]},{"matcher":{"id":"byFrameRefID","options":"C"},"properties":[{"id":"custom.lineStyle","value":{"fill":"dash"}},{"id":"custom.lineWidth","value":2},{"id":"color","value":{"fixedColor":"orange","mode":"fixed"}}]}]},"gridPos":{"h":7,"w":24,"x":0,"y":0},"id":1,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n  max
      by (cluster, namespace, pod, container)(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_rate5m{cluster=\"$cluster\",
      namespace=\"$namespace\"})\n* on(cluster, namespace, pod)\n  group_left(workload,
      workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","legendFormat":"{{workload}}
      - {{workload_type}}"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"scalar(max(kube_resourcequota{cluster=\"$cluster\",
      namespace=\"$namespace\", type=\"hard\",resource=~\"requests.cpu|cpu\"}))","legendFormat":"quota
      - requests"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"scalar(max(kube_resourcequota{cluster=\"$cluster\",
      namespace=\"$namespace\", type=\"hard\",resource=~\"limits.cpu\"}))","legendFormat":"quota
      - limits"}],"title":"CPU Usage","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"overrides":[{"matcher":{"id":"byRegexp","options":"/%/"},"properties":[{"id":"unit","value":"percentunit"}]},{"matcher":{"id":"byName","options":"Workload"},"properties":[{"id":"links","value":[{"title":"Drill
      down to workloads","url":"/d/a164a7f0339f99e89cea5cb47e9be617?${datasource:queryparam}&var-cluster=$cluster&var-namespace=$namespace&var-type=${__data.fields.Type}&var-workload=${__data.fields.Workload}"}]}]},{"matcher":{"id":"byName","options":"Running
      Pods"},"properties":[{"id":"unit","value":"none"}]}]},"gridPos":{"h":7,"w":24,"x":0,"y":7},"id":2,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"count(namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}) by (workload, workload_type)","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n  max
      by (cluster, namespace, pod, container)(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_rate5m{cluster=\"$cluster\",
      namespace=\"$namespace\"})\n* on(cluster, namespace, pod)\n  group_left(workload,
      workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n  max
      by (cluster, namespace, pod, container)(kube_pod_container_resource_requests{job=\"kube-state-metrics\",
      cluster=\"$cluster\", namespace=\"$namespace\", resource=\"cpu\"})\n* on(cluster,
      namespace, pod)\n  group_left(workload, workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n  max
      by (cluster, namespace, pod, container)(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_rate5m{cluster=\"$cluster\",
      namespace=\"$namespace\"})\n* on(cluster, namespace, pod)\n  group_left(workload,
      workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n/sum(\n  max
      by (cluster, namespace, pod, container)(kube_pod_container_resource_requests{job=\"kube-state-metrics\",
      cluster=\"$cluster\", namespace=\"$namespace\", resource=\"cpu\"})\n* on(cluster,
      namespace, pod)\n  group_left(workload, workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n  max
      by (cluster, namespace, pod, container)(kube_pod_container_resource_limits{job=\"kube-state-metrics\",
      cluster=\"$cluster\", namespace=\"$namespace\", resource=\"cpu\"})\n* on(cluster,
      namespace, pod)\n  group_left(workload, workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n  max
      by (cluster, namespace, pod, container)(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_rate5m{cluster=\"$cluster\",
      namespace=\"$namespace\"})\n* on(cluster, namespace, pod)\n  group_left(workload,
      workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n/sum(\n  max
      by (cluster, namespace, pod, container)(kube_pod_container_resource_limits{job=\"kube-state-metrics\",
      cluster=\"$cluster\", namespace=\"$namespace\", resource=\"cpu\"})\n* on(cluster,
      namespace, pod)\n  group_left(workload, workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","format":"table","instant":true}],"title":"CPU
      Quota","transformations":[{"id":"joinByField","options":{"byField":"workload","mode":"outer"}},{"id":"organize","options":{"excludeByName":{"Time":true,"Time
      1":true,"Time 2":true,"Time 3":true,"Time 4":true,"Time 5":true,"Time 6":true,"workload_type
      2":true,"workload_type 3":true,"workload_type 4":true,"workload_type 5":true,"workload_type
      6":true},"indexByName":{"Time 1":0,"Time 2":1,"Time 3":2,"Time 4":3,"Time 5":4,"Time
      6":5,"Value #A":8,"Value #B":9,"Value #C":10,"Value #D":11,"Value #E":12,"Value
      #F":13,"workload":6,"workload_type 1":7,"workload_type 2":14,"workload_type
      3":15,"workload_type 4":16,"workload_type 5":17,"workload_type 6":18},"renameByName":{"Value
      #A":"Running Pods","Value #B":"CPU Usage","Value #C":"CPU Requests","Value #D":"CPU
      Requests %","Value #E":"CPU Limits","Value #F":"CPU Limits %","workload":"Workload","workload_type
      1":"Type"}}}],"type":"table"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bytes"},"overrides":[{"matcher":{"id":"byFrameRefID","options":"B"},"properties":[{"id":"custom.lineStyle","value":{"fill":"dash"}},{"id":"custom.lineWidth","value":2},{"id":"color","value":{"fixedColor":"red","mode":"fixed"}}]},{"matcher":{"id":"byFrameRefID","options":"C"},"properties":[{"id":"custom.lineStyle","value":{"fill":"dash"}},{"id":"custom.lineWidth","value":2},{"id":"color","value":{"fixedColor":"orange","mode":"fixed"}}]}]},"gridPos":{"h":7,"w":24,"x":0,"y":14},"id":3,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n    max
      by (cluster, namespace, pod, container)(container_memory_working_set_bytes{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\",
      container!=\"\", image!=\"\"})\n  * on(cluster, namespace, pod)\n    group_left(workload,
      workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","legendFormat":"{{workload}}
      - {{workload_type}}"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"scalar(max(kube_resourcequota{cluster=\"$cluster\",
      namespace=\"$namespace\", type=\"hard\",resource=~\"requests.memory|memory\"}))","legendFormat":"quota
      - requests"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"scalar(max(kube_resourcequota{cluster=\"$cluster\",
      namespace=\"$namespace\", type=\"hard\",resource=~\"limits.memory\"}))","legendFormat":"quota
      - limits"}],"title":"Memory Usage","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"unit":"bytes"},"overrides":[{"matcher":{"id":"byRegexp","options":"/%/"},"properties":[{"id":"unit","value":"percentunit"}]},{"matcher":{"id":"byName","options":"Workload"},"properties":[{"id":"links","value":[{"title":"Drill
      down to workloads","url":"/d/a164a7f0339f99e89cea5cb47e9be617?${datasource:queryparam}&var-cluster=$cluster&var-namespace=$namespace&var-type=${__data.fields.Type}&var-workload=${__data.fields.Workload}"}]}]},{"matcher":{"id":"byName","options":"Running
      Pods"},"properties":[{"id":"unit","value":"none"}]}]},"gridPos":{"h":7,"w":24,"x":0,"y":21},"id":4,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"count(namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}) by (workload, workload_type)","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n    max
      by (cluster, namespace, pod, container)(container_memory_working_set_bytes{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\",
      container!=\"\", image!=\"\"})\n  * on(cluster, namespace, pod)\n    group_left(workload,
      workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n  max
      by (cluster, namespace, pod, container)(kube_pod_container_resource_requests{job=\"kube-state-metrics\",
      cluster=\"$cluster\", namespace=\"$namespace\", resource=\"memory\"})\n* on(cluster,
      namespace, pod)\n  group_left(workload, workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n    max
      by (cluster, namespace, pod, container)(container_memory_working_set_bytes{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\",
      container!=\"\", image!=\"\"})\n  * on(cluster, namespace, pod)\n    group_left(workload,
      workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n/sum(\n  max
      by (cluster, namespace, pod, container)(kube_pod_container_resource_requests{job=\"kube-state-metrics\",
      cluster=\"$cluster\", namespace=\"$namespace\", resource=\"memory\"})\n* on(cluster,
      namespace, pod)\n  group_left(workload, workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n  max
      by (cluster, namespace, pod, container)(kube_pod_container_resource_limits{job=\"kube-state-metrics\",
      cluster=\"$cluster\", namespace=\"$namespace\", resource=\"memory\"})\n* on(cluster,
      namespace, pod)\n  group_left(workload, workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(\n    max
      by (cluster, namespace, pod, container)(container_memory_working_set_bytes{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\",
      container!=\"\", image!=\"\"})\n  * on(cluster, namespace, pod)\n    group_left(workload,
      workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n/sum(\n  max
      by (cluster, namespace, pod, container)(kube_pod_container_resource_limits{job=\"kube-state-metrics\",
      cluster=\"$cluster\", namespace=\"$namespace\", resource=\"memory\"})\n* on(cluster,
      namespace, pod)\n  group_left(workload, workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}\n) by (workload, workload_type)\n","format":"table","instant":true}],"title":"Memory
      Quota","transformations":[{"id":"joinByField","options":{"byField":"workload","mode":"outer"}},{"id":"organize","options":{"excludeByName":{"Time":true,"Time
      1":true,"Time 2":true,"Time 3":true,"Time 4":true,"Time 5":true,"Time 6":true,"workload_type
      2":true,"workload_type 3":true,"workload_type 4":true,"workload_type 5":true,"workload_type
      6":true},"indexByName":{"Time 1":0,"Time 2":1,"Time 3":2,"Time 4":3,"Time 5":4,"Time
      6":5,"Value #A":8,"Value #B":9,"Value #C":10,"Value #D":11,"Value #E":12,"Value
      #F":13,"workload":6,"workload_type 1":7,"workload_type 2":14,"workload_type
      3":15,"workload_type 4":16,"workload_type 5":17,"workload_type 6":18},"renameByName":{"Value
      #A":"Running Pods","Value #B":"Memory Usage","Value #C":"Memory Requests","Value
      #D":"Memory Requests %","Value #E":"Memory Limits","Value #F":"Memory Limits
      %","workload":"Workload","workload_type 1":"Type"}}}],"type":"table"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"overrides":[{"matcher":{"id":"byRegexp","options":"/Bandwidth/"},"properties":[{"id":"unit","value":"bps"}]},{"matcher":{"id":"byRegexp","options":"/Packets/"},"properties":[{"id":"unit","value":"pps"}]},{"matcher":{"id":"byName","options":"Workload"},"properties":[{"id":"links","value":[{"title":"Drill
      down to workloads","url":"/d/a164a7f0339f99e89cea5cb47e9be617?${datasource:queryparam}&var-cluster=$cluster&var-namespace=$namespace&var-type=${__data.fields.Type}&var-workload=${__data.fields.Workload}"}]}]}]},"gridPos":{"h":7,"w":24,"x":0,"y":28},"id":5,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum((8
      * rate(container_network_receive_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}) by (workload))\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum((8
      * rate(container_network_transmit_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}) by (workload))\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_receive_packets_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}) by (workload))\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_transmit_packets_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}) by (workload))\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_receive_packets_dropped_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}) by (workload))\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_transmit_packets_dropped_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload_type=~\"$type\"}) by (workload))\n","format":"table","instant":true}],"title":"Current
      Network Usage","transformations":[{"id":"joinByField","options":{"byField":"workload","mode":"outer"}},{"id":"organize","options":{"excludeByName":{"Time":true,"Time
      1":true,"Time 2":true,"Time 3":true,"Time 4":true,"Time 5":true,"Time 6":true},"indexByName":{"Time
      1":0,"Time 2":1,"Time 3":2,"Time 4":3,"Time 5":4,"Time 6":5,"Value #A":7,"Value
      #B":8,"Value #C":9,"Value #D":10,"Value #E":11,"Value #F":12,"workload":6},"renameByName":{"Value
      #A":"Current Receive Bandwidth","Value #B":"Current Transmit Bandwidth","Value
      #C":"Rate of Received Packets","Value #D":"Rate of Transmitted Packets","Value
      #E":"Rate of Received Packets Dropped","Value #F":"Rate of Transmitted Packets
      Dropped","workload":"Workload"}}}],"type":"table"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bps"}},"gridPos":{"h":7,"w":12,"x":0,"y":35},"id":6,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum((8
      * rate(container_network_receive_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Receive
      Bandwidth","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bps"}},"gridPos":{"h":7,"w":12,"x":12,"y":35},"id":7,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum((8
      * rate(container_network_transmit_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Transmit
      Bandwidth","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bps"}},"gridPos":{"h":7,"w":12,"x":0,"y":42},"id":8,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(avg((8
      * rate(container_network_receive_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Average
      Container Bandwidth by Workload: Received","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bps"}},"gridPos":{"h":7,"w":12,"x":12,"y":42},"id":9,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(avg((8
      * rate(container_network_transmit_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Average
      Container Bandwidth by Workload: Transmitted","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":7,"w":12,"x":0,"y":49},"id":10,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_receive_packets_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Rate
      of Received Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":7,"w":12,"x":12,"y":49},"id":11,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_transmit_packets_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Rate
      of Transmitted Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":7,"w":12,"x":0,"y":56},"id":12,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_receive_packets_dropped_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Rate
      of Received Packets Dropped","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":7,"w":12,"x":12,"y":56},"id":13,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(sum(rate(container_network_transmit_packets_dropped_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\", namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Rate
      of Transmitted Packets Dropped","type":"timeseries"}],"refresh":"10s","schemaVersion":39,"tags":["kubernetes-mixin"],"templating":{"list":[{"current":{"selected":true,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","regex":"","type":"datasource"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"label":"cluster","name":"cluster","query":"label_values(up{job=\"kube-state-metrics\"},
      cluster)","refresh":2,"sort":1,"type":"query","allValue":".*"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"label":"namespace","name":"namespace","query":"label_values(kube_namespace_status_phase{job=\"kube-state-metrics\",
      cluster=\"$cluster\"}, namespace)","refresh":2,"sort":1,"type":"query"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"workload_type","name":"type","query":"label_values(namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\".+\"}, workload_type)","refresh":2,"sort":1,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Kubernetes / Compute Resources / Namespace (Workloads)","uid":"a87fb0d919ec0ea5f6543124e16c42a5"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-k8s-resources-workloads-namespace
    namespace: monitoring
    resourceVersion: "202544"
    uid: 068214cc-af66-44b0-acbe-e6bf5a069c3e
- apiVersion: v1
  data:
    kubelet.json: '{"editable":true,"links":[{"asDropdown":true,"includeVars":true,"keepTime":true,"tags":["kubernetes-mixin"],"targetBlank":false,"title":"Kubernetes","type":"dashboards"}],"panels":[{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"unit":"none"}},"gridPos":{"h":7,"w":4,"x":0,"y":0},"id":1,"interval":"1m","options":{"colorMode":"none"},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(kubelet_node_name{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\"})","instant":true}],"title":"Running
      Kubelets","type":"stat"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"unit":"none"}},"gridPos":{"h":7,"w":4,"x":4,"y":0},"id":2,"interval":"1m","options":{"colorMode":"none"},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(kubelet_running_pods{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", instance=~\"$instance\"})","instant":true}],"title":"Running
      Pods","type":"stat"},{"datasource":{"type":"datasource","uid":"-- Mixed --"},"fieldConfig":{"defaults":{"unit":"none"}},"gridPos":{"h":7,"w":4,"x":8,"y":0},"id":3,"interval":"1m","options":{"colorMode":"none"},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(kubelet_running_containers{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", container_state=\"running\", instance=~\"$instance\"})","instant":true}],"title":"Running
      Containers","type":"stat"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"unit":"none"}},"gridPos":{"h":7,"w":4,"x":12,"y":0},"id":4,"interval":"1m","options":{"colorMode":"none"},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(volume_manager_total_volumes{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", instance=~\"$instance\", state=\"actual_state_of_world\"})","instant":true}],"title":"Actual
      Volume Count","type":"stat"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"unit":"none"}},"gridPos":{"h":7,"w":4,"x":16,"y":0},"id":5,"interval":"1m","options":{"colorMode":"none"},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(volume_manager_total_volumes{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", instance=~\"$instance\",state=\"desired_state_of_world\"})","instant":true}],"title":"Desired
      Volume Count","type":"stat"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"unit":"none"}},"gridPos":{"h":7,"w":4,"x":20,"y":0},"id":6,"interval":"1m","options":{"colorMode":"none"},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(kubelet_node_config_error{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", instance=~\"$instance\"}[$__rate_interval]))","instant":true}],"title":"Config
      Error Count","type":"stat"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":12,"x":0,"y":7},"id":7,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(kubelet_runtime_operations_total{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (operation_type,
      instance)","legendFormat":"{{instance}} {{operation_type}}"}],"title":"Operation
      Rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":12,"x":12,"y":7},"id":8,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(kubelet_runtime_operations_errors_total{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (instance,
      operation_type)","legendFormat":"{{instance}} {{operation_type}}"}],"title":"Operation
      Error Rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":24,"x":0,"y":14},"id":9,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(kubelet_runtime_operations_duration_seconds_bucket{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (instance,
      operation_type, le))","legendFormat":"{{instance}} {{operation_type}}"}],"title":"Operation
      Duration 99th quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":12,"x":0,"y":21},"id":10,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(kubelet_pod_start_duration_seconds_count{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (instance)","legendFormat":"{{instance}}
      pod"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(kubelet_pod_worker_duration_seconds_count{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (instance)","legendFormat":"{{instance}}
      worker"}],"title":"Pod Start Rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":12,"x":12,"y":21},"id":11,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(kubelet_pod_start_duration_seconds_bucket{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (instance,
      le))","legendFormat":"{{instance}} pod"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(kubelet_pod_worker_duration_seconds_bucket{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (instance,
      le))","legendFormat":"{{instance}} worker"}],"title":"Pod Start Duration","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":12,"x":0,"y":28},"id":12,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(storage_operation_duration_seconds_count{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (instance,
      operation_name, volume_plugin)","legendFormat":"{{instance}} {{operation_name}}
      {{volume_plugin}}"}],"title":"Storage Operation Rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":12,"x":12,"y":28},"id":13,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(storage_operation_errors_total{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (instance,
      operation_name, volume_plugin)","legendFormat":"{{instance}} {{operation_name}}
      {{volume_plugin}}"}],"title":"Storage Operation Error Rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":24,"x":0,"y":35},"id":14,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(storage_operation_duration_seconds_bucket{cluster=\"$cluster\", job=\"kubelet\",
      metrics_path=\"/metrics\", instance=~\"$instance\"}[$__rate_interval])) by (instance,
      operation_name, volume_plugin, le))","legendFormat":"{{instance}} {{operation_name}}
      {{volume_plugin}}"}],"title":"Storage Operation Duration 99th quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":12,"x":0,"y":42},"id":15,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(kubelet_cgroup_manager_duration_seconds_count{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", instance=~\"$instance\"}[$__rate_interval]))
      by (instance, operation_type)","legendFormat":"{{operation_type}}"}],"title":"Cgroup
      manager operation rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":12,"x":12,"y":42},"id":16,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(kubelet_cgroup_manager_duration_seconds_bucket{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", instance=~\"$instance\"}[$__rate_interval]))
      by (instance, operation_type, le))","legendFormat":"{{instance}} {{operation_type}}"}],"title":"Cgroup
      manager 99th quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":12,"x":0,"y":49},"id":17,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(kubelet_pleg_relist_duration_seconds_count{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", instance=~\"$instance\"}[$__rate_interval]))
      by (instance)","legendFormat":"{{instance}}"}],"title":"PLEG relist rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":12,"x":12,"y":49},"id":18,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(kubelet_pleg_relist_interval_seconds_bucket{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (instance,
      le))","legendFormat":"{{instance}}"}],"title":"PLEG relist interval","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":24,"x":0,"y":56},"id":19,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(kubelet_pleg_relist_duration_seconds_bucket{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])) by (instance,
      le))","legendFormat":"{{instance}}"}],"title":"PLEG relist duration","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":24,"x":0,"y":63},"id":20,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\", instance=~\"$instance\",code=~\"2..\"}[$__rate_interval]))","legendFormat":"2xx"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\", instance=~\"$instance\",code=~\"3..\"}[$__rate_interval]))","legendFormat":"3xx"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\", instance=~\"$instance\",code=~\"4..\"}[$__rate_interval]))","legendFormat":"4xx"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\", instance=~\"$instance\",code=~\"5..\"}[$__rate_interval]))","legendFormat":"5xx"}],"title":"RPC
      rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":24,"x":0,"y":70},"id":21,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(rest_client_request_duration_seconds_bucket{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\", instance=~\"$instance\"}[$__rate_interval])) by (instance,
      verb, le))","legendFormat":"{{instance}} {{verb}}"}],"title":"Request duration
      99th quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bytes"}},"gridPos":{"h":7,"w":8,"x":0,"y":77},"id":22,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"process_resident_memory_bytes{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}","legendFormat":"{{instance}}"}],"title":"Memory","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"short"}},"gridPos":{"h":7,"w":8,"x":8,"y":77},"id":23,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"rate(process_cpu_seconds_total{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}[$__rate_interval])","legendFormat":"{{instance}}"}],"title":"CPU
      usage","type":"timeseries"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"short"}},"gridPos":{"h":7,"w":8,"x":16,"y":77},"id":24,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"go_goroutines{cluster=\"$cluster\",job=\"kubelet\",
      metrics_path=\"/metrics\",instance=~\"$instance\"}","legendFormat":"{{instance}}"}],"title":"Goroutines","type":"timeseries"}],"refresh":"10s","schemaVersion":39,"tags":["kubernetes-mixin"],"templating":{"list":[{"current":{"selected":true,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","regex":"","type":"datasource"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"label":"cluster","name":"cluster","query":"label_values(up{job=\"kubelet\",
      metrics_path=\"/metrics\"}, cluster)","refresh":2,"sort":1,"type":"query","allValue":".*"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"instance","name":"instance","query":"label_values(up{job=\"kubelet\",
      metrics_path=\"/metrics\",cluster=\"$cluster\"}, instance)","refresh":2,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Kubernetes / Kubelet","uid":"3138fa155d5915769fbded898ac09fd9"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-kubelet
    namespace: monitoring
    resourceVersion: "202551"
    uid: c7328005-b721-4956-95aa-013ffd0321db
- apiVersion: v1
  data:
    namespace-by-pod.json: '{"editable":true,"links":[{"asDropdown":true,"includeVars":true,"keepTime":true,"tags":["kubernetes-mixin"],"targetBlank":false,"title":"Kubernetes","type":"dashboards"}],"panels":[{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"displayName":"$namespace","max":10000000000,"min":0,"thresholds":{"steps":[{"color":"dark-green","index":0,"value":null},{"color":"dark-yellow","index":1,"value":5000000000},{"color":"dark-red","index":2,"value":7000000000}]},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":0,"y":0},"id":1,"interval":"1m","pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      (\n    (8 * rate(container_network_receive_bytes_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","legendFormat":"__auto"}],"title":"Current
      Rate of Bits Received","type":"gauge"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"displayName":"$namespace","max":10000000000,"min":0,"thresholds":{"steps":[{"color":"dark-green","index":0,"value":null},{"color":"dark-yellow","index":1,"value":5000000000},{"color":"dark-red","index":2,"value":7000000000}]},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":12,"y":0},"id":2,"interval":"1m","pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      (\n    (8 * rate(container_network_transmit_bytes_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","legendFormat":"__auto"}],"title":"Current
      Rate of Bits Transmitted","type":"gauge"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"overrides":[{"matcher":{"id":"byRegexp","options":"/Bandwidth/"},"properties":[{"id":"unit","value":"bps"}]},{"matcher":{"id":"byRegexp","options":"/Packets/"},"properties":[{"id":"unit","value":"pps"}]},{"matcher":{"id":"byName","options":"Pod"},"properties":[{"id":"links","value":[{"title":"Drill
      down","url":"/d/7a18067ce943a40ae25454675c19ff5c?${datasource:queryparam}&var-cluster=${cluster}&var-namespace=${namespace}&var-pod=${__data.fields.Pod}"}]}]}]},"gridPos":{"h":9,"w":24,"x":0,"y":9},"id":3,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    (8 * rate(container_network_receive_bytes_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    (8 * rate(container_network_transmit_bytes_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    rate(container_network_receive_packets_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    rate(container_network_transmit_packets_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    rate(container_network_receive_packets_dropped_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    rate(container_network_transmit_packets_dropped_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","format":"table","instant":true}],"title":"Current
      Network Usage","transformations":[{"id":"joinByField","options":{"byField":"pod","mode":"outer"}},{"id":"organize","options":{"excludeByName":{"Time":true,"Time
      1":true,"Time 2":true,"Time 3":true,"Time 4":true,"Time 5":true,"Time 6":true},"indexByName":{"Time
      1":0,"Time 2":1,"Time 3":2,"Time 4":3,"Time 5":4,"Time 6":5,"Value #A":7,"Value
      #B":8,"Value #C":9,"Value #D":10,"Value #E":11,"Value #F":12,"pod":6},"renameByName":{"Value
      #A":"Current Receive Bandwidth","Value #B":"Current Transmit Bandwidth","Value
      #C":"Rate of Received Packets","Value #D":"Rate of Transmitted Packets","Value
      #E":"Rate of Received Packets Dropped","Value #F":"Rate of Transmitted Packets
      Dropped","pod":"Pod"}}}],"type":"table"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":0,"y":18},"id":4,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    (8 * rate(container_network_receive_bytes_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","legendFormat":"__auto"}],"title":"Receive
      Bandwidth","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":12,"y":18},"id":5,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    (8 * rate(container_network_transmit_bytes_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","legendFormat":"__auto"}],"title":"Transmit
      Bandwidth","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":0,"y":27},"id":6,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    rate(container_network_receive_packets_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","legendFormat":"__auto"}],"title":"Rate
      of Received Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":12,"y":27},"id":7,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    rate(container_network_transmit_packets_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","legendFormat":"__auto"}],"title":"Rate
      of Transmitted Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":0,"y":36},"id":8,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    rate(container_network_receive_packets_dropped_total{cluster=\"$cluster\",namespace!=\"\"}[$__rate_interval])\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","legendFormat":"__auto"}],"title":"Rate
      of Received Packets Dropped","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":12,"y":36},"id":9,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      by (pod) (\n    rate(container_network_transmit_packets_dropped_total{cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n  *
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n)\n","legendFormat":"__auto"}],"title":"Rate
      of Transmitted Packets Dropped","type":"timeseries"}],"refresh":"10s","schemaVersion":39,"tags":["kubernetes-mixin"],"templating":{"list":[{"current":{"selected":true,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","regex":"","type":"datasource"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"label":"cluster","name":"cluster","query":"label_values(up{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\"}, cluster)","refresh":2,"sort":1,"type":"query","allValue":".*"},{"allValue":".+","current":{"selected":false,"text":"kube-system","value":"kube-system"},"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"namespace","name":"namespace","query":"label_values(container_network_receive_packets_total{cluster=\"$cluster\"},
      namespace)","refresh":2,"sort":1,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Kubernetes / Networking / Namespace (Pods)","uid":"8b7a8b326d7a6f1f04244066368c67af"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-namespace-by-pod
    namespace: monitoring
    resourceVersion: "202562"
    uid: 2ec9ec04-570b-40f2-ad40-639639f140a6
- apiVersion: v1
  data:
    namespace-by-workload.json: '{"editable":true,"links":[{"asDropdown":true,"includeVars":true,"keepTime":true,"tags":["kubernetes-mixin"],"targetBlank":false,"title":"Kubernetes","type":"dashboards"}],"panels":[{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"color":{"fixedColor":"green","mode":"fixed"},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":0,"y":0},"id":1,"interval":"1m","options":{"displayMode":"basic","showUnfilled":false},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum((8
      * rate(container_network_receive_bytes_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n*
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n*
      on (cluster,namespace,pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Current
      Rate of Bits Received","type":"bargauge"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"color":{"fixedColor":"green","mode":"fixed"},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":12,"y":0},"id":2,"interval":"1m","options":{"displayMode":"basic","showUnfilled":false},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum((8
      * rate(container_network_transmit_bytes_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n*
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n*
      on (cluster,namespace,pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Current
      Rate of Bits Transmitted","type":"bargauge"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"overrides":[{"matcher":{"id":"byRegexp","options":"/Bits/"},"properties":[{"id":"unit","value":"bps"}]},{"matcher":{"id":"byRegexp","options":"/Packets/"},"properties":[{"id":"unit","value":"pps"}]},{"matcher":{"id":"byName","options":"Workload"},"properties":[{"id":"links","value":[{"title":"Drill
      down","url":"/d/728bf77cc1166d2f3133bf25846876cc?${datasource:queryparam}&var-cluster=${cluster}&var-namespace=${namespace}&var-type=${__data.fields.Type}&var-workload=${__data.fields.Workload}"}]}]}]},"gridPos":{"h":9,"w":24,"x":0,"y":9},"id":3,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(\n  sum
      by (workload, workload_type) (\n    sum by (cluster, namespace, pod) (8 * rate(container_network_receive_bytes_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n    *
      on (cluster, namespace, pod)\n    topk by (cluster, namespace, pod) (\n      1,\n      max
      by (cluster, namespace, pod) (kube_pod_info{cluster=\"$cluster\",namespace=\"$namespace\",host_network=\"false\"})\n    )\n    *
      on (cluster, namespace, pod) group_left (workload, workload_type)\n    namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}\n  )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(\n  sum
      by (workload, workload_type) (\n    sum by (cluster, namespace, pod) (8 * rate(container_network_transmit_bytes_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n    *
      on (cluster, namespace, pod)\n    topk by (cluster, namespace, pod) (\n      1,\n      max
      by (cluster, namespace, pod) (kube_pod_info{cluster=\"$cluster\",namespace=\"$namespace\",host_network=\"false\"})\n    )\n    *
      on (cluster, namespace, pod) group_left (workload, workload_type)\n    namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}\n  )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(\n  avg
      by (workload, workload_type) (\n    sum by (cluster, namespace, pod) (8 * rate(container_network_receive_bytes_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n    *
      on (cluster, namespace, pod)\n    topk by (cluster, namespace, pod) (\n      1,\n      max
      by (cluster, namespace, pod) (kube_pod_info{cluster=\"$cluster\",namespace=\"$namespace\",host_network=\"false\"})\n    )\n    *
      on (cluster, namespace, pod) group_left (workload, workload_type)\n    namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}\n  )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(\n  avg
      by (workload, workload_type) (\n    sum by (cluster, namespace, pod) (8 * rate(container_network_transmit_bytes_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n    *
      on (cluster, namespace, pod)\n    topk by (cluster, namespace, pod) (\n      1,\n      max
      by (cluster, namespace, pod) (kube_pod_info{cluster=\"$cluster\",namespace=\"$namespace\",host_network=\"false\"})\n    )\n    *
      on (cluster, namespace, pod) group_left (workload, workload_type)\n    namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}\n  )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(\n  sum
      by (workload, workload_type) (\n    sum by (cluster, namespace, pod) (1 * rate(container_network_receive_packets_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n    *
      on (cluster, namespace, pod)\n    topk by (cluster, namespace, pod) (\n      1,\n      max
      by (cluster, namespace, pod) (kube_pod_info{cluster=\"$cluster\",namespace=\"$namespace\",host_network=\"false\"})\n    )\n    *
      on (cluster, namespace, pod) group_left (workload, workload_type)\n    namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}\n  )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(\n  sum
      by (workload, workload_type) (\n    sum by (cluster, namespace, pod) (1 * rate(container_network_transmit_packets_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n    *
      on (cluster, namespace, pod)\n    topk by (cluster, namespace, pod) (\n      1,\n      max
      by (cluster, namespace, pod) (kube_pod_info{cluster=\"$cluster\",namespace=\"$namespace\",host_network=\"false\"})\n    )\n    *
      on (cluster, namespace, pod) group_left (workload, workload_type)\n    namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}\n  )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(\n  sum
      by (workload, workload_type) (\n    sum by (cluster, namespace, pod) (1 * rate(container_network_receive_packets_dropped_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n    *
      on (cluster, namespace, pod)\n    topk by (cluster, namespace, pod) (\n      1,\n      max
      by (cluster, namespace, pod) (kube_pod_info{cluster=\"$cluster\",namespace=\"$namespace\",host_network=\"false\"})\n    )\n    *
      on (cluster, namespace, pod) group_left (workload, workload_type)\n    namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}\n  )\n)\n","format":"table","instant":true},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(\n  sum
      by (workload, workload_type) (\n    sum by (cluster, namespace, pod) (1 * rate(container_network_transmit_packets_dropped_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n    *
      on (cluster, namespace, pod)\n    topk by (cluster, namespace, pod) (\n      1,\n      max
      by (cluster, namespace, pod) (kube_pod_info{cluster=\"$cluster\",namespace=\"$namespace\",host_network=\"false\"})\n    )\n    *
      on (cluster, namespace, pod) group_left (workload, workload_type)\n    namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}\n  )\n)\n","format":"table","instant":true}],"title":"Current
      Status","transformations":[{"id":"joinByField","options":{"byField":"workload","mode":"outer"}},{"id":"organize","options":{"excludeByName":{"Time":true,"Time
      1":true,"Time 2":true,"Time 3":true,"Time 4":true,"Time 5":true,"Time 6":true,"Time
      7":true,"Time 8":true,"workload_type 2":true,"workload_type 3":true,"workload_type
      4":true,"workload_type 5":true,"workload_type 6":true,"workload_type 7":true,"workload_type
      8":true},"indexByName":{"Time 1":0,"Time 2":1,"Time 3":2,"Time 4":3,"Time 5":4,"Time
      6":5,"Time 7":6,"Time 8":7,"Value #A":10,"Value #B":11,"Value #C":12,"Value
      #D":13,"Value #E":14,"Value #F":15,"Value #G":16,"Value #H":17,"workload":8,"workload_type
      1":9,"workload_type 2":18,"workload_type 3":19,"workload_type 4":20,"workload_type
      5":21,"workload_type 6":22,"workload_type 7":23,"workload_type 8":24},"renameByName":{"Value
      #A":"Rx Bits","Value #B":"Tx Bits","Value #C":"Rx Bits (Avg)","Value #D":"Tx
      Bits (Avg)","Value #E":"Rx Packets","Value #F":"Tx Packets","Value #G":"Rx Packets
      Dropped","Value #H":"Tx Packets Dropped","workload":"Workload","workload_type
      1":"Type"}}}],"type":"table"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":0,"y":18},"id":4,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum((8
      * rate(container_network_receive_bytes_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n*
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n*
      on (cluster,namespace,pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Receive
      Bandwidth","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":12,"y":18},"id":5,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum((8
      * rate(container_network_transmit_bytes_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n*
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n*
      on (cluster,namespace,pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Transmit
      Bandwidth","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":0,"y":27},"id":6,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(avg((8
      * rate(container_network_receive_bytes_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n*
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n*
      on (cluster,namespace,pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Average
      Container Bandwidth by Workload: Received","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":12,"y":27},"id":7,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(avg((8
      * rate(container_network_transmit_bytes_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval]))\n*
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n*
      on (cluster,namespace,pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Average
      Container Bandwidth by Workload: Transmitted","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":0,"y":36},"id":8,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum(rate(container_network_receive_packets_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n*
      on (cluster,namespace,pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Rate
      of Received Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":12,"y":36},"id":9,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum(rate(container_network_transmit_packets_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n*
      on (cluster,namespace,pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Rate
      of Transmitted Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":0,"y":45},"id":10,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum(rate(container_network_receive_packets_dropped_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n*
      on (cluster,namespace,pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Rate
      of Received Packets Dropped","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":12,"y":45},"id":11,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum(rate(container_network_transmit_packets_dropped_total{cluster=\"$cluster\",namespace=\"$namespace\"}[$__rate_interval])\n*
      on (cluster,namespace,pod) group_left ()\n    topk by (cluster,namespace,pod)
      (\n      1,\n      max by (cluster,namespace,pod) (kube_pod_info{host_network=\"false\"})\n    )\n*
      on (cluster,namespace,pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=\"$namespace\",
      workload=~\".+\", workload_type=~\"$type\"}) by (workload))\n","legendFormat":"__auto"}],"title":"Rate
      of Transmitted Packets Dropped","type":"timeseries"}],"refresh":"10s","schemaVersion":39,"tags":["kubernetes-mixin"],"templating":{"list":[{"current":{"selected":true,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","regex":"","type":"datasource"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"label":"cluster","name":"cluster","query":"label_values(up{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\"}, cluster)","refresh":2,"sort":1,"type":"query","allValue":".*"},{"current":{"selected":false,"text":"kube-system","value":"kube-system"},"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"label":"namespace","name":"namespace","query":"label_values(container_network_receive_packets_total{cluster=\"$cluster\"},
      namespace)","refresh":2,"sort":1,"type":"query"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"workload_type","name":"type","query":"label_values(namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=\"$namespace\", workload=~\".+\"}, workload_type)","refresh":2,"sort":1,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Kubernetes / Networking / Namespace (Workload)","uid":"bbb2a765a623ae38130206c7d94a160f"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-namespace-by-workload
    namespace: monitoring
    resourceVersion: "202565"
    uid: dbdf0284-6cd8-4119-91de-ef5910b715ea
- apiVersion: v1
  data:
    node-cluster-rsrc-use.json: '{"graphTooltip":1,"panels":[{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":0},"id":1,"panels":[],"title":"CPU","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":0,"y":1},"id":2,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"((\n  instance:node_cpu_utilisation:rate5m{job=\"node-exporter\",
      cluster=~\"$cluster\"}\n  *\n  instance:node_num_cpu:sum{job=\"node-exporter\",
      cluster=~\"$cluster\"}\n) != 0 )\n/ scalar(sum(instance:node_num_cpu:sum{job=\"node-exporter\",
      cluster=~\"$cluster\"}))\n","legendFormat":"{{ instance }}"}],"title":"CPU Utilisation","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":12,"y":1},"id":3,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"(\n  instance:node_load1_per_cpu:ratio{job=\"node-exporter\",
      cluster=~\"$cluster\"}\n  / scalar(count(instance:node_load1_per_cpu:ratio{job=\"node-exporter\",
      cluster=~\"$cluster\"}))\n)  != 0\n","legendFormat":"{{ instance }}"}],"title":"CPU
      Saturation (Load1 per CPU)","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":8},"id":4,"panels":[],"title":"Memory","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":0,"y":9},"id":5,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"(\n  instance:node_memory_utilisation:ratio{job=\"node-exporter\",
      cluster=~\"$cluster\"}\n  / scalar(count(instance:node_memory_utilisation:ratio{job=\"node-exporter\",
      cluster=~\"$cluster\"}))\n) != 0\n","legendFormat":"{{ instance }}"}],"title":"Memory
      Utilisation","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"rds"}},"gridPos":{"h":7,"w":12,"x":12,"y":9},"id":6,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_vmstat_pgmajfault:rate5m{job=\"node-exporter\",
      cluster=~\"$cluster\"}","legendFormat":"{{ instance }}"}],"title":"Memory Saturation
      (Major Page Faults)","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":16},"id":7,"panels":[],"title":"Network","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"Bps"},"overrides":[{"matcher":{"id":"byRegexp","options":"/Transmit/"},"properties":[{"id":"custom.transform","value":"negative-Y"}]}]},"gridPos":{"h":7,"w":12,"x":0,"y":17},"id":8,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_network_receive_bytes_excluding_lo:rate5m{job=\"node-exporter\",
      cluster=~\"$cluster\"} != 0","legendFormat":"{{ instance }} Receive"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_network_transmit_bytes_excluding_lo:rate5m{job=\"node-exporter\",
      cluster=~\"$cluster\"} != 0","legendFormat":"{{ instance }} Transmit"}],"title":"Network
      Utilisation (Bytes Receive/Transmit)","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"Bps"},"overrides":[{"matcher":{"id":"byRegexp","options":"/Transmit/"},"properties":[{"id":"custom.transform","value":"negative-Y"}]}]},"gridPos":{"h":7,"w":12,"x":12,"y":17},"id":9,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_network_receive_drop_excluding_lo:rate5m{job=\"node-exporter\",
      cluster=~\"$cluster\"} != 0","legendFormat":"{{ instance }} Receive"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_network_transmit_drop_excluding_lo:rate5m{job=\"node-exporter\",
      cluster=~\"$cluster\"} != 0","legendFormat":"{{ instance }} Transmit"}],"title":"Network
      Saturation (Drops Receive/Transmit)","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":24},"id":10,"panels":[],"title":"Disk
      IO","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":0,"y":25},"id":11,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance_device:node_disk_io_time_seconds:rate5m{job=\"node-exporter\",
      cluster=~\"$cluster\"}\n/ scalar(count(instance_device:node_disk_io_time_seconds:rate5m{job=\"node-exporter\",
      cluster=~\"$cluster\"}))\n","legendFormat":"{{ instance }} {{device}}"}],"title":"Disk
      IO Utilisation","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":12,"y":25},"id":12,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance_device:node_disk_io_time_weighted_seconds:rate5m{job=\"node-exporter\",
      cluster=~\"$cluster\"}\n/ scalar(count(instance_device:node_disk_io_time_weighted_seconds:rate5m{job=\"node-exporter\",
      cluster=~\"$cluster\"}))\n","legendFormat":"{{ instance }} {{device}}"}],"title":"Disk
      IO Saturation","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":34},"id":13,"panels":[],"title":"Disk
      Space","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":24,"x":0,"y":35},"id":14,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"sum
      without (device) (\n  max without (fstype, mountpoint) ((\n    node_filesystem_size_bytes{job=\"node-exporter\",
      fstype!=\"\", mountpoint!=\"\", cluster=~\"$cluster\"}\n    -\n    node_filesystem_avail_bytes{job=\"node-exporter\",
      fstype!=\"\", mountpoint!=\"\", cluster=~\"$cluster\"}\n  ) != 0)\n)\n/ scalar(sum(max
      without (fstype, mountpoint) (node_filesystem_size_bytes{job=\"node-exporter\",
      fstype!=\"\", mountpoint!=\"\", cluster=~\"$cluster\"})))\n","legendFormat":"{{
      instance }}"}],"title":"Disk Space Utilisation","type":"timeseries"}],"refresh":"30s","schemaVersion":39,"tags":["node-exporter-mixin"],"templating":{"list":[{"name":"datasource","query":"prometheus","type":"datasource"},{"allValue":".*","datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"includeAll":true,"name":"cluster","query":"label_values(node_time_seconds,
      cluster)","refresh":2,"sort":1,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Node Exporter / USE Method / Cluster","uid":"3e97d1d02672cdd0861f4c97c64f89b2"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-node-cluster-rsrc-use
    namespace: monitoring
    resourceVersion: "202543"
    uid: 1e7ff744-cd57-413f-980d-f0fb947ab4e0
- apiVersion: v1
  data:
    node-rsrc-use.json: '{"graphTooltip":1,"panels":[{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":0},"id":1,"panels":[],"title":"CPU","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":0,"y":1},"id":2,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_cpu_utilisation:rate5m{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} != 0","legendFormat":"Utilisation"}],"title":"CPU
      Utilisation","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":12,"y":1},"id":3,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_load1_per_cpu:ratio{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} != 0","legendFormat":"Saturation"}],"title":"CPU
      Saturation (Load1 per CPU)","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":8},"id":4,"panels":[],"title":"Memory","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":0,"y":9},"id":5,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_memory_utilisation:ratio{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} != 0","legendFormat":"Utilisation"}],"title":"Memory
      Utilisation","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"rds"}},"gridPos":{"h":7,"w":12,"x":12,"y":9},"id":6,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_vmstat_pgmajfault:rate5m{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} != 0","legendFormat":"Major page
      Faults"}],"title":"Memory Saturation (Major Page Faults)","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":16},"id":7,"panels":[],"title":"Network","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"Bps"},"overrides":[{"matcher":{"id":"byRegexp","options":"/Transmit/"},"properties":[{"id":"custom.transform","value":"negative-Y"}]}]},"gridPos":{"h":7,"w":12,"x":0,"y":17},"id":8,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_network_receive_bytes_physical:rate5m{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} != 0","legendFormat":"Receive"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_network_transmit_bytes_physical:rate5m{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} != 0","legendFormat":"Transmit"}],"title":"Network
      Utilisation (Bytes Receive/Transmit)","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"Bps"},"overrides":[{"matcher":{"id":"byRegexp","options":"/Transmit/"},"properties":[{"id":"custom.transform","value":"negative-Y"}]}]},"gridPos":{"h":7,"w":12,"x":12,"y":17},"id":9,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_network_receive_drop_physical:rate5m{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} != 0","legendFormat":"Receive"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance:node_network_transmit_drop_physical:rate5m{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} != 0","legendFormat":"Transmit"}],"title":"Network
      Saturation (Drops Receive/Transmit)","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":24},"id":10,"panels":[],"title":"Disk
      IO","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":0,"y":25},"id":11,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance_device:node_disk_io_time_seconds:rate5m{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} != 0","legendFormat":"{{device}}"}],"title":"Disk
      IO Utilisation","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":12,"y":25},"id":12,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"instance_device:node_disk_io_time_weighted_seconds:rate5m{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} != 0","legendFormat":"{{device}}"}],"title":"Disk
      IO Saturation","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":34},"id":13,"panels":[],"title":"Disk
      Space","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"showPoints":"never","stacking":{"mode":"normal"}},"unit":"percentunit"}},"gridPos":{"h":7,"w":24,"x":0,"y":35},"id":14,"options":{"legend":{"showLegend":false},"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"sort_desc(1
      -\n  (\n    max without (mountpoint, fstype) (node_filesystem_avail_bytes{job=\"node-exporter\",
      fstype!=\"\", instance=\"$instance\", cluster=~\"$cluster\"})\n    /\n    max
      without (mountpoint, fstype) (node_filesystem_size_bytes{job=\"node-exporter\",
      fstype!=\"\", instance=\"$instance\", cluster=~\"$cluster\"})\n  ) != 0\n)\n","legendFormat":"{{device}}"}],"title":"Disk
      Space Utilisation","type":"timeseries"}],"refresh":"30s","schemaVersion":39,"tags":["node-exporter-mixin"],"templating":{"list":[{"name":"datasource","query":"prometheus","type":"datasource"},{"allValue":".*","datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"includeAll":true,"name":"cluster","query":"label_values(node_time_seconds,
      cluster)","refresh":2,"sort":1,"type":"query"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"name":"instance","query":"label_values(node_exporter_build_info{job=\"node-exporter\",
      cluster=~\"$cluster\"}, instance)","refresh":2,"sort":1,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Node Exporter / USE Method / Node","uid":"fac67cfbe174d3ef53eb473d73d9212f"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-node-rsrc-use
    namespace: monitoring
    resourceVersion: "202559"
    uid: 15f04ab1-f6bd-4271-b57e-97c6f4f92241
- apiVersion: v1
  data:
    nodes.json: '{"graphTooltip":1,"panels":[{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":0},"id":1,"panels":[],"title":"CPU","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","stacking":{"mode":"normal"}},"max":1,"min":0,"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":0,"y":1},"id":2,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"(\n  (1
      - sum without (mode) (rate(node_cpu_seconds_total{job=\"node-exporter\", mode=~\"idle|iowait|steal\",
      instance=\"$instance\", cluster=~\"$cluster\"}[$__rate_interval])))\n/ ignoring(cpu)
      group_left\n  count without (cpu, mode) (node_cpu_seconds_total{job=\"node-exporter\",
      mode=\"idle\", instance=\"$instance\", cluster=~\"$cluster\"})\n)\n","intervalFactor":5,"legendFormat":"{{cpu}}"}],"title":"CPU
      Usage","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":0,"showPoints":"never"},"min":0,"unit":"short"}},"gridPos":{"h":7,"w":12,"x":12,"y":1},"id":3,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_load1{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"1m load average"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_load5{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"5m load average"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_load15{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"15m load average"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"count(node_cpu_seconds_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", mode=\"idle\"})","legendFormat":"logical
      cores"}],"title":"Load Average","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":8},"id":4,"title":"Memory","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","stacking":{"mode":"normal"}},"min":0,"unit":"bytes"}},"gridPos":{"h":7,"w":18,"x":0,"y":9},"id":5,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"(\n  node_memory_MemTotal_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}\n-\n  node_memory_MemFree_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}\n-\n  node_memory_Buffers_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}\n-\n  node_memory_Cached_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}\n)\n","legendFormat":"memory
      used"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_memory_Buffers_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"memory buffers"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_memory_Cached_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"memory cached"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_memory_MemFree_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"memory free"}],"title":"Memory
      Usage","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"max":100,"min":0,"thresholds":{"steps":[{"color":"rgba(50,
      172, 45, 0.97)"},{"color":"rgba(237, 129, 40, 0.89)","value":80},{"color":"rgba(245,
      54, 54, 0.9)","value":90}]},"unit":"percent"}},"gridPos":{"h":7,"w":6,"x":18,"y":9},"id":6,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"100
      -\n(\n  avg(node_memory_MemAvailable_bytes{job=\"node-exporter\", instance=\"$instance\",
      cluster=~\"$cluster\"}) /\n  avg(node_memory_MemTotal_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"})\n* 100\n)\n"}],"title":"Memory
      Usage","type":"gauge"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":18},"id":7,"panels":[],"title":"Disk","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":0,"showPoints":"never"},"min":0},"overrides":[{"matcher":{"id":"byRegexp","options":"/
      read| written/"},"properties":[{"id":"unit","value":"Bps"}]},{"matcher":{"id":"byRegexp","options":"/
      io time/"},"properties":[{"id":"unit","value":"percentunit"}]}]},"gridPos":{"h":7,"w":12,"x":0,"y":19},"id":8,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_disk_read_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device=~\"(/dev/)?(mmcblk.p.+|nvme.+|rbd.+|sd.+|vd.+|xvd.+|dm-.+|md.+|dasd.+)\"}[$__rate_interval])","intervalFactor":1,"legendFormat":"{{device}}
      read"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_disk_written_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device=~\"(/dev/)?(mmcblk.p.+|nvme.+|rbd.+|sd.+|vd.+|xvd.+|dm-.+|md.+|dasd.+)\"}[$__rate_interval])","intervalFactor":1,"legendFormat":"{{device}}
      written"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_disk_io_time_seconds_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device=~\"(/dev/)?(mmcblk.p.+|nvme.+|rbd.+|sd.+|vd.+|xvd.+|dm-.+|md.+|dasd.+)\"}[$__rate_interval])","intervalFactor":1,"legendFormat":"{{device}}
      io time"}],"title":"Disk I/O","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"thresholds":{"steps":[{"color":"green"},{"color":"yellow","value":0.8},{"color":"red","value":0.9}]},"unit":"decbytes"},"overrides":[{"matcher":{"id":"byName","options":"Mounted
      on"},"properties":[{"id":"custom.width","value":260}]},{"matcher":{"id":"byName","options":"Size"},"properties":[{"id":"custom.width","value":93}]},{"matcher":{"id":"byName","options":"Used"},"properties":[{"id":"custom.width","value":72}]},{"matcher":{"id":"byName","options":"Available"},"properties":[{"id":"custom.width","value":88}]},{"matcher":{"id":"byName","options":"Used,
      %"},"properties":[{"id":"unit","value":"percentunit"},{"id":"custom.cellOptions","value":{"type":"gauge"}},{"id":"max","value":1},{"id":"min","value":0}]}]},"gridPos":{"h":7,"w":12,"x":12,"y":19},"id":9,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"max
      by (mountpoint) (node_filesystem_size_bytes{job=\"node-exporter\", instance=\"$instance\",
      cluster=~\"$cluster\", fstype!=\"\", mountpoint!=\"\"})\n","format":"table","instant":true,"legendFormat":""},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"max
      by (mountpoint) (node_filesystem_avail_bytes{job=\"node-exporter\", instance=\"$instance\",
      cluster=~\"$cluster\", fstype!=\"\", mountpoint!=\"\"})\n","format":"table","instant":true,"legendFormat":""}],"title":"Disk
      Space Usage","transformations":[{"id":"groupBy","options":{"fields":{"Value
      #A":{"aggregations":["lastNotNull"],"operation":"aggregate"},"Value #B":{"aggregations":["lastNotNull"],"operation":"aggregate"},"mountpoint":{"aggregations":[],"operation":"groupby"}}}},{"id":"merge"},{"id":"calculateField","options":{"alias":"Used","binary":{"left":"Value
      #A (lastNotNull)","operator":"-","reducer":"sum","right":"Value #B (lastNotNull)"},"mode":"binary","reduce":{"reducer":"sum"}}},{"id":"calculateField","options":{"alias":"Used,
      %","binary":{"left":"Used","operator":"/","reducer":"sum","right":"Value #A
      (lastNotNull)"},"mode":"binary","reduce":{"reducer":"sum"}}},{"id":"organize","options":{"excludeByName":{},"indexByName":{},"renameByName":{"Value
      #A (lastNotNull)":"Size","Value #B (lastNotNull)":"Available","mountpoint":"Mounted
      on"}}},{"id":"sortBy","options":{"fields":{},"sort":[{"field":"Mounted on"}]}}],"type":"table"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":26},"id":10,"panels":[],"title":"Network","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"description":"Network
      received (bits/s)","fieldConfig":{"defaults":{"custom":{"fillOpacity":0,"showPoints":"never"},"min":0,"unit":"bps"}},"gridPos":{"h":7,"w":12,"x":0,"y":27},"id":11,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_network_receive_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device!=\"lo\"}[$__rate_interval])
      * 8","intervalFactor":1,"legendFormat":"{{device}}"}],"title":"Network Received","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"description":"Network
      transmitted (bits/s)","fieldConfig":{"defaults":{"custom":{"fillOpacity":0},"min":0,"unit":"bps"}},"gridPos":{"h":7,"w":12,"x":12,"y":27},"id":12,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_network_transmit_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device!=\"lo\"}[$__rate_interval])
      * 8","intervalFactor":1,"legendFormat":"{{device}}"}],"title":"Network Transmitted","type":"timeseries"}],"refresh":"30s","schemaVersion":39,"tags":["node-exporter-mixin"],"templating":{"list":[{"name":"datasource","query":"prometheus","type":"datasource"},{"allValue":".*","datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"includeAll":true,"label":"Cluster","name":"cluster","query":"label_values(node_uname_info{job=\"node-exporter\",
      sysname!=\"Darwin\"}, cluster)","refresh":2,"type":"query"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"label":"Instance","name":"instance","query":"label_values(node_uname_info{job=\"node-exporter\",
      cluster=~\"$cluster\", sysname!=\"Darwin\"}, instance)","refresh":2,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Node Exporter / Nodes","uid":"7d57716318ee0dddbac5a7f451fb7753"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-nodes
    namespace: monitoring
    resourceVersion: "202557"
    uid: b72e9e2f-8ced-40e4-a1c9-dc7aee51a744
- apiVersion: v1
  data:
    nodes-aix.json: '{"graphTooltip":1,"panels":[{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":0},"id":1,"panels":[],"title":"CPU","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","stacking":{"mode":"normal"}},"max":1,"min":0,"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":0,"y":1},"id":2,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"(\n  (1
      - sum without (mode) (rate(node_cpu_seconds_total{job=\"node-exporter\", mode=~\"idle|iowait|steal\",
      instance=\"$instance\", cluster=~\"$cluster\"}[$__rate_interval])))\n/ ignoring(cpu)
      group_left\n  count without (cpu, mode) (node_cpu_seconds_total{job=\"node-exporter\",
      mode=\"idle\", instance=\"$instance\", cluster=~\"$cluster\"})\n)\n","intervalFactor":5,"legendFormat":"{{cpu}}"}],"title":"CPU
      Usage","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":0,"showPoints":"never"},"min":0,"unit":"short"}},"gridPos":{"h":7,"w":12,"x":12,"y":1},"id":3,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_load1{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"1m load average"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_load5{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"5m load average"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_load15{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"15m load average"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"count(node_cpu_seconds_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", mode=\"idle\"})","legendFormat":"logical
      cores"}],"title":"Load Average","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":8},"id":4,"title":"Memory","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","stacking":{"mode":"none"}},"min":0,"unit":"bytes"}},"gridPos":{"h":7,"w":18,"x":0,"y":9},"id":5,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_memory_total_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"Physical Memory"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"(\n    node_memory_total_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} -\n    node_memory_available_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}\n)\n","legendFormat":"Memory
      Used"}],"title":"Memory Usage","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"max":100,"min":0,"thresholds":{"steps":[{"color":"rgba(50,
      172, 45, 0.97)"},{"color":"rgba(237, 129, 40, 0.89)","value":80},{"color":"rgba(245,
      54, 54, 0.9)","value":90}]},"unit":"percent"}},"gridPos":{"h":7,"w":6,"x":18,"y":9},"id":6,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"100
      -\n(\n  avg(node_memory_available_bytes{job=\"node-exporter\", instance=\"$instance\",
      cluster=~\"$cluster\"}) /\n  avg(node_memory_total_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"})\n  * 100\n)\n"}],"title":"Memory
      Usage","type":"gauge"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":18},"id":7,"panels":[],"title":"Disk","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":0,"showPoints":"never"},"min":0},"overrides":[{"matcher":{"id":"byRegexp","options":"/
      read| written/"},"properties":[{"id":"unit","value":"Bps"}]},{"matcher":{"id":"byRegexp","options":"/
      io time/"},"properties":[{"id":"unit","value":"percentunit"}]}]},"gridPos":{"h":7,"w":12,"x":0,"y":19},"id":8,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_disk_read_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device=~\"(/dev/)?(mmcblk.p.+|nvme.+|rbd.+|sd.+|vd.+|xvd.+|dm-.+|md.+|dasd.+)\"}[$__rate_interval])","intervalFactor":1,"legendFormat":"{{device}}
      read"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_disk_written_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device=~\"(/dev/)?(mmcblk.p.+|nvme.+|rbd.+|sd.+|vd.+|xvd.+|dm-.+|md.+|dasd.+)\"}[$__rate_interval])","intervalFactor":1,"legendFormat":"{{device}}
      written"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_disk_io_time_seconds_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device=~\"(/dev/)?(mmcblk.p.+|nvme.+|rbd.+|sd.+|vd.+|xvd.+|dm-.+|md.+|dasd.+)\"}[$__rate_interval])","intervalFactor":1,"legendFormat":"{{device}}
      io time"}],"title":"Disk I/O","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"thresholds":{"steps":[{"color":"green"},{"color":"yellow","value":0.8},{"color":"red","value":0.9}]},"unit":"decbytes"},"overrides":[{"matcher":{"id":"byName","options":"Mounted
      on"},"properties":[{"id":"custom.width","value":260}]},{"matcher":{"id":"byName","options":"Size"},"properties":[{"id":"custom.width","value":93}]},{"matcher":{"id":"byName","options":"Used"},"properties":[{"id":"custom.width","value":72}]},{"matcher":{"id":"byName","options":"Available"},"properties":[{"id":"custom.width","value":88}]},{"matcher":{"id":"byName","options":"Used,
      %"},"properties":[{"id":"unit","value":"percentunit"},{"id":"custom.cellOptions","value":{"type":"gauge"}},{"id":"max","value":1},{"id":"min","value":0}]}]},"gridPos":{"h":7,"w":12,"x":12,"y":19},"id":9,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"max
      by (mountpoint) (node_filesystem_size_bytes{job=\"node-exporter\", instance=\"$instance\",
      cluster=~\"$cluster\", fstype!=\"\", mountpoint!=\"\"})\n","format":"table","instant":true,"legendFormat":""},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"max
      by (mountpoint) (node_filesystem_avail_bytes{job=\"node-exporter\", instance=\"$instance\",
      cluster=~\"$cluster\", fstype!=\"\", mountpoint!=\"\"})\n","format":"table","instant":true,"legendFormat":""}],"title":"Disk
      Space Usage","transformations":[{"id":"groupBy","options":{"fields":{"Value
      #A":{"aggregations":["lastNotNull"],"operation":"aggregate"},"Value #B":{"aggregations":["lastNotNull"],"operation":"aggregate"},"mountpoint":{"aggregations":[],"operation":"groupby"}}}},{"id":"merge"},{"id":"calculateField","options":{"alias":"Used","binary":{"left":"Value
      #A (lastNotNull)","operator":"-","reducer":"sum","right":"Value #B (lastNotNull)"},"mode":"binary","reduce":{"reducer":"sum"}}},{"id":"calculateField","options":{"alias":"Used,
      %","binary":{"left":"Used","operator":"/","reducer":"sum","right":"Value #A
      (lastNotNull)"},"mode":"binary","reduce":{"reducer":"sum"}}},{"id":"organize","options":{"excludeByName":{},"indexByName":{},"renameByName":{"Value
      #A (lastNotNull)":"Size","Value #B (lastNotNull)":"Available","mountpoint":"Mounted
      on"}}},{"id":"sortBy","options":{"fields":{},"sort":[{"field":"Mounted on"}]}}],"type":"table"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":26},"id":10,"panels":[],"title":"Network","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"description":"Network
      received (bits/s)","fieldConfig":{"defaults":{"custom":{"fillOpacity":0,"showPoints":"never"},"min":0,"unit":"bps"}},"gridPos":{"h":7,"w":12,"x":0,"y":27},"id":11,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_network_receive_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device!=\"lo\"}[$__rate_interval])
      * 8","intervalFactor":1,"legendFormat":"{{device}}"}],"title":"Network Received","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"description":"Network
      transmitted (bits/s)","fieldConfig":{"defaults":{"custom":{"fillOpacity":0},"min":0,"unit":"bps"}},"gridPos":{"h":7,"w":12,"x":12,"y":27},"id":12,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_network_transmit_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device!=\"lo\"}[$__rate_interval])
      * 8","intervalFactor":1,"legendFormat":"{{device}}"}],"title":"Network Transmitted","type":"timeseries"}],"refresh":"30s","schemaVersion":39,"tags":["node-exporter-mixin"],"templating":{"list":[{"name":"datasource","query":"prometheus","type":"datasource"},{"allValue":".*","datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"includeAll":true,"label":"Cluster","name":"cluster","query":"label_values(node_uname_info{job=\"node-exporter\",
      sysname!=\"Darwin\"}, cluster)","refresh":2,"type":"query"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"label":"Instance","name":"instance","query":"label_values(node_uname_info{job=\"node-exporter\",
      cluster=~\"$cluster\", sysname!=\"Darwin\"}, instance)","refresh":2,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Node Exporter / AIX","uid":"7e0a61e486f727d763fb1d86fdd629c2"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-nodes-aix
    namespace: monitoring
    resourceVersion: "202552"
    uid: 245a4ae3-9179-4274-b412-09db2976e3e0
- apiVersion: v1
  data:
    nodes-darwin.json: '{"graphTooltip":1,"panels":[{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":0},"id":1,"panels":[],"title":"CPU","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","stacking":{"mode":"normal"}},"max":1,"min":0,"unit":"percentunit"}},"gridPos":{"h":7,"w":12,"x":0,"y":1},"id":2,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"(\n  (1
      - sum without (mode) (rate(node_cpu_seconds_total{job=\"node-exporter\", mode=~\"idle|iowait|steal\",
      instance=\"$instance\", cluster=~\"$cluster\"}[$__rate_interval])))\n/ ignoring(cpu)
      group_left\n  count without (cpu, mode) (node_cpu_seconds_total{job=\"node-exporter\",
      mode=\"idle\", instance=\"$instance\", cluster=~\"$cluster\"})\n)\n","intervalFactor":5,"legendFormat":"{{cpu}}"}],"title":"CPU
      Usage","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":0,"showPoints":"never"},"min":0,"unit":"short"}},"gridPos":{"h":7,"w":12,"x":12,"y":1},"id":3,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_load1{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"1m load average"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_load5{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"5m load average"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_load15{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"15m load average"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"count(node_cpu_seconds_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", mode=\"idle\"})","legendFormat":"logical
      cores"}],"title":"Load Average","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":8},"id":4,"title":"Memory","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","stacking":{"mode":"none"}},"min":0,"unit":"bytes"}},"gridPos":{"h":7,"w":18,"x":0,"y":9},"id":5,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_memory_total_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"Physical Memory"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"(\n    node_memory_internal_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} -\n    node_memory_purgeable_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} +\n    node_memory_wired_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} +\n    node_memory_compressed_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}\n)\n","legendFormat":"Memory
      Used"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"(\n    node_memory_internal_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"} -\n    node_memory_purgeable_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}\n)\n","legendFormat":"App Memory"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_memory_wired_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"Wired Memory"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"node_memory_compressed_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}","legendFormat":"Compressed"}],"title":"Memory
      Usage","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"max":100,"min":0,"thresholds":{"steps":[{"color":"rgba(50,
      172, 45, 0.97)"},{"color":"rgba(237, 129, 40, 0.89)","value":80},{"color":"rgba(245,
      54, 54, 0.9)","value":90}]},"unit":"percent"}},"gridPos":{"h":7,"w":6,"x":18,"y":9},"id":6,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"(\n    (\n      avg(node_memory_internal_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}) -\n      avg(node_memory_purgeable_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}) +\n      avg(node_memory_wired_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"}) +\n      avg(node_memory_compressed_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"})\n    ) /\n    avg(node_memory_total_bytes{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\"})\n)\n*\n100\n"}],"title":"Memory
      Usage","type":"gauge"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":18},"id":7,"panels":[],"title":"Disk","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":0,"showPoints":"never"},"min":0},"overrides":[{"matcher":{"id":"byRegexp","options":"/
      read| written/"},"properties":[{"id":"unit","value":"Bps"}]},{"matcher":{"id":"byRegexp","options":"/
      io time/"},"properties":[{"id":"unit","value":"percentunit"}]}]},"gridPos":{"h":7,"w":12,"x":0,"y":19},"id":8,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_disk_read_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device=~\"(/dev/)?(mmcblk.p.+|nvme.+|rbd.+|sd.+|vd.+|xvd.+|dm-.+|md.+|dasd.+)\"}[$__rate_interval])","intervalFactor":1,"legendFormat":"{{device}}
      read"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_disk_written_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device=~\"(/dev/)?(mmcblk.p.+|nvme.+|rbd.+|sd.+|vd.+|xvd.+|dm-.+|md.+|dasd.+)\"}[$__rate_interval])","intervalFactor":1,"legendFormat":"{{device}}
      written"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_disk_io_time_seconds_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device=~\"(/dev/)?(mmcblk.p.+|nvme.+|rbd.+|sd.+|vd.+|xvd.+|dm-.+|md.+|dasd.+)\"}[$__rate_interval])","intervalFactor":1,"legendFormat":"{{device}}
      io time"}],"title":"Disk I/O","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"fieldConfig":{"defaults":{"thresholds":{"steps":[{"color":"green"},{"color":"yellow","value":0.8},{"color":"red","value":0.9}]},"unit":"decbytes"},"overrides":[{"matcher":{"id":"byName","options":"Mounted
      on"},"properties":[{"id":"custom.width","value":260}]},{"matcher":{"id":"byName","options":"Size"},"properties":[{"id":"custom.width","value":93}]},{"matcher":{"id":"byName","options":"Used"},"properties":[{"id":"custom.width","value":72}]},{"matcher":{"id":"byName","options":"Available"},"properties":[{"id":"custom.width","value":88}]},{"matcher":{"id":"byName","options":"Used,
      %"},"properties":[{"id":"unit","value":"percentunit"},{"id":"custom.cellOptions","value":{"type":"gauge"}},{"id":"max","value":1},{"id":"min","value":0}]}]},"gridPos":{"h":7,"w":12,"x":12,"y":19},"id":9,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"max
      by (mountpoint) (node_filesystem_size_bytes{job=\"node-exporter\", instance=\"$instance\",
      cluster=~\"$cluster\", fstype!=\"\", mountpoint!=\"\"})\n","format":"table","instant":true,"legendFormat":""},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"max
      by (mountpoint) (node_filesystem_avail_bytes{job=\"node-exporter\", instance=\"$instance\",
      cluster=~\"$cluster\", fstype!=\"\", mountpoint!=\"\"})\n","format":"table","instant":true,"legendFormat":""}],"title":"Disk
      Space Usage","transformations":[{"id":"groupBy","options":{"fields":{"Value
      #A":{"aggregations":["lastNotNull"],"operation":"aggregate"},"Value #B":{"aggregations":["lastNotNull"],"operation":"aggregate"},"mountpoint":{"aggregations":[],"operation":"groupby"}}}},{"id":"merge"},{"id":"calculateField","options":{"alias":"Used","binary":{"left":"Value
      #A (lastNotNull)","operator":"-","reducer":"sum","right":"Value #B (lastNotNull)"},"mode":"binary","reduce":{"reducer":"sum"}}},{"id":"calculateField","options":{"alias":"Used,
      %","binary":{"left":"Used","operator":"/","reducer":"sum","right":"Value #A
      (lastNotNull)"},"mode":"binary","reduce":{"reducer":"sum"}}},{"id":"organize","options":{"excludeByName":{},"indexByName":{},"renameByName":{"Value
      #A (lastNotNull)":"Size","Value #B (lastNotNull)":"Available","mountpoint":"Mounted
      on"}}},{"id":"sortBy","options":{"fields":{},"sort":[{"field":"Mounted on"}]}}],"type":"table"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":26},"id":10,"panels":[],"title":"Network","type":"row"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"description":"Network
      received (bits/s)","fieldConfig":{"defaults":{"custom":{"fillOpacity":0,"showPoints":"never"},"min":0,"unit":"bps"}},"gridPos":{"h":7,"w":12,"x":0,"y":27},"id":11,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_network_receive_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device!=\"lo\"}[$__rate_interval])
      * 8","intervalFactor":1,"legendFormat":"{{device}}"}],"title":"Network Received","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"description":"Network
      transmitted (bits/s)","fieldConfig":{"defaults":{"custom":{"fillOpacity":0},"min":0,"unit":"bps"}},"gridPos":{"h":7,"w":12,"x":12,"y":27},"id":12,"options":{"tooltip":{"mode":"multi"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(node_network_transmit_bytes_total{job=\"node-exporter\",
      instance=\"$instance\", cluster=~\"$cluster\", device!=\"lo\"}[$__rate_interval])
      * 8","intervalFactor":1,"legendFormat":"{{device}}"}],"title":"Network Transmitted","type":"timeseries"}],"refresh":"30s","schemaVersion":39,"tags":["node-exporter-mixin"],"templating":{"list":[{"name":"datasource","query":"prometheus","type":"datasource"},{"allValue":".*","datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"includeAll":true,"label":"Cluster","name":"cluster","query":"label_values(node_uname_info{job=\"node-exporter\",
      sysname=\"Darwin\"},  cluster)","refresh":2,"type":"query"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"label":"Instance","name":"instance","query":"label_values(node_uname_info{job=\"node-exporter\",
      cluster=~\"$cluster\", sysname=\"Darwin\"}, instance)","refresh":2,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Node Exporter / MacOS","uid":"629701ea43bf69291922ea45f4a87d37"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-nodes-darwin
    namespace: monitoring
    resourceVersion: "202560"
    uid: 8469ff47-94c2-4b7e-ad52-e38e71c5d237
- apiVersion: v1
  data:
    persistentvolumesusage.json: '{"editable":true,"links":[{"asDropdown":true,"includeVars":true,"keepTime":true,"tags":["kubernetes-mixin"],"targetBlank":false,"title":"Kubernetes","type":"dashboards"}],"panels":[{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bytes"}},"gridPos":{"h":7,"w":18,"y":0},"id":1,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(\n  sum
      without(instance, node) (topk(1, (kubelet_volume_stats_capacity_bytes{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})))\n  -\n  sum
      without(instance, node) (topk(1, (kubelet_volume_stats_available_bytes{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})))\n)\n","legendFormat":"Used
      Space"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      without(instance, node) (topk(1, (kubelet_volume_stats_available_bytes{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})))\n","legendFormat":"Free
      Space"}],"title":"Volume Space Usage","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"color":{"mode":"thresholds"},"max":100,"min":0,"thresholds":{"mode":"absolute","steps":[{"color":"green","value":0},{"color":"orange","value":80},{"color":"red","value":90}]},"unit":"percent"}},"gridPos":{"h":7,"w":6,"x":18,"y":0},"id":2,"interval":"1m","pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"max
      without(instance,node) (\n(\n  topk(1, kubelet_volume_stats_capacity_bytes{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})\n  -\n  topk(1,
      kubelet_volume_stats_available_bytes{cluster=\"$cluster\", job=\"kubelet\",
      metrics_path=\"/metrics\", namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})\n)\n/\ntopk(1,
      kubelet_volume_stats_capacity_bytes{cluster=\"$cluster\", job=\"kubelet\", metrics_path=\"/metrics\",
      namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})\n* 100)\n","instant":true}],"title":"Volume
      Space Usage","type":"gauge"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"none"}},"gridPos":{"h":7,"w":18,"y":7},"id":3,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum
      without(instance, node) (topk(1, (kubelet_volume_stats_inodes_used{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})))","legendFormat":"Used
      inodes"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"(\n  sum
      without(instance, node) (topk(1, (kubelet_volume_stats_inodes{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})))\n  -\n  sum
      without(instance, node) (topk(1, (kubelet_volume_stats_inodes_used{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})))\n)\n","legendFormat":"Free
      inodes"}],"title":"Volume inodes Usage","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"color":{"mode":"thresholds"},"max":100,"min":0,"thresholds":{"mode":"absolute","steps":[{"color":"green","value":0},{"color":"orange","value":80},{"color":"red","value":90}]},"unit":"percent"}},"gridPos":{"h":7,"w":6,"x":18,"y":7},"id":4,"interval":"1m","pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"max
      without(instance,node) (\ntopk(1, kubelet_volume_stats_inodes_used{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})\n/\ntopk(1,
      kubelet_volume_stats_inodes{cluster=\"$cluster\", job=\"kubelet\", metrics_path=\"/metrics\",
      namespace=\"$namespace\", persistentvolumeclaim=\"$volume\"})\n* 100)\n","instant":true}],"title":"Volume
      inodes Usage","type":"gauge"}],"refresh":"10s","schemaVersion":39,"tags":["kubernetes-mixin"],"templating":{"list":[{"current":{"selected":true,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","regex":"","type":"datasource"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"label":"cluster","name":"cluster","query":"label_values(kubelet_volume_stats_capacity_bytes{job=\"kubelet\",
      metrics_path=\"/metrics\"}, cluster)","refresh":2,"sort":1,"type":"query","allValue":".*"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"label":"Namespace","name":"namespace","query":"label_values(kubelet_volume_stats_capacity_bytes{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\"}, namespace)","refresh":2,"sort":1,"type":"query"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"label":"PersistentVolumeClaim","name":"volume","query":"label_values(kubelet_volume_stats_capacity_bytes{cluster=\"$cluster\",
      job=\"kubelet\", metrics_path=\"/metrics\", namespace=\"$namespace\"}, persistentvolumeclaim)","refresh":2,"sort":1,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Kubernetes / Persistent Volumes","uid":"919b92a8e8041bd567af9edab12c840c"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-persistentvolumesusage
    namespace: monitoring
    resourceVersion: "202569"
    uid: a032313d-974d-4a5d-98df-4ab92c40a35b
- apiVersion: v1
  data:
    pod-total.json: '{"editable":true,"links":[{"asDropdown":true,"includeVars":true,"keepTime":true,"tags":["kubernetes-mixin"],"targetBlank":false,"title":"Kubernetes","type":"dashboards"}],"panels":[{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"displayName":"$pod","max":10000000000,"min":0,"thresholds":{"steps":[{"color":"dark-green","index":0,"value":null},{"color":"dark-yellow","index":1,"value":5000000000},{"color":"dark-red","index":2,"value":7000000000}]},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":0,"y":0},"id":1,"interval":"1m","pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum((8
      * rate(container_network_receive_bytes_total{cluster=\"$cluster\",namespace=~\"$namespace\",
      pod=~\"$pod\"}[$__rate_interval])))","legendFormat":"__auto"}],"title":"Current
      Rate of Bits Received","type":"gauge"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"displayName":"$pod","max":10000000000,"min":0,"thresholds":{"steps":[{"color":"dark-green","index":0,"value":null},{"color":"dark-yellow","index":1,"value":5000000000},{"color":"dark-red","index":2,"value":7000000000}]},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":12,"y":0},"id":2,"interval":"1m","pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum((8
      * rate(container_network_transmit_bytes_total{cluster=\"$cluster\",namespace=~\"$namespace\",
      pod=~\"$pod\"}[$__rate_interval])))","legendFormat":"__auto"}],"title":"Current
      Rate of Bits Transmitted","type":"gauge"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":0,"y":9},"id":3,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum((8
      * rate(container_network_receive_bytes_total{cluster=\"$cluster\",namespace=~\"$namespace\",
      pod=~\"$pod\"}[$__rate_interval]))) by (pod)","legendFormat":"__auto"}],"title":"Receive
      Bandwidth","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":12,"y":9},"id":4,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum((8
      * rate(container_network_transmit_bytes_total{cluster=\"$cluster\",namespace=~\"$namespace\",
      pod=~\"$pod\"}[$__rate_interval]))) by (pod)","legendFormat":"__auto"}],"title":"Transmit
      Bandwidth","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":0,"y":18},"id":5,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(container_network_receive_packets_total{cluster=\"$cluster\",namespace=~\"$namespace\",
      pod=~\"$pod\"}[$__rate_interval])) by (pod)","legendFormat":"__auto"}],"title":"Rate
      of Received Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":12,"y":18},"id":6,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(container_network_transmit_packets_total{cluster=\"$cluster\",namespace=~\"$namespace\",
      pod=~\"$pod\"}[$__rate_interval])) by (pod)","legendFormat":"__auto"}],"title":"Rate
      of Transmitted Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":0,"y":27},"id":7,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(container_network_receive_packets_dropped_total{cluster=\"$cluster\",namespace=~\"$namespace\",
      pod=~\"$pod\"}[$__rate_interval])) by (pod)","legendFormat":"__auto"}],"title":"Rate
      of Received Packets Dropped","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"showPoints":"never"},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":12,"y":27},"id":8,"interval":"1m","options":{"legend":{"asTable":true,"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(container_network_transmit_packets_dropped_total{cluster=\"$cluster\",namespace=~\"$namespace\",
      pod=~\"$pod\"}[$__rate_interval])) by (pod)","legendFormat":"__auto"}],"title":"Rate
      of Transmitted Packets Dropped","type":"timeseries"}],"refresh":"10s","schemaVersion":39,"tags":["kubernetes-mixin"],"templating":{"list":[{"current":{"selected":true,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","regex":"","type":"datasource"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"label":"cluster","name":"cluster","query":"label_values(up{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\"}, cluster)","refresh":2,"sort":1,"type":"query","allValue":".*"},{"allValue":".+","current":{"selected":false,"text":"kube-system","value":"kube-system"},"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"namespace","name":"namespace","query":"label_values(container_network_receive_packets_total{cluster=\"$cluster\"},
      namespace)","refresh":2,"sort":1,"type":"query"},{"current":{"selected":false,"text":"kube-system","value":"kube-system"},"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"label":"pod","name":"pod","query":"label_values(container_network_receive_packets_total{cluster=\"$cluster\",namespace=~\"$namespace\"},
      pod)","refresh":2,"sort":1,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Kubernetes / Networking / Pod","uid":"7a18067ce943a40ae25454675c19ff5c"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-pod-total
    namespace: monitoring
    resourceVersion: "202570"
    uid: d9debb13-7738-4b08-8dca-c1b72e7ad6bd
- apiVersion: v1
  data:
    prometheus.json: '{"panels":[{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":0},"id":1,"panels":[],"title":"Prometheus
      Stats","type":"row"},{"datasource":{"type":"prometheus","uid":"$datasource"},"fieldConfig":{"defaults":{"decimals":2,"displayName":"","unit":"short"},"overrides":[{"matcher":{"id":"byName","options":"Time"},"properties":[{"id":"displayName","value":"Time"},{"id":"custom.align","value":null},{"id":"custom.hidden","value":"true"}]},{"matcher":{"id":"byName","options":"cluster"},"properties":[{"id":"custom.align","value":null},{"id":"unit","value":"short"},{"id":"decimals","value":2},{"id":"displayName","value":"Cluster"}]},{"matcher":{"id":"byName","options":"job"},"properties":[{"id":"custom.align","value":null},{"id":"unit","value":"short"},{"id":"decimals","value":2},{"id":"displayName","value":"Job"}]},{"matcher":{"id":"byName","options":"instance"},"properties":[{"id":"displayName","value":"Instance"},{"id":"custom.align","value":null},{"id":"unit","value":"short"},{"id":"decimals","value":2}]},{"matcher":{"id":"byName","options":"version"},"properties":[{"id":"displayName","value":"Version"},{"id":"custom.align","value":null},{"id":"unit","value":"short"},{"id":"decimals","value":2}]},{"matcher":{"id":"byName","options":"Value
      #A"},"properties":[{"id":"displayName","value":"Count"},{"id":"custom.align","value":null},{"id":"unit","value":"short"},{"id":"decimals","value":2},{"id":"custom.hidden","value":"true"}]},{"matcher":{"id":"byName","options":"Value
      #B"},"properties":[{"id":"displayName","value":"Uptime"},{"id":"custom.align","value":null},{"id":"unit","value":"s"}]}]},"gridPos":{"h":7,"w":24,"x":0,"y":1},"id":2,"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"count
      by (cluster, job, instance, version) (prometheus_build_info{cluster=~\"$cluster\",
      job=~\"$job\", instance=~\"$instance\"})","format":"table","instant":true,"legendFormat":""},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"max
      by (cluster, job, instance) (time() - process_start_time_seconds{cluster=~\"$cluster\",
      job=~\"$job\", instance=~\"$instance\"})","format":"table","instant":true,"legendFormat":""}],"title":"Prometheus
      Stats","type":"table"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":8},"id":3,"panels":[],"title":"Discovery","type":"row"},{"datasource":{"type":"prometheus","uid":"$datasource"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never"},"min":0,"unit":"ms"}},"gridPos":{"h":7,"w":12,"x":0,"y":9},"id":4,"options":{"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"sum(rate(prometheus_target_sync_length_seconds_sum{cluster=~\"$cluster\",job=~\"$job\",instance=~\"$instance\"}[5m]))
      by (cluster, job, scrape_job, instance) * 1e3","format":"time_series","legendFormat":"{{cluster}}:{{job}}:{{instance}}:{{scrape_job}}"}],"title":"Target
      Sync","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"$datasource"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"lineWidth":0,"showPoints":"never","stacking":{"mode":"normal"}},"min":0,"unit":"short"}},"gridPos":{"h":7,"w":12,"x":12,"y":9},"id":5,"options":{"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"sum
      by (cluster, job, instance) (prometheus_sd_discovered_targets{cluster=~\"$cluster\",
      job=~\"$job\",instance=~\"$instance\"})","format":"time_series","legendFormat":"{{cluster}}:{{job}}:{{instance}}"}],"title":"Targets","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":16},"id":6,"panels":[],"title":"Retrieval","type":"row"},{"datasource":{"type":"prometheus","uid":"$datasource"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never"},"min":0,"unit":"ms"}},"gridPos":{"h":7,"w":8,"x":0,"y":17},"id":7,"options":{"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(prometheus_target_interval_length_seconds_sum{cluster=~\"$cluster\",
      job=~\"$job\",instance=~\"$instance\"}[5m]) / rate(prometheus_target_interval_length_seconds_count{cluster=~\"$cluster\",
      job=~\"$job\",instance=~\"$instance\"}[5m]) * 1e3","format":"time_series","legendFormat":"{{cluster}}:{{job}}:{{instance}}
      {{interval}} configured"}],"title":"Average Scrape Interval Duration","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"$datasource"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"lineWidth":0,"showPoints":"never","stacking":{"mode":"normal"}},"min":0,"unit":"short"}},"gridPos":{"h":7,"w":8,"x":8,"y":17},"id":8,"options":{"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"sum
      by (cluster, job, instance) (rate(prometheus_target_scrapes_exceeded_body_size_limit_total{cluster=~\"$cluster\",job=~\"$job\",instance=~\"$instance\"}[1m]))","format":"time_series","legendFormat":"exceeded
      body size limit: {{cluster}} {{job}} {{instance}}"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"sum
      by (cluster, job, instance) (rate(prometheus_target_scrapes_exceeded_sample_limit_total{cluster=~\"$cluster\",job=~\"$job\",instance=~\"$instance\"}[1m]))","format":"time_series","legendFormat":"exceeded
      sample limit: {{cluster}} {{job}} {{instance}}"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"sum
      by (cluster, job, instance) (rate(prometheus_target_scrapes_sample_duplicate_timestamp_total{cluster=~\"$cluster\",job=~\"$job\",instance=~\"$instance\"}[1m]))","format":"time_series","legendFormat":"duplicate
      timestamp: {{cluster}} {{job}} {{instance}}"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"sum
      by (cluster, job, instance) (rate(prometheus_target_scrapes_sample_out_of_bounds_total{cluster=~\"$cluster\",job=~\"$job\",instance=~\"$instance\"}[1m]))","format":"time_series","legendFormat":"out
      of bounds: {{cluster}} {{job}} {{instance}}"},{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"sum
      by (cluster, job, instance) (rate(prometheus_target_scrapes_sample_out_of_order_total{cluster=~\"$cluster\",job=~\"$job\",instance=~\"$instance\"}[1m]))","format":"time_series","legendFormat":"out
      of order: {{cluster}} {{job}} {{instance}}"}],"title":"Scrape failures","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"$datasource"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"lineWidth":0,"showPoints":"never","stacking":{"mode":"normal"}},"min":0,"unit":"short"}},"gridPos":{"h":7,"w":8,"x":16,"y":17},"id":9,"options":{"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(prometheus_tsdb_head_samples_appended_total{cluster=~\"$cluster\",
      job=~\"$job\",instance=~\"$instance\"}[5m])","format":"time_series","legendFormat":"{{cluster}}
      {{job}} {{instance}}"}],"title":"Appended Samples","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":24},"id":10,"panels":[],"title":"Storage","type":"row"},{"datasource":{"type":"prometheus","uid":"$datasource"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"lineWidth":0,"showPoints":"never","stacking":{"mode":"normal"}},"min":0,"unit":"short"}},"gridPos":{"h":7,"w":12,"x":0,"y":25},"id":11,"options":{"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"prometheus_tsdb_head_series{cluster=~\"$cluster\",job=~\"$job\",instance=~\"$instance\"}","format":"time_series","legendFormat":"{{cluster}}
      {{job}} {{instance}} head series"}],"title":"Head Series","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"$datasource"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"lineWidth":0,"showPoints":"never","stacking":{"mode":"normal"}},"min":0,"unit":"short"}},"gridPos":{"h":7,"w":12,"x":12,"y":25},"id":12,"options":{"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"prometheus_tsdb_head_chunks{cluster=~\"$cluster\",job=~\"$job\",instance=~\"$instance\"}","format":"time_series","legendFormat":"{{cluster}}
      {{job}} {{instance}} head chunks"}],"title":"Head Chunks","type":"timeseries"},{"collapsed":false,"gridPos":{"h":1,"w":24,"x":0,"y":32},"id":13,"panels":[],"title":"Query","type":"row"},{"datasource":{"type":"prometheus","uid":"$datasource"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"lineWidth":0,"showPoints":"never","stacking":{"mode":"normal"}},"min":0,"unit":"short"}},"gridPos":{"h":7,"w":12,"x":0,"y":33},"id":14,"options":{"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"rate(prometheus_engine_query_duration_seconds_count{cluster=~\"$cluster\",job=~\"$job\",instance=~\"$instance\",slice=\"inner_eval\"}[5m])","format":"time_series","legendFormat":"{{cluster}}
      {{job}} {{instance}}"}],"title":"Query Rate","type":"timeseries"},{"datasource":{"type":"prometheus","uid":"$datasource"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":100,"lineWidth":0,"showPoints":"never","stacking":{"mode":"normal"}},"min":0,"unit":"ms"}},"gridPos":{"h":7,"w":12,"x":12,"y":33},"id":15,"options":{"tooltip":{"mode":"multi","sort":"desc"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"$datasource"},"expr":"max
      by (slice) (prometheus_engine_query_duration_seconds{quantile=\"0.9\",cluster=~\"$cluster\",
      job=~\"$job\",instance=~\"$instance\"}) * 1e3","format":"time_series","legendFormat":"{{slice}}"}],"title":"Stage
      Duration","type":"timeseries"}],"schemaVersion":39,"tags":["prometheus-mixin"],"templating":{"list":[{"current":{"selected":false,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","type":"datasource"},{"allValue":".*","current":{"selected":false,"text":["$__all"],"value":["$__all"]},"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"includeAll":true,"label":"cluster","multi":true,"name":"cluster","query":"label_values(prometheus_build_info{},
      cluster)","refresh":2,"sort":2,"type":"query"},{"allValue":".+","datasource":{"type":"prometheus","uid":"${datasource}"},"includeAll":true,"label":"job","multi":true,"name":"job","query":"label_values(prometheus_build_info{cluster=~\"$cluster\"},
      job)","refresh":2,"sort":2,"type":"query"},{"allValue":".+","datasource":{"type":"prometheus","uid":"${datasource}"},"includeAll":true,"label":"instance","multi":true,"name":"instance","query":"label_values(prometheus_build_info{cluster=~\"$cluster\",
      job=~\"$job\"}, instance)","refresh":2,"sort":2,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timepicker":{"refresh_intervals":["60s"]},"timezone":
      "utc","title":"Prometheus / Overview","uid":"9fa0d141-d019-4ad7-8bc5-42196ee308bd"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-prometheus
    namespace: monitoring
    resourceVersion: "202571"
    uid: 0a3a894c-c09b-4e9d-b7af-0841b64542ef
- apiVersion: v1
  data:
    proxy.json: '{"editable":true,"links":[{"asDropdown":true,"includeVars":true,"keepTime":true,"tags":["kubernetes-mixin"],"targetBlank":false,"title":"Kubernetes","type":"dashboards"}],"panels":[{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"unit":"none"}},"gridPos":{"h":7,"w":4,"x":0,"y":0},"id":1,"interval":"1m","options":{"colorMode":"none"},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(up{cluster=\"$cluster\",
      job=\"kube-proxy\"})","instant":true}],"title":"Up","type":"stat"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":10,"x":4,"y":0},"id":2,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(kubeproxy_sync_proxy_rules_duration_seconds_count{cluster=\"$cluster\",
      job=\"kube-proxy\", instance=~\"$instance\"}[$__rate_interval]))","legendFormat":"rate"}],"title":"Rules
      Sync Rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":10,"x":14,"y":0},"id":3,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,rate(kubeproxy_sync_proxy_rules_duration_seconds_bucket{cluster=\"$cluster\",
      job=\"kube-proxy\", instance=~\"$instance\"}[$__rate_interval]))","legendFormat":"{{instance}}"}],"title":"Rules
      Sync Latency 99th Quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":12,"x":0,"y":7},"id":4,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(kubeproxy_network_programming_duration_seconds_count{cluster=\"$cluster\",
      job=\"kube-proxy\", instance=~\"$instance\"}[$__rate_interval]))","legendFormat":"rate"}],"title":"Network
      Programming Rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":12,"x":12,"y":7},"id":5,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(kubeproxy_network_programming_duration_seconds_bucket{cluster=\"$cluster\",
      job=\"kube-proxy\", instance=~\"$instance\"}[$__rate_interval])) by (instance,
      le))","legendFormat":"{{instance}}"}],"title":"Network Programming Latency 99th
      Quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":8,"x":0,"y":14},"id":6,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",job=\"kube-proxy\",
      instance=~\"$instance\",code=~\"2..\"}[$__rate_interval]))","legendFormat":"2xx"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",job=\"kube-proxy\",
      instance=~\"$instance\",code=~\"3..\"}[$__rate_interval]))","legendFormat":"3xx"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",job=\"kube-proxy\",
      instance=~\"$instance\",code=~\"4..\"}[$__rate_interval]))","legendFormat":"4xx"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",job=\"kube-proxy\",
      instance=~\"$instance\",code=~\"5..\"}[$__rate_interval]))","legendFormat":"5xx"}],"title":"Kube
      API Request Rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":16,"x":8,"y":14},"id":7,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(rest_client_request_duration_seconds_bucket{cluster=\"$cluster\", job=\"kube-proxy\",instance=~\"$instance\",verb=\"POST\"}[$__rate_interval]))
      by (verb, le))","legendFormat":"{{verb}}"}],"title":"Post Request Latency 99th
      Quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":24,"x":0,"y":21},"id":8,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(rest_client_request_duration_seconds_bucket{cluster=\"$cluster\", job=\"kube-proxy\",
      instance=~\"$instance\", verb=\"GET\"}[$__rate_interval])) by (verb, le))","legendFormat":"{{verb}}"}],"title":"Get
      Request Latency 99th Quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bytes"}},"gridPos":{"h":7,"w":8,"x":0,"y":28},"id":9,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"process_resident_memory_bytes{cluster=\"$cluster\",
      job=\"kube-proxy\",instance=~\"$instance\"}","legendFormat":"{{instance}}"}],"title":"Memory","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"short"}},"gridPos":{"h":7,"w":8,"x":8,"y":28},"id":10,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"rate(process_cpu_seconds_total{cluster=\"$cluster\",
      job=\"kube-proxy\",instance=~\"$instance\"}[$__rate_interval])","legendFormat":"{{instance}}"}],"title":"CPU
      usage","type":"timeseries"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"short"}},"gridPos":{"h":7,"w":8,"x":16,"y":28},"id":11,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"go_goroutines{cluster=\"$cluster\",
      job=\"kube-proxy\",instance=~\"$instance\"}","legendFormat":"{{instance}}"}],"title":"Goroutines","type":"timeseries"}],"refresh":"10s","schemaVersion":39,"tags":["kubernetes-mixin"],"templating":{"list":[{"current":{"selected":true,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","regex":"","type":"datasource"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"label":"cluster","name":"cluster","query":"label_values(up{job=\"kube-proxy\"},
      cluster)","refresh":2,"sort":1,"type":"query","allValue":".*"},{"allValue":".+","datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"instance","name":"instance","query":"label_values(up{job=\"kube-proxy\",
      cluster=\"$cluster\", job=\"kube-proxy\"}, instance)","refresh":2,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Kubernetes / Proxy","uid":"632e265de029684c40b21cb76bca4f94"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-proxy
    namespace: monitoring
    resourceVersion: "202568"
    uid: e44641c5-ea5a-4069-a853-3060824f8e63
- apiVersion: v1
  data:
    scheduler.json: '{"editable":true,"links":[{"asDropdown":true,"includeVars":true,"keepTime":true,"tags":["kubernetes-mixin"],"targetBlank":false,"title":"Kubernetes","type":"dashboards"}],"panels":[{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"unit":"none"}},"gridPos":{"h":7,"w":4,"x":0,"y":0},"id":1,"interval":"1m","options":{"colorMode":"none"},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(up{cluster=\"$cluster\",
      job=\"kube-scheduler\"})","instant":true}],"title":"Up","type":"stat"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":10,"x":4,"y":0},"id":2,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(scheduler_scheduling_attempt_duration_seconds_count{cluster=\"$cluster\",
      job=\"kube-scheduler\", instance=~\"$instance\"}[$__rate_interval])) by (cluster,
      instance)","legendFormat":"{{cluster}} {{instance}} e2e"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(scheduler_pod_scheduling_sli_duration_seconds_count{cluster=\"$cluster\",
      job=\"kube-scheduler\", instance=~\"$instance\"}[$__rate_interval])) by (cluster,
      instance)","legendFormat":"{{cluster}} {{instance}} binding"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(scheduler_scheduling_algorithm_duration_seconds_count{cluster=\"$cluster\",
      job=\"kube-scheduler\", instance=~\"$instance\"}[$__rate_interval])) by (cluster,
      instance)","legendFormat":"{{cluster}} {{instance}} scheduling algorithm"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(scheduler_volume_scheduling_duration_seconds_count{cluster=\"$cluster\",
      job=\"kube-scheduler\", instance=~\"$instance\"}[$__rate_interval])) by (cluster,
      instance)","legendFormat":"{{cluster}} {{instance}} volume"}],"title":"Scheduling
      Rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":10,"x":14,"y":0},"id":3,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(scheduler_scheduling_attempt_duration_seconds_bucket{cluster=\"$cluster\",
      job=\"kube-scheduler\",instance=~\"$instance\"}[$__rate_interval])) by (cluster,
      instance, le))","legendFormat":"{{cluster}} {{instance}} e2e"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(scheduler_pod_scheduling_sli_duration_seconds_bucket{cluster=\"$cluster\",
      job=\"kube-scheduler\",instance=~\"$instance\"}[$__rate_interval])) by (cluster,
      instance, le))","legendFormat":"{{cluster}} {{instance}} binding"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(scheduler_scheduling_algorithm_duration_seconds_bucket{cluster=\"$cluster\",
      job=\"kube-scheduler\",instance=~\"$instance\"}[$__rate_interval])) by (cluster,
      instance, le))","legendFormat":"{{cluster}} {{instance}} scheduling algorithm"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(scheduler_volume_scheduling_duration_seconds_bucket{cluster=\"$cluster\",
      job=\"kube-scheduler\",instance=~\"$instance\"}[$__rate_interval])) by (cluster,
      instance, le))","legendFormat":"{{cluster}} {{instance}} volume"}],"title":"Scheduling
      latency 99th Quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":8,"x":0,"y":7},"id":4,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",
      job=\"kube-scheduler\", instance=~\"$instance\",code=~\"2..\"}[$__rate_interval]))","legendFormat":"2xx"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",
      job=\"kube-scheduler\", instance=~\"$instance\",code=~\"3..\"}[$__rate_interval]))","legendFormat":"3xx"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",
      job=\"kube-scheduler\", instance=~\"$instance\",code=~\"4..\"}[$__rate_interval]))","legendFormat":"4xx"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sum(rate(rest_client_requests_total{cluster=\"$cluster\",
      job=\"kube-scheduler\", instance=~\"$instance\",code=~\"5..\"}[$__rate_interval]))","legendFormat":"5xx"}],"title":"Kube
      API Request Rate","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"ops"}},"gridPos":{"h":7,"w":16,"x":8,"y":7},"id":5,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(rest_client_request_duration_seconds_bucket{cluster=\"$cluster\", job=\"kube-scheduler\",
      instance=~\"$instance\", verb=\"POST\"}[$__rate_interval])) by (verb, le))","legendFormat":"{{verb}}"}],"title":"Post
      Request Latency 99th Quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"s"}},"gridPos":{"h":7,"w":24,"x":0,"y":14},"id":6,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"histogram_quantile(0.99,
      sum(rate(rest_client_request_duration_seconds_bucket{cluster=\"$cluster\", job=\"kube-scheduler\",
      instance=~\"$instance\", verb=\"GET\"}[$__rate_interval])) by (verb, le))","legendFormat":"{{verb}}"}],"title":"Get
      Request Latency 99th Quantile","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bytes"}},"gridPos":{"h":7,"w":8,"x":0,"y":21},"id":7,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"process_resident_memory_bytes{cluster=\"$cluster\",
      job=\"kube-scheduler\", instance=~\"$instance\"}","legendFormat":"{{instance}}"}],"title":"Memory","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"short"}},"gridPos":{"h":7,"w":8,"x":8,"y":21},"id":8,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"rate(process_cpu_seconds_total{cluster=\"$cluster\",
      job=\"kube-scheduler\", instance=~\"$instance\"}[$__rate_interval])","legendFormat":"{{instance}}"}],"title":"CPU
      usage","type":"timeseries"},{"datasource":{"type":"datasource","uid":"-- Mixed
      --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"short"}},"gridPos":{"h":7,"w":8,"x":16,"y":21},"id":9,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"go_goroutines{cluster=\"$cluster\",
      job=\"kube-scheduler\",instance=~\"$instance\"}","legendFormat":"{{instance}}"}],"title":"Goroutines","type":"timeseries"}],"refresh":"10s","schemaVersion":39,"tags":["kubernetes-mixin"],"templating":{"list":[{"current":{"selected":true,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","regex":"","type":"datasource"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"label":"cluster","name":"cluster","query":"label_values(up{job=\"kube-scheduler\"},
      cluster)","refresh":2,"sort":1,"type":"query","allValue":".*"},{"allValue":".+","datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"instance","name":"instance","query":"label_values(up{job=\"kube-scheduler\",
      cluster=\"$cluster\"}, instance)","refresh":2,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Kubernetes / Scheduler","uid":"2e6b6a3b4bddf1427b3a55aa1311c656"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-scheduler
    namespace: monitoring
    resourceVersion: "202553"
    uid: 437c7a1f-905f-4ecc-b8f5-876c10258d69
- apiVersion: v1
  data:
    workload-total.json: '{"editable":true,"links":[{"asDropdown":true,"includeVars":true,"keepTime":true,"tags":["kubernetes-mixin"],"targetBlank":false,"title":"Kubernetes","type":"dashboards"}],"panels":[{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"color":{"fixedColor":"green","mode":"fixed"},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":0,"y":0},"id":1,"interval":"1m","options":{"displayMode":"basic","showUnfilled":false},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum((8
      * rate(container_network_receive_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=~\"$namespace\",
      workload=~\"$workload\", workload_type=~\"$type\"}) by (pod))\n","legendFormat":"__auto"}],"title":"Current
      Rate of Bits Received","type":"bargauge"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"color":{"fixedColor":"green","mode":"fixed"},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":12,"y":0},"id":2,"interval":"1m","options":{"displayMode":"basic","showUnfilled":false},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum((8
      * rate(container_network_transmit_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=~\"$namespace\",
      workload=~\"$workload\", workload_type=~\"$type\"}) by (pod))\n","legendFormat":"__auto"}],"title":"Current
      Rate of Bits Transmitted","type":"bargauge"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"color":{"fixedColor":"green","mode":"fixed"},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":0,"y":9},"id":3,"interval":"1m","options":{"displayMode":"basic","showUnfilled":false},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(avg((8
      * rate(container_network_receive_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=~\"$namespace\",
      workload=~\"$workload\", workload_type=~\"$type\"}) by (pod))\n","legendFormat":"__auto"}],"title":"Average
      Rate of Bits Received","type":"bargauge"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"color":{"fixedColor":"green","mode":"fixed"},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":12,"y":9},"id":4,"interval":"1m","options":{"displayMode":"basic","showUnfilled":false},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(avg((8
      * rate(container_network_transmit_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=~\"$namespace\",
      workload=~\"$workload\", workload_type=~\"$type\"}) by (pod))\n","legendFormat":"__auto"}],"title":"Average
      Rate of Bits Transmitted","type":"bargauge"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":0,"y":18},"id":5,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum((8
      * rate(container_network_receive_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=~\"$namespace\",
      workload=~\"$workload\", workload_type=~\"$type\"}) by (pod))\n","legendFormat":"__auto"}],"title":"Receive
      Bandwidth","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"bps"}},"gridPos":{"h":9,"w":12,"x":12,"y":18},"id":6,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum((8
      * rate(container_network_transmit_bytes_total{job=\"kubelet\", metrics_path=\"/metrics/cadvisor\",
      cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval]))\n* on (cluster,
      namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=~\"$namespace\",
      workload=~\"$workload\", workload_type=~\"$type\"}) by (pod))\n","legendFormat":"__auto"}],"title":"Transmit
      Bandwidth","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":0,"y":27},"id":7,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum(rate(container_network_receive_packets_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=~\"$namespace\",
      workload=~\"$workload\", workload_type=~\"$type\"}) by (pod))\n","legendFormat":"__auto"}],"title":"Rate
      of Received Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":12,"y":27},"id":8,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum(rate(container_network_transmit_packets_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=~\"$namespace\",
      workload=~\"$workload\", workload_type=~\"$type\"}) by (pod))\n","legendFormat":"__auto"}],"title":"Rate
      of Transmitted Packets","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":0,"y":36},"id":9,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum(rate(container_network_receive_packets_dropped_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=~\"$namespace\",
      workload=~\"$workload\", workload_type=~\"$type\"}) by (pod))\n","legendFormat":"__auto"}],"title":"Rate
      of Received Packets Dropped","type":"timeseries"},{"datasource":{"type":"datasource","uid":"--
      Mixed --"},"fieldConfig":{"defaults":{"custom":{"fillOpacity":10,"showPoints":"never","spanNulls":true},"unit":"pps"}},"gridPos":{"h":9,"w":12,"x":12,"y":36},"id":10,"interval":"1m","options":{"legend":{"asTable":true,"calcs":["lastNotNull"],"displayMode":"table","placement":"right","showLegend":true},"tooltip":{"mode":"single"}},"pluginVersion":"v11.4.0","targets":[{"datasource":{"type":"prometheus","uid":"${datasource}"},"expr":"sort_desc(sum(rate(container_network_transmit_packets_dropped_total{job=\"kubelet\",
      metrics_path=\"/metrics/cadvisor\", cluster=\"$cluster\",namespace=~\"$namespace\"}[$__rate_interval])\n*
      on (cluster, namespace, pod)\ngroup_left(workload,workload_type) namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",namespace=~\"$namespace\",
      workload=~\"$workload\", workload_type=~\"$type\"}) by (pod))\n","legendFormat":"__auto"}],"title":"Rate
      of Transmitted Packets Dropped","type":"timeseries"}],"refresh":"10s","schemaVersion":39,"tags":["kubernetes-mixin"],"templating":{"list":[{"current":{"selected":true,"text":"default","value":"default"},"hide":0,"label":"Data
      source","name":"datasource","query":"prometheus","regex":"","type":"datasource"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":2,"label":"cluster","name":"cluster","query":"label_values(kube_pod_info{job=\"kube-state-metrics\"},
      cluster)","refresh":2,"sort":1,"type":"query","allValue":".*"},{"allValue":".+","current":{"selected":false,"text":"kube-system","value":"kube-system"},"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"namespace","name":"namespace","query":"label_values(container_network_receive_packets_total{cluster=\"$cluster\"},
      namespace)","refresh":2,"sort":1,"type":"query"},{"datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"label":"workload","name":"workload","query":"label_values(namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=~\"$namespace\", workload=~\".+\"}, workload)","refresh":2,"sort":1,"type":"query"},{"allValue":".+","datasource":{"type":"prometheus","uid":"${datasource}"},"hide":0,"includeAll":true,"label":"workload_type","name":"type","query":"label_values(namespace_workload_pod:kube_pod_owner:relabel{cluster=\"$cluster\",
      namespace=~\"$namespace\", workload=~\"$workload\"}, workload_type)","refresh":2,"sort":1,"type":"query"}]},"time":{"from":"now-1h","to":"now"},"timezone":
      "utc","title":"Kubernetes / Networking / Workload","uid":"728bf77cc1166d2f3133bf25846876cc"}'
  kind: ConfigMap
  metadata:
    annotations:
      meta.helm.sh/release-name: prometheus-stack
      meta.helm.sh/release-namespace: monitoring
    creationTimestamp: "2026-05-18T16:23:12Z"
    labels:
      app: kube-prometheus-stack-grafana
      app.kubernetes.io/instance: prometheus-stack
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/part-of: kube-prometheus-stack
      app.kubernetes.io/version: 85.1.3
      chart: kube-prometheus-stack-85.1.3
      grafana_dashboard: "1"
      heritage: Helm
      release: prometheus-stack
    name: prometheus-stack-kube-prom-workload-total
    namespace: monitoring
    resourceVersion: "202548"
    uid: 4fa10eb3-e762-4e57-bc70-128cd444b4d9
- apiVersion: v1
  data:
    snmp.yml: |
      auths:
        ilwij_auth:
          community: ilwij-snmp
          version: 2
      modules:
        if_mib:
          walk:
            - 1.3.6.1.2.1.2.2
          metrics:
            - name: ifDescr
              oid: 1.3.6.1.2.1.2.2.1.2
              type: DisplayString
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifOperStatus
              oid: 1.3.6.1.2.1.2.2.1.8
              type: gauge
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifInOctets
              oid: 1.3.6.1.2.1.2.2.1.10
              type: counter
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifOutOctets
              oid: 1.3.6.1.2.1.2.2.1.16
              type: counter
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifInErrors
              oid: 1.3.6.1.2.1.2.2.1.14
              type: counter
              indexes:
              - labelname: ifIndex
                type: gauge
            - name: ifOutErrors
              oid: 1.3.6.1.2.1.2.2.1.20
              type: counter
              indexes:
              - labelname: ifIndex
                type: gauge
  kind: ConfigMap
  metadata:
    annotations:
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"v1","data":{"snmp.yml":"auths:\n  ilwij_auth:\n    community: ilwij-snmp\n    version: 2\nmodules:\n  if_mib:\n    walk:\n      - 1.3.6.1.2.1.2.2\n    metrics:\n      - name: ifDescr\n        oid: 1.3.6.1.2.1.2.2.1.2\n        type: DisplayString\n        indexes:\n        - labelname: ifIndex\n          type: gauge\n      - name: ifOperStatus\n        oid: 1.3.6.1.2.1.2.2.1.8\n        type: gauge\n        indexes:\n        - labelname: ifIndex\n          type: gauge\n      - name: ifInOctets\n        oid: 1.3.6.1.2.1.2.2.1.10\n        type: counter\n        indexes:\n        - labelname: ifIndex\n          type: gauge\n      - name: ifOutOctets\n        oid: 1.3.6.1.2.1.2.2.1.16\n        type: counter\n        indexes:\n        - labelname: ifIndex\n          type: gauge\n      - name: ifInErrors\n        oid: 1.3.6.1.2.1.2.2.1.14\n        type: counter\n        indexes:\n        - labelname: ifIndex\n          type: gauge\n      - name: ifOutErrors\n        oid: 1.3.6.1.2.1.2.2.1.20\n        type: counter\n        indexes:\n        - labelname: ifIndex\n          type: gauge\n"},"kind":"ConfigMap","metadata":{"annotations":{},"name":"snmp-exporter-config","namespace":"monitoring"}}
    creationTimestamp: "2026-05-19T19:10:31Z"
    name: snmp-exporter-config
    namespace: monitoring
    resourceVersion: "259814"
    uid: a192efe6-2863-4b9a-b2b1-902e8012a88c
kind: List
metadata:
  resourceVersion: ""
lab@k3s-master:~$


### 5.12 Prometheus + Grafana helm values
alertmanager:
  service:
    type: LoadBalancer
grafana:
  service:
    type: LoadBalancer
prometheus:
  service:
    type: LoadBalancer

### 5.13 K8s Dashboard
lab@k3s-master:~$ kubectl get all -n kubernetes-dashboard -o yaml
apiVersion: v1
items:
- apiVersion: v1
  kind: Pod
  metadata:
    creationTimestamp: "2026-05-18T16:36:05Z"
    generateName: dashboard-metrics-scraper-5ffb7d645f-
    generation: 1
    labels:
      k8s-app: dashboard-metrics-scraper
      pod-template-hash: 5ffb7d645f
    name: dashboard-metrics-scraper-5ffb7d645f-tkxnb
    namespace: kubernetes-dashboard
    ownerReferences:
    - apiVersion: apps/v1
      blockOwnerDeletion: true
      controller: true
      kind: ReplicaSet
      name: dashboard-metrics-scraper-5ffb7d645f
      uid: de015dd4-3b89-4d3c-8497-3b5021652993
    resourceVersion: "479640"
    uid: 914a943d-68df-4cab-8228-de08b1909809
  spec:
    containers:
    - image: kubernetesui/metrics-scraper:v1.0.8
      imagePullPolicy: IfNotPresent
      livenessProbe:
        failureThreshold: 3
        httpGet:
          path: /
          port: 8000
          scheme: HTTP
        initialDelaySeconds: 30
        periodSeconds: 10
        successThreshold: 1
        timeoutSeconds: 30
      name: dashboard-metrics-scraper
      ports:
      - containerPort: 8000
        protocol: TCP
      resources: {}
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        runAsGroup: 2001
        runAsUser: 1001
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
      - mountPath: /tmp
        name: tmp-volume
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-zg6b7
        readOnly: true
    dnsPolicy: ClusterFirst
    enableServiceLinks: true
    nodeName: k3s-worker-1
    nodeSelector:
      kubernetes.io/os: linux
    preemptionPolicy: PreemptLowerPriority
    priority: 0
    restartPolicy: Always
    schedulerName: default-scheduler
    securityContext:
      seccompProfile:
        type: RuntimeDefault
    serviceAccount: kubernetes-dashboard
    serviceAccountName: kubernetes-dashboard
    terminationGracePeriodSeconds: 30
    tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/master
    - effect: NoExecute
      key: node.kubernetes.io/not-ready
      operator: Exists
      tolerationSeconds: 300
    - effect: NoExecute
      key: node.kubernetes.io/unreachable
      operator: Exists
      tolerationSeconds: 300
    volumes:
    - emptyDir: {}
      name: tmp-volume
    - name: kube-api-access-zg6b7
      projected:
        defaultMode: 420
        sources:
        - serviceAccountToken:
            expirationSeconds: 3607
            path: token
        - configMap:
            items:
            - key: ca.crt
              path: ca.crt
            name: kube-root-ca.crt
        - downwardAPI:
            items:
            - fieldRef:
                apiVersion: v1
                fieldPath: metadata.namespace
              path: namespace
  status:
    conditions:
    - lastProbeTime: null
      lastTransitionTime: "2026-05-23T15:31:34Z"
      observedGeneration: 1
      status: "True"
      type: PodReadyToStartContainers
    - lastProbeTime: null
      lastTransitionTime: "2026-05-18T16:36:37Z"
      observedGeneration: 1
      status: "True"
      type: Initialized
    - lastProbeTime: null
      lastTransitionTime: "2026-05-23T15:31:34Z"
      observedGeneration: 1
      status: "True"
      type: Ready
    - lastProbeTime: null
      lastTransitionTime: "2026-05-23T15:31:34Z"
      observedGeneration: 1
      status: "True"
      type: ContainersReady
    - lastProbeTime: null
      lastTransitionTime: "2026-05-18T16:36:37Z"
      observedGeneration: 1
      status: "True"
      type: PodScheduled
    containerStatuses:
    - containerID: containerd://5972dbe74ab0de2299042c4ae49565a5a23a9af171003b29c8a68cce5b9ac3cb
      image: docker.io/kubernetesui/metrics-scraper:v1.0.8
      imageID: docker.io/kubernetesui/metrics-scraper@sha256:76049887f07a0476dc93efc2d3569b9529bf982b22d29f356092ce206e98765c
      lastState:
        terminated:
          containerID: containerd://c43d23b6ca625bbcd9bd02dc5d2d3de6e407c0a5de2494fc3a2d5beef0e30cc0
          exitCode: 255
          finishedAt: "2026-05-23T15:31:28Z"
          reason: Unknown
          startedAt: "2026-05-19T15:10:45Z"
      name: dashboard-metrics-scraper
      ready: true
      resources: {}
      restartCount: 2
      started: true
      state:
        running:
          startedAt: "2026-05-23T15:31:34Z"
      user:
        linux:
          gid: 2001
          supplementalGroups:
          - 2001
          uid: 1001
      volumeMounts:
      - mountPath: /tmp
        name: tmp-volume
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-zg6b7
        readOnly: true
        recursiveReadOnly: Disabled
    hostIP: 10.10.20.11
    hostIPs:
    - ip: 10.10.20.11
    observedGeneration: 1
    phase: Running
    podIP: 10.42.1.75
    podIPs:
    - ip: 10.42.1.75
    qosClass: BestEffort
    startTime: "2026-05-18T16:36:37Z"
- apiVersion: v1
  kind: Pod
  metadata:
    creationTimestamp: "2026-05-18T16:36:06Z"
    generateName: kubernetes-dashboard-6c7b75ffc-
    generation: 1
    labels:
      k8s-app: kubernetes-dashboard
      pod-template-hash: 6c7b75ffc
    name: kubernetes-dashboard-6c7b75ffc-dbj6j
    namespace: kubernetes-dashboard
    ownerReferences:
    - apiVersion: apps/v1
      blockOwnerDeletion: true
      controller: true
      kind: ReplicaSet
      name: kubernetes-dashboard-6c7b75ffc
      uid: f256c56d-602b-4afa-9e14-49b064e4386c
    resourceVersion: "481375"
    uid: e50c9657-fdf9-4f9d-9525-f0d1a02a2cc4
  spec:
    containers:
    - args:
      - --auto-generate-certificates
      - --namespace=kubernetes-dashboard
      image: kubernetesui/dashboard:v2.7.0
      imagePullPolicy: Always
      livenessProbe:
        failureThreshold: 3
        httpGet:
          path: /
          port: 8443
          scheme: HTTPS
        initialDelaySeconds: 30
        periodSeconds: 10
        successThreshold: 1
        timeoutSeconds: 30
      name: kubernetes-dashboard
      ports:
      - containerPort: 8443
        protocol: TCP
      resources: {}
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        runAsGroup: 2001
        runAsUser: 1001
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
      - mountPath: /certs
        name: kubernetes-dashboard-certs
      - mountPath: /tmp
        name: tmp-volume
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-9hts5
        readOnly: true
    dnsPolicy: ClusterFirst
    enableServiceLinks: true
    nodeName: k3s-worker-1
    nodeSelector:
      kubernetes.io/os: linux
    preemptionPolicy: PreemptLowerPriority
    priority: 0
    restartPolicy: Always
    schedulerName: default-scheduler
    securityContext:
      seccompProfile:
        type: RuntimeDefault
    serviceAccount: kubernetes-dashboard
    serviceAccountName: kubernetes-dashboard
    terminationGracePeriodSeconds: 30
    tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/master
    - effect: NoExecute
      key: node.kubernetes.io/not-ready
      operator: Exists
      tolerationSeconds: 300
    - effect: NoExecute
      key: node.kubernetes.io/unreachable
      operator: Exists
      tolerationSeconds: 300
    volumes:
    - name: kubernetes-dashboard-certs
      secret:
        defaultMode: 420
        secretName: kubernetes-dashboard-certs
    - emptyDir: {}
      name: tmp-volume
    - name: kube-api-access-9hts5
      projected:
        defaultMode: 420
        sources:
        - serviceAccountToken:
            expirationSeconds: 3607
            path: token
        - configMap:
            items:
            - key: ca.crt
              path: ca.crt
            name: kube-root-ca.crt
        - downwardAPI:
            items:
            - fieldRef:
                apiVersion: v1
                fieldPath: metadata.namespace
              path: namespace
  status:
    conditions:
    - lastProbeTime: null
      lastTransitionTime: "2026-05-23T15:31:37Z"
      observedGeneration: 1
      status: "True"
      type: PodReadyToStartContainers
    - lastProbeTime: null
      lastTransitionTime: "2026-05-18T16:36:37Z"
      observedGeneration: 1
      status: "True"
      type: Initialized
    - lastProbeTime: null
      lastTransitionTime: "2026-05-23T15:39:37Z"
      observedGeneration: 1
      status: "True"
      type: Ready
    - lastProbeTime: null
      lastTransitionTime: "2026-05-23T15:39:37Z"
      observedGeneration: 1
      status: "True"
      type: ContainersReady
    - lastProbeTime: null
      lastTransitionTime: "2026-05-18T16:36:37Z"
      observedGeneration: 1
      status: "True"
      type: PodScheduled
    containerStatuses:
    - containerID: containerd://2becfe28604e5edea895fb9cdf66ce07c91905d4da02564d00ba77f5369b350a
      image: docker.io/kubernetesui/dashboard:v2.7.0
      imageID: docker.io/kubernetesui/dashboard@sha256:2e500d29e9d5f4a086b908eb8dfe7ecac57d2ab09d65b24f588b1d449841ef93
      lastState:
        terminated:
          containerID: containerd://db1f41430514218e5cf8764c65a8354fb712221c2f4362ef5fb12134dfb711d7
          exitCode: 255
          finishedAt: "2026-05-23T15:31:28Z"
          reason: Unknown
          startedAt: "2026-05-19T15:18:38Z"
      name: kubernetes-dashboard
      ready: true
      resources: {}
      restartCount: 2
      started: true
      state:
        running:
          startedAt: "2026-05-23T15:39:36Z"
      user:
        linux:
          gid: 2001
          supplementalGroups:
          - 2001
          uid: 1001
      volumeMounts:
      - mountPath: /certs
        name: kubernetes-dashboard-certs
      - mountPath: /tmp
        name: tmp-volume
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-9hts5
        readOnly: true
        recursiveReadOnly: Disabled
    hostIP: 10.10.20.11
    hostIPs:
    - ip: 10.10.20.11
    observedGeneration: 1
    phase: Running
    podIP: 10.42.1.77
    podIPs:
    - ip: 10.42.1.77
    qosClass: BestEffort
    startTime: "2026-05-18T16:36:37Z"
- apiVersion: v1
  kind: Service
  metadata:
    annotations:
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"labels":{"k8s-app":"dashboard-metrics-scraper"},"name":"dashboard-metrics-scraper","namespace":"kubernetes-dashboard"},"spec":{"ports":[{"port":8000,"targetPort":8000}],"selector":{"k8s-app":"dashboard-metrics-scraper"}}}
    creationTimestamp: "2026-04-22T15:57:24Z"
    labels:
      k8s-app: dashboard-metrics-scraper
    name: dashboard-metrics-scraper
    namespace: kubernetes-dashboard
    resourceVersion: "6775"
    uid: a20113cc-bb72-4ba2-a93b-2b7309d8c51e
  spec:
    clusterIP: 10.43.233.17
    clusterIPs:
    - 10.43.233.17
    internalTrafficPolicy: Cluster
    ipFamilies:
    - IPv4
    ipFamilyPolicy: SingleStack
    ports:
    - port: 8000
      protocol: TCP
      targetPort: 8000
    selector:
      k8s-app: dashboard-metrics-scraper
    sessionAffinity: None
    type: ClusterIP
  status:
    loadBalancer: {}
- apiVersion: v1
  kind: Service
  metadata:
    annotations:
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"labels":{"k8s-app":"kubernetes-dashboard"},"name":"kubernetes-dashboard","namespace":"kubernetes-dashboard"},"spec":{"ports":[{"port":443,"targetPort":8443}],"selector":{"k8s-app":"kubernetes-dashboard"}}}
      metallb.io/ip-allocated-from-pool: lab-pool
    creationTimestamp: "2026-04-22T15:57:24Z"
    finalizers:
    - service.kubernetes.io/load-balancer-cleanup
    labels:
      k8s-app: kubernetes-dashboard
    name: kubernetes-dashboard
    namespace: kubernetes-dashboard
    resourceVersion: "211324"
    uid: 6a4f3faa-7bfb-484f-b491-307fcc73286e
  spec:
    allocateLoadBalancerNodePorts: true
    clusterIP: 10.43.135.187
    clusterIPs:
    - 10.43.135.187
    externalTrafficPolicy: Cluster
    internalTrafficPolicy: Cluster
    ipFamilies:
    - IPv4
    ipFamilyPolicy: SingleStack
    loadBalancerIP: 10.10.20.50
    ports:
    - nodePort: 31205
      port: 443
      protocol: TCP
      targetPort: 8443
    selector:
      k8s-app: kubernetes-dashboard
    sessionAffinity: None
    type: LoadBalancer
  status:
    loadBalancer:
      ingress:
      - ip: 10.10.20.50
        ipMode: VIP
- apiVersion: apps/v1
  kind: Deployment
  metadata:
    annotations:
      deployment.kubernetes.io/revision: "1"
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"labels":{"k8s-app":"dashboard-metrics-scraper"},"name":"dashboard-metrics-scraper","namespace":"kubernetes-dashboard"},"spec":{"replicas":1,"revisionHistoryLimit":10,"selector":{"matchLabels":{"k8s-app":"dashboard-metrics-scraper"}},"template":{"metadata":{"labels":{"k8s-app":"dashboard-metrics-scraper"}},"spec":{"containers":[{"image":"kubernetesui/metrics-scraper:v1.0.8","livenessProbe":{"httpGet":{"path":"/","port":8000,"scheme":"HTTP"},"initialDelaySeconds":30,"timeoutSeconds":30},"name":"dashboard-metrics-scraper","ports":[{"containerPort":8000,"protocol":"TCP"}],"securityContext":{"allowPrivilegeEscalation":false,"readOnlyRootFilesystem":true,"runAsGroup":2001,"runAsUser":1001},"volumeMounts":[{"mountPath":"/tmp","name":"tmp-volume"}]}],"nodeSelector":{"kubernetes.io/os":"linux"},"securityContext":{"seccompProfile":{"type":"RuntimeDefault"}},"serviceAccountName":"kubernetes-dashboard","tolerations":[{"effect":"NoSchedule","key":"node-role.kubernetes.io/master"}],"volumes":[{"emptyDir":{},"name":"tmp-volume"}]}}}}
    creationTimestamp: "2026-04-22T15:57:24Z"
    generation: 1
    labels:
      k8s-app: dashboard-metrics-scraper
    name: dashboard-metrics-scraper
    namespace: kubernetes-dashboard
    resourceVersion: "206657"
    uid: a59f50ec-1ff4-4ec8-b02c-23ae9f20c232
  spec:
    progressDeadlineSeconds: 600
    replicas: 1
    revisionHistoryLimit: 10
    selector:
      matchLabels:
        k8s-app: dashboard-metrics-scraper
    strategy:
      rollingUpdate:
        maxSurge: 25%
        maxUnavailable: 25%
      type: RollingUpdate
    template:
      metadata:
        labels:
          k8s-app: dashboard-metrics-scraper
      spec:
        containers:
        - image: kubernetesui/metrics-scraper:v1.0.8
          imagePullPolicy: IfNotPresent
          livenessProbe:
            failureThreshold: 3
            httpGet:
              path: /
              port: 8000
              scheme: HTTP
            initialDelaySeconds: 30
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 30
          name: dashboard-metrics-scraper
          ports:
          - containerPort: 8000
            protocol: TCP
          resources: {}
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            runAsGroup: 2001
            runAsUser: 1001
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          volumeMounts:
          - mountPath: /tmp
            name: tmp-volume
        dnsPolicy: ClusterFirst
        nodeSelector:
          kubernetes.io/os: linux
        restartPolicy: Always
        schedulerName: default-scheduler
        securityContext:
          seccompProfile:
            type: RuntimeDefault
        serviceAccount: kubernetes-dashboard
        serviceAccountName: kubernetes-dashboard
        terminationGracePeriodSeconds: 30
        tolerations:
        - effect: NoSchedule
          key: node-role.kubernetes.io/master
        volumes:
        - emptyDir: {}
          name: tmp-volume
  status:
    availableReplicas: 1
    conditions:
    - lastTransitionTime: "2026-04-22T15:57:24Z"
      lastUpdateTime: "2026-04-22T15:57:47Z"
      message: ReplicaSet "dashboard-metrics-scraper-5ffb7d645f" has successfully
        progressed.
      reason: NewReplicaSetAvailable
      status: "True"
      type: Progressing
    - lastTransitionTime: "2026-05-18T16:37:49Z"
      lastUpdateTime: "2026-05-18T16:37:49Z"
      message: Deployment has minimum availability.
      reason: MinimumReplicasAvailable
      status: "True"
      type: Available
    observedGeneration: 1
    readyReplicas: 1
    replicas: 1
    updatedReplicas: 1
- apiVersion: apps/v1
  kind: Deployment
  metadata:
    annotations:
      deployment.kubernetes.io/revision: "1"
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{},"labels":{"k8s-app":"kubernetes-dashboard"},"name":"kubernetes-dashboard","namespace":"kubernetes-dashboard"},"spec":{"replicas":1,"revisionHistoryLimit":10,"selector":{"matchLabels":{"k8s-app":"kubernetes-dashboard"}},"template":{"metadata":{"labels":{"k8s-app":"kubernetes-dashboard"}},"spec":{"containers":[{"args":["--auto-generate-certificates","--namespace=kubernetes-dashboard"],"image":"kubernetesui/dashboard:v2.7.0","imagePullPolicy":"Always","livenessProbe":{"httpGet":{"path":"/","port":8443,"scheme":"HTTPS"},"initialDelaySeconds":30,"timeoutSeconds":30},"name":"kubernetes-dashboard","ports":[{"containerPort":8443,"protocol":"TCP"}],"securityContext":{"allowPrivilegeEscalation":false,"readOnlyRootFilesystem":true,"runAsGroup":2001,"runAsUser":1001},"volumeMounts":[{"mountPath":"/certs","name":"kubernetes-dashboard-certs"},{"mountPath":"/tmp","name":"tmp-volume"}]}],"nodeSelector":{"kubernetes.io/os":"linux"},"securityContext":{"seccompProfile":{"type":"RuntimeDefault"}},"serviceAccountName":"kubernetes-dashboard","tolerations":[{"effect":"NoSchedule","key":"node-role.kubernetes.io/master"}],"volumes":[{"name":"kubernetes-dashboard-certs","secret":{"secretName":"kubernetes-dashboard-certs"}},{"emptyDir":{},"name":"tmp-volume"}]}}}}
    creationTimestamp: "2026-04-22T15:57:24Z"
    generation: 1
    labels:
      k8s-app: kubernetes-dashboard
    name: kubernetes-dashboard
    namespace: kubernetes-dashboard
    resourceVersion: "481381"
    uid: bf59a9fd-c90f-4b4f-a8b8-13568a676588
  spec:
    progressDeadlineSeconds: 600
    replicas: 1
    revisionHistoryLimit: 10
    selector:
      matchLabels:
        k8s-app: kubernetes-dashboard
    strategy:
      rollingUpdate:
        maxSurge: 25%
        maxUnavailable: 25%
      type: RollingUpdate
    template:
      metadata:
        labels:
          k8s-app: kubernetes-dashboard
      spec:
        containers:
        - args:
          - --auto-generate-certificates
          - --namespace=kubernetes-dashboard
          image: kubernetesui/dashboard:v2.7.0
          imagePullPolicy: Always
          livenessProbe:
            failureThreshold: 3
            httpGet:
              path: /
              port: 8443
              scheme: HTTPS
            initialDelaySeconds: 30
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 30
          name: kubernetes-dashboard
          ports:
          - containerPort: 8443
            protocol: TCP
          resources: {}
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            runAsGroup: 2001
            runAsUser: 1001
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          volumeMounts:
          - mountPath: /certs
            name: kubernetes-dashboard-certs
          - mountPath: /tmp
            name: tmp-volume
        dnsPolicy: ClusterFirst
        nodeSelector:
          kubernetes.io/os: linux
        restartPolicy: Always
        schedulerName: default-scheduler
        securityContext:
          seccompProfile:
            type: RuntimeDefault
        serviceAccount: kubernetes-dashboard
        serviceAccountName: kubernetes-dashboard
        terminationGracePeriodSeconds: 30
        tolerations:
        - effect: NoSchedule
          key: node-role.kubernetes.io/master
        volumes:
        - name: kubernetes-dashboard-certs
          secret:
            defaultMode: 420
            secretName: kubernetes-dashboard-certs
        - emptyDir: {}
          name: tmp-volume
  status:
    availableReplicas: 1
    conditions:
    - lastTransitionTime: "2026-04-22T15:57:24Z"
      lastUpdateTime: "2026-04-22T15:58:18Z"
      message: ReplicaSet "kubernetes-dashboard-6c7b75ffc" has successfully progressed.
      reason: NewReplicaSetAvailable
      status: "True"
      type: Progressing
    - lastTransitionTime: "2026-05-23T15:39:37Z"
      lastUpdateTime: "2026-05-23T15:39:37Z"
      message: Deployment has minimum availability.
      reason: MinimumReplicasAvailable
      status: "True"
      type: Available
    observedGeneration: 1
    readyReplicas: 1
    replicas: 1
    updatedReplicas: 1
- apiVersion: apps/v1
  kind: ReplicaSet
  metadata:
    annotations:
      deployment.kubernetes.io/desired-replicas: "1"
      deployment.kubernetes.io/max-replicas: "2"
      deployment.kubernetes.io/revision: "1"
    creationTimestamp: "2026-04-22T15:57:24Z"
    generation: 1
    labels:
      k8s-app: dashboard-metrics-scraper
      pod-template-hash: 5ffb7d645f
    name: dashboard-metrics-scraper-5ffb7d645f
    namespace: kubernetes-dashboard
    ownerReferences:
    - apiVersion: apps/v1
      blockOwnerDeletion: true
      controller: true
      kind: Deployment
      name: dashboard-metrics-scraper
      uid: a59f50ec-1ff4-4ec8-b02c-23ae9f20c232
    resourceVersion: "206656"
    uid: de015dd4-3b89-4d3c-8497-3b5021652993
  spec:
    replicas: 1
    selector:
      matchLabels:
        k8s-app: dashboard-metrics-scraper
        pod-template-hash: 5ffb7d645f
    template:
      metadata:
        labels:
          k8s-app: dashboard-metrics-scraper
          pod-template-hash: 5ffb7d645f
      spec:
        containers:
        - image: kubernetesui/metrics-scraper:v1.0.8
          imagePullPolicy: IfNotPresent
          livenessProbe:
            failureThreshold: 3
            httpGet:
              path: /
              port: 8000
              scheme: HTTP
            initialDelaySeconds: 30
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 30
          name: dashboard-metrics-scraper
          ports:
          - containerPort: 8000
            protocol: TCP
          resources: {}
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            runAsGroup: 2001
            runAsUser: 1001
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          volumeMounts:
          - mountPath: /tmp
            name: tmp-volume
        dnsPolicy: ClusterFirst
        nodeSelector:
          kubernetes.io/os: linux
        restartPolicy: Always
        schedulerName: default-scheduler
        securityContext:
          seccompProfile:
            type: RuntimeDefault
        serviceAccount: kubernetes-dashboard
        serviceAccountName: kubernetes-dashboard
        terminationGracePeriodSeconds: 30
        tolerations:
        - effect: NoSchedule
          key: node-role.kubernetes.io/master
        volumes:
        - emptyDir: {}
          name: tmp-volume
  status:
    availableReplicas: 1
    fullyLabeledReplicas: 1
    observedGeneration: 1
    readyReplicas: 1
    replicas: 1
- apiVersion: apps/v1
  kind: ReplicaSet
  metadata:
    annotations:
      deployment.kubernetes.io/desired-replicas: "1"
      deployment.kubernetes.io/max-replicas: "2"
      deployment.kubernetes.io/revision: "1"
    creationTimestamp: "2026-04-22T15:57:24Z"
    generation: 1
    labels:
      k8s-app: kubernetes-dashboard
      pod-template-hash: 6c7b75ffc
    name: kubernetes-dashboard-6c7b75ffc
    namespace: kubernetes-dashboard
    ownerReferences:
    - apiVersion: apps/v1
      blockOwnerDeletion: true
      controller: true
      kind: Deployment
      name: kubernetes-dashboard
      uid: bf59a9fd-c90f-4b4f-a8b8-13568a676588
    resourceVersion: "481378"
    uid: f256c56d-602b-4afa-9e14-49b064e4386c
  spec:
    replicas: 1
    selector:
      matchLabels:
        k8s-app: kubernetes-dashboard
        pod-template-hash: 6c7b75ffc
    template:
      metadata:
        labels:
          k8s-app: kubernetes-dashboard
          pod-template-hash: 6c7b75ffc
      spec:
        containers:
        - args:
          - --auto-generate-certificates
          - --namespace=kubernetes-dashboard
          image: kubernetesui/dashboard:v2.7.0
          imagePullPolicy: Always
          livenessProbe:
            failureThreshold: 3
            httpGet:
              path: /
              port: 8443
              scheme: HTTPS
            initialDelaySeconds: 30
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 30
          name: kubernetes-dashboard
          ports:
          - containerPort: 8443
            protocol: TCP
          resources: {}
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            runAsGroup: 2001
            runAsUser: 1001
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          volumeMounts:
          - mountPath: /certs
            name: kubernetes-dashboard-certs
          - mountPath: /tmp
            name: tmp-volume
        dnsPolicy: ClusterFirst
        nodeSelector:
          kubernetes.io/os: linux
        restartPolicy: Always
        schedulerName: default-scheduler
        securityContext:
          seccompProfile:
            type: RuntimeDefault
        serviceAccount: kubernetes-dashboard
        serviceAccountName: kubernetes-dashboard
        terminationGracePeriodSeconds: 30
        tolerations:
        - effect: NoSchedule
          key: node-role.kubernetes.io/master
        volumes:
        - name: kubernetes-dashboard-certs
          secret:
            defaultMode: 420
            secretName: kubernetes-dashboard-certs
        - emptyDir: {}
          name: tmp-volume
  status:
    availableReplicas: 1
    fullyLabeledReplicas: 1
    observedGeneration: 1
    readyReplicas: 1
    replicas: 1
kind: List
metadata:
  resourceVersion: ""
lab@k3s-master:~$


## 6. Azure

### 6.1 Subscription & Resource Group

| Component | Detail |
|---|---|
| Subscription Name | Azure subscription 1 |
| Subscription ID | d7641090-1deb-459f-aae4-0094575854c5 |
| Tenant ID | aa92d7ce-c491-4077-ab79-83b1a7af13f2 |
| Resource Group | RG-Lab |
| Region | Australia East |
| Provisioning State | Succeeded |

---

### 6.2 Virtual Network

| Component | Detail |
|---|---|
| Name | vnet-lab |
| Address Space | 10.20.0.0/16 |
| Region | Australia East |
| DDoS Protection | Disabled |
| VNet Peering | None |

#### Subnets

| Subnet Name | Address Prefix | Purpose | NAT Gateway |
|---|---|---|---|
| snet-vm | 10.20.10.0/24 | VM workloads | natgw-lab ✅ |
| GatewaySubnet | 10.20.99.0/27 | VPN Gateway | None |

---

### 6.3 Public IP Addresses

| Name | IP Address | Allocation | Associated To | Zone |
|---|---|---|---|---|
| pip-natgw-lab | 20.5.97.63 | Static | natgw-lab | Regional |
| pip-vpngw-lab | 20.11.94.68 | Static | vpngw-lab | 1, 2, 3 (Zone-redundant) |

> ⚠️ **Cost rule:** Keep both public IPs always — free when unattached!

---

### 6.4 NAT Gateway

| Component | Detail |
|---|---|
| Name | natgw-lab |
| Public IP | pip-natgw-lab (20.5.97.63) |
| Idle Timeout | 4 minutes |
| SKU | Standard |
| Attached Subnet | snet-vm |
| Region | Australia East |

> ⚠️ **Cost rule:** DELETE when not labbing — ~$32/month if left running!

---

### 6.5 Virtual Machine — vm-web-lab

| Component | Detail |
|---|---|
| Name | vm-web-lab |
| Size | Standard_B2ats_v2 |
| OS | Ubuntu 24.04 LTS (ubuntu-24_04-lts, canonical) |
| OS Image Version | 24.04.202605220 |
| OS Disk | 30 GB, StandardSSD_LRS |
| Availability Zone | Zone 1 |
| Private IP | 10.20.10.4 (static assignment via NIC) |
| Public IP | None |
| Network Interface | vm-web-lab961_z1 |
| Username | labadmin |
| Auth | SSH key only (password disabled) |
| SSH Key Resource | vm-web-lab-key |
| Boot Diagnostics | Enabled |
| Security Type | Trusted Launch (Secure Boot + vTPM) |
| Power State | VM running (stop/deallocate when not labbing!) |
| Time Created | 2026-05-23 19:15:30 UTC |

> ⚠️ **Cost rule:** Stop/deallocate when not labbing!

#### Planned Software (not yet installed)
- Nginx (web server)
- Node Exporter (Prometheus metrics)
- Docker

---

### 6.6 Network Security Group — vm-web-lab-nsg

**Attached to:** vm-web-lab961_z1 (NIC of vm-web-lab)

#### Custom Inbound Rules

| Priority | Name | Source | Destination | Port | Protocol | Action |
|---|---|---|---|---|---|---|
| 100 | Allow-SSH | Any | 10.20.10.4 | 22 | TCP | Allow |

#### Default Rules (Inbound)

| Priority | Name | Source | Destination | Action |
|---|---|---|---|---|
| 65000 | AllowVnetInBound | VirtualNetwork | VirtualNetwork | Allow |
| 65001 | AllowAzureLoadBalancerInBound | AzureLoadBalancer | Any | Allow |
| 65500 | DenyAllInBound | Any | Any | Deny |

#### Default Rules (Outbound)

| Priority | Name | Source | Destination | Action |
|---|---|---|---|---|
| 65000 | AllowVnetOutBound | VirtualNetwork | VirtualNetwork | Allow |
| 65001 | AllowInternetOutBound | Any | Internet | Allow |
| 65500 | DenyAllOutBound | Any | Any | Deny |

---

### 6.7 VPN Gateway

| Component | Detail |
|---|---|
| Name | vpngw-lab |
| SKU | VpnGw1AZ |
| Generation | Generation1 |
| Type | Vpn (Route-based) |
| Public IP | pip-vpngw-lab (20.11.94.68) |
| Subnet | GatewaySubnet (10.20.99.0/27) |
| BGP ASN | 65515 |
| BGP Peering Address | 10.20.99.30 |
| BGP Enabled | No (not used — policy-based tunnel) |
| Active-Active | No |
| Region | Australia East |

> ⚠️ **Cost rule:** DELETE when not labbing — ~$136/month if left running!

---

### 6.8 Local Network Gateway (On-Prem Representation)

| Component | Detail |
|---|---|
| Name | lng-onprem |
| On-Prem Public IP | 149.129.220.212 (S-Net WireGuard static IP) |
| On-Prem Address Prefixes | 10.10.10.0/24, 10.10.20.0/24, 10.10.30.0/24, 10.10.99.0/24 |
| Region | Australia East |

---

### 6.9 IPSec Connection — IPSec_Palo

| Component | Detail |
|---|---|
| Name | IPSec_Palo |
| Type | IPsec (Site-to-Site) |
| Protocol | IKEv2 |
| Auth | PSK (Pre-Shared Key) |
| PSK | P@ssw0rd |
| Connection Mode | Default |
| Status | ✅ **Connected** |
| VPN Gateway | vpngw-lab |
| Local Network Gateway | lng-onprem |
| DPD Timeout | 45 seconds |
| BGP | Disabled |
| Egress Bytes | 731,533 bytes |
| Ingress Bytes | 578,865 bytes |

#### Custom IPSec Policy

| Parameter | Value |
|---|---|
| IKE Encryption | AES256 |
| IKE Integrity | SHA256 |
| DH Group | DHGroup14 |
| IPSec Encryption | AES256 |
| IPSec Integrity | SHA256 |
| PFS Group | PFS2048 |
| SA Lifetime | 3600 seconds |
| SA Data Size | 0 KB (unlimited) |

---

### 6.10 On-Prem Side — Palo Alto Azure IPSec Config

| Component | Detail |
|---|---|
| IKE Crypto Profile | IKE-CRYPTO-AZURE (AES-256-CBC, SHA256, DH14, 8h) |
| IPSec Crypto Profile | IPSEC-CRYPTO-AZURE (ESP, AES-256-CBC, SHA256, DH14, 3600s) |
| IKE Gateway Name | IKE-GW-AZURE |
| Interface | ethernet1/1 |
| Local IP | 192.168.1.101/24 |
| Local ID | 149.129.220.212 (S-Net public IP) |
| Peer IP | 20.11.94.68 (Azure VPN GW) |
| PSK | P@ssw0rd |
| IKE Version | IKEv2 only |
| NAT Traversal | ON |
| Passive Mode | OFF |
| Tunnel Interface | tunnel.3 |
| Zone | Azure |
| IPSec Tunnel Name | IPSEC-TUNNEL-AZURE |
| Proxy IDs | Local: 0.0.0.0/0 · Remote: 0.0.0.0/0 |
| Static Route | 10.20.0.0/16 → tunnel.3 |
| PA route to Azure GW | 20.11.94.68/32 → 192.168.1.47 (Ubuntu WireGuard VM) |

---

### 6.11 Storage Account (Boot Diagnostics)

| Component | Detail |
|---|---|
| Name | stlabdiag |
| Purpose | VM boot diagnostics storage |
| Region | Australia East |

---

### 6.12 Azure Cost Management Rules

| Resource | When Not Labbing | Reason |
|---|---|---|
| vm-web-lab | Stop/deallocate | Saves compute cost |
| natgw-lab | Delete | ~$32/month if left running |
| vpngw-lab | Delete | ~$136/month if left running |
| pip-natgw-lab | KEEP | Free when unattached |
| pip-vpngw-lab | KEEP | Free when unattached |
| vnet-lab | KEEP | Always free |
| RG-Lab | KEEP | Always free |
| OS Disk | KEEP | ~$1.2/month only |
| stlabdiag | KEEP | Minimal cost |

---

### 6.13 Current Status Summary

| Resource | Status |
|---|---|
| RG-Lab | ✅ Active |
| vnet-lab (10.20.0.0/16) | ✅ Active |
| snet-vm (10.20.10.0/24) | ✅ Active |
| GatewaySubnet (10.20.99.0/27) | ✅ Active |
| vm-web-lab (10.20.10.4) | ✅ Running |
| natgw-lab (20.5.97.63) | ✅ Active |
| vpngw-lab (20.11.94.68) | ✅ Active |
| lng-onprem (149.129.220.212) | ✅ Active |
| IPSec_Palo | ✅ **CONNECTED** |
| vm-web-lab-nsg | ✅ Active |
| stlabdiag | ✅ Active |



### 6.14 vm-web-lab Software Configuration

#### Nginx

| Component | Detail |
|---|---|
| Version | Nginx 1.24 |
| Status | Active (systemd) |
| Config File | /etc/nginx/sites-available/default |
| Web Root | /var/www/html |
| Listening | Port 80 (HTTP) |
| Server Name | _ (default, any) |
| SSL | Not configured yet |

Current files in web root:
- index.html (custom — Azure territory landing page)
- index.nginx-debian.html (default)

#### Docker

| Component | Detail |
|---|---|
| Version | Docker 29.5 |
| Status | Active (systemd, enabled on boot) |
| Running Containers | None |
| Purpose | Ready for future app deployment |

#### Node Exporter / Prometheus Scraping

| Component | Detail |
|---|---|
| Node Exporter | Installed |
| Prometheus Scraping | ⛔ DISABLED — skipped to avoid Azure egress traffic cost |
| Reason | Azure free trial — outbound traffic generates cost |
| Future Plan | Enable when on paid subscription or when cost is acceptable |