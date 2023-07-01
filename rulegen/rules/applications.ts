import { Direction, makeRule, Protocol, Remote, RemoteType } from "../utils.ts";

const Apps = {
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

  wireguard:
    "/Applications/WireGuard.app/Contents/PlugIns/WireGuardNetworkExtension.appex/Contents/MacOS/WireGuardNetworkExtension",

  remoteDesktop: {
    agent:
      "/System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/MacOS/ARDAgent",
    app: "/Applications/Remote Desktop.app/Contents/MacOS/Remote Desktop",
  },
} as const;

export default [
  /* ======================================================================== */
  /* iStat Menus                                                              */
  /* ======================================================================== */

  makeRule({
    process: Apps.iStatMenus.daemon,
    remote: Remote.BPF,
    notes: "Allows iStat Menus to gather network statistics.",
  }),

  makeRule({
    process: Apps.iStatMenus.status,
    remote: [RemoteType.Host, ["ip.istatmenus.app"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows iStat Menus to display the public IP address.",
  }),

  makeRule({
    process: Apps.iStatMenus.status,
    remote: [RemoteType.Address, ["1.1.1.1", "1.0.0.1"]],
    using: [[Protocol.ICMP, "any"]],
    notes: "Allows iStat Menus to check for internet connectivity.",
  }),

  /* ======================================================================== */
  /* Little Snitch                                                            */
  /* ======================================================================== */

  makeRule({
    process: Apps.littleSnitch.downloader,
    remote: Remote.Any,
    using: [[Protocol.TCP, 443]],
    notes: "Allows Little Snitch to download/update Rule Group Subscriptions.",
  }),

  makeRule({
    process: Apps.littleSnitch.updater,
    remote: [RemoteType.Host, ["sw-update.obdev.at"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Little Snitch to check for and install updates.",
  }),

  /* ======================================================================== */
  /* WireGuard                                                                */
  /* ======================================================================== */

  makeRule({
    process: Apps.wireguard,
    remote: Remote.Any,
    direction: [Direction.Incoming, Direction.Outgoing],
    using: [[Protocol.UDP, "any"]],
    notes: `Allows WireGuard to communicate with VPN servers.
Note: Both this rule and the outgoing rule are required for proper operation.`,
  }),

  /* ======================================================================== */
  /* Apple Remote Desktop                                                     */
  /* ======================================================================== */

  makeRule({
    process: Apps.remoteDesktop.agent,
    remote: Remote.Any,
    using: [[Protocol.UDP, 3283]],
    notes: "Allows Apple Remote Desktop to gather information about machines.",
  }),

  makeRule({
    process: Apps.remoteDesktop.app,
    remote: Remote.Any,
    using: [[Protocol.ICMP, "any"], [Protocol.TCP, 5900]],
    notes: "Allows Apple Remote Desktop to perform screen sharing.",
  }),
].flat();
