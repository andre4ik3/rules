import {
  makeRule,
  Metadata,
  Protocol,
  Remote,
  RemoteType,
  Rule,
} from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Screens",
  id: "screens",
  description: "Screen sharing client",
  homepage: "https://edovia.com/en/screens-mac/",
  properties: { canHavePrefix: true, defaultPrefix: "homebrew" },
};

export const rules: Rule[] = [
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
  // todo: screens connect
].flat();
