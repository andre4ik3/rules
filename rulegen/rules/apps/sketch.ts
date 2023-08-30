import { makeRule, Metadata, Protocol, Remote, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Sketch",
  id: "sketch",
  description: "Graphic design tool",
  homepage: "https://sketch.com",
  properties: { canHavePrefix: true, defaultPrefix: "homebrew" },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.sketch],
    remote: [RemoteType.Host, [
      "graphql.sketch.cloud",
      "api.prod.sketch.com",
      "resources-live.sketch.cloud",
      "www.sketch.com",
    ]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Sketch to log into accounts and validate license keys.",
  }),

  makeRule({
    process: [Paths.sketch],
    remote: [RemoteType.Host, ["download.sketch.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Sketch to download and check for updates.",
  }),

  makeRule({
    process: [Paths.sketch],
    remote: [RemoteType.Host, ["developer.apple.com", "devimages-cdn.apple.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Sketch to download Apple's iOS design library.",
  }),
].flat();
