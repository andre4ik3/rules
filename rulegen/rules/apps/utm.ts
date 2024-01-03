import { makeRule, Metadata, Protocol, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "UTM",
  id: "utm",
  description: "Virtual machine manager",
  homepage: "https://mac.getutm.app",
  properties: { canHavePrefix: true, defaultPrefix: "homebrew" },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.utm],
    remote: [RemoteType.Host, ["gs.apple.com", "tbsc.apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows UTM to install macOS onto Apple virtual machines.",
  }),
].flat();
