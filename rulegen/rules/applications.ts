import { Direction, makeRule, Protocol, Remote, RemoteType } from "../ls.ts";
import Paths from "../paths.json" assert { type: "json" };

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
    process: [Paths.makeTheWeb.cleanShot, Paths.makeTheWeb.pixelSnap],
    remote: [RemoteType.Host, ["legit.maketheweb.io"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows this app to check the validity of a license key.",
  }),

  /* ======================================================================== */
  /* Panic                                                                    */
  /* ======================================================================== */

  makeRule({
    process: [Paths.panic.nova, Paths.panic.transmit],
    remote: [RemoteType.Host, ["circle.panic.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows this app to check the validity of a license key.",
  }),

  makeRule({
    process: [Paths.panic.transmit],
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
    process: [Paths.remoteDesktop.app],
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
    process: [[Paths.syncthing.app, Paths.syncthing.appBinary]],
    direction: [Direction.Incoming],
    remote: Remote.Any,
    using: [[Protocol.TCP, 22000], [Protocol.UDP, 22000]],
    notes: "Allows Syncthing to accept incoming connections from devices.",
  }),

  makeRule({
    process: [[Paths.syncthing.app, Paths.syncthing.appBinary]],
    direction: [Direction.Incoming],
    remote: Remote.LocalNet,
    using: [[Protocol.UDP, 21027]],
    notes: "Allows Syncthing to be discovered by local devices.",
  }),

  makeRule({
    process: [[Paths.syncthing.app, Paths.syncthing.appBinary]],
    remote: Remote.Any,
    using: [[Protocol.TCP, 22067], [Protocol.UDP, 3478]],
    notes: "Allows Syncthing to traverse NAT firewalls.",
  }),

  makeRule({
    process: [[Paths.syncthing.app, Paths.syncthing.appBinary]],
    remote: Remote.Any,
    using: [[Protocol.TCP, 22000], [Protocol.UDP, 22000]],
    notes: "Allows Syncthing to connect to unfirewalled devices.",
  }),

  makeRule({
    process: [[Paths.syncthing.app, Paths.syncthing.appBinary]],
    remote: Remote.Any,
    using: [[Protocol.TCP, "any"], [Protocol.UDP, "any"]],
    notes: "Allows Syncthing to connect to any device or relay.",
  }),

  /* ======================================================================== */
  /* WireGuard                                                                */
  /* ======================================================================== */

  makeRule({
    process: [Paths.wireguard],
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
