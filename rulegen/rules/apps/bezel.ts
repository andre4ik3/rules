import { makeRule, Metadata, Protocol, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Bezel",
  id: "bezel",
  description: "Screen mirroring tool for iDevices",
  homepage: "https://getbezel.app/",
  properties: { canHavePrefix: true, defaultPrefix: "homebrew" },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.bezel],
    remote: [RemoteType.Host, ["customers.nonstrict.com"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Bezel to check the validity of a license key.",
  }),
].flat();
