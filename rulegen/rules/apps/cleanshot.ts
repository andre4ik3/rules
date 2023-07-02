import { makeRule, Metadata, Protocol, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "CleanShot X",
  id: "cleanshot",
  description: "Advanced screen capture tool",
  homepage: "https://cleanshot.com/",
  properties: { canHavePrefix: true },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.cleanShot],
    remote: [RemoteType.Host, ["legit.maketheweb.io"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows CleanShot X to check the validity of a license key.",
  }),
].flat();
