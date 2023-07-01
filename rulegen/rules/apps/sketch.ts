import { makeRule, Metadata, Protocol, Remote, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "Sketch",
  description: "Graphic design tool",
  homepage: "https://sketch.com",
  properties: { canHavePrefix: true },
};

export const rules: Rule[] = [
  // todo
].flat();
