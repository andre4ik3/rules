import { makeRule, Metadata, Protocol, Remote, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Little Snitch",
  id: "little-snitch",
  description: "Advanced firewall for macOS",
  homepage: "https://obdev.at/products/littlesnitch/index.html",
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.littleSnitch.downloader],
    remote: Remote.Any,
    using: [[Protocol.TCP, 443]],
    notes: "Allows Little Snitch to download and update Rule Group Subscriptions.",
  }),

  makeRule({
    process: [Paths.littleSnitch.updater],
    remote: [RemoteType.Host, ["sw-update.obdev.at"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Little Snitch to check for and install updates.",
  }),
].flat();
