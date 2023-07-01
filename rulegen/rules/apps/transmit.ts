import { makeRule, Metadata, Protocol, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Transmit",
  description: "FTP client",
  homepage: "https://panic.com/transmit/",
  properties: { canHavePrefix: true },
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
].flat();
