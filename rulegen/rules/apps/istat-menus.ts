import { makeRule, Metadata, Protocol, Remote, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "iStat Menus",
  id: "istat-menus",
  description: "System monitoring suite that runs in the menu bar",
  homepage: "https://bjango.com/mac/istatmenus/",
};

export const rules: Rule[] = [
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
].flat();
