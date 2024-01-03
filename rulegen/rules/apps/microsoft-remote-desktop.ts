import { makeRule, Metadata, Protocol, Remote, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Microsoft Remote Desktop",
  id: "msrd",
  description: "RDP client",
  homepage: "https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-mac",
  properties: { canHavePrefix: true },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.microsoftRemoteDesktop],
    remote: Remote.Any,
    using: [[Protocol.TCP, 3389]],
    notes: "Allows Remote Desktop to connect to RDP servers.",
  }),
].flat();
