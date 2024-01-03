import { makeRule, Metadata, Protocol, RemoteType, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "CrystalFetch",
  id: "crystalfetch",
  description: "Utility to download Windows images",
  homepage: "https://github.com/TuringSoftware/CrystalFetch",
  properties: { canHavePrefix: true, defaultPrefix: "homebrew" },
};

export const rules: Rule[] = [
  makeRule({
	process: [Paths.crystalfetch],
	remote: [RemoteType.Domain, ["uupdump.net", "microsoft.com"]],
	using: [[Protocol.TCP, 443]],
	notes: "Allows CrystalFetch to download Windows images.",
  }),
].flat();
