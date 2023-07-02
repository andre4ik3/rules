import { makeRule, Metadata, Protocol, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Raycast",
  id: "raycast",
  description: "App launcher",
  homepage: "https://raycast.com",
  properties: { canHavePrefix: true },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.raycast],
    remote: [RemoteType.Host, [
      "aerodatabox.p.rapidapi.com",
      "backend.raycast.com",
    ]],
    using: [[Protocol.TCP, 443]],
    notes: "Allows Raycast to look up flights and currency conversions.",
  }),

  makeRule({
    process: [Paths.raycast],
    remote: [RemoteType.Host, ["nodejs.org"]],
    using: [[Protocol.TCP, 443]],
    notes:
      "Allows Raycast to download and update a Node.JS runtime. This is required to use extensions.",
  }),
].flat();
