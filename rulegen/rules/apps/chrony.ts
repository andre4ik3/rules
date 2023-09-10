import { makeRule, Metadata, Protocol, Remote, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Chrony",
  id: "chrony",
  description: "NTP client",
  homepage: "https://chrony-project.org",
  // TODO: prefix, either /opt/homebrew or /usr/local
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.chrony],
    remote: Remote.Any,
    using: [[Protocol.UDP, 123]],
    notes: "Allows Chrony to communicate with network time servers.",
  }),
].flat();
