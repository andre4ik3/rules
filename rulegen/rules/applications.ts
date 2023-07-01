import { Direction, makeRule, Protocol, Remote, RemoteType } from "../ls.ts";
import { maybePrefixed } from "../utils.ts";

const Paths = {
  gpgSuite: {
    updater:
      "/Library/Application Support/GPGTools/GPGSuite_Updater.app/Contents/MacOS/GPGSuite_Updater",
  },

  iStatMenus: {
    daemon: "/Library/Application Support/iStat Menus 6/iStatMenusDaemon",
    status:
      "/Library/Application Support/iStat Menus 6/iStat Menus Status.app/Contents/MacOS/iStat Menus Status",
  },

  littleSnitch: {
    downloader:
      "/Library/Application Support/Objective Development/Little Snitch/Components/at.obdev.littlesnitch.daemon.bundle/Contents/XPCServices/at.obdev.littlesnitch.urldownloader.xpc/Contents/MacOS/at.obdev.littlesnitch.urldownloader",
    updater:
      "/Applications/Little Snitch.app/Contents/Components/Little Snitch Software Update.app/Contents/MacOS/Little Snitch Software Update",
  },

  makeTheWeb: {
    cleanShot: "/Applications/CleanShot X.app/Contents/MacOS/CleanShot X",
    pixelSnap: "/Applications/PixelSnap 2.app/Contents/MacOS/PixelSnap 2",
  },

  panic: {
    nova: "/Applications/Nova.app/Contents/MacOS/Nova",
    transmit: "/Applications/Transmit.app/Contents/MacOS/Transmit",
  },

  remoteDesktop: {
    agent:
      "/System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/MacOS/ARDAgent",
    app: "/Applications/Remote Desktop.app/Contents/MacOS/Remote Desktop",
  },

  safari: {
    app: "/Applications/Safari.app/Contents/MacOS/Safari",
    safeBrowsingService:
      "/System/Library/PrivateFrameworks/SafariSafeBrowsing.framework/Versions/A/com.apple.Safari.SafeBrowsing.Service",
  },

  syncthing: {
    app: "/Applications/Syncthing.app/Contents/MacOS/Syncthing",
    appBinary:
      "/Applications/Syncthing.app/Contents/Resources/syncthing/syncthing",
    binary: "/usr/local/bin/syncthing",
  },

  wireguard:
    "/Applications/WireGuard.app/Contents/PlugIns/WireGuardNetworkExtension.appex/Contents/MacOS/WireGuardNetworkExtension",
} as const;

const rules = [
  /* ======================================================================== */
  /* GPG Suite                                                                */
  /* ======================================================================== */

  makeRule({
    process: [Paths.gpgSuite.updater],
    remote: [RemoteType.Host, ["gpgtools.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows GPG Suite to check for updates.",
  }),

  /* ======================================================================== */
  /* iStat Menus                                                              */
  /* ======================================================================== */

  makeRule({
    process: [Paths.iStatMenus.daemon],
    remote: Remote.BPF,
    notes: "Allows iStat Menus to gather network statistics.",
  }),

  makeRule({
    process: [Paths.iStatMenus.status],
    remote: [RemoteType.Host, ["ip.istatmenus.app"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows iStat Menus to display the public IP address.",
  }),

  makeRule({
    process: [Paths.iStatMenus.status],
    remote: [RemoteType.Address, ["1.1.1.1", "1.0.0.1"]],
    using: [[Protocol.ICMP, "any"]],
    notes: "Allows iStat Menus to check for internet connectivity.",
  }),

  /* ======================================================================== */
  /* Little Snitch                                                            */
  /* ======================================================================== */

  makeRule({
    process: [Paths.littleSnitch.downloader],
    remote: Remote.Any,
    using: [[Protocol.TCP, 443]],
    notes: "Allows Little Snitch to download/update Rule Group Subscriptions.",
  }),

  makeRule({
    process: [Paths.littleSnitch.updater],
    remote: [RemoteType.Host, ["sw-update.obdev.at"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Little Snitch to check for and install updates.",
  }),

  /* ======================================================================== */
  /* MakeTheWeb                                                               */
  /* ======================================================================== */

  makeRule({
    process: maybePrefixed(
      Paths.makeTheWeb.cleanShot,
      Paths.makeTheWeb.pixelSnap,
    ),
    remote: [RemoteType.Host, ["legit.maketheweb.io"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows this app to check the validity of a license key.",
  }),

  /* ======================================================================== */
  /* Panic                                                                    */
  /* ======================================================================== */

  makeRule({
    process: maybePrefixed(Paths.panic.nova, Paths.panic.transmit),
    remote: [RemoteType.Host, ["circle.panic.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows this app to check the validity of a license key.",
  }),

  makeRule({
    process: maybePrefixed(Paths.panic.transmit),
    remote: [RemoteType.Host, ["panic.com", "www.panic.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Transmit to check for app and S3 region updates.",
  }),

  /* ======================================================================== */
  /* Remote Desktop                                                           */
  /* ======================================================================== */

  makeRule({
    process: [Paths.remoteDesktop.agent],
    remote: Remote.Any,
    using: [[Protocol.UDP, 3283]],
    notes: "Allows Remote Desktop to gather information about machines.",
  }),

  makeRule({
    process: maybePrefixed(Paths.remoteDesktop.app),
    remote: Remote.Any,
    using: [[Protocol.ICMP, "any"], [Protocol.TCP, 5900]],
    notes: "Allows Remote Desktop to perform screen sharing.",
  }),

  /* ======================================================================== */
  /* Safari                                                                   */
  /* ======================================================================== */

  makeRule({
    process: [Paths.safari.app],
    remote: Remote.Any,
    using: [[Protocol.TCP, "any"], [Protocol.UDP, "any"]],
    notes: "Allows Safari to be used for web browsing.",
  }),

  makeRule({
    process: [Paths.safari.safeBrowsingService],
    remote: [RemoteType.Domain, ["safebrowsing.apple"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Safari's Safe Browsing integration to work.",
  }),

  /* ======================================================================== */
  /* Syncthing                                                                */
  /* ======================================================================== */

  makeRule({
    process: [
      ...maybePrefixed([Paths.syncthing.app, Paths.syncthing.appBinary]),
      ...maybePrefixed(Paths.syncthing.binary),
    ],
    direction: [Direction.Incoming],
    remote: Remote.Any,
    using: [[Protocol.TCP, 22000], [Protocol.UDP, 22000]],
    notes: "Allows Syncthing to accept incoming connections from devices.",
  }),

  makeRule({
    process: [
      ...maybePrefixed([Paths.syncthing.app, Paths.syncthing.appBinary]),
      ...maybePrefixed(Paths.syncthing.binary),
    ],
    direction: [Direction.Incoming],
    remote: Remote.LocalNet,
    using: [[Protocol.UDP, 21027]],
    notes: "Allows Syncthing to be discovered by local devices.",
  }),

  makeRule({
    process: [
      ...maybePrefixed([Paths.syncthing.app, Paths.syncthing.appBinary]),
      ...maybePrefixed(Paths.syncthing.binary),
    ],
    remote: Remote.Any,
    using: [[Protocol.TCP, 22067], [Protocol.UDP, 3478]],
    notes: "Allows Syncthing to traverse NAT firewalls.",
  }),

  makeRule({
    process: [
      ...maybePrefixed([Paths.syncthing.app, Paths.syncthing.appBinary]),
      ...maybePrefixed(Paths.syncthing.binary),
    ],
    remote: Remote.Any,
    using: [[Protocol.TCP, 22000], [Protocol.UDP, 22000]],
    notes: "Allows Syncthing to connect to unfirewalled devices.",
  }),

  makeRule({
    process: [
      ...maybePrefixed([Paths.syncthing.app, Paths.syncthing.appBinary]),
      ...maybePrefixed(Paths.syncthing.binary),
    ],
    remote: Remote.Any,
    using: [[Protocol.TCP, "any"], [Protocol.UDP, "any"]],
    notes: "Allows Syncthing to connect to any device or relay.",
  }),

  /* ======================================================================== */
  /* WireGuard                                                                */
  /* ======================================================================== */

  makeRule({
    process: maybePrefixed(Paths.wireguard),
    remote: Remote.Any,
    direction: [Direction.Incoming, Direction.Outgoing],
    using: [[Protocol.UDP, "any"]],
    notes: "Allows WireGuard to communicate with VPN servers.",
  }),
].flat();

export default {
  name: "Applications",
  description:
    "Allows various applications to function. Each rule corresponds to specific functionality of the application, detailed in the description. Note: All rules are disabled by default!",
  rules,
};
