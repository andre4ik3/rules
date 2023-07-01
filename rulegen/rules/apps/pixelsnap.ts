import { makeRule, Metadata, Protocol, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "PixelSnap 2",
  description: "Measuring tool",
  homepage: "https://getpixelsnap.com/",
  properties: { canHavePrefix: true },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.pixelSnap],
    remote: [RemoteType.Host, ["legit.maketheweb.io"]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows PixelSnap 2 to check the validity of a license key.",
  }),
].flat();
