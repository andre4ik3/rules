import { makeRule, Metadata, Protocol, Remote, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Latest",
  id: "latest",
  description: "Software update checker",
  homepage: "https://max.codes/latest/",
  properties: { canHavePrefix: true },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.latest],
    remote: Remote.Any,
    using: [[Protocol.TCP, 443]],
    notes: "Allows Latest to check for Sparkle app updates.",
  }),
].flat();
