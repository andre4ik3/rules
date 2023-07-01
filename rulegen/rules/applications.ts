import { Direction, makeRule, Protocol, Remote, RemoteType } from "../ls.ts";
import Paths from "../paths.json" assert { type: "json" };

const rules = [
  /* ======================================================================== */
  /* Arc                                                                      */
  /* ======================================================================== */

  makeRule({
    process: [[Paths.arc.app, Paths.arc.helper]],
    remote: Remote.Any,
    using: [[Protocol.TCP, "any"], [Protocol.UDP, "any"]],
    notes: "Allows Arc to be used for web browsing.",
  }),

  makeRule({
    process: [Paths.arc.app],
    remote: [RemoteType.Host, [
      "clientstream.launchdarkly.com",
      "mobile.launchdarkly.com",
    ]],
    using: [[Protocol.TCP, 443]],
    notes:
      "Allows Arc's feature flag system to work. This is generally required to see new features after an update.",
  }),

  makeRule({
    process: [Paths.arc.app],
    remote: [RemoteType.Host, [
      "content.arc.net",
      "firebasestorage.googleapis.com",
      "firestore.googleapis.com",
      "securetoken.googleapis.com",
      "www.googleapis.com",
      "t0.gstatic.com",
      "t1.gstatic.com",
      "t2.gstatic.com",
      "t3.gstatic.com",
    ]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Arc accounts, Easels, and other features to work.",
  }),

  makeRule({
    process: [Paths.arc.app],
    remote: [RemoteType.Host, ["releases.arc.net"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Arc to check for and install updates.",
  }),

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
    process: [Paths.panic.nova],
    remote: [RemoteType.Host, ["api.github.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Nova to connect to 3rd-party Git integrations.",
  }),

  makeRule({
    process: [Paths.panic.nova],
    remote: [RemoteType.Host, [
      "extensions.panic.com",
      "nova-extensions.freetls.fastly.net",
    ]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Nova to download and update extensions.",
  }),

  makeRule({
    process: [Paths.panic.nova],
    remote: [RemoteType.Host, ["www.gravatar.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Nova to display avatars for Git authors.",
  }),

  makeRule({
    process: [Paths.panic.transmit],
    remote: [RemoteType.Host, ["panic.com", "www.panic.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Transmit to check for app and S3 region updates.",
  }),

  /* ======================================================================== */
  /* Raycast                                                                  */
  /* ======================================================================== */

  makeRule({
    process: [Paths.raycast],
    remote: [RemoteType.Host, [
      "aerodatabox.p.rapidapi.com",
      "backend.raycast.com",
    ]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Raycast to look up flights and currency conversions.",
  }),

  makeRule({
    process: [Paths.raycast],
    remote: [RemoteType.Host, ["releases.raycast.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Raycast to check for and install updates.",
  }),

  makeRule({
    process: [Paths.raycast],
    remote: [RemoteType.Host, ["nodejs.org"]],
    using: [[Protocol.TCP, 443]],
    notes:
      "Allows Raycast to download and update a Node.JS runtime. This is required to use extensions.",
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
  /* Screens                                                                  */
  /* ======================================================================== */

  makeRule({
    process: [Paths.screens],
    remote: Remote.Any,
    using: [[Protocol.TCP, 5900]],
    notes: "Allows Screens to perform screen sharing.",
  }),

  makeRule({
    process: [Paths.screens],
    remote: [RemoteType.Host, ["edovia.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Screens to check the validity of a license key.",
  }),

  makeRule({
    process: [Paths.screens],
    remote: [RemoteType.Host, ["updates.edovia.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Screens to check for and install updates.",
  }),

  // todo: screens connect

  /* ======================================================================== */
  /* Sketch                                                                   */
  /* ======================================================================== */

  // todo

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
