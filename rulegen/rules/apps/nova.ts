import { makeRule, Metadata, Protocol, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Nova",
  id: "nova",
  description: "Native code editor",
  homepage: "https://nova.app",
  properties: { canHavePrefix: true },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.nova],
    remote: [RemoteType.Host, ["circle.panic.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Nova to check the validity of a license key.",
  }),

  makeRule({
    process: [Paths.nova],
    remote: [RemoteType.Host, ["api.github.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Nova to connect to 3rd-party Git integrations.",
  }),

  makeRule({
    process: [Paths.nova],
    remote: [RemoteType.Host, [
      "extensions.panic.com",
      "nova-extensions.freetls.fastly.net",
    ]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Nova to download and update extensions.",
  }),

  makeRule({
    process: [Paths.nova],
    remote: [RemoteType.Host, ["www.gravatar.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Nova to display avatars for Git authors.",
  }),
].flat();
