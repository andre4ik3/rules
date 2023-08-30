import { makeRule, Metadata, Protocol, Remote, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Transmit",
  id: "transmit",
  description: "FTP client",
  homepage: "https://panic.com/transmit/",
  properties: { canHavePrefix: true, defaultPrefix: "homebrew" },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.transmit],
    remote: [RemoteType.Host, ["circle.panic.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Transmit to check the validity of a license key.",
  }),

  makeRule({
    process: [Paths.transmit],
    remote: [RemoteType.Host, ["panic.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Transmit to check for S3 region updates.",
  }),

  makeRule({
    process: [Paths.transmit],
    remote: Remote.Any,
    using: [[Protocol.TCP, 22]],
    notes: "Allows Transmit to make SFTP connections.",
  }),
].flat();
