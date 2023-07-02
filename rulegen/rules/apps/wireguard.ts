import { Direction, makeRule, Metadata, Protocol, Remote, Rule } from "../../types.ts";
import Paths from "../../paths.json" assert { type: "json" };

export const metadata: Metadata = {
  name: "WireGuard",
  id: "wireguard",
  description: "Lightweight VPN",
  homepage: "https://wireguard.com",
  properties: { canHavePrefix: true },
};

export const rules: Rule[] = [
  makeRule({
    process: [Paths.wireguard],
    remote: Remote.Any,
    direction: [Direction.Incoming, Direction.Outgoing],
    using: [[Protocol.UDP, "any"]],
    notes: "Allows WireGuard to communicate with VPN servers.",
  }),
].flat();
