import { makeRule, Metadata, Protocol, Remote, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Remote Desktop",
  id: "remote-desktop",
  description: "Apple's screen sharing client",
  homepage: "https://support.apple.com/guide/remote-desktop/welcome/mac",
  properties: { canHavePrefix: true },
};

export const rules: Rule[] = [
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
].flat();
