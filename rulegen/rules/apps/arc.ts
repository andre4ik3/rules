import { makeRule, Metadata, Protocol, Remote, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Arc",
  id: "arc",
  description: "Web browser",
  homepage: "https://arc.net",
  properties: { canHavePrefix: true, defaultPrefix: "homebrew" },
};

export const rules: Rule[] = [
  makeRule({
    process: [[Paths.arc.app, Paths.arc.helper]],
    remote: Remote.Any,
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
].flat();
